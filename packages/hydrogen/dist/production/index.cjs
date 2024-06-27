'use strict';

var hydrogenReact = require('@shopify/hydrogen-react');
var react = require('react');
var react$1 = require('@remix-run/react');
var jsxRuntime = require('react/jsx-runtime');
var cookie = require('worktop/cookie');
var qa = require('content-security-policy-builder');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var qa__default = /*#__PURE__*/_interopDefault(qa);

var Xr=Object.defineProperty;var Zr=(e,t)=>()=>(e&&(t=e(e=0)),t);var eo=(e,t)=>{for(var r in t)Xr(e,r,{get:t[r],enumerable:!0});};var nr={};eo(nr,{default:()=>or,logSeoTags:()=>ar});function or({headTags:e}){return ar(e),null}function ar(e){console.log(" "),console.log("%cSEO Meta Tags",`${Ro}`),console.log(" "),e.forEach(t=>{if(t.tag==="script"){if(console.log("%c\u2022 JSON LD ",yt),t.children)try{console.table(JSON.parse(t.children),["name","content"]);}catch{console.log(t.children);}}else {if(console.log(`%c\u2022 ${t.tag} `,yt),t.children)if(typeof t.children=="string")console.log(`\u21B3 ${t.children}`);else try{Object.entries(JSON.parse(t.children)).map(([r,o])=>console.log(`\u21B3 ${o}`));}catch{console.log(t.children);}if(t.props.property==="og:image:url"){let r=t.props.content;Eo(r).then(o=>{let a=`font-size: 400px; padding: 10px; background: white url(${o}) no-repeat center; background-size: contain;`;console.log("%c\u2022 Share image preview",yt),console.log("%c  ",a),console.log(`\u21B3 ${r}`);}).catch(o=>{console.error(o);});}Object.entries(t.props).map(([r,o])=>{console.log(`\u21B3 ${r} \u2192 ${o}`);});}console.log(" ");});}async function Eo(e){let o=await(await(await fetch(e)).blob()).arrayBuffer();return `data:image/png;base64,${Oo(o)}`}function Oo(e){let t="",r=new Uint8Array(e),o=r.byteLength;for(let a=0;a<o;a++)t+=String.fromCharCode(r[a]);return btoa(t)}var yt,Ro,ir=Zr(()=>{yt="text-transform: uppercase;",Ro="text-transform: uppercase; font-weight: bold; text-transform: uppercase;font-weight: bold";});var Oe="public",to="private",je="no-store",Ut={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function me(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):Ut[r]&&t.push(`${Ut[r]}=${e[r]}`);}),t.join(", ")}function Ke(){return {mode:je}}function Je(e){if(e?.mode&&e?.mode!==Oe&&e?.mode!==to)throw Error("'mode' must be either 'public' or 'private'")}function J(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:9,...e}}function ze(e){return Je(e),{mode:Oe,maxAge:3600,staleWhileRevalidate:82800,...e}}function ne(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:86399,...e}}function Ye(e){return e}function z(e){return String(e).includes("__proto__")?JSON.parse(e,ro):JSON.parse(e)}function ro(e,t){if(e!=="__proto__")return t}function xe(e,t){return e&&t?{...e,...t}:e||ne()}function Xe(e){return me(xe(e))}async function oo(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function ao(e,t,r,o){if(!e)return;let a=xe(o),i=Xe(xe(a,{maxAge:(a.maxAge||0)+(a.staleWhileRevalidate||0)})),n=Xe(xe(a));r.headers.set("cache-control",i),r.headers.set("real-cache-control",n),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function no(e,t){e&&await e.delete(t);}function io(e,t){let r=e.headers.get("real-cache-control"),o=0;if(r){let i=r.match(/max-age=(\d*)/);i&&i.length>1&&(o=parseFloat(i[1]));}return [(Date.now()-Number(t))/1e3,o]}function so(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[o,a]=io(t,r),i=o>a;return i}var De={get:oo,set:ao,delete:no,generateDefaultCacheControlHeader:Xe,isStale:so};function he(e){return `https://shopify.dev/?${e}`}function co(e){return e||ne()}async function Nt(e,t){if(!e)return;let r=he(t),o=new Request(r),a=await De.get(e,o);if(!a)return;let i=await a.text();try{return [z(i),a]}catch{return [i,a]}}async function Vt(e,t,r,o){if(!e)return;let a=he(t),i=new Request(a),n=new Response(JSON.stringify(r));await De.set(e,i,n,co(o));}function Mt(e,t){return De.isStale(new Request(he(e)),t)}function Ft(e){let t=Array.isArray(e)?e:[e],r="";for(let o of t)o!=null&&(typeof o=="object"?r+=JSON.stringify(o):r+=o.toString());return encodeURIComponent(r)}function Y(e,t,r,o){globalThis.__SPANS=globalThis.__SPANS||[];try{let a=po(e?.requestId||$t(16)),i=Date.now(),n="unknown";e?.displayName?n=e.displayName:e.graphql&&(n=e.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")||"GraphQL"),r&&(n=`Cache [${r}] ${n}`);let u={traceId:a,id:o?a:$t(16),name:n,timestamp:t*1e3,duration:(i-t)*1e3,parentId:o?void 0:a,tags:{"request.type":r?"cache":"subrequest"}};globalThis.__SPANS.push(u);}catch(a){console.error(a);}}async function uo(){if(globalThis.__SPANS){let e=globalThis.__SPANS;globalThis.__SPANS=[],await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});}}function po(e){let t=e.split(".");return t.length===2?t[1]:e}function $t(e){let t="";for(;t.length<e;)t+=Math.floor(Math.random()*16).toString(16);return t.substring(0,e)}var Ze=new Set;async function ke(e,t,{strategy:r=J(),cacheInstance:o,shouldCacheResult:a=()=>!0,waitUntil:i,debugInfo:n}){let u=Date.now(),c=Ft([...typeof e=="string"?[e]:e]),s,l,y=m=>{l={displayName:m.displayName,url:m.response?.url,responseInit:{status:m.response?.status||0,statusText:m.response?.statusText||"",headers:Array.from(m.response?.headers.entries()||[])}};},f=()=>({...s,...n,url:l?.url||n?.url||s?.url||he(c),displayName:n?.displayName||l?.displayName||s?.displayName}),d=void 0;if(!o||!r||r.mode===je){let m=await t({addDebugData:y});return Y(f(),u),m}let p=m=>Vt(o,c,{value:m,debugInfo:void 0},r),h=await Nt(o,c);if(h&&typeof h[0]!="string"){let[{value:m,debugInfo:v},b]=h;s=v;let x=Mt(c,b)?"STALE":"HIT";if(!Ze.has(c)&&x==="STALE"){Ze.add(c);let _=Promise.resolve().then(async()=>{let K=Date.now();try{let U=await t({addDebugData:y});a(U)&&(await p(U),d?.({result:U,cacheStatus:"PUT",overrideStartTime:K}),Y(f(),K,"PUT"));}catch(U){U.message&&(U.message="SWR in sub-request failed: "+U.message),console.error(U);}finally{Ze.delete(c);}});i?.(_);}return Y(f(),u,x),m}let g=await t({addDebugData:y});if(Y(f(),u,"MISS"),a(g)){let m=Promise.resolve().then(async()=>{let v=Date.now();await p(g),Y(f(),v,"PUT");});i?.(m);}return g}function qt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function Ht([e,t]){return [e,new Response(e,t)]}var Qt=(e,t)=>!e?.errors&&t.status<400;async function Bt(e,t,{cacheInstance:r,cache:o,cacheKey:a=[e,t],shouldCacheResponse:i=()=>!0,waitUntil:n,returnType:u="json",debugInfo:c}={}){return !o&&(!t.method||t.method==="GET")&&(o=J()),ke(a,async()=>{let s=await fetch(e,t),l;try{l=await s[u]();}catch{try{l=await s.text();}catch{return qt("",s)}}return qt(l,s)},{cacheInstance:r,waitUntil:n,strategy:o??null,debugInfo:c,shouldCacheResult:s=>i(...Ht(s))}).then(Ht)}var ge="2024.4.3";var et="Custom-Storefront-Request-Group-ID",tt="X-Shopify-Storefront-Access-Token",rt="X-SDK-Variant",ot="X-SDK-Variant-Source",at="X-SDK-Version",Le="2024-04",ie=`Shopify Hydrogen ${ge}`,Gt="30243aa5-17c1-465a-8493-944bcc4e88aa",E="customerAccount",se="buyer";function Wt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var jt=new Set,Jt=e=>{jt.has(e)||(console.warn(e),jt.add(e));},Kt=new Set,nt=e=>{Kt.has(e)||(console.error(new Error(e)),Kt.add(e));};function ce(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var lo=/(^|}\s)query[\s({]/im,yo=/(^|}\s)mutation[\s({]/im;function _e(e,t){if(!lo.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function Ue(e,t){if(!yo.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var X=class extends Error{locations;path;extensions;constructor(t,r={}){let a=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(a),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function Ce({url:e,response:t,errors:r,type:o,query:a,queryVariables:i,ErrorConstructor:n=Error,client:u="storefront"}){let c=(typeof r=="string"?r:r?.map?.(l=>l.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,s=new X(c,{query:a,queryVariables:i,cause:{errors:r},clientOperation:`${u}.${o}`,requestId:t.headers.get("x-request-id")});throw new n(s.message,{cause:s.cause})}function ue(e,t={}){let r=new Error,o=(a,i="Error")=>{let n=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(u,c)=>u.replace(c,""));return `${i}: ${a}
`+n};return e.then(a=>{if(a?.errors&&Array.isArray(a.errors)){let i=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;a.errors.forEach(n=>{n&&(n.stack=o(n.message,n.name),i(n)&&console.error(n));});}return a}).catch(a=>{throw a&&(a.stack=o(a.message,a.name)),a})}var $=void 0;var So={language:"EN",country:"US"};function Pi(e){let {storefrontHeaders:t,cache:r,waitUntil:o,i18n:a,storefrontId:i,logErrors:n=!0,...u}=e,{getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getStorefrontApiUrl:y,getShopifyDomain:f}=hydrogenReact.createStorefrontClient(u),p=(u.privateStorefrontToken?l:s)({contentType:"json",buyerIp:t?.buyerIp||""});if(p[et]=t?.requestGroupId||Wt(),i&&(p[hydrogenReact.SHOPIFY_STOREFRONT_ID_HEADER]=i),(p["user-agent"]=`Hydrogen ${ge}`),t&&t.cookie){let m=hydrogenReact.getShopifyCookies(t.cookie??"");m[hydrogenReact.SHOPIFY_Y]&&(p[hydrogenReact.SHOPIFY_STOREFRONT_Y_HEADER]=m[hydrogenReact.SHOPIFY_Y]),m[hydrogenReact.SHOPIFY_S]&&(p[hydrogenReact.SHOPIFY_STOREFRONT_S_HEADER]=m[hydrogenReact.SHOPIFY_S]);}let h=JSON.stringify({"content-type":p["content-type"],"user-agent":p["user-agent"],[rt]:p[rt],[ot]:p[ot],[at]:p[at],[tt]:p[tt]});async function g({query:m,mutation:v,variables:b,cache:x,headers:_=[],storefrontApiVersion:K,displayName:U,stackInfo:Ee}){let C=_ instanceof Headers?Object.fromEntries(_.entries()):Array.isArray(_)?Object.fromEntries(_):_,S=m??v,A={...b};a&&(!b?.country&&/\$country/.test(S)&&(A.country=a.country),!b?.language&&/\$language/.test(S)&&(A.language=a.language));let T=y({storefrontApiVersion:K}),V=JSON.stringify({query:S,variables:A}),M={method:"POST",headers:{...p,...C},body:V},D=[T,M.method,h,M.body],[k,L]=await Bt(T,M,{cacheInstance:v?void 0:r,cache:x||ne(),cacheKey:D,shouldCacheResponse:Qt,waitUntil:o,debugInfo:{requestId:M.headers[et],displayName:U,url:T,stackInfo:Ee,graphql:V,purpose:t?.purpose}}),R={url:T,response:L,type:v?"mutation":"query",query:S,queryVariables:A,errors:void 0};if(!L.ok){let F;try{F=z(k);}catch{F=[{message:k}];}Ce({...R,errors:F});}let{data:B,errors:ye}=k,ae=ye?.map(({message:F,...fe})=>new X(F,{...fe,clientOperation:`storefront.${R.type}`,requestId:L.headers.get("x-request-id"),queryVariables:A,query:S}));return P(B,ae)}return {storefront:{query(m,v){m=ce(m),_e(m,"storefront.query");let b=Xt?.(m);return ue(g({...v,query:m,stackInfo:$?.(b)}),{stackOffset:b,logErrors:n})},mutate(m,v){m=ce(m),Ue(m,"storefront.mutate");let b=Xt?.(m);return ue(g({...v,mutation:m,stackInfo:$?.(b)}),{stackOffset:b,logErrors:n})},cache:r,CacheNone:Ke,CacheLong:ze,CacheShort:J,CacheCustom:Ye,generateCacheControlHeader:me,getPublicTokenHeaders:s,getPrivateTokenHeaders:l,getShopifyDomain:f,getApiUrl:y,i18n:a??So}}}var Xt=void 0;function P(e,t){return {...e,...t&&{errors:t}}}function Ne(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function Z(e){return {requestId:e?Ne(e,"request-id"):void 0,purpose:e?Ne(e,"purpose"):void 0}}function Po({cache:e,waitUntil:t,request:r}){return function(a,i,n){return ke(a,n,{strategy:i,cacheInstance:e,waitUntil:t,debugInfo:{...Z(r),stackInfo:$?.()}})}}var it=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:o,timestamp:a,...i}=r,n=new Headers(i.headers),u=n.get("cache-control")||n.get("real-cache-control")||"",c=parseInt(u.match(/max-age=(\d+)/)?.[1]||"0",10),s=parseInt(u.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),l=(Date.now()-a)/1e3;if(l>c+s){this.#e.delete(t.url);return}let f=l>c;return n.set("cache",f?"STALE":"HIT"),n.set("date",new Date(a).toUTCString()),new Response(o,{status:i.status??200,headers:n})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let o of this.#e.keys())(!t||t.url===o)&&r.push(new Request(o));return Promise.resolve(r)}};function Ve(e){if(!e)return;let{pathname:t,search:r}=new URL(e),o=t+r,a=new URLSearchParams(r),i=a.get("return_to")||a.get("redirect");if(i){if(er(e,i))return i;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}`);}}function er(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function st({requestUrl:e,defaultUrl:t,redirectUrl:r}){let o=e,a=Zt(e,t),i=r?Zt(e,r):a;return er(e,i.toString())?i.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}. Default url ${a} is used instead.`),a.toString())}function Zt(e,t){return Ao(t)?new URL(t):new URL(t,new URL(e).origin)}function Ao(e){try{return new URL(e),!0}catch{return !1}}async function To(e){let{storefront:t,request:r,noAdminRedirect:o,matchQueryParams:a,response:i=new Response("Not Found",{status:404})}=e,n=new URL(r.url),{pathname:u,searchParams:c}=n,s=c.has("_data");c.delete("redirect"),c.delete("return_to"),c.delete("_data");let l=(a?n.toString().replace(n.origin,""):u).toLowerCase();if(n.pathname==="/admin"&&!o)return ut(`${t.getShopifyDomain()}/admin`,s,c,a);try{let{urlRedirects:y}=await t.query(vo,{variables:{query:"path:"+l.replace(/\/+$/,"")}}),f=y?.edges?.[0]?.node?.target;if(f)return ut(f,s,c,a);let d=Ve(r.url);if(d)return ut(d,s,c,a)}catch(y){console.error(`Failed to fetch redirects from Storefront API for route ${l}`,y);}return i}var ct="https://example.com";function ut(e,t,r,o){let a=new URL(e,ct);if(!o)for(let[i,n]of r)a.searchParams.append(i,n);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":a.toString().replace(ct,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:a.toString().replace(ct,"")}})}var vo=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var bo=async function({request:t,context:r}){let o=r.storefront,a=r.customerAccount,i=new URL(t.url);if(!o)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let n={};if(o){let s="X-Shopify-Storefront-Access-Token";n.storefront={name:"Storefront API",authHeader:s,accessToken:o.getPublicTokenHeaders()[s],apiUrl:o.getApiUrl(),icon:"SF"};}if(a){let s=await(await fetch(i.origin+"/graphiql/customer-account.schema.json")).json(),l=await a.getAccessToken();s&&(n["customer-account"]={name:"Customer Account API",value:s,authHeader:"Authorization",accessToken:l,apiUrl:a.getApiUrl(),icon:"CA"});}let u="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",c=String.raw;return new Response(c`
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
    `,{status:200,headers:{"content-type":"text/html"}})};var Io={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},wo=/[&><\u2028\u2029]/g;function tr(e){return e.replace(wo,t=>Io[t])}var G="Error in SEO input: ",q={title:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(G.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(G.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(G.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(G.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(G.concat("`handle` should start with `@`"));return e}}};function rr(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let o=H(q.title,e.title),a=dt(e?.titleTemplate,o);if(!a)break;t.push(O("title",{title:a}),O("meta",{property:"og:title",content:a}),O("meta",{name:"twitter:title",content:a}));break}case"description":{let o=H(q.description,e.description);if(!o)break;t.push(O("meta",{name:"description",content:o}),O("meta",{property:"og:description",content:o}),O("meta",{name:"twitter:description",content:o}));break}case"url":{let o=H(q.url,e.url);if(!o)break;let i=o.split("?")[0].replace(/\/$/,"");t.push(O("link",{rel:"canonical",href:i}),O("meta",{property:"og:url",content:i}));break}case"handle":{let o=H(q.handle,e.handle);if(!o)break;t.push(O("meta",{name:"twitter:site",content:o}),O("meta",{name:"twitter:creator",content:o}));break}case"media":{let o,a=W(e.media);for(let i of a)if(typeof i=="string"&&t.push(O("meta",{name:"og:image",content:i})),i&&typeof i=="object"){let n=i.type||"image",u=i?{url:i?.url,secure_url:i?.url,type:lt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let c of Object.keys(u))u[c]&&(o=u[c],t.push(O("meta",{property:`og:${n}:${c}`,content:o},u.url)));}break}case"jsonLd":{let o=W(e.jsonLd),a=0;for(let i of o){if(typeof i!="object")continue;let n=O("script",{type:"application/ld+json",children:JSON.stringify(i,(u,c)=>typeof c=="string"?tr(c):c)},`json-ld-${i?.["@type"]||i?.name||a++}`);t.push(n);}break}case"alternates":{let o=W(e.alternates);for(let a of o){if(!a)continue;let{language:i,url:n,default:u}=a,c=i?`${i}${u?"-default":""}`:void 0;t.push(O("link",{rel:"alternate",hrefLang:c,href:n}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:o,maxSnippet:a,maxVideoPreview:i,noArchive:n,noFollow:u,noImageIndex:c,noIndex:s,noSnippet:l,noTranslate:y,unavailableAfter:f}=e.robots,d=[n&&"noarchive",c&&"noimageindex",l&&"nosnippet",y&&"notranslate",o&&`max-image-preview:${o}`,a&&`max-snippet:${a}`,i&&`max-video-preview:${i}`,f&&`unavailable_after:${f}`],p=(s?"noindex":"index")+","+(u?"nofollow":"follow");for(let h of d)h&&(p+=`,${h}`);t.push(O("meta",{name:"robots",content:p}));break}}return t.flat().sort((r,o)=>r.key.localeCompare(o.key))}function O(e,t,r){let o={tag:e,props:{},key:""};return e==="title"?(o.children=t.title,o.key=pt(o),o):e==="script"?(o.children=typeof t.children=="string"?t.children:"",o.key=pt(o,r),delete t.children,o.props=t,o):(o.props=t,Object.keys(o.props).forEach(a=>!o.props[a]&&delete o.props[a]),o.key=pt(o,r),o)}function pt(e,t){let{tag:r,props:o}=e;if(r==="title")return "0-title";if(r==="meta"){let a=o.content===t&&typeof o.property=="string"&&!o.property.endsWith("secure_url")&&"0";return [r,...[t,a],o.property||o.name].filter(n=>n).join("-")}return r==="link"?[r,o.rel,o.hrefLang||o.media].filter(i=>i).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${o.type}`}function dt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function lt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function W(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var Uo=react.lazy(()=>Promise.resolve().then(()=>(ir(),nr)));function No({debug:e}){let t=react$1.useMatches(),r=react$1.useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let o=react.useMemo(()=>t.flatMap(n=>{let{handle:u,...c}=n,s={...c,...r},l=u?.seo,y=c?.data?.seo;return !l&&!y?[]:l?Me(l,s):[y]}).reduce((n,u)=>{Object.keys(u).forEach(s=>!u[s]&&delete u[s]);let{jsonLd:c}=u;return c?n?.jsonLd?Array.isArray(c)?{...n,...u,jsonLd:[...n.jsonLd,...c]}:{...n,...u,jsonLd:[...n.jsonLd,c]}:{...n,...u,jsonLd:[c]}:{...n,...u}},{}),[t,r]),{html:a,loggerMarkup:i}=react.useMemo(()=>{let n=rr(o),u=n.map(s=>s.tag==="script"?react.createElement(s.tag,{...s.props,key:s.key,dangerouslySetInnerHTML:{__html:s.children}}):react.createElement(s.tag,{...s.props,key:s.key},s.children)),c=react.createElement(react.Suspense,{fallback:null},react.createElement(Uo,{headTags:n}));return {html:u,loggerMarkup:c}},[o]);return react.createElement(react.Fragment,null,a,e&&i)}function Me(e,...t){if(e instanceof Function)return Me(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((o,a)=>[...o,Me(a)],[]),r):e instanceof Object?(Object.entries(e).forEach(([a,i])=>{r[a]=Me(i,...t);}),r):e}function Vo(...e){let t=[],r=e.reduce((o,a)=>{if(!a)return o;Object.keys(a).forEach(n=>!a[n]&&delete a[n]);let{jsonLd:i}=a;return i?o?.jsonLd?{...o,...a,jsonLd:W(o.jsonLd).concat(i)}:{...o,...a,jsonLd:[i]}:{...o,...a}},{})||{};for(let o of Object.keys(r))switch(o){case"title":{let a=H(q.title,r.title),i=dt(r?.titleTemplate,a);if(!i)break;t.push({title:i},{property:"og:title",content:i},{property:"twitter:title",content:i});break}case"description":{let a=H(q.description,r.description);if(!a)break;t.push({name:"description",content:a},{property:"og:description",content:a},{property:"twitter:description",content:a});break}case"url":{let a=H(q.url,r.url);if(!a)break;let n=a.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:n},{property:"og:url",content:n});break}case"handle":{let a=H(q.handle,r.handle);if(!a)break;t.push({property:"twitter:site",content:a},{property:"twitter:creator",content:a});break}case"media":{let a,i=W(r.media);for(let n of i)if(typeof n=="string"&&t.push({property:"og:image",content:n}),n&&typeof n=="object"){let u=n.type||"image",c=n?{url:n?.url,secure_url:n?.url,type:lt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let s of Object.keys(c))c[s]&&(a=c[s],t.push({property:`og:${u}:${s}`,content:a}));}break}case"jsonLd":{let a=W(r.jsonLd);for(let n of a)typeof n!="object"||Object.keys(n).length===0||t.push({"script:ld+json":n});break}case"alternates":{let a=W(r.alternates);for(let i of a){if(!i)continue;let{language:n,url:u,default:c}=i,s=n?`${n}${c?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:s,href:u});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:a,maxSnippet:i,maxVideoPreview:n,noArchive:u,noFollow:c,noImageIndex:s,noIndex:l,noSnippet:y,noTranslate:f,unavailableAfter:d}=r.robots,p=[u&&"noarchive",s&&"noimageindex",y&&"nosnippet",f&&"notranslate",a&&`max-image-preview:${a}`,i&&`max-snippet:${i}`,n&&`max-video-preview:${n}`,d&&`unavailable_after:${d}`],h=(l?"noindex":"index")+","+(c?"nofollow":"follow");for(let g of p)g&&(h+=`,${g}`);t.push({name:"robots",content:h});break}}return t}function Ho({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let o=react$1.useNavigation().state==="loading",{endCursor:a,hasNextPage:i,hasPreviousPage:n,nextPageUrl:u,nodes:c,previousPageUrl:s,startCursor:l}=Qo(e),y=react.useMemo(()=>({pageInfo:{endCursor:a,hasPreviousPage:n,hasNextPage:i,startCursor:l},nodes:c}),[a,i,n,l,c]),f=react.useMemo(()=>react.forwardRef(function(h,g){return i?react.createElement(react$1.Link,{preventScrollReset:!0,...h,to:u,state:y,replace:!0,ref:g}):null}),[i,u,y]),d=react.useMemo(()=>react.forwardRef(function(h,g){return n?react.createElement(react$1.Link,{preventScrollReset:!0,...h,to:s,state:y,replace:!0,ref:g}):null}),[n,s,y]);return t({state:y,hasNextPage:i,hasPreviousPage:n,isLoading:o,nextPageUrl:u,nodes:c,previousPageUrl:s,NextLink:f,PreviousLink:d})}function Fe(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Pe(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function Qo(e){e.pageInfo||Pe("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Pe("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Pe("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Pe("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Pe("pageInfo.hasPreviousPage");let t=react$1.useNavigate(),{state:r,search:o,pathname:a}=react$1.useLocation(),u=new URLSearchParams(o).get("direction")==="previous",c=react.useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?hydrogenReact.flattenConnection(e):u?[...hydrogenReact.flattenConnection(e),...r.nodes]:[...r.nodes,...hydrogenReact.flattenConnection(e)],[r,e]),s=react.useMemo(()=>{let d=globalThis?.window?.__hydrogenHydrated,p=!d||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,h=!d||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!d||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,m=!d||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(u?(p=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(h=e.pageInfo.endCursor,m=e.pageInfo.hasNextPage)),{startCursor:p,endCursor:h,hasPreviousPage:g,hasNextPage:m}},[u,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),l=react.useRef({params:Fe(o),pathname:a});react.useEffect(()=>{window.__hydrogenHydrated=!0;},[]),react.useEffect(()=>{(Fe(o)!==l.current.params||a!==l.current.pathname)&&(l.current={pathname:a,params:Fe(o)},t(`${a}?${Fe(o)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[a,o]);let y=react.useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","previous"),s.startCursor&&d.set("cursor",s.startCursor),`?${d.toString()}`},[o,s.startCursor]),f=react.useMemo(()=>{let d=new URLSearchParams(o);return d.set("direction","next"),s.endCursor&&d.set("cursor",s.endCursor),`?${d.toString()}`},[o,s.endCursor]);return {...s,previousPageUrl:y,nextPageUrl:f,nodes:c}}function Bo(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,o=new URLSearchParams(new URL(e.url).search),a=o.get("cursor")??void 0;return (o.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:a??null}:{first:r,endCursor:a??null}}var N=class extends Response{constructor(t,r,o){super(`Bad request: ${t}`,{status:400,headers:o});}};function Te(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function Go({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:o,debugInfo:a,exchangeForStorefrontCustomerAccessToken:i}){let n=new URLSearchParams,u=e.get(E),c=u?.refreshToken,s=u?.idToken;if(!c)throw new N("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");n.append("grant_type","refresh_token"),n.append("refresh_token",c),n.append("client_id",t);let l={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let f=`${r}/auth/oauth/token`,d=await fetch(f,{method:"POST",headers:l,body:n});if(!d.ok){let v=await d.text();throw new Response(v,{status:d.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:p,expires_in:h,refresh_token:g}=await d.json(),m=await mt(p,t,r,o);e.set(E,{accessToken:m,expiresAt:new Date(new Date().getTime()+(h-120)*1e3).getTime()+"",refreshToken:g,idToken:s}),await i();}function pe(e){e.unset(E),e.unset(se);}async function lr({locks:e,expiresAt:t,session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:u}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=Go({session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:u})),await e.refresh,delete e.refresh;}catch(c){throw pe(r),c&&c.status!==401?c:new N("Unauthorized","Login before querying the Customer Account API.")}}function yr(){let e=Wo();return mr(e)}async function fr(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=jo(t);return mr(r)}function Wo(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function mr(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function jo(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function hr(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function mt(e,t,r,o,a){let i=t;if(!e)throw new N("Unauthorized","oAuth access token was not provided during token exchange.");let n=new URLSearchParams;n.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),n.append("client_id",i),n.append("audience",Gt),n.append("subject_token",e),n.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),n.append("scopes","https://api.customers.com/auth/customer.graphql");let u={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let s=`${r}/auth/oauth/token`,l=await fetch(s,{method:"POST",headers:u,body:n});let y=await l.json();if(y.error)throw new N(y.error_description);return y.access_token}function gr(e){return Ko(e).payload.nonce}function Ko(e){let[t,r,o]=e.split("."),a=JSON.parse(atob(t)),i=JSON.parse(atob(r));return {header:a,payload:i,signature:o}}function $e(){return zo(Jo())}function Jo(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function zo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var Cr="/account/login",Yo="/account/authorize",Sr="/account";function Xo(e){if(!e.url)return Cr;let{pathname:t}=new URL(e.url),r=Cr+`?${new URLSearchParams({return_to:t}).toString()}`;return Te(r)}function Zo({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:o=Le,request:a,waitUntil:i,authUrl:n,customAuthStatusHandler:u,logErrors:c=!0,unstableB2b:s=!1}){if(o!==Le&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${Le}.`),!a?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let l=u||(()=>Xo(a)),y=new URL(a.url),f=y.protocol==="http:"?y.origin.replace("http","https"):y.origin,d=st({requestUrl:f,defaultUrl:Yo,redirectUrl:n}),p=`${r}/account/customer/api/${o}/graphql`,h={};async function g({query:C,type:S,variables:A={}}){let T=await b();if(!T)throw l();new Date().getTime();let D=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ie,Origin:f,Authorization:T},body:JSON.stringify({query:C,variables:A})});let k=await D.text(),L={url:p,response:D,type:S,query:C,queryVariables:A,errors:void 0,client:"customer"};if(!D.ok){if(D.status===401)throw pe(e),l();let R;try{R=z(k);}catch{R=[{message:k}];}Ce({...L,errors:R});}try{let R=z(k),{errors:B}=R,ye=B?.map(({message:ae,...F})=>new X(ae,{...F,clientOperation:`customerAccount.${L.type}`,requestId:D.headers.get("x-request-id"),queryVariables:A,query:C}));return {...R,...B&&{errors:ye}}}catch{Ce({...L,errors:[{message:k}]});}}async function m(){if(!r||!t)return !1;let C=e.get(E),S=C?.accessToken,A=C?.expiresAt;if(!S||!A)return !1;let T=$?.();try{await lr({locks:h,expiresAt:A,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:f,debugInfo:{waitUntil:i,stackInfo:T,...Z(a)},exchangeForStorefrontCustomerAccessToken:Ee});}catch{return !1}return !0}async function v(){if(!await m())throw l()}async function b(){if(await m())return e.get(E)?.accessToken}async function x(C,S){return ve(r,t),C=ce(C),Ue(C,"customer.mutate"),ue(g({query:C,type:"mutation",...S}),{logErrors:c})}async function _(C,S){return ve(r,t),C=ce(C),_e(C,"customer.query"),ue(g({query:C,type:"query",...S}),{logErrors:c})}function K(C){e.set(se,{...e.get(se),...C});}async function U(){if(await m())return e.get(se)}async function Ee(){if(!s)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:S}=await x(C),A=S?.storefrontCustomerAccessTokenCreate?.customerAccessToken;A&&K({customerAccessToken:A});}return {login:async C=>{ve(r,t);let S=new URL(`${r}/auth/oauth/authorize`),A=hr(),T=$e();if(S.searchParams.set("client_id",t),S.searchParams.set("scope","openid email"),S.searchParams.append("response_type","code"),S.searchParams.append("redirect_uri",d),S.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),S.searchParams.append("state",A),S.searchParams.append("nonce",T),C?.uiLocales){let[D,k]=C.uiLocales.split("-"),L=D.toLowerCase();k&&(L+=`-${k.toUpperCase()}`),S.searchParams.append("ui_locales",L);}let V=yr(),M=await fr(V);return e.set(E,{...e.get(E),codeVerifier:V,state:A,nonce:T,redirectPath:Ve(a.url)||Ne(a,"Referer")||Sr}),S.searchParams.append("code_challenge",M),S.searchParams.append("code_challenge_method","S256"),Te(S.toString())},logout:async C=>{ve(r,t);let S=e.get(E)?.idToken,A=st({requestUrl:f,defaultUrl:f,redirectUrl:C?.postLogoutRedirectUri}),T=S?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",S],["post_logout_redirect_uri",A]]).toString()}`).toString():A;return pe(e),Te(T)},isLoggedIn:m,handleAuthStatus:v,getAccessToken:b,getApiUrl:()=>p,mutate:x,query:_,authorize:async()=>{ve(r,t);let C=y.searchParams.get("code"),S=y.searchParams.get("state");if(!C||!S)throw pe(e),new N("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(E)?.state!==S)throw pe(e),new N("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let A=t,T=new URLSearchParams;T.append("grant_type","authorization_code"),T.append("client_id",A),T.append("redirect_uri",d),T.append("code",C);let V=e.get(E)?.codeVerifier;if(!V)throw new N("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");T.append("code_verifier",V);let M={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:f},D=$?.();new Date().getTime();let L=`${r}/auth/oauth/token`,R=await fetch(L,{method:"POST",headers:M,body:T});if(!R.ok)throw new Response(await R.text(),{status:R.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:B,expires_in:ye,id_token:ae,refresh_token:F}=await R.json(),fe=e.get(E)?.nonce,_t=await gr(ae);if(fe!==_t)throw new N("Unauthorized",`Returned nonce does not match: ${fe} !== ${_t}`);let zr=await mt(B,t,r,f,{waitUntil:i,stackInfo:D,...Z(a)}),Yr=e.get(E)?.redirectPath;return e.set(E,{accessToken:zr,expiresAt:new Date(new Date().getTime()+(ye-120)*1e3).getTime()+"",refreshToken:F,idToken:ae}),await Ee(),Te(Yr||Sr)},UNSTABLE_setBuyer:K,UNSTABLE_getBuyer:U}}function ve(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var ea="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function ta({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||ea)}var Pr="cartFormInput";function Q({children:e,action:t,inputs:r,route:o,fetcherKey:a}){let i=react$1.useFetcher({key:a});return jsxRuntime.jsxs(i.Form,{action:o||"",method:"post",children:[(t||r)&&jsxRuntime.jsx("input",{type:"hidden",name:Pr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(i):e]})}Q.INPUT_NAME=Pr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function oa(e){let t={};for(let n of e.entries()){let u=n[0],c=e.getAll(u);t[u]=c.length>1?c:n[1];}let{cartFormInput:r,...o}=t,{action:a,inputs:i}=r?JSON.parse(String(r)):{};return {action:a,inputs:{...i,...o}}}Q.getFormInput=oa;var I=`#graphql
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
`;function ht(e){return async(t,r)=>{let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:a,...i}=r||{},{buyerIdentity:n,...u}=t,{cartCreate:c,errors:s}=await e.storefront.mutate(ia(e.cartFragment),{variables:{input:{...u,buyerIdentity:{...o,...n}},...i}});return P(c,s)}}var ia=(e=w)=>`#graphql
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
`;function gt({storefront:e,customerAccount:t,getCartId:r,cartFragment:o}){return async a=>{let i=r();if(!i)return null;let[n,{cart:u,errors:c}]=await Promise.all([t?t.isLoggedIn():!1,e.query(sa(o),{variables:{cartId:i,...a},cache:e.CacheNone()})]);if(n&&u?.checkoutUrl){let s=new URL(u.checkoutUrl);s.searchParams.set("logged_in","true"),u.checkoutUrl=s.toString();}return u||c?P(u,c):null}}var sa=(e=ca)=>`#graphql
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
`,ca=`#graphql
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
`;function Ct(e){return async(t,r)=>{let{cartLinesAdd:o,errors:a}=await e.storefront.mutate(ua(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return P(o,a)}}var ua=(e=w)=>`#graphql
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
`;var Ar="__h_pending_";function Tr(e){return Ar+e}function qe(e){return e.startsWith(Ar)}function He(e,t){if(t.some(r=>qe(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function St(e){return async(t,r)=>{He("updateLines",t);let{cartLinesUpdate:o,errors:a}=await e.storefront.mutate(pa(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return P(o,a)}}var pa=(e=w)=>`#graphql
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
`;function Pt(e){return async(t,r)=>{He("removeLines",t);let{cartLinesRemove:o,errors:a}=await e.storefront.mutate(da(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return P(o,a)}}var da=(e=w)=>`#graphql
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
`;function At(e){return async(t,r)=>{let o=t.filter((n,u,c)=>c.indexOf(n)===u),{cartDiscountCodesUpdate:a,errors:i}=await e.storefront.mutate(la(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:o,...r}});return P(a,i)}}var la=(e=w)=>`#graphql
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
`;function Tt(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:a,errors:i}=await e.storefront.mutate(ya(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...o,...t},...r}});return P(a,i)}}var ya=(e=w)=>`#graphql
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
`;function vt(e){return async(t,r)=>{let{cartNoteUpdate:o,errors:a}=await e.storefront.mutate(fa(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return P(o,a)}}var fa=(e=w)=>`#graphql
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
`;function bt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:o,errors:a}=await e.storefront.mutate(ma(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return P(o,a)}}var ma=(e=w)=>`#graphql
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
`;function It(e){return async(t,r)=>{let{cartAttributesUpdate:o,errors:a}=await e.storefront.mutate(ha(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return P(o,a)}}var ha=(e=w)=>`#graphql
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
`;function wt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),a=t.map(u=>({...u,ownerId:o})),{cartMetafieldsSet:i,errors:n}=await e.storefront.mutate(ga(),{variables:{metafields:a}});return P({cart:{id:o},...i},n)}}var ga=()=>`#graphql
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
`;function Rt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),{cartMetafieldDelete:a,errors:i}=await e.storefront.mutate(Ca(),{variables:{input:{ownerId:o,key:t}}});return P({cart:{id:o},...a},i)}}var Ca=()=>`#graphql
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
`;var Pa=e=>{let t=cookie.parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var Ta=e=>t=>{let r=new Headers;return r.append("Set-Cookie",cookie.stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function va(e){let{getCartId:t,setCartId:r,storefront:o,customerAccount:a,cartQueryFragment:i,cartMutateFragment:n}=e,u=t(),c=()=>u||t(),s={storefront:o,getCartId:c,cartFragment:n,customerAccount:a},l=ht(s),y=async function(...d){let p=await l(...d);return u=p?.cart?.id,p},f={get:gt({storefront:o,customerAccount:a,getCartId:c,cartFragment:i}),getCartId:c,setCartId:r,create:y,addLines:async(d,p)=>{let h=d.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return u||p?.cartId?await Ct(s)(h,p):await y({lines:h},p)},updateLines:St(s),removeLines:Pt(s),updateDiscountCodes:async(d,p)=>u||p?.cartId?await At(s)(d,p):await y({discountCodes:d},p),updateBuyerIdentity:async(d,p)=>u||p?.cartId?await Tt(s)(d,p):await y({buyerIdentity:d},p),updateNote:async(d,p)=>u||p?.cartId?await vt(s)(d,p):await y({note:d},p),updateSelectedDeliveryOption:bt(s),updateAttributes:async(d,p)=>u||p?.cartId?await It(s)(d,p):await y({attributes:d},p),setMetafields:async(d,p)=>u||p?.cartId?await wt(s)(d,p):await y({metafields:d},p),deleteMetafield:Rt(s)};return "customMethods"in e?{...f,...e.customMethods??{}}:f}function Ia(e){let t=react$1.useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},o=r.lines.nodes,a=!1;for(let{formData:i}of t){if(!i)continue;let n=Q.getFormInput(i);if(n.action===Q.ACTIONS.LinesAdd)for(let u of n.inputs.lines){if(!u.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let c=o.find(s=>s.merchandise.id===u.selectedVariant?.id);a=!0,c?(c.quantity=(c.quantity||1)+(u.quantity||1),c.isOptimistic=!0):o.unshift({id:Tr(u.selectedVariant.id),merchandise:u.selectedVariant,isOptimistic:!0,quantity:u.quantity||1});}else if(n.action===Q.ACTIONS.LinesRemove)for(let u of n.inputs.lineIds){let c=o.findIndex(s=>s.id===u);if(c!==-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${u}' but it doesn't exist in the cart`);}else if(n.action===Q.ACTIONS.LinesUpdate)for(let u of n.inputs.lines){let c=o.findIndex(s=>u.id===s.id);if(c>-1){if(qe(o[c].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}o[c].quantity=u.quantity,o[c].quantity===0&&o.splice(c,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${u.id}' but it doesn't exist in the cart`);}}return a&&(r.isOptimistic=a),r}function Da({handle:e,options:t=[],variants:r=[],productPath:o="products",waitForNavigation:a=!1,children:i}){let n=r instanceof Array?r:hydrogenReact.flattenConnection(r),{searchParams:u,path:c,alreadyOnProductPage:s}=La(e,o,a),l=t.filter(y=>y?.values?.length===1);return react.createElement(react.Fragment,null,...react.useMemo(()=>t.map(y=>{let f,d=[];for(let p of y.values){let h=new URLSearchParams(s?u:void 0);h.set(y.name,p),l.forEach(x=>{h.set(x.name,x.values[0]);});let g=n.find(x=>x?.selectedOptions?.every(_=>h.get(_?.name)===_?.value)),m=u.get(y.name),v=m?m===p:!1;v&&(f=p);let b="?"+h.toString();d.push({value:p,isAvailable:g?g.availableForSale:!0,to:c+b,search:b,isActive:v,variant:g});}return i({option:{name:y.name,value:f,values:d}})}),[t,n,i]))}var ka=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((o,a)=>{r.push({name:a,value:o});}),r};function La(e,t,r){let{pathname:o,search:a}=react$1.useLocation(),i=react$1.useNavigation();return react.useMemo(()=>{let n=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o),u=n&&n.length>0;t=t.startsWith("/")?t.substring(1):t;let c=u?`${n[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||i.state!=="loading"?a:i.location.search),alreadyOnProductPage:c===o,path:c}},[o,a,r,e,t,i])}function Va(e,t){let r=react$1.useNavigation(),[o,a]=react.useState([]);if(react.useEffect(()=>{Promise.resolve(t).then(i=>{i&&a(i instanceof Array?i:i.product?.variants?.nodes||[]);}).catch(i=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:i}));});},[t]),r.state==="loading"){let i=new URLSearchParams(r.location.search),n=!1,u=o.find(c=>c.selectedOptions?c.selectedOptions.every(s=>i.get(s.name)===s.value):(n||(n=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(u)return {...e,isOptimistic:!0,selectedVariant:u}}return e}var br=react.createContext(void 0),Ha=br.Provider,Et=()=>react.useContext(br);function Qa(e){let t=$e(),r=Ba(t,e);return {nonce:t,header:r,NonceProvider:({children:a})=>react.createElement(Ha,{value:t},a)}}function Ba(e,t){let{shop:r,...o}=t??{},a=`'nonce-${e}'`,i=["'self'","'unsafe-inline'","https://cdn.shopify.com"],n=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&n.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&n.push(`https://${r.storeDomain}`);let c={baseUri:["'self'"],defaultSrc:["'self'",a,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:i,connectSrc:n},s=Object.assign({},c,o);for(let l in c){let y=o[l];l&&y&&(s[l]=Ga(y,c[l]));}return s.scriptSrc instanceof Array&&!s.scriptSrc.includes(a)?s.scriptSrc.push(a):s.defaultSrc instanceof Array&&!s.defaultSrc.includes(a)&&s.defaultSrc.push(a),qa__default.default({directives:s})}function Ga(e,t){let r=typeof t=="string"?[t]:t,o=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(i=>i==="'none'")?o:[...o,...r]:r}var ja=react.forwardRef((e,t)=>{let r=Et();return jsxRuntime.jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function za(e){let t=react$1.useFetchers(),r={};for(let{formData:o}of t)if(o?.get("optimistic-identifier")===e)try{if(o.has("optimistic-data")){let a=JSON.parse(String(o.get("optimistic-data")));Object.assign(r,a);}}catch{}return r}function Ya({id:e,data:t}){return jsxRuntime.jsxs(jsxRuntime.Fragment,{children:[jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function tn(e){return jsxRuntime.jsx(hydrogenReact.ShopPayButton,{channel:"hydrogen",...e})}function de(e){let{type:t,data:r={},customData:o}=e,a=react$1.useLocation(),{publish:i,cart:n,prevCart:u,shop:c,customData:s}=te(),l=a.pathname+a.search,y={...r,customData:{...s,...o},cart:n,prevCart:u,shop:c};return react.useEffect(()=>{c?.shopId&&(y={...y,url:window.location.href},i(t,y));},[i,l,c?.shopId]),null}function wr(e){return jsxRuntime.jsx(de,{...e,type:"page_viewed"})}function Rr(e){return jsxRuntime.jsx(de,{...e,type:"product_viewed"})}function Er(e){return jsxRuntime.jsx(de,{...e,type:"collection_viewed"})}function Or(e){return jsxRuntime.jsx(de,{...e,type:"cart_viewed"})}function xr(e){return jsxRuntime.jsx(de,{...e,type:"search_viewed"})}function Dr(e){return jsxRuntime.jsx(de,{...e})}var re={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var cn="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",un="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function Lr(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function Ot(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:o,...a}=e,i=react.useRef(!1),n=hydrogenReact.useLoadScript(t?un:cn,{attributes:{id:"customer-privacy-api"}});react.useEffect(()=>{let u=c=>{r&&r(c.detail);};return document.addEventListener("visitorConsentCollected",u),()=>{document.removeEventListener("visitorConsentCollected",u);}},[r]),react.useEffect(()=>{if(n!=="done"||i.current)return;i.current=!0;let{checkoutDomain:u,storefrontAccessToken:c}=a;u||Lr("checkoutDomain"),c||Lr("storefrontAccessToken"),(c.startsWith("shpat_")||c.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let s={checkoutRootDomain:u,storefrontAccessToken:c};if(u){let f=window.document.location.host,d=u.split(".").reverse(),p=f.split(".").reverse(),h=[];d.forEach((g,m)=>{g===p[m]&&h.push(g);}),f=h.reverse().join("."),f&&(s.storefrontRootDomain=f);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(s),!window.Shopify?.customerPrivacy)return;let l=window.Shopify.customerPrivacy.setTrackingConsent;function y(f,d){l({...f,headlessStorefront:!0,...s},d);}window.Shopify.customerPrivacy.setTrackingConsent=y,o&&o();},[n,t,a]);}function xt(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function yn(){let e=xt();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function Ur({consent:e,onReady:t,domain:r}){let{subscribe:o,register:a,canTrack:i}=te(),[n,u]=react.useState(!1),[c,s]=react.useState(!1),{ready:l}=a("Internal_Shopify_Analytics"),{ready:y}=a("Internal_Shopify_CustomerPrivacy"),f=()=>{n&&c&&t();},d=()=>{s(!0),y(),f();},{checkoutDomain:p,storefrontAccessToken:h,withPrivacyBanner:g}=e;return Ot({checkoutDomain:p||"mock.shop",storefrontAccessToken:h||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:d,onReady:()=>{setTimeout(d,3e3);}}),hydrogenReact.useShopifyCookies({hasUserConsent:n&&c?i():!0,domain:r,checkoutDomain:p}),react.useEffect(()=>{o(re.PAGE_VIEWED,mn),o(re.PRODUCT_VIEWED,hn),o(re.COLLECTION_VIEWED,gn),o(re.SEARCH_VIEWED,Cn),o(re.PRODUCT_ADD_TO_CART,Sn),l(),u(!0),f();},[o,l]),null}function Qe(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function we(e){let t=yn(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){Qe("shopId");return}if(!e?.shop?.acceptedLanguage){Qe("acceptedLanguage");return}if(!e?.shop?.currency){Qe("currency");return}if(!e?.shop?.hydrogenSubchannelId){Qe("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...hydrogenReact.getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function fn(e,t){if(t===null)return;let r=we(e);return r?{...r,cartId:t.id}:void 0}var j={};function mn(e){let t=we(e);t&&(hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...j}}),j={});}function hn(e){let t=we(e);if(t&&Nr({type:"product",products:e.products})){let r=Dt(e.products);j={pageType:hydrogenReact.AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...j,products:Dt(e.products)},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function gn(e){let t=we(e);t&&(j={pageType:hydrogenReact.AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...j,collectionHandle:e.collection.handle},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function Cn(e){let t=we(e);t&&(j={pageType:hydrogenReact.AnalyticsPageType.search},t={...t,...j,searchString:e.searchTerm},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.SEARCH_VIEW,payload:t}));}function Sn(e){let{cart:t,currentLine:r}=e,o=fn(e,t);!o||!r?.id||Pn({matchedLine:r,eventPayload:o});}function Pn({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};Nr({type:"cart",products:[r]})&&hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.ADD_TO_CART,payload:{...t,products:Dt([r])}});}function oe(e,t,r,o){if(e==="cart"){let a=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${a}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${a}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let a=`${o||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${a}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${a}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function Nr({type:e,products:t}){return !t||t.length===0?(oe(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return oe(e,"id",!1),!1;if(!r.title)return oe(e,"title",!1),!1;if(!r.price)return oe(e,"price.amount",!0,"price"),!1;if(!r.vendor)return oe(e,"vendor",!1),!1;if(!r.variantId)return oe(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return oe(e,"title",!0,"variantTitle"),!1}),!0)}function Dt(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function Fr(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function $r({cart:e,setCarts:t}){let{publish:r,shop:o,customData:a,canTrack:i,cart:n,prevCart:u}=te(),c=react.useRef(null);return react.useEffect(()=>{if(e)return Promise.resolve(e).then(s=>{if(s&&s.lines){if(!s.id){Fr("id");return}if(!s.updatedAt){Fr("updatedAt");return}}t(({cart:l,prevCart:y})=>s?.updatedAt!==l?.updatedAt?{cart:s,prevCart:l}:{cart:l,prevCart:y});}),()=>{}},[t,e]),react.useEffect(()=>{if(!n||!n?.updatedAt||n?.updatedAt===u?.updatedAt)return;let s;try{s=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{s=null;}if(n.id===s?.id&&n.updatedAt===s?.updatedAt)return;let l={eventTimestamp:Date.now(),cart:n,prevCart:u,shop:o,customData:a};if(n.updatedAt===c.current)return;c.current=n.updatedAt,r("cart_updated",l),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:n.id,updatedAt:n.updatedAt}));let y=u?.lines?hydrogenReact.flattenConnection(u?.lines):[],f=n.lines?hydrogenReact.flattenConnection(n.lines):[];y?.forEach(d=>{let p=f.filter(h=>d.id===h.id);if(p?.length===1){let h=p[0];d.quantity<h.quantity?r("product_added_to_cart",{...l,prevLine:d,currentLine:h}):d.quantity>h.quantity&&r("product_removed_from_cart",{...l,prevLine:d,currentLine:h});}else r("product_removed_from_cart",{...l,prevLine:d});}),f?.forEach(d=>{let p=y.filter(h=>d.id===h.id);(!p||p.length===0)&&r("product_added_to_cart",{...l,currentLine:d});});},[n,u,r,o,a,i]),null}var Rn={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},Wr=react.createContext(Rn),Ge=new Map,Re={};function jr(){return Object.values(Re).every(Boolean)}function qr(e,t){Ge.has(e)||Ge.set(e,new Map),Ge.get(e)?.set(t.toString(),t);}var We=new Map;function Hr(e,t){if(!jr()){We.set(e,t);return}Kr(e,t);}function Kr(e,t){(Ge.get(e)??new Map).forEach((r,o)=>{try{r(t);}catch(a){typeof a=="object"&&a instanceof Error?console.error("Analytics publish error",a.message,o,a.stack):console.error("Analytics publish error",a,o);}});}function Qr(e){return Re.hasOwnProperty(e)||(Re[e]=!1),{ready:()=>{Re[e]=!0,jr()&&We.size>0&&(We.forEach((t,r)=>{Kr(r,t);}),We.clear());}}}function Br(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function Gr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function En({canTrack:e,cart:t,children:r,consent:o,customData:a={},shop:i=null,disableThrowOnError:n=!1,cookieDomain:u}){let c=react.useRef(!1),{shop:s}=On(i),[l,y]=react.useState(!!e),[f,d]=react.useState({cart:null,prevCart:null}),[p,h]=react.useState(e?()=>e:()=>Br);if(s)if(/\/68817551382$/.test(s.shopId))Jt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!o.checkoutDomain){let m=Gr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");nt(m);}if(!o.storefrontAccessToken){let m=Gr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");nt(m);}}let g=react.useMemo(()=>({canTrack:p,...f,customData:a,publish:p()?Hr:()=>{},shop:s,subscribe:qr,register:Qr}),[l,p(),p,JSON.stringify(p),f,f.cart?.updatedAt,f.prevCart,Hr,qr,a,s,Qr,JSON.stringify(Re)]);return jsxRuntime.jsxs(Wr.Provider,{value:g,children:[r,!!s&&jsxRuntime.jsx(wr,{}),!!s&&!!t&&jsxRuntime.jsx($r,{cart:t,setCarts:d}),!!s&&o.checkoutDomain&&jsxRuntime.jsx(Ur,{consent:o,onReady:()=>{c.current=!0,y(!0),h(()=>Br);},domain:u})]})}function te(){let e=react.useContext(Wr);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function On(e){let[t,r]=react.useState(null);return react.useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function xn({storefront:e,publicStorefrontId:t="0"}){return e.query(Dn,{cache:e.CacheLong()}).then(({shop:r,localization:o})=>({shopId:r.id,acceptedLanguage:o.language.isoCode,currency:o.country.currency.isoCode,hydrogenSubchannelId:t}))}var Dn=`#graphql
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
`,kn={CartView:Or,CollectionView:Er,CustomView:Dr,ProductView:Rr,Provider:En,SearchView:xr};var Nn=function(e){return jsxRuntime.jsx(hydrogenReact.RichText,{...e,components:{link:({node:t})=>jsxRuntime.jsx(react$1.Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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
exports.Analytics = kn;
exports.AnalyticsEvent = re;
exports.CacheCustom = Ye;
exports.CacheLong = ze;
exports.CacheNone = Ke;
exports.CacheShort = J;
exports.CartForm = Q;
exports.InMemoryCache = it;
exports.OptimisticInput = Ya;
exports.Pagination = Ho;
exports.RichText = Nn;
exports.Script = ja;
exports.Seo = No;
exports.ShopPayButton = tn;
exports.VariantSelector = Da;
exports.cartAttributesUpdateDefault = It;
exports.cartBuyerIdentityUpdateDefault = Tt;
exports.cartCreateDefault = ht;
exports.cartDiscountCodesUpdateDefault = At;
exports.cartGetDefault = gt;
exports.cartGetIdDefault = Pa;
exports.cartLinesAddDefault = Ct;
exports.cartLinesRemoveDefault = Pt;
exports.cartLinesUpdateDefault = St;
exports.cartMetafieldDeleteDefault = Rt;
exports.cartMetafieldsSetDefault = wt;
exports.cartNoteUpdateDefault = vt;
exports.cartSelectedDeliveryOptionsUpdateDefault = bt;
exports.cartSetIdDefault = Ta;
exports.changelogHandler = ta;
exports.createCartHandler = va;
exports.createContentSecurityPolicy = Qa;
exports.createCustomerAccountClient = Zo;
exports.createStorefrontClient = Pi;
exports.createWithCache = Po;
exports.emitSpanEvent = Y;
exports.flushSpanEvents = uo;
exports.formatAPIResult = P;
exports.generateCacheControlHeader = me;
exports.getCustomerPrivacy = xt;
exports.getPaginationVariables = Bo;
exports.getSelectedProductOptions = ka;
exports.getSeoMeta = Vo;
exports.getShopAnalytics = xn;
exports.graphiqlLoader = bo;
exports.storefrontRedirect = To;
exports.useAnalytics = te;
exports.useCustomerPrivacy = Ot;
exports.useNonce = Et;
exports.useOptimisticCart = Ia;
exports.useOptimisticData = za;
exports.useOptimisticProduct = Va;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map