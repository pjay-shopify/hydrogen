import { createStorefrontClient as createStorefrontClient$1, StorefrontClientProps, ShopPayButton as ShopPayButton$1, RichText as RichText$1 } from '@shopify/hydrogen-react';
export { AnalyticsEventName, AnalyticsPageType, ClientBrowserParameters, ExternalVideo, IMAGE_FRAGMENT, Image, MediaFile, ModelViewer, Money, ParsedMetafields, ShopifyAnalytics as SendShopifyAnalyticsEvent, ShopifyAddToCart, ShopifyAddToCartPayload, ShopifyAnalyticsPayload, ShopifyAnalyticsProduct, ShopifyCookies, ShopifyPageView, ShopifyPageViewPayload, ShopifySalesChannel, StorefrontApiResponse, StorefrontApiResponseError, StorefrontApiResponseOk, StorefrontApiResponseOkPartial, StorefrontApiResponsePartial, Video, customerAccountApiCustomScalars, flattenConnection, getClientBrowserParameters, getShopifyCookies, parseGid, parseMetafield, sendShopifyAnalytics, storefrontApiCustomScalars, useLoadScript, useMoney, useShopifyCookies } from '@shopify/hydrogen-react';
import { LanguageCode, CountryCode, Maybe, PageInfo, BuyerInput, CartMetafieldsSetInput, Cart, Scalars, CartUserError, MetafieldsSetUserError, MetafieldDeleteUserError, CartLineInput, AttributeInput, CartBuyerIdentityInput, CartInput, CartLineUpdateInput, CartSelectedDeliveryOptionInput, CartLine, ProductVariant, ProductOption, ProductVariantConnection, SelectedOptionInput, Product, ComponentizableCartLine, CurrencyCode } from '@shopify/hydrogen-react/storefront-api-types';
import { ExecutionArgs } from 'graphql';
import { LoaderFunctionArgs, LoaderFunction, SerializeFrom, SessionData, FlashSessionData, Session, SessionStorage } from '@remix-run/server-runtime';
import * as react from 'react';
import { FC, Ref, ReactNode, ComponentType, ComponentProps } from 'react';
import { Params, Location, MetaFunction, LinkProps, FetcherWithComponents } from '@remix-run/react';
import { WithContext, Thing } from 'schema-dts';
import { PartialDeep } from 'type-fest';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Override options for a cache strategy.
 */
interface AllCacheOptions {
    /**
     * The caching mode, generally `public`, `private`, or `no-store`.
     */
    mode?: string;
    /**
     * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
     */
    maxAge?: number;
    /**
     * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
     */
    staleWhileRevalidate?: number;
    /**
     * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
     */
    sMaxAge?: number;
    /**
     * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
     */
    staleIfError?: number;
}
/**
 * Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: CacheNone, CacheShort, CacheLong.
 */
type CachingStrategy = AllCacheOptions;
type NoStoreStrategy = {
    mode: string;
};
declare function generateCacheControlHeader(cacheOptions: CachingStrategy): string;
/**
 *
 * @public
 */
declare function CacheNone(): NoStoreStrategy;
/**
 *
 * @public
 */
declare function CacheShort(overrideOptions?: CachingStrategy): AllCacheOptions;
/**
 *
 * @public
 */
declare function CacheLong(overrideOptions?: CachingStrategy): AllCacheOptions;
/**
 *
 * @public
 */
declare function CacheCustom(overrideOptions: CachingStrategy): AllCacheOptions;

