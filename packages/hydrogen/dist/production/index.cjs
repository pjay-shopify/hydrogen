'use strict';

var hydrogenReact = require('@shopify/hydrogen-react');
var react = require('react');
var react$1 = require('@remix-run/react');
var jsxRuntime = require('react/jsx-runtime');
var cookie = require('worktop/cookie');
var $a = require('content-security-policy-builder');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var $a__default = /*#__PURE__*/_interopDefault($a);

var Xr=Object.defineProperty;var Zr=(e,t)=>()=>(e&&(t=e(e=0)),t);var eo=(e,t)=>{for(var r in t)Xr(e,r,{get:t[r],enumerable:!0});};var nr={};eo(nr,{default:()=>or,logSeoTags:()=>ar});function or({headTags:e}){return ar(e),null}function ar(e){console.log(" "),console.log("%cSEO Meta Tags",`${wo}`),console.log(" "),e.forEach(t=>{if(t.tag==="script"){if(console.log("%c\u2022 JSON LD ",yt),t.children)try{console.table(JSON.parse(t.children),["name","content"]);}catch{console.log(t.children);}}else {if(console.log(`%c\u2022 ${t.tag} `,yt),t.children)if(typeof t.children=="string")console.log(`\u21B3 ${t.children}`);else try{Object.entries(JSON.parse(t.children)).map(([r,o])=>console.log(`\u21B3 ${o}`));}catch{console.log(t.children);}if(t.props.property==="og:image:url"){let r=t.props.content;Ro(r).then(o=>{let a=`font-size: 400px; padding: 10px; background: white url(${o}) no-repeat center; background-size: contain;`;console.log("%c\u2022 Share image preview",yt),console.log("%c  ",a),console.log(`\u21B3 ${r}`);}).catch(o=>{console.error(o);});}Object.entries(t.props).map(([r,o])=>{console.log(`\u21B3 ${r} \u2192 ${o}`);});}console.log(" ");});}async function Ro(e){let o=await(await(await fetch(e)).blob()).arrayBuffer();return `data:image/png;base64,${Eo(o)}`}function Eo(e){let t="",r=new Uint8Array(e),o=r.byteLength;for(let a=0;a<o;a++)t+=String.fromCharCode(r[a]);return btoa(t)}var yt,wo,ir=Zr(()=>{yt="text-transform: uppercase;",wo="text-transform: uppercase; font-weight: bold; text-transform: uppercase;font-weight: bold";});var Oe="public",to="private",je="no-store",Ut={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function fe(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):Ut[r]&&t.push(`${Ut[r]}=${e[r]}`);}),t.join(", ")}function Ke(){return {mode:je}}function Je(e){if(e?.mode&&e?.mode!==Oe&&e?.mode!==to)throw Error("'mode' must be either 'public' or 'private'")}function J(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:9,...e}}function ze(e){return Je(e),{mode:Oe,maxAge:3600,staleWhileRevalidate:82800,...e}}function ae(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:86399,...e}}function Ye(e){return e}function z(e){return String(e).includes("__proto__")?JSON.parse(e,ro):JSON.parse(e)}function ro(e,t){if(e!=="__proto__")return t}function xe(e,t){return e&&t?{...e,...t}:e||ae()}function Xe(e){return fe(xe(e))}async function oo(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function ao(e,t,r,o){if(!e)return;let a=xe(o),n=Xe(xe(a,{maxAge:(a.maxAge||0)+(a.staleWhileRevalidate||0)})),i=Xe(xe(a));r.headers.set("cache-control",n),r.headers.set("real-cache-control",i),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function no(e,t){e&&await e.delete(t);}function io(e,t){let r=e.headers.get("real-cache-control"),o=0;if(r){let n=r.match(/max-age=(\d*)/);n&&n.length>1&&(o=parseFloat(n[1]));}return [(Date.now()-Number(t))/1e3,o]}function so(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[o,a]=io(t,r),n=o>a;return n}var De={get:oo,set:ao,delete:no,generateDefaultCacheControlHeader:Xe,isStale:so};function me(e){return `https://shopify.dev/?${e}`}function co(e){return e||ae()}async function Nt(e,t){if(!e)return;let r=me(t),o=new Request(r),a=await De.get(e,o);if(!a)return;let n=await a.text();try{return [z(n),a]}catch{return [n,a]}}async function Vt(e,t,r,o){if(!e)return;let a=me(t),n=new Request(a),i=new Response(JSON.stringify(r));await De.set(e,n,i,co(o));}function Mt(e,t){return De.isStale(new Request(me(e)),t)}function Ft(e){let t=Array.isArray(e)?e:[e],r="";for(let o of t)o!=null&&(typeof o=="object"?r+=JSON.stringify(o):r+=o.toString());return encodeURIComponent(r)}var Ze=new Set;async function ke(e,t,{strategy:r=J(),cacheInstance:o,shouldCacheResult:a=()=>!0,waitUntil:n,debugInfo:i}){let u=Date.now(),c=Ft([...typeof e=="string"?[e]:e]),s,l,y=m=>{l={displayName:m.displayName,url:m.response?.url,responseInit:{status:m.response?.status||0,statusText:m.response?.statusText||"",headers:Array.from(m.response?.headers.entries()||[])}};},f=()=>({...s,...i,url:l?.url||i?.url||s?.url||me(c),displayName:i?.displayName||l?.displayName||s?.displayName}),d=void 0;if(!o||!r||r.mode===je){let m=await t({addDebugData:y});return n?.(he(f(),u)),m}let p=m=>Vt(o,c,{value:m,debugInfo:void 0},r),h=await Nt(o,c);if(h&&typeof h[0]!="string"){let[{value:m,debugInfo:T},b]=h;s=T;let x=Mt(c,b)?"STALE":"HIT";if(!Ze.has(c)&&x==="STALE"){Ze.add(c);let _=Promise.resolve().then(async()=>{let K=Date.now();try{let U=await t({addDebugData:y});a(U)&&(await p(U),d?.({result:U,cacheStatus:"PUT",overrideStartTime:K}),await he(f(),K,"PUT"));}catch(U){U.message&&(U.message="SWR in sub-request failed: "+U.message),console.error(U);}finally{Ze.delete(c);}});n?.(_);}return n?.(he(f(),u,x)),m}let g=await t({addDebugData:y});if(n?.(he(f(),u,"MISS")),a(g)){let m=Promise.resolve().then(async()=>{let T=Date.now();await p(g),await he(f(),T,"PUT");});n?.(m);}return g}async function he(e,t,r){try{let o=uo(e?.requestId||$t(16)),a=Date.now(),n;e?.displayName?n=e.displayName:e.graphql&&(n=e.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")),r&&(n=`Cache [${r}] ${n}`);let i=await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({traceId:o,id:$t(16),name:n,timestamp:t*1e3,duration:(a-t)*1e3,parentId:o,tags:{"request.type":r?"cache":"subrequest"}})});}catch(o){console.error(o);}}function uo(e){let t=e.split(".");return t.length===2?t[1]:e}function $t(e){let t="";for(;t.length<e;)t+=Math.floor(Math.random()*16).toString(16);return t.substring(0,e)}function qt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function Ht([e,t]){return [e,new Response(e,t)]}var Qt=(e,t)=>!e?.errors&&t.status<400;async function Bt(e,t,{cacheInstance:r,cache:o,cacheKey:a=[e,t],shouldCacheResponse:n=()=>!0,waitUntil:i,returnType:u="json",debugInfo:c}={}){return !o&&(!t.method||t.method==="GET")&&(o=J()),ke(a,async()=>{let s=await fetch(e,t),l;try{l=await s[u]();}catch{try{l=await s.text();}catch{return qt("",s)}}return qt(l,s)},{cacheInstance:r,waitUntil:i,strategy:o??null,debugInfo:c,shouldCacheResult:s=>n(...Ht(s))}).then(Ht)}var ge="2024.4.3";var et="Custom-Storefront-Request-Group-ID",tt="X-Shopify-Storefront-Access-Token",rt="X-SDK-Variant",ot="X-SDK-Variant-Source",at="X-SDK-Version",Le="2024-04",ne=`Shopify Hydrogen ${ge}`,Gt="30243aa5-17c1-465a-8493-944bcc4e88aa",E="customerAccount",ie="buyer";function Wt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var jt=new Set,Jt=e=>{jt.has(e)||(console.warn(e),jt.add(e));},Kt=new Set,nt=e=>{Kt.has(e)||(console.error(new Error(e)),Kt.add(e));};function se(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var po=/(^|}\s)query[\s({]/im,lo=/(^|}\s)mutation[\s({]/im;function _e(e,t){if(!po.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function Ue(e,t){if(!lo.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var Y=class extends Error{locations;path;extensions;constructor(t,r={}){let a=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(a),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function Ce({url:e,response:t,errors:r,type:o,query:a,queryVariables:n,ErrorConstructor:i=Error,client:u="storefront"}){let c=(typeof r=="string"?r:r?.map?.(l=>l.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,s=new Y(c,{query:a,queryVariables:n,cause:{errors:r},clientOperation:`${u}.${o}`,requestId:t.headers.get("x-request-id")});throw new i(s.message,{cause:s.cause})}function ce(e,t={}){let r=new Error,o=(a,n="Error")=>{let i=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(u,c)=>u.replace(c,""));return `${n}: ${a}
`+i};return e.then(a=>{if(a?.errors&&Array.isArray(a.errors)){let n=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;a.errors.forEach(i=>{i&&(i.stack=o(i.message,i.name),n(i)&&console.error(i));});}return a}).catch(a=>{throw a&&(a.stack=o(a.message,a.name)),a})}var $=void 0;var Co={language:"EN",country:"US"};function gi(e){let {storefrontHeaders:t,cache:r,waitUntil:o,i18n:a,storefrontId:n,logErrors:i=!0,...u}=e,{getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getStorefrontApiUrl:y,getShopifyDomain:f}=hydrogenReact.createStorefrontClient(u),p=(u.privateStorefrontToken?l:s)({contentType:"json",buyerIp:t?.buyerIp||""});if(p[et]=t?.requestGroupId||Wt(),n&&(p[hydrogenReact.SHOPIFY_STOREFRONT_ID_HEADER]=n),(p["user-agent"]=`Hydrogen ${ge}`),t&&t.cookie){let m=hydrogenReact.getShopifyCookies(t.cookie??"");m[hydrogenReact.SHOPIFY_Y]&&(p[hydrogenReact.SHOPIFY_STOREFRONT_Y_HEADER]=m[hydrogenReact.SHOPIFY_Y]),m[hydrogenReact.SHOPIFY_S]&&(p[hydrogenReact.SHOPIFY_STOREFRONT_S_HEADER]=m[hydrogenReact.SHOPIFY_S]);}let h=JSON.stringify({"content-type":p["content-type"],"user-agent":p["user-agent"],[rt]:p[rt],[ot]:p[ot],[at]:p[at],[tt]:p[tt]});async function g({query:m,mutation:T,variables:b,cache:x,headers:_=[],storefrontApiVersion:K,displayName:U,stackInfo:Ee}){let C=_ instanceof Headers?Object.fromEntries(_.entries()):Array.isArray(_)?Object.fromEntries(_):_,P=m??T,A={...b};a&&(!b?.country&&/\$country/.test(P)&&(A.country=a.country),!b?.language&&/\$language/.test(P)&&(A.language=a.language));let v=y({storefrontApiVersion:K}),V=JSON.stringify({query:P,variables:A}),M={method:"POST",headers:{...p,...C},body:V},D=[v,M.method,h,M.body],[k,L]=await Bt(v,M,{cacheInstance:T?void 0:r,cache:x||ae(),cacheKey:D,shouldCacheResponse:Qt,waitUntil:o,debugInfo:{requestId:M.headers[et],displayName:U,url:v,stackInfo:Ee,graphql:V,purpose:t?.purpose}}),R={url:v,response:L,type:T?"mutation":"query",query:P,queryVariables:A,errors:void 0};if(!L.ok){let F;try{F=z(k);}catch{F=[{message:k}];}Ce({...R,errors:F});}let{data:B,errors:le}=k,oe=le?.map(({message:F,...ye})=>new Y(F,{...ye,clientOperation:`storefront.${R.type}`,requestId:L.headers.get("x-request-id"),queryVariables:A,query:P}));return S(B,oe)}return {storefront:{query(m,T){m=se(m),_e(m,"storefront.query");let b=Xt?.(m);return ce(g({...T,query:m,stackInfo:$?.(b)}),{stackOffset:b,logErrors:i})},mutate(m,T){m=se(m),Ue(m,"storefront.mutate");let b=Xt?.(m);return ce(g({...T,mutation:m,stackInfo:$?.(b)}),{stackOffset:b,logErrors:i})},cache:r,CacheNone:Ke,CacheLong:ze,CacheShort:J,CacheCustom:Ye,generateCacheControlHeader:fe,getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getShopifyDomain:f,getApiUrl:y,i18n:a??Co}}}var Xt=void 0;function S(e,t){return {...e,...t&&{errors:t}}}function Ne(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function X(e){return {requestId:e?Ne(e,"request-id"):void 0,purpose:e?Ne(e,"purpose"):void 0}}function Po({cache:e,waitUntil:t,request:r}){return function(a,n,i){return ke(a,i,{strategy:n,cacheInstance:e,waitUntil:t,debugInfo:{...X(r),stackInfo:$?.()}})}}var it=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:o,timestamp:a,...n}=r,i=new Headers(n.headers),u=i.get("cache-control")||i.get("real-cache-control")||"",c=parseInt(u.match(/max-age=(\d+)/)?.[1]||"0",10),s=parseInt(u.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),l=(Date.now()-a)/1e3;if(l>c+s){this.#e.delete(t.url);return}let f=l>c;return i.set("cache",f?"STALE":"HIT"),i.set("date",new Date(a).toUTCString()),new Response(o,{status:n.status??200,headers:i})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let o of this.#e.keys())(!t||t.url===o)&&r.push(new Request(o));return Promise.resolve(r)}};function Ve(e){if(!e)return;let{pathname:t,search:r}=new URL(e),o=t+r,a=new URLSearchParams(r),n=a.get("return_to")||a.get("redirect");if(n){if(er(e,n))return n;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${n}`);}}function er(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function st({requestUrl:e,defaultUrl:t,redirectUrl:r}){let o=e,a=Zt(e,t),n=r?Zt(e,r):a;return er(e,n.toString())?n.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${n}. Default url ${a} is used instead.`),a.toString())}function Zt(e,t){return So(t)?new URL(t):new URL(t,new URL(e).origin)}function So(e){try{return new URL(e),!0}catch{return !1}}async function Ao(e){let{storefront:t,request:r,noAdminRedirect:o,matchQueryParams:a,response:n=new Response("Not Found",{status:404})}=e,i=new URL(r.url),{pathname:u,searchParams:c}=i,s=c.has("_data");c.delete("redirect"),c.delete("return_to"),c.delete("_data");let l=(a?i.toString().replace(i.origin,""):u).toLowerCase();if(i.pathname==="/admin"&&!o)return ut(`${t.getShopifyDomain()}/admin`,s,c,a);try{let{urlRedirects:y}=await t.query(vo,{variables:{query:"path:"+l.replace(/\/+$/,"")}}),f=y?.edges?.[0]?.node?.target;if(f)return ut(f,s,c,a);let d=Ve(r.url);if(d)return ut(d,s,c,a)}catch(y){console.error(`Failed to fetch redirects from Storefront API for route ${l}`,y);}return n}var ct="https://example.com";function ut(e,t,r,o){let a=new URL(e,ct);if(!o)for(let[n,i]of r)a.searchParams.append(n,i);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":a.toString().replace(ct,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:a.toString().replace(ct,"")}})}var vo=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var To=async function({request:t,context:r}){let o=r.storefront,a=r.customerAccount,n=new URL(t.url);if(!o)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let i={};if(o){let s="X-Shopify-Storefront-Access-Token";i.storefront={name:"Storefront API",authHeader:s,accessToken:o.getPublicTokenHeaders()[s],apiUrl:o.getApiUrl(),icon:"SF"};}if(a){let s=await(await fetch(n.origin+"/graphiql/customer-account.schema.json")).json(),l=await a.getAccessToken();s&&(i["customer-account"]={name:"Customer Account API",value:s,authHeader:"Authorization",accessToken:l,apiUrl:a.getApiUrl(),icon:"CA"});}let u="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",c=String.raw;return new Response(c`
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
    `,{status:200,headers:{"content-type":"text/html"}})};var bo={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},Io=/[&><\u2028\u2029]/g;function tr(e){return e.replace(Io,t=>bo[t])}var G="Error in SEO input: ",q={title:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(G.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(G.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(G.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(G.concat("`handle` should start with `@`"));return e}}};function rr(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let o=H(q.title,e.title),a=dt(e?.titleTemplate,o);if(!a)break;t.push(O("title",{title:a}),O("meta",{property:"og:title",content:a}),O("meta",{name:"twitter:title",content:a}));break}case"description":{let o=H(q.description,e.description);if(!o)break;t.push(O("meta",{name:"description",content:o}),O("meta",{property:"og:description",content:o}),O("meta",{name:"twitter:description",content:o}));break}case"url":{let o=H(q.url,e.url);if(!o)break;let n=o.split("?")[0].replace(/\/$/,"");t.push(O("link",{rel:"canonical",href:n}),O("meta",{property:"og:url",content:n}));break}case"handle":{let o=H(q.handle,e.handle);if(!o)break;t.push(O("meta",{name:"twitter:site",content:o}),O("meta",{name:"twitter:creator",content:o}));break}case"media":{let o,a=W(e.media);for(let n of a)if(typeof n=="string"&&t.push(O("meta",{name:"og:image",content:n})),n&&typeof n=="object"){let i=n.type||"image",u=n?{url:n?.url,secure_url:n?.url,type:lt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let c of Object.keys(u))u[c]&&(o=u[c],t.push(O("meta",{property:`og:${i}:${c}`,content:o},u.url)));}break}case"jsonLd":{let o=W(e.jsonLd),a=0;for(let n of o){if(typeof n!="object")continue;let i=O("script",{type:"application/ld+json",children:JSON.stringify(n,(u,c)=>typeof c=="string"?tr(c):c)},`json-ld-${n?.["@type"]||n?.name||a++}`);t.push(i);}break}case"alternates":{let o=W(e.alternates);for(let a of o){if(!a)continue;let{language:n,url:i,default:u}=a,c=n?`${n}${u?"-default":""}`:void 0;t.push(O("link",{rel:"alternate",hrefLang:c,href:i}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:o,maxSnippet:a,maxVideoPreview:n,noArchive:i,noFollow:u,noImageIndex:c,noIndex:s,noSnippet:l,noTranslate:y,unavailableAfter:f}=e.robots,d=[i&&"noarchive",c&&"noimageindex",l&&"nosnippet",y&&"notranslate",o&&`max-image-preview:${o}`,a&&`max-snippet:${a}`,n&&`max-video-preview:${n}`,f&&`unavailable_after:${f}`],p=(s?"noindex":"index")+","+(u?"nofollow":"follow");for(let h of d)h&&(p+=`,${h}`);t.push(O("meta",{name:"robots",content:p}));break}}return t.flat().sort((r,o)=>r.key.localeCompare(o.key))}function O(e,t,r){let o={tag:e,props:{},key:""};return e==="title"?(o.children=t.title,o.key=pt(o),o):e==="script"?(o.children=typeof t.children=="string"?t.children:"",o.key=pt(o,r),delete t.children,o.props=t,o):(o.props=t,Object.keys(o.props).forEach(a=>!o.props[a]&&delete o.props[a]),o.key=pt(o,r),o)}function pt(e,t){let{tag:r,props:o}=e;if(r==="title")return "0-title";if(r==="meta"){let a=o.content===t&&typeof o.property=="string"&&!o.property.endsWith("secure_url")&&"0";return [r,...[t,a],o.property||o.name].filter(i=>i).join("-")}return r==="link"?[r,o.rel,o.hrefLang||o.media].filter(n=>n).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${o.type}`}function dt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function lt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function W(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var _o=react.lazy(()=>Promise.resolve().then(()=>(ir(),nr)));function Uo({debug:e}){let t=react$1.useMatches(),r=react$1.useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let o=react.useMemo(()=>t.flatMap(i=>{let{handle:u,...c}=i,s={...c,...r},l=u?.seo,y=c?.data?.seo;return !l&&!y?[]:l?Me(l,s):[y]}).reduce((i,u)=>{Object.keys(u).forEach(s=>!u[s]&&delete u[s]);let{jsonLd:c}=u;return c?i?.jsonLd?Array.isArray(c)?{...i,...u,jsonLd:[...i.jsonLd,...c]}:{...i,...u,jsonLd:[...i.jsonLd,c]}:{...i,...u,jsonLd:[c]}:{...i,...u}},{}),[t,r]),{html:a,loggerMarkup:n}=react.useMemo(()=>{let i=rr(o),u=i.map(s=>s.tag==="script"?react.createElement(s.tag,{...s.props,key:s.key,dangerouslySetInnerHTML:{__html:s.children}}):react.createElement(s.tag,{...s.props,key:s.key},s.children)),c=react.createElement(react.Suspense,{fallback:null},react.createElement(_o,{headTags:i}));return {html:u,loggerMarkup:c}},[o]);return react.createElement(react.Fragment,null,a,e&&n)}function Me(e,...t){if(e instanceof Function)return Me(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((o,a)=>[...o,Me(a)],[]),r):e instanceof Object?(Object.entries(e).forEach(([a,n])=>{r[a]=Me(n,...t);}),r):e}function No(...e){let t=[],r=e.reduce((o,a)=>{if(!a)return o;Object.keys(a).forEach(i=>!a[i]&&delete a[i]);let{jsonLd:n}=a;return n?o?.jsonLd?{...o,...a,jsonLd:W(o.jsonLd).concat(n)}:{...o,...a,jsonLd:[n]}:{...o,...a}},{})||{};for(let o of Object.keys(r))switch(o){case"title":{let a=H(q.title,r.title),n=dt(r?.titleTemplate,a);if(!n)break;t.push({title:n},{property:"og:title",content:n},{property:"twitter:title",content:n});break}case"description":{let a=H(q.description,r.description);if(!a)break;t.push({name:"description",content:a},{property:"og:description",content:a},{property:"twitter:description",content:a});break}case"url":{let a=H(q.url,r.url);if(!a)break;let i=a.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:i},{property:"og:url",content:i});break}case"handle":{let a=H(q.handle,r.handle);if(!a)break;t.push({property:"twitter:site",content:a},{property:"twitter:creator",content:a});break}case"media":{let a,n=W(r.media);for(let i of n)if(typeof i=="string"&&t.push({property:"og:image",content:i}),i&&typeof i=="object"){let u=i.type||"image",c=i?{url:i?.url,secure_url:i?.url,type:lt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let s of Object.keys(c))c[s]&&(a=c[s],t.push({property:`og:${u}:${s}`,content:a}));}break}case"jsonLd":{let a=W(r.jsonLd);for(let i of a)typeof i!="object"||Object.keys(i).length===0||t.push({"script:ld+json":i});break}case"alternates":{let a=W(r.alternates);for(let n of a){if(!n)continue;let{language:i,url:u,default:c}=n,s=i?`${i}${c?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:s,href:u});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:a,maxSnippet:n,maxVideoPreview:i,noArchive:u,noFollow:c,noImageIndex:s,noIndex:l,noSnippet:y,noTranslate:f,unavailableAfter:d}=r.robots,p=[u&&"noarchive",s&&"noimageindex",y&&"nosnippet",f&&"notranslate",a&&`max-image-preview:${a}`,n&&`max-snippet:${n}`,i&&`max-video-preview:${i}`,d&&`unavailable_after:${d}`],h=(l?"noindex":"index")+","+(c?"nofollow":"follow");for(let g of p)g&&(h+=`,${g}`);t.push({name:"robots",content:h});break}}return t}function qo({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let o=react$1.useNavigation().state==="loading",{endCursor:a,hasNextPage:n,hasPreviousPage:i,nextPageUrl:u,nodes:c,previousPageUrl:s,startCursor:l}=Ho(e),y=react.useMemo(()=>({pageInfo:{endCursor:a,hasPreviousPage:i,hasNextPage:n,startCursor:l},nodes:c}),[a,n,i,l,c]),f=react.useMemo(()=>react.forwardRef(function(h,g){return n?react.createElement(react$1.Link,{preventScrollReset:!0,...h,to:u,state:y,replace:!0,ref:g}):null}),[n,u,y]),d=react.useMemo(()=>react.forwardRef(function(h,g){return i?react.createElement(react$1.Link,{preventScrollReset:!0,...h,to:s,state:y,replace:!0,ref:g}):null}),[i,s,y]);return t({state:y,hasNextPage:n,hasPreviousPage:i,isLoading:o,nextPageUrl:u,nodes:c,previousPageUrl:s,NextLink:f,PreviousLink:d})}function Fe(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Se(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function Ho(e){e.pageInfo||Se("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Se("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Se("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Se("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Se("pageInfo.hasPreviousPage");let t=react$1.useNavigate(),{state:r,search:o,pathname:a}=react$1.useLocation(),u=new URLSearchParams(o).get("direction")==="previous",c=react.useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?hydrogenReact.flattenConnection(e):u?[...hydrogenReact.flattenConnection(e),...r.nodes]:[...r.nodes,...hydrogenReact.flattenConnection(e)],[r,e]),s=react.useMemo(()=>{let d=globalThis?.window?.__hydrogenHydrated,p=!d||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,h=!d||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!d||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,m=!d||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(u?(p=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(h=e.pageInfo.endCursor,m=e.pageInfo.hasNextPage)),{startCursor:p,endCursor:h,hasPreviousPage:g,hasNextPage:m}},[u,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),l=react.useRef({params:Fe(o),pathname:a});react.useEffect(()=>{window.__hydrogenHydrated=!0;},[]),react.useEffect(()=>{(Fe(o)!==l.current.params||a!==l.current.pathname)&&(l.current={pathname:a,params:Fe(o)},t(`${a}?${Fe(o)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[a,o]);let y=react.useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","previous"),s.startCursor&&d.set("cursor",s.startCursor),`?${d.toString()}`},[o,s.startCursor]),f=react.useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","next"),s.endCursor&&d.set("cursor",s.endCursor),`?${d.toString()}`},[o,s.endCursor]);return {...s,previousPageUrl:y,nextPageUrl:f,nodes:c}}function Qo(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,o=new URLSearchParams(new URL(e.url).search),a=o.get("cursor")??void 0;return (o.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:a??null}:{first:r,endCursor:a??null}}var N=class extends Response{constructor(t,r,o){super(`Bad request: ${t}`,{status:400,headers:o});}};function ve(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function Bo({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:o,debugInfo:a,exchangeForStorefrontCustomerAccessToken:n}){let i=new URLSearchParams,u=e.get(E),c=u?.refreshToken,s=u?.idToken;if(!c)throw new N("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");i.append("grant_type","refresh_token"),i.append("refresh_token",c),i.append("client_id",t);let l={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:o};new Date().getTime();let f=`${r}/auth/oauth/token`,d=await fetch(f,{method:"POST",headers:l,body:i});if(!d.ok){let T=await d.text();throw new Response(T,{status:d.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:p,expires_in:h,refresh_token:g}=await d.json(),m=await mt(p,t,r,o);e.set(E,{accessToken:m,expiresAt:new Date(new Date().getTime()+(h-120)*1e3).getTime()+"",refreshToken:g,idToken:s}),await n();}function ue(e){e.unset(E),e.unset(ie);}async function lr({locks:e,expiresAt:t,session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:n,debugInfo:i,exchangeForStorefrontCustomerAccessToken:u}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=Bo({session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:n,debugInfo:i,exchangeForStorefrontCustomerAccessToken:u})),await e.refresh,delete e.refresh;}catch(c){throw ue(r),c&&c.status!==401?c:new N("Unauthorized","Login before querying the Customer Account API.")}}function yr(){let e=Go();return mr(e)}async function fr(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=Wo(t);return mr(r)}function Go(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function mr(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Wo(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function hr(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function mt(e,t,r,o,a){let n=t;if(!e)throw new N("Unauthorized","oAuth access token was not provided during token exchange.");let i=new URLSearchParams;i.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),i.append("client_id",n),i.append("audience",Gt),i.append("subject_token",e),i.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),i.append("scopes","https://api.customers.com/auth/customer.graphql");let u={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:o};new Date().getTime();let s=`${r}/auth/oauth/token`,l=await fetch(s,{method:"POST",headers:u,body:i});let y=await l.json();if(y.error)throw new N(y.error_description);return y.access_token}function gr(e){return jo(e).payload.nonce}function jo(e){let[t,r,o]=e.split("."),a=JSON.parse(atob(t)),n=JSON.parse(atob(r));return {header:a,payload:n,signature:o}}function $e(){return Jo(Ko())}function Ko(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function Jo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var Cr="/account/login",zo="/account/authorize",Pr="/account";function Yo(e){if(!e.url)return Cr;let{pathname:t}=new URL(e.url),r=Cr+`?${new URLSearchParams({return_to:t}).toString()}`;return ve(r)}function Xo({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:o=Le,request:a,waitUntil:n,authUrl:i,customAuthStatusHandler:u,logErrors:c=!0,unstableB2b:s=!1}){if(o!==Le&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${Le}.`),!a?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let l=u||(()=>Yo(a)),y=new URL(a.url),f=y.protocol==="http:"?y.origin.replace("http","https"):y.origin,d=st({requestUrl:f,defaultUrl:zo,redirectUrl:i}),p=`${r}/account/customer/api/${o}/graphql`,h={};async function g({query:C,type:P,variables:A={}}){let v=await b();if(!v)throw l();new Date().getTime();let D=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ne,Origin:f,Authorization:v},body:JSON.stringify({query:C,variables:A})});let k=await D.text(),L={url:p,response:D,type:P,query:C,queryVariables:A,errors:void 0,client:"customer"};if(!D.ok){if(D.status===401)throw ue(e),l();let R;try{R=z(k);}catch{R=[{message:k}];}Ce({...L,errors:R});}try{let R=z(k),{errors:B}=R,le=B?.map(({message:oe,...F})=>new Y(oe,{...F,clientOperation:`customerAccount.${L.type}`,requestId:D.headers.get("x-request-id"),queryVariables:A,query:C}));return {...R,...B&&{errors:le}}}catch{Ce({...L,errors:[{message:k}]});}}async function m(){if(!r||!t)return !1;let C=e.get(E),P=C?.accessToken,A=C?.expiresAt;if(!P||!A)return !1;let v=$?.();try{await lr({locks:h,expiresAt:A,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:f,debugInfo:{waitUntil:n,stackInfo:v,...X(a)},exchangeForStorefrontCustomerAccessToken:Ee});}catch{return !1}return !0}async function T(){if(!await m())throw l()}async function b(){if(await m())return e.get(E)?.accessToken}async function x(C,P){return Te(r,t),C=se(C),Ue(C,"customer.mutate"),ce(g({query:C,type:"mutation",...P}),{logErrors:c})}async function _(C,P){return Te(r,t),C=se(C),_e(C,"customer.query"),ce(g({query:C,type:"query",...P}),{logErrors:c})}function K(C){e.set(ie,{...e.get(ie),...C});}async function U(){if(await m())return e.get(ie)}async function Ee(){if(!s)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:P}=await x(C),A=P?.storefrontCustomerAccessTokenCreate?.customerAccessToken;A&&K({customerAccessToken:A});}return {login:async C=>{Te(r,t);let P=new URL(`${r}/auth/oauth/authorize`),A=hr(),v=$e();if(P.searchParams.set("client_id",t),P.searchParams.set("scope","openid email"),P.searchParams.append("response_type","code"),P.searchParams.append("redirect_uri",d),P.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),P.searchParams.append("state",A),P.searchParams.append("nonce",v),C?.uiLocales){let[D,k]=C.uiLocales.split("-"),L=D.toLowerCase();k&&(L+=`-${k.toUpperCase()}`),P.searchParams.append("ui_locales",L);}let V=yr(),M=await fr(V);return e.set(E,{...e.get(E),codeVerifier:V,state:A,nonce:v,redirectPath:Ve(a.url)||Ne(a,"Referer")||Pr}),P.searchParams.append("code_challenge",M),P.searchParams.append("code_challenge_method","S256"),ve(P.toString())},logout:async C=>{Te(r,t);let P=e.get(E)?.idToken,A=st({requestUrl:f,defaultUrl:f,redirectUrl:C?.postLogoutRedirectUri}),v=P?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",P],["post_logout_redirect_uri",A]]).toString()}`).toString():A;return ue(e),ve(v)},isLoggedIn:m,handleAuthStatus:T,getAccessToken:b,getApiUrl:()=>p,mutate:x,query:_,authorize:async()=>{Te(r,t);let C=y.searchParams.get("code"),P=y.searchParams.get("state");if(!C||!P)throw ue(e),new N("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(E)?.state!==P)throw ue(e),new N("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let A=t,v=new URLSearchParams;v.append("grant_type","authorization_code"),v.append("client_id",A),v.append("redirect_uri",d),v.append("code",C);let V=e.get(E)?.codeVerifier;if(!V)throw new N("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");v.append("code_verifier",V);let M={"content-type":"application/x-www-form-urlencoded","User-Agent":ne,Origin:f},D=$?.();new Date().getTime();let L=`${r}/auth/oauth/token`,R=await fetch(L,{method:"POST",headers:M,body:v});if(!R.ok)throw new Response(await R.text(),{status:R.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:B,expires_in:le,id_token:oe,refresh_token:F}=await R.json(),ye=e.get(E)?.nonce,_t=await gr(oe);if(ye!==_t)throw new N("Unauthorized",`Returned nonce does not match: ${ye} !== ${_t}`);let zr=await mt(B,t,r,f,{waitUntil:n,stackInfo:D,...X(a)}),Yr=e.get(E)?.redirectPath;return e.set(E,{accessToken:zr,expiresAt:new Date(new Date().getTime()+(le-120)*1e3).getTime()+"",refreshToken:F,idToken:oe}),await Ee(),ve(Yr||Pr)},UNSTABLE_setBuyer:K,UNSTABLE_getBuyer:U}}function Te(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var Zo="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function ea({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||Zo)}var Sr="cartFormInput";function Q({children:e,action:t,inputs:r,route:o,fetcherKey:a}){let n=react$1.useFetcher({key:a});return jsxRuntime.jsxs(n.Form,{action:o||"",method:"post",children:[(t||r)&&jsxRuntime.jsx("input",{type:"hidden",name:Sr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(n):e]})}Q.INPUT_NAME=Sr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function ra(e){let t={};for(let i of e.entries()){let u=i[0],c=e.getAll(u);t[u]=c.length>1?c:i[1];}let{cartFormInput:r,...o}=t,{action:a,inputs:n}=r?JSON.parse(String(r)):{};return {action:a,inputs:{...n,...o}}}Q.getFormInput=ra;var I=`#graphql
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
`;function ht(e){return async(t,r)=>{let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:a,...n}=r||{},{buyerIdentity:i,...u}=t,{cartCreate:c,errors:s}=await e.storefront.mutate(na(e.cartFragment),{variables:{input:{...u,buyerIdentity:{...o,...i}},...n}});return S(c,s)}}var na=(e=w)=>`#graphql
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
  ${I}
`;function gt({storefront:e,customerAccount:t,getCartId:r,cartFragment:o}){return async a=>{let n=r();if(!n)return null;let[i,{cart:u,errors:c}]=await Promise.all([t?t.isLoggedIn():!1,e.query(ia(o),{variables:{cartId:n,...a},cache:e.CacheNone()})]);if(i&&u?.checkoutUrl){let s=new URL(u.checkoutUrl);s.searchParams.set("logged_in","true"),u.checkoutUrl=s.toString();}return u||c?S(u,c):null}}var ia=(e=sa)=>`#graphql
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
`,sa=`#graphql
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
`;function Ct(e){return async(t,r)=>{let{cartLinesAdd:o,errors:a}=await e.storefront.mutate(ca(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var ca=(e=w)=>`#graphql
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
  ${I}
`;var Ar="__h_pending_";function vr(e){return Ar+e}function qe(e){return e.startsWith(Ar)}function He(e,t){if(t.some(r=>qe(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function Pt(e){return async(t,r)=>{He("updateLines",t);let{cartLinesUpdate:o,errors:a}=await e.storefront.mutate(ua(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return S(o,a)}}var ua=(e=w)=>`#graphql
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
  ${I}
`;function St(e){return async(t,r)=>{He("removeLines",t);let{cartLinesRemove:o,errors:a}=await e.storefront.mutate(pa(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return S(o,a)}}var pa=(e=w)=>`#graphql
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
  ${I}
`;function At(e){return async(t,r)=>{let o=t.filter((i,u,c)=>c.indexOf(i)===u),{cartDiscountCodesUpdate:a,errors:n}=await e.storefront.mutate(da(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:o,...r}});return S(a,n)}}var da=(e=w)=>`#graphql
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
  ${I}
`;function vt(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:a,errors:n}=await e.storefront.mutate(la(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...o,...t},...r}});return S(a,n)}}var la=(e=w)=>`#graphql
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
  ${I}
`;function Tt(e){return async(t,r)=>{let{cartNoteUpdate:o,errors:a}=await e.storefront.mutate(ya(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return S(o,a)}}var ya=(e=w)=>`#graphql
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
  ${I}
`;function bt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:o,errors:a}=await e.storefront.mutate(fa(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return S(o,a)}}var fa=(e=w)=>`#graphql
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
  ${I}
`;function It(e){return async(t,r)=>{let{cartAttributesUpdate:o,errors:a}=await e.storefront.mutate(ma(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return S(o,a)}}var ma=(e=w)=>`#graphql
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
  ${I}
`;function wt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),a=t.map(u=>({...u,ownerId:o})),{cartMetafieldsSet:n,errors:i}=await e.storefront.mutate(ha(),{variables:{metafields:a}});return S({cart:{id:o},...n},i)}}var ha=()=>`#graphql
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
`;function Rt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),{cartMetafieldDelete:a,errors:n}=await e.storefront.mutate(ga(),{variables:{input:{ownerId:o,key:t}}});return S({cart:{id:o},...a},n)}}var ga=()=>`#graphql
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
`;var Pa=e=>{let t=cookie.parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var Aa=e=>t=>{let r=new Headers;return r.append("Set-Cookie",cookie.stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function va(e){let{getCartId:t,setCartId:r,storefront:o,customerAccount:a,cartQueryFragment:n,cartMutateFragment:i}=e,u=t(),c=()=>u||t(),s={storefront:o,getCartId:c,cartFragment:i,customerAccount:a},l=ht(s),y=async function(...d){let p=await l(...d);return u=p?.cart?.id,p},f={get:gt({storefront:o,customerAccount:a,getCartId:c,cartFragment:n}),getCartId:c,setCartId:r,create:y,addLines:async(d,p)=>{let h=d.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return u||p?.cartId?await Ct(s)(h,p):await y({lines:h},p)},updateLines:Pt(s),removeLines:St(s),updateDiscountCodes:async(d,p)=>u||p?.cartId?await At(s)(d,p):await y({discountCodes:d},p),updateBuyerIdentity:async(d,p)=>u||p?.cartId?await vt(s)(d,p):await y({buyerIdentity:d},p),updateNote:async(d,p)=>u||p?.cartId?await Tt(s)(d,p):await y({note:d},p),updateSelectedDeliveryOption:bt(s),updateAttributes:async(d,p)=>u||p?.cartId?await It(s)(d,p):await y({attributes:d},p),setMetafields:async(d,p)=>u||p?.cartId?await wt(s)(d,p):await y({metafields:d},p),deleteMetafield:Rt(s)};return "customMethods"in e?{...f,...e.customMethods??{}}:f}function ba(e){let t=react$1.useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},o=r.lines.nodes,a=!1;for(let{formData:n}of t){if(!n)continue;let i=Q.getFormInput(n);if(i.action===Q.ACTIONS.LinesAdd)for(let u of i.inputs.lines){if(!u.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let c=o.find(s=>s.merchandise.id===u.selectedVariant?.id);a=!0,c?(c.quantity=(c.quantity||1)+(u.quantity||1),c.isOptimistic=!0):o.unshift({id:vr(u.selectedVariant.id),merchandise:u.selectedVariant,isOptimistic:!0,quantity:u.quantity||1});}else if(i.action===Q.ACTIONS.LinesRemove)for(let u of i.inputs.lineIds){let c=o.findIndex(s=>s.id===u);if(c!==-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${u}' but it doesn't exist in the cart`);}else if(i.action===Q.ACTIONS.LinesUpdate)for(let u of i.inputs.lines){let c=o.findIndex(s=>u.id===s.id);if(c>-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}o[c].quantity=u.quantity,o[c].quantity===0&&o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${u.id}' but it doesn't exist in the cart`);}}return a&&(r.isOptimistic=a),r}function xa({handle:e,options:t=[],variants:r=[],productPath:o="products",waitForNavigation:a=!1,children:n}){let i=r instanceof Array?r:hydrogenReact.flattenConnection(r),{searchParams:u,path:c,alreadyOnProductPage:s}=ka(e,o,a),l=t.filter(y=>y?.values?.length===1);return react.createElement(react.Fragment,null,...react.useMemo(()=>t.map(y=>{let f,d=[];for(let p of y.values){let h=new URLSearchParams(s?u:void 0);h.set(y.name,p),l.forEach(x=>{h.set(x.name,x.values[0]);});let g=i.find(x=>x?.selectedOptions?.every(_=>h.get(_?.name)===_?.value)),m=u.get(y.name),T=m?m===p:!1;T&&(f=p);let b="?"+h.toString();d.push({value:p,isAvailable:g?g.availableForSale:!0,to:c+b,search:b,isActive:T,variant:g});}return n({option:{name:y.name,value:f,values:d}})}),[t,i,n]))}var Da=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((o,a)=>{r.push({name:a,value:o});}),r};function ka(e,t,r){let{pathname:o,search:a}=react$1.useLocation(),n=react$1.useNavigation();return react.useMemo(()=>{let i=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o),u=i&&i.length>0;t=t.startsWith("/")?t.substring(1):t;let c=u?`${i[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||n.state!=="loading"?a:n.location.search),alreadyOnProductPage:c===o,path:c}},[o,a,r,e,t,n])}function Na(e,t){let r=react$1.useNavigation(),[o,a]=react.useState([]);if(react.useEffect(()=>{Promise.resolve(t).then(n=>{n&&a(n instanceof Array?n:n.product?.variants?.nodes||[]);}).catch(n=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:n}));});},[t]),r.state==="loading"){let n=new URLSearchParams(r.location.search),i=!1,u=o.find(c=>c.selectedOptions?c.selectedOptions.every(s=>n.get(s.name)===s.value):(i||(i=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(u)return {...e,isOptimistic:!0,selectedVariant:u}}return e}var br=react.createContext(void 0),qa=br.Provider,Et=()=>react.useContext(br);function Ha(e){let t=$e(),r=Qa(t,e);return {nonce:t,header:r,NonceProvider:({children:a})=>react.createElement(qa,{value:t},a)}}function Qa(e,t){let{shop:r,...o}=t??{},a=`'nonce-${e}'`,n=["'self'","'unsafe-inline'","https://cdn.shopify.com"],i=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&i.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&i.push(`https://${r.storeDomain}`);let c={baseUri:["'self'"],defaultSrc:["'self'",a,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:n,connectSrc:i},s=Object.assign({},c,o);for(let l in c){let y=o[l];l&&y&&(s[l]=Ba(y,c[l]));}return s.scriptSrc instanceof Array&&!s.scriptSrc.includes(a)?s.scriptSrc.push(a):s.defaultSrc instanceof Array&&!s.defaultSrc.includes(a)&&s.defaultSrc.push(a),$a__default.default({directives:s})}function Ba(e,t){let r=typeof t=="string"?[t]:t,o=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(n=>n==="'none'")?o:[...o,...r]:r}var Wa=react.forwardRef((e,t)=>{let r=Et();return jsxRuntime.jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function Ja(e){let t=react$1.useFetchers(),r={};for(let{formData:o}of t)if(o?.get("optimistic-identifier")===e)try{if(o.has("optimistic-data")){let a=JSON.parse(String(o.get("optimistic-data")));Object.assign(r,a);}}catch{}return r}function za({id:e,data:t}){return jsxRuntime.jsxs(jsxRuntime.Fragment,{children:[jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function en(e){return jsxRuntime.jsx(hydrogenReact.ShopPayButton,{channel:"hydrogen",...e})}function pe(e){let{type:t,data:r={},customData:o}=e,a=react$1.useLocation(),{publish:n,cart:i,prevCart:u,shop:c,customData:s}=ee(),l=a.pathname+a.search,y={...r,customData:{...s,...o},cart:i,prevCart:u,shop:c};return react.useEffect(()=>{c?.shopId&&(y={...y,url:window.location.href},n(t,y));},[n,l,c?.shopId]),null}function wr(e){return jsxRuntime.jsx(pe,{...e,type:"page_viewed"})}function Rr(e){return jsxRuntime.jsx(pe,{...e,type:"product_viewed"})}function Er(e){return jsxRuntime.jsx(pe,{...e,type:"collection_viewed"})}function Or(e){return jsxRuntime.jsx(pe,{...e,type:"cart_viewed"})}function xr(e){return jsxRuntime.jsx(pe,{...e,type:"search_viewed"})}function Dr(e){return jsxRuntime.jsx(pe,{...e})}var te={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var sn="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",cn="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function Lr(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function Ot(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:o,...a}=e,n=react.useRef(!1),i=hydrogenReact.useLoadScript(t?cn:sn,{attributes:{id:"customer-privacy-api"}});react.useEffect(()=>{let u=c=>{r&&r(c.detail);};return document.addEventListener("visitorConsentCollected",u),()=>{document.removeEventListener("visitorConsentCollected",u);}},[r]),react.useEffect(()=>{if(i!=="done"||n.current)return;n.current=!0;let{checkoutDomain:u,storefrontAccessToken:c}=a;u||Lr("checkoutDomain"),c||Lr("storefrontAccessToken"),(c.startsWith("shpat_")||c.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let s={checkoutRootDomain:u,storefrontAccessToken:c};if(u){let f=window.document.location.host,d=u.split(".").reverse(),p=f.split(".").reverse(),h=[];d.forEach((g,m)=>{g===p[m]&&h.push(g);}),f=h.reverse().join("."),f&&(s.storefrontRootDomain=f);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(s),!window.Shopify?.customerPrivacy)return;let l=window.Shopify.customerPrivacy.setTrackingConsent;function y(f,d){l({...f,headlessStorefront:!0,...s},d);}window.Shopify.customerPrivacy.setTrackingConsent=y,o&&o();},[i,t,a]);}function xt(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function ln(){let e=xt();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function Ur({consent:e,onReady:t,domain:r}){let{subscribe:o,register:a,canTrack:n}=ee(),[i,u]=react.useState(!1),[c,s]=react.useState(!1),{ready:l}=a("Internal_Shopify_Analytics"),{ready:y}=a("Internal_Shopify_CustomerPrivacy"),f=()=>{i&&c&&t();},d=()=>{s(!0),y(),f();},{checkoutDomain:p,storefrontAccessToken:h,withPrivacyBanner:g}=e;return Ot({checkoutDomain:p||"mock.shop",storefrontAccessToken:h||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:d,onReady:()=>{setTimeout(d,3e3);}}),hydrogenReact.useShopifyCookies({hasUserConsent:i&&c?n():!0,domain:r,checkoutDomain:p}),react.useEffect(()=>{o(te.PAGE_VIEWED,fn),o(te.PRODUCT_VIEWED,mn),o(te.COLLECTION_VIEWED,hn),o(te.SEARCH_VIEWED,gn),o(te.PRODUCT_ADD_TO_CART,Cn),l(),u(!0),f();},[o,l]),null}function Qe(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function we(e){let t=ln(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){Qe("shopId");return}if(!e?.shop?.acceptedLanguage){Qe("acceptedLanguage");return}if(!e?.shop?.currency){Qe("currency");return}if(!e?.shop?.hydrogenSubchannelId){Qe("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...hydrogenReact.getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function yn(e,t){if(t===null)return;let r=we(e);return r?{...r,cartId:t.id}:void 0}var j={};function fn(e){let t=we(e);t&&(hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...j}}),j={});}function mn(e){let t=we(e);if(t&&Nr({type:"product",products:e.products})){let r=Dt(e.products);j={pageType:hydrogenReact.AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...j,products:Dt(e.products)},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function hn(e){let t=we(e);t&&(j={pageType:hydrogenReact.AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...j,collectionHandle:e.collection.handle},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function gn(e){let t=we(e);t&&(j={pageType:hydrogenReact.AnalyticsPageType.search},t={...t,...j,searchString:e.searchTerm},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.SEARCH_VIEW,payload:t}));}function Cn(e){let{cart:t,currentLine:r}=e,o=yn(e,t);!o||!r?.id||Pn({matchedLine:r,eventPayload:o});}function Pn({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};Nr({type:"cart",products:[r]})&&hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.ADD_TO_CART,payload:{...t,products:Dt([r])}});}function re(e,t,r,o){if(e==="cart"){let a=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${a}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${a}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let a=`${o||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${a}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${a}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function Nr({type:e,products:t}){return !t||t.length===0?(re(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return re(e,"id",!1),!1;if(!r.title)return re(e,"title",!1),!1;if(!r.price)return re(e,"price.amount",!0,"price"),!1;if(!r.vendor)return re(e,"vendor",!1),!1;if(!r.variantId)return re(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return re(e,"title",!0,"variantTitle"),!1}),!0)}function Dt(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function Fr(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function $r({cart:e,setCarts:t}){let{publish:r,shop:o,customData:a,canTrack:n,cart:i,prevCart:u}=ee(),c=react.useRef(null);return react.useEffect(()=>{if(e)return Promise.resolve(e).then(s=>{if(s&&s.lines){if(!s.id){Fr("id");return}if(!s.updatedAt){Fr("updatedAt");return}}t(({cart:l,prevCart:y})=>s?.updatedAt!==l?.updatedAt?{cart:s,prevCart:l}:{cart:l,prevCart:y});}),()=>{}},[t,e]),react.useEffect(()=>{if(!i||!i?.updatedAt||i?.updatedAt===u?.updatedAt)return;let s;try{s=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{s=null;}if(i.id===s?.id&&i.updatedAt===s?.updatedAt)return;let l={eventTimestamp:Date.now(),cart:i,prevCart:u,shop:o,customData:a};if(i.updatedAt===c.current)return;c.current=i.updatedAt,r("cart_updated",l),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:i.id,updatedAt:i.updatedAt}));let y=u?.lines?hydrogenReact.flattenConnection(u?.lines):[],f=i.lines?hydrogenReact.flattenConnection(i.lines):[];y?.forEach(d=>{let p=f.filter(h=>d.id===h.id);if(p?.length===1){let h=p[0];d.quantity<h.quantity?r("product_added_to_cart",{...l,prevLine:d,currentLine:h}):d.quantity>h.quantity&&r("product_removed_from_cart",{...l,prevLine:d,currentLine:h});}else r("product_removed_from_cart",{...l,prevLine:d});}),f?.forEach(d=>{let p=y.filter(h=>d.id===h.id);(!p||p.length===0)&&r("product_added_to_cart",{...l,currentLine:d});});},[i,u,r,o,a,n]),null}var wn={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},Wr=react.createContext(wn),Ge=new Map,Re={};function jr(){return Object.values(Re).every(Boolean)}function qr(e,t){Ge.has(e)||Ge.set(e,new Map),Ge.get(e)?.set(t.toString(),t);}var We=new Map;function Hr(e,t){if(!jr()){We.set(e,t);return}Kr(e,t);}function Kr(e,t){(Ge.get(e)??new Map).forEach((r,o)=>{try{r(t);}catch(a){typeof a=="object"&&a instanceof Error?console.error("Analytics publish error",a.message,o,a.stack):console.error("Analytics publish error",a,o);}});}function Qr(e){return Re.hasOwnProperty(e)||(Re[e]=!1),{ready:()=>{Re[e]=!0,jr()&&We.size>0&&(We.forEach((t,r)=>{Kr(r,t);}),We.clear());}}}function Br(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function Gr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function Rn({canTrack:e,cart:t,children:r,consent:o,customData:a={},shop:n=null,disableThrowOnError:i=!1,cookieDomain:u}){let c=react.useRef(!1),{shop:s}=En(n),[l,y]=react.useState(!!e),[f,d]=react.useState({cart:null,prevCart:null}),[p,h]=react.useState(e?()=>e:()=>Br);if(s)if(/\/68817551382$/.test(s.shopId))Jt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!o.checkoutDomain){let m=Gr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");nt(m);}if(!o.storefrontAccessToken){let m=Gr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");nt(m);}}let g=react.useMemo(()=>({canTrack:p,...f,customData:a,publish:p()?Hr:()=>{},shop:s,subscribe:qr,register:Qr}),[l,p(),p,JSON.stringify(p),f,f.cart?.updatedAt,f.prevCart,Hr,qr,a,s,Qr,JSON.stringify(Re)]);return jsxRuntime.jsxs(Wr.Provider,{value:g,children:[r,!!s&&jsxRuntime.jsx(wr,{}),!!s&&!!t&&jsxRuntime.jsx($r,{cart:t,setCarts:d}),!!s&&o.checkoutDomain&&jsxRuntime.jsx(Ur,{consent:o,onReady:()=>{c.current=!0,y(!0),h(()=>Br);},domain:u})]})}function ee(){let e=react.useContext(Wr);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function En(e){let[t,r]=react.useState(null);return react.useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function On({storefront:e,publicStorefrontId:t="0"}){return e.query(xn,{cache:e.CacheLong()}).then(({shop:r,localization:o})=>({shopId:r.id,acceptedLanguage:o.language.isoCode,currency:o.country.currency.isoCode,hydrogenSubchannelId:t}))}var xn=`#graphql
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
`,Dn={CartView:Or,CollectionView:Er,CustomView:Dr,ProductView:Rr,Provider:Rn,SearchView:xr};var Un=function(e){return jsxRuntime.jsx(hydrogenReact.RichText,{...e,components:{link:({node:t})=>jsxRuntime.jsx(react$1.Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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
exports.Analytics = Dn;
exports.AnalyticsEvent = te;
exports.CacheCustom = Ye;
exports.CacheLong = ze;
exports.CacheNone = Ke;
exports.CacheShort = J;
exports.CartForm = Q;
exports.InMemoryCache = it;
exports.OptimisticInput = za;
exports.Pagination = qo;
exports.RichText = Un;
exports.Script = Wa;
exports.Seo = Uo;
exports.ShopPayButton = en;
exports.VariantSelector = xa;
exports.cartAttributesUpdateDefault = It;
exports.cartBuyerIdentityUpdateDefault = vt;
exports.cartCreateDefault = ht;
exports.cartDiscountCodesUpdateDefault = At;
exports.cartGetDefault = gt;
exports.cartGetIdDefault = Pa;
exports.cartLinesAddDefault = Ct;
exports.cartLinesRemoveDefault = St;
exports.cartLinesUpdateDefault = Pt;
exports.cartMetafieldDeleteDefault = Rt;
exports.cartMetafieldsSetDefault = wt;
exports.cartNoteUpdateDefault = Tt;
exports.cartSelectedDeliveryOptionsUpdateDefault = bt;
exports.cartSetIdDefault = Aa;
exports.changelogHandler = ea;
exports.createCartHandler = va;
exports.createContentSecurityPolicy = Ha;
exports.createCustomerAccountClient = Xo;
exports.createStorefrontClient = gi;
exports.createWithCache = Po;
exports.formatAPIResult = S;
exports.generateCacheControlHeader = fe;
exports.getCustomerPrivacy = xt;
exports.getPaginationVariables = Qo;
exports.getSelectedProductOptions = Da;
exports.getSeoMeta = No;
exports.getShopAnalytics = On;
exports.graphiqlLoader = To;
exports.storefrontRedirect = Ao;
exports.useAnalytics = ee;
exports.useCustomerPrivacy = Ot;
exports.useNonce = Et;
exports.useOptimisticCart = ba;
exports.useOptimisticData = Ja;
exports.useOptimisticProduct = Na;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map