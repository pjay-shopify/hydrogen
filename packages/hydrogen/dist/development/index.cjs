'use strict';

var hydrogenReact = require('@shopify/hydrogen-react');
var react = require('react');
var react$1 = require('@remix-run/react');
var jsxRuntime = require('react/jsx-runtime');
var cookie = require('worktop/cookie');
var cspBuilder = require('content-security-policy-builder');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var cspBuilder__default = /*#__PURE__*/_interopDefault(cspBuilder);

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/seo/log-seo-tags.ts
var log_seo_tags_exports = {};
__export(log_seo_tags_exports, {
  default: () => Logger,
  logSeoTags: () => logSeoTags
});
function Logger({ headTags }) {
  logSeoTags(headTags);
  return null;
}
function logSeoTags(headTags) {
  console.log(" ");
  console.log("%cSEO Meta Tags", `${titleStyle}`);
  console.log(" ");
  headTags.forEach((tag) => {
    if (tag.tag === "script") {
      console.log(`%c\u2022 JSON LD `, headingStyle);
      if (tag.children) {
        try {
          console.table(JSON.parse(tag.children), ["name", "content"]);
        } catch {
          console.log(tag.children);
        }
      }
    } else {
      console.log(`%c\u2022 ${tag.tag} `, headingStyle);
      if (tag.children) {
        if (typeof tag.children === "string") {
          console.log(`\u21B3 ${tag.children}`);
        } else {
          try {
            Object.entries(JSON.parse(tag.children)).map(
              ([key, val]) => console.log(`\u21B3 ${val}`)
            );
          } catch {
            console.log(tag.children);
          }
        }
      }
      if (tag.props.property === "og:image:url") {
        const urlKey = tag.props.content;
        fetchImage(urlKey).then((image) => {
          const imageStyle = `font-size: 400px; padding: 10px; background: white url(${image}) no-repeat center; background-size: contain;`;
          console.log(`%c\u2022 Share image preview`, headingStyle);
          console.log("%c  ", imageStyle);
          console.log(`\u21B3 ${urlKey}`);
        }).catch((err) => {
          console.error(err);
        });
      }
      Object.entries(tag.props).map(([key, val]) => {
        console.log(`\u21B3 ${key} \u2192 ${val}`);
      });
    }
    console.log(" ");
  });
}
async function fetchImage(url) {
  const result = await fetch(url);
  const data = await result.blob();
  const buff = await data.arrayBuffer();
  const base64String = arrayBufferToBase64(buff);
  return `data:image/png;base64,${base64String}`;
}
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let index = 0; index < len; index++) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary);
}
var headingStyle, titleStyle;
var init_log_seo_tags = __esm({
  "src/seo/log-seo-tags.ts"() {
    headingStyle = "text-transform: uppercase;";
    titleStyle = "text-transform: uppercase; font-weight: bold; text-transform: uppercase;font-weight: bold";
  }
});

// src/cache/strategies.ts
var PUBLIC = "public";
var PRIVATE = "private";
var NO_STORE = "no-store";
var optionMapping = {
  maxAge: "max-age",
  staleWhileRevalidate: "stale-while-revalidate",
  sMaxAge: "s-maxage",
  staleIfError: "stale-if-error"
};
function generateCacheControlHeader(cacheOptions) {
  const cacheControl = [];
  Object.keys(cacheOptions).forEach((key) => {
    if (key === "mode") {
      cacheControl.push(cacheOptions[key]);
    } else if (optionMapping[key]) {
      cacheControl.push(
        `${optionMapping[key]}=${cacheOptions[key]}`
      );
    }
  });
  return cacheControl.join(", ");
}
function CacheNone() {
  return {
    mode: NO_STORE
  };
}
function guardExpirableModeType(overrideOptions) {
  if (overrideOptions?.mode && overrideOptions?.mode !== PUBLIC && overrideOptions?.mode !== PRIVATE) {
    throw Error("'mode' must be either 'public' or 'private'");
  }
}
function CacheShort(overrideOptions) {
  guardExpirableModeType(overrideOptions);
  return {
    mode: PUBLIC,
    maxAge: 1,
    staleWhileRevalidate: 9,
    ...overrideOptions
  };
}
function CacheLong(overrideOptions) {
  guardExpirableModeType(overrideOptions);
  return {
    mode: PUBLIC,
    maxAge: 3600,
    // 1 hour
    staleWhileRevalidate: 82800,
    // 23 Hours
    ...overrideOptions
  };
}
function CacheDefault(overrideOptions) {
  guardExpirableModeType(overrideOptions);
  return {
    mode: PUBLIC,
    maxAge: 1,
    staleWhileRevalidate: 86399,
    // 1 second less than 24 hours
    ...overrideOptions
  };
}
function CacheCustom(overrideOptions) {
  return overrideOptions;
}

// src/utils/parse-json.ts
function parseJSON(json) {
  if (String(json).includes("__proto__")) return JSON.parse(json, noproto);
  return JSON.parse(json);
}
function noproto(k, v) {
  if (k !== "__proto__") return v;
}
function getCacheControlSetting(userCacheOptions, options) {
  if (userCacheOptions && options) {
    return {
      ...userCacheOptions,
      ...options
    };
  } else {
    return userCacheOptions || CacheDefault();
  }
}
function generateDefaultCacheControlHeader(userCacheOptions) {
  return generateCacheControlHeader(getCacheControlSetting(userCacheOptions));
}
async function getItem(cache, request) {
  if (!cache) return;
  const response = await cache.match(request);
  if (!response) {
    return;
  }
  return response;
}
async function setItem(cache, request, response, userCacheOptions) {
  if (!cache) return;
  const cacheControl = getCacheControlSetting(userCacheOptions);
  const paddedCacheControlString = generateDefaultCacheControlHeader(
    getCacheControlSetting(cacheControl, {
      maxAge: (cacheControl.maxAge || 0) + (cacheControl.staleWhileRevalidate || 0)
    })
  );
  const cacheControlString = generateDefaultCacheControlHeader(
    getCacheControlSetting(cacheControl)
  );
  response.headers.set("cache-control", paddedCacheControlString);
  response.headers.set("real-cache-control", cacheControlString);
  response.headers.set("cache-put-date", String(Date.now()));
  await cache.put(request, response);
}
async function deleteItem(cache, request) {
  if (!cache) return;
  await cache.delete(request);
}
function calculateAge(response, responseDate) {
  const cacheControl = response.headers.get("real-cache-control");
  let responseMaxAge = 0;
  if (cacheControl) {
    const maxAgeMatch = cacheControl.match(/max-age=(\d*)/);
    if (maxAgeMatch && maxAgeMatch.length > 1) {
      responseMaxAge = parseFloat(maxAgeMatch[1]);
    }
  }
  const ageInMs = Date.now() - Number(responseDate);
  return [ageInMs / 1e3, responseMaxAge];
}
function isStale(request, response) {
  const responseDate = response.headers.get("cache-put-date");
  if (!responseDate) {
    return false;
  }
  const [age, responseMaxAge] = calculateAge(response, responseDate);
  const result = age > responseMaxAge;
  return result;
}
var CacheAPI = {
  get: getItem,
  set: setItem,
  delete: deleteItem,
  generateDefaultCacheControlHeader,
  isStale
};

// src/cache/sub-request.ts
function getKeyUrl(key) {
  return `https://shopify.dev/?${key}`;
}
function getCacheOption(userCacheOptions) {
  return userCacheOptions || CacheDefault();
}
async function getItemFromCache(cache, key) {
  if (!cache) return;
  const url = getKeyUrl(key);
  const request = new Request(url);
  const response = await CacheAPI.get(cache, request);
  if (!response) {
    return;
  }
  const text = await response.text();
  try {
    return [parseJSON(text), response];
  } catch {
    return [text, response];
  }
}
async function setItemInCache(cache, key, value, userCacheOptions) {
  if (!cache) return;
  const url = getKeyUrl(key);
  const request = new Request(url);
  const response = new Response(JSON.stringify(value));
  await CacheAPI.set(
    cache,
    request,
    response,
    getCacheOption(userCacheOptions)
  );
}
function isStale2(key, response) {
  return CacheAPI.isStale(new Request(getKeyUrl(key)), response);
}

// src/utils/hash.ts
function hashKey(queryKey) {
  const rawKeys = Array.isArray(queryKey) ? queryKey : [queryKey];
  let hash = "";
  for (const key of rawKeys) {
    if (key != null) {
      if (typeof key === "object") {
        hash += JSON.stringify(key);
      } else {
        hash += key.toString();
      }
    }
  }
  return encodeURIComponent(hash);
}

// src/cache/run-with-cache.ts
var swrLock = /* @__PURE__ */ new Set();
async function runWithCache(cacheKey, actionFn, {
  strategy = CacheShort(),
  cacheInstance,
  shouldCacheResult = () => true,
  waitUntil,
  debugInfo,
  spanEmitter = () => {
  }
}) {
  const startTime = Date.now();
  const key = hashKey([
    // '__HYDROGEN_CACHE_ID__', // TODO purgeQueryCacheOnBuild
    ...typeof cacheKey === "string" ? [cacheKey] : cacheKey
  ]);
  let cachedDebugInfo;
  let userDebugInfo;
  const addDebugData = (info) => {
    userDebugInfo = {
      displayName: info.displayName,
      url: info.response?.url,
      responseInit: {
        status: info.response?.status || 0,
        statusText: info.response?.statusText || "",
        headers: Array.from(info.response?.headers.entries() || [])
      }
    };
  };
  const mergeDebugInfo = () => ({
    ...cachedDebugInfo,
    ...debugInfo,
    url: userDebugInfo?.url || debugInfo?.url || cachedDebugInfo?.url || getKeyUrl(key),
    displayName: debugInfo?.displayName || userDebugInfo?.displayName || cachedDebugInfo?.displayName
  });
  const logSubRequestEvent2 = ({
    result: result2,
    cacheStatus,
    overrideStartTime
  }) => {
    globalThis.__H2O_LOG_EVENT?.({
      ...mergeDebugInfo(),
      eventType: "subrequest",
      startTime: overrideStartTime || startTime,
      endTime: Date.now(),
      cacheStatus,
      responsePayload: result2 && result2[0] || result2,
      responseInit: result2 && result2[1] || userDebugInfo?.responseInit,
      cache: {
        status: cacheStatus,
        strategy: generateCacheControlHeader(strategy || {}),
        key
      },
      waitUntil
    });
  } ;
  if (!cacheInstance || !strategy || strategy.mode === NO_STORE) {
    const result2 = await actionFn({ addDebugData });
    logSubRequestEvent2?.({ result: result2 });
    spanEmitter(mergeDebugInfo(), startTime);
    return result2;
  }
  const storeInCache = (value) => setItemInCache(
    cacheInstance,
    key,
    {
      value,
      debugInfo: mergeDebugInfo() 
    },
    strategy
  );
  const cachedItem = await getItemFromCache(cacheInstance, key);
  if (cachedItem && typeof cachedItem[0] !== "string") {
    const [{ value: cachedResult, debugInfo: debugInfo2 }, cacheInfo] = cachedItem;
    cachedDebugInfo = debugInfo2;
    const cacheStatus = isStale2(key, cacheInfo) ? "STALE" : "HIT";
    if (!swrLock.has(key) && cacheStatus === "STALE") {
      swrLock.add(key);
      const revalidatingPromise = Promise.resolve().then(async () => {
        const revalidateStartTime = Date.now();
        try {
          const result2 = await actionFn({ addDebugData });
          spanEmitter(mergeDebugInfo(), revalidateStartTime);
          if (shouldCacheResult(result2)) {
            const cachePutStartTime = Date.now();
            await storeInCache(result2);
            spanEmitter(mergeDebugInfo(), cachePutStartTime, "PUT");
            logSubRequestEvent2?.({
              result: result2,
              cacheStatus: "PUT",
              overrideStartTime: revalidateStartTime
            });
          }
        } catch (error) {
          if (error.message) {
            error.message = "SWR in sub-request failed: " + error.message;
          }
          console.error(error);
        } finally {
          swrLock.delete(key);
        }
      });
      waitUntil?.(revalidatingPromise);
    }
    logSubRequestEvent2?.({
      result: cachedResult,
      cacheStatus
    });
    spanEmitter(mergeDebugInfo(), startTime, cacheStatus);
    return cachedResult;
  }
  spanEmitter(mergeDebugInfo(), startTime, "MISS");
  const fetchStartTime = Date.now();
  const result = await actionFn({ addDebugData });
  logSubRequestEvent2?.({
    result,
    cacheStatus: "MISS"
  });
  spanEmitter(mergeDebugInfo(), fetchStartTime);
  if (shouldCacheResult(result)) {
    const cacheStoringPromise = Promise.resolve().then(async () => {
      const putStartTime = Date.now();
      await storeInCache(result);
      logSubRequestEvent2?.({
        result,
        cacheStatus: "PUT",
        overrideStartTime: putStartTime
      });
      spanEmitter(mergeDebugInfo(), putStartTime, "PUT");
    });
    waitUntil?.(cacheStoringPromise);
  }
  return result;
}

// src/cache/server-fetch.ts
function toSerializableResponse(body, response) {
  return [
    body,
    {
      status: response.status,
      statusText: response.statusText,
      headers: Array.from(response.headers.entries())
    }
  ];
}
function fromSerializableResponse([body, init]) {
  return [body, new Response(body, init)];
}
var checkGraphQLErrors = (body, response) => !body?.errors && response.status < 400;
async function fetchWithServerCache(url, requestInit, {
  cacheInstance,
  cache: cacheOptions,
  cacheKey = [url, requestInit],
  shouldCacheResponse = () => true,
  waitUntil,
  returnType = "json",
  debugInfo,
  spanEmitter
} = {}) {
  if (!cacheOptions && (!requestInit.method || requestInit.method === "GET")) {
    cacheOptions = CacheShort();
  }
  return runWithCache(
    cacheKey,
    async () => {
      const response = await fetch(url, requestInit);
      let data;
      try {
        data = await response[returnType]();
      } catch {
        try {
          data = await response.text();
        } catch {
          return toSerializableResponse("", response);
        }
      }
      return toSerializableResponse(data, response);
    },
    {
      cacheInstance,
      waitUntil,
      strategy: cacheOptions ?? null,
      debugInfo,
      shouldCacheResult: (result) => shouldCacheResponse(...fromSerializableResponse(result)),
      spanEmitter
    }
  ).then(fromSerializableResponse);
}

// src/version.ts
var LIB_VERSION = "2024.4.3";

// src/constants.ts
var STOREFRONT_REQUEST_GROUP_ID_HEADER = "Custom-Storefront-Request-Group-ID";
var STOREFRONT_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token";
var SDK_VARIANT_HEADER = "X-SDK-Variant";
var SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source";
var SDK_VERSION_HEADER = "X-SDK-Version";
var DEFAULT_CUSTOMER_API_VERSION = "2024-04";
var USER_AGENT = `Shopify Hydrogen ${LIB_VERSION}`;
var CUSTOMER_API_CLIENT_ID = "30243aa5-17c1-465a-8493-944bcc4e88aa";
var CUSTOMER_ACCOUNT_SESSION_KEY = "customerAccount";
var BUYER_SESSION_KEY = "buyer";

// src/utils/uuid.ts
function generateUUID() {
  if (typeof crypto !== "undefined" && !!crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    return `weak-${Math.random().toString(16).substring(2)}`;
  }
}

// src/utils/warning.ts
var warnings = /* @__PURE__ */ new Set();
var warnOnce = (string) => {
  if (!warnings.has(string)) {
    console.warn(string);
    warnings.add(string);
  }
};
var errors = /* @__PURE__ */ new Set();
var errorOnce = (string) => {
  if (!errors.has(string)) {
    console.error(new Error(string));
    errors.add(string);
  }
};