/**
Returns a boolean for whether the two given types are equal.

@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

Use-cases:
- If you want to make a conditional branch based on the result of a comparison of two types.

@example
```
import type {IsEqual} from 'type-fest';

// This type returns a boolean for whether the given array includes the given item.
// `IsEqual` is used to compare the given array at position 0 and the given item and then return true if they are equal.
type Includes<Value extends readonly any[], Item> =
	Value extends readonly [Value[0], ...infer rest]
		? IsEqual<Value[0], Item> extends true
			? true
			: Includes<rest, Item>
		: false;
```

@category Type Guard
@category Utilities
*/
type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? true : false;
/**
Filter out keys from an object.

Returns `never` if `Exclude` is strictly equal to `Key`.
Returns `never` if `Key` extends `Exclude`.
Returns `Key` otherwise.

@example
```
type Filtered = Filter<'foo', 'foo'>;
//=> never
```

@example
```
type Filtered = Filter<'bar', string>;
//=> never
```

@example
```
type Filtered = Filter<'bar', 'foo'>;
//=> 'bar'
```

@see {Except}
*/
type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never : (KeyType extends ExcludeType ? never : KeyType);
type ExceptOptions = {
	/**
	Disallow assigning non-specified properties.

	Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.

	@default false
	*/
	requireExactProps?: boolean;
};
/**
Create a type from an object type without certain keys.

We recommend setting the `requireExactProps` option to `true`.

This type is a stricter version of [`Omit`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type). The `Omit` type does not restrict the omitted keys to be keys present on the given type, while `Except` does. The benefits of a stricter type are avoiding typos and allowing the compiler to pick up on rename refactors automatically.

This type was proposed to the TypeScript team, which declined it, saying they prefer that libraries implement stricter versions of the built-in types ([microsoft/TypeScript#30825](https://github.com/microsoft/TypeScript/issues/30825#issuecomment-523668235)).

@example
```
import type {Except} from 'type-fest';

type Foo = {
	a: number;
	b: string;
};

type FooWithoutA = Except<Foo, 'a'>;
//=> {b: string}

const fooWithoutA: FooWithoutA = {a: 1, b: '2'};
//=> errors: 'a' does not exist in type '{ b: string; }'

type FooWithoutB = Except<Foo, 'b', {requireExactProps: true}>;
//=> {a: number} & Partial<Record<"b", never>>

const fooWithoutB: FooWithoutB = {a: 1, b: '2'};
//=> errors at 'b': Type 'string' is not assignable to type 'undefined'.
```

@category Object
*/
type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = {
	requireExactProps: false;
}> = {
	[KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
} & (Options["requireExactProps"] extends true ? Partial<Record<KeysType, never>> : {});
/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```
import type {Simplify} from 'type-fest';

type PositionProps = {
	top: number;
	left: number;
};

type SizeProps = {
	width: number;
	height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;
```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```
import type {Simplify} from 'type-fest';

interface SomeInterface {
	foo: number;
	bar?: string;
	baz: number | undefined;
}

type SomeType = {
	foo: number;
	bar?: string;
	baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

function fn(object: Record<string, unknown>): void {}

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
```

@link https://github.com/microsoft/TypeScript/issues/15300
@see SimplifyDeep
@category Object
*/
type Simplify<T> = {
	[KeyType in keyof T]: T[KeyType];
} & {};
/**
Returns a boolean for whether the given type is `never`.

@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
@link https://stackoverflow.com/a/53984913/10292952
@link https://www.zhenghao.io/posts/ts-never

Useful in type utilities, such as checking if something does not occur.

@example
```
import type {IsNever, And} from 'type-fest';

// https://github.com/andnp/SimplyTyped/blob/master/src/types/strings.ts
type AreStringsEqual<A extends string, B extends string> =
	And<
		IsNever<Exclude<A, B>> extends true ? true : false,
		IsNever<Exclude<B, A>> extends true ? true : false
	>;

type EndIfEqual<I extends string, O extends string> =
	AreStringsEqual<I, O> extends true
		? never
		: void;

function endIfEqual<I extends string, O extends string>(input: I, output: O): EndIfEqual<I, O> {
	if (input === output) {
		process.exit(0);
	}
}

endIfEqual('abc', 'abc');
//=> never

endIfEqual('abc', '123');
//=> void
```

@category Type Guard
@category Utilities
*/
type IsNever<T> = [
	T
] extends [
	never
] ? true : false;
/**
Create a type that makes the given keys optional. The remaining keys are kept as is. The sister of the `SetRequired` type.

Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are optional.

@example
```
import type {SetOptional} from 'type-fest';

type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
// type SomeOptional = {
// 	a: number;
// 	b?: string; // Was already optional and still is.
// 	c?: boolean; // Is now optional.
// }
```

@category Object
*/
type SetOptional<BaseType, Keys extends keyof BaseType> = Simplify<
// Pick just the keys that are readonly from the base type.
Except<BaseType, Keys> & 
// Pick the keys that should be mutable from the base type and make them mutable.
Partial<Pick<BaseType, Keys>>>;
/**
 * This file has utilities to create GraphQL clients
 * that consume the types generated by the preset.
 */
/**
 * A generic type for `variables` in GraphQL clients
 */
type GenericVariables = ExecutionArgs["variableValues"];
/**
 * Use this type to make parameters optional in GraphQL clients
 * when no variables need to be passed.
 */
type EmptyVariables = {
	[key: string]: never;
};
/**
 * GraphQL client's generic operation interface.
 */
interface CodegenOperations {
	[key: string]: any;
}
/**
 * Used as the return type for GraphQL clients. It picks
 * the return type from the generated operation types.
 * @example
 * graphqlQuery: (...) => Promise<ClientReturn<...>>
 * graphqlQuery: (...) => Promise<{data: ClientReturn<...>}>
 */
type ClientReturn<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OverrideReturnType extends any = never> = IsNever<OverrideReturnType> extends true ? RawGqlString extends keyof GeneratedOperations ? GeneratedOperations[RawGqlString]["return"] : any : OverrideReturnType;
/**
 * Checks if the generated variables for an operation
 * are optional or required.
 */
type IsOptionalVariables<VariablesParam, OptionalVariableNames extends string = never, VariablesWithoutOptionals = Omit<VariablesParam, OptionalVariableNames>> = VariablesWithoutOptionals extends EmptyVariables ? true : GenericVariables extends VariablesParam ? true : Partial<VariablesWithoutOptionals> extends VariablesWithoutOptionals ? true : false;
/**
 * Used as the type for the GraphQL client's variables. It checks
 * the generated operation types to see if variables are optional.
 * @example
 * graphqlQuery: (query: string, param: ClientVariables<...>) => Promise<...>
 * Where `param` is required.
 */
type ClientVariables<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OptionalVariableNames extends string = never, VariablesKey extends string = "variables", GeneratedVariables = RawGqlString extends keyof GeneratedOperations ? SetOptional<GeneratedOperations[RawGqlString]["variables"], Extract<keyof GeneratedOperations[RawGqlString]["variables"], OptionalVariableNames>> : GenericVariables, VariablesWrapper = Record<VariablesKey, GeneratedVariables>> = IsOptionalVariables<GeneratedVariables, OptionalVariableNames> extends true ? Partial<VariablesWrapper> : VariablesWrapper;
/**
 * Similar to ClientVariables, but makes the whole wrapper optional:
 * @example
 * graphqlQuery: (query: string, ...params: ClientVariablesInRestParams<...>) => Promise<...>
 * Where the first item in `params` might be optional depending on the query.
 */
type ClientVariablesInRestParams<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OtherParams extends Record<string, any> = {}, OptionalVariableNames extends string = never, ProcessedVariables = OtherParams & ClientVariables<GeneratedOperations, RawGqlString, OptionalVariableNames>> = Partial<OtherParams> extends OtherParams ? IsOptionalVariables<GeneratedOperations[RawGqlString]["variables"], OptionalVariableNames> extends true ? [
	ProcessedVariables?
] : [
	ProcessedVariables
] : [
	ProcessedVariables
];

declare class GraphQLError extends Error {
    /**
     * If an error can be associated to a particular point in the requested
     * GraphQL document, it should contain a list of locations.
     */
    locations?: Array<{
        line: number;
        column: number;
    }>;
    /**
     * If an error can be associated to a particular field in the GraphQL result,
     * it _must_ contain an entry with the key `path` that details the path of
     * the response field which experienced the error. This allows clients to
     * identify whether a null result is intentional or caused by a runtime error.
     */
    path?: Array<string | number>;
    /**
     * Reserved for implementors to extend the protocol however they see fit,
     * and hence there are no additional restrictions on its contents.
     */
    extensions?: {
        [key: string]: unknown;
    };
    constructor(message?: string, options?: Pick<GraphQLError, 'locations' | 'path' | 'extensions' | 'stack' | 'cause'> & {
        query?: string;
        queryVariables?: GenericVariables;
        requestId?: string | null;
        clientOperation?: string;
    });
    get [Symbol.toStringTag](): string;
    /**
     * Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
     * when ingesting logs in Oxygen production. Therefore, we want to make sure that
     * the error message is as informative as possible instead of `[object Object]`.
     */
    toString(): string;
    /**
     * Note: toJSON` is internally used by `JSON.stringify(...)`.
     * The most common scenario when this error instance is going to be stringified is
     * when it's passed to Remix' `json` and `defer` functions: e.g. `defer({promise: storefront.query(...)})`.
     * In this situation, we don't want to expose private error information to the browser so we only
     * do it in development.
     */
    toJSON(): Pick<GraphQLError, "locations" | "path" | "extensions" | "stack" | "name" | "message">;
}

type StackInfo = {
    file?: string;
    func?: string;
    line?: number;
    column?: number;
};

/**
 * The cache key is used to uniquely identify a value in the cache.
 */
type CacheKey = string | readonly unknown[];
type DebugOptions = {
    url?: string;
    requestId?: string | null;
    graphql?: string | null;
    purpose?: string | null;
    stackInfo?: StackInfo;
    displayName?: string;
};
type AddDebugDataParam = {
    displayName?: string;
    response?: Pick<Response, 'url' | 'status' | 'statusText' | 'headers'>;
};
type CacheActionFunctionParam = {
    addDebugData: (info: AddDebugDataParam) => void;
};

type SpanEvent = {
    traceId: string;
    id: string;
    name: string;
    timestamp: number;
    duration: number;
    parentId?: string;
    tags: Record<string, string>;
};
type SpanEmitter = (debugInfo: DebugOptions, startTime: number, cacheStatus?: string, root?: boolean) => void;
declare function createSpanCollector(traceId?: string): [SpanEmitter, () => Promise<void>];
declare function emitSpanEvent(debugInfo: DebugOptions, startTime: number, cacheStatus?: string, root?: boolean): void;
declare function flushSpanEvents(): Promise<void>;

type I18nBase = {
    language: LanguageCode;
    country: CountryCode;
};
type JsonGraphQLError$1 = ReturnType<GraphQLError['toJSON']>;
type StorefrontApiErrors = JsonGraphQLError$1[] | undefined;
type StorefrontError = {
    errors?: StorefrontApiErrors;
};
/**
 * Wraps all the returned utilities from `createStorefrontClient`.
 */
type StorefrontClient<TI18n extends I18nBase> = {
    storefront: Storefront<TI18n>;
};
/**
 * Maps all the queries found in the project to variables and return types.
 */
interface StorefrontQueries {
}
/**
 * Maps all the mutations found in the project to variables and return types.
 */
interface StorefrontMutations {
}
type AutoAddedVariableNames = 'country' | 'language';
type StorefrontCommonExtraParams = {
    headers?: HeadersInit;
    storefrontApiVersion?: string;
    displayName?: string;
};
/**
 * Interface to interact with the Storefront API.
 */
type Storefront<TI18n extends I18nBase = I18nBase> = {
    query: <OverrideReturnType extends any = never, RawGqlString extends string = string>(query: RawGqlString, ...options: ClientVariablesInRestParams<StorefrontQueries, RawGqlString, StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>, AutoAddedVariableNames>) => Promise<ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> & StorefrontError>;
    mutate: <OverrideReturnType extends any = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: ClientVariablesInRestParams<StorefrontMutations, RawGqlString, StorefrontCommonExtraParams, AutoAddedVariableNames>) => Promise<ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> & StorefrontError>;
    cache?: Cache;
    CacheNone: typeof CacheNone;
    CacheLong: typeof CacheLong;
    CacheShort: typeof CacheShort;
    CacheCustom: typeof CacheCustom;
    generateCacheControlHeader: typeof generateCacheControlHeader;
    getPublicTokenHeaders: ReturnType<typeof createStorefrontClient$1>['getPublicTokenHeaders'];
    getPrivateTokenHeaders: ReturnType<typeof createStorefrontClient$1>['getPrivateTokenHeaders'];
    getShopifyDomain: ReturnType<typeof createStorefrontClient$1>['getShopifyDomain'];
    getApiUrl: ReturnType<typeof createStorefrontClient$1>['getStorefrontApiUrl'];
    i18n: TI18n;
};
type HydrogenClientProps<TI18n> = {
    /** Storefront API headers. If on Oxygen, use `getStorefrontHeaders()` */
    storefrontHeaders?: StorefrontHeaders;
    /** An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) */
    cache?: Cache;
    /** The globally unique identifier for the Shop */
    storefrontId?: string;
    /** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. */
    waitUntil?: ExecutionContext['waitUntil'];
    /** An object containing a country code and language code */
    i18n?: TI18n;
    /** Whether it should print GraphQL errors automatically. Defaults to true */
    logErrors?: boolean | ((error?: Error) => boolean);
    spanEmitter?: SpanEmitter;
};
type CreateStorefrontClientOptions<TI18n extends I18nBase> = HydrogenClientProps<TI18n> & StorefrontClientProps;
type StorefrontHeaders = {
    /** A unique ID that correlates all sub-requests together. */
    requestGroupId: string | null;
    /** The IP address of the client. */
    buyerIp: string | null;
    /** The cookie header from the client  */
    cookie: string | null;
    /** The purpose header value for debugging */
    purpose: string | null;
};
type StorefrontQueryOptions = StorefrontCommonExtraParams & {
    query: string;
    mutation?: never;
    cache?: CachingStrategy;
};
/**
 *  This function extends `createStorefrontClient` from [Hydrogen React](/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.
 *
 *  Learn more about [data fetching in Hydrogen](/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
 */
