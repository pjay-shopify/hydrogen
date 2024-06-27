import { createStorefrontClient, SHOPIFY_STOREFRONT_ID_HEADER, getShopifyCookies, SHOPIFY_Y, SHOPIFY_STOREFRONT_Y_HEADER, SHOPIFY_S, SHOPIFY_STOREFRONT_S_HEADER, flattenConnection, ShopPayButton, useLoadScript, RichText, useShopifyCookies, sendShopifyAnalytics, AnalyticsEventName, AnalyticsPageType, getClientBrowserParameters } from '@shopify/hydrogen-react';
export { AnalyticsEventName, AnalyticsPageType, ExternalVideo, IMAGE_FRAGMENT, Image, MediaFile, ModelViewer, Money, ShopifySalesChannel, Video, customerAccountApiCustomScalars, flattenConnection, getClientBrowserParameters, getShopifyCookies, parseGid, parseMetafield, sendShopifyAnalytics, storefrontApiCustomScalars, useLoadScript, useMoney, useShopifyCookies } from '@shopify/hydrogen-react';
import { lazy, createContext, forwardRef, useMemo, createElement, Suspense, Fragment, useRef, useEffect, useState, useContext } from 'react';
import { useMatches, useLocation, useNavigation, Link, useNavigate, useFetcher, useFetchers } from '@remix-run/react';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { parse, stringify } from 'worktop/cookie';
import xa from 'content-security-policy-builder';