// src/utils/graphql.ts
function minifyQuery(string) {
  return string.replace(/\s*#.*$/gm, "").replace(/\s+/gm, " ").trim();
}
var IS_QUERY_RE = /(^|}\s)query[\s({]/im;
var IS_MUTATION_RE = /(^|}\s)mutation[\s({]/im;
function assertQuery(query, callerName) {
  if (!IS_QUERY_RE.test(query)) {
    throw new Error(`[h2:error:${callerName}] Can only execute queries`);
  }
}
function assertMutation(query, callerName) {
  if (!IS_MUTATION_RE.test(query)) {
    throw new Error(`[h2:error:${callerName}] Can only execute mutations`);
  }
}
var GraphQLError = class extends Error {
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  locations;
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  path;
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  extensions;
  constructor(message, options = {}) {
    const h2Prefix = options.clientOperation ? `[h2:error:${options.clientOperation}] ` : "";
    const enhancedMessage = h2Prefix + message + (options.requestId ? ` - Request ID: ${options.requestId}` : "");
    super(enhancedMessage);
    this.name = "GraphQLError";
    this.extensions = options.extensions;
    this.locations = options.locations;
    this.path = options.path;
    this.stack = options.stack || void 0;
    try {
      this.cause = JSON.stringify({
        ...typeof options.cause === "object" ? options.cause : {},
        requestId: options.requestId,
        ...{
          path: options.path,
          extensions: options.extensions,
          graphql: h2Prefix && options.query && {
            query: options.query,
            variables: JSON.stringify(options.queryVariables)
          }
        }
      });
    } catch {
      if (options.cause) this.cause = options.cause;
    }
  }
  get [Symbol.toStringTag]() {
    return this.name;
  }
  /**
   * Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
   * when ingesting logs in Oxygen production. Therefore, we want to make sure that
   * the error message is as informative as possible instead of `[object Object]`.
   */
  toString() {
    let result = `${this.name}: ${this.message}`;
    if (this.path) {
      try {
        result += ` | path: ${JSON.stringify(this.path)}`;
      } catch {
      }
    }
    if (this.extensions) {
      try {
        result += ` | extensions: ${JSON.stringify(this.extensions)}`;
      } catch {
      }
    }
    result += "\n";
    if (this.stack) {
      result += `${this.stack.slice(this.stack.indexOf("\n") + 1)}
`;
    }
    return result;
  }
  /**
   * Note: toJSON` is internally used by `JSON.stringify(...)`.
   * The most common scenario when this error instance is going to be stringified is
   * when it's passed to Remix' `json` and `defer` functions: e.g. `defer({promise: storefront.query(...)})`.
   * In this situation, we don't want to expose private error information to the browser so we only
   * do it in development.
   */
  toJSON() {
    const formatted = { name: "Error", message: "" };
    {
      formatted.name = this.name;
      formatted.message = "Development: " + this.message;
      if (this.path) formatted.path = this.path;
      if (this.locations) formatted.locations = this.locations;
      if (this.extensions) formatted.extensions = this.extensions;
    }
    return formatted;
  }
};
function throwErrorWithGqlLink({
  url,
  response,
  errors: errors2,
  type,
  query,
  queryVariables,
  ErrorConstructor = Error,
  client = "storefront"
}) {
  const errorMessage = (typeof errors2 === "string" ? errors2 : errors2?.map?.((error) => error.message).join("\n")) || `URL: ${url}
API response error: ${response.status}`;
  const gqlError = new GraphQLError(errorMessage, {
    query,
    queryVariables,
    cause: { errors: errors2 },
    clientOperation: `${client}.${type}`,
    requestId: response.headers.get("x-request-id")
  });
  throw new ErrorConstructor(gqlError.message, { cause: gqlError.cause });
}

// src/utils/callsites.ts
function withSyncStack(promise, options = {}) {
  const syncError = new Error();
  const getSyncStack = (message, name = "Error") => {
    const syncStack = (syncError.stack ?? "").split("\n").slice(3 + (options.stackOffset ?? 0)).join("\n").replace(/ at loader(\d+) \(/, (all, m1) => all.replace(m1, ""));
    return `${name}: ${message}
` + syncStack;
  };
  return promise.then((result) => {
    if (result?.errors && Array.isArray(result.errors)) {
      const logErrors = typeof options.logErrors === "function" ? options.logErrors : () => options.logErrors ?? false;
      result.errors.forEach((error) => {
        if (error) {
          error.stack = getSyncStack(error.message, error.name);
          if (logErrors(error)) console.error(error);
        }
      });
    }
    return result;
  }).catch((error) => {
    if (error) error.stack = getSyncStack(error.message, error.name);
    throw error;
  });
}
var getCallerStackLine = (stackOffset = 0) => {
  let stackInfo = void 0;
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, callsites) => {
    const cs = callsites[2 + stackOffset];
    stackInfo = cs && {
      file: cs.getFileName() ?? void 0,
      func: cs.getFunctionName() ?? void 0,
      line: cs.getLineNumber() ?? void 0,
      column: cs.getColumnNumber() ?? void 0
    };
    return "";
  };
  const err = { stack: "" };
  Error.captureStackTrace(err);
  err.stack;
  Error.prepareStackTrace = original;
  return stackInfo;
} ;

// src/storefront.ts
var defaultI18n = { language: "EN", country: "US" };
function createStorefrontClient(options) {
  const {
    storefrontHeaders,
    cache,
    waitUntil,
    i18n,
    storefrontId,
    logErrors = true,
    spanEmitter,
    ...clientOptions
  } = options;
  const H2_PREFIX_WARN = "[h2:warn:createStorefrontClient] ";
  if (!cache) {
    warnOnce(
      H2_PREFIX_WARN + "Storefront API client created without a cache instance. This may slow down your sub-requests."
    );
  }
  const {
    getPublicTokenHeaders,
    getPrivateTokenHeaders,
    getStorefrontApiUrl,
    getShopifyDomain
  } = hydrogenReact.createStorefrontClient(clientOptions);
  const getHeaders = clientOptions.privateStorefrontToken ? getPrivateTokenHeaders : getPublicTokenHeaders;
  const defaultHeaders = getHeaders({
    contentType: "json",
    buyerIp: storefrontHeaders?.buyerIp || ""
  });
  defaultHeaders[STOREFRONT_REQUEST_GROUP_ID_HEADER] = storefrontHeaders?.requestGroupId || generateUUID();
  if (storefrontId) defaultHeaders[hydrogenReact.SHOPIFY_STOREFRONT_ID_HEADER] = storefrontId;
  defaultHeaders["user-agent"] = `Hydrogen ${LIB_VERSION}`;
  if (storefrontHeaders && storefrontHeaders.cookie) {
    const cookies = hydrogenReact.getShopifyCookies(storefrontHeaders.cookie ?? "");
    if (cookies[hydrogenReact.SHOPIFY_Y])
      defaultHeaders[hydrogenReact.SHOPIFY_STOREFRONT_Y_HEADER] = cookies[hydrogenReact.SHOPIFY_Y];
    if (cookies[hydrogenReact.SHOPIFY_S])
      defaultHeaders[hydrogenReact.SHOPIFY_STOREFRONT_S_HEADER] = cookies[hydrogenReact.SHOPIFY_S];
  }
  const cacheKeyHeader = JSON.stringify({
    "content-type": defaultHeaders["content-type"],
    "user-agent": defaultHeaders["user-agent"],
    [SDK_VARIANT_HEADER]: defaultHeaders[SDK_VARIANT_HEADER],
    [SDK_VARIANT_SOURCE_HEADER]: defaultHeaders[SDK_VARIANT_SOURCE_HEADER],
    [SDK_VERSION_HEADER]: defaultHeaders[SDK_VERSION_HEADER],
    [STOREFRONT_ACCESS_TOKEN_HEADER]: defaultHeaders[STOREFRONT_ACCESS_TOKEN_HEADER]
  });
  async function fetchStorefrontApi({
    query,
    mutation,
    variables,
    cache: cacheOptions,
    headers = [],
    storefrontApiVersion,
    displayName,
    stackInfo
  }) {
    const userHeaders = headers instanceof Headers ? Object.fromEntries(headers.entries()) : Array.isArray(headers) ? Object.fromEntries(headers) : headers;
    const document2 = query ?? mutation;
    const queryVariables = { ...variables };
    if (i18n) {
      if (!variables?.country && /\$country/.test(document2)) {
        queryVariables.country = i18n.country;
      }
      if (!variables?.language && /\$language/.test(document2)) {
        queryVariables.language = i18n.language;
      }
    }
    const url = getStorefrontApiUrl({ storefrontApiVersion });
    const graphqlData = JSON.stringify({
      query: document2,
      variables: queryVariables
    });
    const requestInit = {
      method: "POST",
      headers: { ...defaultHeaders, ...userHeaders },
      body: graphqlData
    };
    const cacheKey = [
      url,
      requestInit.method,
      cacheKeyHeader,
      requestInit.body
    ];
    const [body, response] = await fetchWithServerCache(url, requestInit, {
      cacheInstance: mutation ? void 0 : cache,
      cache: cacheOptions || CacheDefault(),
      cacheKey,
      shouldCacheResponse: checkGraphQLErrors,
      waitUntil,
      debugInfo: {
        requestId: requestInit.headers[STOREFRONT_REQUEST_GROUP_ID_HEADER],
        displayName,
        url,
        stackInfo,
        graphql: graphqlData,
        purpose: storefrontHeaders?.purpose
      },
      spanEmitter
    });
    const errorOptions = {
      url,
      response,
      type: mutation ? "mutation" : "query",
      query: document2,
      queryVariables,
      errors: void 0
    };
    if (!response.ok) {
      let errors3;
      try {
        errors3 = parseJSON(body);
      } catch (_e) {
        errors3 = [{ message: body }];
      }
      throwErrorWithGqlLink({ ...errorOptions, errors: errors3 });
    }
    const { data, errors: errors2 } = body;
    const gqlErrors = errors2?.map(
      ({ message, ...rest }) => new GraphQLError(message, {
        ...rest,
        clientOperation: `storefront.${errorOptions.type}`,
        requestId: response.headers.get("x-request-id"),
        queryVariables,
        query: document2
      })
    );
    return formatAPIResult(data, gqlErrors);
  }
  return {
    storefront: {
      /**
       * Sends a GraphQL query to the Storefront API.
       *
       * Example:
       *
       * ```js
       * async function loader ({context: {storefront}}) {
       *   const data = await storefront.query('query { ... }', {
       *     variables: {},
       *     cache: storefront.CacheLong()
       *   });
       * }
       * ```
       */
      query(query, options2) {
        query = minifyQuery(query);
        assertQuery(query, "storefront.query");
        const stackOffset = getStackOffset?.(query);
        return withSyncStack(
          fetchStorefrontApi({
            ...options2,
            query,
            stackInfo: getCallerStackLine?.(stackOffset)
          }),
          { stackOffset, logErrors }
        );
      },
      /**
       * Sends a GraphQL mutation to the Storefront API.
       *
       * Example:
       *
       * ```js
       * async function loader ({context: {storefront}}) {
       *   await storefront.mutate('mutation { ... }', {
       *     variables: {},
       *   });
       * }
       * ```
       */
      mutate(mutation, options2) {
        mutation = minifyQuery(mutation);
        assertMutation(mutation, "storefront.mutate");
        const stackOffset = getStackOffset?.(mutation);
        return withSyncStack(
          fetchStorefrontApi({
            ...options2,
            mutation,
            stackInfo: getCallerStackLine?.(stackOffset)
          }),
          { stackOffset, logErrors }
        );
      },
      cache,
      CacheNone,
      CacheLong,
      CacheShort,
      CacheCustom,
      generateCacheControlHeader,
      getPublicTokenHeaders,
      getPrivateTokenHeaders,
      getShopifyDomain,
      getApiUrl: getStorefrontApiUrl,
      i18n: i18n ?? defaultI18n
    }
  };
}
var getStackOffset = (query) => {
  let stackOffset = 0;
  if (/fragment CartApi(Query|Mutation) on Cart/.test(query)) {
    stackOffset = 1;
  }
  return stackOffset;
} ;
function formatAPIResult(data, errors2) {
  return {
    ...data,
    ...errors2 && { errors: errors2 }
  };
}

// src/utils/request.ts
function getHeader(request, key) {
  const value = request.headers?.get?.(key) ?? request.headers?.[key];
  return typeof value === "string" ? value : null;
}
function getDebugHeaders(request) {
  return {
    requestId: request ? getHeader(request, "request-id") : void 0,
    purpose: request ? getHeader(request, "purpose") : void 0
  };
}

// src/cache/create-with-cache.ts
function createWithCache({
  cache,
  waitUntil,
  request
}) {
  return function withCache(cacheKey, strategy, actionFn) {
    return runWithCache(cacheKey, actionFn, {
      strategy,
      cacheInstance: cache,
      waitUntil,
      debugInfo: {
        ...getDebugHeaders(request),
        stackInfo: getCallerStackLine?.()
      }
    });
  };
}

// src/cache/in-memory.ts
var InMemoryCache = class {
  #store;
  constructor() {
    this.#store = /* @__PURE__ */ new Map();
  }
  add(request) {
    throw new Error("Method not implemented. Use `put` instead.");
  }
  addAll(requests) {
    throw new Error("Method not implemented. Use `put` instead.");
  }
  matchAll(request, options) {
    throw new Error("Method not implemented. Use `match` instead.");
  }
  async put(request, response) {
    if (request.method !== "GET") {
      throw new TypeError("Cannot cache response to non-GET request.");
    }
    if (response.status === 206) {
      throw new TypeError(
        "Cannot cache response to a range request (206 Partial Content)."
      );
    }
    if (response.headers.get("vary")?.includes("*")) {
      throw new TypeError("Cannot cache response with 'Vary: *' header.");
    }
    this.#store.set(request.url, {
      body: new Uint8Array(await response.arrayBuffer()),
      status: response.status,
      headers: [...response.headers],
      timestamp: Date.now()
    });
  }
  async match(request) {
    if (request.method !== "GET") return;
    const match = this.#store.get(request.url);
    if (!match) {
      return;
    }
    const { body, timestamp, ...metadata } = match;
    const headers = new Headers(metadata.headers);
    const cacheControl = headers.get("cache-control") || headers.get("real-cache-control") || "";
    const maxAge = parseInt(
      cacheControl.match(/max-age=(\d+)/)?.[1] || "0",
      10
    );
    const swr = parseInt(
      cacheControl.match(/stale-while-revalidate=(\d+)/)?.[1] || "0",
      10
    );
    const age = (Date.now() - timestamp) / 1e3;
    const isMiss = age > maxAge + swr;
    if (isMiss) {
      this.#store.delete(request.url);
      return;
    }
    const isStale3 = age > maxAge;
    headers.set("cache", isStale3 ? "STALE" : "HIT");
    headers.set("date", new Date(timestamp).toUTCString());
    return new Response(body, {
      status: metadata.status ?? 200,
      headers
    });
  }
  async delete(request) {
    if (this.#store.has(request.url)) {
      this.#store.delete(request.url);
      return true;
    }
    return false;
  }
  keys(request) {
    const cacheKeys = [];
    for (const url of this.#store.keys()) {
      if (!request || request.url === url) {
        cacheKeys.push(new Request(url));
      }
    }
    return Promise.resolve(cacheKeys);
  }
};

// src/utils/get-redirect-url.ts
function getRedirectUrl(requestUrl) {
  if (!requestUrl) return;
  const { pathname, search } = new URL(requestUrl);
  const redirectFrom = pathname + search;
  const searchParams = new URLSearchParams(search);
  const redirectTo = searchParams.get("return_to") || searchParams.get("redirect");
  if (redirectTo) {
    if (isLocalPath(requestUrl, redirectTo)) {
      return redirectTo;
    } else {
      console.warn(
        `Cross-domain redirects are not supported. Tried to redirect from ${redirectFrom} to ${redirectTo}`
      );
    }
  }
}
function isLocalPath(requestUrl, redirectUrl) {
  try {
    return new URL(requestUrl).origin === new URL(redirectUrl, requestUrl).origin;
  } catch (e) {
    return false;
  }
}
function ensureLocalRedirectUrl({
  requestUrl,
  defaultUrl,
  redirectUrl
}) {
  const fromUrl = requestUrl;
  const defautlUrl = buildURLObject(requestUrl, defaultUrl);
  const toUrl = redirectUrl ? buildURLObject(requestUrl, redirectUrl) : defautlUrl;
  if (isLocalPath(requestUrl, toUrl.toString())) {
    return toUrl.toString();
  } else {
    console.warn(
      `Cross-domain redirects are not supported. Tried to redirect from ${fromUrl} to ${toUrl}. Default url ${defautlUrl} is used instead.`
    );
    return defautlUrl.toString();
  }
}
function buildURLObject(requestUrl, relativeOrAbsoluteUrl) {
  return isAbsoluteUrl(relativeOrAbsoluteUrl) ? new URL(relativeOrAbsoluteUrl) : new URL(relativeOrAbsoluteUrl, new URL(requestUrl).origin);
}
function isAbsoluteUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// src/routing/redirect.ts
async function storefrontRedirect(options) {
  const {
    storefront,
    request,
    noAdminRedirect,
    matchQueryParams,
    response = new Response("Not Found", { status: 404 })
  } = options;
  const url = new URL(request.url);
  const { pathname, searchParams } = url;
  const isSoftNavigation = searchParams.has("_data");
  searchParams.delete("redirect");
  searchParams.delete("return_to");
  searchParams.delete("_data");
  const redirectFrom = (matchQueryParams ? url.toString().replace(url.origin, "") : pathname).toLowerCase();
  if (url.pathname === "/admin" && !noAdminRedirect) {
    return createRedirectResponse(
      `${storefront.getShopifyDomain()}/admin`,
      isSoftNavigation,
      searchParams,
      matchQueryParams
    );
  }
  try {
    const { urlRedirects } = await storefront.query(REDIRECT_QUERY, {
      // The admin doesn't allow redirects to have a
      // trailing slash, so strip them all off
      variables: { query: "path:" + redirectFrom.replace(/\/+$/, "") }
    });
    const location = urlRedirects?.edges?.[0]?.node?.target;
    if (location) {
      return createRedirectResponse(
        location,
        isSoftNavigation,
        searchParams,
        matchQueryParams
      );
    }
    const redirectTo = getRedirectUrl(request.url);
    if (redirectTo) {
      return createRedirectResponse(
        redirectTo,
        isSoftNavigation,
        searchParams,
        matchQueryParams
      );
    }
  } catch (error) {
    console.error(
      `Failed to fetch redirects from Storefront API for route ${redirectFrom}`,
      error
    );
  }
  return response;
}
var TEMP_DOMAIN = "https://example.com";
function createRedirectResponse(location, isSoftNavigation, searchParams, matchQueryParams) {
  const url = new URL(location, TEMP_DOMAIN);
  if (!matchQueryParams) {
    for (const [key, value] of searchParams) {
      url.searchParams.append(key, value);
    }
  }
  if (isSoftNavigation) {
    return new Response(null, {
      status: 200,
      headers: {
        "X-Remix-Redirect": url.toString().replace(TEMP_DOMAIN, ""),
        "X-Remix-Status": "301"
      }
    });
  } else {
    return new Response(null, {
      status: 301,
      headers: { location: url.toString().replace(TEMP_DOMAIN, "") }
    });
  }
}
var REDIRECT_QUERY = `#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;

// src/routing/graphiql.ts
var graphiqlLoader = async function graphiqlLoader2({
  request,
  context
}) {
  const storefront = context.storefront;
  const customerAccount = context.customerAccount;
  const url = new URL(request.url);
  if (!storefront) {
    throw new Error(
      `GraphiQL: Hydrogen's storefront client must be injected in the loader context.`
    );
  }
  const schemas = {};
  if (storefront) {
    const authHeader = "X-Shopify-Storefront-Access-Token";
    schemas.storefront = {
      name: "Storefront API",
      authHeader,
      accessToken: storefront.getPublicTokenHeaders()[authHeader],
      apiUrl: storefront.getApiUrl(),
      icon: "SF"
    };
  }
  if (customerAccount) {
    const customerAccountSchema = await (await fetch(url.origin + "/graphiql/customer-account.schema.json")).json();
    const accessToken = await customerAccount.getAccessToken();
    if (customerAccountSchema) {
      schemas["customer-account"] = {
        name: "Customer Account API",
        value: customerAccountSchema,
        authHeader: "Authorization",
        accessToken,
        apiUrl: customerAccount.getApiUrl(),
        icon: "CA"
      };
    }
  }
  const favicon = `https://avatars.githubusercontent.com/u/12972006?s=48&v=4`;
  const html = String.raw;
  return new Response(
    html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>GraphiQL</title>
          <link rel="icon" type="image/x-icon" href="${favicon}" />
          <style>
            body {
              height: 100%;
              margin: 0;
              width: 100%;
              overflow: hidden;
              background-color: hsl(219, 29%, 18%);
            }

            #graphiql {
              height: 100vh;
            }

            #graphiql > .placeholder {
              color: slategray;
              width: fit-content;
              margin: 40px auto;
              font-family: Arial;
            }

            .graphiql-api-toolbar-label {
              position: absolute;
              bottom: -6px;
              right: -4px;
              font-size: 8px;
            }
          </style>

          <script
            crossorigin
            src="https://unpkg.com/react@18/umd/react.development.js"
          ></script>
          <script
            crossorigin
            src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
          ></script>
          <link
            rel="stylesheet"
            href="https://unpkg.com/graphiql@3/graphiql.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/@graphiql/plugin-explorer/dist/style.css"
          />
        </head>

        <body>
          <div id="graphiql">
            <div class="placeholder">Loading GraphiQL...</div>
          </div>

          <script
            src="https://unpkg.com/graphiql@3/graphiql.min.js"
            type="application/javascript"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://unpkg.com/@graphiql/plugin-explorer/dist/index.umd.js"
            type="application/javascript"
            crossorigin="anonymous"
          ></script>

          <script>
            const windowUrl = new URL(document.URL);
            const startingSchemaKey =
              windowUrl.searchParams.get('schema') || 'storefront';

            let query = '{ shop { name } }';
            if (windowUrl.searchParams.has('query')) {
              query = decodeURIComponent(
                windowUrl.searchParams.get('query') ?? query,
              );
            }

            // Prettify query
            query = GraphiQL.GraphQL.print(GraphiQL.GraphQL.parse(query));

            let variables;
            if (windowUrl.searchParams.has('variables')) {
              variables = decodeURIComponent(
                windowUrl.searchParams.get('variables') ?? '',
              );
            }

            // Prettify variables
            if (variables) {
              variables = JSON.stringify(JSON.parse(variables), null, 2);
            }

            const schemas = ${JSON.stringify(schemas)};
            let lastActiveTabIndex = -1;
            let lastTabAmount = -1;

            const root = ReactDOM.createRoot(
              document.getElementById('graphiql'),
            );

            root.render(React.createElement(RootWrapper));

            const TAB_STATE_KEY = 'graphiql:tabState';
            const storage = {
              getTabState: () =>
                JSON.parse(localStorage.getItem(TAB_STATE_KEY)),
              setTabState: (state) =>
                localStorage.setItem(TAB_STATE_KEY, JSON.stringify(state)),
            };

            let nextSchemaKey;

            function RootWrapper() {
              const [activeSchema, setActiveSchema] =
                React.useState(startingSchemaKey);

              const schema = schemas[activeSchema];
              if (!schema) {
                throw new Error('No schema found for ' + activeSchema);
              }

              const keys = Object.keys(schemas);

              return React.createElement(
                GraphiQL,
                {
                  fetcher: GraphiQL.createFetcher({
                    url: schema.apiUrl,
                    headers: {[schema.authHeader]: schema.accessToken},
                  }),
                  defaultEditorToolsVisibility: true,
                  query,
                  variables,
                  schema: schema.value,
                  plugins: [GraphiQLPluginExplorer.explorerPlugin()],
                  onTabChange: (state) => {
                    const {activeTabIndex, tabs} = state;
                    const activeTab = tabs[activeTabIndex];

                    if (
                      activeTabIndex === lastActiveTabIndex &&
                      lastTabAmount === tabs.length
                    ) {
                      if (
                        nextSchemaKey &&
                        activeTab &&
                        activeTab.schemaKey !== nextSchemaKey
                      ) {
                        activeTab.schemaKey = nextSchemaKey;
                        nextSchemaKey = undefined;

                        // Sync state to localStorage. GraphiQL resets the state
                        // asynchronously, so we need to do it in a timeout.
                        storage.setTabState(state);
                        setTimeout(() => storage.setTabState(state), 500);
                      }

                      // React rerrendering, skip
                      return;
                    }

                    if (activeTab) {
                      if (!activeTab.schemaKey) {
                        // Creating a new tab
                        if (lastTabAmount < tabs.length) {
                          activeTab.schemaKey = activeSchema;
                          storage.setTabState(state);
                        }
                      }

                      const nextSchema = activeTab.schemaKey || 'storefront';

                      if (nextSchema !== activeSchema) {
                        setActiveSchema(nextSchema);
                      }
                    }

                    lastActiveTabIndex = activeTabIndex;
                    lastTabAmount = tabs.length;
                  },
                  toolbar: {
                    additionalComponent: function () {
                      const schema = schemas[activeSchema];

                      return React.createElement(
                        GraphiQL.React.ToolbarButton,
                        {
                          onClick: () => {
                            const activeKeyIndex = keys.indexOf(activeSchema);
                            nextSchemaKey =
                              keys[(activeKeyIndex + 1) % keys.length];

                            // This triggers onTabChange
                            if (nextSchemaKey) setActiveSchema(nextSchemaKey);
                          },
                          label: 'Toggle between different API schemas',
                        },
                        React.createElement(
                          'div',
                          {
                            key: 'api-wrapper',
                            className: 'graphiql-toolbar-icon',
                            style: {position: 'relative', fontWeight: 'bolder'},
                          },
                          [
                            React.createElement(
                              'div',
                              {key: 'icon', style: {textAlign: 'center'}},
                              [
                                schema.icon,
                                React.createElement(
                                  'div',
                                  {
                                    key: 'icon-label',
                                    className: 'graphiql-api-toolbar-label',
                                  },
                                  'API',
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  },
                },
                [
                  React.createElement(
                    GraphiQL.Logo,
                    {
                      key: 'Logo replacement',
                    },
                    [
                      React.createElement(
                        'div',
                        {
                          key: 'Logo wrapper',
                          style: {display: 'flex', alignItems: 'center'},
                        },
                        [
                          React.createElement(
                            'div',
                            {
                              key: 'api',
                              className: 'graphiql-logo',
                              style: {
                                paddingRight: 0,
                                whiteSpace: 'nowrap',
                              },
                            },
                            [schema.name],
                          ),
                          React.createElement(GraphiQL.Logo, {key: 'logo'}),
                        ],
                      ),
                    ],
                  ),
                ],
              );
            }
          </script>
        </body>
      </html>
    `,
    { status: 200, headers: { "content-type": "text/html" } }
  );
};

// src/seo/escape.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

// src/seo/generate-seo-tags.ts
var ERROR_PREFIX = "Error in SEO input: ";
var schema = {
  title: {
    validate: (value) => {
      if (typeof value !== "string") {
        throw new Error(ERROR_PREFIX.concat("`title` should be a string"));
      }
      if (typeof value === "string" && value.length > 120) {
        throw new Error(
          ERROR_PREFIX.concat(
            "`title` should not be longer than 120 characters"
          )
        );
      }
      return value;
    }
  },
  description: {
    validate: (value) => {
      if (typeof value !== "string") {
        throw new Error(
          ERROR_PREFIX.concat("`description` should be a string")
        );
      }
      if (typeof value === "string" && value.length > 155) {
        throw new Error(
          ERROR_PREFIX.concat(
            "`description` should not be longer than 155 characters"
          )
        );
      }
      return value;
    }
  },
  url: {
    validate: (value) => {
      if (typeof value !== "string") {
        throw new Error(ERROR_PREFIX.concat("`url` should be a string"));
      }
      if (typeof value === "string" && !value.startsWith("http")) {
        throw new Error(ERROR_PREFIX.concat("`url` should be a valid URL"));
      }
      return value;
    }
  },
  handle: {
    validate: (value) => {
      if (typeof value !== "string") {
        throw new Error(ERROR_PREFIX.concat("`handle` should be a string"));
      }
      if (typeof value === "string" && !value.startsWith("@")) {
        throw new Error(ERROR_PREFIX.concat("`handle` should start with `@`"));
      }
      return value;
    }
  }
};
function generateSeoTags(seoInput) {
  const tagResults = [];
  for (const seoKey of Object.keys(seoInput)) {
    switch (seoKey) {
      case "title": {
        const content = validate(schema.title, seoInput.title);
        const title = renderTitle(seoInput?.titleTemplate, content);
        if (!title) {
          break;
        }
        tagResults.push(
          generateTag("title", { title }),
          generateTag("meta", { property: "og:title", content: title }),
          generateTag("meta", { name: "twitter:title", content: title })
        );
        break;
      }
      case "description": {
        const content = validate(schema.description, seoInput.description);
        if (!content) {
          break;
        }
        tagResults.push(
          generateTag("meta", {
            name: "description",
            content
          }),
          generateTag("meta", {
            property: "og:description",
            content
          }),
          generateTag("meta", {
            name: "twitter:description",
            content
          })
        );
        break;
      }
      case "url": {
        const content = validate(schema.url, seoInput.url);
        if (!content) {
          break;
        }
        const urlWithoutParams = content.split("?")[0];
        const urlWithoutTrailingSlash = urlWithoutParams.replace(/\/$/, "");
        tagResults.push(
          generateTag("link", {
            rel: "canonical",
            href: urlWithoutTrailingSlash
          }),
          generateTag("meta", {
            property: "og:url",
            content: urlWithoutTrailingSlash
          })
        );
        break;
      }
      case "handle": {
        const content = validate(schema.handle, seoInput.handle);
        if (!content) {
          break;
        }
        tagResults.push(
          generateTag("meta", { name: "twitter:site", content }),
          generateTag("meta", { name: "twitter:creator", content })
        );
        break;
      }
      case "media": {
        let content;
        const values = ensureArray(seoInput.media);
        for (const media of values) {
          if (typeof media === "string") {
            tagResults.push(
              generateTag("meta", { name: "og:image", content: media })
            );
          }
          if (media && typeof media === "object") {
            const type = media.type || "image";
            const normalizedMedia = media ? {
              url: media?.url,
              secure_url: media?.url,
              type: inferMimeType(media.url),
              width: media?.width,
              height: media?.height,
              alt: media?.altText
            } : {};
            for (const key of Object.keys(normalizedMedia)) {
              if (normalizedMedia[key]) {
                content = normalizedMedia[key];
                tagResults.push(
                  generateTag(
                    "meta",
                    {
                      property: `og:${type}:${key}`,
                      content
                    },
                    normalizedMedia.url
                  )
                );
              }
            }
          }
        }
        break;
      }
      case "jsonLd": {
        const jsonLdBlocks = ensureArray(seoInput.jsonLd);
        let index = 0;
        for (const block of jsonLdBlocks) {
          if (typeof block !== "object") {
            continue;
          }
          const tag = generateTag(
            "script",
            {
              type: "application/ld+json",
              children: JSON.stringify(block, (k, value) => {
                return typeof value === "string" ? escapeHtml(value) : value;
              })
            },
            // @ts-expect-error
            `json-ld-${block?.["@type"] || block?.name || index++}`
          );
          tagResults.push(tag);
        }
        break;
      }
      case "alternates": {
        const alternates = ensureArray(seoInput.alternates);
        for (const alternate of alternates) {
          if (!alternate) {
            continue;
          }
          const { language, url, default: defaultLang } = alternate;
          const hrefLang = language ? `${language}${defaultLang ? "-default" : ""}` : void 0;
          tagResults.push(
            generateTag("link", {
              rel: "alternate",
              hrefLang,
              href: url
            })
          );
        }
        break;
      }
      case "robots": {
        if (!seoInput.robots) {
          break;
        }
        const {
          maxImagePreview,
          maxSnippet,
          maxVideoPreview,
          noArchive,
          noFollow,
          noImageIndex,
          noIndex,
          noSnippet,
          noTranslate,
          unavailableAfter
        } = seoInput.robots;
        const robotsParams = [
          noArchive && "noarchive",
          noImageIndex && "noimageindex",
          noSnippet && "nosnippet",
          noTranslate && `notranslate`,
          maxImagePreview && `max-image-preview:${maxImagePreview}`,
          maxSnippet && `max-snippet:${maxSnippet}`,
          maxVideoPreview && `max-video-preview:${maxVideoPreview}`,
          unavailableAfter && `unavailable_after:${unavailableAfter}`
        ];
        let robotsParam = (noIndex ? "noindex" : "index") + "," + (noFollow ? "nofollow" : "follow");
        for (let param of robotsParams) {
          if (param) {
            robotsParam += `,${param}`;
          }
        }
        tagResults.push(
          generateTag("meta", { name: "robots", content: robotsParam })
        );
        break;
      }
    }
  }
  return tagResults.flat().sort((a, b) => a.key.localeCompare(b.key));
}
function generateTag(tagName, input, group) {
  const tag = { tag: tagName, props: {}, key: "" };
  if (tagName === "title") {
    tag.children = input.title;
    tag.key = generateKey(tag);
    return tag;
  }
  if (tagName === "script") {
    tag.children = typeof input.children === "string" ? input.children : "";
    tag.key = generateKey(tag, group);
    delete input.children;
    tag.props = input;
    return tag;
  }
  tag.props = input;
  Object.keys(tag.props).forEach(
    (key) => !tag.props[key] && delete tag.props[key]
  );
  tag.key = generateKey(tag, group);
  return tag;
}
function generateKey(tag, group) {
  const { tag: tagName, props } = tag;
  if (tagName === "title") {
    return "0-title";
  }
  if (tagName === "meta") {
    const priority = props.content === group && typeof props.property === "string" && !props.property.endsWith("secure_url") && "0";
    const groupName = [group, priority];
    return [tagName, ...groupName, props.property || props.name].filter((x) => x).join("-");
  }
  if (tagName === "link") {
    const key = [tagName, props.rel, props.hrefLang || props.media].filter((x) => x).join("-");
    return key.replace(/\s+/g, "-");
  }
  if (tagName === "script") {
    return `${tagName}-${group}`;
  }
  return `${tagName}-${props.type}`;
}
function renderTitle(template, title) {
  if (!title) {
    return void 0;
  }
  if (!template) {
    return title;
  }
  if (typeof template === "function") {
    return template(title);
  }
  return template.replace("%s", title ?? "");
}
function inferMimeType(url) {
  const ext = url && url.split(".").pop();
  switch (ext) {
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "swf":
      return "application/x-shockwave-flash";
    case "mp3":
      return "audio/mpeg";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}
function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}
function validate(schema2, data) {
  try {
    return schema2.validate(data);
  } catch (error) {
    console.warn(error.message);
    return data;
  }
}

// src/seo/seo.ts
var SeoLogger = react.lazy(() => Promise.resolve().then(() => (init_log_seo_tags(), log_seo_tags_exports)));
function Seo({ debug }) {
  const matches = react$1.useMatches();
  const location = react$1.useLocation();
  console.warn(
    "[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa"
  );
  const seoConfig = react.useMemo(() => {
    return matches.flatMap((match) => {
      const { handle, ...routeMatch } = match;
      const routeData = { ...routeMatch, ...location };
      const handleSeo = handle?.seo;
      const loaderSeo = routeMatch?.data?.seo;
      if (!handleSeo && !loaderSeo) {
        return [];
      }
      if (handleSeo) {
        return recursivelyInvokeOrReturn(handleSeo, routeData);
      } else {
        return [loaderSeo];
      }
    }).reduce((acc, current) => {
      Object.keys(current).forEach(
        (key) => !current[key] && delete current[key]
      );
      const { jsonLd } = current;
      if (!jsonLd) {
        return { ...acc, ...current };
      }
      if (!acc?.jsonLd) {
        return { ...acc, ...current, jsonLd: [jsonLd] };
      } else {
        if (Array.isArray(jsonLd)) {
          return {
            ...acc,
            ...current,
            jsonLd: [...acc.jsonLd, ...jsonLd]
          };
        } else {
          return {
            ...acc,
            ...current,
            jsonLd: [...acc.jsonLd, jsonLd]
          };
        }
      }
    }, {});
  }, [matches, location]);
  const { html, loggerMarkup } = react.useMemo(() => {
    const headTags = generateSeoTags(seoConfig);
    const html2 = headTags.map((tag) => {
      if (tag.tag === "script") {
        return react.createElement(tag.tag, {
          ...tag.props,
          key: tag.key,
          dangerouslySetInnerHTML: { __html: tag.children }
        });
      }
      return react.createElement(tag.tag, { ...tag.props, key: tag.key }, tag.children);
    });
    const loggerMarkup2 = react.createElement(
      react.Suspense,
      { fallback: null },
      react.createElement(SeoLogger, { headTags })
    );
    return { html: html2, loggerMarkup: loggerMarkup2 };
  }, [seoConfig]);
  return react.createElement(react.Fragment, null, html, debug && loggerMarkup);
}
function recursivelyInvokeOrReturn(value, ...rest) {
  if (value instanceof Function) {
    return recursivelyInvokeOrReturn(value(...rest), ...rest);
  }
  let result = {};
  if (Array.isArray(value)) {
    result = value.reduce((acc, item) => {
      return [...acc, recursivelyInvokeOrReturn(item)];
    }, []);
    return result;
  }
  if (value instanceof Object) {
    const entries = Object.entries(value);
    entries.forEach(([key, val]) => {
      result[key] = recursivelyInvokeOrReturn(val, ...rest);
    });
    return result;
  }
  return value;
}

// src/seo/getSeoMeta.ts
function getSeoMeta(...seoInputs) {
  let tagResults = [];
  const dedupedSeoInput = seoInputs.reduce((acc, current) => {
    if (!current) return acc;
    Object.keys(current).forEach(
      (key) => !current[key] && delete current[key]
    );
    const { jsonLd } = current;
    if (!jsonLd) {
      return { ...acc, ...current };
    }
    if (!acc?.jsonLd) {
      return { ...acc, ...current, jsonLd: [jsonLd] };
    } else {
      return {
        ...acc,
        ...current,
        jsonLd: ensureArray(acc.jsonLd).concat(jsonLd)
      };
    }
  }, {}) || {};
  for (const seoKey of Object.keys(dedupedSeoInput)) {
    switch (seoKey) {
      case "title": {
        const content = validate(schema.title, dedupedSeoInput.title);
        const title = renderTitle(dedupedSeoInput?.titleTemplate, content);
        if (!title) {
          break;
        }
        tagResults.push(
          { title },
          { property: "og:title", content: title },
          { property: "twitter:title", content: title }
        );
        break;
      }
      case "description": {
        const content = validate(
          schema.description,
          dedupedSeoInput.description
        );
        if (!content) {
          break;
        }
        tagResults.push(
          {
            name: "description",
            content
          },
          {
            property: "og:description",
            content
          },
          {
            property: "twitter:description",
            content
          }
        );
        break;
      }
      case "url": {
        const content = validate(schema.url, dedupedSeoInput.url);
        if (!content) {
          break;
        }
        const urlWithoutParams = content.split("?")[0];
        const urlWithoutTrailingSlash = urlWithoutParams.replace(/\/$/, "");
        tagResults.push(
          {
            tagName: "link",
            rel: "canonical",
            href: urlWithoutTrailingSlash
          },
          {
            property: "og:url",
            content: urlWithoutTrailingSlash
          }
        );
        break;
      }
      case "handle": {
        const content = validate(schema.handle, dedupedSeoInput.handle);
        if (!content) {
          break;
        }
        tagResults.push(
          { property: "twitter:site", content },
          { property: "twitter:creator", content }
        );
        break;
      }
      case "media": {
        let content;
        const values = ensureArray(dedupedSeoInput.media);
        for (const media of values) {
          if (typeof media === "string") {
            tagResults.push({ property: "og:image", content: media });
          }
          if (media && typeof media === "object") {
            const type = media.type || "image";
            const normalizedMedia = media ? {
              url: media?.url,
              secure_url: media?.url,
              type: inferMimeType(media.url),
              width: media?.width,
              height: media?.height,
              alt: media?.altText
            } : {};
            for (const key of Object.keys(normalizedMedia)) {
              if (normalizedMedia[key]) {
                content = normalizedMedia[key];
                tagResults.push({
                  property: `og:${type}:${key}`,
                  content
                });
              }
            }
          }
        }
        break;
      }
      case "jsonLd": {
        const jsonLdBlocks = ensureArray(dedupedSeoInput.jsonLd);
        for (const block of jsonLdBlocks) {
          if (typeof block !== "object" || Object.keys(block).length === 0) {
            continue;
          }
          tagResults.push({
            "script:ld+json": block
          });
        }
        break;
      }
      case "alternates": {
        const alternates = ensureArray(dedupedSeoInput.alternates);
        for (const alternate of alternates) {
          if (!alternate) {
            continue;
          }
          const { language, url, default: defaultLang } = alternate;
          const hrefLang = language ? `${language}${defaultLang ? "-default" : ""}` : void 0;
          tagResults.push({
            tagName: "link",
            rel: "alternate",
            hrefLang,
            href: url
          });
        }
        break;
      }
      case "robots": {
        if (!dedupedSeoInput.robots) {
          break;
        }
        const {
          maxImagePreview,
          maxSnippet,
          maxVideoPreview,
          noArchive,
          noFollow,
          noImageIndex,
          noIndex,
          noSnippet,
          noTranslate,
          unavailableAfter
        } = dedupedSeoInput.robots;
        const robotsParams = [
          noArchive && "noarchive",
          noImageIndex && "noimageindex",
          noSnippet && "nosnippet",
          noTranslate && `notranslate`,
          maxImagePreview && `max-image-preview:${maxImagePreview}`,
          maxSnippet && `max-snippet:${maxSnippet}`,
          maxVideoPreview && `max-video-preview:${maxVideoPreview}`,
          unavailableAfter && `unavailable_after:${unavailableAfter}`
        ];
        let robotsParam = (noIndex ? "noindex" : "index") + "," + (noFollow ? "nofollow" : "follow");
        for (let param of robotsParams) {
          if (param) {
            robotsParam += `,${param}`;
          }
        }
        tagResults.push({ name: "robots", content: robotsParam });
        break;
      }
    }
  }
  return tagResults;
}
function Pagination({
  connection,
  children = () => {
    console.warn("<Pagination> requires children to work properly");
    return null;
  }
}) {
  const transition = react$1.useNavigation();
  const isLoading = transition.state === "loading";
  const {
    endCursor,
    hasNextPage,
    hasPreviousPage,
    nextPageUrl,
    nodes,
    previousPageUrl,
    startCursor
  } = usePagination(connection);
  const state = react.useMemo(
    () => ({
      pageInfo: {
        endCursor,
        hasPreviousPage,
        hasNextPage,
        startCursor
      },
      nodes
    }),
    [endCursor, hasNextPage, hasPreviousPage, startCursor, nodes]
  );
  const NextLink = react.useMemo(
    () => react.forwardRef(function NextLink2(props, ref) {
      return hasNextPage ? react.createElement(react$1.Link, {
        preventScrollReset: true,
        ...props,
        to: nextPageUrl,
        state,
        replace: true,
        ref
      }) : null;
    }),
    [hasNextPage, nextPageUrl, state]
  );
  const PreviousLink = react.useMemo(
    () => react.forwardRef(function PrevLink(props, ref) {
      return hasPreviousPage ? react.createElement(react$1.Link, {
        preventScrollReset: true,
        ...props,
        to: previousPageUrl,
        state,
        replace: true,
        ref
      }) : null;
    }),
    [hasPreviousPage, previousPageUrl, state]
  );
  return children({
    state,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    nextPageUrl,
    nodes,
    previousPageUrl,
    NextLink,
    PreviousLink
  });
}
function getParamsWithoutPagination(paramsString) {
  const params = new URLSearchParams(paramsString);
  params.delete("cursor");
  params.delete("direction");
  return params.toString();
}
function makeError(prop) {
  throw new Error(
    `The Pagination component requires ${"`" + prop + "`"} to be a part of your query. See the guide on how to setup your query to include ${"`" + prop + "`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`
  );
}
function usePagination(connection) {
  if (!connection.pageInfo) {
    makeError("pageInfo");
  }
  if (typeof connection.pageInfo.startCursor === "undefined") {
    makeError("pageInfo.startCursor");
  }
  if (typeof connection.pageInfo.endCursor === "undefined") {
    makeError("pageInfo.endCursor");
  }
  if (typeof connection.pageInfo.hasNextPage === "undefined") {
    makeError("pageInfo.hasNextPage");
  }
  if (typeof connection.pageInfo.hasPreviousPage === "undefined") {
    makeError("pageInfo.hasPreviousPage");
  }
  const navigate = react$1.useNavigate();
  const { state, search, pathname } = react$1.useLocation();
  const params = new URLSearchParams(search);
  const direction = params.get("direction");
  const isPrevious = direction === "previous";
  const nodes = react.useMemo(() => {
    if (!globalThis?.window?.__hydrogenHydrated || !state || !state?.nodes) {
      return hydrogenReact.flattenConnection(connection);
    }
    if (isPrevious) {
      return [...hydrogenReact.flattenConnection(connection), ...state.nodes];
    } else {
      return [...state.nodes, ...hydrogenReact.flattenConnection(connection)];
    }
  }, [state, connection]);
  const currentPageInfo = react.useMemo(() => {
    const hydrogenHydrated = globalThis?.window?.__hydrogenHydrated;
    let pageStartCursor = !hydrogenHydrated || state?.pageInfo?.startCursor === void 0 ? connection.pageInfo.startCursor : state.pageInfo.startCursor;
    let pageEndCursor = !hydrogenHydrated || state?.pageInfo?.endCursor === void 0 ? connection.pageInfo.endCursor : state.pageInfo.endCursor;
    let previousPageExists = !hydrogenHydrated || state?.pageInfo?.hasPreviousPage === void 0 ? connection.pageInfo.hasPreviousPage : state.pageInfo.hasPreviousPage;
    let nextPageExists = !hydrogenHydrated || state?.pageInfo?.hasNextPage === void 0 ? connection.pageInfo.hasNextPage : state.pageInfo.hasNextPage;
    if (state?.nodes) {
      if (isPrevious) {
        pageStartCursor = connection.pageInfo.startCursor;
        previousPageExists = connection.pageInfo.hasPreviousPage;
      } else {
        pageEndCursor = connection.pageInfo.endCursor;
        nextPageExists = connection.pageInfo.hasNextPage;
      }
    }
    return {
      startCursor: pageStartCursor,
      endCursor: pageEndCursor,
      hasPreviousPage: previousPageExists,
      hasNextPage: nextPageExists
    };
  }, [
    isPrevious,
    state,
    connection.pageInfo.hasNextPage,
    connection.pageInfo.hasPreviousPage,
    connection.pageInfo.startCursor,
    connection.pageInfo.endCursor
  ]);
  const urlRef = react.useRef({
    params: getParamsWithoutPagination(search),
    pathname
  });
  react.useEffect(() => {
    window.__hydrogenHydrated = true;
  }, []);
  react.useEffect(() => {
    if (
      // If the URL changes (independent of pagination params)
      // then reset the pagination params in the URL
      getParamsWithoutPagination(search) !== urlRef.current.params || pathname !== urlRef.current.pathname
    ) {
      urlRef.current = {
        pathname,
        params: getParamsWithoutPagination(search)
      };
      navigate(`${pathname}?${getParamsWithoutPagination(search)}`, {
        replace: true,
        preventScrollReset: true,
        state: { nodes: void 0, pageInfo: void 0 }
      });
    }
  }, [pathname, search]);
  const previousPageUrl = react.useMemo(() => {
    const params2 = new URLSearchParams(search);
    params2.set("direction", "previous");
    currentPageInfo.startCursor && params2.set("cursor", currentPageInfo.startCursor);
    return `?${params2.toString()}`;
  }, [search, currentPageInfo.startCursor]);
  const nextPageUrl = react.useMemo(() => {
    const params2 = new URLSearchParams(search);
    params2.set("direction", "next");
    currentPageInfo.endCursor && params2.set("cursor", currentPageInfo.endCursor);
    return `?${params2.toString()}`;
  }, [search, currentPageInfo.endCursor]);
  return { ...currentPageInfo, previousPageUrl, nextPageUrl, nodes };
}
function getPaginationVariables(request, options = { pageBy: 20 }) {
  if (typeof request?.url === "undefined") {
    throw new Error(
      "getPaginationVariables must be called with the Request object passed to your loader function"
    );
  }
  const { pageBy } = options;
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const cursor = searchParams.get("cursor") ?? void 0;
  const direction = searchParams.get("direction") === "previous" ? "previous" : "next";
  const isPrevious = direction === "previous";
  const prevPage = {
    last: pageBy,
    startCursor: cursor ?? null
  };
  const nextPage = {
    first: pageBy,
    endCursor: cursor ?? null
  };
  const variables = isPrevious ? prevPage : nextPage;
  return variables;
}

// src/customer/BadRequest.ts
var BadRequest = class extends Response {
  constructor(message, helpMessage, headers) {
    if (helpMessage && true) {
      console.error("Customer Account API Error: " + helpMessage);
    }
    super(`Bad request: ${message}`, { status: 400, headers });
  }
};

// src/customer/auth.helpers.ts
var logSubRequestEvent = ({
  url,
  response,
  startTime,
  query,
  variables,
  ...debugInfo
}) => {
  globalThis.__H2O_LOG_EVENT?.({
    ...debugInfo,
    eventType: "subrequest",
    url,
    startTime,
    graphql: query ? JSON.stringify({ query, variables, schema: "customer-account" }) : void 0,
    responseInit: {
      status: response.status || 0,
      statusText: response.statusText || "",
      headers: Array.from(response.headers.entries() || [])
    }
  });
} ;
function redirect(path, options = {}) {
  const headers = options.headers ? new Headers(options.headers) : new Headers({});
  headers.set("location", path);
  return new Response(null, { status: options.status || 302, headers });
}
async function refreshToken({
  session,
  customerAccountId,
  customerAccountUrl,
  httpsOrigin,
  debugInfo,
  exchangeForStorefrontCustomerAccessToken
}) {
  const newBody = new URLSearchParams();
  const customerAccount = session.get(CUSTOMER_ACCOUNT_SESSION_KEY);
  const refreshToken2 = customerAccount?.refreshToken;
  const idToken = customerAccount?.idToken;
  if (!refreshToken2)
    throw new BadRequest(
      "Unauthorized",
      "No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`."
    );
  newBody.append("grant_type", "refresh_token");
  newBody.append("refresh_token", refreshToken2);
  newBody.append("client_id", customerAccountId);
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": USER_AGENT,
    Origin: httpsOrigin
  };
  const startTime = (/* @__PURE__ */ new Date()).getTime();
  const url = `${customerAccountUrl}/auth/oauth/token`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: newBody
  });
  logSubRequestEvent?.({
    displayName: "Customer Account API: access token refresh",
    url,
    startTime,
    response,
    ...debugInfo
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    });
  }
  const { access_token, expires_in, refresh_token } = await response.json();
  const accessToken = await exchangeAccessToken(
    access_token,
    customerAccountId,
    customerAccountUrl,
    httpsOrigin,
    debugInfo
  );
  session.set(CUSTOMER_ACCOUNT_SESSION_KEY, {
    accessToken,
    // Store the date in future the token expires, separated by two minutes
    expiresAt: new Date((/* @__PURE__ */ new Date()).getTime() + (expires_in - 120) * 1e3).getTime() + "",
    refreshToken: refresh_token,
    idToken
  });
  await exchangeForStorefrontCustomerAccessToken();
}
function clearSession(session) {
  session.unset(CUSTOMER_ACCOUNT_SESSION_KEY);
  session.unset(BUYER_SESSION_KEY);
}
async function checkExpires({
  locks,
  expiresAt,
  session,
  customerAccountId,
  customerAccountUrl,
  httpsOrigin,
  debugInfo,
  exchangeForStorefrontCustomerAccessToken
}) {
  if (parseInt(expiresAt, 10) - 1e3 < (/* @__PURE__ */ new Date()).getTime()) {
    try {
      if (!locks.refresh)
        locks.refresh = refreshToken({
          session,
          customerAccountId,
          customerAccountUrl,
          httpsOrigin,
          debugInfo,
          exchangeForStorefrontCustomerAccessToken
        });
      await locks.refresh;
      delete locks.refresh;
    } catch (error) {
      clearSession(session);
      if (error && error.status !== 401) {
        throw error;
      } else {
        throw new BadRequest(
          "Unauthorized",
          "Login before querying the Customer Account API."
        );
      }
    }
  }
}
function generateCodeVerifier() {
  const rando = generateRandomCode();
  return base64UrlEncode(rando);
}
async function generateCodeChallenge(codeVerifier) {
  const digestOp = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(codeVerifier)
  );
  const hash = convertBufferToString(digestOp);
  return base64UrlEncode(hash);
}
function generateRandomCode() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
}
function base64UrlEncode(str) {
  const base64 = btoa(str);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function convertBufferToString(hash) {
  const uintArray = new Uint8Array(hash);
  const numberArray = Array.from(uintArray);
  return String.fromCharCode(...numberArray);
}
function generateState() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}
async function exchangeAccessToken(authAccessToken, customerAccountId, customerAccountUrl, httpsOrigin, debugInfo) {
  const clientId = customerAccountId;
  if (!authAccessToken)
    throw new BadRequest(
      "Unauthorized",
      "oAuth access token was not provided during token exchange."
    );
  const body = new URLSearchParams();
  body.append("grant_type", "urn:ietf:params:oauth:grant-type:token-exchange");
  body.append("client_id", clientId);
  body.append("audience", CUSTOMER_API_CLIENT_ID);
  body.append("subject_token", authAccessToken);
  body.append(
    "subject_token_type",
    "urn:ietf:params:oauth:token-type:access_token"
  );
  body.append("scopes", "https://api.customers.com/auth/customer.graphql");
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": USER_AGENT,
    Origin: httpsOrigin
  };
  const startTime = (/* @__PURE__ */ new Date()).getTime();
  const url = `${customerAccountUrl}/auth/oauth/token`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body
  });
  logSubRequestEvent?.({
    displayName: "Customer Account API: access token exchange",
    url,
    startTime,
    response,
    ...debugInfo
  });
  const data = await response.json();
  if (data.error) {
    throw new BadRequest(data.error_description);
  }
  return data.access_token;
}
function getNonce(token) {
  return decodeJwt(token).payload.nonce;
}
function decodeJwt(token) {
  const [header, payload, signature] = token.split(".");
  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature
  };
}