declare function createStorefrontClient<TI18n extends I18nBase>(options: CreateStorefrontClientOptions<TI18n>): StorefrontClient<TI18n>;
declare function formatAPIResult<T>(data: T, errors: StorefrontApiErrors): T & StorefrontError;
type CreateStorefrontClientForDocs<TI18n extends I18nBase> = {
    storefront?: StorefrontForDoc<TI18n>;
};
type StorefrontForDoc<TI18n extends I18nBase = I18nBase> = {
    /** The function to run a query on Storefront API. */
    query?: <TData = any>(query: string, options: StorefrontQueryOptionsForDocs) => Promise<TData & StorefrontError>;
    /** The function to run a mutation on Storefront API. */
    mutate?: <TData = any>(mutation: string, options: StorefrontMutationOptionsForDocs) => Promise<TData & StorefrontError>;
    /** The cache instance passed in from the `createStorefrontClient` argument. */
    cache?: Cache;
    /** Re-export of [`CacheNone`](/docs/api/hydrogen/2024-04/utilities/cachenone). */
    CacheNone?: typeof CacheNone;
    /** Re-export of [`CacheLong`](/docs/api/hydrogen/2024-04/utilities/cachelong). */
    CacheLong?: typeof CacheLong;
    /** Re-export of [`CacheShort`](/docs/api/hydrogen/2024-04/utilities/cacheshort). */
    CacheShort?: typeof CacheShort;
    /** Re-export of [`CacheCustom`](/docs/api/hydrogen/2024-04/utilities/cachecustom). */
    CacheCustom?: typeof CacheCustom;
    /** Re-export of [`generateCacheControlHeader`](/docs/api/hydrogen/2024-04/utilities/generatecachecontrolheader). */
    generateCacheControlHeader?: typeof generateCacheControlHeader;
    /** Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. See [`getPublicTokenHeaders` in Hydrogen React](/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient#:~:text=%27graphql%27.-,getPublicTokenHeaders,-(props%3F%3A) for more details. */
    getPublicTokenHeaders?: ReturnType<typeof createStorefrontClient$1>['getPublicTokenHeaders'];
    /** Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint for API calls made from a server. See [`getPrivateTokenHeaders` in  Hydrogen React](/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient#:~:text=storefrontApiVersion-,getPrivateTokenHeaders,-(props%3F%3A) for more details.*/
    getPrivateTokenHeaders?: ReturnType<typeof createStorefrontClient$1>['getPrivateTokenHeaders'];
    /** Creates the fully-qualified URL to your myshopify.com domain. See [`getShopifyDomain` in  Hydrogen React](/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient#:~:text=StorefrontClientReturn-,getShopifyDomain,-(props%3F%3A) for more details. */
    getShopifyDomain?: ReturnType<typeof createStorefrontClient$1>['getShopifyDomain'];
    /** Creates the fully-qualified URL to your store's GraphQL endpoint. See [`getStorefrontApiUrl` in  Hydrogen React](/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient#:~:text=storeDomain-,getStorefrontApiUrl,-(props%3F%3A) for more details.*/
    getApiUrl?: ReturnType<typeof createStorefrontClient$1>['getStorefrontApiUrl'];
    /** The `i18n` object passed in from the `createStorefrontClient` argument. */
    i18n?: TI18n;
};
type StorefrontQueryOptionsForDocs = {
    /** The variables for the GraphQL query statement. */
    variables?: Record<string, unknown>;
    /** The cache strategy for this query. Default to max-age=1, stale-while-revalidate=86399. */
    cache?: CachingStrategy;
    /** Additional headers for this query. */
    headers?: HeadersInit;
    /** Override the Storefront API version for this query. */
    storefrontApiVersion?: string;
    /** The name of the query for debugging in the Subrequest Profiler. */
    displayName?: string;
};
type StorefrontMutationOptionsForDocs = {
    /** The variables for the GraphQL mutation statement. */
    variables?: Record<string, unknown>;
    /** Additional headers for this query. */
    headers?: HeadersInit;
    /** Override the Storefront API version for this query. */
    storefrontApiVersion?: string;
    /** The name of the query for debugging in the Subrequest Profiler. */
    displayName?: string;
};

type CrossRuntimeRequest = {
    url?: string;
    method?: string;
    headers: {
        get?: (key: string) => string | null | undefined;
        [key: string]: any;
    };
};

type CreateWithCacheOptions = {
    /** An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) */
    cache: Cache;
    /** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. */
    waitUntil: ExecutionContext['waitUntil'];
    /** The `request` object is used to access certain headers for debugging */
    request?: CrossRuntimeRequest;
};
/**
 * Creates a utility function that executes an asynchronous operation
 * like `fetch` and caches the result according to the strategy provided.
 * Use this to call any third-party APIs from loaders or actions.
 *
 */
declare function createWithCache<T = unknown>({ cache, waitUntil, request, }: CreateWithCacheOptions): CreateWithCacheReturn<T>;
/**
 * This is a caching async function. Whatever data is returned from the `actionFn` will be cached according to the strategy provided.
 *
 * Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the built-in caching strategies: `CacheNone`, `CacheShort`, `CacheLong`.
 */
type CreateWithCacheReturn<T> = <U = T>(cacheKey: CacheKey, strategy: CachingStrategy, actionFn: ({ addDebugData }: CacheActionFunctionParam) => U | Promise<U>) => Promise<U>;
type WithCache = ReturnType<typeof createWithCache>;

/**
 * This is a limited implementation of an in-memory cache.
 * It only supports the `cache-control` header.
 * It does NOT support `age` or `expires` headers.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */
declare class InMemoryCache implements Cache {
    #private;
    constructor();
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<readonly Response[]>;
    put(request: Request, response: Response): Promise<void>;
    match(request: Request): Promise<Response | undefined>;
    delete(request: Request): Promise<boolean>;
    keys(request?: Request): Promise<Request[]>;
}

type StorefrontRedirect = {
    /** The [Storefront client](/docs/api/hydrogen/2024-04/utilities/createstorefrontclient) instance */
    storefront: Storefront<I18nBase>;
    /** The [MDN Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object that was passed to the `server.ts` request handler. */
    request: Request;
    /** The [MDN Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object created by `handleRequest` */
    response?: Response;
    /** By default the `/admin` route is redirected to the Shopify Admin page for the current storefront. Disable this redirect by passing `true`. */
    noAdminRedirect?: boolean;
    /** By default, query parameters are not used to match redirects. Set this to `true` if you'd like redirects to be query parameter sensitive */
    matchQueryParams?: boolean;
};
/**
 * Queries the Storefront API to see if there is any redirect
 * created for the current route and performs it. Otherwise,
 * it returns the response passed in the parameters. Useful for
 * conditionally redirecting after a 404 response.
 *
 * @see {@link https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect Creating URL redirects in Shopify}
 */
declare function storefrontRedirect(options: StorefrontRedirect): Promise<Response>;

type GraphiQLLoader = (args: LoaderFunctionArgs) => Promise<Response>;
declare const graphiqlLoader: GraphiQLLoader;

interface SeoConfig {
    /**
     * The `title` HTML element defines the document's title that is shown in a browser's title bar or a page's tab. It
     * only contains text; tags within the element are ignored.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
     */
    title?: Maybe<string>;
    /**
     * Generate the title from a template that includes a `%s` placeholder for the title.
     *
     * @example
     * ```js
     * {
     *   title: 'My Page',
     *   titleTemplate: 'My Site - %s',
     * }
     * ```
     */
    titleTemplate?: Maybe<string> | null;
    /**
     * The media associated with the given page (images, videos, etc). If you pass a string, it will be used as the
     * `og:image` meta tag. If you pass an object or an array of objects, that will be used to generate `og:<type of
     * media>` meta tags. The `url` property should be the URL of the media. The `height` and `width` properties are
     * optional and should be the height and width of the media. The `altText` property is optional and should be a
     * description of the media.
     *
     * @example
     * ```js
     * {
     *   media: [
     *     {
     *       url: 'https://example.com/image.jpg',
     *       type: 'image',
     *       height: '400',
     *       width: '400',
     *       altText: 'A custom snowboard with an alpine color pallet.',
     *     }
     *   ]
     * }
     * ```
     *
     */
    media?: Maybe<string> | Partial<SeoMedia> | (Partial<SeoMedia> | Maybe<string>)[];
    /**
     * The description of the page. This is used in the `name="description"` meta tag as well as the `og:description` meta
     * tag.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
     */
    description?: Maybe<string>;
    /**
     * The canonical URL of the page. This is used to tell search engines which URL is the canonical version of a page.
     * This is useful when you have multiple URLs that point to the same page. The value here will be used in the
     * `rel="canonical"` link tag as well as the `og:url` meta tag.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
     */
    url?: Maybe<string>;
    /**
     * The handle is used to generate the `twitter:site` and `twitter:creator` meta tags. Include the `@` symbol in the
     * handle.
     *
     * @example
     * ```js
     * {
     *   handle: '@shopify'
     * }
     * ```
     */
    handle?: Maybe<string>;
    /**
     * The `jsonLd` property is used to generate the `application/ld+json` script tag. This is used to provide structured
     * data to search engines. The value should be an object that conforms to the schema.org spec. The `type` property
     * should be the type of schema you are using. The `type` property is required and should be one of the following:
     *
     * - `Product`
     * - `ItemList`
     * - `Organization`
     * - `WebSite`
     * - `WebPage`
     * - `BlogPosting`
     * - `Thing`
     *
     * The value is validated via [schema-dts](https://www.npmjs.com/package/schema-dts)
     *
     * @example
     * ```js
     * {
     *   jsonLd: {
     *     '@context': 'https://schema.org',
     *     '@type': 'Product',
     *     name: 'My Product',
     *     image: 'https://hydrogen.shop/image.jpg',
     *     description: 'A product that is great',
     *     sku: '12345',
     *     mpn: '12345',
     *     brand: {
     *       '@type': 'Thing',
     *       name: 'My Brand',
     *     },
     *     aggregateRating: {
     *       '@type': 'AggregateRating',
     *       ratingValue: '4.5',
     *       reviewCount: '100',
     *     },
     *     offers: {
     *       '@type': 'Offer',
     *       priceCurrency: 'USD',
     *       price: '100',
     *       priceValidUntil: '2020-11-05',
     *       itemCondition: 'https://schema.org/NewCondition',
     *       availability: 'https://schema.org/InStock',
     *       seller: {
     *         '@type': 'Organization',
     *         name: 'My Brand',
     *       },
     *     },
     *   }
     * }
     * ```
     *
     * @see https://schema.org/docs/schemas.html
     * @see https://developers.google.com/search/docs/guides/intro-structured-data
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
     *
     */
    jsonLd?: WithContext<Thing> | WithContext<Thing>[];
    /**
     * The `alternates` property is used to specify the language and geographical targeting when you have multiple
     * versions of the same page in different languages. The `url` property tells search engines about these variations
     * and helps them to serve the correct version to their users.
     *
     * @example
     * ```js
     * {
     *   alternates: [
     *     {
     *       language: 'en-US',
     *       url: 'https://hydrogen.shop/en-us',
     *       default: true,
     *     },
     *     {
     *       language: 'fr-CA',
     *       url: 'https://hydrogen.shop/fr-ca',
     *     },
     *   ]
     * }
     * ```
     *
     * @see https://support.google.com/webmasters/answer/189077?hl=en
     */
    alternates?: LanguageAlternate | LanguageAlternate[];
    /**
     * The `robots` property is used to specify the robots meta tag. This is used to tell search engines which pages
     * should be indexed and which should not.
     *
     * @see https://developers.google.com/search/reference/robots_meta_tag
     */
    robots?: RobotsOptions;
}
/**
 * @see https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
 */
