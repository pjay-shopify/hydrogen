import { createStorefrontClient, SHOPIFY_STOREFRONT_ID_HEADER, getShopifyCookies, SHOPIFY_Y, SHOPIFY_STOREFRONT_Y_HEADER, SHOPIFY_S, SHOPIFY_STOREFRONT_S_HEADER, flattenConnection, ShopPayButton, useLoadScript, RichText, useShopifyCookies, sendShopifyAnalytics, AnalyticsEventName, AnalyticsPageType, getClientBrowserParameters } from '@shopify/hydrogen-react';
export { AnalyticsEventName, AnalyticsPageType, ExternalVideo, IMAGE_FRAGMENT, Image, MediaFile, ModelViewer, Money, ShopifySalesChannel, Video, customerAccountApiCustomScalars, flattenConnection, getClientBrowserParameters, getShopifyCookies, parseGid, parseMetafield, sendShopifyAnalytics, storefrontApiCustomScalars, useLoadScript, useMoney, useShopifyCookies } from '@shopify/hydrogen-react';
import { lazy, createContext, forwardRef, useMemo, createElement, Suspense, Fragment, useRef, useEffect, useState, useContext } from 'react';
import { useMatches, useLocation, useNavigation, Link, useNavigate, useFetcher, useFetchers } from '@remix-run/react';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { parse, stringify } from 'worktop/cookie';
import Ea from 'content-security-policy-builder';