// src/csp/nonce.ts
function generateNonce() {
  return toHexString(randomUint8Array());
}
function randomUint8Array() {
  try {
    return crypto.getRandomValues(new Uint8Array(16));
  } catch (e) {
    return new Uint8Array(16).map(() => Math.random() * 255 | 0);
  }
}
function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ("0" + (byte & 255).toString(16)).slice(-2);
  }).join("");
}

// src/customer/customer.ts
var DEFAULT_LOGIN_URL = "/account/login";
var DEFAULT_AUTH_URL = "/account/authorize";
var DEFAULT_REDIRECT_PATH = "/account";
function defaultAuthStatusHandler(request) {
  if (!request.url) return DEFAULT_LOGIN_URL;
  const { pathname } = new URL(request.url);
  const redirectTo = DEFAULT_LOGIN_URL + `?${new URLSearchParams({ return_to: pathname }).toString()}`;
  return redirect(redirectTo);
}
function createCustomerAccountClient({
  session,
  customerAccountId,
  customerAccountUrl,
  customerApiVersion = DEFAULT_CUSTOMER_API_VERSION,
  request,
  waitUntil,
  authUrl,
  customAuthStatusHandler,
  logErrors = true,
  unstableB2b = false
}) {
  if (customerApiVersion !== DEFAULT_CUSTOMER_API_VERSION) {
    console.warn(
      `[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${customerApiVersion} when this version of Hydrogen was built for ${DEFAULT_CUSTOMER_API_VERSION}.`
    );
  }
  if (!request?.url) {
    throw new Error(
      "[h2:error:createCustomerAccountClient] The request object does not contain a URL."
    );
  }
  const authStatusHandler = customAuthStatusHandler ? customAuthStatusHandler : () => defaultAuthStatusHandler(request);
  const requestUrl = new URL(request.url);
  const httpsOrigin = requestUrl.protocol === "http:" ? requestUrl.origin.replace("http", "https") : requestUrl.origin;
  const redirectUri = ensureLocalRedirectUrl({
    requestUrl: httpsOrigin,
    defaultUrl: DEFAULT_AUTH_URL,
    redirectUrl: authUrl
  });
  const customerAccountApiUrl = `${customerAccountUrl}/account/customer/api/${customerApiVersion}/graphql`;
  const locks = {};
  async function fetchCustomerAPI({
    query: query2,
    type,
    variables = {}
  }) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw authStatusHandler();
    }
    const stackInfo = getCallerStackLine?.();
    const startTime = (/* @__PURE__ */ new Date()).getTime();
    const response = await fetch(customerAccountApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        Origin: httpsOrigin,
        Authorization: accessToken
      },
      body: JSON.stringify({ query: query2, variables })
    });
    logSubRequestEvent?.({
      url: customerAccountApiUrl,
      startTime,
      response,
      waitUntil,
      stackInfo,
      query: query2,
      variables,
      ...getDebugHeaders(request)
    });
    const body = await response.text();
    const errorOptions = {
      url: customerAccountApiUrl,
      response,
      type,
      query: query2,
      queryVariables: variables,
      errors: void 0,
      client: "customer"
    };
    if (!response.ok) {
      if (response.status === 401) {
        clearSession(session);
        const authFailResponse = authStatusHandler();
        throw authFailResponse;
      }
      let errors2;
      try {
        errors2 = parseJSON(body);
      } catch (_e) {
        errors2 = [{ message: body }];
      }
      throwErrorWithGqlLink({ ...errorOptions, errors: errors2 });
    }
    try {
      const APIresponse = parseJSON(body);
      const { errors: errors2 } = APIresponse;
      const gqlErrors = errors2?.map(
        ({ message, ...rest }) => new GraphQLError(message, {
          ...rest,
          clientOperation: `customerAccount.${errorOptions.type}`,
          requestId: response.headers.get("x-request-id"),
          queryVariables: variables,
          query: query2
        })
      );
      return { ...APIresponse, ...errors2 && { errors: gqlErrors } };
    } catch (e) {
      throwErrorWithGqlLink({ ...errorOptions, errors: [{ message: body }] });
    }
  }
  async function isLoggedIn() {
    if (!customerAccountUrl || !customerAccountId) return false;
    const customerAccount = session.get(CUSTOMER_ACCOUNT_SESSION_KEY);
    const accessToken = customerAccount?.accessToken;
    const expiresAt = customerAccount?.expiresAt;
    if (!accessToken || !expiresAt) return false;
    const stackInfo = getCallerStackLine?.();
    try {
      await checkExpires({
        locks,
        expiresAt,
        session,
        customerAccountId,
        customerAccountUrl,
        httpsOrigin,
        debugInfo: {
          waitUntil,
          stackInfo,
          ...getDebugHeaders(request)
        },
        exchangeForStorefrontCustomerAccessToken
      });
    } catch {
      return false;
    }
    return true;
  }
  async function handleAuthStatus() {
    if (!await isLoggedIn()) {
      throw authStatusHandler();
    }
  }
  async function getAccessToken() {
    const hasAccessToken = await isLoggedIn();
    if (hasAccessToken)
      return session.get(CUSTOMER_ACCOUNT_SESSION_KEY)?.accessToken;
  }
  async function mutate(mutation, options) {
    ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId);
    mutation = minifyQuery(mutation);
    assertMutation(mutation, "customer.mutate");
    return withSyncStack(
      fetchCustomerAPI({ query: mutation, type: "mutation", ...options }),
      { logErrors }
    );
  }
  async function query(query2, options) {
    ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId);
    query2 = minifyQuery(query2);
    assertQuery(query2, "customer.query");
    return withSyncStack(fetchCustomerAPI({ query: query2, type: "query", ...options }), {
      logErrors
    });
  }
  function setBuyer(buyer) {
    session.set(BUYER_SESSION_KEY, {
      ...session.get(BUYER_SESSION_KEY),
      ...buyer
    });
  }
  async function getBuyer() {
    const hasAccessToken = await isLoggedIn();
    if (!hasAccessToken) {
      return;
    }
    return session.get(BUYER_SESSION_KEY);
  }
  async function exchangeForStorefrontCustomerAccessToken() {
    if (!unstableB2b) {
      return;
    }
    const STOREFRONT_CUSTOMER_ACCOUNT_TOKEN_CREATE = `#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `;
    const { data } = await mutate(STOREFRONT_CUSTOMER_ACCOUNT_TOKEN_CREATE);
    const customerAccessToken = data?.storefrontCustomerAccessTokenCreate?.customerAccessToken;
    if (customerAccessToken) {
      setBuyer({
        customerAccessToken
      });
    }
  }
  return {
    login: async (options) => {
      ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId);
      const loginUrl = new URL(`${customerAccountUrl}/auth/oauth/authorize`);
      const state = generateState();
      const nonce = generateNonce();
      loginUrl.searchParams.set("client_id", customerAccountId);
      loginUrl.searchParams.set("scope", "openid email");
      loginUrl.searchParams.append("response_type", "code");
      loginUrl.searchParams.append("redirect_uri", redirectUri);
      loginUrl.searchParams.set(
        "scope",
        "openid email https://api.customers.com/auth/customer.graphql"
      );
      loginUrl.searchParams.append("state", state);
      loginUrl.searchParams.append("nonce", nonce);
      if (options?.uiLocales) {
        const [language, region] = options.uiLocales.split("-");
        let locale = language.toLowerCase();
        if (region) {
          locale += `-${region.toUpperCase()}`;
        }
        loginUrl.searchParams.append("ui_locales", locale);
      }
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      session.set(CUSTOMER_ACCOUNT_SESSION_KEY, {
        ...session.get(CUSTOMER_ACCOUNT_SESSION_KEY),
        codeVerifier: verifier,
        state,
        nonce,
        redirectPath: getRedirectUrl(request.url) || getHeader(request, "Referer") || DEFAULT_REDIRECT_PATH
      });
      loginUrl.searchParams.append("code_challenge", challenge);
      loginUrl.searchParams.append("code_challenge_method", "S256");
      return redirect(loginUrl.toString());
    },
    logout: async (options) => {
      ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId);
      const idToken = session.get(CUSTOMER_ACCOUNT_SESSION_KEY)?.idToken;
      const postLogoutRedirectUri = ensureLocalRedirectUrl({
        requestUrl: httpsOrigin,
        defaultUrl: httpsOrigin,
        redirectUrl: options?.postLogoutRedirectUri
      });
      const logoutUrl = idToken ? new URL(
        `${customerAccountUrl}/auth/logout?${new URLSearchParams([
          ["id_token_hint", idToken],
          ["post_logout_redirect_uri", postLogoutRedirectUri]
        ]).toString()}`
      ).toString() : postLogoutRedirectUri;
      clearSession(session);
      return redirect(logoutUrl);
    },
    isLoggedIn,
    handleAuthStatus,
    getAccessToken,
    getApiUrl: () => customerAccountApiUrl,
    mutate,
    query,
    authorize: async () => {
      ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId);
      const code = requestUrl.searchParams.get("code");
      const state = requestUrl.searchParams.get("state");
      if (!code || !state) {
        clearSession(session);
        throw new BadRequest(
          "Unauthorized",
          "No code or state parameter found in the redirect URL."
        );
      }
      if (session.get(CUSTOMER_ACCOUNT_SESSION_KEY)?.state !== state) {
        clearSession(session);
        throw new BadRequest(
          "Unauthorized",
          "The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`."
        );
      }
      const clientId = customerAccountId;
      const body = new URLSearchParams();
      body.append("grant_type", "authorization_code");
      body.append("client_id", clientId);
      body.append("redirect_uri", redirectUri);
      body.append("code", code);
      const codeVerifier = session.get(
        CUSTOMER_ACCOUNT_SESSION_KEY
      )?.codeVerifier;
      if (!codeVerifier)
        throw new BadRequest(
          "Unauthorized",
          "No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`."
        );
      body.append("code_verifier", codeVerifier);
      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
        Origin: httpsOrigin
      };
      const stackInfo = getCallerStackLine?.();
      const startTime = (/* @__PURE__ */ new Date()).getTime();
      const url = `${customerAccountUrl}/auth/oauth/token`;
      const response = await fetch(url, {
        method: "POST",
        headers,
        body
      });
      logSubRequestEvent?.({
        url,
        displayName: "Customer Account API: authorize",
        startTime,
        response,
        waitUntil,
        stackInfo,
        ...getDebugHeaders(request)
      });
      if (!response.ok) {
        throw new Response(await response.text(), {
          status: response.status,
          headers: {
            "Content-Type": "text/html; charset=utf-8"
          }
        });
      }
      const { access_token, expires_in, id_token, refresh_token } = await response.json();
      const sessionNonce = session.get(CUSTOMER_ACCOUNT_SESSION_KEY)?.nonce;
      const responseNonce = await getNonce(id_token);
      if (sessionNonce !== responseNonce) {
        throw new BadRequest(
          "Unauthorized",
          `Returned nonce does not match: ${sessionNonce} !== ${responseNonce}`
        );
      }
      const customerAccessToken = await exchangeAccessToken(
        access_token,
        customerAccountId,
        customerAccountUrl,
        httpsOrigin,
        {
          waitUntil,
          stackInfo,
          ...getDebugHeaders(request)
        }
      );
      const redirectPath = session.get(
        CUSTOMER_ACCOUNT_SESSION_KEY
      )?.redirectPath;
      session.set(CUSTOMER_ACCOUNT_SESSION_KEY, {
        accessToken: customerAccessToken,
        expiresAt: new Date((/* @__PURE__ */ new Date()).getTime() + (expires_in - 120) * 1e3).getTime() + "",
        refreshToken: refresh_token,
        idToken: id_token
      });
      await exchangeForStorefrontCustomerAccessToken();
      return redirect(redirectPath || DEFAULT_REDIRECT_PATH);
    },
    UNSTABLE_setBuyer: setBuyer,
    UNSTABLE_getBuyer: getBuyer
  };
}
function ifInvalidCredentialThrowError(customerAccountUrl, customerAccountId) {
  try {
    if (!customerAccountUrl || !customerAccountId) throw Error();
    new URL(customerAccountUrl);
  } catch {
    console.error(
      new Error(
        "[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."
      )
    );
    const publicMessage = "You do not have the valid credential to use Customer Account API (/account).";
    throw new Response(publicMessage, { status: 500 });
  }
}