interface RobotsOptions {
    /**
     * Set the maximum size of an image preview for this page in a search results Can be one of the following:
     *
     * - `none` - No image preview is to be shown.
     * - `standard` - A default image preview may be shown.
     * - `large` - A larger image preview, up to the width of the viewport, may be shown.
     *
     * If no value is specified a default image preview size is used.
     */
    maxImagePreview?: 'none' | 'standard' | 'large';
    /**
     * A number representing the maximum of amount characters to use as a textual snippet for a search result. This value
     * can also be set to one of the following special values:
     *
     * - 0 - No snippet is to be shown. Equivalent to nosnippet.
     * - 1 - The Search engine will choose the snippet length that it believes is most effective to help users discover
     *   your content and direct users to your site
     * - -1 - No limit on the number of characters that can be shown in the snippet.
     */
    maxSnippet?: number;
    /**
     * The maximum number of seconds for videos on this page to show in search results. This value can also be set to one
     * of the following special values:
     *
     * - 0 - A static image may be used with the `maxImagePreview` setting.
     * - 1 - There is no limit to the size of the video preview.
     *
     * This applies to all forms of search results (at Google: web search, Google Images, Google Videos, Discover,
     * Assistant).
     */
    maxVideoPreview?: number;
    /**
     * Do not show a cached link in search results.
     */
    noArchive?: boolean;
    /**
     * Do not follow the links on this page.
     *
     * @see https://developers.google.com/search/docs/advanced/guidelines/qualify-outbound-links
     */
    noFollow?: boolean;
    /**
     * Do not index images on this page.
     */
    noImageIndex?: boolean;
    /**
     * Do not show this page, media, or resource in search results.
     */
    noIndex?: boolean;
    /**
     * Do not show a text snippet or video preview in the search results for this page.
     */
    noSnippet?: boolean;
    /**
     * Do not offer translation of this page in search results.
     */
    noTranslate?: boolean;
    /**
     * Do not show this page in search results after the specified date/time.
     */
    unavailableAfter?: string;
}
interface LanguageAlternate {
    /**
     * Language code for the alternate page. This is used to generate the hreflang meta tag property.
     */
    language: string;
    /**
     * Whether the alternate page is the default page. This will add the `x-default` attribution to the language code.
     */
    default?: boolean;
    /**
     * The url of the alternate page. This is used to generate the hreflang meta tag property.
     */
    url: string;
}
type SeoMedia = {
    /**
     * Used to generate og:<type of media> meta tag
     */
    type: 'image' | 'video' | 'audio';
    /**
     * The url value populates both url and secure_url and is used to infer the og:<type of media>:type meta tag.
     */
    url: Maybe<string> | undefined;
    /**
     * The height in pixels of the media. This is used to generate the og:<type of media>:height meta tag.
     */
    height: Maybe<number> | undefined;
    /**
     * The width in pixels of the media. This is used to generate the og:<type of media>:width meta tag.
     */
    width: Maybe<number> | undefined;
    /**
     * The alt text for the media. This is used to generate the og:<type of media>:alt meta tag.
     */
    altText: Maybe<string> | undefined;
};

interface SeoHandleFunction<Loader extends LoaderFunction | unknown = unknown> {
    (args: {
        data: Loader extends LoaderFunction ? SerializeFrom<Loader> : unknown;
        id: string;
        params: Params;
        pathname: Location['pathname'];
        search: Location['search'];
        hash: Location['hash'];
        key: string;
    }): Partial<SeoConfig>;
}
interface SeoProps {
    /** Enable debug mode that prints SEO properties for route in the console */
    debug?: boolean;
}
/**
 * @deprecated - use `getSeoMeta` instead
 */
declare function Seo({ debug }: SeoProps): react.FunctionComponentElement<{
    children?: react.ReactNode;
}>;

type GetSeoMetaReturn = ReturnType<MetaFunction>;
type Optional<T> = T | null | undefined;
/**
 * Generate a Remix meta array from one or more SEO configuration objects. This is useful to pass SEO configuration for the parent route(s) and the current route. Similar to `Object.assign()`, each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data.
 */
declare function getSeoMeta(...seoInputs: Optional<SeoConfig>[]): GetSeoMetaReturn;

declare global {
    interface Window {
        __hydrogenHydrated?: boolean;
    }
}
type Connection<NodesType> = {
    nodes: Array<NodesType>;
    pageInfo: PageInfo;
} | {
    edges: Array<{
        node: NodesType;
    }>;
    pageInfo: PageInfo;
};
interface PaginationInfo<NodesType> {
    /** The paginated array of nodes. You should map over and render this array. */
    nodes: Array<NodesType>;
    /** The `<NextLink>` is a helper component that makes it easy to navigate to the next page of paginated data. Alternatively you can build your own `<Link>` component: `<Link to={nextPageUrl} state={state} preventScrollReset />` */
    NextLink: FC<Omit<LinkProps, 'to'> & {
        ref?: Ref<HTMLAnchorElement>;
    }>;
    /** The `<PreviousLink>` is a helper component that makes it easy to navigate to the previous page of paginated data. Alternatively you can build your own `<Link>` component: `<Link to={previousPageUrl} state={state} preventScrollReset />` */
    PreviousLink: FC<Omit<LinkProps, 'to'> & {
        ref?: Ref<HTMLAnchorElement>;
    }>;
    /** The URL to the previous page of paginated data. Use this prop to build your own `<Link>` component. */
    previousPageUrl: string;
    /** The URL to the next page of paginated data. Use this prop to build your own `<Link>` component. */
    nextPageUrl: string;
    /** True if the cursor has next paginated data */
    hasNextPage: boolean;
    /** True if the cursor has previous paginated data */
    hasPreviousPage: boolean;
    /** True if we are in the process of fetching another page of data */
    isLoading: boolean;
    /** The `state` property is important to use when building your own `<Link>` component if you want paginated data to continuously append to the page. This means that every time the user clicks "Next page", the next page of data will be apppended inline with the previous page. If you want the whole page to re-render with only the next page results, do not pass the `state` prop to the Remix `<Link>` component. */
    state: {
        nodes: Array<NodesType>;
        pageInfo: {
            endCursor: Maybe<string> | undefined;
            startCursor: Maybe<string> | undefined;
            hasPreviousPage: boolean;
        };
    };
}
type PaginationProps<NodesType> = {
    /** The response from `storefront.query` for a paginated request. Make sure the query is passed pagination variables and that the query has `pageInfo` with `hasPreviousPage`, `hasNextpage`, `startCursor`, and `endCursor` defined. */
    connection: Connection<NodesType>;
    /** A render prop that includes pagination data and helpers. */
    children: PaginationRenderProp<NodesType>;
};
type PaginationRenderProp<NodesType> = FC<PaginationInfo<NodesType>>;
/**
 *
 * The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data
 * and the \`<Pagination />\` component makes it easy to paginate data from the Storefront API.
 *
 * @prop connection The response from `storefront.query` for a paginated request. Make sure the query is passed pagination variables and that the query has `pageInfo` with `hasPreviousPage`, `hasNextpage`, `startCursor`, and `endCursor` defined.
 * @prop children A render prop that includes pagination data and helpers.
 */
declare function Pagination<NodesType>({ connection, children, }: PaginationProps<NodesType>): ReturnType<FC>;
/**
 * @param request The request object passed to your Remix loader function.
 * @param options Options for how to configure the pagination variables. Includes the ability to change how many nodes are within each page.
 *
 * @returns Variables to be used with the `storefront.query` function
 */
declare function getPaginationVariables(request: Request, options?: {
    pageBy: number;
}): {
    last: number;
    startCursor: string | null;
} | {
    first: number;
    endCursor: string | null;
};

type RequestEventPayload = {
    __fromVite?: boolean;
    url: string;
    eventType: 'request' | 'subrequest';
    requestId?: string | null;
    purpose?: string | null;
    startTime: number;
    endTime?: number;
    cacheStatus?: 'MISS' | 'HIT' | 'STALE' | 'PUT';
    waitUntil?: ExecutionContext['waitUntil'];
    graphql?: string | null;
    stackInfo?: {
        file?: string;
        func?: string;
        line?: number;
        column?: number;
    };
    responsePayload?: any;
    responseInit?: Omit<ResponseInit, 'headers'> & {
        headers?: [string, string][];
    };
    cache?: {
        status?: string;
        strategy?: string;
        key?: string | readonly unknown[];
    };
    displayName?: string;
};

declare const CUSTOMER_ACCOUNT_SESSION_KEY = "customerAccount";
declare const BUYER_SESSION_KEY = "buyer";

interface HydrogenSessionData {
  [CUSTOMER_ACCOUNT_SESSION_KEY]: {
    accessToken?: string;
    expiresAt?: string;
    refreshToken?: string;
    codeVerifier?: string;
    idToken?: string;
    nonce?: string;
    state?: string;
    redirectPath?: string;
  };
  // for B2B buyer context
  [BUYER_SESSION_KEY]: Partial<BuyerInput>;
}

interface HydrogenSession<
  Data = SessionData,
  FlashData = FlashSessionData,
> {
  get: Session<HydrogenSessionData & Data, FlashData>['get'];
  set: Session<HydrogenSessionData & Data, FlashData>['set'];
  unset: Session<HydrogenSessionData & Data, FlashData>['unset'];
  commit: () => ReturnType<
    SessionStorage<HydrogenSessionData & Data, FlashData>['commitSession']
  >;
  isPending?: boolean;
}

declare global {
  interface Window {
    privacyBanner: PrivacyBanner;
    Shopify: {
      customerPrivacy: CustomerPrivacy;
    };
  }
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
  var __H2O_LOG_EVENT: undefined | ((event: RequestEventPayload) => void);
  var __SPANS: undefined | SpanEvent[];
  var __remix_devServerHooks:
    | undefined
    | {getCriticalCss: (...args: unknown[]) => any};
}

