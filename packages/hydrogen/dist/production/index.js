import { createStorefrontClient, SHOPIFY_STOREFRONT_ID_HEADER, getShopifyCookies, SHOPIFY_Y, SHOPIFY_STOREFRONT_Y_HEADER, SHOPIFY_S, SHOPIFY_STOREFRONT_S_HEADER, flattenConnection, ShopPayButton, useLoadScript, RichText, useShopifyCookies, sendShopifyAnalytics, AnalyticsEventName, AnalyticsPageType, getClientBrowserParameters } from '@shopify/hydrogen-react';
export { AnalyticsEventName, AnalyticsPageType, ExternalVideo, IMAGE_FRAGMENT, Image, MediaFile, ModelViewer, Money, ShopifySalesChannel, Video, customerAccountApiCustomScalars, flattenConnection, getClientBrowserParameters, getShopifyCookies, parseGid, parseMetafield, sendShopifyAnalytics, storefrontApiCustomScalars, useLoadScript, useMoney, useShopifyCookies } from '@shopify/hydrogen-react';
import { lazy, createContext, forwardRef, useMemo, createElement, Suspense, Fragment, useRef, useEffect, useState, useContext } from 'react';
import { useMatches, useLocation, useNavigation, Link, useNavigate, useFetcher, useFetchers } from '@remix-run/react';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { parse, stringify } from 'worktop/cookie';
import wa from 'content-security-policy-builder';