// src/changelogHandler.ts
var DEFAULT_GITHUB_CHANGELOG_URL = "https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";
async function changelogHandler({
  request,
  changelogUrl
}) {
  new URL(request.url).searchParams;
  const GITHUB_CHANGELOG_URL = changelogUrl || DEFAULT_GITHUB_CHANGELOG_URL;
  return fetch(GITHUB_CHANGELOG_URL);
}
var INPUT_NAME = "cartFormInput";
function CartForm({
  children,
  action,
  inputs,
  route,
  fetcherKey
}) {
  const fetcher = react$1.useFetcher({ key: fetcherKey });
  return /* @__PURE__ */ jsxRuntime.jsxs(fetcher.Form, { action: route || "", method: "post", children: [
    (action || inputs) && /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        type: "hidden",
        name: INPUT_NAME,
        value: JSON.stringify({ action, inputs })
      }
    ),
    typeof children === "function" ? children(fetcher) : children
  ] });
}
CartForm.INPUT_NAME = INPUT_NAME;
CartForm.ACTIONS = {
  AttributesUpdateInput: "AttributesUpdateInput",
  BuyerIdentityUpdate: "BuyerIdentityUpdate",
  Create: "Create",
  DiscountCodesUpdate: "DiscountCodesUpdate",
  LinesAdd: "LinesAdd",
  LinesRemove: "LinesRemove",
  LinesUpdate: "LinesUpdate",
  NoteUpdate: "NoteUpdate",
  SelectedDeliveryOptionsUpdate: "SelectedDeliveryOptionsUpdate",
  MetafieldsSet: "MetafieldsSet",
  MetafieldDelete: "MetafieldDelete"
};
function getFormInput(formData) {
  const data = {};
  for (const pair of formData.entries()) {
    const key = pair[0];
    const values = formData.getAll(key);
    data[key] = values.length > 1 ? values : pair[1];
  }
  const { cartFormInput, ...otherData } = data;
  const { action, inputs } = cartFormInput ? JSON.parse(String(cartFormInput)) : {};
  return {
    action,
    inputs: {
      ...inputs,
      ...otherData
    }
  };
}
CartForm.getFormInput = getFormInput;