type DataFunctionValue = Response | NonNullable<unknown> | null;
type JsonGraphQLError = ReturnType<GraphQLError['toJSON']>;
type Buyer = Partial<BuyerInput>;
type CustomerAPIResponse<ReturnType> = {
    data: ReturnType;
    errors: Array<{
        message: string;
        locations?: Array<{
            line: number;
            column: number;
        }>;
        path?: Array<string>;
        extensions: {
            code: string;
        };
    }>;
    extensions: {
        cost: {
            requestQueryCost: number;
            actualQueryCakes: number;
            throttleStatus: {
                maximumAvailable: number;
                currentAvailable: number;
                restoreRate: number;
            };
        };
    };
};
interface CustomerAccountQueries {
}
interface CustomerAccountMutations {
}
type LoginOptions = {
    uiLocales?: LanguageCode;
};
type LogoutOptions = {
    postLogoutRedirectUri?: string;
};
type CustomerAccount = {
    /** Start the OAuth login flow. This function should be called and returned from a Remix action.
     * It redirects the customer to a Shopify login domain. It also defined the final path the customer
     * lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is
     * automatically setup unless `customAuthStatusHandler` option is in use)
     *
     * @param options.uiLocales - The displayed language of the login page. Only support for the following languages:
     * `en`, `fr`, `cs`, `da`, `de`, `es`, `fi`, `it`, `ja`, `ko`, `nb`, `nl`, `pl`, `pt-BR`, `pt-PT`,
     * `sv`, `th`, `tr`, `vi`, `zh-CN`, `zh-TW`. If supplied any other language code, it will default to `en`.
     * */
    login: (options?: LoginOptions) => Promise<Response>;
    /** On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin. */
    authorize: () => Promise<Response>;
    /** Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed. */
    isLoggedIn: () => Promise<boolean>;
    /** Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option. */
    handleAuthStatus: () => void | DataFunctionValue;
    /** Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed. */
    getAccessToken: () => Promise<string | undefined>;
    /** Creates the fully-qualified URL to your store's GraphQL endpoint.*/
    getApiUrl: () => string;
    /** Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.
     *
     * @param options.postLogoutRedirectUri - The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.
     * */
    logout: (options?: LogoutOptions) => Promise<Response>;
    /** Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query. */
    query: <OverrideReturnType extends any = never, RawGqlString extends string = string>(query: RawGqlString, ...options: ClientVariablesInRestParams<CustomerAccountQueries, RawGqlString>) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>>, 'errors'> & {
        errors?: JsonGraphQLError[];
    }>;
    /** Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation. */
    mutate: <OverrideReturnType extends any = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: ClientVariablesInRestParams<CustomerAccountMutations, RawGqlString>) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>>, 'errors'> & {
        errors?: JsonGraphQLError[];
    }>;
    /** UNSTABLE feature. Set buyer information into session.*/
    UNSTABLE_setBuyer: (buyer: Buyer) => void;
    /** UNSTABLE feature. Get buyer token and company location id from session.*/
    UNSTABLE_getBuyer: () => Promise<Buyer>;
};
type CustomerAccountOptions = {
    /** The client requires a session to persist the auth and refresh token. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation.  */
    session: HydrogenSession;
    /** Unique UUID prefixed with `shp_` associated with the application, this should be visible in the customer account api settings in the Hydrogen admin channel. Mock.shop doesn't automatically supply customerAccountId. Use `npx shopify hydrogen env pull` to link your store credentials. */
    customerAccountId: string;
    /** The account URL associated with the application, this should be visible in the customer account api settings in the Hydrogen admin channel. Mock.shop doesn't automatically supply customerAccountUrl. Use `npx shopify hydrogen env pull` to link your store credentials. */
    customerAccountUrl: string;
    /** Override the version of the API */
    customerApiVersion?: string;
    /** The object for the current Request. It should be provided by your platform. */
    request: CrossRuntimeRequest;
    /** The waitUntil function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. */
    waitUntil?: ExecutionContext['waitUntil'];
    /** This is the route in your app that authorizes the customer after logging in. Make sure to call `customer.authorize()` within the loader on this route. It defaults to `/account/authorize`. */
    authUrl?: string;
    /** Use this method to overwrite the default logged-out redirect behavior. The default handler [throws a redirect](https://remix.run/docs/en/main/utils/redirect#:~:text=!session) to `/account/login` with current path as `return_to` query param. */
    customAuthStatusHandler?: () => DataFunctionValue;
    /** Whether it should print GraphQL errors automatically. Defaults to true */
    logErrors?: boolean | ((error?: Error) => boolean);
    /** UNSTABLE feature, this will eventually goes away. If true then we will exchange customerAccessToken for storefrontCustomerAccessToken. */
    unstableB2b?: boolean;
};

declare function createCustomerAccountClient({ session, customerAccountId, customerAccountUrl, customerApiVersion, request, waitUntil, authUrl, customAuthStatusHandler, logErrors, unstableB2b, }: CustomerAccountOptions): CustomerAccount;

/**
 * A custom Remix loader handler that fetches the changelog.json from GitHub.
 * It is used by the `upgrade` command inside the route `https://hydrogen.shopify.dev/changelog.json`
 */
declare function changelogHandler({ request, changelogUrl, }: {
    request: Request;
    changelogUrl?: string;
}): Promise<Response>;

type CartOptionalInput = {
    /**
     * The cart id.
     * @default cart.getCartId();
     */
    cartId?: Scalars['ID']['input'];
    /**
     * The country code.
     * @default storefront.i18n.country
     */
    country?: CountryCode;
    /**
     * The language code.
     * @default storefront.i18n.language
     */
    language?: LanguageCode;
};
type MetafieldWithoutOwnerId = Omit<CartMetafieldsSetInput, 'ownerId'>;
type CartQueryOptions = {
    /**
     * The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/latest/utilities/createstorefrontclient).
     */
    storefront: Storefront;
    /**
     * A function that returns the cart ID.
     */
    getCartId: () => string | undefined;
    /**
     * The cart fragment to override the one used in this query.
     */
    cartFragment?: string;
    /**
     * The customer account instance created by [`createCustomerAccount`](docs/api/hydrogen/latest/customer/createcustomeraccount).
     */
    customerAccount?: CustomerAccount;
};
type CartReturn = Cart & {
    errors?: StorefrontApiErrors;
};
type CartQueryData = {
    cart: Cart;
    userErrors?: CartUserError[] | MetafieldsSetUserError[] | MetafieldDeleteUserError[];
};
type CartQueryDataReturn = CartQueryData & {
    errors?: StorefrontApiErrors;
};
type CartQueryReturn<T> = (requiredParams: T, optionalParams?: CartOptionalInput) => Promise<CartQueryData>;