var Oe="public",jr="private",Ke="no-store",_t={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function he(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):_t[r]&&t.push(`${_t[r]}=${e[r]}`);}),t.join(", ")}function Je(){return {mode:Ke}}function ze(e){if(e?.mode&&e?.mode!==Oe&&e?.mode!==jr)throw Error("'mode' must be either 'public' or 'private'")}function J(e){return ze(e),{mode:Oe,maxAge:1,staleWhileRevalidate:9,...e}}function Ye(e){return ze(e),{mode:Oe,maxAge:3600,staleWhileRevalidate:82800,...e}}function ne(e){return ze(e),{mode:Oe,maxAge:1,staleWhileRevalidate:86399,...e}}function Xe(e){return e}function z(e){return String(e).includes("__proto__")?JSON.parse(e,Kr):JSON.parse(e)}function Kr(e,t){if(e!=="__proto__")return t}function xe(e,t){return e&&t?{...e,...t}:e||ne()}function Ze(e){return he(xe(e))}async function Jr(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function zr(e,t,r,a){if(!e)return;let o=xe(a),i=Ze(xe(o,{maxAge:(o.maxAge||0)+(o.staleWhileRevalidate||0)})),n=Ze(xe(o));r.headers.set("cache-control",i),r.headers.set("real-cache-control",n),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function Yr(e,t){e&&await e.delete(t);}function Xr(e,t){let r=e.headers.get("real-cache-control"),a=0;if(r){let i=r.match(/max-age=(\d*)/);i&&i.length>1&&(a=parseFloat(i[1]));}return [(Date.now()-Number(t))/1e3,a]}function Zr(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[a,o]=Xr(t,r),i=a>o;return i}var De={get:Jr,set:zr,delete:Yr,generateDefaultCacheControlHeader:Ze,isStale:Zr};function ge(e){return `https://shopify.dev/?${e}`}function eo(e){return e||ne()}async function Ut(e,t){if(!e)return;let r=ge(t),a=new Request(r),o=await De.get(e,a);if(!o)return;let i=await o.text();try{return [z(i),o]}catch{return [i,o]}}async function Nt(e,t,r,a){if(!e)return;let o=ge(t),i=new Request(o),n=new Response(JSON.stringify(r));await De.set(e,i,n,eo(a));}function Vt(e,t){return De.isStale(new Request(ge(e)),t)}function Mt(e){let t=Array.isArray(e)?e:[e],r="";for(let a of t)a!=null&&(typeof a=="object"?r+=JSON.stringify(a):r+=a.toString());return encodeURIComponent(r)}var et=new Set;async function ke(e,t,{strategy:r=J(),cacheInstance:a,shouldCacheResult:o=()=>!0,waitUntil:i,debugInfo:n,spanEmitter:c=()=>{}}){let u=Date.now(),s=Mt([...typeof e=="string"?[e]:e]),d,l,m=h=>{l={displayName:h.displayName,url:h.response?.url,responseInit:{status:h.response?.status||0,statusText:h.response?.statusText||"",headers:Array.from(h.response?.headers.entries()||[])}};},p=()=>({...d,...n,url:l?.url||n?.url||d?.url||ge(s),displayName:n?.displayName||l?.displayName||d?.displayName}),y=void 0;if(!a||!r||r.mode===Ke){let h=await t({addDebugData:m});return c(p(),u),h}let f=h=>Nt(a,s,{value:h,debugInfo:void 0},r),g=await Ut(a,s);if(g&&typeof g[0]!="string"){let[{value:h,debugInfo:I},b]=g;d=I;let V=Vt(s,b)?"STALE":"HIT";if(!et.has(s)&&V==="STALE"){et.add(s);let M=Promise.resolve().then(async()=>{let oe=Date.now();try{let k=await t({addDebugData:m});if(c(p(),oe),o(k)){let C=Date.now();await f(k),c(p(),C,"PUT"),y?.({result:k,cacheStatus:"PUT",overrideStartTime:oe});}}catch(k){k.message&&(k.message="SWR in sub-request failed: "+k.message),console.error(k);}finally{et.delete(s);}});i?.(M);}return c(p(),u,V),h}let P=await t({addDebugData:m});if(c(p(),u,"MISS"),o(P)){let h=Promise.resolve().then(async()=>{let I=Date.now();await f(P),c(p(),I,"PUT");});i?.(h);}return P}function qt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function Ft([e,t]){return [e,new Response(e,t)]}var $t=(e,t)=>!e?.errors&&t.status<400;async function Ht(e,t,{cacheInstance:r,cache:a,cacheKey:o=[e,t],shouldCacheResponse:i=()=>!0,waitUntil:n,returnType:c="json",debugInfo:u,spanEmitter:s}={}){return !a&&(!t.method||t.method==="GET")&&(a=J()),ke(o,async()=>{let d=await fetch(e,t),l;try{l=await d[c]();}catch{try{l=await d.text();}catch{return qt("",d)}}return qt(l,d)},{cacheInstance:r,waitUntil:n,strategy:a??null,debugInfo:u,shouldCacheResult:d=>i(...Ft(d)),spanEmitter:s}).then(Ft)}var Ce="2024.4.3";var tt="Custom-Storefront-Request-Group-ID",rt="X-Shopify-Storefront-Access-Token",ot="X-SDK-Variant",at="X-SDK-Variant-Source",nt="X-SDK-Version",Le="2024-04",ie=`Shopify Hydrogen ${Ce}`,Qt="30243aa5-17c1-465a-8493-944bcc4e88aa",x="customerAccount",se="buyer";function Gt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var Bt=new Set,jt=e=>{Bt.has(e)||(console.warn(e),Bt.add(e));},Wt=new Set,it=e=>{Wt.has(e)||(console.error(new Error(e)),Wt.add(e));};function ce(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var to=/(^|}\s)query[\s({]/im,ro=/(^|}\s)mutation[\s({]/im;function _e(e,t){if(!to.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function Ue(e,t){if(!ro.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var Y=class extends Error{locations;path;extensions;constructor(t,r={}){let o=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(o),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function Se({url:e,response:t,errors:r,type:a,query:o,queryVariables:i,ErrorConstructor:n=Error,client:c="storefront"}){let u=(typeof r=="string"?r:r?.map?.(d=>d.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,s=new Y(u,{query:o,queryVariables:i,cause:{errors:r},clientOperation:`${c}.${a}`,requestId:t.headers.get("x-request-id")});throw new n(s.message,{cause:s.cause})}function ue(e,t={}){let r=new Error,a=(o,i="Error")=>{let n=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(c,u)=>c.replace(u,""));return `${i}: ${o}
`+n};return e.then(o=>{if(o?.errors&&Array.isArray(o.errors)){let i=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;o.errors.forEach(n=>{n&&(n.stack=a(n.message,n.name),i(n)&&console.error(n));});}return o}).catch(o=>{throw o&&(o.stack=a(o.message,o.name)),o})}var F=void 0;var co={language:"EN",country:"US"};function si(e){let {storefrontHeaders:t,cache:r,waitUntil:a,i18n:o,storefrontId:i,logErrors:n=!0,spanEmitter:c,...u}=e,{getPublicTokenHeaders:d,getPrivateTokenHeaders:l,getStorefrontApiUrl:m,getShopifyDomain:p}=createStorefrontClient(u),f=(u.privateStorefrontToken?l:d)({contentType:"json",buyerIp:t?.buyerIp||""});if(f[tt]=t?.requestGroupId||Gt(),i&&(f[SHOPIFY_STOREFRONT_ID_HEADER]=i),(f["user-agent"]=`Hydrogen ${Ce}`),t&&t.cookie){let h=getShopifyCookies(t.cookie??"");h[SHOPIFY_Y]&&(f[SHOPIFY_STOREFRONT_Y_HEADER]=h[SHOPIFY_Y]),h[SHOPIFY_S]&&(f[SHOPIFY_STOREFRONT_S_HEADER]=h[SHOPIFY_S]);}let g=JSON.stringify({"content-type":f["content-type"],"user-agent":f["user-agent"],[ot]:f[ot],[at]:f[at],[nt]:f[nt],[rt]:f[rt]});async function P({query:h,mutation:I,variables:b,cache:V,headers:M=[],storefrontApiVersion:oe,displayName:k,stackInfo:C}){let S=M instanceof Headers?Object.fromEntries(M.entries()):Array.isArray(M)?Object.fromEntries(M):M,v=h??I,T={...b};o&&(!b?.country&&/\$country/.test(v)&&(T.country=o.country),!b?.language&&/\$language/.test(v)&&(T.language=o.language));let _=m({storefrontApiVersion:oe}),G=JSON.stringify({query:v,variables:T}),O={method:"POST",headers:{...f,...S},body:G},N=[_,O.method,g,O.body],[L,E]=await Ht(_,O,{cacheInstance:I?void 0:r,cache:V||ne(),cacheKey:N,shouldCacheResponse:$t,waitUntil:a,debugInfo:{requestId:O.headers[tt],displayName:k,url:_,stackInfo:C,graphql:G,purpose:t?.purpose},spanEmitter:c}),q={url:_,response:E,type:I?"mutation":"query",query:v,queryVariables:T,errors:void 0};if(!E.ok){let B;try{B=z(L);}catch{B=[{message:L}];}Se({...q,errors:B});}let{data:ye,errors:ae}=L,fe=ae?.map(({message:B,...me})=>new Y(B,{...me,clientOperation:`storefront.${q.type}`,requestId:E.headers.get("x-request-id"),queryVariables:T,query:v}));return A(ye,fe)}return {storefront:{query(h,I){h=ce(h),_e(h,"storefront.query");let b=zt?.(h);return ue(P({...I,query:h,stackInfo:F?.(b)}),{stackOffset:b,logErrors:n})},mutate(h,I){h=ce(h),Ue(h,"storefront.mutate");let b=zt?.(h);return ue(P({...I,mutation:h,stackInfo:F?.(b)}),{stackOffset:b,logErrors:n})},cache:r,CacheNone:Je,CacheLong:Ye,CacheShort:J,CacheCustom:Xe,generateCacheControlHeader:he,getPublicTokenHeaders:d,getPrivateTokenHeaders:l,getShopifyDomain:p,getApiUrl:m,i18n:o??co}}}var zt=void 0;function A(e,t){return {...e,...t&&{errors:t}}}function Ne(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function X(e){return {requestId:e?Ne(e,"request-id"):void 0,purpose:e?Ne(e,"purpose"):void 0}}function uo({cache:e,waitUntil:t,request:r}){return function(o,i,n){return ke(o,n,{strategy:i,cacheInstance:e,waitUntil:t,debugInfo:{...X(r),stackInfo:F?.()}})}}var st=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:a,timestamp:o,...i}=r,n=new Headers(i.headers),c=n.get("cache-control")||n.get("real-cache-control")||"",u=parseInt(c.match(/max-age=(\d+)/)?.[1]||"0",10),s=parseInt(c.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),d=(Date.now()-o)/1e3;if(d>u+s){this.#e.delete(t.url);return}let m=d>u;return n.set("cache",m?"STALE":"HIT"),n.set("date",new Date(o).toUTCString()),new Response(a,{status:i.status??200,headers:n})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let a of this.#e.keys())(!t||t.url===a)&&r.push(new Request(a));return Promise.resolve(r)}};function Ve(e){if(!e)return;let{pathname:t,search:r}=new URL(e),a=t+r,o=new URLSearchParams(r),i=o.get("return_to")||o.get("redirect");if(i){if(Xt(e,i))return i;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${a} to ${i}`);}}function Xt(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function ct({requestUrl:e,defaultUrl:t,redirectUrl:r}){let a=e,o=Yt(e,t),i=r?Yt(e,r):o;return Xt(e,i.toString())?i.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${a} to ${i}. Default url ${o} is used instead.`),o.toString())}function Yt(e,t){return po(t)?new URL(t):new URL(t,new URL(e).origin)}function po(e){try{return new URL(e),!0}catch{return !1}}async function lo(e){let{storefront:t,request:r,noAdminRedirect:a,matchQueryParams:o,response:i=new Response("Not Found",{status:404})}=e,n=new URL(r.url),{pathname:c,searchParams:u}=n,s=u.has("_data");u.delete("redirect"),u.delete("return_to"),u.delete("_data");let d=(o?n.toString().replace(n.origin,""):c).toLowerCase();if(n.pathname==="/admin"&&!a)return pt(`${t.getShopifyDomain()}/admin`,s,u,o);try{let{urlRedirects:l}=await t.query(yo,{variables:{query:"path:"+d.replace(/\/+$/,"")}}),m=l?.edges?.[0]?.node?.target;if(m)return pt(m,s,u,o);let p=Ve(r.url);if(p)return pt(p,s,u,o)}catch(l){console.error(`Failed to fetch redirects from Storefront API for route ${d}`,l);}return i}var ut="https://example.com";function pt(e,t,r,a){let o=new URL(e,ut);if(!a)for(let[i,n]of r)o.searchParams.append(i,n);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":o.toString().replace(ut,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:o.toString().replace(ut,"")}})}var yo=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var fo=async function({request:t,context:r}){let a=r.storefront,o=r.customerAccount,i=new URL(t.url);if(!a)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let n={};if(a){let s="X-Shopify-Storefront-Access-Token";n.storefront={name:"Storefront API",authHeader:s,accessToken:a.getPublicTokenHeaders()[s],apiUrl:a.getApiUrl(),icon:"SF"};}if(o){let s=await(await fetch(i.origin+"/graphiql/customer-account.schema.json")).json(),d=await o.getAccessToken();s&&(n["customer-account"]={name:"Customer Account API",value:s,authHeader:"Authorization",accessToken:d,apiUrl:o.getApiUrl(),icon:"CA"});}let c="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",u=String.raw;return new Response(u`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>GraphiQL</title>
          <link rel="icon" type="image/x-icon" href="${c}" />
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
    `,{status:200,headers:{"content-type":"text/html"}})};var mo={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},ho=/[&><\u2028\u2029]/g;function Zt(e){return e.replace(ho,t=>mo[t])}var W="Error in SEO input: ",$={title:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(W.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(W.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(W.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(W.concat("`handle` should start with `@`"));return e}}};function er(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let a=H($.title,e.title),o=lt(e?.titleTemplate,a);if(!o)break;t.push(D("title",{title:o}),D("meta",{property:"og:title",content:o}),D("meta",{name:"twitter:title",content:o}));break}case"description":{let a=H($.description,e.description);if(!a)break;t.push(D("meta",{name:"description",content:a}),D("meta",{property:"og:description",content:a}),D("meta",{name:"twitter:description",content:a}));break}case"url":{let a=H($.url,e.url);if(!a)break;let i=a.split("?")[0].replace(/\/$/,"");t.push(D("link",{rel:"canonical",href:i}),D("meta",{property:"og:url",content:i}));break}case"handle":{let a=H($.handle,e.handle);if(!a)break;t.push(D("meta",{name:"twitter:site",content:a}),D("meta",{name:"twitter:creator",content:a}));break}case"media":{let a,o=j(e.media);for(let i of o)if(typeof i=="string"&&t.push(D("meta",{name:"og:image",content:i})),i&&typeof i=="object"){let n=i.type||"image",c=i?{url:i?.url,secure_url:i?.url,type:yt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let u of Object.keys(c))c[u]&&(a=c[u],t.push(D("meta",{property:`og:${n}:${u}`,content:a},c.url)));}break}case"jsonLd":{let a=j(e.jsonLd),o=0;for(let i of a){if(typeof i!="object")continue;let n=D("script",{type:"application/ld+json",children:JSON.stringify(i,(c,u)=>typeof u=="string"?Zt(u):u)},`json-ld-${i?.["@type"]||i?.name||o++}`);t.push(n);}break}case"alternates":{let a=j(e.alternates);for(let o of a){if(!o)continue;let{language:i,url:n,default:c}=o,u=i?`${i}${c?"-default":""}`:void 0;t.push(D("link",{rel:"alternate",hrefLang:u,href:n}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:a,maxSnippet:o,maxVideoPreview:i,noArchive:n,noFollow:c,noImageIndex:u,noIndex:s,noSnippet:d,noTranslate:l,unavailableAfter:m}=e.robots,p=[n&&"noarchive",u&&"noimageindex",d&&"nosnippet",l&&"notranslate",a&&`max-image-preview:${a}`,o&&`max-snippet:${o}`,i&&`max-video-preview:${i}`,m&&`unavailable_after:${m}`],y=(s?"noindex":"index")+","+(c?"nofollow":"follow");for(let f of p)f&&(y+=`,${f}`);t.push(D("meta",{name:"robots",content:y}));break}}return t.flat().sort((r,a)=>r.key.localeCompare(a.key))}function D(e,t,r){let a={tag:e,props:{},key:""};return e==="title"?(a.children=t.title,a.key=dt(a),a):e==="script"?(a.children=typeof t.children=="string"?t.children:"",a.key=dt(a,r),delete t.children,a.props=t,a):(a.props=t,Object.keys(a.props).forEach(o=>!a.props[o]&&delete a.props[o]),a.key=dt(a,r),a)}function dt(e,t){let{tag:r,props:a}=e;if(r==="title")return "0-title";if(r==="meta"){let o=a.content===t&&typeof a.property=="string"&&!a.property.endsWith("secure_url")&&"0";return [r,...[t,o],a.property||a.name].filter(n=>n).join("-")}return r==="link"?[r,a.rel,a.hrefLang||a.media].filter(i=>i).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${a.type}`}function lt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function yt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function j(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var vo=lazy(()=>import('./log-seo-tags-TY72EQWZ.js'));function To({debug:e}){let t=useMatches(),r=useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let a=useMemo(()=>t.flatMap(n=>{let{handle:c,...u}=n,s={...u,...r},d=c?.seo,l=u?.data?.seo;return !d&&!l?[]:d?Me(d,s):[l]}).reduce((n,c)=>{Object.keys(c).forEach(s=>!c[s]&&delete c[s]);let{jsonLd:u}=c;return u?n?.jsonLd?Array.isArray(u)?{...n,...c,jsonLd:[...n.jsonLd,...u]}:{...n,...c,jsonLd:[...n.jsonLd,u]}:{...n,...c,jsonLd:[u]}:{...n,...c}},{}),[t,r]),{html:o,loggerMarkup:i}=useMemo(()=>{let n=er(a),c=n.map(s=>s.tag==="script"?createElement(s.tag,{...s.props,key:s.key,dangerouslySetInnerHTML:{__html:s.children}}):createElement(s.tag,{...s.props,key:s.key},s.children)),u=createElement(Suspense,{fallback:null},createElement(vo,{headTags:n}));return {html:c,loggerMarkup:u}},[a]);return createElement(Fragment,null,o,e&&i)}function Me(e,...t){if(e instanceof Function)return Me(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((a,o)=>[...a,Me(o)],[]),r):e instanceof Object?(Object.entries(e).forEach(([o,i])=>{r[o]=Me(i,...t);}),r):e}function bo(...e){let t=[],r=e.reduce((a,o)=>{if(!o)return a;Object.keys(o).forEach(n=>!o[n]&&delete o[n]);let{jsonLd:i}=o;return i?a?.jsonLd?{...a,...o,jsonLd:j(a.jsonLd).concat(i)}:{...a,...o,jsonLd:[i]}:{...a,...o}},{})||{};for(let a of Object.keys(r))switch(a){case"title":{let o=H($.title,r.title),i=lt(r?.titleTemplate,o);if(!i)break;t.push({title:i},{property:"og:title",content:i},{property:"twitter:title",content:i});break}case"description":{let o=H($.description,r.description);if(!o)break;t.push({name:"description",content:o},{property:"og:description",content:o},{property:"twitter:description",content:o});break}case"url":{let o=H($.url,r.url);if(!o)break;let n=o.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:n},{property:"og:url",content:n});break}case"handle":{let o=H($.handle,r.handle);if(!o)break;t.push({property:"twitter:site",content:o},{property:"twitter:creator",content:o});break}case"media":{let o,i=j(r.media);for(let n of i)if(typeof n=="string"&&t.push({property:"og:image",content:n}),n&&typeof n=="object"){let c=n.type||"image",u=n?{url:n?.url,secure_url:n?.url,type:yt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let s of Object.keys(u))u[s]&&(o=u[s],t.push({property:`og:${c}:${s}`,content:o}));}break}case"jsonLd":{let o=j(r.jsonLd);for(let n of o)typeof n!="object"||Object.keys(n).length===0||t.push({"script:ld+json":n});break}case"alternates":{let o=j(r.alternates);for(let i of o){if(!i)continue;let{language:n,url:c,default:u}=i,s=n?`${n}${u?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:s,href:c});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:o,maxSnippet:i,maxVideoPreview:n,noArchive:c,noFollow:u,noImageIndex:s,noIndex:d,noSnippet:l,noTranslate:m,unavailableAfter:p}=r.robots,y=[c&&"noarchive",s&&"noimageindex",l&&"nosnippet",m&&"notranslate",o&&`max-image-preview:${o}`,i&&`max-snippet:${i}`,n&&`max-video-preview:${n}`,p&&`unavailable_after:${p}`],f=(d?"noindex":"index")+","+(u?"nofollow":"follow");for(let g of y)g&&(f+=`,${g}`);t.push({name:"robots",content:f});break}}return t}function Oo({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let a=useNavigation().state==="loading",{endCursor:o,hasNextPage:i,hasPreviousPage:n,nextPageUrl:c,nodes:u,previousPageUrl:s,startCursor:d}=xo(e),l=useMemo(()=>({pageInfo:{endCursor:o,hasPreviousPage:n,hasNextPage:i,startCursor:d},nodes:u}),[o,i,n,d,u]),m=useMemo(()=>forwardRef(function(f,g){return i?createElement(Link,{preventScrollReset:!0,...f,to:c,state:l,replace:!0,ref:g}):null}),[i,c,l]),p=useMemo(()=>forwardRef(function(f,g){return n?createElement(Link,{preventScrollReset:!0,...f,to:s,state:l,replace:!0,ref:g}):null}),[n,s,l]);return t({state:l,hasNextPage:i,hasPreviousPage:n,isLoading:a,nextPageUrl:c,nodes:u,previousPageUrl:s,NextLink:m,PreviousLink:p})}function qe(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Ae(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function xo(e){e.pageInfo||Ae("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Ae("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Ae("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Ae("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Ae("pageInfo.hasPreviousPage");let t=useNavigate(),{state:r,search:a,pathname:o}=useLocation(),c=new URLSearchParams(a).get("direction")==="previous",u=useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?flattenConnection(e):c?[...flattenConnection(e),...r.nodes]:[...r.nodes,...flattenConnection(e)],[r,e]),s=useMemo(()=>{let p=globalThis?.window?.__hydrogenHydrated,y=!p||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,f=!p||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!p||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,P=!p||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(c?(y=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(f=e.pageInfo.endCursor,P=e.pageInfo.hasNextPage)),{startCursor:y,endCursor:f,hasPreviousPage:g,hasNextPage:P}},[c,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),d=useRef({params:qe(a),pathname:o});useEffect(()=>{window.__hydrogenHydrated=!0;},[]),useEffect(()=>{(qe(a)!==d.current.params||o!==d.current.pathname)&&(d.current={pathname:o,params:qe(a)},t(`${o}?${qe(a)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[o,a]);let l=useMemo(()=>{let p=new URLSearchParams(a);return p.set("direction","previous"),s.startCursor&&p.set("cursor",s.startCursor),`?${p.toString()}`},[a,s.startCursor]),m=useMemo(()=>{let p=new URLSearchParams(a);return p.set("direction","next"),s.endCursor&&p.set("cursor",s.endCursor),`?${p.toString()}`},[a,s.endCursor]);return {...s,previousPageUrl:l,nextPageUrl:m,nodes:u}}function Do(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,a=new URLSearchParams(new URL(e.url).search),o=a.get("cursor")??void 0;return (a.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:o??null}:{first:r,endCursor:o??null}}var U=class extends Response{constructor(t,r,a){super(`Bad request: ${t}`,{status:400,headers:a});}};function Te(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function ko({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:a,debugInfo:o,exchangeForStorefrontCustomerAccessToken:i}){let n=new URLSearchParams,c=e.get(x),u=c?.refreshToken,s=c?.idToken;if(!u)throw new U("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");n.append("grant_type","refresh_token"),n.append("refresh_token",u),n.append("client_id",t);let d={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:a};new Date().getTime();let m=`${r}/auth/oauth/token`,p=await fetch(m,{method:"POST",headers:d,body:n});if(!p.ok){let h=await p.text();throw new Response(h,{status:p.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:y,expires_in:f,refresh_token:g}=await p.json(),P=await mt(y,t,r,a);e.set(x,{accessToken:P,expiresAt:new Date(new Date().getTime()+(f-120)*1e3).getTime()+"",refreshToken:g,idToken:s}),await i();}function pe(e){e.unset(x),e.unset(se);}async function ir({locks:e,expiresAt:t,session:r,customerAccountId:a,customerAccountUrl:o,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:c}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=ko({session:r,customerAccountId:a,customerAccountUrl:o,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:c})),await e.refresh,delete e.refresh;}catch(u){throw pe(r),u&&u.status!==401?u:new U("Unauthorized","Login before querying the Customer Account API.")}}function sr(){let e=Lo();return ur(e)}async function cr(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=_o(t);return ur(r)}function Lo(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function ur(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function _o(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function pr(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function mt(e,t,r,a,o){let i=t;if(!e)throw new U("Unauthorized","oAuth access token was not provided during token exchange.");let n=new URLSearchParams;n.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),n.append("client_id",i),n.append("audience",Qt),n.append("subject_token",e),n.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),n.append("scopes","https://api.customers.com/auth/customer.graphql");let c={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:a};new Date().getTime();let s=`${r}/auth/oauth/token`,d=await fetch(s,{method:"POST",headers:c,body:n});let l=await d.json();if(l.error)throw new U(l.error_description);return l.access_token}function dr(e){return Uo(e).payload.nonce}function Uo(e){let[t,r,a]=e.split("."),o=JSON.parse(atob(t)),i=JSON.parse(atob(r));return {header:o,payload:i,signature:a}}function Fe(){return Vo(No())}function No(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function Vo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var lr="/account/login",Mo="/account/authorize",yr="/account";function qo(e){if(!e.url)return lr;let{pathname:t}=new URL(e.url),r=lr+`?${new URLSearchParams({return_to:t}).toString()}`;return Te(r)}function Fo({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:a=Le,request:o,waitUntil:i,authUrl:n,customAuthStatusHandler:c,logErrors:u=!0,unstableB2b:s=!1}){if(a!==Le&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${a} when this version of Hydrogen was built for ${Le}.`),!o?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let d=c||(()=>qo(o)),l=new URL(o.url),m=l.protocol==="http:"?l.origin.replace("http","https"):l.origin,p=ct({requestUrl:m,defaultUrl:Mo,redirectUrl:n}),y=`${r}/account/customer/api/${a}/graphql`,f={};async function g({query:C,type:S,variables:v={}}){let T=await I();if(!T)throw d();new Date().getTime();let O=await fetch(y,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ie,Origin:m,Authorization:T},body:JSON.stringify({query:C,variables:v})});let N=await O.text(),L={url:y,response:O,type:S,query:C,queryVariables:v,errors:void 0,client:"customer"};if(!O.ok){if(O.status===401)throw pe(e),d();let E;try{E=z(N);}catch{E=[{message:N}];}Se({...L,errors:E});}try{let E=z(N),{errors:q}=E,ye=q?.map(({message:ae,...fe})=>new Y(ae,{...fe,clientOperation:`customerAccount.${L.type}`,requestId:O.headers.get("x-request-id"),queryVariables:v,query:C}));return {...E,...q&&{errors:ye}}}catch{Se({...L,errors:[{message:N}]});}}async function P(){if(!r||!t)return !1;let C=e.get(x),S=C?.accessToken,v=C?.expiresAt;if(!S||!v)return !1;let T=F?.();try{await ir({locks:f,expiresAt:v,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:m,debugInfo:{waitUntil:i,stackInfo:T,...X(o)},exchangeForStorefrontCustomerAccessToken:k});}catch{return !1}return !0}async function h(){if(!await P())throw d()}async function I(){if(await P())return e.get(x)?.accessToken}async function b(C,S){return be(r,t),C=ce(C),Ue(C,"customer.mutate"),ue(g({query:C,type:"mutation",...S}),{logErrors:u})}async function V(C,S){return be(r,t),C=ce(C),_e(C,"customer.query"),ue(g({query:C,type:"query",...S}),{logErrors:u})}function M(C){e.set(se,{...e.get(se),...C});}async function oe(){if(await P())return e.get(se)}async function k(){if(!s)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:S}=await b(C),v=S?.storefrontCustomerAccessTokenCreate?.customerAccessToken;v&&M({customerAccessToken:v});}return {login:async C=>{be(r,t);let S=new URL(`${r}/auth/oauth/authorize`),v=pr(),T=Fe();if(S.searchParams.set("client_id",t),S.searchParams.set("scope","openid email"),S.searchParams.append("response_type","code"),S.searchParams.append("redirect_uri",p),S.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),S.searchParams.append("state",v),S.searchParams.append("nonce",T),C?.uiLocales){let[O,N]=C.uiLocales.split("-"),L=O.toLowerCase();N&&(L+=`-${N.toUpperCase()}`),S.searchParams.append("ui_locales",L);}let _=sr(),G=await cr(_);return e.set(x,{...e.get(x),codeVerifier:_,state:v,nonce:T,redirectPath:Ve(o.url)||Ne(o,"Referer")||yr}),S.searchParams.append("code_challenge",G),S.searchParams.append("code_challenge_method","S256"),Te(S.toString())},logout:async C=>{be(r,t);let S=e.get(x)?.idToken,v=ct({requestUrl:m,defaultUrl:m,redirectUrl:C?.postLogoutRedirectUri}),T=S?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",S],["post_logout_redirect_uri",v]]).toString()}`).toString():v;return pe(e),Te(T)},isLoggedIn:P,handleAuthStatus:h,getAccessToken:I,getApiUrl:()=>y,mutate:b,query:V,authorize:async()=>{be(r,t);let C=l.searchParams.get("code"),S=l.searchParams.get("state");if(!C||!S)throw pe(e),new U("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(x)?.state!==S)throw pe(e),new U("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let v=t,T=new URLSearchParams;T.append("grant_type","authorization_code"),T.append("client_id",v),T.append("redirect_uri",p),T.append("code",C);let _=e.get(x)?.codeVerifier;if(!_)throw new U("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");T.append("code_verifier",_);let G={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:m},O=F?.();new Date().getTime();let L=`${r}/auth/oauth/token`,E=await fetch(L,{method:"POST",headers:G,body:T});if(!E.ok)throw new Response(await E.text(),{status:E.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:q,expires_in:ye,id_token:ae,refresh_token:fe}=await E.json(),B=e.get(x)?.nonce,me=await dr(ae);if(B!==me)throw new U("Unauthorized",`Returned nonce does not match: ${B} !== ${me}`);let Br=await mt(q,t,r,m,{waitUntil:i,stackInfo:O,...X(o)}),Wr=e.get(x)?.redirectPath;return e.set(x,{accessToken:Br,expiresAt:new Date(new Date().getTime()+(ye-120)*1e3).getTime()+"",refreshToken:fe,idToken:ae}),await k(),Te(Wr||yr)},UNSTABLE_setBuyer:M,UNSTABLE_getBuyer:oe}}function be(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var $o="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function Ho({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||$o)}var fr="cartFormInput";function Q({children:e,action:t,inputs:r,route:a,fetcherKey:o}){let i=useFetcher({key:o});return jsxs(i.Form,{action:a||"",method:"post",children:[(t||r)&&jsx("input",{type:"hidden",name:fr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(i):e]})}Q.INPUT_NAME=fr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function Go(e){let t={};for(let n of e.entries()){let c=n[0],u=e.getAll(c);t[c]=u.length>1?u:n[1];}let{cartFormInput:r,...a}=t,{action:o,inputs:i}=r?JSON.parse(String(r)):{};return {action:o,inputs:{...i,...a}}}Q.getFormInput=Go;var R=`#graphql
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
`;function ht(e){return async(t,r)=>{let a=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:o,...i}=r||{},{buyerIdentity:n,...c}=t,{cartCreate:u,errors:s}=await e.storefront.mutate(jo(e.cartFragment),{variables:{input:{...c,buyerIdentity:{...a,...n}},...i}});return A(u,s)}}var jo=(e=w)=>`#graphql
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
`;function gt({storefront:e,customerAccount:t,getCartId:r,cartFragment:a}){return async o=>{let i=r();if(!i)return null;let[n,{cart:c,errors:u}]=await Promise.all([t?t.isLoggedIn():!1,e.query(Ko(a),{variables:{cartId:i,...o},cache:e.CacheNone()})]);if(n&&c?.checkoutUrl){let s=new URL(c.checkoutUrl);s.searchParams.set("logged_in","true"),c.checkoutUrl=s.toString();}return c||u?A(c,u):null}}var Ko=(e=Jo)=>`#graphql
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
`,Jo=`#graphql
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
`;function Ct(e){return async(t,r)=>{let{cartLinesAdd:a,errors:o}=await e.storefront.mutate(zo(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return A(a,o)}}var zo=(e=w)=>`#graphql
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
`;var mr="__h_pending_";function hr(e){return mr+e}function $e(e){return e.startsWith(mr)}function He(e,t){if(t.some(r=>$e(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function St(e){return async(t,r)=>{He("updateLines",t);let{cartLinesUpdate:a,errors:o}=await e.storefront.mutate(Yo(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return A(a,o)}}var Yo=(e=w)=>`#graphql
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
`;function Pt(e){return async(t,r)=>{He("removeLines",t);let{cartLinesRemove:a,errors:o}=await e.storefront.mutate(Xo(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return A(a,o)}}var Xo=(e=w)=>`#graphql
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
`;function At(e){return async(t,r)=>{let a=t.filter((n,c,u)=>u.indexOf(n)===c),{cartDiscountCodesUpdate:o,errors:i}=await e.storefront.mutate(Zo(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:a,...r}});return A(o,i)}}var Zo=(e=w)=>`#graphql
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
`;function vt(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let a=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:o,errors:i}=await e.storefront.mutate(ea(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...a,...t},...r}});return A(o,i)}}var ea=(e=w)=>`#graphql
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
`;function Tt(e){return async(t,r)=>{let{cartNoteUpdate:a,errors:o}=await e.storefront.mutate(ta(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return A(a,o)}}var ta=(e=w)=>`#graphql
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
`;function bt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:a,errors:o}=await e.storefront.mutate(ra(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return A(a,o)}}var ra=(e=w)=>`#graphql
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
`;function It(e){return async(t,r)=>{let{cartAttributesUpdate:a,errors:o}=await e.storefront.mutate(oa(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return A(a,o)}}var oa=(e=w)=>`#graphql
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
`;function Rt(e){return async(t,r)=>{let a=r?.cartId||e.getCartId(),o=t.map(c=>({...c,ownerId:a})),{cartMetafieldsSet:i,errors:n}=await e.storefront.mutate(aa(),{variables:{metafields:o}});return A({cart:{id:a},...i},n)}}var aa=()=>`#graphql
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
`;function wt(e){return async(t,r)=>{let a=r?.cartId||e.getCartId(),{cartMetafieldDelete:o,errors:i}=await e.storefront.mutate(na(),{variables:{input:{ownerId:a,key:t}}});return A({cart:{id:a},...o},i)}}var na=()=>`#graphql
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
`;var sa=e=>{let t=parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var ua=e=>t=>{let r=new Headers;return r.append("Set-Cookie",stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function pa(e){let{getCartId:t,setCartId:r,storefront:a,customerAccount:o,cartQueryFragment:i,cartMutateFragment:n}=e,c=t(),u=()=>c||t(),s={storefront:a,getCartId:u,cartFragment:n,customerAccount:o},d=ht(s),l=async function(...p){let y=await d(...p);return c=y?.cart?.id,y},m={get:gt({storefront:a,customerAccount:o,getCartId:u,cartFragment:i}),getCartId:u,setCartId:r,create:l,addLines:async(p,y)=>{let f=p.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return c||y?.cartId?await Ct(s)(f,y):await l({lines:f},y)},updateLines:St(s),removeLines:Pt(s),updateDiscountCodes:async(p,y)=>c||y?.cartId?await At(s)(p,y):await l({discountCodes:p},y),updateBuyerIdentity:async(p,y)=>c||y?.cartId?await vt(s)(p,y):await l({buyerIdentity:p},y),updateNote:async(p,y)=>c||y?.cartId?await Tt(s)(p,y):await l({note:p},y),updateSelectedDeliveryOption:bt(s),updateAttributes:async(p,y)=>c||y?.cartId?await It(s)(p,y):await l({attributes:p},y),setMetafields:async(p,y)=>c||y?.cartId?await Rt(s)(p,y):await l({metafields:p},y),deleteMetafield:wt(s)};return "customMethods"in e?{...m,...e.customMethods??{}}:m}function la(e){let t=useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},a=r.lines.nodes,o=!1;for(let{formData:i}of t){if(!i)continue;let n=Q.getFormInput(i);if(n.action===Q.ACTIONS.LinesAdd)for(let c of n.inputs.lines){if(!c.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let u=a.find(s=>s.merchandise.id===c.selectedVariant?.id);o=!0,u?(u.quantity=(u.quantity||1)+(c.quantity||1),u.isOptimistic=!0):a.unshift({id:hr(c.selectedVariant.id),merchandise:c.selectedVariant,isOptimistic:!0,quantity:c.quantity||1});}else if(n.action===Q.ACTIONS.LinesRemove)for(let c of n.inputs.lineIds){let u=a.findIndex(s=>s.id===c);if(u!==-1){if($e(a[u].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}a.splice(u,1),o=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${c}' but it doesn't exist in the cart`);}else if(n.action===Q.ACTIONS.LinesUpdate)for(let c of n.inputs.lines){let u=a.findIndex(s=>c.id===s.id);if(u>-1){if($e(a[u].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}a[u].quantity=c.quantity,a[u].quantity===0&&a.splice(u,1),o=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${c.id}' but it doesn't exist in the cart`);}}return o&&(r.isOptimistic=o),r}function Ca({handle:e,options:t=[],variants:r=[],productPath:a="products",waitForNavigation:o=!1,children:i}){let n=r instanceof Array?r:flattenConnection(r),{searchParams:c,path:u,alreadyOnProductPage:s}=Pa(e,a,o),d=t.filter(l=>l?.values?.length===1);return createElement(Fragment,null,...useMemo(()=>t.map(l=>{let m,p=[];for(let y of l.values){let f=new URLSearchParams(s?c:void 0);f.set(l.name,y),d.forEach(b=>{f.set(b.name,b.values[0]);});let g=n.find(b=>b?.selectedOptions?.every(V=>f.get(V?.name)===V?.value)),P=c.get(l.name),h=P?P===y:!1;h&&(m=y);let I="?"+f.toString();p.push({value:y,isAvailable:g?g.availableForSale:!0,to:u+I,search:I,isActive:h,variant:g});}return i({option:{name:l.name,value:m,values:p}})}),[t,n,i]))}var Sa=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((a,o)=>{r.push({name:o,value:a});}),r};function Pa(e,t,r){let{pathname:a,search:o}=useLocation(),i=useNavigation();return useMemo(()=>{let n=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(a),c=n&&n.length>0;t=t.startsWith("/")?t.substring(1):t;let u=c?`${n[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||i.state!=="loading"?o:i.location.search),alreadyOnProductPage:u===a,path:u}},[a,o,r,e,t,i])}function ba(e,t){let r=useNavigation(),[a,o]=useState([]);if(useEffect(()=>{Promise.resolve(t).then(i=>{i&&o(i instanceof Array?i:i.product?.variants?.nodes||[]);}).catch(i=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:i}));});},[t]),r.state==="loading"){let i=new URLSearchParams(r.location.search),n=!1,c=a.find(u=>u.selectedOptions?u.selectedOptions.every(s=>i.get(s.name)===s.value):(n||(n=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(c)return {...e,isOptimistic:!0,selectedVariant:c}}return e}var Cr=createContext(void 0),Oa=Cr.Provider,Et=()=>useContext(Cr);function xa(e){let t=Fe(),r=Da(t,e);return {nonce:t,header:r,NonceProvider:({children:o})=>createElement(Oa,{value:t},o)}}function Da(e,t){let{shop:r,...a}=t??{},o=`'nonce-${e}'`,i=["'self'","'unsafe-inline'","https://cdn.shopify.com"],n=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&n.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&n.push(`https://${r.storeDomain}`);let u={baseUri:["'self'"],defaultSrc:["'self'",o,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:i,connectSrc:n},s=Object.assign({},u,a);for(let d in u){let l=a[d];d&&l&&(s[d]=ka(l,u[d]));}return s.scriptSrc instanceof Array&&!s.scriptSrc.includes(o)?s.scriptSrc.push(o):s.defaultSrc instanceof Array&&!s.defaultSrc.includes(o)&&s.defaultSrc.push(o),Ea({directives:s})}function ka(e,t){let r=typeof t=="string"?[t]:t,a=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(i=>i==="'none'")?a:[...a,...r]:r}var _a=forwardRef((e,t)=>{let r=Et();return jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function Va(e){let t=useFetchers(),r={};for(let{formData:a}of t)if(a?.get("optimistic-identifier")===e)try{if(a.has("optimistic-data")){let o=JSON.parse(String(a.get("optimistic-data")));Object.assign(r,o);}}catch{}return r}function Ma({id:e,data:t}){return jsxs(Fragment$1,{children:[jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function Ha(e){return jsx(ShopPayButton,{channel:"hydrogen",...e})}function de(e){let{type:t,data:r={},customData:a}=e,o=useLocation(),{publish:i,cart:n,prevCart:c,shop:u,customData:s}=ee(),d=o.pathname+o.search,l={...r,customData:{...s,...a},cart:n,prevCart:c,shop:u};return useEffect(()=>{u?.shopId&&(l={...l,url:window.location.href},i(t,l));},[i,d,u?.shopId]),null}function Pr(e){return jsx(de,{...e,type:"page_viewed"})}function Ar(e){return jsx(de,{...e,type:"product_viewed"})}function vr(e){return jsx(de,{...e,type:"collection_viewed"})}function Tr(e){return jsx(de,{...e,type:"cart_viewed"})}function br(e){return jsx(de,{...e,type:"search_viewed"})}function Ir(e){return jsx(de,{...e})}var te={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var Ka="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",Ja="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function wr(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function Ot(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:a,...o}=e,i=useRef(!1),n=useLoadScript(t?Ja:Ka,{attributes:{id:"customer-privacy-api"}});useEffect(()=>{let c=u=>{r&&r(u.detail);};return document.addEventListener("visitorConsentCollected",c),()=>{document.removeEventListener("visitorConsentCollected",c);}},[r]),useEffect(()=>{if(n!=="done"||i.current)return;i.current=!0;let{checkoutDomain:c,storefrontAccessToken:u}=o;c||wr("checkoutDomain"),u||wr("storefrontAccessToken"),(u.startsWith("shpat_")||u.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let s={checkoutRootDomain:c,storefrontAccessToken:u};if(c){let m=window.document.location.host,p=c.split(".").reverse(),y=m.split(".").reverse(),f=[];p.forEach((g,P)=>{g===y[P]&&f.push(g);}),m=f.reverse().join("."),m&&(s.storefrontRootDomain=m);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(s),!window.Shopify?.customerPrivacy)return;let d=window.Shopify.customerPrivacy.setTrackingConsent;function l(m,p){d({...m,headlessStorefront:!0,...s},p);}window.Shopify.customerPrivacy.setTrackingConsent=l,a&&a();},[n,t,o]);}function xt(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function Za(){let e=xt();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function Or({consent:e,onReady:t,domain:r}){let{subscribe:a,register:o,canTrack:i}=ee(),[n,c]=useState(!1),[u,s]=useState(!1),{ready:d}=o("Internal_Shopify_Analytics"),{ready:l}=o("Internal_Shopify_CustomerPrivacy"),m=()=>{n&&u&&t();},p=()=>{s(!0),l(),m();},{checkoutDomain:y,storefrontAccessToken:f,withPrivacyBanner:g}=e;return Ot({checkoutDomain:y||"mock.shop",storefrontAccessToken:f||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:p,onReady:()=>{setTimeout(p,3e3);}}),useShopifyCookies({hasUserConsent:n&&u?i():!0,domain:r,checkoutDomain:y}),useEffect(()=>{a(te.PAGE_VIEWED,tn),a(te.PRODUCT_VIEWED,rn),a(te.COLLECTION_VIEWED,on),a(te.SEARCH_VIEWED,an),a(te.PRODUCT_ADD_TO_CART,nn),d(),c(!0),m();},[a,d]),null}function Qe(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function we(e){let t=Za(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){Qe("shopId");return}if(!e?.shop?.acceptedLanguage){Qe("acceptedLanguage");return}if(!e?.shop?.currency){Qe("currency");return}if(!e?.shop?.hydrogenSubchannelId){Qe("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function en(e,t){if(t===null)return;let r=we(e);return r?{...r,cartId:t.id}:void 0}var K={};function tn(e){let t=we(e);t&&(sendShopifyAnalytics({eventName:AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...K}}),K={});}function rn(e){let t=we(e);if(t&&xr({type:"product",products:e.products})){let r=Dt(e.products);K={pageType:AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...K,products:Dt(e.products)},sendShopifyAnalytics({eventName:AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function on(e){let t=we(e);t&&(K={pageType:AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...K,collectionHandle:e.collection.handle},sendShopifyAnalytics({eventName:AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function an(e){let t=we(e);t&&(K={pageType:AnalyticsPageType.search},t={...t,...K,searchString:e.searchTerm},sendShopifyAnalytics({eventName:AnalyticsEventName.SEARCH_VIEW,payload:t}));}function nn(e){let{cart:t,currentLine:r}=e,a=en(e,t);!a||!r?.id||sn({matchedLine:r,eventPayload:a});}function sn({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};xr({type:"cart",products:[r]})&&sendShopifyAnalytics({eventName:AnalyticsEventName.ADD_TO_CART,payload:{...t,products:Dt([r])}});}function re(e,t,r,a){if(e==="cart"){let o=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${o}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${o}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let o=`${a||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${o}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${o}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function xr({type:e,products:t}){return !t||t.length===0?(re(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return re(e,"id",!1),!1;if(!r.title)return re(e,"title",!1),!1;if(!r.price)return re(e,"price.amount",!0,"price"),!1;if(!r.vendor)return re(e,"vendor",!1),!1;if(!r.variantId)return re(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return re(e,"title",!0,"variantTitle"),!1}),!0)}function Dt(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function Lr(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function _r({cart:e,setCarts:t}){let{publish:r,shop:a,customData:o,canTrack:i,cart:n,prevCart:c}=ee(),u=useRef(null);return useEffect(()=>{if(e)return Promise.resolve(e).then(s=>{if(s&&s.lines){if(!s.id){Lr("id");return}if(!s.updatedAt){Lr("updatedAt");return}}t(({cart:d,prevCart:l})=>s?.updatedAt!==d?.updatedAt?{cart:s,prevCart:d}:{cart:d,prevCart:l});}),()=>{}},[t,e]),useEffect(()=>{if(!n||!n?.updatedAt||n?.updatedAt===c?.updatedAt)return;let s;try{s=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{s=null;}if(n.id===s?.id&&n.updatedAt===s?.updatedAt)return;let d={eventTimestamp:Date.now(),cart:n,prevCart:c,shop:a,customData:o};if(n.updatedAt===u.current)return;u.current=n.updatedAt,r("cart_updated",d),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:n.id,updatedAt:n.updatedAt}));let l=c?.lines?flattenConnection(c?.lines):[],m=n.lines?flattenConnection(n.lines):[];l?.forEach(p=>{let y=m.filter(f=>p.id===f.id);if(y?.length===1){let f=y[0];p.quantity<f.quantity?r("product_added_to_cart",{...d,prevLine:p,currentLine:f}):p.quantity>f.quantity&&r("product_removed_from_cart",{...d,prevLine:p,currentLine:f});}else r("product_removed_from_cart",{...d,prevLine:p});}),m?.forEach(p=>{let y=l.filter(f=>p.id===f.id);(!y||y.length===0)&&r("product_added_to_cart",{...d,currentLine:p});});},[n,c,r,a,o,i]),null}var fn={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},Fr=createContext(fn),Be=new Map,Ee={};function $r(){return Object.values(Ee).every(Boolean)}function Ur(e,t){Be.has(e)||Be.set(e,new Map),Be.get(e)?.set(t.toString(),t);}var We=new Map;function Nr(e,t){if(!$r()){We.set(e,t);return}Hr(e,t);}function Hr(e,t){(Be.get(e)??new Map).forEach((r,a)=>{try{r(t);}catch(o){typeof o=="object"&&o instanceof Error?console.error("Analytics publish error",o.message,a,o.stack):console.error("Analytics publish error",o,a);}});}function Vr(e){return Ee.hasOwnProperty(e)||(Ee[e]=!1),{ready:()=>{Ee[e]=!0,$r()&&We.size>0&&(We.forEach((t,r)=>{Hr(r,t);}),We.clear());}}}function Mr(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function qr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function mn({canTrack:e,cart:t,children:r,consent:a,customData:o={},shop:i=null,disableThrowOnError:n=!1,cookieDomain:c}){let u=useRef(!1),{shop:s}=hn(i),[d,l]=useState(!!e),[m,p]=useState({cart:null,prevCart:null}),[y,f]=useState(e?()=>e:()=>Mr);if(s)if(/\/68817551382$/.test(s.shopId))jt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!a.checkoutDomain){let P=qr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");it(P);}if(!a.storefrontAccessToken){let P=qr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");it(P);}}let g=useMemo(()=>({canTrack:y,...m,customData:o,publish:y()?Nr:()=>{},shop:s,subscribe:Ur,register:Vr}),[d,y(),y,JSON.stringify(y),m,m.cart?.updatedAt,m.prevCart,Nr,Ur,o,s,Vr,JSON.stringify(Ee)]);return jsxs(Fr.Provider,{value:g,children:[r,!!s&&jsx(Pr,{}),!!s&&!!t&&jsx(_r,{cart:t,setCarts:p}),!!s&&a.checkoutDomain&&jsx(Or,{consent:a,onReady:()=>{u.current=!0,l(!0),f(()=>Mr);},domain:c})]})}function ee(){let e=useContext(Fr);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function hn(e){let[t,r]=useState(null);return useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function gn({storefront:e,publicStorefrontId:t="0"}){return e.query(Cn,{cache:e.CacheLong()}).then(({shop:r,localization:a})=>({shopId:r.id,acceptedLanguage:a.language.isoCode,currency:a.country.currency.isoCode,hydrogenSubchannelId:t}))}var Cn=`#graphql
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
`,Sn={CartView:Tr,CollectionView:vr,CustomView:Ir,ProductView:Ar,Provider:mn,SearchView:br};var Tn=function(e){return jsx(RichText,{...e,components:{link:({node:t})=>jsx(Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};function bn(e=je(16)){let t=[];e=Gr(e);function r(o,i,n,c){try{let u=Date.now(),s="unknown";o?.displayName?s=o.displayName:o.graphql&&(s=o.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")||"GraphQL"),n&&(s=`Cache [${n}] ${s}`);let d={traceId:e,id:c?e:je(16),name:s,timestamp:i*1e3,duration:(u-i)*1e3,parentId:c?void 0:e,tags:{"request.type":n?"cache":"subrequest"}};t.push(d);}catch(u){console.error(u);}}async function a(){if(t.length>0){let o=t;t=[],await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});}}return [r,a]}function In(e,t,r,a){globalThis.__SPANS=globalThis.__SPANS||[];try{let o=Gr(e?.requestId||je(16)),i=Date.now(),n="unknown";e?.displayName?n=e.displayName:e.graphql&&(n=e.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")||"GraphQL"),r&&(n=`Cache [${r}] ${n}`);let c={traceId:o,id:a?o:je(16),name:n,timestamp:t*1e3,duration:(i-t)*1e3,parentId:a?void 0:o,tags:{"request.type":r?"cache":"subrequest"}};globalThis.__SPANS.push(c);}catch(o){console.error(o);}}async function Rn(){if(globalThis.__SPANS){let e=globalThis.__SPANS;globalThis.__SPANS=[],await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});}}function Gr(e){let t=e.split(".");return t.length===2?t[1]:e}function je(e){let t="";for(;t.length<e;)t+=Math.floor(Math.random()*16).toString(16);return t.substring(0,e)}//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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

export { Sn as Analytics, te as AnalyticsEvent, Xe as CacheCustom, Ye as CacheLong, Je as CacheNone, J as CacheShort, Q as CartForm, st as InMemoryCache, Ma as OptimisticInput, Oo as Pagination, Tn as RichText, _a as Script, To as Seo, Ha as ShopPayButton, Ca as VariantSelector, It as cartAttributesUpdateDefault, vt as cartBuyerIdentityUpdateDefault, ht as cartCreateDefault, At as cartDiscountCodesUpdateDefault, gt as cartGetDefault, sa as cartGetIdDefault, Ct as cartLinesAddDefault, Pt as cartLinesRemoveDefault, St as cartLinesUpdateDefault, wt as cartMetafieldDeleteDefault, Rt as cartMetafieldsSetDefault, Tt as cartNoteUpdateDefault, bt as cartSelectedDeliveryOptionsUpdateDefault, ua as cartSetIdDefault, Ho as changelogHandler, pa as createCartHandler, xa as createContentSecurityPolicy, Fo as createCustomerAccountClient, bn as createSpanCollector, si as createStorefrontClient, uo as createWithCache, In as emitSpanEvent, Rn as flushSpanEvents, A as formatAPIResult, he as generateCacheControlHeader, xt as getCustomerPrivacy, Do as getPaginationVariables, Sa as getSelectedProductOptions, bo as getSeoMeta, gn as getShopAnalytics, fo as graphiqlLoader, lo as storefrontRedirect, ee as useAnalytics, Ot as useCustomerPrivacy, Et as useNonce, la as useOptimisticCart, Va as useOptimisticData, ba as useOptimisticProduct };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map