// src/cart/queries/cart-fragments.ts
var USER_ERROR_FRAGMENT = `#graphql
  fragment CartApiError on CartUserError {
    message
    field
    code
  }
`;
var MINIMAL_CART_FRAGMENT = `#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
  }
`;

// src/cart/queries/cartCreateDefault.ts
function cartCreateDefault(options) {
  return async (input, optionalParams) => {
    const buyer = options.customerAccount ? await options.customerAccount.UNSTABLE_getBuyer() : void 0;
    const { cartId, ...restOfOptionalParams } = optionalParams || {};
    const { buyerIdentity, ...restOfInput } = input;
    const { cartCreate, errors: errors2 } = await options.storefront.mutate(CART_CREATE_MUTATION(options.cartFragment), {
      variables: {
        input: {
          ...restOfInput,
          buyerIdentity: {
            ...buyer,
            ...buyerIdentity
          }
        },
        ...restOfOptionalParams
      }
    });
    return formatAPIResult(cartCreate, errors2);
  };
}
var CART_CREATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartCreate(
    $input: CartInput!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartApiMutation
        checkoutUrl
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartGetDefault.ts
function cartGetDefault({
  storefront,
  customerAccount,
  getCartId,
  cartFragment
}) {
  return async (cartInput) => {
    const cartId = getCartId();
    if (!cartId) return null;
    const [isCustomerLoggedIn, { cart, errors: errors2 }] = await Promise.all([
      customerAccount ? customerAccount.isLoggedIn() : false,
      storefront.query(CART_QUERY(cartFragment), {
        variables: { cartId, ...cartInput },
        cache: storefront.CacheNone()
      })
    ]);
    if (isCustomerLoggedIn && cart?.checkoutUrl) {
      const finalCheckoutUrl = new URL(cart.checkoutUrl);
      finalCheckoutUrl.searchParams.set("logged_in", "true");
      cart.checkoutUrl = finalCheckoutUrl.toString();
    }
    return cart || errors2 ? formatAPIResult(cart, errors2) : null;
  };
}
var CART_QUERY = (cartFragment = DEFAULT_CART_FRAGMENT) => `#graphql
  query CartQuery(
    $cartId: ID!
    $numCartLines: Int = 100
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...CartApiQuery
    }
  }

  ${cartFragment}
`;
var DEFAULT_CART_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    updatedAt
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...CartApiMoney
              }
              price {
                ...CartApiMoney
              }
              requiresShipping
              title
              image {
                ...CartApiImage
              }
              product {
                handle
                title
                id
                vendor
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...CartApiMoney
      }
      totalAmount {
        ...CartApiMoney
      }
      totalDutyAmount {
        ...CartApiMoney
      }
      totalTaxAmount {
        ...CartApiMoney
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      applicable
      code
    }
  }

  fragment CartApiMoney on MoneyV2 {
    currencyCode
    amount
  }

  fragment CartApiImage on Image {
    id
    url
    altText
    width
    height
  }