type OtherFormData = {
    [key: string]: unknown;
};
type CartAttributesUpdateProps = {
    action: 'AttributesUpdateInput';
    inputs?: {
        attributes: AttributeInput[];
    } & OtherFormData;
};
type CartAttributesUpdateRequire = {
    action: 'AttributesUpdateInput';
    inputs: {
        attributes: AttributeInput[];
    } & OtherFormData;
};
type CartBuyerIdentityUpdateProps = {
    action: 'BuyerIdentityUpdate';
    inputs?: {
        buyerIdentity: CartBuyerIdentityInput;
    } & OtherFormData;
};
type CartBuyerIdentityUpdateRequire = {
    action: 'BuyerIdentityUpdate';
    inputs: {
        buyerIdentity: CartBuyerIdentityInput;
    } & OtherFormData;
};
type CartCreateProps = {
    action: 'Create';
    inputs?: {
        input: CartInput;
    } & OtherFormData;
};
type CartCreateRequire = {
    action: 'Create';
    inputs: {
        input: CartInput;
    } & OtherFormData;
};
type CartDiscountCodesUpdateProps = {
    action: 'DiscountCodesUpdate';
    inputs?: {
        discountCodes: string[];
    } & OtherFormData;
};
type CartDiscountCodesUpdateRequire = {
    action: 'DiscountCodesUpdate';
    inputs: {
        discountCodes: string[];
    } & OtherFormData;
};
type OptimisticCartLineInput = CartLineInput & {
    selectedVariant?: unknown;
};
type CartLinesAddProps = {
    action: 'LinesAdd';
    inputs?: {
        lines: Array<OptimisticCartLineInput>;
    } & OtherFormData;
};
type CartLinesAddRequire = {
    action: 'LinesAdd';
    inputs: {
        lines: Array<OptimisticCartLineInput>;
    } & OtherFormData;
};
type CartLinesUpdateProps = {
    action: 'LinesUpdate';
    inputs?: {
        lines: CartLineUpdateInput[];
    } & OtherFormData;
};
type CartLinesUpdateRequire = {
    action: 'LinesUpdate';
    inputs: {
        lines: CartLineUpdateInput[];
    } & OtherFormData;
};
type CartLinesRemoveProps = {
    action: 'LinesRemove';
    inputs?: {
        lineIds: string[];
    } & OtherFormData;
};
type CartLinesRemoveRequire = {
    action: 'LinesRemove';
    inputs: {
        lineIds: string[];
    } & OtherFormData;
};
type CartNoteUpdateProps = {
    action: 'NoteUpdate';
    inputs?: {
        note: string;
    } & OtherFormData;
};
type CartNoteUpdateRequire = {
    action: 'NoteUpdate';
    inputs: {
        note: string;
    } & OtherFormData;
};
type CartSelectedDeliveryOptionsUpdateProps = {
    action: 'SelectedDeliveryOptionsUpdate';
    inputs?: {
        selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
    } & OtherFormData;
};
type CartSelectedDeliveryOptionsUpdateRequire = {
    action: 'SelectedDeliveryOptionsUpdate';
    inputs: {
        selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
    } & OtherFormData;
};
type CartMetafieldsSetProps = {
    action: 'MetafieldsSet';
    inputs?: {
        metafields: MetafieldWithoutOwnerId[];
    } & OtherFormData;
};
type CartMetafieldsSetRequire = {
    action: 'MetafieldsSet';
    inputs: {
        metafields: MetafieldWithoutOwnerId[];
    } & OtherFormData;
};
type CartMetafieldDeleteProps = {
    action: 'MetafieldsDelete';
    inputs?: {
        key: Scalars['String']['input'];
    } & OtherFormData;
};
type CartMetafieldDeleteRequire = {
    action: 'MetafieldsDelete';
    inputs: {
        key: Scalars['String']['input'];
    } & OtherFormData;
};
type CartCustomProps = {
    action: `Custom${string}`;
    inputs?: Record<string, unknown>;
};
type CartCustomRequire = {
    action: `Custom${string}`;
    inputs: Record<string, unknown>;
};
type CartFormCommonProps = {
    /**
     * Children nodes of CartForm.
     * Children can be a render prop that receives the fetcher.
     */
    children: ReactNode | ((fetcher: FetcherWithComponents<any>) => ReactNode);
    /**
     * The route to submit the form to. Defaults to the current route.
     */
    route?: string;
    /**
     * Optional key to use for the fetcher.
     * @see https://remix.run/hooks/use-fetcher#key
     */
    fetcherKey?: string;
};
type CartActionInputProps = CartAttributesUpdateProps | CartBuyerIdentityUpdateProps | CartCreateProps | CartDiscountCodesUpdateProps | CartLinesAddProps | CartLinesUpdateProps | CartLinesRemoveProps | CartNoteUpdateProps | CartSelectedDeliveryOptionsUpdateProps | CartMetafieldsSetProps | CartMetafieldDeleteProps | CartCustomProps;
type CartActionInput = CartAttributesUpdateRequire | CartBuyerIdentityUpdateRequire | CartCreateRequire | CartDiscountCodesUpdateRequire | CartLinesAddRequire | CartLinesUpdateRequire | CartLinesRemoveRequire | CartNoteUpdateRequire | CartSelectedDeliveryOptionsUpdateRequire | CartMetafieldsSetRequire | CartMetafieldDeleteRequire | CartCustomRequire;
type CartFormProps = CartActionInputProps & CartFormCommonProps;
declare function CartForm({ children, action, inputs, route, fetcherKey, }: CartFormProps): JSX.Element;
declare namespace CartForm {
    var INPUT_NAME: string;
    var ACTIONS: {
        readonly AttributesUpdateInput: "AttributesUpdateInput";
        readonly BuyerIdentityUpdate: "BuyerIdentityUpdate";
        readonly Create: "Create";
        readonly DiscountCodesUpdate: "DiscountCodesUpdate";
        readonly LinesAdd: "LinesAdd";
        readonly LinesRemove: "LinesRemove";
        readonly LinesUpdate: "LinesUpdate";
        readonly NoteUpdate: "NoteUpdate";
        readonly SelectedDeliveryOptionsUpdate: "SelectedDeliveryOptionsUpdate";
        readonly MetafieldsSet: "MetafieldsSet";
        readonly MetafieldDelete: "MetafieldDelete";
    };
    var getFormInput: (formData: FormData) => CartActionInput;
}

