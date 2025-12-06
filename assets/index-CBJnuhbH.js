(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const I=globalThis,R=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),D=new WeakMap;let et=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(R&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=D.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&D.set(e,t))}return t}toString(){return this.cssText}};const at=n=>new et(typeof n=="string"?n:n+"",void 0,F),L=(n,...t)=>{const e=n.length===1?n[0]:t.reduce(((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1]),n[0]);return new et(e,n,F)},lt=(n,t)=>{if(R)n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const i=document.createElement("style"),s=I.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},W=R?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return at(e)})(n):n;const{is:ct,defineProperty:ht,getOwnPropertyDescriptor:pt,getOwnPropertyNames:dt,getOwnPropertySymbols:ut,getPrototypeOf:mt}=Object,N=globalThis,K=N.trustedTypes,$t=K?K.emptyScript:"",ft=N.reactiveElementPolyfillSupport,E=(n,t)=>n,z={toAttribute(n,t){switch(t){case Boolean:n=n?$t:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},it=(n,t)=>!ct(n,t),q={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=q){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ht(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=pt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){const c=s?.call(this);r?.call(this,o),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??q}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,i=[...dt(e),...ut(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(W(s))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:z).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:z;this._$Em=s;const c=o.fromAttribute(e,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??it)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:o}=r,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[E("elementProperties")]=new Map,A[E("finalized")]=new Map,ft?.({ReactiveElement:A}),(N.reactiveElementVersions??=[]).push("2.1.1");const j=globalThis,O=j.trustedTypes,J=O?O.createPolicy("lit-html",{createHTML:n=>n}):void 0,st="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+f,gt=`<${rt}>`,b=document,C=()=>b.createComment(""),w=n=>n===null||typeof n!="object"&&typeof n!="function",V=Array.isArray,yt=n=>V(n)||typeof n?.[Symbol.iterator]=="function",k=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,Z=/>/g,g=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,Q=/"/g,nt=/^(?:script|style|textarea|title)$/i,_t=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),u=_t(1),v=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Y=new WeakMap,y=b.createTreeWalker(b,129);function ot(n,t){if(!V(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return J!==void 0?J.createHTML(t):t}const bt=(n,t)=>{const e=n.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=S;for(let c=0;c<e;c++){const a=n[c];let h,p,l=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===S?p[1]==="!--"?o=X:p[1]!==void 0?o=Z:p[2]!==void 0?(nt.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=g):p[3]!==void 0&&(o=g):o===g?p[0]===">"?(o=s??S,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?g:p[3]==='"'?Q:G):o===Q||o===G?o=g:o===X||o===Z?o=S:(o=g,s=void 0);const $=o===g&&n[c+1].startsWith("/>")?" ":"";r+=o===S?a+gt:l>=0?(i.push(h),a.slice(0,l)+st+a.slice(l)+f+$):a+f+(l===-2?c:$)}return[ot(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class P{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const c=t.length-1,a=this.parts,[h,p]=bt(t,e);if(this.el=P.createElement(h,i),y.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=y.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(st)){const m=p[o++],$=s.getAttribute(l).split(f),U=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:U[2],strings:$,ctor:U[1]==="."?vt:U[1]==="?"?xt:U[1]==="@"?St:M}),s.removeAttribute(l)}else l.startsWith(f)&&(a.push({type:6,index:r}),s.removeAttribute(l));if(nt.test(s.tagName)){const l=s.textContent.split(f),m=l.length-1;if(m>0){s.textContent=O?O.emptyScript:"";for(let $=0;$<m;$++)s.append(l[$],C()),y.nextNode(),a.push({type:2,index:++r});s.append(l[m],C())}}}else if(s.nodeType===8)if(s.data===rt)a.push({type:2,index:r});else{let l=-1;for(;(l=s.data.indexOf(f,l+1))!==-1;)a.push({type:7,index:r}),l+=f.length-1}r++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}}function x(n,t,e=n,i){if(t===v)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl;const r=w(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=x(n,s._$AS(n,t.values),s,i)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??b).importNode(e,!0);y.currentNode=s;let r=y.nextNode(),o=0,c=0,a=i[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new T(r,r.nextSibling,this,t):a.type===1?h=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(h=new Et(r,this,t)),this._$AV.push(h),a=i[++c]}o!==a?.index&&(r=y.nextNode(),o++)}return y.currentNode=b,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class T{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),w(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&w(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=P.createElement(ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const r=new At(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Y.get(t.strings);return e===void 0&&Y.set(t.strings,e=new P(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new T(this.O(C()),this.O(C()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=x(this,t,e,0),o=!w(t)||t!==this._$AH&&t!==v,o&&(this._$AH=t);else{const c=t;let a,h;for(t=r[0],a=0;a<r.length-1;a++)h=x(this,c[i+a],e,a),h===v&&(h=this._$AH[a]),o||=!w(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+r[a+1]),this._$AH[a]=h}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class xt extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class St extends M{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=x(this,t,e,0)??d)===v)return;const i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}}const Ct=j.litHtmlPolyfillSupport;Ct?.(P,T),(j.litHtmlVersions??=[]).push("3.3.1");const wt=(n,t,e)=>{const i=e?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const r=e?.renderBefore??null;i._$litPart$=s=new T(t.insertBefore(C(),r),r,void 0,e??{})}return s._$AI(n),s};const B=globalThis;class _ extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}}_._$litElement$=!0,_.finalized=!0,B.litElementHydrateSupport?.({LitElement:_});const Pt=B.litElementPolyfillSupport;Pt?.({LitElement:_});(B.litElementVersions??=[]).push("4.2.1");class Tt extends _{subscribe(t,e,i){console.log(`📡 [Mock] Suscrito a ${t}:${e}`)}publish(t,e,i){console.log(`📣 [Mock] Publicando en ${t}:${e}`,i)}}const Ut=L`
  :host {
    display: block;
    font-family: 'Segoe UI', sans-serif;
    color: #333;
    padding: 20px;
    background-color: #f8f9fa;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  h1 { margin-top: 0; color: #004481; } /* Azul Corporativo */

  /* --- INPUTS --- */
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    background: #f0f4f8;
    padding: 20px;
    border-radius: 8px;
  }

  .control-group { display: flex; flex-direction: column; gap: 8px; }
  .control-group label { font-weight: 600; font-size: 0.9rem; }
  .control-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  /* --- KPIS (Resumen) --- */
  .summary-cards {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .kpi-card {
    flex: 1;
    background: #004481;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  .kpi-card h3 { margin: 0; font-size: 0.8rem; opacity: 0.8; }
  .kpi-card p { margin: 5px 0 0 0; font-size: 1.5rem; font-weight: bold; }

  /* --- TABLA --- */
  .table-container { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th { background: #004481; color: white; padding: 12px; text-align: right; }
  td { padding: 10px; border-bottom: 1px solid #eee; text-align: right; }
  tr:hover { background-color: #f1f1f1; }
`;class H{static calculateAmortizationTable(t,e,i){if(!t||t<=0||!i||i<=0)return[];const s=e/12/100,r=t*s/(1-Math.pow(1+s,-i));let o=t;const c=[];for(let a=1;a<=i;a++){const h=o*s,p=r-h;o-=p,a===i&&Math.abs(o)<1&&(o=0),c.push({period:a,paymentFormatted:this._formatCurrency(r),interestFormatted:this._formatCurrency(h),capitalFormatted:this._formatCurrency(p),balanceFormatted:this._formatCurrency(Math.max(0,o)),payment:r,interest:h,capital:p,balance:Math.max(0,o)})}return c}static _formatCurrency(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}}class It{static async getSchemaForUser(t){return await new Promise(e=>setTimeout(e,800)),console.log(`🧠 AI Analizando perfil: ${t}...`),t==="EXPERT_CFO"?this._getExpertSchema():this._getNoviceSchema()}static _getExpertSchema(){return{pageTitle:"Panel de Análisis Financiero (Modo Experto)",layout:"dense",sections:[{id:"kpis_top",widgets:[{type:"kpi-card",props:{title:"Costo Financiero Total",value:"$0.00",variant:"primary"}},{type:"kpi-card",props:{title:"Tasa Efectiva Anual",value:"0%",variant:"secondary"}}]},{id:"inputs_compact",widgets:[{type:"credit-input",props:{label:"Principal",fieldId:"amount",min:1e5,max:5e6,defaultValue:2e6}},{type:"credit-input",props:{label:"Plazo (Meses)",fieldId:"months",min:12,max:84,defaultValue:48}}]}]}}static _getNoviceSchema(){return{pageTitle:"Simula tu Crédito Fácil",layout:"spacious",sections:[{id:"intro_inputs",widgets:[{type:"risk-alert",props:{message:"👋 ¡Hola! Empieza seleccionando cuánto necesitas."}},{type:"credit-input",props:{label:"¿Cuánto dinero necesitas?",fieldId:"amount",min:5e3,max:1e5,defaultValue:2e4}},{type:"credit-input",props:{label:"¿En cuánto tiempo puedes pagar?",fieldId:"months",min:6,max:36,defaultValue:12}}]}]}}}const Ot=n=>class extends n{_calculateSimulation(){const t=H.calculateAmortizationTable(this.amount,this.rate,this.months),e=t.reduce((s,r)=>s+r.interest,0),i=t.reduce((s,r)=>s+(r.capital+r.interest),0);this.amortizationTable=t,this.summary={totalInterest:H._formatCurrency(e),totalPayment:H._formatCurrency(i),monthlyPayment:t.length>0?t[0].paymentFormatted:"$0.00"}}async firstUpdated(t){super.firstUpdated(t),await this._loadInterfaceConfig(),this._calculateSimulation()}async _loadInterfaceConfig(t="NOVICE"){this.uiSchema=null,this.requestUpdate();try{const e=await It.getSchemaForUser(t);this.uiSchema=e,e.sections&&e.sections.forEach(i=>{i.widgets.forEach(s=>{s.props.defaultValue&&(this[s.props.fieldId]=s.props.defaultValue)})}),this._calculateSimulation()}catch(e){console.error("Error IA:",e)}}switchUserProfile(t){this._loadInterfaceConfig(t)}_onInputChange(t){const{field:e,value:i}=t.detail;e&&!isNaN(i)&&(this[e]=i,this._calculateSimulation())}};class Nt extends _{static get properties(){return{label:{type:String},value:{type:Number},min:{type:Number},max:{type:Number},fieldId:{type:String}}}static get styles(){return L`
      :host { display: block; margin-bottom: 16px; }
      label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; }
      .input-wrapper { display: flex; align-items: center; gap: 10px; }
      input[type="number"] {
        width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;
      }
      input[type="range"] { flex: 1; }
    `}render(){return u`
      <label>${this.label}</label>
      <div class="input-wrapper">
        <input 
          type="range" 
          .min="${this.min}" 
          .max="${this.max}" 
          .value="${this.value}" 
          @input="${this._handleInput}"
        >
        <input 
          type="number" 
          .min="${this.min}" 
          .max="${this.max}" 
          .value="${this.value}" 
          @input="${this._handleInput}"
        >
      </div>
    `}_handleInput(t){const e=parseFloat(t.target.value);this.value=e,this.dispatchEvent(new CustomEvent("credit-input-change",{detail:{field:this.fieldId,value:e},bubbles:!0,composed:!0}))}}customElements.define("credit-input",Nt);class Mt extends _{static get properties(){return{title:{type:String},value:{type:String},variant:{type:String}}}static get styles(){return L`
      :host { 
        display: block; 
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
      }
      :host([variant="primary"]) { background: #004481; color: white; }
      
      h3 { margin: 0 0 10px 0; font-size: 0.9rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
      .value { font-size: 1.8rem; font-weight: 700; margin: 0; }
    `}render(){return u`
      <h3>${this.title}</h3>
      <p class="value">${this.value}</p>
    `}}customElements.define("kpi-card",Mt);const kt=n=>class extends n{render(){return this.uiSchema?u`
      <div class="container">
        <div style="margin-bottom: 20px; padding: 10px; background: #e0e0e0; border-radius: 8px;">
          <small>👮‍♂️ Simular Contexto de Usuario (AI Trigger):</small><br>
          <button @click="${()=>this.switchUserProfile("NOVICE")}">Soy PyME Nueva</button>
          <button @click="${()=>this.switchUserProfile("EXPERT_CFO")}">Soy CFO Experto</button>
        </div>

        <h1>🏦 ${this.uiSchema.pageTitle}</h1> 
        ${this.uiSchema.sections.map(t=>u`
            <div class="controls">
              ${t.widgets.map(e=>this._renderDynamicWidget(e))}
            </div>
        `)}

        <div class="summary-cards">
           ${this._tplKpi("Cuota Mensual",this.summary.monthlyPayment,"primary")}
           ${this._tplKpi("Total Intereses",this.summary.totalInterest)}
           ${this._tplKpi("Total a Pagar",this.summary.totalPayment)}
        </div>
        
        ${this._renderTable()}
      </div>
    `:u`
        <div class="container" style="text-align: center; padding: 50px;">
          <h2>⏳ Consultando al Oráculo Financiero...</h2>
          <p>La IA está analizando tu perfil...</p>
        </div>
      `}_renderDynamicWidget(t){switch(t.type){case"credit-input":return u`
          <credit-input 
            .label="${t.props.label}" 
            .fieldId="${t.props.fieldId}" 
            .value="${this[t.props.fieldId]}" 
            .min="${t.props.min}" 
            .max="${t.props.max}"
            @credit-input-change="${this._onInputChange}"
          ></credit-input>
        `;case"risk-alert":return u`<div class="alert">⚠️ ${t.props.message}</div>`;default:return console.warn("Componente desconocido:",t.type),u``}}_renderTable(){return u`
        <h3>Tabla de Amortización</h3>
        <div class="table-container">
          <table>
             <tbody>${this.amortizationTable.map(t=>this._tplRow(t))}</tbody>
          </table>
        </div>
     `}_tplInput(t,e,i,s,r){return u`
      <credit-input 
        .label="${t}" 
        .fieldId="${e}" 
        .value="${i}" 
        .min="${s}" 
        .max="${r}"
        @credit-input-change="${this._onInputChange}"
      ></credit-input>
    `}_tplKpi(t,e,i="secondary"){return u`
      <kpi-card 
        .title="${t}" 
        .value="${e}"
        .variant="${i}"
      ></kpi-card>
    `}_tplRow(t){return u`
      <tr>
        <td>${t.period}</td>
        <td>${t.paymentFormatted}</td>
        <td>${t.interestFormatted}</td>
        <td>${t.capitalFormatted}</td>
        <td><strong>${t.balanceFormatted}</strong></td>
      </tr>
    `}};class tt extends kt(Ot(Tt)){static get is(){return"simulator-page"}static get styles(){return[Ut]}static get properties(){return{amount:{type:Number},rate:{type:Number},months:{type:Number},amortizationTable:{type:Array},summary:{type:Object},uiSchema:{type:Object}}}constructor(){super(),this.amount=5e4,this.rate=14.5,this.months=12,this.amortizationTable=[],this.summary={monthlyPayment:0,totalInterest:0,totalPayment:0},this.uiSchema={sections:[]}}firstUpdated(){this._loadInterfaceConfig(),this._calculateSimulation()}}customElements.define(tt.is,tt);