`;

// src/cart/queries/cartLinesAddDefault.ts
function cartLinesAddDefault(options) {
  return async (lines, optionalParams) => {
    const { cartLinesAdd, errors: errors2 } = await options.storefront.mutate(CART_LINES_ADD_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        lines,
        ...optionalParams
      }
    });
    return formatAPIResult(cartLinesAdd, errors2);
  };
}
var CART_LINES_ADD_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }

  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/optimistic/optimistic-cart.helper.ts
var PENDING_PREFIX = "__h_pending_";
function getOptimisticLineId(variantId) {
  return PENDING_PREFIX + variantId;
}
function isOptimisticLineId(lineId) {
  return lineId.startsWith(PENDING_PREFIX);
}
function throwIfLinesAreOptimistic(type, lines) {
  if (lines.some(
    (line) => isOptimisticLineId(typeof line === "string" ? line : line.id)
  )) {
    throw new Error(
      `Tried to perform an action on an optimistic line. Make sure to disable your "${type}" CartForm action when the line is optimistic.`
    );
  }
}

// src/cart/queries/cartLinesUpdateDefault.ts
function cartLinesUpdateDefault(options) {
  return async (lines, optionalParams) => {
    throwIfLinesAreOptimistic("updateLines", lines);
    const { cartLinesUpdate, errors: errors2 } = await options.storefront.mutate(CART_LINES_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        lines,
        ...optionalParams
      }
    });
    return formatAPIResult(cartLinesUpdate, errors2);
  };
}
var CART_LINES_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartLinesUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }

  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartLinesRemoveDefault.ts
function cartLinesRemoveDefault(options) {
  return async (lineIds, optionalParams) => {
    throwIfLinesAreOptimistic("removeLines", lineIds);
    const { cartLinesRemove, errors: errors2 } = await options.storefront.mutate(CART_LINES_REMOVE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        lineIds,
        ...optionalParams
      }
    });
    return formatAPIResult(cartLinesRemove, errors2);
  };
}
var CART_LINES_REMOVE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartLinesRemove(
    $cartId: ID!
    $lineIds: [ID!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }

  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartDiscountCodesUpdateDefault.ts
function cartDiscountCodesUpdateDefault(options) {
  return async (discountCodes, optionalParams) => {
    const uniqueCodes = discountCodes.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    const { cartDiscountCodesUpdate, errors: errors2 } = await options.storefront.mutate(CART_DISCOUNT_CODE_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        discountCodes: uniqueCodes,
        ...optionalParams
      }
    });
    return formatAPIResult(cartDiscountCodesUpdate, errors2);
  };
}
var CART_DISCOUNT_CODE_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartDiscountCodesUpdate(
    $cartId: ID!
    $discountCodes: [String!]
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartBuyerIdentityUpdateDefault.ts
function cartBuyerIdentityUpdateDefault(options) {
  return async (buyerIdentity, optionalParams) => {
    if (buyerIdentity.companyLocationId && options.customerAccount) {
      options.customerAccount.UNSTABLE_setBuyer({
        companyLocationId: buyerIdentity.companyLocationId
      });
    }
    const buyer = options.customerAccount ? await options.customerAccount.UNSTABLE_getBuyer() : void 0;
    const { cartBuyerIdentityUpdate, errors: errors2 } = await options.storefront.mutate(CART_BUYER_IDENTITY_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        buyerIdentity: {
          ...buyer,
          ...buyerIdentity
        },
        ...optionalParams
      }
    });
    return formatAPIResult(cartBuyerIdentityUpdate, errors2);
  };
}
var CART_BUYER_IDENTITY_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartNoteUpdateDefault.ts
function cartNoteUpdateDefault(options) {
  return async (note, optionalParams) => {
    const { cartNoteUpdate, errors: errors2 } = await options.storefront.mutate(CART_NOTE_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        note,
        ...optionalParams
      }
    });
    return formatAPIResult(cartNoteUpdate, errors2);
  };
}
var CART_NOTE_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartNoteUpdate(
    $cartId: ID!
    $note: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartSelectedDeliveryOptionsUpdateDefault.ts
function cartSelectedDeliveryOptionsUpdateDefault(options) {
  return async (selectedDeliveryOptions, optionalParams) => {
    const { cartSelectedDeliveryOptionsUpdate, errors: errors2 } = await options.storefront.mutate(CART_SELECTED_DELIVERY_OPTIONS_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        selectedDeliveryOptions,
        ...optionalParams
      }
    });
    return formatAPIResult(cartSelectedDeliveryOptionsUpdate, errors2);
  };
}
var CART_SELECTED_DELIVERY_OPTIONS_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartSelectedDeliveryOptionsUpdate(
    $cartId: ID!
    $selectedDeliveryOptions: [CartSelectedDeliveryOptionInput!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartSelectedDeliveryOptionsUpdate(cartId: $cartId, selectedDeliveryOptions: $selectedDeliveryOptions) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartAttributesUpdateDefault.ts
function cartAttributesUpdateDefault(options) {
  return async (attributes, optionalParams) => {
    const { cartAttributesUpdate, errors: errors2 } = await options.storefront.mutate(CART_ATTRIBUTES_UPDATE_MUTATION(options.cartFragment), {
      variables: {
        cartId: optionalParams?.cartId || options.getCartId(),
        attributes
      }
    });
    return formatAPIResult(cartAttributesUpdate, errors2);
  };
}
var CART_ATTRIBUTES_UPDATE_MUTATION = (cartFragment = MINIMAL_CART_FRAGMENT) => `#graphql
  mutation cartAttributesUpdate(
    $cartId: ID!
    $attributes: [AttributeInput!]!
  ) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
    }
  }
  ${cartFragment}
  ${USER_ERROR_FRAGMENT}
`;

// src/cart/queries/cartMetafieldsSetDefault.ts
function cartMetafieldsSetDefault(options) {
  return async (metafields, optionalParams) => {
    const ownerId = optionalParams?.cartId || options.getCartId();
    const metafieldsWithOwnerId = metafields.map(
      (metafield) => ({
        ...metafield,
        ownerId
      })
    );
    const { cartMetafieldsSet, errors: errors2 } = await options.storefront.mutate(CART_METAFIELD_SET_MUTATION(), {
      variables: { metafields: metafieldsWithOwnerId }
    });
    return formatAPIResult(
      {
        cart: {
          id: ownerId
        },
        ...cartMetafieldsSet
      },
      errors2
    );
  };
}
var CART_METAFIELD_SET_MUTATION = () => `#graphql
  mutation cartMetafieldsSet(
    $metafields: [CartMetafieldsSetInput!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartMetafieldsSet(metafields: $metafields) {
      userErrors {
        code
        elementIndex
        field
        message
      }
    }
  }
`;

// src/cart/queries/cartMetafieldDeleteDefault.ts
function cartMetafieldDeleteDefault(options) {
  return async (key, optionalParams) => {
    const ownerId = optionalParams?.cartId || options.getCartId();
    const { cartMetafieldDelete, errors: errors2 } = await options.storefront.mutate(CART_METAFIELD_DELETE_MUTATION(), {
      variables: {
        input: {
          ownerId,
          key
        }
      }
    });
    return formatAPIResult(
      {
        cart: {
          id: ownerId
        },
        ...cartMetafieldDelete
      },
      errors2
    );
  };
}
var CART_METAFIELD_DELETE_MUTATION = () => `#graphql
  mutation cartMetafieldDelete(
    $input: CartMetafieldDeleteInput!
  ) {
    cartMetafieldDelete(input: $input) {
      userErrors {
        code
        field
        message
      }
    }
  }
`;
var cartGetIdDefault = (requestHeaders) => {
  const cookies = cookie.parse(requestHeaders.get("Cookie") || "");
  return () => {
    return cookies.cart ? `gid://shopify/Cart/${cookies.cart}` : void 0;
  };
};
var cartSetIdDefault = (cookieOptions) => {
  return (cartId) => {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.stringify("cart", cartId.split("/").pop() || "", {
        path: "/",
        ...cookieOptions
      })
    );
    return headers;
  };
};

// src/cart/createCartHandler.ts
function createCartHandler(options) {
  const {
    getCartId: _getCartId,
    setCartId,
    storefront,
    customerAccount,
    cartQueryFragment,
    cartMutateFragment
  } = options;
  let cartId = _getCartId();
  const getCartId = () => cartId || _getCartId();
  const mutateOptions = {
    storefront,
    getCartId,
    cartFragment: cartMutateFragment,
    customerAccount
  };
  const _cartCreate = cartCreateDefault(mutateOptions);
  const cartCreate = async function(...args) {
    const result = await _cartCreate(...args);
    cartId = result?.cart?.id;
    return result;
  };
  const methods = {
    get: cartGetDefault({
      storefront,
      customerAccount,
      getCartId,
      cartFragment: cartQueryFragment
    }),
    getCartId,
    setCartId,
    create: cartCreate,
    addLines: async (linesWithOptimisticData, optionalParams) => {
      const lines = linesWithOptimisticData.map((line) => {
        return {
          attributes: line.attributes,
          quantity: line.quantity,
          merchandiseId: line.merchandiseId,
          sellingPlanId: line.sellingPlanId
        };
      });
      return cartId || optionalParams?.cartId ? await cartLinesAddDefault(mutateOptions)(lines, optionalParams) : await cartCreate({ lines }, optionalParams);
    },
    updateLines: cartLinesUpdateDefault(mutateOptions),
    removeLines: cartLinesRemoveDefault(mutateOptions),
    updateDiscountCodes: async (discountCodes, optionalParams) => {
      return cartId || optionalParams?.cartId ? await cartDiscountCodesUpdateDefault(mutateOptions)(
        discountCodes,
        optionalParams
      ) : await cartCreate({ discountCodes }, optionalParams);
    },
    updateBuyerIdentity: async (buyerIdentity, optionalParams) => {
      return cartId || optionalParams?.cartId ? await cartBuyerIdentityUpdateDefault(mutateOptions)(
        buyerIdentity,
        optionalParams
      ) : await cartCreate({ buyerIdentity }, optionalParams);
    },
    updateNote: async (note, optionalParams) => {
      return cartId || optionalParams?.cartId ? await cartNoteUpdateDefault(mutateOptions)(note, optionalParams) : await cartCreate({ note }, optionalParams);
    },
    updateSelectedDeliveryOption: cartSelectedDeliveryOptionsUpdateDefault(mutateOptions),
    updateAttributes: async (attributes, optionalParams) => {
      return cartId || optionalParams?.cartId ? await cartAttributesUpdateDefault(mutateOptions)(
        attributes,
        optionalParams
      ) : await cartCreate({ attributes }, optionalParams);
    },
    setMetafields: async (metafields, optionalParams) => {
      return cartId || optionalParams?.cartId ? await cartMetafieldsSetDefault(mutateOptions)(
        metafields,
        optionalParams
      ) : await cartCreate({ metafields }, optionalParams);
    },
    deleteMetafield: cartMetafieldDeleteDefault(mutateOptions)
  };
  if ("customMethods" in options) {
    return {
      ...methods,
      ...options.customMethods ?? {}
    };
  } else {
    return methods;
  }
}
function useOptimisticCart(cart) {
  const fetchers = react$1.useFetchers();
  if (!fetchers || !fetchers.length) return cart;
  const optimisticCart = cart?.lines ? structuredClone(cart) : { lines: { nodes: [] } };
  const cartLines = optimisticCart.lines.nodes;
  let isOptimistic = false;
  for (const { formData } of fetchers) {
    if (!formData) continue;
    const cartFormData = CartForm.getFormInput(formData);
    if (cartFormData.action === CartForm.ACTIONS.LinesAdd) {
      for (const input of cartFormData.inputs.lines) {
        if (!input.selectedVariant) {
          console.error(
            "[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart"
          );
          continue;
        }
        const existingLine = cartLines.find(
          (line) => line.merchandise.id === input.selectedVariant?.id
        );
        isOptimistic = true;
        if (existingLine) {
          existingLine.quantity = (existingLine.quantity || 1) + (input.quantity || 1);
          existingLine.isOptimistic = true;
        } else {
          cartLines.unshift({
            id: getOptimisticLineId(input.selectedVariant.id),
            merchandise: input.selectedVariant,
            isOptimistic: true,
            quantity: input.quantity || 1
          });
        }
      }
    } else if (cartFormData.action === CartForm.ACTIONS.LinesRemove) {
      for (const lineId of cartFormData.inputs.lineIds) {
        const index = cartLines.findIndex((line) => line.id === lineId);
        if (index !== -1) {
          if (isOptimisticLineId(cartLines[index].id)) {
            console.error(
              "[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet"
            );
            continue;
          }
          cartLines.splice(index, 1);
          isOptimistic = true;
        } else {
          console.warn(
            `[h2:warn:useOptimisticCart] Tried to remove line '${lineId}' but it doesn't exist in the cart`
          );
        }
      }
    } else if (cartFormData.action === CartForm.ACTIONS.LinesUpdate) {
      for (const line of cartFormData.inputs.lines) {
        const index = cartLines.findIndex(
          (optimisticLine) => line.id === optimisticLine.id
        );
        if (index > -1) {
          if (isOptimisticLineId(cartLines[index].id)) {
            console.error(
              "[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet"
            );
            continue;
          }
          cartLines[index].quantity = line.quantity;
          if (cartLines[index].quantity === 0) {
            cartLines.splice(index, 1);
          }
          isOptimistic = true;
        } else {
          console.warn(
            `[h2:warn:useOptimisticCart] Tried to update line '${line.id}' but it doesn't exist in the cart`
          );
        }
      }
    }
  }
  if (isOptimistic) {
    optimisticCart.isOptimistic = isOptimistic;
  }
  return optimisticCart;
}
function VariantSelector({
  handle,
  options = [],
  variants: _variants = [],
  productPath = "products",
  waitForNavigation = false,
  children
}) {
  const variants = _variants instanceof Array ? _variants : hydrogenReact.flattenConnection(_variants);
  const { searchParams, path, alreadyOnProductPage } = useVariantPath(
    handle,
    productPath,
    waitForNavigation
  );
  const optionsWithOnlyOneValue = options.filter(
    (option) => option?.values?.length === 1
  );
  return react.createElement(
    react.Fragment,
    null,
    ...react.useMemo(() => {
      return options.map((option) => {
        let activeValue;
        let availableValues = [];
        for (let value of option.values) {
          const clonedSearchParams = new URLSearchParams(
            alreadyOnProductPage ? searchParams : void 0
          );
          clonedSearchParams.set(option.name, value);
          optionsWithOnlyOneValue.forEach((option2) => {
            clonedSearchParams.set(option2.name, option2.values[0]);
          });
          const variant = variants.find(
            (variant2) => variant2?.selectedOptions?.every(
              (selectedOption) => clonedSearchParams.get(selectedOption?.name) === selectedOption?.value
            )
          );
          const currentParam = searchParams.get(option.name);
          const calculatedActiveValue = currentParam ? (
            // If a URL parameter exists for the current option, check if it equals the current value
            currentParam === value
          ) : false;
          if (calculatedActiveValue) {
            activeValue = value;
          }
          const searchString = "?" + clonedSearchParams.toString();
          availableValues.push({
            value,
            isAvailable: variant ? variant.availableForSale : true,
            to: path + searchString,
            search: searchString,
            isActive: calculatedActiveValue,
            variant
          });
        }
        return children({
          option: {
            name: option.name,
            value: activeValue,
            values: availableValues
          }
        });
      });
    }, [options, variants, children])
  );
}
var getSelectedProductOptions = (request) => {
  if (typeof request?.url === "undefined")
    throw new TypeError(`Expected a Request instance, got ${typeof request}`);
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value });
  });
  return selectedOptions;
};
function useVariantPath(handle, productPath, waitForNavigation) {
  const { pathname, search } = react$1.useLocation();
  const navigation = react$1.useNavigation();
  return react.useMemo(() => {
    const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
    const isLocalePathname = match && match.length > 0;
    productPath = productPath.startsWith("/") ? productPath.substring(1) : productPath;
    const path = isLocalePathname ? `${match[0]}${productPath}/${handle}` : `/${productPath}/${handle}`;
    const searchParams = new URLSearchParams(
      // Remix doesn't update the location until pending loaders complete.
      // By default we use the destination search params to make selecting a variant
      // instant, but `waitForNavigation` makes the UI wait to update by only using
      // the active browser search params.
      waitForNavigation || navigation.state !== "loading" ? search : navigation.location.search
    );
    return {
      searchParams,
      // If the current pathname matches the product page, we need to make sure
      // that we append to the current search params. Otherwise all the search
      // params can be generated new.
      alreadyOnProductPage: path === pathname,
      path
    };
  }, [pathname, search, waitForNavigation, handle, productPath, navigation]);
}
function useOptimisticProduct(product, variants) {
  const navigation = react$1.useNavigation();
  const [resolvedVariants, setResolvedVariants] = react.useState([]);
  react.useEffect(() => {
    Promise.resolve(variants).then((productWithVariants) => {
      if (productWithVariants) {
        setResolvedVariants(
          productWithVariants instanceof Array ? productWithVariants : productWithVariants.product?.variants?.nodes || []
        );
      }
    }).catch((error) => {
      reportError(
        new Error(
          "[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",
          {
            cause: error
          }
        )
      );
    });
  }, [variants]);
  if (navigation.state === "loading") {
    const queryParams = new URLSearchParams(navigation.location.search);
    let reportedError = false;
    const selectedVariant = resolvedVariants.find((variant) => {
      if (!variant.selectedOptions) {
        if (!reportedError) {
          reportedError = true;
          reportError(
            new Error(
              "[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."
            )
          );
        }
        return false;
      }
      return variant.selectedOptions.every((option) => {
        return queryParams.get(option.name) === option.value;
      });
    }) || product.selectedVariant;
    if (selectedVariant) {
      return {
        ...product,
        isOptimistic: true,
        selectedVariant
      };
    }
  }
  return product;
}
var NonceContext = react.createContext(void 0);
var NonceProvider = NonceContext.Provider;
var useNonce = () => react.useContext(NonceContext);
function createContentSecurityPolicy(props) {
  const nonce = generateNonce();
  const header = createCSPHeader(nonce, props);
  const Provider = ({ children }) => {
    return react.createElement(NonceProvider, { value: nonce }, children);
  };
  return {
    nonce,
    header,
    NonceProvider: Provider
  };
}
function createCSPHeader(nonce, props) {
  const { shop, ...directives } = props ?? {};
  const nonceString = `'nonce-${nonce}'`;
  const styleSrc = ["'self'", "'unsafe-inline'", "https://cdn.shopify.com"];
  const connectSrc = ["'self'", "https://monorail-edge.shopifysvc.com"];
  if (shop && shop.checkoutDomain) {
    connectSrc.push(`https://${shop.checkoutDomain}`);
  }
  if (shop && shop.storeDomain) {
    connectSrc.push(`https://${shop.storeDomain}`);
  }
  const defaultSrc = [
    "'self'",
    nonceString,
    "https://cdn.shopify.com",
    // Used for the Customer Account API
    "https://shopify.com"
  ];
  const defaultDirectives = {
    baseUri: ["'self'"],
    defaultSrc,
    frameAncestors: ["'none'"],
    styleSrc,
    connectSrc
  };
  {
    defaultDirectives.styleSrc = [...styleSrc, "http://localhost:*"];
    defaultDirectives.defaultSrc = [...defaultSrc, "http://localhost:*"];
    defaultDirectives.connectSrc = [
      ...connectSrc,
      "http://localhost:*",
      // For HMR:
      "ws://localhost:*",
      "ws://127.0.0.1:*",
      "ws://*.tryhydrogen.dev:*"
    ];
  }
  const combinedDirectives = Object.assign({}, defaultDirectives, directives);
  for (const key in defaultDirectives) {
    const directive = directives[key];
    if (key && directive) {
      combinedDirectives[key] = addCspDirective(
        directive,
        defaultDirectives[key]
      );
    }
  }
  if (combinedDirectives.scriptSrc instanceof Array && !combinedDirectives.scriptSrc.includes(nonceString)) {
    combinedDirectives.scriptSrc.push(nonceString);
  } else if (combinedDirectives.defaultSrc instanceof Array && !combinedDirectives.defaultSrc.includes(nonceString)) {
    combinedDirectives.defaultSrc.push(nonceString);
  }
  return cspBuilder__default.default({
    directives: combinedDirectives
  });
}
function addCspDirective(currentValue, value) {
  const normalizedValue = typeof value === "string" ? [value] : value;
  const normalizedCurrentValue = Array.isArray(currentValue) ? currentValue : [String(currentValue)];
  const newValue = Array.isArray(normalizedValue) ? (
    // If the default directive is `none`, don't
    // merge the override with the default value.
    normalizedValue.every((a) => a === `'none'`) ? normalizedCurrentValue : [...normalizedCurrentValue, ...normalizedValue]
  ) : normalizedValue;
  return newValue;
}
var Script = react.forwardRef(
  (props, ref) => {
    const nonce = useNonce();
    return /* @__PURE__ */ jsxRuntime.jsx("script", { suppressHydrationWarning: true, ...props, nonce, ref });
  }
);
function useOptimisticData(identifier) {
  const fetchers = react$1.useFetchers();
  const data = {};
  for (const { formData } of fetchers) {
    if (formData?.get("optimistic-identifier") === identifier) {
      try {
        if (formData.has("optimistic-data")) {
          const dataInForm = JSON.parse(
            String(formData.get("optimistic-data"))
          );
          Object.assign(data, dataInForm);
        }
      } catch {
      }
    }
  }
  return data;
}
function OptimisticInput({ id, data }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("input", { type: "hidden", name: "optimistic-identifier", value: id }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        type: "hidden",
        name: "optimistic-data",
        value: JSON.stringify(data)
      }
    )
  ] });
}
function ShopPayButton(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(hydrogenReact.ShopPayButton, { channel: "hydrogen", ...props });
}
function AnalyticsView(props) {
  const { type, data = {}, customData } = props;
  const location = react$1.useLocation();
  const {
    publish: publish2,
    cart,
    prevCart,
    shop,
    customData: analyticProviderCustomData
  } = useAnalytics();
  const url = location.pathname + location.search;
  let viewPayload2 = {
    ...data,
    customData: {
      ...analyticProviderCustomData,
      ...customData
    },
    cart,
    prevCart,
    shop
  };
  react.useEffect(() => {
    if (!shop?.shopId) return;
    viewPayload2 = {
      ...viewPayload2,
      url: window.location.href
    };
    publish2(type, viewPayload2);
  }, [publish2, url, shop?.shopId]);
  return null;
}
function AnalyticsPageView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props, type: "page_viewed" });
}
function AnalyticsProductView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props, type: "product_viewed" });
}
function AnalyticsCollectionView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props, type: "collection_viewed" });
}
function AnalyticsCartView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props, type: "cart_viewed" });
}
function AnalyticsSearchView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props, type: "search_viewed" });
}
function AnalyticsCustomView(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AnalyticsView, { ...props });
}

