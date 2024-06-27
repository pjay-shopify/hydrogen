'use strict';

var hydrogenReact = require('@shopify/hydrogen-react');
var react = require('react');
var react$1 = require('@remix-run/react');
var jsxRuntime = require('react/jsx-runtime');
var cookie = require('worktop/cookie');
var Ma = require('content-security-policy-builder');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Ma__default = /*#__PURE__*/_interopDefault(Ma);

var Yr=Object.defineProperty;var Xr=(e,t)=>()=>(e&&(t=e(e=0)),t);var Zr=(e,t)=>{for(var r in t)Yr(e,r,{get:t[r],enumerable:!0});};var or={};Zr(or,{default:()=>tr,logSeoTags:()=>rr});function tr({headTags:e}){return rr(e),null}function rr(e){console.log(" "),console.log("%cSEO Meta Tags",`${bo}`),console.log(" "),e.forEach(t=>{if(t.tag==="script"){if(console.log("%c\u2022 JSON LD ",yt),t.children)try{console.table(JSON.parse(t.children),["name","content"]);}catch{console.log(t.children);}}else {if(console.log(`%c\u2022 ${t.tag} `,yt),t.children)if(typeof t.children=="string")console.log(`\u21B3 ${t.children}`);else try{Object.entries(JSON.parse(t.children)).map(([r,o])=>console.log(`\u21B3 ${o}`));}catch{console.log(t.children);}if(t.props.property==="og:image:url"){let r=t.props.content;Io(r).then(o=>{let a=`font-size: 400px; padding: 10px; background: white url(${o}) no-repeat center; background-size: contain;`;console.log("%c\u2022 Share image preview",yt),console.log("%c  ",a),console.log(`\u21B3 ${r}`);}).catch(o=>{console.error(o);});}Object.entries(t.props).map(([r,o])=>{console.log(`\u21B3 ${r} \u2192 ${o}`);});}console.log(" ");});}async function Io(e){let o=await(await(await fetch(e)).blob()).arrayBuffer();return `data:image/png;base64,${wo(o)}`}function wo(e){let t="",r=new Uint8Array(e),o=r.byteLength;for(let a=0;a<o;a++)t+=String.fromCharCode(r[a]);return btoa(t)}var yt,bo,ar=Xr(()=>{yt="text-transform: uppercase;",bo="text-transform: uppercase; font-weight: bold; text-transform: uppercase;font-weight: bold";});var Oe="public",eo="private",je="no-store",_t={maxAge:"max-age",staleWhileRevalidate:"stale-while-revalidate",sMaxAge:"s-maxage",staleIfError:"stale-if-error"};function he(e){let t=[];return Object.keys(e).forEach(r=>{r==="mode"?t.push(e[r]):_t[r]&&t.push(`${_t[r]}=${e[r]}`);}),t.join(", ")}function Ke(){return {mode:je}}function Je(e){if(e?.mode&&e?.mode!==Oe&&e?.mode!==eo)throw Error("'mode' must be either 'public' or 'private'")}function J(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:9,...e}}function ze(e){return Je(e),{mode:Oe,maxAge:3600,staleWhileRevalidate:82800,...e}}function ne(e){return Je(e),{mode:Oe,maxAge:1,staleWhileRevalidate:86399,...e}}function Ye(e){return e}function z(e){return String(e).includes("__proto__")?JSON.parse(e,to):JSON.parse(e)}function to(e,t){if(e!=="__proto__")return t}function xe(e,t){return e&&t?{...e,...t}:e||ne()}function Xe(e){return he(xe(e))}async function ro(e,t){if(!e)return;let r=await e.match(t);if(!r){return}return r}async function oo(e,t,r,o){if(!e)return;let a=xe(o),i=Xe(xe(a,{maxAge:(a.maxAge||0)+(a.staleWhileRevalidate||0)})),n=Xe(xe(a));r.headers.set("cache-control",i),r.headers.set("real-cache-control",n),r.headers.set("cache-put-date",String(Date.now())),await e.put(t,r);}async function ao(e,t){e&&await e.delete(t);}function no(e,t){let r=e.headers.get("real-cache-control"),o=0;if(r){let i=r.match(/max-age=(\d*)/);i&&i.length>1&&(o=parseFloat(i[1]));}return [(Date.now()-Number(t))/1e3,o]}function io(e,t){let r=t.headers.get("cache-put-date");if(!r)return !1;let[o,a]=no(t,r),i=o>a;return i}var De={get:ro,set:oo,delete:ao,generateDefaultCacheControlHeader:Xe,isStale:io};function ge(e){return `https://shopify.dev/?${e}`}function so(e){return e||ne()}async function Ut(e,t){if(!e)return;let r=ge(t),o=new Request(r),a=await De.get(e,o);if(!a)return;let i=await a.text();try{return [z(i),a]}catch{return [i,a]}}async function Nt(e,t,r,o){if(!e)return;let a=ge(t),i=new Request(a),n=new Response(JSON.stringify(r));await De.set(e,i,n,so(o));}function Vt(e,t){return De.isStale(new Request(ge(e)),t)}function Mt(e){let t=Array.isArray(e)?e:[e],r="";for(let o of t)o!=null&&(typeof o=="object"?r+=JSON.stringify(o):r+=o.toString());return encodeURIComponent(r)}var Ze=new Set;async function ke(e,t,{strategy:r=J(),cacheInstance:o,shouldCacheResult:a=()=>!0,waitUntil:i,debugInfo:n,spanEmitter:s=()=>{}}){let u=Date.now(),c=Mt([...typeof e=="string"?[e]:e]),l,d,m=h=>{d={displayName:h.displayName,url:h.response?.url,responseInit:{status:h.response?.status||0,statusText:h.response?.statusText||"",headers:Array.from(h.response?.headers.entries()||[])}};},p=()=>({...l,...n,url:d?.url||n?.url||l?.url||ge(c),displayName:n?.displayName||d?.displayName||l?.displayName}),y=void 0;if(!o||!r||r.mode===je){let h=await t({addDebugData:m});return s(p(),u),h}let f=h=>Nt(o,c,{value:h,debugInfo:void 0},r),g=await Ut(o,c);if(g&&typeof g[0]!="string"){let[{value:h,debugInfo:I},b]=g;l=I;let V=Vt(c,b)?"STALE":"HIT";if(!Ze.has(c)&&V==="STALE"){Ze.add(c);let M=Promise.resolve().then(async()=>{let oe=Date.now();try{let k=await t({addDebugData:m});a(k)&&(await f(k),y?.({result:k,cacheStatus:"PUT",overrideStartTime:oe}),s(p(),oe,"PUT"));}catch(k){k.message&&(k.message="SWR in sub-request failed: "+k.message),console.error(k);}finally{Ze.delete(c);}});i?.(M);}return s(p(),u,V),h}let P=await t({addDebugData:m});if(s(p(),u,"MISS"),a(P)){let h=Promise.resolve().then(async()=>{let I=Date.now();await f(P),s(p(),I,"PUT");});i?.(h);}return P}function qt(e,t){return [e,{status:t.status,statusText:t.statusText,headers:Array.from(t.headers.entries())}]}function Ft([e,t]){return [e,new Response(e,t)]}var $t=(e,t)=>!e?.errors&&t.status<400;async function Ht(e,t,{cacheInstance:r,cache:o,cacheKey:a=[e,t],shouldCacheResponse:i=()=>!0,waitUntil:n,returnType:s="json",debugInfo:u,spanEmitter:c}={}){return !o&&(!t.method||t.method==="GET")&&(o=J()),ke(a,async()=>{let l=await fetch(e,t),d;try{d=await l[s]();}catch{try{d=await l.text();}catch{return qt("",l)}}return qt(d,l)},{cacheInstance:r,waitUntil:n,strategy:o??null,debugInfo:u,shouldCacheResult:l=>i(...Ft(l)),spanEmitter:c}).then(Ft)}var Ce="2024.4.3";var et="Custom-Storefront-Request-Group-ID",tt="X-Shopify-Storefront-Access-Token",rt="X-SDK-Variant",ot="X-SDK-Variant-Source",at="X-SDK-Version",Le="2024-04",ie=`Shopify Hydrogen ${Ce}`,Qt="30243aa5-17c1-465a-8493-944bcc4e88aa",x="customerAccount",se="buyer";function Bt(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`weak-${Math.random().toString(16).substring(2)}`}var Gt=new Set,jt=e=>{Gt.has(e)||(console.warn(e),Gt.add(e));},Wt=new Set,nt=e=>{Wt.has(e)||(console.error(new Error(e)),Wt.add(e));};function ce(e){return e.replace(/\s*#.*$/gm,"").replace(/\s+/gm," ").trim()}var co=/(^|}\s)query[\s({]/im,uo=/(^|}\s)mutation[\s({]/im;function _e(e,t){if(!co.test(e))throw new Error(`[h2:error:${t}] Can only execute queries`)}function Ue(e,t){if(!uo.test(e))throw new Error(`[h2:error:${t}] Can only execute mutations`)}var Y=class extends Error{locations;path;extensions;constructor(t,r={}){let a=(r.clientOperation?`[h2:error:${r.clientOperation}] `:"")+t+(r.requestId?` - Request ID: ${r.requestId}`:"");super(a),this.name="GraphQLError",this.extensions=r.extensions,this.locations=r.locations,this.path=r.path,this.stack=r.stack||void 0;try{this.cause=JSON.stringify({...typeof r.cause=="object"?r.cause:{},requestId:r.requestId});}catch{r.cause&&(this.cause=r.cause);}}get[Symbol.toStringTag](){return this.name}toString(){let t=`${this.name}: ${this.message}`;if(this.path)try{t+=` | path: ${JSON.stringify(this.path)}`;}catch{}if(this.extensions)try{t+=` | extensions: ${JSON.stringify(this.extensions)}`;}catch{}return t+=`
`,this.stack&&(t+=`${this.stack.slice(this.stack.indexOf(`
`)+1)}
`),t}toJSON(){return {name:"Error",message:""}}};function Se({url:e,response:t,errors:r,type:o,query:a,queryVariables:i,ErrorConstructor:n=Error,client:s="storefront"}){let u=(typeof r=="string"?r:r?.map?.(l=>l.message).join(`
`))||`URL: ${e}
API response error: ${t.status}`,c=new Y(u,{query:a,queryVariables:i,cause:{errors:r},clientOperation:`${s}.${o}`,requestId:t.headers.get("x-request-id")});throw new n(c.message,{cause:c.cause})}function ue(e,t={}){let r=new Error,o=(a,i="Error")=>{let n=(r.stack??"").split(`
`).slice(3+(t.stackOffset??0)).join(`
`).replace(/ at loader(\d+) \(/,(s,u)=>s.replace(u,""));return `${i}: ${a}
`+n};return e.then(a=>{if(a?.errors&&Array.isArray(a.errors)){let i=typeof t.logErrors=="function"?t.logErrors:()=>t.logErrors??!1;a.errors.forEach(n=>{n&&(n.stack=o(n.message,n.name),i(n)&&console.error(n));});}return a}).catch(a=>{throw a&&(a.stack=o(a.message,a.name)),a})}var F=void 0;var ho={language:"EN",country:"US"};function Ci(e){let {storefrontHeaders:t,cache:r,waitUntil:o,i18n:a,storefrontId:i,logErrors:n=!0,spanEmitter:s,...u}=e,{getPublicTokenHeaders:l,getPrivateTokenHeaders:d,getStorefrontApiUrl:m,getShopifyDomain:p}=hydrogenReact.createStorefrontClient(u),f=(u.privateStorefrontToken?d:l)({contentType:"json",buyerIp:t?.buyerIp||""});if(f[et]=t?.requestGroupId||Bt(),i&&(f[hydrogenReact.SHOPIFY_STOREFRONT_ID_HEADER]=i),(f["user-agent"]=`Hydrogen ${Ce}`),t&&t.cookie){let h=hydrogenReact.getShopifyCookies(t.cookie??"");h[hydrogenReact.SHOPIFY_Y]&&(f[hydrogenReact.SHOPIFY_STOREFRONT_Y_HEADER]=h[hydrogenReact.SHOPIFY_Y]),h[hydrogenReact.SHOPIFY_S]&&(f[hydrogenReact.SHOPIFY_STOREFRONT_S_HEADER]=h[hydrogenReact.SHOPIFY_S]);}let g=JSON.stringify({"content-type":f["content-type"],"user-agent":f["user-agent"],[rt]:f[rt],[ot]:f[ot],[at]:f[at],[tt]:f[tt]});async function P({query:h,mutation:I,variables:b,cache:V,headers:M=[],storefrontApiVersion:oe,displayName:k,stackInfo:C}){let S=M instanceof Headers?Object.fromEntries(M.entries()):Array.isArray(M)?Object.fromEntries(M):M,T=h??I,v={...b};a&&(!b?.country&&/\$country/.test(T)&&(v.country=a.country),!b?.language&&/\$language/.test(T)&&(v.language=a.language));let _=m({storefrontApiVersion:oe}),B=JSON.stringify({query:T,variables:v}),O={method:"POST",headers:{...f,...S},body:B},N=[_,O.method,g,O.body],[L,E]=await Ht(_,O,{cacheInstance:I?void 0:r,cache:V||ne(),cacheKey:N,shouldCacheResponse:$t,waitUntil:o,debugInfo:{requestId:O.headers[et],displayName:k,url:_,stackInfo:C,graphql:B,purpose:t?.purpose},spanEmitter:s}),q={url:_,response:E,type:I?"mutation":"query",query:T,queryVariables:v,errors:void 0};if(!E.ok){let G;try{G=z(L);}catch{G=[{message:L}];}Se({...q,errors:G});}let{data:ye,errors:ae}=L,fe=ae?.map(({message:G,...me})=>new Y(G,{...me,clientOperation:`storefront.${q.type}`,requestId:E.headers.get("x-request-id"),queryVariables:v,query:T}));return A(ye,fe)}return {storefront:{query(h,I){h=ce(h),_e(h,"storefront.query");let b=zt?.(h);return ue(P({...I,query:h,stackInfo:F?.(b)}),{stackOffset:b,logErrors:n})},mutate(h,I){h=ce(h),Ue(h,"storefront.mutate");let b=zt?.(h);return ue(P({...I,mutation:h,stackInfo:F?.(b)}),{stackOffset:b,logErrors:n})},cache:r,CacheNone:Ke,CacheLong:ze,CacheShort:J,CacheCustom:Ye,generateCacheControlHeader:he,getPublicTokenHeaders:l,getPrivateTokenHeaders:d,getShopifyDomain:p,getApiUrl:m,i18n:a??ho}}}var zt=void 0;function A(e,t){return {...e,...t&&{errors:t}}}function Ne(e,t){let r=e.headers?.get?.(t)??e.headers?.[t];return typeof r=="string"?r:null}function X(e){return {requestId:e?Ne(e,"request-id"):void 0,purpose:e?Ne(e,"purpose"):void 0}}function go({cache:e,waitUntil:t,request:r}){return function(a,i,n){return ke(a,n,{strategy:i,cacheInstance:e,waitUntil:t,debugInfo:{...X(r),stackInfo:F?.()}})}}var it=class{#e;constructor(){this.#e=new Map;}add(t){throw new Error("Method not implemented. Use `put` instead.")}addAll(t){throw new Error("Method not implemented. Use `put` instead.")}matchAll(t,r){throw new Error("Method not implemented. Use `match` instead.")}async put(t,r){if(t.method!=="GET")throw new TypeError("Cannot cache response to non-GET request.");if(r.status===206)throw new TypeError("Cannot cache response to a range request (206 Partial Content).");if(r.headers.get("vary")?.includes("*"))throw new TypeError("Cannot cache response with 'Vary: *' header.");this.#e.set(t.url,{body:new Uint8Array(await r.arrayBuffer()),status:r.status,headers:[...r.headers],timestamp:Date.now()});}async match(t){if(t.method!=="GET")return;let r=this.#e.get(t.url);if(!r)return;let{body:o,timestamp:a,...i}=r,n=new Headers(i.headers),s=n.get("cache-control")||n.get("real-cache-control")||"",u=parseInt(s.match(/max-age=(\d+)/)?.[1]||"0",10),c=parseInt(s.match(/stale-while-revalidate=(\d+)/)?.[1]||"0",10),l=(Date.now()-a)/1e3;if(l>u+c){this.#e.delete(t.url);return}let m=l>u;return n.set("cache",m?"STALE":"HIT"),n.set("date",new Date(a).toUTCString()),new Response(o,{status:i.status??200,headers:n})}async delete(t){return this.#e.has(t.url)?(this.#e.delete(t.url),!0):!1}keys(t){let r=[];for(let o of this.#e.keys())(!t||t.url===o)&&r.push(new Request(o));return Promise.resolve(r)}};function Ve(e){if(!e)return;let{pathname:t,search:r}=new URL(e),o=t+r,a=new URLSearchParams(r),i=a.get("return_to")||a.get("redirect");if(i){if(Xt(e,i))return i;console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}`);}}function Xt(e,t){try{return new URL(e).origin===new URL(t,e).origin}catch{return !1}}function st({requestUrl:e,defaultUrl:t,redirectUrl:r}){let o=e,a=Yt(e,t),i=r?Yt(e,r):a;return Xt(e,i.toString())?i.toString():(console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${i}. Default url ${a} is used instead.`),a.toString())}function Yt(e,t){return Co(t)?new URL(t):new URL(t,new URL(e).origin)}function Co(e){try{return new URL(e),!0}catch{return !1}}async function So(e){let{storefront:t,request:r,noAdminRedirect:o,matchQueryParams:a,response:i=new Response("Not Found",{status:404})}=e,n=new URL(r.url),{pathname:s,searchParams:u}=n,c=u.has("_data");u.delete("redirect"),u.delete("return_to"),u.delete("_data");let l=(a?n.toString().replace(n.origin,""):s).toLowerCase();if(n.pathname==="/admin"&&!o)return ut(`${t.getShopifyDomain()}/admin`,c,u,a);try{let{urlRedirects:d}=await t.query(Po,{variables:{query:"path:"+l.replace(/\/+$/,"")}}),m=d?.edges?.[0]?.node?.target;if(m)return ut(m,c,u,a);let p=Ve(r.url);if(p)return ut(p,c,u,a)}catch(d){console.error(`Failed to fetch redirects from Storefront API for route ${l}`,d);}return i}var ct="https://example.com";function ut(e,t,r,o){let a=new URL(e,ct);if(!o)for(let[i,n]of r)a.searchParams.append(i,n);return t?new Response(null,{status:200,headers:{"X-Remix-Redirect":a.toString().replace(ct,""),"X-Remix-Status":"301"}}):new Response(null,{status:301,headers:{location:a.toString().replace(ct,"")}})}var Po=`#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;var Ao=async function({request:t,context:r}){let o=r.storefront,a=r.customerAccount,i=new URL(t.url);if(!o)throw new Error("GraphiQL: Hydrogen's storefront client must be injected in the loader context.");let n={};if(o){let c="X-Shopify-Storefront-Access-Token";n.storefront={name:"Storefront API",authHeader:c,accessToken:o.getPublicTokenHeaders()[c],apiUrl:o.getApiUrl(),icon:"SF"};}if(a){let c=await(await fetch(i.origin+"/graphiql/customer-account.schema.json")).json(),l=await a.getAccessToken();c&&(n["customer-account"]={name:"Customer Account API",value:c,authHeader:"Authorization",accessToken:l,apiUrl:a.getApiUrl(),icon:"CA"});}let s="https://avatars.githubusercontent.com/u/12972006?s=48&v=4",u=String.raw;return new Response(u`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>GraphiQL</title>
          <link rel="icon" type="image/x-icon" href="${s}" />
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
    `,{status:200,headers:{"content-type":"text/html"}})};var To={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},vo=/[&><\u2028\u2029]/g;function Zt(e){return e.replace(vo,t=>To[t])}var W="Error in SEO input: ",$={title:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`title` should be a string"));if(typeof e=="string"&&e.length>120)throw new Error(W.concat("`title` should not be longer than 120 characters"));return e}},description:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`description` should be a string"));if(typeof e=="string"&&e.length>155)throw new Error(W.concat("`description` should not be longer than 155 characters"));return e}},url:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`url` should be a string"));if(typeof e=="string"&&!e.startsWith("http"))throw new Error(W.concat("`url` should be a valid URL"));return e}},handle:{validate:e=>{if(typeof e!="string")throw new Error(W.concat("`handle` should be a string"));if(typeof e=="string"&&!e.startsWith("@"))throw new Error(W.concat("`handle` should start with `@`"));return e}}};function er(e){let t=[];for(let r of Object.keys(e))switch(r){case"title":{let o=H($.title,e.title),a=lt(e?.titleTemplate,o);if(!a)break;t.push(D("title",{title:a}),D("meta",{property:"og:title",content:a}),D("meta",{name:"twitter:title",content:a}));break}case"description":{let o=H($.description,e.description);if(!o)break;t.push(D("meta",{name:"description",content:o}),D("meta",{property:"og:description",content:o}),D("meta",{name:"twitter:description",content:o}));break}case"url":{let o=H($.url,e.url);if(!o)break;let i=o.split("?")[0].replace(/\/$/,"");t.push(D("link",{rel:"canonical",href:i}),D("meta",{property:"og:url",content:i}));break}case"handle":{let o=H($.handle,e.handle);if(!o)break;t.push(D("meta",{name:"twitter:site",content:o}),D("meta",{name:"twitter:creator",content:o}));break}case"media":{let o,a=j(e.media);for(let i of a)if(typeof i=="string"&&t.push(D("meta",{name:"og:image",content:i})),i&&typeof i=="object"){let n=i.type||"image",s=i?{url:i?.url,secure_url:i?.url,type:dt(i.url),width:i?.width,height:i?.height,alt:i?.altText}:{};for(let u of Object.keys(s))s[u]&&(o=s[u],t.push(D("meta",{property:`og:${n}:${u}`,content:o},s.url)));}break}case"jsonLd":{let o=j(e.jsonLd),a=0;for(let i of o){if(typeof i!="object")continue;let n=D("script",{type:"application/ld+json",children:JSON.stringify(i,(s,u)=>typeof u=="string"?Zt(u):u)},`json-ld-${i?.["@type"]||i?.name||a++}`);t.push(n);}break}case"alternates":{let o=j(e.alternates);for(let a of o){if(!a)continue;let{language:i,url:n,default:s}=a,u=i?`${i}${s?"-default":""}`:void 0;t.push(D("link",{rel:"alternate",hrefLang:u,href:n}));}break}case"robots":{if(!e.robots)break;let{maxImagePreview:o,maxSnippet:a,maxVideoPreview:i,noArchive:n,noFollow:s,noImageIndex:u,noIndex:c,noSnippet:l,noTranslate:d,unavailableAfter:m}=e.robots,p=[n&&"noarchive",u&&"noimageindex",l&&"nosnippet",d&&"notranslate",o&&`max-image-preview:${o}`,a&&`max-snippet:${a}`,i&&`max-video-preview:${i}`,m&&`unavailable_after:${m}`],y=(c?"noindex":"index")+","+(s?"nofollow":"follow");for(let f of p)f&&(y+=`,${f}`);t.push(D("meta",{name:"robots",content:y}));break}}return t.flat().sort((r,o)=>r.key.localeCompare(o.key))}function D(e,t,r){let o={tag:e,props:{},key:""};return e==="title"?(o.children=t.title,o.key=pt(o),o):e==="script"?(o.children=typeof t.children=="string"?t.children:"",o.key=pt(o,r),delete t.children,o.props=t,o):(o.props=t,Object.keys(o.props).forEach(a=>!o.props[a]&&delete o.props[a]),o.key=pt(o,r),o)}function pt(e,t){let{tag:r,props:o}=e;if(r==="title")return "0-title";if(r==="meta"){let a=o.content===t&&typeof o.property=="string"&&!o.property.endsWith("secure_url")&&"0";return [r,...[t,a],o.property||o.name].filter(n=>n).join("-")}return r==="link"?[r,o.rel,o.hrefLang||o.media].filter(i=>i).join("-").replace(/\s+/g,"-"):r==="script"?`${r}-${t}`:`${r}-${o.type}`}function lt(e,t){if(t)return e?typeof e=="function"?e(t):e.replace("%s",t??""):t}function dt(e){switch(e&&e.split(".").pop()){case"svg":return "image/svg+xml";case"png":return "image/png";case"gif":return "image/gif";case"swf":return "application/x-shockwave-flash";case"mp3":return "audio/mpeg";case"jpg":case"jpeg":default:return "image/jpeg"}}function j(e){return Array.isArray(e)?e:[e]}function H(e,t){try{return e.validate(t)}catch(r){return console.warn(r.message),t}}var ko=react.lazy(()=>Promise.resolve().then(()=>(ar(),or)));function Lo({debug:e}){let t=react$1.useMatches(),r=react$1.useLocation();console.warn("[h2:warn:Seo] The `<Seo/>` component is deprecated. Use `getSeoMeta` instead.\nSee: https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getseometa");let o=react.useMemo(()=>t.flatMap(n=>{let{handle:s,...u}=n,c={...u,...r},l=s?.seo,d=u?.data?.seo;return !l&&!d?[]:l?Me(l,c):[d]}).reduce((n,s)=>{Object.keys(s).forEach(c=>!s[c]&&delete s[c]);let{jsonLd:u}=s;return u?n?.jsonLd?Array.isArray(u)?{...n,...s,jsonLd:[...n.jsonLd,...u]}:{...n,...s,jsonLd:[...n.jsonLd,u]}:{...n,...s,jsonLd:[u]}:{...n,...s}},{}),[t,r]),{html:a,loggerMarkup:i}=react.useMemo(()=>{let n=er(o),s=n.map(c=>c.tag==="script"?react.createElement(c.tag,{...c.props,key:c.key,dangerouslySetInnerHTML:{__html:c.children}}):react.createElement(c.tag,{...c.props,key:c.key},c.children)),u=react.createElement(react.Suspense,{fallback:null},react.createElement(ko,{headTags:n}));return {html:s,loggerMarkup:u}},[o]);return react.createElement(react.Fragment,null,a,e&&i)}function Me(e,...t){if(e instanceof Function)return Me(e(...t),...t);let r={};return Array.isArray(e)?(r=e.reduce((o,a)=>[...o,Me(a)],[]),r):e instanceof Object?(Object.entries(e).forEach(([a,i])=>{r[a]=Me(i,...t);}),r):e}function _o(...e){let t=[],r=e.reduce((o,a)=>{if(!a)return o;Object.keys(a).forEach(n=>!a[n]&&delete a[n]);let{jsonLd:i}=a;return i?o?.jsonLd?{...o,...a,jsonLd:j(o.jsonLd).concat(i)}:{...o,...a,jsonLd:[i]}:{...o,...a}},{})||{};for(let o of Object.keys(r))switch(o){case"title":{let a=H($.title,r.title),i=lt(r?.titleTemplate,a);if(!i)break;t.push({title:i},{property:"og:title",content:i},{property:"twitter:title",content:i});break}case"description":{let a=H($.description,r.description);if(!a)break;t.push({name:"description",content:a},{property:"og:description",content:a},{property:"twitter:description",content:a});break}case"url":{let a=H($.url,r.url);if(!a)break;let n=a.split("?")[0].replace(/\/$/,"");t.push({tagName:"link",rel:"canonical",href:n},{property:"og:url",content:n});break}case"handle":{let a=H($.handle,r.handle);if(!a)break;t.push({property:"twitter:site",content:a},{property:"twitter:creator",content:a});break}case"media":{let a,i=j(r.media);for(let n of i)if(typeof n=="string"&&t.push({property:"og:image",content:n}),n&&typeof n=="object"){let s=n.type||"image",u=n?{url:n?.url,secure_url:n?.url,type:dt(n.url),width:n?.width,height:n?.height,alt:n?.altText}:{};for(let c of Object.keys(u))u[c]&&(a=u[c],t.push({property:`og:${s}:${c}`,content:a}));}break}case"jsonLd":{let a=j(r.jsonLd);for(let n of a)typeof n!="object"||Object.keys(n).length===0||t.push({"script:ld+json":n});break}case"alternates":{let a=j(r.alternates);for(let i of a){if(!i)continue;let{language:n,url:s,default:u}=i,c=n?`${n}${u?"-default":""}`:void 0;t.push({tagName:"link",rel:"alternate",hrefLang:c,href:s});}break}case"robots":{if(!r.robots)break;let{maxImagePreview:a,maxSnippet:i,maxVideoPreview:n,noArchive:s,noFollow:u,noImageIndex:c,noIndex:l,noSnippet:d,noTranslate:m,unavailableAfter:p}=r.robots,y=[s&&"noarchive",c&&"noimageindex",d&&"nosnippet",m&&"notranslate",a&&`max-image-preview:${a}`,i&&`max-snippet:${i}`,n&&`max-video-preview:${n}`,p&&`unavailable_after:${p}`],f=(l?"noindex":"index")+","+(u?"nofollow":"follow");for(let g of y)g&&(f+=`,${g}`);t.push({name:"robots",content:f});break}}return t}function qo({connection:e,children:t=()=>(console.warn("<Pagination> requires children to work properly"),null)}){let o=react$1.useNavigation().state==="loading",{endCursor:a,hasNextPage:i,hasPreviousPage:n,nextPageUrl:s,nodes:u,previousPageUrl:c,startCursor:l}=Fo(e),d=react.useMemo(()=>({pageInfo:{endCursor:a,hasPreviousPage:n,hasNextPage:i,startCursor:l},nodes:u}),[a,i,n,l,u]),m=react.useMemo(()=>react.forwardRef(function(f,g){return i?react.createElement(react$1.Link,{preventScrollReset:!0,...f,to:s,state:d,replace:!0,ref:g}):null}),[i,s,d]),p=react.useMemo(()=>react.forwardRef(function(f,g){return n?react.createElement(react$1.Link,{preventScrollReset:!0,...f,to:c,state:d,replace:!0,ref:g}):null}),[n,c,d]);return t({state:d,hasNextPage:i,hasPreviousPage:n,isLoading:o,nextPageUrl:s,nodes:u,previousPageUrl:c,NextLink:m,PreviousLink:p})}function qe(e){let t=new URLSearchParams(e);return t.delete("cursor"),t.delete("direction"),t.toString()}function Ae(e){throw new Error(`The Pagination component requires ${"`"+e+"`"} to be a part of your query. See the guide on how to setup your query to include ${"`"+e+"`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`)}function Fo(e){e.pageInfo||Ae("pageInfo"),typeof e.pageInfo.startCursor>"u"&&Ae("pageInfo.startCursor"),typeof e.pageInfo.endCursor>"u"&&Ae("pageInfo.endCursor"),typeof e.pageInfo.hasNextPage>"u"&&Ae("pageInfo.hasNextPage"),typeof e.pageInfo.hasPreviousPage>"u"&&Ae("pageInfo.hasPreviousPage");let t=react$1.useNavigate(),{state:r,search:o,pathname:a}=react$1.useLocation(),s=new URLSearchParams(o).get("direction")==="previous",u=react.useMemo(()=>!globalThis?.window?.__hydrogenHydrated||!r||!r?.nodes?hydrogenReact.flattenConnection(e):s?[...hydrogenReact.flattenConnection(e),...r.nodes]:[...r.nodes,...hydrogenReact.flattenConnection(e)],[r,e]),c=react.useMemo(()=>{let p=globalThis?.window?.__hydrogenHydrated,y=!p||r?.pageInfo?.startCursor===void 0?e.pageInfo.startCursor:r.pageInfo.startCursor,f=!p||r?.pageInfo?.endCursor===void 0?e.pageInfo.endCursor:r.pageInfo.endCursor,g=!p||r?.pageInfo?.hasPreviousPage===void 0?e.pageInfo.hasPreviousPage:r.pageInfo.hasPreviousPage,P=!p||r?.pageInfo?.hasNextPage===void 0?e.pageInfo.hasNextPage:r.pageInfo.hasNextPage;return r?.nodes&&(s?(y=e.pageInfo.startCursor,g=e.pageInfo.hasPreviousPage):(f=e.pageInfo.endCursor,P=e.pageInfo.hasNextPage)),{startCursor:y,endCursor:f,hasPreviousPage:g,hasNextPage:P}},[s,r,e.pageInfo.hasNextPage,e.pageInfo.hasPreviousPage,e.pageInfo.startCursor,e.pageInfo.endCursor]),l=react.useRef({params:qe(o),pathname:a});react.useEffect(()=>{window.__hydrogenHydrated=!0;},[]),react.useEffect(()=>{(qe(o)!==l.current.params||a!==l.current.pathname)&&(l.current={pathname:a,params:qe(o)},t(`${a}?${qe(o)}`,{replace:!0,preventScrollReset:!0,state:{nodes:void 0,pageInfo:void 0}}));},[a,o]);let d=react.useMemo(()=>{let p=new URLSearchParams(o);return p.set("direction","previous"),c.startCursor&&p.set("cursor",c.startCursor),`?${p.toString()}`},[o,c.startCursor]),m=react.useMemo(()=>{let p=new URLSearchParams(o);return p.set("direction","next"),c.endCursor&&p.set("cursor",c.endCursor),`?${p.toString()}`},[o,c.endCursor]);return {...c,previousPageUrl:d,nextPageUrl:m,nodes:u}}function $o(e,t={pageBy:20}){if(typeof e?.url>"u")throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");let{pageBy:r}=t,o=new URLSearchParams(new URL(e.url).search),a=o.get("cursor")??void 0;return (o.get("direction")==="previous"?"previous":"next")==="previous"?{last:r,startCursor:a??null}:{first:r,endCursor:a??null}}var U=class extends Response{constructor(t,r,o){super(`Bad request: ${t}`,{status:400,headers:o});}};function ve(e,t={}){let r=t.headers?new Headers(t.headers):new Headers({});return r.set("location",e),new Response(null,{status:t.status||302,headers:r})}async function Ho({session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:o,debugInfo:a,exchangeForStorefrontCustomerAccessToken:i}){let n=new URLSearchParams,s=e.get(x),u=s?.refreshToken,c=s?.idToken;if(!u)throw new U("Unauthorized","No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");n.append("grant_type","refresh_token"),n.append("refresh_token",u),n.append("client_id",t);let l={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let m=`${r}/auth/oauth/token`,p=await fetch(m,{method:"POST",headers:l,body:n});if(!p.ok){let h=await p.text();throw new Response(h,{status:p.status,headers:{"Content-Type":"text/html; charset=utf-8"}})}let{access_token:y,expires_in:f,refresh_token:g}=await p.json(),P=await mt(y,t,r,o);e.set(x,{accessToken:P,expiresAt:new Date(new Date().getTime()+(f-120)*1e3).getTime()+"",refreshToken:g,idToken:c}),await i();}function pe(e){e.unset(x),e.unset(se);}async function pr({locks:e,expiresAt:t,session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:s}){if(parseInt(t,10)-1e3<new Date().getTime())try{e.refresh||(e.refresh=Ho({session:r,customerAccountId:o,customerAccountUrl:a,httpsOrigin:i,debugInfo:n,exchangeForStorefrontCustomerAccessToken:s})),await e.refresh,delete e.refresh;}catch(u){throw pe(r),u&&u.status!==401?u:new U("Unauthorized","Login before querying the Customer Account API.")}}function lr(){let e=Qo();return yr(e)}async function dr(e){let t=await crypto.subtle.digest({name:"SHA-256"},new TextEncoder().encode(e)),r=Bo(t);return yr(r)}function Qo(){let e=new Uint8Array(32);return crypto.getRandomValues(e),String.fromCharCode.apply(null,Array.from(e))}function yr(e){return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function Bo(e){let t=new Uint8Array(e),r=Array.from(t);return String.fromCharCode(...r)}function fr(){let e=Date.now().toString(),t=Math.random().toString(36).substring(2);return e+t}async function mt(e,t,r,o,a){let i=t;if(!e)throw new U("Unauthorized","oAuth access token was not provided during token exchange.");let n=new URLSearchParams;n.append("grant_type","urn:ietf:params:oauth:grant-type:token-exchange"),n.append("client_id",i),n.append("audience",Qt),n.append("subject_token",e),n.append("subject_token_type","urn:ietf:params:oauth:token-type:access_token"),n.append("scopes","https://api.customers.com/auth/customer.graphql");let s={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:o};new Date().getTime();let c=`${r}/auth/oauth/token`,l=await fetch(c,{method:"POST",headers:s,body:n});let d=await l.json();if(d.error)throw new U(d.error_description);return d.access_token}function mr(e){return Go(e).payload.nonce}function Go(e){let[t,r,o]=e.split("."),a=JSON.parse(atob(t)),i=JSON.parse(atob(r));return {header:a,payload:i,signature:o}}function Fe(){return jo(Wo())}function Wo(){try{return crypto.getRandomValues(new Uint8Array(16))}catch{return new Uint8Array(16).map(()=>Math.random()*255|0)}}function jo(e){return Array.from(e,function(t){return ("0"+(t&255).toString(16)).slice(-2)}).join("")}var hr="/account/login",Ko="/account/authorize",gr="/account";function Jo(e){if(!e.url)return hr;let{pathname:t}=new URL(e.url),r=hr+`?${new URLSearchParams({return_to:t}).toString()}`;return ve(r)}function zo({session:e,customerAccountId:t,customerAccountUrl:r,customerApiVersion:o=Le,request:a,waitUntil:i,authUrl:n,customAuthStatusHandler:s,logErrors:u=!0,unstableB2b:c=!1}){if(o!==Le&&console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${Le}.`),!a?.url)throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");let l=s||(()=>Jo(a)),d=new URL(a.url),m=d.protocol==="http:"?d.origin.replace("http","https"):d.origin,p=st({requestUrl:m,defaultUrl:Ko,redirectUrl:n}),y=`${r}/account/customer/api/${o}/graphql`,f={};async function g({query:C,type:S,variables:T={}}){let v=await I();if(!v)throw l();new Date().getTime();let O=await fetch(y,{method:"POST",headers:{"Content-Type":"application/json","User-Agent":ie,Origin:m,Authorization:v},body:JSON.stringify({query:C,variables:T})});let N=await O.text(),L={url:y,response:O,type:S,query:C,queryVariables:T,errors:void 0,client:"customer"};if(!O.ok){if(O.status===401)throw pe(e),l();let E;try{E=z(N);}catch{E=[{message:N}];}Se({...L,errors:E});}try{let E=z(N),{errors:q}=E,ye=q?.map(({message:ae,...fe})=>new Y(ae,{...fe,clientOperation:`customerAccount.${L.type}`,requestId:O.headers.get("x-request-id"),queryVariables:T,query:C}));return {...E,...q&&{errors:ye}}}catch{Se({...L,errors:[{message:N}]});}}async function P(){if(!r||!t)return !1;let C=e.get(x),S=C?.accessToken,T=C?.expiresAt;if(!S||!T)return !1;let v=F?.();try{await pr({locks:f,expiresAt:T,session:e,customerAccountId:t,customerAccountUrl:r,httpsOrigin:m,debugInfo:{waitUntil:i,stackInfo:v,...X(a)},exchangeForStorefrontCustomerAccessToken:k});}catch{return !1}return !0}async function h(){if(!await P())throw l()}async function I(){if(await P())return e.get(x)?.accessToken}async function b(C,S){return be(r,t),C=ce(C),Ue(C,"customer.mutate"),ue(g({query:C,type:"mutation",...S}),{logErrors:u})}async function V(C,S){return be(r,t),C=ce(C),_e(C,"customer.query"),ue(g({query:C,type:"query",...S}),{logErrors:u})}function M(C){e.set(se,{...e.get(se),...C});}async function oe(){if(await P())return e.get(se)}async function k(){if(!c)return;let C=`#graphql
      mutation storefrontCustomerAccessTokenCreate {
        storefrontCustomerAccessTokenCreate {
          customerAccessToken
        }
      }
    `,{data:S}=await b(C),T=S?.storefrontCustomerAccessTokenCreate?.customerAccessToken;T&&M({customerAccessToken:T});}return {login:async C=>{be(r,t);let S=new URL(`${r}/auth/oauth/authorize`),T=fr(),v=Fe();if(S.searchParams.set("client_id",t),S.searchParams.set("scope","openid email"),S.searchParams.append("response_type","code"),S.searchParams.append("redirect_uri",p),S.searchParams.set("scope","openid email https://api.customers.com/auth/customer.graphql"),S.searchParams.append("state",T),S.searchParams.append("nonce",v),C?.uiLocales){let[O,N]=C.uiLocales.split("-"),L=O.toLowerCase();N&&(L+=`-${N.toUpperCase()}`),S.searchParams.append("ui_locales",L);}let _=lr(),B=await dr(_);return e.set(x,{...e.get(x),codeVerifier:_,state:T,nonce:v,redirectPath:Ve(a.url)||Ne(a,"Referer")||gr}),S.searchParams.append("code_challenge",B),S.searchParams.append("code_challenge_method","S256"),ve(S.toString())},logout:async C=>{be(r,t);let S=e.get(x)?.idToken,T=st({requestUrl:m,defaultUrl:m,redirectUrl:C?.postLogoutRedirectUri}),v=S?new URL(`${r}/auth/logout?${new URLSearchParams([["id_token_hint",S],["post_logout_redirect_uri",T]]).toString()}`).toString():T;return pe(e),ve(v)},isLoggedIn:P,handleAuthStatus:h,getAccessToken:I,getApiUrl:()=>y,mutate:b,query:V,authorize:async()=>{be(r,t);let C=d.searchParams.get("code"),S=d.searchParams.get("state");if(!C||!S)throw pe(e),new U("Unauthorized","No code or state parameter found in the redirect URL.");if(e.get(x)?.state!==S)throw pe(e),new U("Unauthorized","The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");let T=t,v=new URLSearchParams;v.append("grant_type","authorization_code"),v.append("client_id",T),v.append("redirect_uri",p),v.append("code",C);let _=e.get(x)?.codeVerifier;if(!_)throw new U("Unauthorized","No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");v.append("code_verifier",_);let B={"content-type":"application/x-www-form-urlencoded","User-Agent":ie,Origin:m},O=F?.();new Date().getTime();let L=`${r}/auth/oauth/token`,E=await fetch(L,{method:"POST",headers:B,body:v});if(!E.ok)throw new Response(await E.text(),{status:E.status,headers:{"Content-Type":"text/html; charset=utf-8"}});let{access_token:q,expires_in:ye,id_token:ae,refresh_token:fe}=await E.json(),G=e.get(x)?.nonce,me=await mr(ae);if(G!==me)throw new U("Unauthorized",`Returned nonce does not match: ${G} !== ${me}`);let Jr=await mt(q,t,r,m,{waitUntil:i,stackInfo:O,...X(a)}),zr=e.get(x)?.redirectPath;return e.set(x,{accessToken:Jr,expiresAt:new Date(new Date().getTime()+(ye-120)*1e3).getTime()+"",refreshToken:fe,idToken:ae}),await k(),ve(zr||gr)},UNSTABLE_setBuyer:M,UNSTABLE_getBuyer:oe}}function be(e,t){try{if(!e||!t)throw Error();new URL(e);}catch{console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));let r="Internal Server Error";throw new Response(r,{status:500})}}var Yo="https://raw.githubusercontent.com/Shopify/hydrogen/main/docs/changelog.json";async function Xo({request:e,changelogUrl:t}){new URL(e.url).searchParams;return fetch(t||Yo)}var Cr="cartFormInput";function Q({children:e,action:t,inputs:r,route:o,fetcherKey:a}){let i=react$1.useFetcher({key:a});return jsxRuntime.jsxs(i.Form,{action:o||"",method:"post",children:[(t||r)&&jsxRuntime.jsx("input",{type:"hidden",name:Cr,value:JSON.stringify({action:t,inputs:r})}),typeof e=="function"?e(i):e]})}Q.INPUT_NAME=Cr;Q.ACTIONS={AttributesUpdateInput:"AttributesUpdateInput",BuyerIdentityUpdate:"BuyerIdentityUpdate",Create:"Create",DiscountCodesUpdate:"DiscountCodesUpdate",LinesAdd:"LinesAdd",LinesRemove:"LinesRemove",LinesUpdate:"LinesUpdate",NoteUpdate:"NoteUpdate",SelectedDeliveryOptionsUpdate:"SelectedDeliveryOptionsUpdate",MetafieldsSet:"MetafieldsSet",MetafieldDelete:"MetafieldDelete"};function ea(e){let t={};for(let n of e.entries()){let s=n[0],u=e.getAll(s);t[s]=u.length>1?u:n[1];}let{cartFormInput:r,...o}=t,{action:a,inputs:i}=r?JSON.parse(String(r)):{};return {action:a,inputs:{...i,...o}}}Q.getFormInput=ea;var w=`#graphql
  fragment CartApiError on CartUserError {
    message
    field
    code
  }
`,R=`#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
  }
`;function ht(e){return async(t,r)=>{let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartId:a,...i}=r||{},{buyerIdentity:n,...s}=t,{cartCreate:u,errors:c}=await e.storefront.mutate(oa(e.cartFragment),{variables:{input:{...s,buyerIdentity:{...o,...n}},...i}});return A(u,c)}}var oa=(e=R)=>`#graphql
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
  ${w}
`;function gt({storefront:e,customerAccount:t,getCartId:r,cartFragment:o}){return async a=>{let i=r();if(!i)return null;let[n,{cart:s,errors:u}]=await Promise.all([t?t.isLoggedIn():!1,e.query(aa(o),{variables:{cartId:i,...a},cache:e.CacheNone()})]);if(n&&s?.checkoutUrl){let c=new URL(s.checkoutUrl);c.searchParams.set("logged_in","true"),s.checkoutUrl=c.toString();}return s||u?A(s,u):null}}var aa=(e=na)=>`#graphql
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
`,na=`#graphql
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
`;function Ct(e){return async(t,r)=>{let{cartLinesAdd:o,errors:a}=await e.storefront.mutate(ia(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return A(o,a)}}var ia=(e=R)=>`#graphql
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
  ${w}
`;var Sr="__h_pending_";function Pr(e){return Sr+e}function $e(e){return e.startsWith(Sr)}function He(e,t){if(t.some(r=>$e(typeof r=="string"?r:r.id)))throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`)}function St(e){return async(t,r)=>{He("updateLines",t);let{cartLinesUpdate:o,errors:a}=await e.storefront.mutate(sa(e.cartFragment),{variables:{cartId:e.getCartId(),lines:t,...r}});return A(o,a)}}var sa=(e=R)=>`#graphql
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
  ${w}
`;function Pt(e){return async(t,r)=>{He("removeLines",t);let{cartLinesRemove:o,errors:a}=await e.storefront.mutate(ca(e.cartFragment),{variables:{cartId:e.getCartId(),lineIds:t,...r}});return A(o,a)}}var ca=(e=R)=>`#graphql
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
  ${w}
`;function At(e){return async(t,r)=>{let o=t.filter((n,s,u)=>u.indexOf(n)===s),{cartDiscountCodesUpdate:a,errors:i}=await e.storefront.mutate(ua(e.cartFragment),{variables:{cartId:e.getCartId(),discountCodes:o,...r}});return A(a,i)}}var ua=(e=R)=>`#graphql
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
  ${w}
`;function Tt(e){return async(t,r)=>{t.companyLocationId&&e.customerAccount&&e.customerAccount.UNSTABLE_setBuyer({companyLocationId:t.companyLocationId});let o=e.customerAccount?await e.customerAccount.UNSTABLE_getBuyer():void 0,{cartBuyerIdentityUpdate:a,errors:i}=await e.storefront.mutate(pa(e.cartFragment),{variables:{cartId:e.getCartId(),buyerIdentity:{...o,...t},...r}});return A(a,i)}}var pa=(e=R)=>`#graphql
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
  ${w}
`;function vt(e){return async(t,r)=>{let{cartNoteUpdate:o,errors:a}=await e.storefront.mutate(la(e.cartFragment),{variables:{cartId:e.getCartId(),note:t,...r}});return A(o,a)}}var la=(e=R)=>`#graphql
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
  ${w}
`;function bt(e){return async(t,r)=>{let{cartSelectedDeliveryOptionsUpdate:o,errors:a}=await e.storefront.mutate(da(e.cartFragment),{variables:{cartId:e.getCartId(),selectedDeliveryOptions:t,...r}});return A(o,a)}}var da=(e=R)=>`#graphql
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
  ${w}
`;function It(e){return async(t,r)=>{let{cartAttributesUpdate:o,errors:a}=await e.storefront.mutate(ya(e.cartFragment),{variables:{cartId:r?.cartId||e.getCartId(),attributes:t}});return A(o,a)}}var ya=(e=R)=>`#graphql
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
  ${w}
`;function wt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),a=t.map(s=>({...s,ownerId:o})),{cartMetafieldsSet:i,errors:n}=await e.storefront.mutate(fa(),{variables:{metafields:a}});return A({cart:{id:o},...i},n)}}var fa=()=>`#graphql
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
`;function Rt(e){return async(t,r)=>{let o=r?.cartId||e.getCartId(),{cartMetafieldDelete:a,errors:i}=await e.storefront.mutate(ma(),{variables:{input:{ownerId:o,key:t}}});return A({cart:{id:o},...a},i)}}var ma=()=>`#graphql
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
`;var ga=e=>{let t=cookie.parse(e.get("Cookie")||"");return ()=>t.cart?`gid://shopify/Cart/${t.cart}`:void 0};var Sa=e=>t=>{let r=new Headers;return r.append("Set-Cookie",cookie.stringify("cart",t.split("/").pop()||"",{path:"/",...e})),r};function Pa(e){let{getCartId:t,setCartId:r,storefront:o,customerAccount:a,cartQueryFragment:i,cartMutateFragment:n}=e,s=t(),u=()=>s||t(),c={storefront:o,getCartId:u,cartFragment:n,customerAccount:a},l=ht(c),d=async function(...p){let y=await l(...p);return s=y?.cart?.id,y},m={get:gt({storefront:o,customerAccount:a,getCartId:u,cartFragment:i}),getCartId:u,setCartId:r,create:d,addLines:async(p,y)=>{let f=p.map(g=>({attributes:g.attributes,quantity:g.quantity,merchandiseId:g.merchandiseId,sellingPlanId:g.sellingPlanId}));return s||y?.cartId?await Ct(c)(f,y):await d({lines:f},y)},updateLines:St(c),removeLines:Pt(c),updateDiscountCodes:async(p,y)=>s||y?.cartId?await At(c)(p,y):await d({discountCodes:p},y),updateBuyerIdentity:async(p,y)=>s||y?.cartId?await Tt(c)(p,y):await d({buyerIdentity:p},y),updateNote:async(p,y)=>s||y?.cartId?await vt(c)(p,y):await d({note:p},y),updateSelectedDeliveryOption:bt(c),updateAttributes:async(p,y)=>s||y?.cartId?await It(c)(p,y):await d({attributes:p},y),setMetafields:async(p,y)=>s||y?.cartId?await wt(c)(p,y):await d({metafields:p},y),deleteMetafield:Rt(c)};return "customMethods"in e?{...m,...e.customMethods??{}}:m}function Ta(e){let t=react$1.useFetchers();if(!t||!t.length)return e;let r=e?.lines?structuredClone(e):{lines:{nodes:[]}},o=r.lines.nodes,a=!1;for(let{formData:i}of t){if(!i)continue;let n=Q.getFormInput(i);if(n.action===Q.ACTIONS.LinesAdd)for(let s of n.inputs.lines){if(!s.selectedVariant){console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");continue}let u=o.find(c=>c.merchandise.id===s.selectedVariant?.id);a=!0,u?(u.quantity=(u.quantity||1)+(s.quantity||1),u.isOptimistic=!0):o.unshift({id:Pr(s.selectedVariant.id),merchandise:s.selectedVariant,isOptimistic:!0,quantity:s.quantity||1});}else if(n.action===Q.ACTIONS.LinesRemove)for(let s of n.inputs.lineIds){let u=o.findIndex(c=>c.id===s);if(u!==-1){if($e(o[u].id)){console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");continue}o.splice(u,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${s}' but it doesn't exist in the cart`);}else if(n.action===Q.ACTIONS.LinesUpdate)for(let s of n.inputs.lines){let u=o.findIndex(c=>s.id===c.id);if(u>-1){if($e(o[u].id)){console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");continue}o[u].quantity=s.quantity,o[u].quantity===0&&o.splice(u,1),a=!0;}else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${s.id}' but it doesn't exist in the cart`);}}return a&&(r.isOptimistic=a),r}function Ea({handle:e,options:t=[],variants:r=[],productPath:o="products",waitForNavigation:a=!1,children:i}){let n=r instanceof Array?r:hydrogenReact.flattenConnection(r),{searchParams:s,path:u,alreadyOnProductPage:c}=xa(e,o,a),l=t.filter(d=>d?.values?.length===1);return react.createElement(react.Fragment,null,...react.useMemo(()=>t.map(d=>{let m,p=[];for(let y of d.values){let f=new URLSearchParams(c?s:void 0);f.set(d.name,y),l.forEach(b=>{f.set(b.name,b.values[0]);});let g=n.find(b=>b?.selectedOptions?.every(V=>f.get(V?.name)===V?.value)),P=s.get(d.name),h=P?P===y:!1;h&&(m=y);let I="?"+f.toString();p.push({value:y,isAvailable:g?g.availableForSale:!0,to:u+I,search:I,isActive:h,variant:g});}return i({option:{name:d.name,value:m,values:p}})}),[t,n,i]))}var Oa=e=>{if(typeof e?.url>"u")throw new TypeError(`Expected a Request instance, got ${typeof e}`);let t=new URL(e.url).searchParams,r=[];return t.forEach((o,a)=>{r.push({name:a,value:o});}),r};function xa(e,t,r){let{pathname:o,search:a}=react$1.useLocation(),i=react$1.useNavigation();return react.useMemo(()=>{let n=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o),s=n&&n.length>0;t=t.startsWith("/")?t.substring(1):t;let u=s?`${n[0]}${t}/${e}`:`/${t}/${e}`;return {searchParams:new URLSearchParams(r||i.state!=="loading"?a:i.location.search),alreadyOnProductPage:u===o,path:u}},[o,a,r,e,t,i])}function _a(e,t){let r=react$1.useNavigation(),[o,a]=react.useState([]);if(react.useEffect(()=>{Promise.resolve(t).then(i=>{i&&a(i instanceof Array?i:i.product?.variants?.nodes||[]);}).catch(i=>{reportError(new Error("[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.",{cause:i}));});},[t]),r.state==="loading"){let i=new URLSearchParams(r.location.search),n=!1,s=o.find(u=>u.selectedOptions?u.selectedOptions.every(c=>i.get(c.name)===c.value):(n||(n=!0,reportError(new Error("[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field."))),!1))||e.selectedVariant;if(s)return {...e,isOptimistic:!0,selectedVariant:s}}return e}var Tr=react.createContext(void 0),qa=Tr.Provider,Et=()=>react.useContext(Tr);function Fa(e){let t=Fe(),r=$a(t,e);return {nonce:t,header:r,NonceProvider:({children:a})=>react.createElement(qa,{value:t},a)}}function $a(e,t){let{shop:r,...o}=t??{},a=`'nonce-${e}'`,i=["'self'","'unsafe-inline'","https://cdn.shopify.com"],n=["'self'","https://monorail-edge.shopifysvc.com"];r&&r.checkoutDomain&&n.push(`https://${r.checkoutDomain}`),r&&r.storeDomain&&n.push(`https://${r.storeDomain}`);let u={baseUri:["'self'"],defaultSrc:["'self'",a,"https://cdn.shopify.com","https://shopify.com"],frameAncestors:["'none'"],styleSrc:i,connectSrc:n},c=Object.assign({},u,o);for(let l in u){let d=o[l];l&&d&&(c[l]=Ha(d,u[l]));}return c.scriptSrc instanceof Array&&!c.scriptSrc.includes(a)?c.scriptSrc.push(a):c.defaultSrc instanceof Array&&!c.defaultSrc.includes(a)&&c.defaultSrc.push(a),Ma__default.default({directives:c})}function Ha(e,t){let r=typeof t=="string"?[t]:t,o=Array.isArray(e)?e:[String(e)];return Array.isArray(r)?r.every(i=>i==="'none'")?o:[...o,...r]:r}var Ba=react.forwardRef((e,t)=>{let r=Et();return jsxRuntime.jsx("script",{suppressHydrationWarning:!0,...e,nonce:r,ref:t})});function ja(e){let t=react$1.useFetchers(),r={};for(let{formData:o}of t)if(o?.get("optimistic-identifier")===e)try{if(o.has("optimistic-data")){let a=JSON.parse(String(o.get("optimistic-data")));Object.assign(r,a);}}catch{}return r}function Ka({id:e,data:t}){return jsxRuntime.jsxs(jsxRuntime.Fragment,{children:[jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-identifier",value:e}),jsxRuntime.jsx("input",{type:"hidden",name:"optimistic-data",value:JSON.stringify(t)})]})}function Xa(e){return jsxRuntime.jsx(hydrogenReact.ShopPayButton,{channel:"hydrogen",...e})}function le(e){let{type:t,data:r={},customData:o}=e,a=react$1.useLocation(),{publish:i,cart:n,prevCart:s,shop:u,customData:c}=ee(),l=a.pathname+a.search,d={...r,customData:{...c,...o},cart:n,prevCart:s,shop:u};return react.useEffect(()=>{u?.shopId&&(d={...d,url:window.location.href},i(t,d));},[i,l,u?.shopId]),null}function br(e){return jsxRuntime.jsx(le,{...e,type:"page_viewed"})}function Ir(e){return jsxRuntime.jsx(le,{...e,type:"product_viewed"})}function wr(e){return jsxRuntime.jsx(le,{...e,type:"collection_viewed"})}function Rr(e){return jsxRuntime.jsx(le,{...e,type:"cart_viewed"})}function Er(e){return jsxRuntime.jsx(le,{...e,type:"search_viewed"})}function Or(e){return jsxRuntime.jsx(le,{...e})}var te={PAGE_VIEWED:"page_viewed",PRODUCT_VIEWED:"product_viewed",COLLECTION_VIEWED:"collection_viewed",CART_VIEWED:"cart_viewed",SEARCH_VIEWED:"search_viewed",CART_UPDATED:"cart_updated",PRODUCT_ADD_TO_CART:"product_added_to_cart",PRODUCT_REMOVED_FROM_CART:"product_removed_from_cart",CUSTOM_EVENT:"custom_"};var an="https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js",nn="https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";function Dr(e){console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);}function Ot(e){let{withPrivacyBanner:t=!0,onVisitorConsentCollected:r,onReady:o,...a}=e,i=react.useRef(!1),n=hydrogenReact.useLoadScript(t?nn:an,{attributes:{id:"customer-privacy-api"}});react.useEffect(()=>{let s=u=>{r&&r(u.detail);};return document.addEventListener("visitorConsentCollected",s),()=>{document.removeEventListener("visitorConsentCollected",s);}},[r]),react.useEffect(()=>{if(n!=="done"||i.current)return;i.current=!0;let{checkoutDomain:s,storefrontAccessToken:u}=a;s||Dr("checkoutDomain"),u||Dr("storefrontAccessToken"),(u.startsWith("shpat_")||u.length!==32)&&console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");let c={checkoutRootDomain:s,storefrontAccessToken:u};if(s){let m=window.document.location.host,p=s.split(".").reverse(),y=m.split(".").reverse(),f=[];p.forEach((g,P)=>{g===y[P]&&f.push(g);}),m=f.reverse().join("."),m&&(c.storefrontRootDomain=m);}if(t&&window?.privacyBanner&&window.privacyBanner?.loadBanner(c),!window.Shopify?.customerPrivacy)return;let l=window.Shopify.customerPrivacy.setTrackingConsent;function d(m,p){l({...m,headlessStorefront:!0,...c},p);}window.Shopify.customerPrivacy.setTrackingConsent=d,o&&o();},[n,t,a]);}function xt(){try{return window.Shopify&&window.Shopify.customerPrivacy?window.Shopify?.customerPrivacy:null}catch{return null}}function pn(){let e=xt();if(!e)throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");return e}function Lr({consent:e,onReady:t,domain:r}){let{subscribe:o,register:a,canTrack:i}=ee(),[n,s]=react.useState(!1),[u,c]=react.useState(!1),{ready:l}=a("Internal_Shopify_Analytics"),{ready:d}=a("Internal_Shopify_CustomerPrivacy"),m=()=>{n&&u&&t();},p=()=>{c(!0),d(),m();},{checkoutDomain:y,storefrontAccessToken:f,withPrivacyBanner:g}=e;return Ot({checkoutDomain:y||"mock.shop",storefrontAccessToken:f||"abcdefghijklmnopqrstuvwxyz123456",withPrivacyBanner:g,onVisitorConsentCollected:p,onReady:()=>{setTimeout(p,3e3);}}),hydrogenReact.useShopifyCookies({hasUserConsent:n&&u?i():!0,domain:r,checkoutDomain:y}),react.useEffect(()=>{o(te.PAGE_VIEWED,dn),o(te.PRODUCT_VIEWED,yn),o(te.COLLECTION_VIEWED,fn),o(te.SEARCH_VIEWED,mn),o(te.PRODUCT_ADD_TO_CART,hn),l(),s(!0),m();},[o,l]),null}function Qe(e){console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);}function Re(e){let t=pn(),r=t.analyticsProcessingAllowed();if(!e?.shop?.shopId){Qe("shopId");return}if(!e?.shop?.acceptedLanguage){Qe("acceptedLanguage");return}if(!e?.shop?.currency){Qe("currency");return}if(!e?.shop?.hydrogenSubchannelId){Qe("hydrogenSubchannelId");return}return {shopifySalesChannel:"hydrogen",...e.shop,hasUserConsent:r,...hydrogenReact.getClientBrowserParameters(),ccpaEnforced:!t.saleOfDataAllowed(),gdprEnforced:!(t.marketingAllowed()&&t.analyticsProcessingAllowed())}}function ln(e,t){if(t===null)return;let r=Re(e);return r?{...r,cartId:t.id}:void 0}var K={};function dn(e){let t=Re(e);t&&(hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PAGE_VIEW_2,payload:{...t,...K}}),K={});}function yn(e){let t=Re(e);if(t&&_r({type:"product",products:e.products})){let r=Dt(e.products);K={pageType:hydrogenReact.AnalyticsPageType.product,resourceId:r[0].productGid},t={...t,...K,products:Dt(e.products)},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.PRODUCT_VIEW,payload:t});}}function fn(e){let t=Re(e);t&&(K={pageType:hydrogenReact.AnalyticsPageType.collection,resourceId:e.collection.id},t={...t,...K,collectionHandle:e.collection.handle},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.COLLECTION_VIEW,payload:t}));}function mn(e){let t=Re(e);t&&(K={pageType:hydrogenReact.AnalyticsPageType.search},t={...t,...K,searchString:e.searchTerm},hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.SEARCH_VIEW,payload:t}));}function hn(e){let{cart:t,currentLine:r}=e,o=ln(e,t);!o||!r?.id||gn({matchedLine:r,eventPayload:o});}function gn({matchedLine:e,eventPayload:t}){let r={id:e.merchandise.product.id,variantId:e.id,title:e.merchandise.product.title,variantTitle:e.merchandise.title,vendor:e.merchandise.product.vendor,price:e.merchandise.price.amount,quantity:e.quantity,productType:e.merchandise.product.productType,sku:e.merchandise.sku};_r({type:"cart",products:[r]})&&hydrogenReact.sendShopifyAnalytics({eventName:hydrogenReact.AnalyticsEventName.ADD_TO_CART,payload:{...t,products:Dt([r])}});}function re(e,t,r,o){if(e==="cart"){let a=`${r?"merchandise":"merchandise.product"}.${t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${a}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${a}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);}else {let a=`${o||t}`;console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${a}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${a}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);}}function _r({type:e,products:t}){return !t||t.length===0?(re(e,"",!1,"data.products"),!1):(t.forEach(r=>{if(!r.id)return re(e,"id",!1),!1;if(!r.title)return re(e,"title",!1),!1;if(!r.price)return re(e,"price.amount",!0,"price"),!1;if(!r.vendor)return re(e,"vendor",!1),!1;if(!r.variantId)return re(e,"id",!0,"variantId"),!1;if(!r.variantTitle)return re(e,"title",!0,"variantTitle"),!1}),!0)}function Dt(e){return e.map(t=>{let r={productGid:t.id,variantGid:t.variantId,name:t.title,variantName:t.variantTitle,brand:t.vendor,price:t.price,quantity:t.quantity||1,category:t.productType};return t.sku&&(r.sku=t.sku),t.productType&&(r.category=t.productType),r})}function Vr(e){console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);}function Mr({cart:e,setCarts:t}){let{publish:r,shop:o,customData:a,canTrack:i,cart:n,prevCart:s}=ee(),u=react.useRef(null);return react.useEffect(()=>{if(e)return Promise.resolve(e).then(c=>{if(c&&c.lines){if(!c.id){Vr("id");return}if(!c.updatedAt){Vr("updatedAt");return}}t(({cart:l,prevCart:d})=>c?.updatedAt!==l?.updatedAt?{cart:c,prevCart:l}:{cart:l,prevCart:d});}),()=>{}},[t,e]),react.useEffect(()=>{if(!n||!n?.updatedAt||n?.updatedAt===s?.updatedAt)return;let c;try{c=JSON.parse(localStorage.getItem("cartLastUpdatedAt")||"");}catch{c=null;}if(n.id===c?.id&&n.updatedAt===c?.updatedAt)return;let l={eventTimestamp:Date.now(),cart:n,prevCart:s,shop:o,customData:a};if(n.updatedAt===u.current)return;u.current=n.updatedAt,r("cart_updated",l),localStorage.setItem("cartLastUpdatedAt",JSON.stringify({id:n.id,updatedAt:n.updatedAt}));let d=s?.lines?hydrogenReact.flattenConnection(s?.lines):[],m=n.lines?hydrogenReact.flattenConnection(n.lines):[];d?.forEach(p=>{let y=m.filter(f=>p.id===f.id);if(y?.length===1){let f=y[0];p.quantity<f.quantity?r("product_added_to_cart",{...l,prevLine:p,currentLine:f}):p.quantity>f.quantity&&r("product_removed_from_cart",{...l,prevLine:p,currentLine:f});}else r("product_removed_from_cart",{...l,prevLine:p});}),m?.forEach(p=>{let y=d.filter(f=>p.id===f.id);(!y||y.length===0)&&r("product_added_to_cart",{...l,currentLine:p});});},[n,s,r,o,a,i]),null}var bn={canTrack:()=>!1,cart:null,customData:{},prevCart:null,publish:()=>{},shop:null,subscribe:()=>{},register:()=>({ready:()=>{}})},Br=react.createContext(bn),Ge=new Map,Ee={};function Gr(){return Object.values(Ee).every(Boolean)}function qr(e,t){Ge.has(e)||Ge.set(e,new Map),Ge.get(e)?.set(t.toString(),t);}var We=new Map;function Fr(e,t){if(!Gr()){We.set(e,t);return}Wr(e,t);}function Wr(e,t){(Ge.get(e)??new Map).forEach((r,o)=>{try{r(t);}catch(a){typeof a=="object"&&a instanceof Error?console.error("Analytics publish error",a.message,o,a.stack):console.error("Analytics publish error",a,o);}});}function $r(e){return Ee.hasOwnProperty(e)||(Ee[e]=!1),{ready:()=>{Ee[e]=!0,Gr()&&We.size>0&&(We.forEach((t,r)=>{Wr(r,t);}),We.clear());}}}function Hr(){try{return window.Shopify.customerPrivacy.analyticsProcessingAllowed()}catch{}return !1}function Qr(e,t){return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`}function In({canTrack:e,cart:t,children:r,consent:o,customData:a={},shop:i=null,disableThrowOnError:n=!1,cookieDomain:s}){let u=react.useRef(!1),{shop:c}=wn(i),[l,d]=react.useState(!!e),[m,p]=react.useState({cart:null,prevCart:null}),[y,f]=react.useState(e?()=>e:()=>Hr);if(c)if(/\/68817551382$/.test(c.shopId))jt("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");else {if(!o.checkoutDomain){let P=Qr("consent.checkoutDomain","PUBLIC_CHECKOUT_DOMAIN");nt(P);}if(!o.storefrontAccessToken){let P=Qr("consent.storefrontAccessToken","PUBLIC_STOREFRONT_API_TOKEN");nt(P);}}let g=react.useMemo(()=>({canTrack:y,...m,customData:a,publish:y()?Fr:()=>{},shop:c,subscribe:qr,register:$r}),[l,y(),y,JSON.stringify(y),m,m.cart?.updatedAt,m.prevCart,Fr,qr,a,c,$r,JSON.stringify(Ee)]);return jsxRuntime.jsxs(Br.Provider,{value:g,children:[r,!!c&&jsxRuntime.jsx(br,{}),!!c&&!!t&&jsxRuntime.jsx(Mr,{cart:t,setCarts:p}),!!c&&o.checkoutDomain&&jsxRuntime.jsx(Lr,{consent:o,onReady:()=>{u.current=!0,d(!0),f(()=>Hr);},domain:s})]})}function ee(){let e=react.useContext(Br);if(!e)throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");return e}function wn(e){let[t,r]=react.useState(null);return react.useEffect(()=>(Promise.resolve(e).then(r),()=>{}),[r,e]),{shop:t}}async function Rn({storefront:e,publicStorefrontId:t="0"}){return e.query(En,{cache:e.CacheLong()}).then(({shop:r,localization:o})=>({shopId:r.id,acceptedLanguage:o.language.isoCode,currency:o.country.currency.isoCode,hydrogenSubchannelId:t}))}var En=`#graphql
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
`,On={CartView:Rr,CollectionView:wr,CustomView:Or,ProductView:Ir,Provider:In,SearchView:Er};var Ln=function(e){return jsxRuntime.jsx(hydrogenReact.RichText,{...e,components:{link:({node:t})=>jsxRuntime.jsx(react$1.Link,{to:t.url,title:t.title,target:t.target,prefetch:"intent",children:t.children}),...e.components}})};function _n(e,t,r,o){globalThis.__SPANS=globalThis.__SPANS||[];try{let a=Nn(e?.requestId||Kr(16)),i=Date.now(),n="unknown";e?.displayName?n=e.displayName:e.graphql&&(n=e.graphql?.match(/(query|mutation)\s+(\w+)/)?.[0]?.replace(/\s+/," ")||"GraphQL"),r&&(n=`Cache [${r}] ${n}`);let s={traceId:a,id:o?a:Kr(16),name:n,timestamp:t*1e3,duration:(i-t)*1e3,parentId:o?void 0:a,tags:{"request.type":r?"cache":"subrequest"}};globalThis.__SPANS.push(s);}catch(a){console.error(a);}}async function Un(){if(globalThis.__SPANS){let e=globalThis.__SPANS;globalThis.__SPANS=[],await fetch("https://outbound-proxy.oxygen.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});}}function Nn(e){let t=e.split(".");return t.length===2?t[1]:e}function Kr(e){let t="";for(;t.length<e;)t+=Math.floor(Math.random()*16).toString(16);return t.substring(0,e)}//! @see: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
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
exports.Analytics = On;
exports.AnalyticsEvent = te;
exports.CacheCustom = Ye;
exports.CacheLong = ze;
exports.CacheNone = Ke;
exports.CacheShort = J;
exports.CartForm = Q;
exports.InMemoryCache = it;
exports.OptimisticInput = Ka;
exports.Pagination = qo;
exports.RichText = Ln;
exports.Script = Ba;
exports.Seo = Lo;
exports.ShopPayButton = Xa;
exports.VariantSelector = Ea;
exports.cartAttributesUpdateDefault = It;
exports.cartBuyerIdentityUpdateDefault = Tt;
exports.cartCreateDefault = ht;
exports.cartDiscountCodesUpdateDefault = At;
exports.cartGetDefault = gt;
exports.cartGetIdDefault = ga;
exports.cartLinesAddDefault = Ct;
exports.cartLinesRemoveDefault = Pt;
exports.cartLinesUpdateDefault = St;
exports.cartMetafieldDeleteDefault = Rt;
exports.cartMetafieldsSetDefault = wt;
exports.cartNoteUpdateDefault = vt;
exports.cartSelectedDeliveryOptionsUpdateDefault = bt;
exports.cartSetIdDefault = Sa;
exports.changelogHandler = Xo;
exports.createCartHandler = Pa;
exports.createContentSecurityPolicy = Fa;
exports.createCustomerAccountClient = zo;
exports.createStorefrontClient = Ci;
exports.createWithCache = go;
exports.emitSpanEvent = _n;
exports.flushSpanEvents = Un;
exports.formatAPIResult = A;
exports.generateCacheControlHeader = he;
exports.getCustomerPrivacy = xt;
exports.getPaginationVariables = $o;
exports.getSelectedProductOptions = Oa;
exports.getSeoMeta = _o;
exports.getShopAnalytics = Rn;
exports.graphiqlLoader = Ao;
exports.storefrontRedirect = So;
exports.useAnalytics = ee;
exports.useCustomerPrivacy = Ot;
exports.useNonce = Et;
exports.useOptimisticCart = Ta;
exports.useOptimisticData = ja;
exports.useOptimisticProduct = _a;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map