var Ee="public",Br="private",We="no-store",Lt={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function fe(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):Lt[r]&&t.push(`${Lt[r]}=${e[r]}`);}),t.join(", ")}function je(){return {mode:We}}function Ke(e){if(e?.mode&&e?.mode!==Ee&&e?.mode!==Br)throw Error("'mode' must be either 'public' or 'private'")}function K(e){return Ke(e),{mode:Ee,maxAge:1,staleWhileRevalidate:9,...e}}function ze(e){return Ke(e),{mode:Ee,maxAge:3600,staleWhileRevalidate:82800,...e}}function ae(e){return Ke(e),{mode:Ee,maxAge:1,staleWhileRevalidate:86399,...e}}function Je(e){return e}function z(e){return String(e).includes("__proto__")?JSON.parse(e,Wr):JSON.parse(e)}function Wr(e,t){if(e!=="__proto__")return t}function Oe(e,t){return e&&t?{...e,...t}:e||ae()}function Ye(e){return fe(Oe(e))}async function jr(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function Kr(e,t,r,o){if(!e)return;let a=Oe(o),n=Ye(Oe(a,{maxAge:(a.maxAge||0)+(a.staleWhileRevalidate||0)})),i=Ye(Oe(a));r.headers.set("cache-control",n),r.headers.set("real-cache-control",i),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function zr(e,t){e&&await e.delete(t);}function Jr(e,t){let r=e.headers.get("real-cache-control"),o=0;if(r){let n=r.match(/max-age=(\d*)/);n&&n.length>1&&(o=parseFloat(n[1]));}return [(Date.now()-Number(t))/1e3,o]}function Yr(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[o,a]=Jr(t,r),n=o>a;return n}var De={get:jr,set:Kr,delete:zr,generateDefaultCacheControlHeader:Ye,isStale:Yr};function me(e){return `https://shopify.dev/?${e}`}function Xr(e){return e||ae()}async function _t(e,t){if(!e)return;let r=me(t),o=new Request(r),a=await De.get(e,o);if(!a)return;let n=await a.text();try{return [z(n),a]}catch{return [n,a]}}async function Ut(e,t,r,o){if(!e)return;let a=me(t),n=new Request(a),i=new Response(JSON.stringify(r));await De.set(e,n,i,Xr(o));}function Nt(e,t){return De.isStale(new Request(me(e)),t)}function Vt(e){let t=Array.isArray(e)?e:[e],r="";for(let o of t)o!=null&&(typeof o=="object"?r+=JSON.stringify(o):r+=o.toString());return encodeURIComponent(r)}var Xe=new Set;async function xe(e,t,{strategy:r=K(),cacheInstance:o,shouldCacheResult:a=()=>!0,waitUntil:n,debugInfo:i}){let c=Vt([...typeof e=="string"?[e]:e]),y=f=>{({displayName:f.displayName,url:f.response?.url,responseInit:{status:f.response?.status||0,statusText:f.response?.statusText||"",headers:Array.from(f.response?.headers.entries()||[])}});},d=void 0;if(!o||!r||r.mode===We){let f=await t({addDebugData:y});return f}let p=f=>Ut(o,c,{value:f,debugInfo:void 0},r),h=await _t(o,c);if(h&&typeof h[0]!="string"){let[{value:f,debugInfo:T},I]=h;let L=Nt(c,I)?"STALE":"HIT";if(!Xe.has(c)&&L==="STALE"){Xe.add(c);let _=Promise.resolve().then(async()=>{let re=Date.now();try{let U=await t({addDebugData:y});a(U)&&(await p(U),d?.({result:U,cacheStatus:"PUT",overrideStartTime:re}));}catch(U){U.message&&(U.message="SWR in sub-request failed: "+U.message),console.error(U);}finally{Xe.delete(c);}});n?.(_);}return f}let g=await t({addDebugData:y});if(a(g)){let f=Promise.resolve().then(async()=>{await p(g);});n?.(f);}return g}function Mt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function Ft([e,t]){return [e,new Response(e,t)]}var qt=(e,t)=>!e?.errors&&t.status<400;async function $t(e,t,{cacheInstance:r,cache:o,cacheKey:a=[e,t],shouldCacheResponse:n=()=>!0,waitUntil:i,returnType:u="json",debugInfo:c}={}){return !o&&(!t.method||t.method==="GET")&&(o=K()),xe(a,async()=>{let s=await fetch(e,t),l;try{l=await s[u]();}catch{try{l=await s.text();}catch{return Mt("",s)}}return Mt(l,s)},{cacheInstance:r,waitUntil:i,strategy:o??null,debugInfo:c,shouldCacheResult:s=>n(...Ft(s))}).then(Ft)}var he="2024.4.3";var Ze="Custom-Storefront-Request-Group-ID",et="X-Shopify-Storefront-Access-Token",tt="X-SDK-Variant",rt="X-SDK-Variant-Source",ot="X-SDK-Version",ke="2024-04",ne=`Shopify Hydrogen ${he}`,Ht="30243aa5-17c1-465a-8493-944bcc4e88aa",E="customerAccount",ie="buyer";function Qt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var Gt=new Set,Wt=e=>{Gt.has(e)||(console.warn(e),Gt.add(e));},Bt=new Set,at=e=>{Bt.has(e)||(console.error(new Error(e)),Bt.add(e));};function se(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var Zr=/(^|}\s)query[\s({]/im,eo=/(^|}\s)mutation[\s({]/im;function Le(e,t){if(!Zr.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function _e(e,t){if(!eo.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var J=class extends Error{locations;path;extensions;constructor(t,r={}){let a=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(a),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function ge({url:e,response:t,errors:r,type:o,query:a,queryVariables:n,ErrorConstructor:i=Error,client:u="storefront"}){let c=(typeof r=="string"?r:r?.map?.(l=>l.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,s=new J(c,{query:a,queryVariables:n,cause:{errors:r},clientOperation:`${u}.${o}`,requestId:t.headers.get("x-request-id")});throw new i(s.message,{cause:s.cause})}function ce(e,t={}){let r=new Error,o=(a,n="Error")=>{let i=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(u,c)=>u.replace(c,""));return `${n}: ${a}
`+i};return e.then(a=>{if(a?.errors&&Array.isArray(a.errors)){let n=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;a.errors.forEach(i=>{i&&(i.stack=o(i.message,i.name),n(i)&&console.error(i));});}return a}).catch(a=>{throw a&&(a.stack=o(a.message,a.name)),a})}var q=void 0;var io={language:"EN",country:"US"};function ri(e){let {storefrontHeaders:t,cache:r,waitUntil:o,i18n:a,storefrontId:n,logErrors:i=!0,...u}=e,{getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getStorefrontApiUrl:y,getShopifyDomain:m}=createStorefrontClient(u),p=(u.privateStorefrontToken?l:s)({contentType:"json",buyerIp:t?.buyerIp||""});if(p[Ze]=t?.requestGroupId||Qt(),n&&(p[SHOPIFY_STOREFRONT_ID_HEADER]=n),(p["user-agent"]=`Hydrogen ${he}`),t&&t.cookie){let f=getShopifyCookies(t.cookie??"");f[SHOPIFY_Y]&&(p[SHOPIFY_STOREFRONT_Y_HEADER]=f[SHOPIFY_Y]),f[SHOPIFY_S]&&(p[SHOPIFY_STOREFRONT_S_HEADER]=f[SHOPIFY_S]);}let h=JSON.stringify({"content-type":p["content-type"],"user-agent":p["user-agent"],[tt]:p[tt],[rt]:p[rt],[ot]:p[ot],[et]:p[et]});async function g({query:f,mutation:T,variables:I,cache:L,headers:_=[],storefrontApiVersion:re,displayName:U,stackInfo:be}){let C=_ instanceof Headers?Object.fromEntries(_.entries()):Array.isArray(_)?Object.fromEntries(_):_,P=f??T,A={...I};a&&(!I?.country&&/\$country/.test(P)&&(A.country=a.country),!I?.language&&/\$language/.test(P)&&(A.language=a.language));let v=y({storefrontApiVersion:re}),V=JSON.stringify({query:P,variables:A}),M={method:"POST",headers:{...p,...C},body:V},D=[v,M.method,h,M.body],[x,k]=await $t(v,M,{cacheInstance:T?void 0:r,cache:L||ae(),cacheKey:D,shouldCacheResponse:qt,waitUntil:o,debugInfo:{requestId:M.headers[Ze],displayName:U,url:v,stackInfo:be,graphql:V,purpose:t?.purpose}}),b={url:v,response:k,type:T?"mutation":"query",query:P,queryVariables:A,errors:void 0};if(!k.ok){let F;try{F=z(x);}catch{F=[{message:x}];}ge({...b,errors:F});}let{data:G,errors:le}=x,oe=le?.map(({message:F,...ye})=>new J(F,{...ye,clientOperation:`storefront.${b.type}`,requestId:k.headers.get("x-request-id"),queryVariables:A,query:P}));return S(G,oe)}return {storefront:{query(f,T){f=se(f),Le(f,"storefront.query");let I=zt?.(f);return ce(g({...T,query:f,stackInfo:q?.(I)}),{stackOffset:I,logErrors:i})},mutate(f,T){f=se(f),_e(f,"storefront.mutate");let I=zt?.(f);return ce(g({...T,mutation:f,stackInfo:q?.(I)}),{stackOffset:I,logErrors:i})},cache:r,CacheNone:je,CacheLong:ze,CacheShort:K,CacheCustom:Je,generateCacheControlHeader:fe,getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getShopifyDomain:m,getApiUrl:y,i18n:a??io}}}var zt=void 0;function S(e,t){return {...e,...t&&{errors:t}}}function Ue(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function Y(e){return {requestId:e?Ue(e,"request-id"):void 0,purpose:e?Ue(e,"purpose"):void 0}}function so({cache:e,waitUntil:t,request:r}){return function(a,n,i){return xe(a,i,{strategy:n,cacheInstance:e,waitUntil:t,debugInfo:{...Y(r),stackInfo:q?.()}})}}var nt=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:o,timestamp:a,...n}=r,i=new Headers(n.headers),u=i.get("cache-control")||i.get("real-cache-control")||"",c=parseInt(u.match(/max-age=(\d+)/)?.[1]||"0",10),s=parseInt(u.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),l=(Date.now()-a)/1e3;if(l>c+s){this.#e.delete(t.url);return}let m=l>c;return i.set("cache",m?"STALE":"HIT"),i.set("date",new Date(a).toUTCString()),new Response(o,{status:n.status??200,headers:i})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let o of this.#e.keys())(!t||t.url===o)&&r.push(new Request(o));return Promise.resolve(r)}};function Ne(e){if(!e)return;let{pathname:t,search:r}=new URL(e),o=t+r,a=new URLSearchParams(r),n=a.get("return_to")||a.get("redirect");if(n){if(Yt(e,n))return n;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${n}`);}}function Yt(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function it({requestUrl:e,defaultUrl:t,redirectUrl:r}){let o=e,a=Jt(e,t),n=r?Jt(e,r):a;return Yt(e,n.toString())?n.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${n}. Default url ${a} is used instead.`),a.toString())}function Jt(e,t){return co(t)?new URL(t):new URL(t,new URL(e).origin)}function co(e){try{return new URL(e),!0}catch{return !1}}async function uo(e){let{storefront:t,request:r,noAdminRedirect:o,matchQueryParams:a,response:n=new Response("Not Found",{status:404})}=e,i=new URL(r.url),{pathname:u,searchParams:c}=i,s=c.has("_data");c.delete("redirect"),c.delete("return_to"),c.delete("_data");let l=(a?i.toString().replace(i.origin,""):u).toLowerCase();if(i.pathname==="/admin"&&!o)return ct(`${t.getShopifyDomain()}/admin`,s,c,a);try{let{urlRedirects:y}=await t.query(po,{variables:{query:"path:"+l.replace(/\/+$/,"")}}),m=y?.edges?.[0]?.node?.target;if(m)return ct(m,s,c,a);let d=Ne(r.url);if(d)return ct(d,s,c,a)}catch(y){console.error(`Failed to fetch redirects from Storefront API for route ${l}`,y);}return n}var st="https://example.com";function ct(e,t,r,o){let a=new URL(e,st);if(!o)for(let[n,i]of r)a.searchParams.append(n,i);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":a.toString().replace(st,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:a.toString().replace(st,"")}})}var po=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var lo=async function({request:t,context:r}){let o=r.storefront,a=r.customerAccount,n=new URL(t.url);if(!o)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let i={};if(o){let s="X-Shopify-Storefront-Access-Token";i.storefront={name:"Storefront API",authHeader:s,accessToken:o.getPublicTokenHeaders()[s],apiUrl:o.getApiUrl(),icon:"SF"};}if(a){let s=await(await fetch(n.origin+"/graphiql/customer-account.schema.json")).json(),l=await a.getAccessToken();s&&(i["customer-account"]={name:"Customer Account API",value:s,authHeader:"Authorization",accessToken:l,apiUrl:a.getApiUrl(),icon:"CA"});}let u="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",c=String.raw;return new Response(c`
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

            const schemas = ${JSON.stringify(i)};
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
    `,{status:200,headers:{"content-type":"text/html"}})};var yo={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},fo=/[&><\u2028\u2029]/g;function Xt(e){return e.replace(fo,t=>yo[t])}var B="Error in SEO input: ",$={title:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(B.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(B.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(B.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(B.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(B.concat("`handle` should start with `@`"));return e}}};function Zt(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let o=H($.title,e.title),a=pt(e?.titleTemplate,o);if(!a)break;t.push(O("title",{title:a}),O("meta",{property:"og:title",content:a}),O("meta",{name:"twitter:title",content:a}));break}case"description":{let o=H($.description,e.description);if(!o)break;t.push(O("meta",{name:"description",content:o}),O("meta",{property:"og:description",content:o}),O("meta",{name:"twitter:description",content:o}));break}case"url":{let o=H($.url,e.url);if(!o)break;let n=o.split("?")[0].replace(/\/$/,"");t.push(O("link",{rel:"canonical",href:n}),O("meta",{property:"og:url",content:n}));break}case"handle":{let o=H($.handle,e.handle);if(!o)break;t.push(O("meta",{name:"twitter:site",content:o}),O("meta",{name:"twitter:creator",content:o}));break}case"media":{let o,a=W(e.media);for(let n of a)if(typeof n=="string"&&t.push(O("meta",{name:"og:image",content:n})),n&&typeof n=="object"){let i=n.type||"image",u=n?{url:n?.url,secure_url:n?.url,type:dt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let c of Object.keys(u))u[c]&&(o=u[c],t.push(O("meta",{property:`og:${i}:${c}`,content:o},u.url)));}break}case"jsonLd":{let o=W(e.jsonLd),a=0;for(let n of o){if(typeof n!="object")continue;let i=O("script",{type:"application/ld+json",children:JSON.stringify(n,(u,c)=>typeof c=="string"?Xt(c):c)},`json-ld-${n?.["@type"]||n?.name||a++}`);t.push(i);}break}case"alternates":{let o=W(e.alternates);for(let a of o){if(!a)continue;let{language:n,url:i,default:u}=a,c=n?`${n}${u?"-default":""}`:void 0;t.push(O("link",{rel:"alternate",hrefLang:c,href:i}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:o,maxSnippet:a,maxVideoPreview:n,noArchive:i,noFollow:u,noImageIndex:c,noIndex:s,noSnippet:l,noTranslate:y,unavailableAfter:m}=e.robots,d=[i&&"noarchive",c&&"noimageindex",l&&"nosnippet",y&&"notranslate",o&&`max-image-preview:${o}`,a&&`max-snippet:${a}`,n&&`max-video-preview:${n}`,m&&`unavailable_after:${m}`],p=(s?"noindex":"index")+","+(u?"nofollow":"follow");for(let h of d)h&&(p+=`,${h}`);t.push(O("meta",{name:"robots",content:p}));break}}return t.flat().sort((r,o)=>r.key.localeCompare(o.key))}function O(e,t,r){let o={tag:e,props:{},key:""};return e==="title"?(o.children=t.title,o.key=ut(o),o):e==="script"?(o.children=typeof t.children=="string"?t.children:"",o.key=ut(o,r),delete t.children,o.props=t,o):(o.props=t,Object.keys(o.props).forEach(a=>!o.props[a]&&delete o.props[a]),o.key=ut(o,r),o)}function ut(e,t){let{tag:r,props:o}=e;if(r==="title")return "0-title";if(r==="meta"){let a=o.content===t&&typeof o.property=="string"&&!o.property.endsWith("secure_url")&&"0";return [r,...[t,a],o.property||o.name].filter(i=>i).join("-")}return r==="link"?[r,o.rel,o.hrefLang||o.media].filter(n=>n).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${o.type}`}function pt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function dt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function W(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var So=lazy(()=>import('./log-seo-tags-TY72EQWZ.js'));function Ao({debug:e}){let t=useMatches(),r=useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let o=useMemo(()=>t.flatMap(i=>{let{handle:u,...c}=i,s={...c,...r},l=u?.seo,y=c?.data?.seo;return !l&&!y?[]:l?Ve(l,s):[y]}).reduce((i,u)=>{Object.keys(u).forEach(s=>!u[s]&&delete u[s]);let{jsonLd:c}=u;return c?i?.jsonLd?Array.isArray(c)?{...i,...u,jsonLd:[...i.jsonLd,...c]}:{...i,...u,jsonLd:[...i.jsonLd,c]}:{...i,...u,jsonLd:[c]}:{...i,...u}},{}),[t,r]),{html:a,loggerMarkup:n}=useMemo(()=>{let i=Zt(o),u=i.map(s=>s.tag==="script"?createElement(s.tag,{...s.props,key:s.key,dangerouslySetInnerHTML:{__html:s.children}}):createElement(s.tag,{...s.props,key:s.key},s.children)),c=createElement(Suspense,{fallback:null},createElement(So,{headTags:i}));return {html:u,loggerMarkup:c}},[o]);return createElement(Fragment,null,a,e&&n)}function Ve(e,...t){if(e instanceof Function)return Ve(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((o,a)=>[...o,Ve(a)],[]),r):e instanceof Object?(Object.entries(e).forEach(([a,n])=>{r[a]=Ve(n,...t);}),r):e}function vo(...e){let t=[],r=e.reduce((o,a)=>{if(!a)return o;Object.keys(a).forEach(i=>!a[i]&&delete a[i]);let{jsonLd:n}=a;return n?o?.jsonLd?{...o,...a,jsonLd:W(o.jsonLd).concat(n)}:{...o,...a,jsonLd:[n]}:{...o,...a}},{})||{};for(let o of Object.keys(r))switch(o){case"title":{let a=H($.title,r.title),n=pt(r?.titleTemplate,a);if(!n)break;t.push({title:n},{property:"og:title",content:n},{property:"twitter:title",content:n});break}case"description":{let a=H($.description,r.description);if(!a)break;t.push({name:"description",content:a},{property:"og:description",content:a},{property:"twitter:description",content:a});break}case"url":{let a=H($.url,r.url);if(!a)break;let i=a.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:i},{property:"og:url",content:i});break}case"handle":{let a=H($.handle,r.handle);if(!a)break;t.push({property:"twitter:site",content:a},{property:"twitter:creator",content:a});break}case"media":{let a,n=W(r.media);for(let i of n)if(typeof i=="string"&&t.push({property:"og:image",content:i}),i&&typeof i=="object"){let u=i.type||"image",c=i?{url:i?.url,secure_url:i?.url,type:dt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let s of Object.keys(c))c[s]&&(a=c[s],t.push({property:`og:${u}:${s}`,content:a}));}break}case"jsonLd":{let a=W(r.jsonLd);for(let i of a)typeof i!="object"||Object.keys(i).length===0||t.push({"script:ld+json":i});break}case"alternates":{let a=W(r.alternates);for(let n of a){if(!n)continue;let{language:i,url:u,default:c}=n,s=i?`${i}${c?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:s,href:u});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:a,maxSnippet:n,maxVideoPreview:i,noArchive:u,noFollow:c,noImageIndex:s,noIndex:l,noSnippet:y,noTranslate:m,unavailableAfter:d}=r.robots,p=[u&&"noarchive",s&&"noimageindex",y&&"nosnippet",m&&"notranslate",a&&`max-image-preview:${a}`,n&&`max-snippet:${n}`,i&&`max-video-preview:${i}`,d&&`unavailable_after:${d}`],h=(l?"noindex":"index")+","+(c?"nofollow":"follow");for(let g of p)g&&(h+=`,${g}`);t.push({name:"robots",content:h});break}}return t}function bo({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let o=useNavigation().state==="loading",{endCursor:a,hasNextPage:n,hasPreviousPage:i,nextPageUrl:u,nodes:c,previousPageUrl:s,startCursor:l}=Eo(e),y=useMemo(()=>({pageInfo:{endCursor:a,hasPreviousPage:i,hasNextPage:n,startCursor:l},nodes:c}),[a,n,i,l,c]),m=useMemo(()=>forwardRef(function(h,g){return n?createElement(Link,{preventScrollReset:!0,...h,to:u,state:y,replace:!0,ref:g}):null}),[n,u,y]),d=useMemo(()=>forwardRef(function(h,g){return i?createElement(Link,{preventScrollReset:!0,...h,to:s,state:y,replace:!0,ref:g}):null}),[i,s,y]);return t({state:y,hasNextPage:n,hasPreviousPage:i,isLoading:o,nextPageUrl:u,nodes:c,previousPageUrl:s,NextLink:m,PreviousLink:d})}function Me(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Pe(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function Eo(e){e.pageInfo||Pe("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Pe("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Pe("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Pe("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Pe("pageInfo.hasPreviousPage");let t=useNavigate(),{state:r,search:o,pathname:a}=useLocation(),u=new URLSearchParams(o).get("direction")==="previous",c=useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?flattenConnection(e):u?[...flattenConnection(e),...r.nodes]:[...r.nodes,...flattenConnection(e)],[r,e]),s=useMemo(()=>{let d=globalThis?.window?.__hydrogenHydrated,p=!d||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,h=!d||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!d||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,f=!d||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(u?(p=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(h=e.pageInfo.endCursor,f=e.pageInfo.hasNextPage)),{startCursor:p,endCursor:h,hasPreviousPage:g,hasNextPage:f}},[u,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),l=useRef({params:Me(o),pathname:a});useEffect(()=>{window.__hydrogenHydrated=!0;},[]),useEffect(()=>{(Me(o)!==l.current.params||a!==l.current.pathname)&&(l.current={pathname:a,params:Me(o)},t(`${a}?${Me(o)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[a,o]);let y=useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","previous"),s.startCursor&&d.set("cursor",s.startCursor),`?${d.toString()}`},[o,s.startCursor]),m=useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","next"),s.endCursor&&d.set("cursor",s.endCursor),`?${d.toString()}`},[o,s.endCursor]);return {...s,previousPageUrl:y,nextPageUrl:m,nodes:c}}function Oo(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,o=new URLSearchParams(new URL(e.url).search),a=o.get("cursor")??void 0;return (o.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:a??null}:{first:r,endCursor:a??null}}var N=class extends Response{constructor(t,r,o){super(`Bad request: ${t}`,{status:400,headers:o});}};function Ae(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function Do({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:o,debugInfo:a,exchangeForStorefrontCustomerAccessToken:n}){let i=new URLSearchParams,u=e.get(E),c=u?.refreshToken,s=u?.idToken;if(!c)throw new N("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");i.append("grant_type","refresh_token"),i.append("refresh_token",c),i.append("client_id",t);let l={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:o};new Date().getTime();let m=`${r}/auth/oauth/token`,d=await fetch(m,{method:"POST",headers:l,body:i});if(!d.ok){let T=await d.text();throw new Response(T,{status:d.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:p,expires_in:h,refresh_token:g}=await d.json(),f=await yt(p,t,r,o);e.set(E,{accessToken:f,expiresAt:new Date(new Date().getTime()+(h-120)*1e3).getTime()+"",refreshToken:g,idToken:s}),await n();}function ue(e){e.unset(E),e.unset(ie);}async function nr({locks:e,expiresAt:t,session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:n,debugInfo:i,exchangeForStorefrontCustomerAccessToken:u}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=Do({session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:n,debugInfo:i,exchangeForStorefrontCustomerAccessToken:u})),await e.refresh,delete e.refresh;}catch(c){throw ue(r),c&&c.status!==401?c:new N("Unauthorized","Login before querying the Customer Account API.")}}function ir(){let e=xo();return cr(e)}async function sr(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=ko(t);return cr(r)}function xo(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function cr(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function ko(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function ur(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function yt(e,t,r,o,a){let n=t;if(!e)throw new N("Unauthorized","oAuth access token was not provided during token exchange.");let i=new URLSearchParams;i.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),i.append("client_id",n),i.append("audience",Ht),i.append("subject_token",e),i.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),i.append("scopes","https://api.customers.com/auth/customer.graphql");let u={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:o};new Date().getTime();let s=`${r}/auth/oauth/token`,l=await fetch(s,{method:"POST",headers:u,body:i});let y=await l.json();if(y.error)throw new N(y.error_description);return y.access_token}function pr(e){return Lo(e).payload.nonce}function Lo(e){let[t,r,o]=e.split("."),a=JSON.parse(atob(t)),n=JSON.parse(atob(r));return {header:a,payload:n,signature:o}}function Fe(){return Uo(_o())}function _o(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function Uo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var dr="/account/login",No="/account/authorize",lr="/account";function Vo(e){if(!e.url)return dr;let{pathname:t}=new URL(e.url),r=dr+`?${new URLSearchParams({return_to:t}).toString()}`;return Ae(r)}function Mo({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:o=ke,request:a,waitUntil:n,authUrl:i,customAuthStatusHandler:u,logErrors:c=!0,unstableB2b:s=!1}){if(o!==ke&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${ke}.`),!a?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let l=u||(()=>Vo(a)),y=new URL(a.url),m=y.protocol==="http:"?y.origin.replace("http","https"):y.origin,d=it({requestUrl:m,defaultUrl:No,redirectUrl:i}),p=`${r}/account/customer/api/${o}/graphql`,h={};async function g({query:C,type:P,variables:A={}}){let v=await I();if(!v)throw l();new Date().getTime();let D=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ne,Origin:m,Authorization:v},body:JSON.stringify({query:C,variables:A})});let x=await D.text(),k={url:p,response:D,type:P,query:C,queryVariables:A,errors:void 0,client:"customer"};if(!D.ok){if(D.status===401)throw ue(e),l();let b;try{b=z(x);}catch{b=[{message:x}];}ge({...k,errors:b});}try{let b=z(x),{errors:G}=b,le=G?.map(({message:oe,...F})=>new J(oe,{...F,clientOperation:`customerAccount.${k.type}`,requestId:D.headers.get("x-request-id"),queryVariables:A,query:C}));return {...b,...G&&{errors:le}}}catch{ge({...k,errors:[{message:x}]});}}async function f(){if(!r||!t)return !1;let C=e.get(E),P=C?.accessToken,A=C?.expiresAt;if(!P||!A)return !1;let v=q?.();try{await nr({locks:h,expiresAt:A,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:m,debugInfo:{waitUntil:n,stackInfo:v,...Y(a)},exchangeForStorefrontCustomerAccessToken:be});}catch{return !1}return !0}async function T(){if(!await f())throw l()}async function I(){if(await f())return e.get(E)?.accessToken}async function L(C,P){return ve(r,t),C=se(C),_e(C,"customer.mutate"),ce(g({query:C,type:"mutation",...P}),{logErrors:c})}async function _(C,P){return ve(r,t),C=se(C),Le(C,"customer.query"),ce(g({query:C,type:"query",...P}),{logErrors:c})}function re(C){e.set(ie,{...e.get(ie),...C});}async function U(){if(await f())return e.get(ie)}async function be(){if(!s)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:P}=await L(C),A=P?.storefrontCustomerAccessTokenCreate?.customerAccessToken;A&&re({customerAccessToken:A});}return {login:async C=>{ve(r,t);let P=new URL(`${r}/auth/oauth/authorize`),A=ur(),v=Fe();if(P.searchParams.set("client_id",t),P.searchParams.set("scope","openid email"),P.searchParams.append("response_type","code"),P.searchParams.append("redirect_uri",d),P.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),P.searchParams.append("state",A),P.searchParams.append("nonce",v),C?.uiLocales){let[D,x]=C.uiLocales.split("-"),k=D.toLowerCase();x&&(k+=`-${x.toUpperCase()}`),P.searchParams.append("ui_locales",k);}let V=ir(),M=await sr(V);return e.set(E,{...e.get(E),codeVerifier:V,state:A,nonce:v,redirectPath:Ne(a.url)||Ue(a,"Referer")||lr}),P.searchParams.append("code_challenge",M),P.searchParams.append("code_challenge_method","S256"),Ae(P.toString())},logout:async C=>{ve(r,t);let P=e.get(E)?.idToken,A=it({requestUrl:m,defaultUrl:m,redirectUrl:C?.postLogoutRedirectUri}),v=P?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",P],["post_logout_redirect_uri",A]]).toString()}`).toString():A;return ue(e),Ae(v)},isLoggedIn:f,handleAuthStatus:T,getAccessToken:I,getApiUrl:()=>p,mutate:L,query:_,authorize:async()=>{ve(r,t);let C=y.searchParams.get("code"),P=y.searchParams.get("state");if(!C||!P)throw ue(e),new N("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(E)?.state!==P)throw ue(e),new N("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let A=t,v=new URLSearchParams;v.append("grant_type","authorization_code"),v.append("client_id",A),v.append("redirect_uri",d),v.append("code",C);let V=e.get(E)?.codeVerifier;if(!V)throw new N("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");v.append("code_verifier",V);let M={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:m},D=q?.();new Date().getTime();let k=`${r}/auth/oauth/token`,b=await fetch(k,{method:"POST",headers:M,body:v});if(!b.ok)throw new Response(await b.text(),{status:b.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:G,expires_in:le,id_token:oe,refresh_token:F}=await b.json(),ye=e.get(E)?.nonce,kt=await pr(oe);if(ye!==kt)throw new N("Unauthorized",`Returned nonce does not match: ${ye} !== ${kt}`);let Qr=await yt(G,t,r,m,{waitUntil:n,stackInfo:D,...Y(a)}),Gr=e.get(E)?.redirectPath;return e.set(E,{accessToken:Qr,expiresAt:new Date(new Date().getTime()+(le-120)*1e3).getTime()+"",refreshToken:F,idToken:oe}),await be(),Ae(Gr||lr)},UNSTABLE_setBuyer:re,UNSTABLE_getBuyer:U}}function ve(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var Fo="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function qo({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||Fo)}var yr="cartFormInput";function Q({children:e,action:t,inputs:r,route:o,fetcherKey:a}){let n=useFetcher({key:a});return jsxs(n.Form,{action:o||"",method:"post",children:[(t||r)&&jsx("input",{type:"hidden",name:yr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(n):e]})}Q.INPUT_NAME=yr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function Ho(e){let t={};for(let i of e.entries()){let u=i[0],c=e.getAll(u);t[u]=c.length>1?c:i[1];}let{cartFormInput:r,...o}=t,{action:a,inputs:n}=r?JSON.parse(String(r)):{};return {action:a,inputs:{...n,...o}}}Q.getFormInput=Ho;var R=`#graphql
  fragment CartApiError on CartUserError {
    message
    field
    code
  }
`,w=`#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
  }
`;function ft(e){return async(t,r)=>{let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:a,...n}=r||{},{buyerIdentity:i,...u}=t,{cartCreate:c,errors:s}=await e.storefront.mutate(Bo(e.cartFragment),{variables:{input:{...u,buyerIdentity:{...o,...i}},...n}});return S(c,s)}}var Bo=(e=w)=>`#graphql
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
`;function mt({storefront:e,customerAccount:t,getCartId:r,cartFragment:o}){return async a=>{let n=r();if(!n)return null;let[i,{cart:u,errors:c}]=await Promise.all([t?t.isLoggedIn():!1,e.query(Wo(o),{variables:{cartId:n,...a},cache:e.CacheNone()})]);if(i&&u?.checkoutUrl){let s=new URL(u.checkoutUrl);s.searchParams.set("logged_in","true"),u.checkoutUrl=s.toString();}return u||c?S(u,c):null}}var Wo=(e=jo)=>`#graphql
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
`,jo=`#graphql
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
`;function ht(e){return async(t,r)=>{let{cartLinesAdd:o,errors:a}=await e.storefront.mutate(Ko(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var Ko=(e=w)=>`#graphql
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
`;var fr="__h_pending_";function mr(e){return fr+e}function qe(e){return e.startsWith(fr)}function $e(e,t){if(t.some(r=>qe(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function gt(e){return async(t,r)=>{$e("updateLines",t);let{cartLinesUpdate:o,errors:a}=await e.storefront.mutate(zo(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var zo=(e=w)=>`#graphql
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
`;function Ct(e){return async(t,r)=>{$e("removeLines",t);let{cartLinesRemove:o,errors:a}=await e.storefront.mutate(Jo(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return S(o,a)}}var Jo=(e=w)=>`#graphql
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
`;function Pt(e){return async(t,r)=>{let o=t.filter((i,u,c)=>c.indexOf(i)===u),{cartDiscountCodesUpdate:a,errors:n}=await e.storefront.mutate(Yo(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:o,...r}});return S(a,n)}}var Yo=(e=w)=>`#graphql
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
`;function St(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:a,errors:n}=await e.storefront.mutate(Xo(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...o,...t},...r}});return S(a,n)}}var Xo=(e=w)=>`#graphql
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
`;function At(e){return async(t,r)=>{let{cartNoteUpdate:o,errors:a}=await e.storefront.mutate(Zo(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return S(o,a)}}var Zo=(e=w)=>`#graphql
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
`;function vt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:o,errors:a}=await e.storefront.mutate(ea(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return S(o,a)}}var ea=(e=w)=>`#graphql
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
`;function Tt(e){return async(t,r)=>{let{cartAttributesUpdate:o,errors:a}=await e.storefront.mutate(ta(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return S(o,a)}}var ta=(e=w)=>`#graphql
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
`;function It(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),a=t.map(u=>({...u,ownerId:o})),{cartMetafieldsSet:n,errors:i}=await e.storefront.mutate(ra(),{variables:{metafields:a}});return S({cart:{id:o},...n},i)}}var ra=()=>`#graphql
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
`;function Rt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),{cartMetafieldDelete:a,errors:n}=await e.storefront.mutate(oa(),{variables:{input:{ownerId:o,key:t}}});return S({cart:{id:o},...a},n)}}var oa=()=>`#graphql
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
`;var na=e=>{let t=parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var sa=e=>t=>{let r=new Headers;return r.append("Set-Cookie",stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function ca(e){let{getCartId:t,setCartId:r,storefront:o,customerAccount:a,cartQueryFragment:n,cartMutateFragment:i}=e,u=t(),c=()=>u||t(),s={storefront:o,getCartId:c,cartFragment:i,customerAccount:a},l=ft(s),y=async function(...d){let p=await l(...d);return u=p?.cart?.id,p},m={get:mt({storefront:o,customerAccount:a,getCartId:c,cartFragment:n}),getCartId:c,setCartId:r,create:y,addLines:async(d,p)=>{let h=d.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return u||p?.cartId?await ht(s)(h,p):await y({lines:h},p)},updateLines:gt(s),removeLines:Ct(s),updateDiscountCodes:async(d,p)=>u||p?.cartId?await Pt(s)(d,p):await y({discountCodes:d},p),updateBuyerIdentity:async(d,p)=>u||p?.cartId?await St(s)(d,p):await y({buyerIdentity:d},p),updateNote:async(d,p)=>u||p?.cartId?await At(s)(d,p):await y({note:d},p),updateSelectedDeliveryOption:vt(s),updateAttributes:async(d,p)=>u||p?.cartId?await Tt(s)(d,p):await y({attributes:d},p),setMetafields:async(d,p)=>u||p?.cartId?await It(s)(d,p):await y({metafields:d},p),deleteMetafield:Rt(s)};return "customMethods"in e?{...m,...e.customMethods??{}}:m}function pa(e){let t=useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},o=r.lines.nodes,a=!1;for(let{formData:n}of t){if(!n)continue;let i=Q.getFormInput(n);if(i.action===Q.ACTIONS.LinesAdd)for(let u of i.inputs.lines){if(!u.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let c=o.find(s=>s.merchandise.id===u.selectedVariant?.id);a=!0,c?(c.quantity=(c.quantity||1)+(u.quantity||1),c.isOptimistic=!0):o.unshift({id:mr(u.selectedVariant.id),merchandise:u.selectedVariant,isOptimistic:!0,quantity:u.quantity||1});}else if(i.action===Q.ACTIONS.LinesRemove)for(let u of i.inputs.lineIds){let c=o.findIndex(s=>s.id===u);if(c!==-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${u}' but it doesn't exist in the cart`);}else if(i.action===Q.ACTIONS.LinesUpdate)for(let u of i.inputs.lines){let c=o.findIndex(s=>u.id===s.id);if(c>-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}o[c].quantity=u.quantity,o[c].quantity===0&&o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${u.id}' but it doesn't exist in the cart`);}}return a&&(r.isOptimistic=a),r}function ha({handle:e,options:t=[],variants:r=[],productPath:o="products",waitForNavigation:a=!1,children:n}){let i=r instanceof Array?r:flattenConnection(r),{searchParams:u,path:c,alreadyOnProductPage:s}=Ca(e,o,a),l=t.filter(y=>y?.values?.length===1);return createElement(Fragment,null,...useMemo(()=>t.map(y=>{let m,d=[];for(let p of y.values){let h=new URLSearchParams(s?u:void 0);h.set(y.name,p),l.forEach(L=>{h.set(L.name,L.values[0]);});let g=i.find(L=>L?.selectedOptions?.every(_=>h.get(_?.name)===_?.value)),f=u.get(y.name),T=f?f===p:!1;T&&(m=p);let I="?"+h.toString();d.push({value:p,isAvailable:g?g.availableForSale:!0,to:c+I,search:I,isActive:T,variant:g});}return n({option:{name:y.name,value:m,values:d}})}),[t,i,n]))}var ga=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((o,a)=>{r.push({name:a,value:o});}),r};function Ca(e,t,r){let{pathname:o,search:a}=useLocation(),n=useNavigation();return useMemo(()=>{let i=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o),u=i&&i.length>0;t=t.startsWith("/")?t.substring(1):t;let c=u?`${i[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||n.state!=="loading"?a:n.location.search),alreadyOnProductPage:c===o,path:c}},[o,a,r,e,t,n])}function va(e,t){let r=useNavigation(),[o,a]=useState([]);if(useEffect(()=>{Promise.resolve(t).then(n=>{n&&a(n instanceof Array?n:n.product?.variants?.nodes||[]);}).catch(n=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:n}));});},[t]),r.state==="loading"){let n=new URLSearchParams(r.location.search),i=!1,u=o.find(c=>c.selectedOptions?c.selectedOptions.every(s=>n.get(s.name)===s.value):(i||(i=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(u)return {...e,isOptimistic:!0,selectedVariant:u}}return e}var gr=createContext(void 0),ba=gr.Provider,wt=()=>useContext(gr);function Ea(e){let t=Fe(),r=Oa(t,e);return {nonce:t,header:r,NonceProvider:({children:a})=>createElement(ba,{value:t},a)}}function Oa(e,t){let{shop:r,...o}=t??{},a=`'nonce-${e}'`,n=["'self'","'unsafe-inline'","https://cdn.shopify.com"],i=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&i.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&i.push(`https://${r.storeDomain}`);let c={baseUri:["'self'"],defaultSrc:["'self'",a,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:n,connectSrc:i},s=Object.assign({},c,o);for(let l in c){let y=o[l];l&&y&&(s[l]=Da(y,c[l]));}return s.scriptSrc instanceof Array&&!s.scriptSrc.includes(a)?s.scriptSrc.push(a):s.defaultSrc instanceof Array&&!s.defaultSrc.includes(a)&&s.defaultSrc.push(a),wa({directives:s})}function Da(e,t){let r=typeof t=="string"?[t]:t,o=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(n=>n==="'none'")?o:[...o,...r]:r}var ka=forwardRef((e,t)=>{let r=wt();return jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function Ua(e){let t=useFetchers(),r={};for(let{formData:o}of t)if(o?.get("optimistic-identifier")===e)try{if(o.has("optimistic-data")){let a=JSON.parse(String(o.get("optimistic-data")));Object.assign(r,a);}}catch{}return r}function Na({id:e,data:t}){return jsxs(Fragment$1,{children:[jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function qa(e){return jsx(ShopPayButton,{channel:"hydrogen",...e})}function pe(e){let{type:t,data:r={},customData:o}=e,a=useLocation(),{publish:n,cart:i,prevCart:u,shop:c,customData:s}=Z(),l=a.pathname+a.search,y={...r,customData:{...s,...o},cart:i,prevCart:u,shop:c};return useEffect(()=>{c?.shopId&&(y={...y,url:window.location.href},n(t,y));},[n,l,c?.shopId]),null}function Pr(e){return jsx(pe,{...e,type:"page_viewed"})}function Sr(e){return jsx(pe,{...e,type:"product_viewed"})}function Ar(e){return jsx(pe,{...e,type:"collection_viewed"})}function vr(e){return jsx(pe,{...e,type:"cart_viewed"})}function Tr(e){return jsx(pe,{...e,type:"search_viewed"})}function Ir(e){return jsx(pe,{...e})}var ee={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var Wa="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",ja="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function wr(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function bt(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:o,...a}=e,n=useRef(!1),i=useLoadScript(t?ja:Wa,{attributes:{id:"customer-privacy-api"}});useEffect(()=>{let u=c=>{r&&r(c.detail);};return document.addEventListener("visitorConsentCollected",u),()=>{document.removeEventListener("visitorConsentCollected",u);}},[r]),useEffect(()=>{if(i!=="done"||n.current)return;n.current=!0;let{checkoutDomain:u,storefrontAccessToken:c}=a;u||wr("checkoutDomain"),c||wr("storefrontAccessToken"),(c.startsWith("shpat_")||c.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let s={checkoutRootDomain:u,storefrontAccessToken:c};if(u){let m=window.document.location.host,d=u.split(".").reverse(),p=m.split(".").reverse(),h=[];d.forEach((g,f)=>{g===p[f]&&h.push(g);}),m=h.reverse().join("."),m&&(s.storefrontRootDomain=m);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(s),!window.Shopify?.customerPrivacy)return;let l=window.Shopify.customerPrivacy.setTrackingConsent;function y(m,d){l({...m,headlessStorefront:!0,...s},d);}window.Shopify.customerPrivacy.setTrackingConsent=y,o&&o();},[i,t,a]);}function Et(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function Ya(){let e=Et();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function Er({consent:e,onReady:t,domain:r}){let{subscribe:o,register:a,canTrack:n}=Z(),[i,u]=useState(!1),[c,s]=useState(!1),{ready:l}=a("Internal_Shopify_Analytics"),{ready:y}=a("Internal_Shopify_CustomerPrivacy"),m=()=>{i&&c&&t();},d=()=>{s(!0),y(),m();},{checkoutDomain:p,storefrontAccessToken:h,withPrivacyBanner:g}=e;return bt({checkoutDomain:p||"mock.shop",storefrontAccessToken:h||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:d,onReady:()=>{setTimeout(d,3e3);}}),useShopifyCookies({hasUserConsent:i&&c?n():!0,domain:r,checkoutDomain:p}),useEffect(()=>{o(ee.PAGE_VIEWED,Za),o(ee.PRODUCT_VIEWED,en),o(ee.COLLECTION_VIEWED,tn),o(ee.SEARCH_VIEWED,rn),o(ee.PRODUCT_ADD_TO_CART,on),l(),u(!0),m();},[o,l]),null}function He(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function Re(e){let t=Ya(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){He("shopId");return}if(!e?.shop?.acceptedLanguage){He("acceptedLanguage");return}if(!e?.shop?.currency){He("currency");return}if(!e?.shop?.hydrogenSubchannelId){He("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function Xa(e,t){if(t===null)return;let r=Re(e);return r?{...r,cartId:t.id}:void 0}var j={};function Za(e){let t=Re(e);t&&(sendShopifyAnalytics({eventName:AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...j}}),j={});}function en(e){let t=Re(e);if(t&&Or({type:"product",products:e.products})){let r=Ot(e.products);j={pageType:AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...j,products:Ot(e.products)},sendShopifyAnalytics({eventName:AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function tn(e){let t=Re(e);t&&(j={pageType:AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...j,collectionHandle:e.collection.handle},sendShopifyAnalytics({eventName:AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function rn(e){let t=Re(e);t&&(j={pageType:AnalyticsPageType.search},t={...t,...j,searchString:e.searchTerm},sendShopifyAnalytics({eventName:AnalyticsEventName.SEARCH_VIEW,payload:t}));}function on(e){let{cart:t,currentLine:r}=e,o=Xa(e,t);!o||!r?.id||an({matchedLine:r,eventPayload:o});}function an({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};Or({type:"cart",products:[r]})&&sendShopifyAnalytics({eventName:AnalyticsEventName.ADD_TO_CART,payload:{...t,products:Ot([r])}});}function te(e,t,r,o){if(e==="cart"){let a=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${a}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${a}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let a=`${o||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${a}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${a}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function Or({type:e,products:t}){return !t||t.length===0?(te(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return te(e,"id",!1),!1;if(!r.title)return te(e,"title",!1),!1;if(!r.price)return te(e,"price.amount",!0,"price"),!1;if(!r.vendor)return te(e,"vendor",!1),!1;if(!r.variantId)return te(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return te(e,"title",!0,"variantTitle"),!1}),!0)}function Ot(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function kr(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function Lr({cart:e,setCarts:t}){let{publish:r,shop:o,customData:a,canTrack:n,cart:i,prevCart:u}=Z(),c=useRef(null);return useEffect(()=>{if(e)return Promise.resolve(e).then(s=>{if(s&&s.lines){if(!s.id){kr("id");return}if(!s.updatedAt){kr("updatedAt");return}}t(({cart:l,prevCart:y})=>s?.updatedAt!==l?.updatedAt?{cart:s,prevCart:l}:{cart:l,prevCart:y});}),()=>{}},[t,e]),useEffect(()=>{if(!i||!i?.updatedAt||i?.updatedAt===u?.updatedAt)return;let s;try{s=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{s=null;}if(i.id===s?.id&&i.updatedAt===s?.updatedAt)return;let l={eventTimestamp:Date.now(),cart:i,prevCart:u,shop:o,customData:a};if(i.updatedAt===c.current)return;c.current=i.updatedAt,r("cart_updated",l),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:i.id,updatedAt:i.updatedAt}));let y=u?.lines?flattenConnection(u?.lines):[],m=i.lines?flattenConnection(i.lines):[];y?.forEach(d=>{let p=m.filter(h=>d.id===h.id);if(p?.length===1){let h=p[0];d.quantity<h.quantity?r("product_added_to_cart",{...l,prevLine:d,currentLine:h}):d.quantity>h.quantity&&r("product_removed_from_cart",{...l,prevLine:d,currentLine:h});}else r("product_removed_from_cart",{...l,prevLine:d});}),m?.forEach(d=>{let p=y.filter(h=>d.id===h.id);(!p||p.length===0)&&r("product_added_to_cart",{...l,currentLine:d});});},[i,u,r,o,a,n]),null}var ln={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},Fr=createContext(ln),Ge=new Map,we={};function qr(){return Object.values(we).every(Boolean)}function _r(e,t){Ge.has(e)||Ge.set(e,new Map),Ge.get(e)?.set(t.toString(),t);}var Be=new Map;function Ur(e,t){if(!qr()){Be.set(e,t);return}$r(e,t);}function $r(e,t){(Ge.get(e)??new Map).forEach((r,o)=>{try{r(t);}catch(a){typeof a=="object"&&a instanceof Error?console.error("Analytics publish error",a.message,o,a.stack):console.error("Analytics publish error",a,o);}});}function Nr(e){return we.hasOwnProperty(e)||(we[e]=!1),{ready:()=>{we[e]=!0,qr()&&Be.size>0&&(Be.forEach((t,r)=>{$r(r,t);}),Be.clear());}}}function Vr(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function Mr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function yn({canTrack:e,cart:t,children:r,consent:o,customData:a={},shop:n=null,disableThrowOnError:i=!1,cookieDomain:u}){let c=useRef(!1),{shop:s}=fn(n),[l,y]=useState(!!e),[m,d]=useState({cart:null,prevCart:null}),[p,h]=useState(e?()=>e:()=>Vr);if(s)if(/\/68817551382$/.test(s.shopId))Wt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!o.checkoutDomain){let f=Mr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");at(f);}if(!o.storefrontAccessToken){let f=Mr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");at(f);}}let g=useMemo(()=>({canTrack:p,...m,customData:a,publish:p()?Ur:()=>{},shop:s,subscribe:_r,register:Nr}),[l,p(),p,JSON.stringify(p),m,m.cart?.updatedAt,m.prevCart,Ur,_r,a,s,Nr,JSON.stringify(we)]);return jsxs(Fr.Provider,{value:g,children:[r,!!s&&jsx(Pr,{}),!!s&&!!t&&jsx(Lr,{cart:t,setCarts:d}),!!s&&o.checkoutDomain&&jsx(Er,{consent:o,onReady:()=>{c.current=!0,y(!0),h(()=>Vr);},domain:u})]})}function Z(){let e=useContext(Fr);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function fn(e){let[t,r]=useState(null);return useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function mn({storefront:e,publicStorefrontId:t="0"}){return e.query(hn,{cache:e.CacheLong()}).then(({shop:r,localization:o})=>({shopId:r.id,acceptedLanguage:o.language.isoCode,currency:o.country.currency.isoCode,hydrogenSubchannelId:t}))}var hn=`#graphql
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
`,gn={CartView:vr,CollectionView:Ar,CustomView:Ir,ProductView:Sr,Provider:yn,SearchView:Tr};var An=function(e){return jsx(RichText,{...e,components:{link:({node:t})=>jsx(Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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

export { gn as Analytics, ee as AnalyticsEvent, Je as CacheCustom, ze as CacheLong, je as CacheNone, K as CacheShort, Q as CartForm, nt as InMemoryCache, Na as OptimisticInput, bo as Pagination, An as RichText, ka as Script, Ao as Seo, qa as ShopPayButton, ha as VariantSelector, Tt as cartAttributesUpdateDefault, St as cartBuyerIdentityUpdateDefault, ft as cartCreateDefault, Pt as cartDiscountCodesUpdateDefault, mt as cartGetDefault, na as cartGetIdDefault, ht as cartLinesAddDefault, Ct as cartLinesRemoveDefault, gt as cartLinesUpdateDefault, Rt as cartMetafieldDeleteDefault, It as cartMetafieldsSetDefault, At as cartNoteUpdateDefault, vt as cartSelectedDeliveryOptionsUpdateDefault, sa as cartSetIdDefault, qo as changelogHandler, ca as createCartHandler, Ea as createContentSecurityPolicy, Mo as createCustomerAccountClient, ri as createStorefrontClient, so as createWithCache, S as formatAPIResult, fe as generateCacheControlHeader, Et as getCustomerPrivacy, Oo as getPaginationVariables, ga as getSelectedProductOptions, vo as getSeoMeta, mn as getShopAnalytics, lo as graphiqlLoader, uo as storefrontRedirect, Z as useAnalytics, bt as useCustomerPrivacy, wt as useNonce, pa as useOptimisticCart, Ua as useOptimisticData, va as useOptimisticProduct };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map