// src/analytics-manager/events.ts
var AnalyticsEvent = {
  // Views
  PAGE_VIEWED: "page_viewed",
  PRODUCT_VIEWED: "product_viewed",
  COLLECTION_VIEWED: "collection_viewed",
  CART_VIEWED: "cart_viewed",
  SEARCH_VIEWED: "search_viewed",
  // Cart
  CART_UPDATED: "cart_updated",
  PRODUCT_ADD_TO_CART: "product_added_to_cart",
  PRODUCT_REMOVED_FROM_CART: "product_removed_from_cart",
  // Custom
  CUSTOM_EVENT: `custom_`
};
var CONSENT_API = "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js";
var CONSENT_API_WITH_BANNER = "https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";
function logMissingConfig(fieldName) {
  console.error(
    `[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${fieldName} configuration.`
  );
}
function useCustomerPrivacy(props) {
  const {
    withPrivacyBanner = true,
    onVisitorConsentCollected,
    onReady,
    ...consentConfig
  } = props;
  const loadedEvent = react.useRef(false);
  const scriptStatus = hydrogenReact.useLoadScript(
    withPrivacyBanner ? CONSENT_API_WITH_BANNER : CONSENT_API,
    {
      attributes: {
        id: "customer-privacy-api"
      }
    }
  );
  react.useEffect(() => {
    const consentCollectedHandler = (event) => {
      if (onVisitorConsentCollected) {
        onVisitorConsentCollected(event.detail);
      }
    };
    document.addEventListener(
      "visitorConsentCollected",
      consentCollectedHandler
    );
    return () => {
      document.removeEventListener(
        "visitorConsentCollected",
        consentCollectedHandler
      );
    };
  }, [onVisitorConsentCollected]);
  react.useEffect(() => {
    if (scriptStatus !== "done" || loadedEvent.current) return;
    loadedEvent.current = true;
    const { checkoutDomain, storefrontAccessToken } = consentConfig;
    if (!checkoutDomain) logMissingConfig("checkoutDomain");
    if (!storefrontAccessToken) logMissingConfig("storefrontAccessToken");
    if (storefrontAccessToken.startsWith("shpat_") || storefrontAccessToken.length !== 32) {
      console.error(
        `[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token`
      );
    }
    const config = {
      checkoutRootDomain: checkoutDomain,
      storefrontAccessToken
    };
    if (checkoutDomain) {
      let storefrontRootDomain = window.document.location.host;
      const checkoutDomainParts = checkoutDomain.split(".").reverse();
      const currentDomainParts = storefrontRootDomain.split(".").reverse();
      const sameDomainParts = [];
      checkoutDomainParts.forEach((part, index) => {
        if (part === currentDomainParts[index]) {
          sameDomainParts.push(part);
        }
      });
      storefrontRootDomain = sameDomainParts.reverse().join(".");
      if (storefrontRootDomain) {
        config.storefrontRootDomain = storefrontRootDomain;
      }
    }
    if (withPrivacyBanner && window?.privacyBanner) {
      window.privacyBanner?.loadBanner(config);
    }
    if (!window.Shopify?.customerPrivacy) return;
    const originalSetTrackingConsent = window.Shopify.customerPrivacy.setTrackingConsent;
    function overrideSetTrackingConsent(consent, callback) {
      originalSetTrackingConsent(
        {
          ...consent,
          headlessStorefront: true,
          ...config
        },
        callback
      );
    }
    window.Shopify.customerPrivacy.setTrackingConsent = overrideSetTrackingConsent;
    onReady && onReady();
  }, [scriptStatus, withPrivacyBanner, consentConfig]);
  return;
}
function getCustomerPrivacy() {
  try {
    return window.Shopify && window.Shopify.customerPrivacy ? window.Shopify?.customerPrivacy : null;
  } catch (e) {
    return null;
  }
}
function getCustomerPrivacyRequired() {
  const customerPrivacy = getCustomerPrivacy();
  if (!customerPrivacy) {
    throw new Error(
      "Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>."
    );
  }
  return customerPrivacy;
}
function ShopifyAnalytics({
  consent,
  onReady,
  domain
}) {
  const { subscribe: subscribe2, register: register2, canTrack } = useAnalytics();
  const [shopifyReady, setShopifyReady] = react.useState(false);
  const [privacyReady, setPrivacyReady] = react.useState(false);
  const { ready: shopifyAnalyticsReady } = register2("Internal_Shopify_Analytics");
  const { ready: customerPrivacyReady } = register2(
    "Internal_Shopify_CustomerPrivacy"
  );
  const analyticsReady = () => {
    shopifyReady && privacyReady && onReady();
  };
  const setCustomerPrivacyReady = () => {
    setPrivacyReady(true);
    customerPrivacyReady();
    analyticsReady();
  };
  const { checkoutDomain, storefrontAccessToken, withPrivacyBanner } = consent;
  useCustomerPrivacy({
    checkoutDomain: !checkoutDomain ? "mock.shop" : checkoutDomain,
    storefrontAccessToken: !storefrontAccessToken ? "abcdefghijklmnopqrstuvwxyz123456" : storefrontAccessToken,
    withPrivacyBanner,
    onVisitorConsentCollected: setCustomerPrivacyReady,
    onReady: () => {
      setTimeout(setCustomerPrivacyReady, 3e3);
    }
  });
  hydrogenReact.useShopifyCookies({
    hasUserConsent: shopifyReady && privacyReady ? canTrack() : true,
    domain,
    checkoutDomain
  });
  react.useEffect(() => {
    subscribe2(AnalyticsEvent.PAGE_VIEWED, pageViewHandler);
    subscribe2(AnalyticsEvent.PRODUCT_VIEWED, productViewHandler);
    subscribe2(AnalyticsEvent.COLLECTION_VIEWED, collectionViewHandler);
    subscribe2(AnalyticsEvent.SEARCH_VIEWED, searchViewHandler);
    subscribe2(AnalyticsEvent.PRODUCT_ADD_TO_CART, productAddedToCartHandler);
    shopifyAnalyticsReady();
    setShopifyReady(true);
    analyticsReady();
  }, [subscribe2, shopifyAnalyticsReady]);
  return null;
}
function logMissingConfig2(fieldName) {
  console.error(
    `[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${fieldName} configuration.`
  );
}
function prepareBasePageViewPayload(payload) {
  const customerPrivacy = getCustomerPrivacyRequired();
  const hasUserConsent = customerPrivacy.analyticsProcessingAllowed();
  if (!payload?.shop?.shopId) {
    logMissingConfig2("shopId");
    return;
  }
  if (!payload?.shop?.acceptedLanguage) {
    logMissingConfig2("acceptedLanguage");
    return;
  }
  if (!payload?.shop?.currency) {
    logMissingConfig2("currency");
    return;
  }
  if (!payload?.shop?.hydrogenSubchannelId) {
    logMissingConfig2("hydrogenSubchannelId");
    return;
  }
  const eventPayload = {
    shopifySalesChannel: "hydrogen",
    ...payload.shop,
    hasUserConsent,
    ...hydrogenReact.getClientBrowserParameters(),
    ccpaEnforced: !customerPrivacy.saleOfDataAllowed(),
    gdprEnforced: !(customerPrivacy.marketingAllowed() && customerPrivacy.analyticsProcessingAllowed())
  };
  return eventPayload;
}
function prepareBaseCartPayload(payload, cart) {
  if (cart === null) return;
  const pageViewPayload = prepareBasePageViewPayload(payload);
  if (!pageViewPayload) return;
  const eventPayload = {
    ...pageViewPayload,
    cartId: cart.id
  };
  return eventPayload;
}
var viewPayload = {};
function pageViewHandler(payload) {
  const eventPayload = prepareBasePageViewPayload(payload);
  if (!eventPayload) return;
  hydrogenReact.sendShopifyAnalytics({
    eventName: hydrogenReact.AnalyticsEventName.PAGE_VIEW_2,
    payload: {
      ...eventPayload,
      ...viewPayload
    }
  });
  viewPayload = {};
}
function productViewHandler(payload) {
  let eventPayload = prepareBasePageViewPayload(payload);
  if (eventPayload && validateProducts({
    type: "product",
    products: payload.products
  })) {
    const formattedProducts = formatProduct(payload.products);
    viewPayload = {
      pageType: hydrogenReact.AnalyticsPageType.product,
      resourceId: formattedProducts[0].productGid
    };
    eventPayload = {
      ...eventPayload,
      ...viewPayload,
      products: formatProduct(payload.products)
    };
    hydrogenReact.sendShopifyAnalytics({
      eventName: hydrogenReact.AnalyticsEventName.PRODUCT_VIEW,
      payload: eventPayload
    });
  }
}
function collectionViewHandler(payload) {
  let eventPayload = prepareBasePageViewPayload(payload);
  if (!eventPayload) return;
  viewPayload = {
    pageType: hydrogenReact.AnalyticsPageType.collection,
    resourceId: payload.collection.id
  };
  eventPayload = {
    ...eventPayload,
    ...viewPayload,
    collectionHandle: payload.collection.handle
  };
  hydrogenReact.sendShopifyAnalytics({
    eventName: hydrogenReact.AnalyticsEventName.COLLECTION_VIEW,
    payload: eventPayload
  });
}
function searchViewHandler(payload) {
  let eventPayload = prepareBasePageViewPayload(payload);
  if (!eventPayload) return;
  viewPayload = {
    pageType: hydrogenReact.AnalyticsPageType.search
  };
  eventPayload = {
    ...eventPayload,
    ...viewPayload,
    searchString: payload.searchTerm
  };
  hydrogenReact.sendShopifyAnalytics({
    eventName: hydrogenReact.AnalyticsEventName.SEARCH_VIEW,
    payload: eventPayload
  });
}
function productAddedToCartHandler(payload) {
  const { cart, currentLine } = payload;
  const eventPayload = prepareBaseCartPayload(payload, cart);
  if (!eventPayload || !currentLine?.id) return;
  sendCartAnalytics({
    matchedLine: currentLine,
    eventPayload
  });
}
function sendCartAnalytics({
  matchedLine,
  eventPayload
}) {
  const product = {
    id: matchedLine.merchandise.product.id,
    variantId: matchedLine.id,
    title: matchedLine.merchandise.product.title,
    variantTitle: matchedLine.merchandise.title,
    vendor: matchedLine.merchandise.product.vendor,
    price: matchedLine.merchandise.price.amount,
    quantity: matchedLine.quantity,
    productType: matchedLine.merchandise.product.productType,
    sku: matchedLine.merchandise.sku
  };
  if (validateProducts({
    type: "cart",
    products: [product]
  })) {
    hydrogenReact.sendShopifyAnalytics({
      eventName: hydrogenReact.AnalyticsEventName.ADD_TO_CART,
      payload: {
        ...eventPayload,
        products: formatProduct([product])
      }
    });
  }
}
function missingErrorMessage(type, fieldName, isVariantField, viewKeyName) {
  if (type === "cart") {
    const name = `${isVariantField ? "merchandise" : "merchandise.product"}.${fieldName}`;
    console.error(
      `[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${name}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${name}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`
    );
  } else {
    const name = `${viewKeyName || fieldName}`;
    console.error(
      `[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${name}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${name}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`
    );
  }
}
function validateProducts({
  type,
  products
}) {
  if (!products || products.length === 0) {
    missingErrorMessage(type, "", false, "data.products");
    return false;
  }
  products.forEach((product) => {
    if (!product.id) {
      missingErrorMessage(type, "id", false);
      return false;
    }
    if (!product.title) {
      missingErrorMessage(type, "title", false);
      return false;
    }
    if (!product.price) {
      missingErrorMessage(type, "price.amount", true, "price");
      return false;
    }
    if (!product.vendor) {
      missingErrorMessage(type, "vendor", false);
      return false;
    }
    if (!product.variantId) {
      missingErrorMessage(type, "id", true, "variantId");
      return false;
    }
    if (!product.variantTitle) {
      missingErrorMessage(type, "title", true, "variantTitle");
      return false;
    }
  });
  return true;
}
function formatProduct(products) {
  return products.map((product) => {
    const formattedProduct = {
      productGid: product.id,
      variantGid: product.variantId,
      name: product.title,
      variantName: product.variantTitle,
      brand: product.vendor,
      price: product.price,
      quantity: product.quantity || 1,
      category: product.productType
    };
    if (product.sku) formattedProduct.sku = product.sku;
    if (product.productType) formattedProduct.category = product.productType;
    return formattedProduct;
  });
}
function logMissingField(fieldName) {
  console.error(
    `[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${fieldName}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${fieldName}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`
  );
}
function CartAnalytics({
  cart: currentCart,
  setCarts
}) {
  const { publish: publish2, shop, customData, canTrack, cart, prevCart } = useAnalytics();
  const lastEventId = react.useRef(null);
  react.useEffect(() => {
    if (!currentCart) return;
    Promise.resolve(currentCart).then((updatedCart) => {
      if (updatedCart && updatedCart.lines) {
        if (!updatedCart.id) {
          logMissingField("id");
          return;
        }
        if (!updatedCart.updatedAt) {
          logMissingField("updatedAt");
          return;
        }
      }
      setCarts(({ cart: cart2, prevCart: prevCart2 }) => {
        if (updatedCart?.updatedAt !== cart2?.updatedAt)
          return { cart: updatedCart, prevCart: cart2 };
        return { cart: cart2, prevCart: prevCart2 };
      });
    });
    return () => {
    };
  }, [setCarts, currentCart]);
  react.useEffect(() => {
    if (!cart || !cart?.updatedAt) return;
    if (cart?.updatedAt === prevCart?.updatedAt) return;
    let cartLastUpdatedAt;
    try {
      cartLastUpdatedAt = JSON.parse(
        localStorage.getItem("cartLastUpdatedAt") || ""
      );
    } catch (e) {
      cartLastUpdatedAt = null;
    }
    if (cart.id === cartLastUpdatedAt?.id && cart.updatedAt === cartLastUpdatedAt?.updatedAt)
      return;
    const payload = {
      eventTimestamp: Date.now(),
      cart,
      prevCart,
      shop,
      customData
    };
    if (cart.updatedAt === lastEventId.current) return;
    lastEventId.current = cart.updatedAt;
    publish2("cart_updated", payload);
    localStorage.setItem(
      "cartLastUpdatedAt",
      JSON.stringify({
        id: cart.id,
        updatedAt: cart.updatedAt
      })
    );
    const previousCartLines = prevCart?.lines ? hydrogenReact.flattenConnection(prevCart?.lines) : [];
    const currentCartLines = cart.lines ? hydrogenReact.flattenConnection(cart.lines) : [];
    previousCartLines?.forEach((prevLine) => {
      const matchedLineId = currentCartLines.filter(
        (line) => prevLine.id === line.id
      );
      if (matchedLineId?.length === 1) {
        const matchedLine = matchedLineId[0];
        if (prevLine.quantity < matchedLine.quantity) {
          publish2("product_added_to_cart", {
            ...payload,
            prevLine,
            currentLine: matchedLine
          });
        } else if (prevLine.quantity > matchedLine.quantity) {
          publish2("product_removed_from_cart", {
            ...payload,
            prevLine,
            currentLine: matchedLine
          });
        }
      } else {
        publish2("product_removed_from_cart", {
          ...payload,
          prevLine
        });
      }
    });
    currentCartLines?.forEach((line) => {
      const matchedLineId = previousCartLines.filter(
        (previousLine) => line.id === previousLine.id
      );
      if (!matchedLineId || matchedLineId.length === 0) {
        publish2("product_added_to_cart", {
          ...payload,
          currentLine: line
        });
      }
    });
  }, [cart, prevCart, publish2, shop, customData, canTrack]);
  return null;
}
var defaultAnalyticsContext = {
  canTrack: () => false,
  cart: null,
  customData: {},
  prevCart: null,
  publish: () => {
  },
  shop: null,
  subscribe: () => {
  },
  register: () => ({ ready: () => {
  } })
};
var AnalyticsContext = react.createContext(
  defaultAnalyticsContext
);
var subscribers = /* @__PURE__ */ new Map();
var registers = {};
function areRegistersReady() {
  return Object.values(registers).every(Boolean);
}
function subscribe(event, callback) {
  if (!subscribers.has(event)) {
    subscribers.set(event, /* @__PURE__ */ new Map());
  }
  subscribers.get(event)?.set(callback.toString(), callback);
}
var waitForReadyQueue = /* @__PURE__ */ new Map();
function publish(event, payload) {
  if (!areRegistersReady()) {
    waitForReadyQueue.set(event, payload);
    return;
  }
  publishEvent(event, payload);
}
function publishEvent(event, payload) {
  (subscribers.get(event) ?? /* @__PURE__ */ new Map()).forEach((callback, subscriber) => {
    try {
      callback(payload);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        console.error(
          "Analytics publish error",
          error.message,
          subscriber,
          error.stack
        );
      } else {
        console.error("Analytics publish error", error, subscriber);
      }
    }
  });
}
function register(key) {
  if (!registers.hasOwnProperty(key)) {
    registers[key] = false;
  }
  return {
    ready: () => {
      registers[key] = true;
      if (areRegistersReady() && waitForReadyQueue.size > 0) {
        waitForReadyQueue.forEach((queuePayload, queueEvent) => {
          publishEvent(queueEvent, queuePayload);
        });
        waitForReadyQueue.clear();
      }
    }
  };
}
function shopifyCanTrack() {
  try {
    return window.Shopify.customerPrivacy.analyticsProcessingAllowed();
  } catch (e) {
  }
  return false;
}
function messageOnError(field, envVar) {
  return `[h2:error:Analytics.Provider] - ${field} is required. Make sure ${envVar} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`;
}
function AnalyticsProvider({
  canTrack: customCanTrack,
  cart: currentCart,
  children,
  consent,
  customData = {},
  shop: shopProp = null,
  disableThrowOnError = false,
  cookieDomain
}) {
  const listenerSet = react.useRef(false);
  const { shop } = useShopAnalytics(shopProp);
  const [consentLoaded, setConsentLoaded] = react.useState(
    customCanTrack ? true : false
  );
  const [carts, setCarts] = react.useState({ cart: null, prevCart: null });
  const [canTrack, setCanTrack] = react.useState(
    customCanTrack ? () => customCanTrack : () => shopifyCanTrack
  );
  if (!!shop) {
    if (/\/68817551382$/.test(shop.shopId)) {
      warnOnce(
        "[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly."
      );
    } else {
      if (!consent.checkoutDomain) {
        const errorMsg = messageOnError(
          "consent.checkoutDomain",
          "PUBLIC_CHECKOUT_DOMAIN"
        );
        errorOnce(errorMsg);
      }
      if (!consent.storefrontAccessToken) {
        const errorMsg = messageOnError(
          "consent.storefrontAccessToken",
          "PUBLIC_STOREFRONT_API_TOKEN"
        );
        errorOnce(errorMsg);
      }
    }
  }
  const value = react.useMemo(() => {
    return {
      canTrack,
      ...carts,
      customData,
      publish: canTrack() ? publish : () => {
      },
      shop,
      subscribe,
      register
    };
  }, [
    consentLoaded,
    canTrack(),
    canTrack,
    JSON.stringify(canTrack),
    carts,
    carts.cart?.updatedAt,
    carts.prevCart,
    publish,
    subscribe,
    customData,
    shop,
    register,
    JSON.stringify(registers)
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(AnalyticsContext.Provider, { value, children: [
    children,
    !!shop && /* @__PURE__ */ jsxRuntime.jsx(AnalyticsPageView, {}),
    !!shop && !!currentCart && /* @__PURE__ */ jsxRuntime.jsx(CartAnalytics, { cart: currentCart, setCarts }),
    !!shop && consent.checkoutDomain && /* @__PURE__ */ jsxRuntime.jsx(
      ShopifyAnalytics,
      {
        consent,
        onReady: () => {
          listenerSet.current = true;
          setConsentLoaded(true);
          setCanTrack(() => shopifyCanTrack);
        },
        domain: cookieDomain
      }
    )
  ] });
}
function useAnalytics() {
  const analyticsContext = react.useContext(AnalyticsContext);
  if (!analyticsContext) {
    throw new Error(
      `[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>`
    );
  }
  return analyticsContext;
}
function useShopAnalytics(shopProp) {
  const [shop, setShop] = react.useState(null);
  react.useEffect(() => {
    Promise.resolve(shopProp).then(setShop);
    return () => {
    };
  }, [setShop, shopProp]);
  return { shop };
}
async function getShopAnalytics({
  storefront,
  publicStorefrontId = "0"
}) {
  return storefront.query(SHOP_QUERY, {
    cache: storefront.CacheLong()
  }).then(({ shop, localization }) => {
    return {
      shopId: shop.id,
      acceptedLanguage: localization.language.isoCode,
      currency: localization.country.currency.isoCode,
      hydrogenSubchannelId: publicStorefrontId
    };
  });
}
var SHOP_QUERY = `#graphql
  query ShopData(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      id
    }
    localization {
      country {
        currency {
          isoCode
        }
      }
      language {
        isoCode
      }
    }
  }
`;
var Analytics = {
  CartView: AnalyticsCartView,
  CollectionView: AnalyticsCollectionView,
  CustomView: AnalyticsCustomView,
  ProductView: AnalyticsProductView,
  Provider: AnalyticsProvider,
  SearchView: AnalyticsSearchView
};
var RichText = function(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    hydrogenReact.RichText,
    {
      ...props,
      components: {
        link: ({ node }) => /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Link,
          {
            to: node.url,
            title: node.title,
            target: node.target,
            prefetch: "intent",
            children: node.children
          }
        ),
        ...props.components
      }
    }
  );
};