type CartCreateFunction = (input: CartInput, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartCreateDefault(options: CartQueryOptions): CartCreateFunction;

type CartGetProps = {
    /**
     * The cart ID.
     * @default cart.getCartId();
     */
    cartId?: string;
    /**
     * The country code.
     * @default storefront.i18n.country
     */
    country?: CountryCode;
    /**
     * The language code.
     * @default storefront.i18n.language
     */
    language?: LanguageCode;
    /**
     * The number of cart lines to be returned.
     * @default 100
     */
    numCartLines?: number;
};
type CartGetFunction = (cartInput?: CartGetProps) => Promise<CartReturn | null>;
type CartGetOptions = CartQueryOptions & {
    /**
     * The customer account client instance created by [`createCustomerAccountClient`](docs/api/hydrogen/latest/utilities/createcustomeraccountclient).
     */
    customerAccount?: CustomerAccount;
};
declare function cartGetDefault({ storefront, customerAccount, getCartId, cartFragment, }: CartGetOptions): CartGetFunction;

type CartLinesAddFunction = (lines: Array<CartLineInput>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesAddDefault(options: CartQueryOptions): CartLinesAddFunction;

type CartLinesUpdateFunction = (lines: CartLineUpdateInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesUpdateDefault(options: CartQueryOptions): CartLinesUpdateFunction;

type CartLinesRemoveFunction = (lineIds: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesRemoveDefault(options: CartQueryOptions): CartLinesRemoveFunction;

type CartDiscountCodesUpdateFunction = (discountCodes: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartDiscountCodesUpdateDefault(options: CartQueryOptions): CartDiscountCodesUpdateFunction;

type CartBuyerIdentityUpdateFunction = (buyerIdentity: CartBuyerIdentityInput, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartBuyerIdentityUpdateDefault(options: CartQueryOptions): CartBuyerIdentityUpdateFunction;

type CartNoteUpdateFunction = (note: string, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartNoteUpdateDefault(options: CartQueryOptions): CartNoteUpdateFunction;

type CartSelectedDeliveryOptionsUpdateFunction = (selectedDeliveryOptions: CartSelectedDeliveryOptionInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartSelectedDeliveryOptionsUpdateDefault(options: CartQueryOptions): CartSelectedDeliveryOptionsUpdateFunction;

type CartAttributesUpdateFunction = (attributes: AttributeInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartAttributesUpdateDefault(options: CartQueryOptions): CartAttributesUpdateFunction;

type CartMetafieldsSetFunction = (metafields: MetafieldWithoutOwnerId[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartMetafieldsSetDefault(options: CartQueryOptions): CartMetafieldsSetFunction;

type CartMetafieldDeleteFunction = (key: Scalars['String']['input'], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartMetafieldDeleteDefault(options: CartQueryOptions): CartMetafieldDeleteFunction;

declare const cartGetIdDefault: (requestHeaders: Headers) => () => string | undefined;

type CookieOptions = {
    maxage?: number;
    expires?: Date | number | string;
    samesite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
    httponly?: boolean;
    domain?: string;
    path?: string;
};
declare const cartSetIdDefault: (cookieOptions?: CookieOptions) => (cartId: string) => Headers;

type CartHandlerOptions = {
    storefront: Storefront;
    customerAccount?: CustomerAccount;
    getCartId: () => string | undefined;
    setCartId: (cartId: string) => Headers;
    cartQueryFragment?: string;
    cartMutateFragment?: string;
};
type CustomMethodsBase = Record<string, Function>;
type CartHandlerOptionsWithCustom<TCustomMethods extends CustomMethodsBase> = CartHandlerOptions & {
    customMethods?: TCustomMethods;
};
type HydrogenCart = {
    get: ReturnType<typeof cartGetDefault>;
    getCartId: () => string | undefined;
    setCartId: (cartId: string) => Headers;
    create: ReturnType<typeof cartCreateDefault>;
    addLines: ReturnType<typeof cartLinesAddDefault>;
    updateLines: ReturnType<typeof cartLinesUpdateDefault>;
    removeLines: ReturnType<typeof cartLinesRemoveDefault>;
    updateDiscountCodes: ReturnType<typeof cartDiscountCodesUpdateDefault>;
    updateBuyerIdentity: ReturnType<typeof cartBuyerIdentityUpdateDefault>;
    updateNote: ReturnType<typeof cartNoteUpdateDefault>;
    updateSelectedDeliveryOption: ReturnType<typeof cartSelectedDeliveryOptionsUpdateDefault>;
    updateAttributes: ReturnType<typeof cartAttributesUpdateDefault>;
    setMetafields: ReturnType<typeof cartMetafieldsSetDefault>;
    deleteMetafield: ReturnType<typeof cartMetafieldDeleteDefault>;
};
type HydrogenCartCustom<TCustomMethods extends Partial<HydrogenCart> & CustomMethodsBase> = Omit<HydrogenCart, keyof TCustomMethods> & TCustomMethods;
declare function createCartHandler(options: CartHandlerOptions): HydrogenCart;
declare function createCartHandler<TCustomMethods extends CustomMethodsBase>(options: CartHandlerOptionsWithCustom<TCustomMethods>): HydrogenCartCustom<TCustomMethods>;

type OptimisticCartLine<T = CartLine> = T & {
    isOptimistic?: boolean;
};
type OptimisticCart<T = CartReturn> = Omit<T, 'lines'> & {
    isOptimistic?: boolean;
    lines: {
        nodes: Array<OptimisticCartLine>;
    };
};
/**
 * @param cart The cart object from `context.cart.get()` returned by a server loader.
 *
 * @returns A new cart object augmented with optimistic state. Each cart line item that is optimistically added includes an `isOptimistic` property. Also if the cart has _any_ optimistic state, a root property `isOptimistic` will be set to `true`.
 */
declare function useOptimisticCart<DefaultCart = CartReturn>(cart?: DefaultCart): OptimisticCart<DefaultCart>;

type VariantOption = {
    name: string;
    value?: string;
    values: Array<VariantOptionValue>;
};
type VariantOptionValue = {
    value: string;
    isAvailable: boolean;
    to: string;
    search: string;
    isActive: boolean;
    variant?: PartialDeep<ProductVariant>;
};
type VariantSelectorProps = {
    /** The product handle for all of the variants */
    handle: string;
    /** Product options from the [Storefront API](/docs/api/storefront/2024-04/objects/ProductOption). Make sure both `name` and `values` are apart of your query. */
    options: Array<PartialDeep<ProductOption>> | undefined;
    /** Product variants from the [Storefront API](/docs/api/storefront/2024-04/objects/ProductVariant). You only need to pass this prop if you want to show product availability. If a product option combination is not found within `variants`, it is assumed to be available. Make sure to include `availableForSale` and `selectedOptions.name` and `selectedOptions.value`. */
    variants?: PartialDeep<ProductVariantConnection> | Array<PartialDeep<ProductVariant>>;
    /** By default all products are under /products. Use this prop to provide a custom path. */
    productPath?: string;
    /** Should the VariantSelector wait to update until after the browser navigates to a variant. */
    waitForNavigation?: boolean;
    children: ({ option }: {
        option: VariantOption;
    }) => ReactNode;
};
declare function VariantSelector({ handle, options, variants: _variants, productPath, waitForNavigation, children, }: VariantSelectorProps): react.FunctionComponentElement<{
    children?: ReactNode;
}>;
type GetSelectedProductOptions = (request: Request) => SelectedOptionInput[];
/**
 * Extract searchParams from a Request instance and return an array of selected options.
 * @param request - The Request instance to extract searchParams from.
 * @returns An array of selected options.
 * @example Basic usage:
 * ```tsx
 *
 * import {getSelectedProductOptions} from '@shopify/hydrogen';
 *
 * // Given a request url of `/products/product-handle?color=red&size=large`
 *
 * const selectedOptions = getSelectedProductOptions(request);
 *
 * // selectedOptions will equal:
 * // [
 * //   {name: 'color', value: 'red'},
 * //   {name: 'size', value: 'large'}
 * // ]
 * ```
 **/
declare const getSelectedProductOptions: GetSelectedProductOptions;

type OptimisticProduct<T> = T & {
    isOptimistic?: boolean;
};
type OptimisticProductInput = Product & {
    selectedVariant?: PartialDeep<ProductVariant>;
};
type OptimisticProductVariants = Array<PartialDeep<ProductVariant>> | Promise<Array<PartialDeep<ProductVariant>>> | PartialDeep<ProductVariant> | Promise<PartialDeep<ProductVariant>>;
/**
 * @param product The product object from `context.storefront.query()` returned by a server loader. The query should use the `selectedVariant` field with `variantBySelectedOptions`.
 * @param variants The available product variants for the product. This can be an array of variants, a promise that resolves to an array of variants, or an object with a `product` key that contains the variants.
 * @returns A new product object where the `selectedVariant` property is set to the variant that matches the current URL search params. If no variant is found, the original product object is returned. The `isOptimistic` property is set to `true` if the `selectedVariant` has been optimistically changed.
 */
declare function useOptimisticProduct<ProductWithSelectedVariant = OptimisticProductInput, Variants = OptimisticProductVariants>(product: ProductWithSelectedVariant, variants: Variants): OptimisticProduct<ProductWithSelectedVariant>;

declare const useNonce: () => string | undefined;
type ContentSecurityPolicy = {
    /** A randomly generated nonce string that should be passed to any custom `script` element */
    nonce: string;
    /** The content security policy header */
    header: string;
    NonceProvider: ComponentType<{
        children: ReactNode;
    }>;
};
type DirectiveValues = string[] | string | boolean;
type CreateContentSecurityPolicy = {
    defaultSrc?: DirectiveValues;
    scriptSrc?: DirectiveValues;
    scriptSrcElem?: DirectiveValues;
    styleSrc?: DirectiveValues;
    imgSrc?: DirectiveValues;
    connectSrc?: DirectiveValues;
    fontSrc?: DirectiveValues;
    objectSrc?: DirectiveValues;
    mediaSrc?: DirectiveValues;
    frameSrc?: DirectiveValues;
    sandbox?: DirectiveValues;
    reportUri?: DirectiveValues;
    childSrc?: DirectiveValues;
    formAction?: DirectiveValues;
    frameAncestors?: DirectiveValues;
    pluginTypes?: DirectiveValues;
    baseUri?: DirectiveValues;
    reportTo?: DirectiveValues;
    workerSrc?: DirectiveValues;
    manifestSrc?: DirectiveValues;
    prefetchSrc?: DirectiveValues;
    navigateTo?: DirectiveValues;
    upgradeInsecureRequests?: boolean;
    blockAllMixedContent?: boolean;
};
type ShopifyDomains = {
    /** The production shop checkout domain url.  */
    checkoutDomain?: string;
    /** The production shop domain url. */
    storeDomain?: string;
};
type ShopProp = {
    /** Shop specific configurations */
    shop?: ShopifyDomains;
};
/**
 * @param directives - Pass custom [content security policy directives](https://content-security-policy.com/). This is important if you load content in your app from third-party domains.
 */
declare function createContentSecurityPolicy(props?: CreateContentSecurityPolicy & ShopProp): ContentSecurityPolicy;

declare const Script: react.ForwardRefExoticComponent<Omit<react.DetailedHTMLProps<react.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>, "ref"> & react.RefAttributes<HTMLScriptElement>>;

declare function useOptimisticData<T>(identifier: string): T;
type OptimisticInputProps = {
    /**
     * A unique identifier for the optimistic input. Use the same identifier in `useOptimisticData`
     * to retrieve the optimistic data from actions.
     */
    id: string;
    /**
     * The data to be stored in the optimistic input. Use for creating an optimistic successful state
     * of this form action.
     */
    data: Record<string, unknown>;
};
declare function OptimisticInput({ id, data }: OptimisticInputProps): react_jsx_runtime.JSX.Element;

declare function ShopPayButton(props: ComponentProps<typeof ShopPayButton$1>): react_jsx_runtime.JSX.Element;

declare const AnalyticsEvent: {
    PAGE_VIEWED: "page_viewed";
    PRODUCT_VIEWED: "product_viewed";
    COLLECTION_VIEWED: "collection_viewed";
    CART_VIEWED: "cart_viewed";
    SEARCH_VIEWED: "search_viewed";
    CART_UPDATED: "cart_updated";
    PRODUCT_ADD_TO_CART: "product_added_to_cart";
    PRODUCT_REMOVED_FROM_CART: "product_removed_from_cart";
    CUSTOM_EVENT: `custom_${string}`;
};

type OtherData = {
    /** Any other data that should be included in the event. */
    [key: string]: unknown;
};
type BasePayload = {
    /** The shop data passed in from the `AnalyticsProvider`. */
    shop: ShopAnalytics | null;
    /** The custom data passed in from the `AnalyticsProvider`. */
    customData?: AnalyticsProviderProps['customData'];
};
type UrlPayload = {
    /** The url location of when this event is collected. */
    url: string;
};
type ProductPayload = {
    /** The product id. */
    id: Product['id'];
    /** The product title. */
    title: Product['title'];
    /** The displaying variant price. */
    price: ProductVariant['price']['amount'];
    /** The product vendor. */
    vendor: Product['vendor'];
    /** The displaying variant id. */
    variantId: ProductVariant['id'];
    /** The displaying variant title. */
    variantTitle: ProductVariant['title'];
    /** The quantity of product. */
    quantity: number;
    /** The product sku. */
    sku?: ProductVariant['sku'];
    /** The product type. */
    productType?: Product['productType'];
};
type ProductsPayload = {
    /** The products associated with this event. */
    products: Array<ProductPayload & OtherData>;
};
type CollectionPayloadDetails = {
    /** The collection id. */
    id: string;
    /** The collection handle. */
    handle: string;
};
type CollectionPayload = {
    collection: CollectionPayloadDetails;
};
type SearchPayload = {
    /** The search term used for the search results page */
    searchTerm: string;
    /** The search results */
    searchResults?: any;
};
type CartPayload = {
    /** The current cart state. */
    cart: CartReturn | null;
    /** The previous cart state. */
    prevCart: CartReturn | null;
};
type CartLinePayload = {
    /** The previous state of the cart line that got updated. */
    prevLine?: CartLine | ComponentizableCartLine;
    /** The current state of the cart line that got updated. */
    currentLine?: CartLine | ComponentizableCartLine;
};
type CollectionViewPayload = CollectionPayload & UrlPayload & BasePayload;
type ProductViewPayload = ProductsPayload & UrlPayload & BasePayload;
type CartViewPayload = CartPayload & UrlPayload & BasePayload;
type PageViewPayload = UrlPayload & BasePayload;
type SearchViewPayload = SearchPayload & UrlPayload & BasePayload;
type CartUpdatePayload = CartPayload & BasePayload & OtherData;
type CartLineUpdatePayload = CartLinePayload & CartPayload & BasePayload & OtherData;
type CustomEventPayload = BasePayload & OtherData;
type BasicViewProps = {
    data?: OtherData;
    customData?: OtherData;
};
type ProductViewProps = {
    data: ProductsPayload;
    customData?: OtherData;
};
type CollectionViewProps = {
    data: CollectionPayload;
    customData?: OtherData;
};
type SearchViewProps = {
    data?: SearchPayload;
    customData?: OtherData;
};
type CustomViewProps = {
    type: typeof AnalyticsEvent.CUSTOM_EVENT;
    data?: OtherData;
    customData?: OtherData;
};
declare function AnalyticsProductView(props: ProductViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCollectionView(props: CollectionViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCartView(props: BasicViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsSearchView(props: SearchViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCustomView(props: CustomViewProps): react_jsx_runtime.JSX.Element;

type ConsentStatus = boolean | undefined;
type VisitorConsent = {
    marketing: ConsentStatus;
    analytics: ConsentStatus;
    preferences: ConsentStatus;
    sale_of_data: ConsentStatus;
};
type VisitorConsentCollected = {
    analyticsAllowed: boolean;
    firstPartyMarketingAllowed: boolean;
    marketingAllowed: boolean;
    preferencesAllowed: boolean;
    saleOfDataAllowed: boolean;
    thirdPartyMarketingAllowed: boolean;
};
type CustomerPrivacyApiLoaded = boolean;
type CustomerPrivacyConsentConfig = {
    checkoutRootDomain?: string;
    storefrontRootDomain?: string;
    storefrontAccessToken?: string;
};
type SetConsentHeadlessParams = VisitorConsent & CustomerPrivacyConsentConfig & {
    headlessStorefront?: boolean;
};
/**
  Ideally this type should come from the Custoemr Privacy API sdk
  analyticsProcessingAllowed -
  currentVisitorConsent
  doesMerchantSupportGranularConsent
  firstPartyMarketingAllowed
  getCCPAConsent
  getRegulation
  getShopPrefs
  getTrackingConsent
  isRegulationEnforced
  marketingAllowed
  preferencesProcessingAllowed
  saleOfDataAllowed
  saleOfDataRegion
  setCCPAConsent
  setTrackingConsent
  shouldShowBanner
  shouldShowCCPABanner
  shouldShowGDPRBanner
  thirdPartyMarketingAllowed
**/
type CustomerPrivacy$1 = {
    currentVisitorConsent: () => VisitorConsent;
    preferencesProcessingAllowed: () => boolean;
    saleOfDataAllowed: () => boolean;
    marketingAllowed: () => boolean;
    analyticsProcessingAllowed: () => boolean;
    setTrackingConsent: (consent: SetConsentHeadlessParams, callback: () => void) => void;
};
type PrivacyBanner$1 = {
    loadBanner: (options: CustomerPrivacyConsentConfig) => void;
};
interface CustomEventMap$1 {
    visitorConsentCollected: CustomEvent<VisitorConsentCollected>;
    customerPrivacyApiLoaded: CustomEvent<CustomerPrivacyApiLoaded>;
}
type CustomerPrivacyApiProps = {
    /** The production shop checkout domain url.  */
    checkoutDomain: string;
    /** The storefront access token for the shop. */
    storefrontAccessToken: string;
    /** Whether to load the Shopify privacy banner as configured in Shopify admin. Defaults to true. */
    withPrivacyBanner?: boolean;
    /** Callback to be called when visitor consent is collected. */
    onVisitorConsentCollected?: (consent: VisitorConsentCollected) => void;
    /** Callback to be call when customer privacy api is ready. */
    onReady?: () => void;
};
declare function useCustomerPrivacy(props: CustomerPrivacyApiProps): void;
declare function getCustomerPrivacy(): CustomerPrivacy$1 | null;

type ShopAnalytics = {
    /** The shop ID. */
    shopId: string;
    /** The language code that is being displayed to user. */
    acceptedLanguage: LanguageCode;
    /** The currency code that is being displayed to user. */
    currency: CurrencyCode;
    /** The Hydrogen subchannel ID generated by Oxygen in the environment variable. */
    hydrogenSubchannelId: string | '0';
};
type AnalyticsProviderProps = {
    /** React children to render. */
    children?: ReactNode;
    /** The cart or cart promise to track for cart analytics. When there is a difference between the state of the cart, `AnalyticsProvider` will trigger a `cart_updated` event. It will also produce `product_added_to_cart` and `product_removed_from_cart` based on cart line quantity and cart line id changes. */
    cart: Promise<CartReturn | null> | CartReturn | null;
    /** An optional function to set wether the user can be tracked. Defaults to Customer Privacy API's `window.Shopify.customerPrivacy.analyticsProcessingAllowed()`. */
    canTrack?: () => boolean;
    /** An optional custom payload to pass to all events. e.g language/locale/currency. */
    customData?: Record<string, unknown>;
    /** The shop configuration required to publish analytics events to Shopify. Use [`getShopAnalytics`](/docs/api/hydrogen/2024-04/utilities/getshopanalytics). */
    shop: Promise<ShopAnalytics | null> | ShopAnalytics | null;
    /** The customer privacy consent configuration and options. */
    consent: Partial<Pick<CustomerPrivacyApiProps, 'checkoutDomain' | 'storefrontAccessToken' | 'withPrivacyBanner'>>;
    /** @deprecated Disable throwing errors when required props are missing. */
    disableThrowOnError?: boolean;
    /** The domain scope of the cookie set with `useShopifyCookies`. **/
    cookieDomain?: string;
};
type AnalyticsContextValue = {
    /** A function to tell you the current state of if the user can be tracked by analytics. Defaults to Customer Privacy API's `window.Shopify.customerPrivacy.analyticsProcessingAllowed()`. */
    canTrack: NonNullable<AnalyticsProviderProps['canTrack']>;
    /** The current cart state. */
    cart: Awaited<AnalyticsProviderProps['cart']>;
    /** The custom data passed in from the `AnalyticsProvider`. */
    customData?: AnalyticsProviderProps['customData'];
    /** The previous cart state. */
    prevCart: Awaited<AnalyticsProviderProps['cart']>;
    /** A function to publish an analytics event. */
    publish: typeof publish;
    /** A function to register with the analytics provider. */
    register: (key: string) => {
        ready: () => void;
    };
    /** The shop configuration required to publish events to Shopify. */
    shop: Awaited<AnalyticsProviderProps['shop']>;
    /** A function to subscribe to analytics events. */
    subscribe: typeof subscribe;
};
declare function subscribe(event: typeof AnalyticsEvent.PAGE_VIEWED, callback: (payload: PageViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_VIEWED, callback: (payload: ProductViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.COLLECTION_VIEWED, callback: (payload: CollectionViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CART_VIEWED, callback: (payload: CartViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.SEARCH_VIEWED, callback: (payload: SearchViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CART_UPDATED, callback: (payload: CartUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_ADD_TO_CART, callback: (payload: CartLineUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, callback: (payload: CartLineUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CUSTOM_EVENT, callback: (payload: CustomEventPayload) => void): void;
declare function publish(event: typeof AnalyticsEvent.PAGE_VIEWED, payload: PageViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_VIEWED, payload: ProductViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.COLLECTION_VIEWED, payload: CollectionViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.CART_VIEWED, payload: CartViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.CART_UPDATED, payload: CartUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_ADD_TO_CART, payload: CartLineUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, payload: CartLineUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.CUSTOM_EVENT, payload: OtherData): void;
declare function AnalyticsProvider({ canTrack: customCanTrack, cart: currentCart, children, consent, customData, shop: shopProp, disableThrowOnError, cookieDomain, }: AnalyticsProviderProps): JSX.Element;
declare function useAnalytics(): AnalyticsContextValue;
type ShopAnalyticsProps = {
    /**
     * The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/2024-04/utilities/createstorefrontclient).
     */
    storefront: Storefront;
    /**
     * The `PUBLIC_STOREFRONT_ID` generated by Oxygen in the environment variable.
     */
    publicStorefrontId: string;
};
declare function getShopAnalytics({ storefront, publicStorefrontId, }: ShopAnalyticsProps): Promise<ShopAnalytics | null>;
declare const Analytics: {
    CartView: typeof AnalyticsCartView;
    CollectionView: typeof AnalyticsCollectionView;
    CustomView: typeof AnalyticsCustomView;
    ProductView: typeof AnalyticsProductView;
    Provider: typeof AnalyticsProvider;
    SearchView: typeof AnalyticsSearchView;
};

declare const RichText: typeof RichText$1;

export { Analytics, AnalyticsEvent, CacheCustom, type CacheKey, CacheLong, CacheNone, CacheShort, type CachingStrategy, type CartActionInput, CartForm, type CartLineUpdatePayload, type CartQueryDataReturn, type CartQueryOptions, type CartQueryReturn, type CartReturn, type CartUpdatePayload, type CartViewPayload, type CollectionViewPayload, type ConsentStatus, type CookieOptions, type CreateStorefrontClientForDocs, type CreateStorefrontClientOptions, type CustomEventMap$1 as CustomEventMap, type CustomerAccount, type CustomerAccountMutations, type CustomerAccountQueries, type CustomerPrivacy$1 as CustomerPrivacy, type CustomerPrivacyApiProps, type CustomerPrivacyConsentConfig, type HydrogenCart, type HydrogenCartCustom, type HydrogenSession, type HydrogenSessionData, type I18nBase, InMemoryCache, type MetafieldWithoutOwnerId, type NoStoreStrategy, type OptimisticCart, type OptimisticCartLine, type OptimisticCartLineInput, OptimisticInput, type PageViewPayload, Pagination, type PrivacyBanner$1 as PrivacyBanner, type ProductViewPayload, RichText, Script, type SearchViewPayload, Seo, type SeoConfig, type SeoHandleFunction, type SetConsentHeadlessParams, ShopPayButton, type Storefront, type StorefrontApiErrors, type StorefrontClient, type StorefrontForDoc, type StorefrontMutationOptionsForDocs, type StorefrontMutations, type StorefrontQueries, type StorefrontQueryOptionsForDocs, type VariantOption, type VariantOptionValue, VariantSelector, type VisitorConsent, type VisitorConsentCollected, type WithCache, cartAttributesUpdateDefault, cartBuyerIdentityUpdateDefault, cartCreateDefault, cartDiscountCodesUpdateDefault, cartGetDefault, cartGetIdDefault, cartLinesAddDefault, cartLinesRemoveDefault, cartLinesUpdateDefault, cartMetafieldDeleteDefault, cartMetafieldsSetDefault, cartNoteUpdateDefault, cartSelectedDeliveryOptionsUpdateDefault, cartSetIdDefault, changelogHandler, createCartHandler, createContentSecurityPolicy, createCustomerAccountClient, createSpanCollector, createStorefrontClient, createWithCache, emitSpanEvent, flushSpanEvents, formatAPIResult, generateCacheControlHeader, getCustomerPrivacy, getPaginationVariables, getSelectedProductOptions, getSeoMeta, getShopAnalytics, graphiqlLoader, storefrontRedirect, useAnalytics, useCustomerPrivacy, useNonce, useOptimisticCart, useOptimisticData, useOptimisticProduct };
