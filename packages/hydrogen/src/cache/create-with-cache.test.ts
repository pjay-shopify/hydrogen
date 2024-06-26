import {describe, beforeEach, it, expect, vi} from 'vitest';
import {type WithCache, createWithCache} from './create-with-cache';
import {InMemoryCache} from './in-memory';
import {getItemFromCache} from './sub-request';
import {CacheNone, CacheShort} from './strategies';

describe('createWithCache', () => {
  const KEY = 'my-key';
  const VALUE = 'my-value';
  const actionFn = vi.fn(() => VALUE);
  const waitUntil = vi.fn(() => {});
  let cache: InMemoryCache;
  let withCache: WithCache;

  beforeEach(() => {
    vi.useFakeTimers();
    cache = new InMemoryCache();
    withCache = createWithCache({cache, waitUntil});
    actionFn.mockClear();
    waitUntil.mockClear();
    return () => vi.useRealTimers();
  });

  it('creates a valid withCache function', () => {
    expect(withCache).toBeInstanceOf(Function);
  });

  it('skips cache for no-cache policy', async () => {
    await expect(withCache(KEY, CacheNone(), actionFn)).resolves.toEqual(VALUE);

    expect(waitUntil).toHaveBeenCalledTimes(0);
    expect(actionFn).toHaveBeenCalledTimes(1);
    await expect(getItemFromCache(cache, KEY)).resolves.toEqual(undefined);

    await expect(withCache(KEY, CacheNone(), actionFn)).resolves.toEqual(VALUE);

    // No cache, always calls the action function:
    expect(waitUntil).toHaveBeenCalledTimes(0);
    expect(actionFn).toHaveBeenCalledTimes(2);
    await expect(getItemFromCache(cache, KEY)).resolves.toEqual(undefined);
  });

  it('skips cache when throwing', async () => {
    actionFn.mockImplementationOnce(() => {
      return Promise.resolve().then(() => {
        throw new Error('test');
      });
    });

    await expect(withCache(KEY, CacheShort(), actionFn)).rejects.toThrowError(
      'test',
    );

    expect(waitUntil).toHaveBeenCalledTimes(0);
    expect(actionFn).toHaveBeenCalledTimes(1);
    await expect(getItemFromCache(cache, KEY)).resolves.toEqual(undefined);
  });

  it('stores results in the cache', async () => {
    const strategy = CacheShort({maxAge: 1, staleWhileRevalidate: 9});
    await expect(withCache(KEY, strategy, actionFn)).resolves.toEqual(VALUE);

    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(actionFn).toHaveBeenCalledTimes(1);
    await expect(getItemFromCache(cache, KEY)).resolves.toContainEqual({
      value: VALUE,
    });

    // Less than 1 sec of the cache duration:
    vi.advanceTimersByTime(999);

    await expect(withCache(KEY, strategy, actionFn)).resolves.toEqual(VALUE);

    // Cache hit, nothing to update:
    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(actionFn).toHaveBeenCalledTimes(1);
    await expect(getItemFromCache(cache, KEY)).resolves.toContainEqual({
      value: VALUE,
    });
  });

  it('applies stale-while-revalidate', async () => {
    const strategy = CacheShort({maxAge: 1, staleWhileRevalidate: 9});
    await expect(withCache(KEY, strategy, actionFn)).resolves.toEqual(VALUE);

    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(actionFn).toHaveBeenCalledTimes(1);
    await expect(getItemFromCache(cache, KEY)).resolves.toContainEqual({
      value: VALUE,
    });

    // More than 1 sec of the cache duration:
    vi.advanceTimersByTime(3000);

    await expect(withCache(KEY, strategy, actionFn)).resolves.toEqual(VALUE);

    // Cache stale, call the action function again for SWR:
    expect(waitUntil).toHaveBeenCalledTimes(2);
    expect(actionFn).toHaveBeenCalledTimes(2);
    await expect(getItemFromCache(cache, KEY)).resolves.toContainEqual({
      value: VALUE,
    });

    // Make the cache expire. Note: We add a padded maxAge to the cache control
    // header to support SWR in Oxygen/CFW. Our InMemoryCache doesn't understand
    // this padded maxAge, so we need to advance timers considering the padded
    // value: maxAge + (2 * SWR) => 19 sec.
    vi.advanceTimersByTime(19001);
    await expect(getItemFromCache(cache, KEY)).resolves.toEqual(undefined);

    // Cache is expired, call the action function again:
    await expect(withCache(KEY, strategy, actionFn)).resolves.toEqual(VALUE);
    expect(waitUntil).toHaveBeenCalledTimes(3);
    expect(actionFn).toHaveBeenCalledTimes(3);
  });
});