// src/tracing.ts
function createSpanCollector(traceId = generateRandomHex(16)) {
  let spans = [];
  traceId = ensureExpectedRequestId(traceId);
  function emitSpanEvent2(debugInfo, startTime, cacheStatus, root) {
    try {
      const endTime = Date.now();
      let displayName = "unknown";
      if (debugInfo?.displayName) {
        displayName = debugInfo.displayName;
      } else {
        if (debugInfo.graphql) {
          displayName = debugInfo.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/, " ") || "GraphQL";
        }
      }
      if (cacheStatus) {
        displayName = `Cache [${cacheStatus}] ${displayName}`;
      }
      const trace = {
        traceId,
        id: root ? traceId : generateRandomHex(16),
        name: displayName,
        timestamp: startTime * 1e3,
        duration: (endTime - startTime) * 1e3,
        parentId: root ? void 0 : traceId,
        tags: {
          "request.type": cacheStatus ? "cache" : "subrequest"
        }
      };
      spans.push(trace);
    } catch (error) {
      console.error(error);
    }
  }
  async function flushSpanEvents2() {
    if (spans.length > 0) {
      const spansToFlush = spans;
      spans = [];
      await fetch("https://outbound-proxy.oxygen.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(spansToFlush)
      });
    }
  }
  return [emitSpanEvent2, flushSpanEvents2];
}
function emitSpanEvent(debugInfo, startTime, cacheStatus, root) {
  globalThis.__SPANS = globalThis.__SPANS || [];
  try {
    const traceId = ensureExpectedRequestId(debugInfo?.requestId || generateRandomHex(16));
    const endTime = Date.now();
    let displayName = "unknown";
    if (debugInfo?.displayName) {
      displayName = debugInfo.displayName;
    } else {
      if (debugInfo.graphql) {
        displayName = debugInfo.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/, " ") || "GraphQL";
      }
    }
    if (cacheStatus) {
      displayName = `Cache [${cacheStatus}] ${displayName}`;
    }
    const trace = {
      traceId,
      id: root ? traceId : generateRandomHex(16),
      name: displayName,
      timestamp: startTime * 1e3,
      duration: (endTime - startTime) * 1e3,
      parentId: root ? void 0 : traceId,
      tags: {
        "request.type": cacheStatus ? "cache" : "subrequest"
      }
    };
    globalThis.__SPANS.push(trace);
  } catch (error) {
    console.error(error);
  }
}
async function flushSpanEvents() {
  if (globalThis.__SPANS) {
    const spans = globalThis.__SPANS;
    globalThis.__SPANS = [];
    await fetch("https://outbound-proxy.oxygen.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(spans)
    });
  }
}
function ensureExpectedRequestId(id) {
  const idArray = id.split(".");
  if (idArray.length === 2) {
    return idArray[1];
  } else {
    return id;
  }
}
function generateRandomHex(len) {
  let result = "";
  while (result.length < len) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result.substring(0, len);
}
//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
//! @see https://shopify.dev/docs/api/storefront/latest/queries/cart
//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesAdd
//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesUpdate
//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartLinesRemove
//! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartDiscountCodesUpdate
//! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartBuyerIdentityUpdate
//! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartNoteUpdate
//! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartSelectedDeliveryOptionsUpdate
//! @see https://shopify.dev/docs/api/storefront/latest/mutations/cartMetafieldsSet
//! @see https://shopify.dev/docs/api/storefront/2024-04/mutations/cartMetafieldDelete

Object.defineProperty(exports, "AnalyticsEventName", {
  enumerable: true,
  get: function () { return hydrogenReact.AnalyticsEventName; }
});
Object.defineProperty(exports, "AnalyticsPageType", {
  enumerable: true,
  get: function () { return hydrogenReact.AnalyticsPageType; }
});
Object.defineProperty(exports, "ExternalVideo", {
  enumerable: true,
  get: function () { return hydrogenReact.ExternalVideo; }
});
Object.defineProperty(exports, "IMAGE_FRAGMENT", {
  enumerable: true,
  get: function () { return hydrogenReact.IMAGE_FRAGMENT; }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () { return hydrogenReact.Image; }
});
Object.defineProperty(exports, "MediaFile", {
  enumerable: true,
  get: function () { return hydrogenReact.MediaFile; }
});
Object.defineProperty(exports, "ModelViewer", {
  enumerable: true,
  get: function () { return hydrogenReact.ModelViewer; }
});
Object.defineProperty(exports, "Money", {
  enumerable: true,
  get: function () { return hydrogenReact.Money; }
});
Object.defineProperty(exports, "ShopifySalesChannel", {
  enumerable: true,
  get: function () { return hydrogenReact.ShopifySalesChannel; }
});
Object.defineProperty(exports, "Video", {
  enumerable: true,
  get: function () { return hydrogenReact.Video; }
});
Object.defineProperty(exports, "customerAccountApiCustomScalars", {
  enumerable: true,
  get: function () { return hydrogenReact.customerAccountApiCustomScalars; }
});
Object.defineProperty(exports, "flattenConnection", {
  enumerable: true,
  get: function () { return hydrogenReact.flattenConnection; }
});
Object.defineProperty(exports, "getClientBrowserParameters", {
  enumerable: true,
  get: function () { return hydrogenReact.getClientBrowserParameters; }
});
Object.defineProperty(exports, "getShopifyCookies", {
  enumerable: true,
  get: function () { return hydrogenReact.getShopifyCookies; }
});
Object.defineProperty(exports, "parseGid", {
  enumerable: true,
  get: function () { return hydrogenReact.parseGid; }
});
Object.defineProperty(exports, "parseMetafield", {
  enumerable: true,
  get: function () { return hydrogenReact.parseMetafield; }
});
Object.defineProperty(exports, "sendShopifyAnalytics", {
  enumerable: true,
  get: function () { return hydrogenReact.sendShopifyAnalytics; }
});
Object.defineProperty(exports, "storefrontApiCustomScalars", {
  enumerable: true,
  get: function () { return hydrogenReact.storefrontApiCustomScalars; }
});
Object.defineProperty(exports, "useLoadScript", {
  enumerable: true,
  get: function () { return hydrogenReact.useLoadScript; }
});
Object.defineProperty(exports, "useMoney", {
  enumerable: true,
  get: function () { return hydrogenReact.useMoney; }
});
Object.defineProperty(exports, "useShopifyCookies", {
  enumerable: true,
  get: function () { return hydrogenReact.useShopifyCookies; }
});
exports.Analytics = Analytics;
exports.AnalyticsEvent = AnalyticsEvent;
exports.CacheCustom = CacheCustom;
exports.CacheLong = CacheLong;
exports.CacheNone = CacheNone;
exports.CacheShort = CacheShort;
exports.CartForm = CartForm;
exports.InMemoryCache = InMemoryCache;
exports.OptimisticInput = OptimisticInput;
exports.Pagination = Pagination;
exports.RichText = RichText;
exports.Script = Script;
exports.Seo = Seo;
exports.ShopPayButton = ShopPayButton;
exports.VariantSelector = VariantSelector;
exports.cartAttributesUpdateDefault = cartAttributesUpdateDefault;
exports.cartBuyerIdentityUpdateDefault = cartBuyerIdentityUpdateDefault;
exports.cartCreateDefault = cartCreateDefault;
exports.cartDiscountCodesUpdateDefault = cartDiscountCodesUpdateDefault;
exports.cartGetDefault = cartGetDefault;
exports.cartGetIdDefault = cartGetIdDefault;
exports.cartLinesAddDefault = cartLinesAddDefault;
exports.cartLinesRemoveDefault = cartLinesRemoveDefault;
exports.cartLinesUpdateDefault = cartLinesUpdateDefault;
exports.cartMetafieldDeleteDefault = cartMetafieldDeleteDefault;
exports.cartMetafieldsSetDefault = cartMetafieldsSetDefault;
exports.cartNoteUpdateDefault = cartNoteUpdateDefault;
exports.cartSelectedDeliveryOptionsUpdateDefault = cartSelectedDeliveryOptionsUpdateDefault;
exports.cartSetIdDefault = cartSetIdDefault;
exports.changelogHandler = changelogHandler;
exports.createCartHandler = createCartHandler;
exports.createContentSecurityPolicy = createContentSecurityPolicy;
exports.createCustomerAccountClient = createCustomerAccountClient;
exports.createSpanCollector = createSpanCollector;
exports.createStorefrontClient = createStorefrontClient;
exports.createWithCache = createWithCache;
exports.emitSpanEvent = emitSpanEvent;
exports.flushSpanEvents = flushSpanEvents;
exports.formatAPIResult = formatAPIResult;
exports.generateCacheControlHeader = generateCacheControlHeader;
exports.getCustomerPrivacy = getCustomerPrivacy;
exports.getPaginationVariables = getPaginationVariables;
exports.getSelectedProductOptions = getSelectedProductOptions;
exports.getSeoMeta = getSeoMeta;
exports.getShopAnalytics = getShopAnalytics;
exports.graphiqlLoader = graphiqlLoader;
exports.storefrontRedirect = storefrontRedirect;
exports.useAnalytics = useAnalytics;
exports.useCustomerPrivacy = useCustomerPrivacy;
exports.useNonce = useNonce;
exports.useOptimisticCart = useOptimisticCart;
exports.useOptimisticData = useOptimisticData;
exports.useOptimisticProduct = useOptimisticProduct;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map