var Oe="public",jr="private",je="no-store",_t={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function me(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):_t[r]&&t.push(`${_t[r]}=${e[r]}`);}),t.join(", ")}function Ke(){return {mode:je}}function ze(e){if(e?.mode&&e?.mode!==Oe&&e?.mode!==jr)throw Error("'mode' must be either 'public' or 'private'")}function z(e){return ze(e),{mode:Oe,maxAge:1,staleWhileRevalidate:9,...e}}function Je(e){return ze(e),{mode:Oe,maxAge:3600,staleWhileRevalidate:82800,...e}}function ne(e){return ze(e),{mode:Oe,maxAge:1,staleWhileRevalidate:86399,...e}}function Ye(e){return e}function J(e){return String(e).includes("__proto__")?JSON.parse(e,Kr):JSON.parse(e)}function Kr(e,t){if(e!=="__proto__")return t}function xe(e,t){return e&&t?{...e,...t}:e||ne()}function Xe(e){return me(xe(e))}async function zr(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function Jr(e,t,r,o){if(!e)return;let a=xe(o),i=Xe(xe(a,{maxAge:(a.maxAge||0)+(a.staleWhileRevalidate||0)})),n=Xe(xe(a));r.headers.set("cache-control",i),r.headers.set("real-cache-control",n),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function Yr(e,t){e&&await e.delete(t);}function Xr(e,t){let r=e.headers.get("real-cache-control"),o=0;if(r){let i=r.match(/max-age=(\d*)/);i&&i.length>1&&(o=parseFloat(i[1]));}return [(Date.now()-Number(t))/1e3,o]}function Zr(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[o,a]=Xr(t,r),i=o>a;return i}var De={get:zr,set:Jr,delete:Yr,generateDefaultCacheControlHeader:Xe,isStale:Zr};function he(e){return `https://shopify.dev/?${e}`}function eo(e){return e||ne()}async function Ut(e,t){if(!e)return;let r=he(t),o=new Request(r),a=await De.get(e,o);if(!a)return;let i=await a.text();try{return [J(i),a]}catch{return [i,a]}}async function Nt(e,t,r,o){if(!e)return;let a=he(t),i=new Request(a),n=new Response(JSON.stringify(r));await De.set(e,i,n,eo(o));}function Vt(e,t){return De.isStale(new Request(he(e)),t)}function Mt(e){let t=Array.isArray(e)?e:[e],r="";for(let o of t)o!=null&&(typeof o=="object"?r+=JSON.stringify(o):r+=o.toString());return encodeURIComponent(r)}function Y(e,t,r,o){globalThis.__SPANS=globalThis.__SPANS||[];try{let a=ro(e?.requestId||Ft(16)),i=Date.now(),n="unknown";e?.displayName?n=e.displayName:e.graphql&&(n=e.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")||"GraphQL"),r&&(n=`Cache [${r}] ${n}`);let u={traceId:a,id:o?a:Ft(16),name:n,timestamp:t*1e3,duration:(i-t)*1e3,parentId:o?void 0:a,tags:{"request.type":r?"cache":"subrequest"}};globalThis.__SPANS.push(u);}catch(a){console.error(a);}}async function to(){if(globalThis.__SPANS){let e=globalThis.__SPANS;globalThis.__SPANS=[],await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});}}function ro(e){let t=e.split(".");return t.length===2?t[1]:e}function Ft(e){let t="";for(;t.length<e;)t+=Math.floor(Math.random()*16).toString(16);return t.substring(0,e)}var Ze=new Set;async function ke(e,t,{strategy:r=z(),cacheInstance:o,shouldCacheResult:a=()=>!0,waitUntil:i,debugInfo:n}){let u=Date.now(),c=Mt([...typeof e=="string"?[e]:e]),s,l,y=m=>{l={displayName:m.displayName,url:m.response?.url,responseInit:{status:m.response?.status||0,statusText:m.response?.statusText||"",headers:Array.from(m.response?.headers.entries()||[])}};},f=()=>({...s,...n,url:l?.url||n?.url||s?.url||he(c),displayName:n?.displayName||l?.displayName||s?.displayName}),d=void 0;if(!o||!r||r.mode===je){let m=await t({addDebugData:y});return Y(f(),u),m}let p=m=>Nt(o,c,{value:m,debugInfo:void 0},r),h=await Ut(o,c);if(h&&typeof h[0]!="string"){let[{value:m,debugInfo:T},I]=h;s=T;let x=Vt(c,I)?"STALE":"HIT";if(!Ze.has(c)&&x==="STALE"){Ze.add(c);let _=Promise.resolve().then(async()=>{let K=Date.now();try{let U=await t({addDebugData:y});a(U)&&(await p(U),d?.({result:U,cacheStatus:"PUT",overrideStartTime:K}),Y(f(),K,"PUT"));}catch(U){U.message&&(U.message="SWR in sub-request failed: "+U.message),console.error(U);}finally{Ze.delete(c);}});i?.(_);}return Y(f(),u,x),m}let g=await t({addDebugData:y});if(Y(f(),u,"MISS"),a(g)){let m=Promise.resolve().then(async()=>{let T=Date.now();await p(g),Y(f(),T,"PUT");});i?.(m);}return g}function qt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function $t([e,t]){return [e,new Response(e,t)]}var Ht=(e,t)=>!e?.errors&&t.status<400;async function Qt(e,t,{cacheInstance:r,cache:o,cacheKey:a=[e,t],shouldCacheResponse:i=()=>!0,waitUntil:n,returnType:u="json",debugInfo:c}={}){return !o&&(!t.method||t.method==="GET")&&(o=z()),ke(a,async()=>{let s=await fetch(e,t),l;try{l=await s[u]();}catch{try{l=await s.text();}catch{return qt("",s)}}return qt(l,s)},{cacheInstance:r,waitUntil:n,strategy:o??null,debugInfo:c,shouldCacheResult:s=>i(...$t(s))}).then($t)}var ge="2024.4.3";var et="Custom-Storefront-Request-Group-ID",tt="X-Shopify-Storefront-Access-Token",rt="X-SDK-Variant",ot="X-SDK-Variant-Source",at="X-SDK-Version",Le="2024-04",ie=`Shopify Hydrogen ${ge}`,Gt="30243aa5-17c1-465a-8493-944bcc4e88aa",E="customerAccount",se="buyer";function Bt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var Wt=new Set,Kt=e=>{Wt.has(e)||(console.warn(e),Wt.add(e));},jt=new Set,nt=e=>{jt.has(e)||(console.error(new Error(e)),jt.add(e));};function ce(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var oo=/(^|}\s)query[\s({]/im,ao=/(^|}\s)mutation[\s({]/im;function _e(e,t){if(!oo.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function Ue(e,t){if(!ao.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var X=class extends Error{locations;path;extensions;constructor(t,r={}){let a=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(a),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function Ce({url:e,response:t,errors:r,type:o,query:a,queryVariables:i,ErrorConstructor:n=Error,client:u="storefront"}){let c=(typeof r=="string"?r:r?.map?.(l=>l.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,s=new X(c,{query:a,queryVariables:i,cause:{errors:r},clientOperation:`${u}.${o}`,requestId:t.headers.get("x-request-id")});throw new n(s.message,{cause:s.cause})}function ue(e,t={}){let r=new Error,o=(a,i="Error")=>{let n=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(u,c)=>u.replace(c,""));return `${i}: ${a}
`+n};return e.then(a=>{if(a?.errors&&Array.isArray(a.errors)){let i=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;a.errors.forEach(n=>{n&&(n.stack=o(n.message,n.name),i(n)&&console.error(n));});}return a}).catch(a=>{throw a&&(a.stack=o(a.message,a.name)),a})}var q=void 0;var po={language:"EN",country:"US"};function ci(e){let {storefrontHeaders:t,cache:r,waitUntil:o,i18n:a,storefrontId:i,logErrors:n=!0,...u}=e,{getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getStorefrontApiUrl:y,getShopifyDomain:f}=createStorefrontClient(u),p=(u.privateStorefrontToken?l:s)({contentType:"json",buyerIp:t?.buyerIp||""});if(p[et]=t?.requestGroupId||Bt(),i&&(p[SHOPIFY_STOREFRONT_ID_HEADER]=i),(p["user-agent"]=`Hydrogen ${ge}`),t&&t.cookie){let m=getShopifyCookies(t.cookie??"");m[SHOPIFY_Y]&&(p[SHOPIFY_STOREFRONT_Y_HEADER]=m[SHOPIFY_Y]),m[SHOPIFY_S]&&(p[SHOPIFY_STOREFRONT_S_HEADER]=m[SHOPIFY_S]);}let h=JSON.stringify({"content-type":p["content-type"],"user-agent":p["user-agent"],[rt]:p[rt],[ot]:p[ot],[at]:p[at],[tt]:p[tt]});async function g({query:m,mutation:T,variables:I,cache:x,headers:_=[],storefrontApiVersion:K,displayName:U,stackInfo:Ee}){let C=_ instanceof Headers?Object.fromEntries(_.entries()):Array.isArray(_)?Object.fromEntries(_):_,P=m??T,A={...I};a&&(!I?.country&&/\$country/.test(P)&&(A.country=a.country),!I?.language&&/\$language/.test(P)&&(A.language=a.language));let v=y({storefrontApiVersion:K}),V=JSON.stringify({query:P,variables:A}),M={method:"POST",headers:{...p,...C},body:V},D=[v,M.method,h,M.body],[k,L]=await Qt(v,M,{cacheInstance:T?void 0:r,cache:x||ne(),cacheKey:D,shouldCacheResponse:Ht,waitUntil:o,debugInfo:{requestId:M.headers[et],displayName:U,url:v,stackInfo:Ee,graphql:V,purpose:t?.purpose}}),w={url:v,response:L,type:T?"mutation":"query",query:P,queryVariables:A,errors:void 0};if(!L.ok){let F;try{F=J(k);}catch{F=[{message:k}];}Ce({...w,errors:F});}let{data:G,errors:ye}=k,ae=ye?.map(({message:F,...fe})=>new X(F,{...fe,clientOperation:`storefront.${w.type}`,requestId:L.headers.get("x-request-id"),queryVariables:A,query:P}));return S(G,ae)}return {storefront:{query(m,T){m=ce(m),_e(m,"storefront.query");let I=Yt?.(m);return ue(g({...T,query:m,stackInfo:q?.(I)}),{stackOffset:I,logErrors:n})},mutate(m,T){m=ce(m),Ue(m,"storefront.mutate");let I=Yt?.(m);return ue(g({...T,mutation:m,stackInfo:q?.(I)}),{stackOffset:I,logErrors:n})},cache:r,CacheNone:Ke,CacheLong:Je,CacheShort:z,CacheCustom:Ye,generateCacheControlHeader:me,getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getShopifyDomain:f,getApiUrl:y,i18n:a??po}}}var Yt=void 0;function S(e,t){return {...e,...t&&{errors:t}}}function Ne(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function Z(e){return {requestId:e?Ne(e,"request-id"):void 0,purpose:e?Ne(e,"purpose"):void 0}}function lo({cache:e,waitUntil:t,request:r}){return function(a,i,n){return ke(a,n,{strategy:i,cacheInstance:e,waitUntil:t,debugInfo:{...Z(r),stackInfo:q?.()}})}}var it=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:o,timestamp:a,...i}=r,n=new Headers(i.headers),u=n.get("cache-control")||n.get("real-cache-control")||"",c=parseInt(u.match(/max-age=(\d+)/)?.[1]||"0",10),s=parseInt(u.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),l=(Date.now()-a)/1e3;if(l>c+s){this.#e.delete(t.url);return}let f=l>c;return n.set("cache",f?"STALE":"HIT"),n.set("date",new Date(a).toUTCString()),new Response(o,{status:i.status??200,headers:n})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let o of this.#e.keys())(!t||t.url===o)&&r.push(new Request(o));return Promise.resolve(r)}};function Ve(e){if(!e)return;let{pathname:t,search:r}=new URL(e),o=t+r,a=new URLSearchParams(r),i=a.get("return_to")||a.get("redirect");if(i){if(Zt(e,i))return i;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}`);}}function Zt(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function st({requestUrl:e,defaultUrl:t,redirectUrl:r}){let o=e,a=Xt(e,t),i=r?Xt(e,r):a;return Zt(e,i.toString())?i.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}. Default url ${a} is used instead.`),a.toString())}function Xt(e,t){return yo(t)?new URL(t):new URL(t,new URL(e).origin)}function yo(e){try{return new URL(e),!0}catch{return !1}}async function fo(e){let{storefront:t,request:r,noAdminRedirect:o,matchQueryParams:a,response:i=new Response("Not Found",{status:404})}=e,n=new URL(r.url),{pathname:u,searchParams:c}=n,s=c.has("_data");c.delete("redirect"),c.delete("return_to"),c.delete("_data");let l=(a?n.toString().replace(n.origin,""):u).toLowerCase();if(n.pathname==="/admin"&&!o)return ut(`${t.getShopifyDomain()}/admin`,s,c,a);try{let{urlRedirects:y}=await t.query(mo,{variables:{query:"path:"+l.replace(/\/+$/,"")}}),f=y?.edges?.[0]?.node?.target;if(f)return ut(f,s,c,a);let d=Ve(r.url);if(d)return ut(d,s,c,a)}catch(y){console.error(`Failed to fetch redirects from Storefront API for route ${l}`,y);}return i}var ct="https://example.com";function ut(e,t,r,o){let a=new URL(e,ct);if(!o)for(let[i,n]of r)a.searchParams.append(i,n);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":a.toString().replace(ct,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:a.toString().replace(ct,"")}})}var mo=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var ho=async function({request:t,context:r}){let o=r.storefront,a=r.customerAccount,i=new URL(t.url);if(!o)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let n={};if(o){let s="X-Shopify-Storefront-Access-Token";n.storefront={name:"Storefront API",authHeader:s,accessToken:o.getPublicTokenHeaders()[s],apiUrl:o.getApiUrl(),icon:"SF"};}if(a){let s=await(await fetch(i.origin+"/graphiql/customer-account.schema.json")).json(),l=await a.getAccessToken();s&&(n["customer-account"]={name:"Customer Account API",value:s,authHeader:"Authorization",accessToken:l,apiUrl:a.getApiUrl(),icon:"CA"});}let u="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",c=String.raw;return new Response(c`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>GraphiQL</title>
          <link rel="icon" type="image/x-icon" href="${u}" />
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

            const schemas = ${JSON.stringify(n)};
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
    `,{status:200,headers:{"content-type":"text/html"}})};var go={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},Co=/[&><\u2028\u2029]/g;function er(e){return e.replace(Co,t=>go[t])}var B="Error in SEO input: ",$={title:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(B.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(B.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(B.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(B.concat("`handle` should start with `@`"));return e}}};function tr(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let o=H($.title,e.title),a=dt(e?.titleTemplate,o);if(!a)break;t.push(O("title",{title:a}),O("meta",{property:"og:title",content:a}),O("meta",{name:"twitter:title",content:a}));break}case"description":{let o=H($.description,e.description);if(!o)break;t.push(O("meta",{name:"description",content:o}),O("meta",{property:"og:description",content:o}),O("meta",{name:"twitter:description",content:o}));break}case"url":{let o=H($.url,e.url);if(!o)break;let i=o.split("?")[0].replace(/\/$/,"");t.push(O("link",{rel:"canonical",href:i}),O("meta",{property:"og:url",content:i}));break}case"handle":{let o=H($.handle,e.handle);if(!o)break;t.push(O("meta",{name:"twitter:site",content:o}),O("meta",{name:"twitter:creator",content:o}));break}case"media":{let o,a=W(e.media);for(let i of a)if(typeof i=="string"&&t.push(O("meta",{name:"og:image",content:i})),i&&typeof i=="object"){let n=i.type||"image",u=i?{url:i?.url,secure_url:i?.url,type:lt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let c of Object.keys(u))u[c]&&(o=u[c],t.push(O("meta",{property:`og:${n}:${c}`,content:o},u.url)));}break}case"jsonLd":{let o=W(e.jsonLd),a=0;for(let i of o){if(typeof i!="object")continue;let n=O("script",{type:"application/ld+json",children:JSON.stringify(i,(u,c)=>typeof c=="string"?er(c):c)},`json-ld-${i?.["@type"]||i?.name||a++}`);t.push(n);}break}case"alternates":{let o=W(e.alternates);for(let a of o){if(!a)continue;let{language:i,url:n,default:u}=a,c=i?`${i}${u?"-default":""}`:void 0;t.push(O("link",{rel:"alternate",hrefLang:c,href:n}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:o,maxSnippet:a,maxVideoPreview:i,noArchive:n,noFollow:u,noImageIndex:c,noIndex:s,noSnippet:l,noTranslate:y,unavailableAfter:f}=e.robots,d=[n&&"noarchive",c&&"noimageindex",l&&"nosnippet",y&&"notranslate",o&&`max-image-preview:${o}`,a&&`max-snippet:${a}`,i&&`max-video-preview:${i}`,f&&`unavailable_after:${f}`],p=(s?"noindex":"index")+","+(u?"nofollow":"follow");for(let h of d)h&&(p+=`,${h}`);t.push(O("meta",{name:"robots",content:p}));break}}return t.flat().sort((r,o)=>r.key.localeCompare(o.key))}function O(e,t,r){let o={tag:e,props:{},key:""};return e==="title"?(o.children=t.title,o.key=pt(o),o):e==="script"?(o.children=typeof t.children=="string"?t.children:"",o.key=pt(o,r),delete t.children,o.props=t,o):(o.props=t,Object.keys(o.props).forEach(a=>!o.props[a]&&delete o.props[a]),o.key=pt(o,r),o)}function pt(e,t){let{tag:r,props:o}=e;if(r==="title")return "0-title";if(r==="meta"){let a=o.content===t&&typeof o.property=="string"&&!o.property.endsWith("secure_url")&&"0";return [r,...[t,a],o.property||o.name].filter(n=>n).join("-")}return r==="link"?[r,o.rel,o.hrefLang||o.media].filter(i=>i).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${o.type}`}function dt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function lt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function W(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var Io=lazy(()=>import('./log-seo-tags-TY72EQWZ.js'));function Ro({debug:e}){let t=useMatches(),r=useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let o=useMemo(()=>t.flatMap(n=>{let{handle:u,...c}=n,s={...c,...r},l=u?.seo,y=c?.data?.seo;return !l&&!y?[]:l?Me(l,s):[y]}).reduce((n,u)=>{Object.keys(u).forEach(s=>!u[s]&&delete u[s]);let{jsonLd:c}=u;return c?n?.jsonLd?Array.isArray(c)?{...n,...u,jsonLd:[...n.jsonLd,...c]}:{...n,...u,jsonLd:[...n.jsonLd,c]}:{...n,...u,jsonLd:[c]}:{...n,...u}},{}),[t,r]),{html:a,loggerMarkup:i}=useMemo(()=>{let n=tr(o),u=n.map(s=>s.tag==="script"?createElement(s.tag,{...s.props,key:s.key,dangerouslySetInnerHTML:{__html:s.children}}):createElement(s.tag,{...s.props,key:s.key},s.children)),c=createElement(Suspense,{fallback:null},createElement(Io,{headTags:n}));return {html:u,loggerMarkup:c}},[o]);return createElement(Fragment,null,a,e&&i)}function Me(e,...t){if(e instanceof Function)return Me(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((o,a)=>[...o,Me(a)],[]),r):e instanceof Object?(Object.entries(e).forEach(([a,i])=>{r[a]=Me(i,...t);}),r):e}function bo(...e){let t=[],r=e.reduce((o,a)=>{if(!a)return o;Object.keys(a).forEach(n=>!a[n]&&delete a[n]);let{jsonLd:i}=a;return i?o?.jsonLd?{...o,...a,jsonLd:W(o.jsonLd).concat(i)}:{...o,...a,jsonLd:[i]}:{...o,...a}},{})||{};for(let o of Object.keys(r))switch(o){case"title":{let a=H($.title,r.title),i=dt(r?.titleTemplate,a);if(!i)break;t.push({title:i},{property:"og:title",content:i},{property:"twitter:title",content:i});break}case"description":{let a=H($.description,r.description);if(!a)break;t.push({name:"description",content:a},{property:"og:description",content:a},{property:"twitter:description",content:a});break}case"url":{let a=H($.url,r.url);if(!a)break;let n=a.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:n},{property:"og:url",content:n});break}case"handle":{let a=H($.handle,r.handle);if(!a)break;t.push({property:"twitter:site",content:a},{property:"twitter:creator",content:a});break}case"media":{let a,i=W(r.media);for(let n of i)if(typeof n=="string"&&t.push({property:"og:image",content:n}),n&&typeof n=="object"){let u=n.type||"image",c=n?{url:n?.url,secure_url:n?.url,type:lt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let s of Object.keys(c))c[s]&&(a=c[s],t.push({property:`og:${u}:${s}`,content:a}));}break}case"jsonLd":{let a=W(r.jsonLd);for(let n of a)typeof n!="object"||Object.keys(n).length===0||t.push({"script:ld+json":n});break}case"alternates":{let a=W(r.alternates);for(let i of a){if(!i)continue;let{language:n,url:u,default:c}=i,s=n?`${n}${c?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:s,href:u});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:a,maxSnippet:i,maxVideoPreview:n,noArchive:u,noFollow:c,noImageIndex:s,noIndex:l,noSnippet:y,noTranslate:f,unavailableAfter:d}=r.robots,p=[u&&"noarchive",s&&"noimageindex",y&&"nosnippet",f&&"notranslate",a&&`max-image-preview:${a}`,i&&`max-snippet:${i}`,n&&`max-video-preview:${n}`,d&&`unavailable_after:${d}`],h=(l?"noindex":"index")+","+(c?"nofollow":"follow");for(let g of p)g&&(h+=`,${g}`);t.push({name:"robots",content:h});break}}return t}function Do({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let o=useNavigation().state==="loading",{endCursor:a,hasNextPage:i,hasPreviousPage:n,nextPageUrl:u,nodes:c,previousPageUrl:s,startCursor:l}=ko(e),y=useMemo(()=>({pageInfo:{endCursor:a,hasPreviousPage:n,hasNextPage:i,startCursor:l},nodes:c}),[a,i,n,l,c]),f=useMemo(()=>forwardRef(function(h,g){return i?createElement(Link,{preventScrollReset:!0,...h,to:u,state:y,replace:!0,ref:g}):null}),[i,u,y]),d=useMemo(()=>forwardRef(function(h,g){return n?createElement(Link,{preventScrollReset:!0,...h,to:s,state:y,replace:!0,ref:g}):null}),[n,s,y]);return t({state:y,hasNextPage:i,hasPreviousPage:n,isLoading:o,nextPageUrl:u,nodes:c,previousPageUrl:s,NextLink:f,PreviousLink:d})}function Fe(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Se(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function ko(e){e.pageInfo||Se("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Se("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Se("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Se("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Se("pageInfo.hasPreviousPage");let t=useNavigate(),{state:r,search:o,pathname:a}=useLocation(),u=new URLSearchParams(o).get("direction")==="previous",c=useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?flattenConnection(e):u?[...flattenConnection(e),...r.nodes]:[...r.nodes,...flattenConnection(e)],[r,e]),s=useMemo(()=>{let d=globalThis?.window?.__hydrogenHydrated,p=!d||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,h=!d||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!d||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,m=!d||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(u?(p=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(h=e.pageInfo.endCursor,m=e.pageInfo.hasNextPage)),{startCursor:p,endCursor:h,hasPreviousPage:g,hasNextPage:m}},[u,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),l=useRef({params:Fe(o),pathname:a});useEffect(()=>{window.__hydrogenHydrated=!0;},[]),useEffect(()=>{(Fe(o)!==l.current.params||a!==l.current.pathname)&&(l.current={pathname:a,params:Fe(o)},t(`${a}?${Fe(o)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[a,o]);let y=useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","previous"),s.startCursor&&d.set("cursor",s.startCursor),`?${d.toString()}`},[o,s.startCursor]),f=useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","next"),s.endCursor&&d.set("cursor",s.endCursor),`?${d.toString()}`},[o,s.endCursor]);return {...s,previousPageUrl:y,nextPageUrl:f,nodes:c}}function Lo(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,o=new URLSearchParams(new URL(e.url).search),a=o.get("cursor")??void 0;return (o.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:a??null}:{first:r,endCursor:a??null}}var N=class extends Response{constructor(t,r,o){super(`Bad request: ${t}`,{status:400,headers:o});}};function ve(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function _o({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:o,debugInfo:a,exchangeForStorefrontCustomerAccessToken:i}){let n=new URLSearchParams,u=e.get(E),c=u?.refreshToken,s=u?.idToken;if(!c)throw new N("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");n.append("grant_type","refresh_token"),n.append("refresh_token",c),n.append("client_id",t);let l={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let f=`${r}/auth/oauth/token`,d=await fetch(f,{method:"POST",headers:l,body:n});if(!d.ok){let T=await d.text();throw new Response(T,{status:d.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:p,expires_in:h,refresh_token:g}=await d.json(),m=await ft(p,t,r,o);e.set(E,{accessToken:m,expiresAt:new Date(new Date().getTime()+(h-120)*1e3).getTime()+"",refreshToken:g,idToken:s}),await i();}function pe(e){e.unset(E),e.unset(se);}async function sr({locks:e,expiresAt:t,session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:u}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=_o({session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:u})),await e.refresh,delete e.refresh;}catch(c){throw pe(r),c&&c.status!==401?c:new N("Unauthorized","Login before querying the Customer Account API.")}}function cr(){let e=Uo();return pr(e)}async function ur(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=No(t);return pr(r)}function Uo(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function pr(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function No(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function dr(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function ft(e,t,r,o,a){let i=t;if(!e)throw new N("Unauthorized","oAuth access token was not provided during token exchange.");let n=new URLSearchParams;n.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),n.append("client_id",i),n.append("audience",Gt),n.append("subject_token",e),n.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),n.append("scopes","https://api.customers.com/auth/customer.graphql");let u={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let s=`${r}/auth/oauth/token`,l=await fetch(s,{method:"POST",headers:u,body:n});let y=await l.json();if(y.error)throw new N(y.error_description);return y.access_token}function lr(e){return Vo(e).payload.nonce}function Vo(e){let[t,r,o]=e.split("."),a=JSON.parse(atob(t)),i=JSON.parse(atob(r));return {header:a,payload:i,signature:o}}function qe(){return Fo(Mo())}function Mo(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function Fo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var yr="/account/login",qo="/account/authorize",fr="/account";function $o(e){if(!e.url)return yr;let{pathname:t}=new URL(e.url),r=yr+`?${new URLSearchParams({return_to:t}).toString()}`;return ve(r)}function Ho({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:o=Le,request:a,waitUntil:i,authUrl:n,customAuthStatusHandler:u,logErrors:c=!0,unstableB2b:s=!1}){if(o!==Le&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${Le}.`),!a?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let l=u||(()=>$o(a)),y=new URL(a.url),f=y.protocol==="http:"?y.origin.replace("http","https"):y.origin,d=st({requestUrl:f,defaultUrl:qo,redirectUrl:n}),p=`${r}/account/customer/api/${o}/graphql`,h={};async function g({query:C,type:P,variables:A={}}){let v=await I();if(!v)throw l();new Date().getTime();let D=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ie,Origin:f,Authorization:v},body:JSON.stringify({query:C,variables:A})});let k=await D.text(),L={url:p,response:D,type:P,query:C,queryVariables:A,errors:void 0,client:"customer"};if(!D.ok){if(D.status===401)throw pe(e),l();let w;try{w=J(k);}catch{w=[{message:k}];}Ce({...L,errors:w});}try{let w=J(k),{errors:G}=w,ye=G?.map(({message:ae,...F})=>new X(ae,{...F,clientOperation:`customerAccount.${L.type}`,requestId:D.headers.get("x-request-id"),queryVariables:A,query:C}));return {...w,...G&&{errors:ye}}}catch{Ce({...L,errors:[{message:k}]});}}async function m(){if(!r||!t)return !1;let C=e.get(E),P=C?.accessToken,A=C?.expiresAt;if(!P||!A)return !1;let v=q?.();try{await sr({locks:h,expiresAt:A,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:f,debugInfo:{waitUntil:i,stackInfo:v,...Z(a)},exchangeForStorefrontCustomerAccessToken:Ee});}catch{return !1}return !0}async function T(){if(!await m())throw l()}async function I(){if(await m())return e.get(E)?.accessToken}async function x(C,P){return Te(r,t),C=ce(C),Ue(C,"customer.mutate"),ue(g({query:C,type:"mutation",...P}),{logErrors:c})}async function _(C,P){return Te(r,t),C=ce(C),_e(C,"customer.query"),ue(g({query:C,type:"query",...P}),{logErrors:c})}function K(C){e.set(se,{...e.get(se),...C});}async function U(){if(await m())return e.get(se)}async function Ee(){if(!s)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:P}=await x(C),A=P?.storefrontCustomerAccessTokenCreate?.customerAccessToken;A&&K({customerAccessToken:A});}return {login:async C=>{Te(r,t);let P=new URL(`${r}/auth/oauth/authorize`),A=dr(),v=qe();if(P.searchParams.set("client_id",t),P.searchParams.set("scope","openid email"),P.searchParams.append("response_type","code"),P.searchParams.append("redirect_uri",d),P.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),P.searchParams.append("state",A),P.searchParams.append("nonce",v),C?.uiLocales){let[D,k]=C.uiLocales.split("-"),L=D.toLowerCase();k&&(L+=`-${k.toUpperCase()}`),P.searchParams.append("ui_locales",L);}let V=cr(),M=await ur(V);return e.set(E,{...e.get(E),codeVerifier:V,state:A,nonce:v,redirectPath:Ve(a.url)||Ne(a,"Referer")||fr}),P.searchParams.append("code_challenge",M),P.searchParams.append("code_challenge_method","S256"),ve(P.toString())},logout:async C=>{Te(r,t);let P=e.get(E)?.idToken,A=st({requestUrl:f,defaultUrl:f,redirectUrl:C?.postLogoutRedirectUri}),v=P?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",P],["post_logout_redirect_uri",A]]).toString()}`).toString():A;return pe(e),ve(v)},isLoggedIn:m,handleAuthStatus:T,getAccessToken:I,getApiUrl:()=>p,mutate:x,query:_,authorize:async()=>{Te(r,t);let C=y.searchParams.get("code"),P=y.searchParams.get("state");if(!C||!P)throw pe(e),new N("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(E)?.state!==P)throw pe(e),new N("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let A=t,v=new URLSearchParams;v.append("grant_type","authorization_code"),v.append("client_id",A),v.append("redirect_uri",d),v.append("code",C);let V=e.get(E)?.codeVerifier;if(!V)throw new N("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");v.append("code_verifier",V);let M={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:f},D=q?.();new Date().getTime();let L=`${r}/auth/oauth/token`,w=await fetch(L,{method:"POST",headers:M,body:v});if(!w.ok)throw new Response(await w.text(),{status:w.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:G,expires_in:ye,id_token:ae,refresh_token:F}=await w.json(),fe=e.get(E)?.nonce,Lt=await lr(ae);if(fe!==Lt)throw new N("Unauthorized",`Returned nonce does not match: ${fe} !== ${Lt}`);let Br=await ft(G,t,r,f,{waitUntil:i,stackInfo:D,...Z(a)}),Wr=e.get(E)?.redirectPath;return e.set(E,{accessToken:Br,expiresAt:new Date(new Date().getTime()+(ye-120)*1e3).getTime()+"",refreshToken:F,idToken:ae}),await Ee(),ve(Wr||fr)},UNSTABLE_setBuyer:K,UNSTABLE_getBuyer:U}}function Te(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var Qo="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function Go({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||Qo)}var mr="cartFormInput";function Q({children:e,action:t,inputs:r,route:o,fetcherKey:a}){let i=useFetcher({key:a});return jsxs(i.Form,{action:o||"",method:"post",children:[(t||r)&&jsx("input",{type:"hidden",name:mr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(i):e]})}Q.INPUT_NAME=mr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function Wo(e){let t={};for(let n of e.entries()){let u=n[0],c=e.getAll(u);t[u]=c.length>1?c:n[1];}let{cartFormInput:r,...o}=t,{action:a,inputs:i}=r?JSON.parse(String(r)):{};return {action:a,inputs:{...i,...o}}}Q.getFormInput=Wo;var R=`#graphql
  fragment CartApiError on CartUserError {
    message
    field
    code
  }
`,b=`#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
  }
`;function mt(e){return async(t,r)=>{let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:a,...i}=r||{},{buyerIdentity:n,...u}=t,{cartCreate:c,errors:s}=await e.storefront.mutate(zo(e.cartFragment),{variables:{input:{...u,buyerIdentity:{...o,...n}},...i}});return S(c,s)}}var zo=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function ht({storefront:e,customerAccount:t,getCartId:r,cartFragment:o}){return async a=>{let i=r();if(!i)return null;let[n,{cart:u,errors:c}]=await Promise.all([t?t.isLoggedIn():!1,e.query(Jo(o),{variables:{cartId:i,...a},cache:e.CacheNone()})]);if(n&&u?.checkoutUrl){let s=new URL(u.checkoutUrl);s.searchParams.set("logged_in","true"),u.checkoutUrl=s.toString();}return u||c?S(u,c):null}}var Jo=(e=Yo)=>`#graphql
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

  ${e}
`,Yo=`#graphql
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
`;function gt(e){return async(t,r)=>{let{cartLinesAdd:o,errors:a}=await e.storefront.mutate(Xo(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var Xo=(e=b)=>`#graphql
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

  ${e}
  ${R}
`;var hr="__h_pending_";function gr(e){return hr+e}function $e(e){return e.startsWith(hr)}function He(e,t){if(t.some(r=>$e(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function Ct(e){return async(t,r)=>{He("updateLines",t);let{cartLinesUpdate:o,errors:a}=await e.storefront.mutate(Zo(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var Zo=(e=b)=>`#graphql
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

  ${e}
  ${R}
`;function Pt(e){return async(t,r)=>{He("removeLines",t);let{cartLinesRemove:o,errors:a}=await e.storefront.mutate(ea(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return S(o,a)}}var ea=(e=b)=>`#graphql
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

  ${e}
  ${R}
`;function St(e){return async(t,r)=>{let o=t.filter((n,u,c)=>c.indexOf(n)===u),{cartDiscountCodesUpdate:a,errors:i}=await e.storefront.mutate(ta(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:o,...r}});return S(a,i)}}var ta=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function At(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:a,errors:i}=await e.storefront.mutate(ra(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...o,...t},...r}});return S(a,i)}}var ra=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function vt(e){return async(t,r)=>{let{cartNoteUpdate:o,errors:a}=await e.storefront.mutate(oa(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return S(o,a)}}var oa=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function Tt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:o,errors:a}=await e.storefront.mutate(aa(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return S(o,a)}}var aa=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function It(e){return async(t,r)=>{let{cartAttributesUpdate:o,errors:a}=await e.storefront.mutate(na(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return S(o,a)}}var na=(e=b)=>`#graphql
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
  ${e}
  ${R}
`;function Rt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),a=t.map(u=>({...u,ownerId:o})),{cartMetafieldsSet:i,errors:n}=await e.storefront.mutate(ia(),{variables:{metafields:a}});return S({cart:{id:o},...i},n)}}var ia=()=>`#graphql
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
`;function bt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),{cartMetafieldDelete:a,errors:i}=await e.storefront.mutate(sa(),{variables:{input:{ownerId:o,key:t}}});return S({cart:{id:o},...a},i)}}var sa=()=>`#graphql
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
`;var ua=e=>{let t=parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var da=e=>t=>{let r=new Headers;return r.append("Set-Cookie",stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function la(e){let{getCartId:t,setCartId:r,storefront:o,customerAccount:a,cartQueryFragment:i,cartMutateFragment:n}=e,u=t(),c=()=>u||t(),s={storefront:o,getCartId:c,cartFragment:n,customerAccount:a},l=mt(s),y=async function(...d){let p=await l(...d);return u=p?.cart?.id,p},f={get:ht({storefront:o,customerAccount:a,getCartId:c,cartFragment:i}),getCartId:c,setCartId:r,create:y,addLines:async(d,p)=>{let h=d.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return u||p?.cartId?await gt(s)(h,p):await y({lines:h},p)},updateLines:Ct(s),removeLines:Pt(s),updateDiscountCodes:async(d,p)=>u||p?.cartId?await St(s)(d,p):await y({discountCodes:d},p),updateBuyerIdentity:async(d,p)=>u||p?.cartId?await At(s)(d,p):await y({buyerIdentity:d},p),updateNote:async(d,p)=>u||p?.cartId?await vt(s)(d,p):await y({note:d},p),updateSelectedDeliveryOption:Tt(s),updateAttributes:async(d,p)=>u||p?.cartId?await It(s)(d,p):await y({attributes:d},p),setMetafields:async(d,p)=>u||p?.cartId?await Rt(s)(d,p):await y({metafields:d},p),deleteMetafield:bt(s)};return "customMethods"in e?{...f,...e.customMethods??{}}:f}function fa(e){let t=useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},o=r.lines.nodes,a=!1;for(let{formData:i}of t){if(!i)continue;let n=Q.getFormInput(i);if(n.action===Q.ACTIONS.LinesAdd)for(let u of n.inputs.lines){if(!u.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let c=o.find(s=>s.merchandise.id===u.selectedVariant?.id);a=!0,c?(c.quantity=(c.quantity||1)+(u.quantity||1),c.isOptimistic=!0):o.unshift({id:gr(u.selectedVariant.id),merchandise:u.selectedVariant,isOptimistic:!0,quantity:u.quantity||1});}else if(n.action===Q.ACTIONS.LinesRemove)for(let u of n.inputs.lineIds){let c=o.findIndex(s=>s.id===u);if(c!==-1){if($e(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${u}' but it doesn't exist in the cart`);}else if(n.action===Q.ACTIONS.LinesUpdate)for(let u of n.inputs.lines){let c=o.findIndex(s=>u.id===s.id);if(c>-1){if($e(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}o[c].quantity=u.quantity,o[c].quantity===0&&o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${u.id}' but it doesn't exist in the cart`);}}return a&&(r.isOptimistic=a),r}function Sa({handle:e,options:t=[],variants:r=[],productPath:o="products",waitForNavigation:a=!1,children:i}){let n=r instanceof Array?r:flattenConnection(r),{searchParams:u,path:c,alreadyOnProductPage:s}=va(e,o,a),l=t.filter(y=>y?.values?.length===1);return createElement(Fragment,null,...useMemo(()=>t.map(y=>{let f,d=[];for(let p of y.values){let h=new URLSearchParams(s?u:void 0);h.set(y.name,p),l.forEach(x=>{h.set(x.name,x.values[0]);});let g=n.find(x=>x?.selectedOptions?.every(_=>h.get(_?.name)===_?.value)),m=u.get(y.name),T=m?m===p:!1;T&&(f=p);let I="?"+h.toString();d.push({value:p,isAvailable:g?g.availableForSale:!0,to:c+I,search:I,isActive:T,variant:g});}return i({option:{name:y.name,value:f,values:d}})}),[t,n,i]))}var Aa=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((o,a)=>{r.push({name:a,value:o});}),r};function va(e,t,r){let{pathname:o,search:a}=useLocation(),i=useNavigation();return useMemo(()=>{let n=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o),u=n&&n.length>0;t=t.startsWith("/")?t.substring(1):t;let c=u?`${n[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||i.state!=="loading"?a:i.location.search),alreadyOnProductPage:c===o,path:c}},[o,a,r,e,t,i])}function ba(e,t){let r=useNavigation(),[o,a]=useState([]);if(useEffect(()=>{Promise.resolve(t).then(i=>{i&&a(i instanceof Array?i:i.product?.variants?.nodes||[]);}).catch(i=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:i}));});},[t]),r.state==="loading"){let i=new URLSearchParams(r.location.search),n=!1,u=o.find(c=>c.selectedOptions?c.selectedOptions.every(s=>i.get(s.name)===s.value):(n||(n=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(u)return {...e,isOptimistic:!0,selectedVariant:u}}return e}var Pr=createContext(void 0),Da=Pr.Provider,wt=()=>useContext(Pr);function ka(e){let t=qe(),r=La(t,e);return {nonce:t,header:r,NonceProvider:({children:a})=>createElement(Da,{value:t},a)}}function La(e,t){let{shop:r,...o}=t??{},a=`'nonce-${e}'`,i=["'self'","'unsafe-inline'","https://cdn.shopify.com"],n=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&n.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&n.push(`https://${r.storeDomain}`);let c={baseUri:["'self'"],defaultSrc:["'self'",a,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:i,connectSrc:n},s=Object.assign({},c,o);for(let l in c){let y=o[l];l&&y&&(s[l]=_a(y,c[l]));}return s.scriptSrc instanceof Array&&!s.scriptSrc.includes(a)?s.scriptSrc.push(a):s.defaultSrc instanceof Array&&!s.defaultSrc.includes(a)&&s.defaultSrc.push(a),xa({directives:s})}function _a(e,t){let r=typeof t=="string"?[t]:t,o=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(i=>i==="'none'")?o:[...o,...r]:r}var Na=forwardRef((e,t)=>{let r=wt();return jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function Fa(e){let t=useFetchers(),r={};for(let{formData:o}of t)if(o?.get("optimistic-identifier")===e)try{if(o.has("optimistic-data")){let a=JSON.parse(String(o.get("optimistic-data")));Object.assign(r,a);}}catch{}return r}function qa({id:e,data:t}){return jsxs(Fragment$1,{children:[jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function Ga(e){return jsx(ShopPayButton,{channel:"hydrogen",...e})}function de(e){let{type:t,data:r={},customData:o}=e,a=useLocation(),{publish:i,cart:n,prevCart:u,shop:c,customData:s}=te(),l=a.pathname+a.search,y={...r,customData:{...s,...o},cart:n,prevCart:u,shop:c};return useEffect(()=>{c?.shopId&&(y={...y,url:window.location.href},i(t,y));},[i,l,c?.shopId]),null}function Ar(e){return jsx(de,{...e,type:"page_viewed"})}function vr(e){return jsx(de,{...e,type:"product_viewed"})}function Tr(e){return jsx(de,{...e,type:"collection_viewed"})}function Ir(e){return jsx(de,{...e,type:"cart_viewed"})}function Rr(e){return jsx(de,{...e,type:"search_viewed"})}function br(e){return jsx(de,{...e})}var re={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var Ja="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",Ya="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function Er(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function Et(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:o,...a}=e,i=useRef(!1),n=useLoadScript(t?Ya:Ja,{attributes:{id:"customer-privacy-api"}});useEffect(()=>{let u=c=>{r&&r(c.detail);};return document.addEventListener("visitorConsentCollected",u),()=>{document.removeEventListener("visitorConsentCollected",u);}},[r]),useEffect(()=>{if(n!=="done"||i.current)return;i.current=!0;let{checkoutDomain:u,storefrontAccessToken:c}=a;u||Er("checkoutDomain"),c||Er("storefrontAccessToken"),(c.startsWith("shpat_")||c.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let s={checkoutRootDomain:u,storefrontAccessToken:c};if(u){let f=window.document.location.host,d=u.split(".").reverse(),p=f.split(".").reverse(),h=[];d.forEach((g,m)=>{g===p[m]&&h.push(g);}),f=h.reverse().join("."),f&&(s.storefrontRootDomain=f);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(s),!window.Shopify?.customerPrivacy)return;let l=window.Shopify.customerPrivacy.setTrackingConsent;function y(f,d){l({...f,headlessStorefront:!0,...s},d);}window.Shopify.customerPrivacy.setTrackingConsent=y,o&&o();},[n,t,a]);}function Ot(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function tn(){let e=Ot();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function xr({consent:e,onReady:t,domain:r}){let{subscribe:o,register:a,canTrack:i}=te(),[n,u]=useState(!1),[c,s]=useState(!1),{ready:l}=a("Internal_Shopify_Analytics"),{ready:y}=a("Internal_Shopify_CustomerPrivacy"),f=()=>{n&&c&&t();},d=()=>{s(!0),y(),f();},{checkoutDomain:p,storefrontAccessToken:h,withPrivacyBanner:g}=e;return Et({checkoutDomain:p||"mock.shop",storefrontAccessToken:h||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:d,onReady:()=>{setTimeout(d,3e3);}}),useShopifyCookies({hasUserConsent:n&&c?i():!0,domain:r,checkoutDomain:p}),useEffect(()=>{o(re.PAGE_VIEWED,on),o(re.PRODUCT_VIEWED,an),o(re.COLLECTION_VIEWED,nn),o(re.SEARCH_VIEWED,sn),o(re.PRODUCT_ADD_TO_CART,cn),l(),u(!0),f();},[o,l]),null}function Qe(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function be(e){let t=tn(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){Qe("shopId");return}if(!e?.shop?.acceptedLanguage){Qe("acceptedLanguage");return}if(!e?.shop?.currency){Qe("currency");return}if(!e?.shop?.hydrogenSubchannelId){Qe("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function rn(e,t){if(t===null)return;let r=be(e);return r?{...r,cartId:t.id}:void 0}var j={};function on(e){let t=be(e);t&&(sendShopifyAnalytics({eventName:AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...j}}),j={});}function an(e){let t=be(e);if(t&&Dr({type:"product",products:e.products})){let r=xt(e.products);j={pageType:AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...j,products:xt(e.products)},sendShopifyAnalytics({eventName:AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function nn(e){let t=be(e);t&&(j={pageType:AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...j,collectionHandle:e.collection.handle},sendShopifyAnalytics({eventName:AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function sn(e){let t=be(e);t&&(j={pageType:AnalyticsPageType.search},t={...t,...j,searchString:e.searchTerm},sendShopifyAnalytics({eventName:AnalyticsEventName.SEARCH_VIEW,payload:t}));}function cn(e){let{cart:t,currentLine:r}=e,o=rn(e,t);!o||!r?.id||un({matchedLine:r,eventPayload:o});}function un({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};Dr({type:"cart",products:[r]})&&sendShopifyAnalytics({eventName:AnalyticsEventName.ADD_TO_CART,payload:{...t,products:xt([r])}});}function oe(e,t,r,o){if(e==="cart"){let a=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${a}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${a}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let a=`${o||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${a}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${a}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function Dr({type:e,products:t}){return !t||t.length===0?(oe(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return oe(e,"id",!1),!1;if(!r.title)return oe(e,"title",!1),!1;if(!r.price)return oe(e,"price.amount",!0,"price"),!1;if(!r.vendor)return oe(e,"vendor",!1),!1;if(!r.variantId)return oe(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return oe(e,"title",!0,"variantTitle"),!1}),!0)}function xt(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function _r(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function Ur({cart:e,setCarts:t}){let{publish:r,shop:o,customData:a,canTrack:i,cart:n,prevCart:u}=te(),c=useRef(null);return useEffect(()=>{if(e)return Promise.resolve(e).then(s=>{if(s&&s.lines){if(!s.id){_r("id");return}if(!s.updatedAt){_r("updatedAt");return}}t(({cart:l,prevCart:y})=>s?.updatedAt!==l?.updatedAt?{cart:s,prevCart:l}:{cart:l,prevCart:y});}),()=>{}},[t,e]),useEffect(()=>{if(!n||!n?.updatedAt||n?.updatedAt===u?.updatedAt)return;let s;try{s=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{s=null;}if(n.id===s?.id&&n.updatedAt===s?.updatedAt)return;let l={eventTimestamp:Date.now(),cart:n,prevCart:u,shop:o,customData:a};if(n.updatedAt===c.current)return;c.current=n.updatedAt,r("cart_updated",l),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:n.id,updatedAt:n.updatedAt}));let y=u?.lines?flattenConnection(u?.lines):[],f=n.lines?flattenConnection(n.lines):[];y?.forEach(d=>{let p=f.filter(h=>d.id===h.id);if(p?.length===1){let h=p[0];d.quantity<h.quantity?r("product_added_to_cart",{...l,prevLine:d,currentLine:h}):d.quantity>h.quantity&&r("product_removed_from_cart",{...l,prevLine:d,currentLine:h});}else r("product_removed_from_cart",{...l,prevLine:d});}),f?.forEach(d=>{let p=y.filter(h=>d.id===h.id);(!p||p.length===0)&&r("product_added_to_cart",{...l,currentLine:d});});},[n,u,r,o,a,i]),null}var hn={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},$r=createContext(hn),Be=new Map,we={};function Hr(){return Object.values(we).every(Boolean)}function Nr(e,t){Be.has(e)||Be.set(e,new Map),Be.get(e)?.set(t.toString(),t);}var We=new Map;function Vr(e,t){if(!Hr()){We.set(e,t);return}Qr(e,t);}function Qr(e,t){(Be.get(e)??new Map).forEach((r,o)=>{try{r(t);}catch(a){typeof a=="object"&&a instanceof Error?console.error("Analytics publish error",a.message,o,a.stack):console.error("Analytics publish error",a,o);}});}function Mr(e){return we.hasOwnProperty(e)||(we[e]=!1),{ready:()=>{we[e]=!0,Hr()&&We.size>0&&(We.forEach((t,r)=>{Qr(r,t);}),We.clear());}}}function Fr(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function qr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function gn({canTrack:e,cart:t,children:r,consent:o,customData:a={},shop:i=null,disableThrowOnError:n=!1,cookieDomain:u}){let c=useRef(!1),{shop:s}=Cn(i),[l,y]=useState(!!e),[f,d]=useState({cart:null,prevCart:null}),[p,h]=useState(e?()=>e:()=>Fr);if(s)if(/\/68817551382$/.test(s.shopId))Kt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!o.checkoutDomain){let m=qr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");nt(m);}if(!o.storefrontAccessToken){let m=qr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");nt(m);}}let g=useMemo(()=>({canTrack:p,...f,customData:a,publish:p()?Vr:()=>{},shop:s,subscribe:Nr,register:Mr}),[l,p(),p,JSON.stringify(p),f,f.cart?.updatedAt,f.prevCart,Vr,Nr,a,s,Mr,JSON.stringify(we)]);return jsxs($r.Provider,{value:g,children:[r,!!s&&jsx(Ar,{}),!!s&&!!t&&jsx(Ur,{cart:t,setCarts:d}),!!s&&o.checkoutDomain&&jsx(xr,{consent:o,onReady:()=>{c.current=!0,y(!0),h(()=>Fr);},domain:u})]})}function te(){let e=useContext($r);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function Cn(e){let[t,r]=useState(null);return useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function Pn({storefront:e,publicStorefrontId:t="0"}){return e.query(Sn,{cache:e.CacheLong()}).then(({shop:r,localization:o})=>({shopId:r.id,acceptedLanguage:o.language.isoCode,currency:o.country.currency.isoCode,hydrogenSubchannelId:t}))}var Sn=`#graphql
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
`,An={CartView:Ir,CollectionView:Tr,CustomView:br,ProductView:vr,Provider:gn,SearchView:Rr};var Rn=function(e){return jsx(RichText,{...e,components:{link:({node:t})=>jsx(Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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

export { An as Analytics, re as AnalyticsEvent, Ye as CacheCustom, Je as CacheLong, Ke as CacheNone, z as CacheShort, Q as CartForm, it as InMemoryCache, qa as OptimisticInput, Do as Pagination, Rn as RichText, Na as Script, Ro as Seo, Ga as ShopPayButton, Sa as VariantSelector, It as cartAttributesUpdateDefault, At as cartBuyerIdentityUpdateDefault, mt as cartCreateDefault, St as cartDiscountCodesUpdateDefault, ht as cartGetDefault, ua as cartGetIdDefault, gt as cartLinesAddDefault, Pt as cartLinesRemoveDefault, Ct as cartLinesUpdateDefault, bt as cartMetafieldDeleteDefault, Rt as cartMetafieldsSetDefault, vt as cartNoteUpdateDefault, Tt as cartSelectedDeliveryOptionsUpdateDefault, da as cartSetIdDefault, Go as changelogHandler, la as createCartHandler, ka as createContentSecurityPolicy, Ho as createCustomerAccountClient, ci as createStorefrontClient, lo as createWithCache, Y as emitSpanEvent, to as flushSpanEvents, S as formatAPIResult, me as generateCacheControlHeader, Ot as getCustomerPrivacy, Lo as getPaginationVariables, Aa as getSelectedProductOptions, bo as getSeoMeta, Pn as getShopAnalytics, ho as graphiqlLoader, fo as storefrontRedirect, te as useAnalytics, Et as useCustomerPrivacy, wt as useNonce, fa as useOptimisticCart, Fa as useOptimisticData, ba as useOptimisticProduct };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map