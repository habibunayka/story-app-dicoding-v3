var ie=n=>{throw TypeError(n)};var _=(n,e,t)=>e.has(n)||ie("Cannot "+t);var g=(n,e,t)=>(_(n,e,"read from private field"),t?t.call(n):e.get(n)),k=(n,e,t)=>e.has(n)?ie("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),x=(n,e,t,r)=>(_(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),B=(n,e,t)=>(_(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const R={BASE_URL:"https://story-api.dicoding.dev/v1"},he={SUBSCRIBE:`${R.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${R.BASE_URL}/notifications/subscribe`},ke="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";function Ee(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/-/g,"+").replace(/_/g,"/"),r=atob(t);return Uint8Array.from([...r].map(s=>s.charCodeAt(0)))}async function Pe(){return!!await(await navigator.serviceWorker.ready).pushManager.getSubscription()}async function ye(){try{if(await Notification.requestPermission()!=="granted"){console.warn("Notification permission denied.");return}const e=await navigator.serviceWorker.ready,t=Ee(ke),r=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t}),s={endpoint:r.endpoint,keys:{p256dh:r.toJSON().keys.p256dh,auth:r.toJSON().keys.auth}},o=await fetch(he.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(s)}),i=await o.json();!o.ok||i.error?console.error("Failed to subscribe for push notification:",i.message):console.log("Successfully subscribed for push notification.")}catch(n){console.error("Error during push subscription:",n.message)}}async function Te(){try{const e=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(!e){console.warn("No active push subscription found.");return}const t=e.endpoint;await e.unsubscribe()||console.warn("Failed to unsubscribe from push manager.");const s=await fetch(he.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({endpoint:t})}),o=await s.json();!s.ok||o.error?console.error("Failed to unsubscribe from server:",o.message):console.log("Successfully unsubscribed from push notification.")}catch(n){console.error("Error during push unsubscription:",n.message)}}const W={STORIES:`${R.BASE_URL}/stories`};class ne{async getStories(){const e=localStorage.getItem("token"),t=await fetch(W.STORIES,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw new Error("Failed to fetch stories");return await t.json()}async addStory(e){const t=localStorage.getItem("token"),r=await fetch(W.STORIES,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e});if(!r.ok){const s=await r.json();throw new Error(s.message||"Failed to submit story")}return await r.json()}async getStoryById(e){const t=localStorage.getItem("token"),r=await fetch(`${W.STORIES}/${e}`,{headers:{Authorization:`Bearer ${t}`}});if(!r.ok)throw new Error("Failed to fetch story detail");return await r.json()}}class Ie{render(){return`
            <section class="create-page-container">
                <h1 class="create-page-title">Create Story</h1>
                <form id="create-form" class="create-form">
                    
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>

                    <div class="form-group">
                        <span id="upload-photo-label" class="visually-hidden">Upload Photo</span>
                        <div id="upload-options" style="display: flex; gap: 10px; margin-bottom: 1rem;">
                            <button type="button" id="select-file-btn" aria-labelledby="upload-photo-label">📁 Choose File</button>
                            <button type="button" id="take-photo-btn" aria-labelledby="upload-photo-label">📸 Take Photo</button>
                        </div>
                    </div>

                    <div id="back-option" class="form-group" style="display: none; margin-bottom: 1rem;">
                        <button type="button" id="back-btn">🔙 Back</button>
                    </div>

                    <div id="file-upload-container" class="form-group" style="display: none;">
                        <label for="file-input">Upload Image File</label>
                        <input type="file" id="file-input" name="photo" accept="image/*" />
                    </div>

                    <div id="camera-container" class="form-group" style="display: none;">
                        <label for="camera-preview">Camera Preview</label>
                        <video id="camera-preview" autoplay playsinline width="300" height="225" style="border: 1px solid #ccc; margin-top: -30px"></video>
                        <canvas id="camera-canvas" width="300" height="225" style="display: none;"></canvas>
                        <br />
                        <button type="button" id="capture-btn">📷 Capture Photo</button>
                    </div>

                    <div id="preview-container" class="form-group" style="display: none;">
                        <label for="image-preview">Image Preview</label>
                        <img id="image-preview" src="" alt="Preview of selected image" width="300" style="border: 1px solid #ccc; margin-top: -50px" />
                        <br />
                        <button type="button" id="retake-btn" style="margin-top: 0.5rem; display: none;">🔁 Take Again</button>
                    </div>

                    <button type="button" id="open-map-btn" style="margin-bottom: 1rem;">🗺️ Select Location on Map</button>
                    <div id="map" style="height: 300px; margin-bottom: 1rem; display: none;" aria-label="Map interface for selecting location"></div>

                    <div class="form-group">
                        <label for="lat">Latitude (optional)</label>
                        <input type="number" id="lat" name="lat" step="any" />
                    </div>

                    <div class="form-group">
                        <label for="lon">Longitude (optional)</label>
                        <input type="number" id="lon" name="lon" step="any" />
                    </div>

                    <button type="submit">Submit</button>
                </form>
                <p id="create-message" class="create-message" aria-live="polite"></p>
            </section>
        `}async afterRender(e){const t=document.querySelector("#create-form"),r=document.querySelector("#create-message"),s=document.querySelector("#select-file-btn"),o=document.querySelector("#take-photo-btn"),i=document.querySelector("#back-btn"),c=document.querySelector("#file-input"),a=document.querySelector("#file-upload-container"),l=document.querySelector("#camera-container"),u=document.querySelector("#camera-preview"),d=document.querySelector("#camera-canvas"),y=document.querySelector("#capture-btn"),w=document.querySelector("#preview-container"),A=document.querySelector("#image-preview"),D=document.querySelector("#retake-btn"),$=document.querySelector("#upload-options"),F=document.querySelector("#back-option"),N=document.querySelector("#map"),U=document.querySelector("#open-map-btn");let T=null,b=null,I,j;const V=()=>{b&&(b.getTracks().forEach(m=>m.stop()),b=null,u.srcObject=null)},H=()=>{V(),a.style.display="none",l.style.display="none",w.style.display="none",F.style.display="none",$.style.display="flex",T=null,A.src="",c.value="",y.style.display="inline-block",D.style.display="none"},se=()=>{V()};window.addEventListener("hashchange",se),window.addEventListener("popstate",se),i.addEventListener("click",H),s.addEventListener("click",()=>{H(),a.style.display="block",F.style.display="block",$.style.display="none"}),o.addEventListener("click",async()=>{H(),l.style.display="block",F.style.display="block",$.style.display="none";try{b=await navigator.mediaDevices.getUserMedia({video:!0}),u.srcObject=b,u.play(),u.style.display="block"}catch(m){console.error("Camera error:",m),r.innerText="Failed to access the camera."}}),c.addEventListener("change",()=>{const m=c.files[0];if(m&&m.size<=1024*1024){T=m;const p=new FileReader;p.onload=()=>{A.src=p.result,w.style.display="block"},p.readAsDataURL(m)}else r.innerText="File must be an image under 1MB.",w.style.display="none"}),y.addEventListener("click",()=>{d.getContext("2d").drawImage(u,0,0,d.width,d.height),d.toBlob(p=>{if(p&&p.size<=1024*1024){T=p;const f=URL.createObjectURL(p);A.src=f,w.style.display="block",u.style.display="none",y.style.display="none",D.style.display="inline-block",V()}else r.innerText="Image is too large."},"image/jpeg",.95)}),D.addEventListener("click",async()=>{w.style.display="none";try{b=await navigator.mediaDevices.getUserMedia({video:!0}),u.srcObject=b,u.play(),u.style.display="block",l.style.display="block",y.style.display="inline-block",D.style.display="none"}catch{r.innerText="Failed to reopen camera."}}),U.addEventListener("click",()=>{N.style.display==="none"?(N.style.display="block",U.innerText="🗺️ Close Map",I||(I=L.map("map").setView([-6.1754,106.8272],13),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(I),I.on("click",m=>{const{lat:p,lng:f}=m.latlng;j?j.setLatLng([p,f]):j=L.marker([p,f]).addTo(I),document.querySelector("#lat").value=p,document.querySelector("#lon").value=f}))):(N.style.display="none",U.innerText="🗺️ Select Location on Map")}),t.addEventListener("submit",async m=>{m.preventDefault();const p=t.description.value.trim(),f=t.lat.value,oe=t.lon.value;if(!T){r.innerText="Please choose or take a photo first.";return}const q=new FormData;q.append("description",p),q.append("photo",T,"photo.jpg"),f&&q.append("lat",parseFloat(f)),oe&&q.append("lon",parseFloat(oe)),await e.handleCreate(q)})}showSuccess(e){const t=document.querySelector("#create-message");t.style.color="green",t.innerText=e,setTimeout(()=>{window.location.hash="/"},1e3)}showError(e){const t=document.querySelector("#create-message");t.style.color="red",t.innerText=`Failed to submit story: ${e}`}}class qe{constructor(){this.model=new ne,this.view=new Ie}async render(){return this.view.render()}async afterRender(){await this.view.afterRender(this)}async handleCreate(e){try{const t=await this.model.addStory(e);this.view.showSuccess(t.message||"Story berhasil dibuat!")}catch(t){this.view.showError(t.message)}}}const Be="modulepreload",Re=function(n){return"/"+n},ae={},Ce=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(t.map(a=>{if(a=Re(a),a in ae)return;ae[a]=!0;const l=a.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${u}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":Be,l||(d.as="script"),d.crossOrigin="",d.href=a,c&&d.setAttribute("nonce",c),document.head.appendChild(d),l)return new Promise((y,w)=>{d.addEventListener("load",y),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${a}`)))})}))}function o(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return s.then(i=>{for(const c of i||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};class De{render(e){return`
          <section class="show-page-container">
            <button id="back-btn" class="back-btn">← Back</button>
            <div id="story-detail" class="story-detail">
              <img
                id="detail-image"
                class="detail-image"
                alt="detail-img-${e};"
                style="view-transition-name: story-img-${e};"
              />
              <div id="story-meta" class="story-meta"></div>
              <div id="map" style="height: 300px; margin-top: 1rem;"></div>
            </div>
            <p id="show-message" class="show-message"></p>
          </section>
        `}async afterRender(e,t){document.querySelector("#back-btn").addEventListener("click",s=>{s.preventDefault(),document.startViewTransition?document.startViewTransition(async()=>{const{HomePresenter:o}=await Ce(async()=>{const{HomePresenter:l}=await Promise.resolve().then(()=>ze);return{HomePresenter:l}},void 0),i=new o,c=await i.render(),a=document.querySelector("#main-content");a.innerHTML=c,await i.afterRender()}):window.location.hash="/"}),await e.loadDetail(t)}showLoading(){const e=document.querySelector("#show-message");e.innerText="Loading..."}renderDetail(e){const t=document.querySelector("#detail-image"),r=document.querySelector("#story-meta"),s=document.querySelector("#show-message");!t||!r||(t.src=e.photoUrl,s.innerText="",r.innerHTML=`
          <h2 class="detail-title">${e.name}</h2>
          <p class="detail-description">${e.description}</p>
          <p><strong>Latitude:</strong> ${e.lat??"-"}</p>
          <p><strong>Longitude:</strong> ${e.lon??"-"}</p>
          <p><strong>Dibuat:</strong> ${new Date(e.createdAt).toLocaleString()}</p>
        `,e.lat&&e.lon&&this.renderMapWithGeoJSON(e))}renderMapWithGeoJSON(e){const t=document.getElementById("map");t.innerHTML="";const r=L.map("map").setView([e.lat,e.lon],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(r);const s={type:"Feature",geometry:{type:"Point",coordinates:[e.lon,e.lat]},properties:{name:e.name,popupContent:e.description}};L.geoJSON(s,{onEachFeature:(o,i)=>{i.bindPopup(`<strong>${o.properties.name}</strong><br>${o.properties.popupContent}`)}}).addTo(r)}renderFailedMessage(e){const t=document.querySelector("#story-detail"),r=document.querySelector("#show-message");t.innerHTML="",r.innerText=`Gagal mengambil detail: ${e}`}}const K=(n,e)=>e.some(t=>n instanceof t);let ce,le;function xe(){return ce||(ce=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Me(){return le||(le=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Y=new WeakMap,z=new WeakMap,O=new WeakMap;function Oe(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",i)},o=()=>{t(S(n.result)),s()},i=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",i)});return O.set(e,n),e}function Ae(n){if(Y.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",i),n.removeEventListener("abort",i)},o=()=>{t(),s()},i=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",i),n.addEventListener("abort",i)});Y.set(n,e)}let Q={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Y.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return S(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function fe(n){Q=n(Q)}function $e(n){return Me().includes(n)?function(...e){return n.apply(Z(this),e),S(this.request)}:function(...e){return S(n.apply(Z(this),e))}}function Fe(n){return typeof n=="function"?$e(n):(n instanceof IDBTransaction&&Ae(n),K(n,xe())?new Proxy(n,Q):n)}function S(n){if(n instanceof IDBRequest)return Oe(n);if(z.has(n))return z.get(n);const e=Fe(n);return e!==n&&(z.set(n,e),O.set(e,n)),e}const Z=n=>O.get(n);function Ne(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const i=indexedDB.open(n,e),c=S(i);return r&&i.addEventListener("upgradeneeded",a=>{r(S(i.result),a.oldVersion,a.newVersion,S(i.transaction),a)}),t&&i.addEventListener("blocked",a=>t(a.oldVersion,a.newVersion,a)),c.then(a=>{o&&a.addEventListener("close",()=>o()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Ue=["get","getKey","getAll","getAllKeys","count"],je=["put","add","delete","clear"],G=new Map;function de(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(G.get(e))return G.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=je.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ue.includes(t)))return;const o=async function(i,...c){const a=this.transaction(i,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&a.done]))[0]};return G.set(e,o),o}fe(n=>({...n,get:(e,t,r)=>de(e,t)||n.get(e,t,r),has:(e,t)=>!!de(e,t)||n.has(e,t)}));const Ve=["continue","continuePrimaryKey","advance"],ue={},X=new WeakMap,we=new WeakMap,He={get(n,e){if(!Ve.includes(e))return n[e];let t=ue[e];return t||(t=ue[e]=function(...r){X.set(this,we.get(this)[e](...r))}),t}};async function*_e(...n){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...n)),!e)return;e=e;const t=new Proxy(e,He);for(we.set(t,e),O.set(t,Z(e));e;)yield t,e=await(X.get(t)||e.continue()),X.delete(t)}function me(n,e){return e===Symbol.asyncIterator&&K(n,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&K(n,[IDBIndex,IDBObjectStore])}fe(n=>({...n,get(e,t,r){return me(e,t)?_e:n.get(e,t,r)},has(e,t){return me(e,t)||n.has(e,t)}}));const J=Ne("story-db",1,{upgrade(n){n.createObjectStore("stories",{keyPath:"id"})}}),M={async save(n){await(await J).put("stories",n)},async getAll(){return(await J).getAll("stories")},async remove(n){return(await J).delete("stories",n)}};var C,ee;class be{constructor(){k(this,C);this.model=new ne,this.view=new De}async render(e=location.hash){const t=B(this,C,ee).call(this,e);return this.currentId=t,console.log("[ShowPresenter] Rendered ID:",t),this.view.render(t)}async afterRender(e=location.hash){const t=B(this,C,ee).call(this,e);if(!t){this.view.renderFailedMessage("Invalid ID");return}await this.view.afterRender(this,t)}async loadDetail(e){try{this.view.showLoading();const r=(await this.model.getStoryById(e)).story;this.view.renderDetail(r),M.save(r)}catch(t){console.warn("Failed to fetch story detail. Trying offline fallback:",t.message);const s=(await M.getAll()).find(o=>o.id===e);s?this.view.renderDetail(s):this.view.renderFailedMessage("Failed to load story. No offline data available.")}}}C=new WeakSet,ee=function(e=""){const r=e.replace("#","").trim().split("/");return r.length>=3?r[2]:null};class We{render(){return`
          <section class="home-page-container">
            <h1 class="home-page-title">Home Page</h1>
            <div id="story-list" class="story-list"></div>
            <p id="home-message" class="home-message"></p>
          </section>
        `}async afterRender(e){await e.loadStories()}showLoading(){const e=document.querySelector("#story-list"),t=document.querySelector("#home-message");e.innerHTML="",t.innerText="Loading stories..."}renderStories(e){const t=document.querySelector("#story-list"),r=document.querySelector("#home-message");r.innerText="",t.innerHTML="",e.forEach(s=>{const o=document.createElement("article");o.classList.add("story-item"),o.innerHTML=`
              <a href="#/show/${s.id}" class="story-link" data-id="${s.id}">
                <img
                  src="${s.photoUrl}"
                  alt="${s.name}"
                  class="story-image"
                  style="view-transition-name: story-img-${s.id};"
                />
                <h2 class="story-title">${s.name}</h2>
                <p class="story-description">${s.description}</p>
              </a>
            `;const i=o.querySelector("a");i.addEventListener("click",async c=>{c.preventDefault();const a=i.dataset.id;if(document.startViewTransition){const l=document.createElement("div");l.style.display="none",document.body.appendChild(l);const u=new be,d=await u.render(`#/show/${a}`);l.innerHTML=d,await new Promise(requestAnimationFrame),document.startViewTransition(async()=>{const y=document.querySelector("#main-content");y.innerHTML=l.innerHTML,await u.afterRender(`#/show/${a}`),l.remove()})}else window.location.hash=`#/show/${a}`}),t.appendChild(o)})}renderFailedMessage(e){const t=document.querySelector("#story-list"),r=document.querySelector("#home-message");t.innerHTML="",r.innerText=`Gagal mengambil data: ${e}`}}class te{constructor(){this.model=new ne,this.view=new We}async render(){return this.view.render()}async afterRender(){await this.view.afterRender(this)}async loadStories(){try{this.view.showLoading();const t=(await this.model.getStories()).listStory;this.view.renderStories(t),t.forEach(r=>{M.save(r)})}catch(e){console.warn("Failed to fetch stories from API. Trying to load from IndexedDB:",e.message);const t=await M.getAll();t.length>0?this.view.renderStories(t):this.view.renderFailedMessage("Failed to load stories. No offline data available.")}}}const ze=Object.freeze(Object.defineProperty({__proto__:null,HomePresenter:te},Symbol.toStringTag,{value:"Module"})),pe={LOGIN:`${R.BASE_URL}/login`,REGISTER:`${R.BASE_URL}/register`};class re{async loginUser({email:e,password:t}){const r=await fetch(pe.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}),s=await r.json();if(!r.ok)throw new Error(s.message||"Login failed");return localStorage.setItem("token",s.loginResult.token),s}async registerUser({name:e,email:t,password:r}){const s=await fetch(pe.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:r})}),o=await s.json();if(!s.ok)throw new Error(o.message||"Registration failed");return o}}class Ge{render(){return`
          <section class="login-page-container">
            <h1 class="login-page-title">Login</h1>
            <form id="login-form" class="login-page-form">
        
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="login-page-input"
                  placeholder="Email"
                  required
                />
              </div>
        
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="login-page-input"
                  placeholder="Password"
                  required
                />
              </div>
        
              <button type="submit" class="login-page-button">Login</button>
            </form>
        
            <p id="login-page-message" class="login-page-message" aria-live="polite"></p>
          </section>
        `}async afterRender(){const e=new re,t=new ve(e,this);document.querySelector("#login-form").addEventListener("submit",async s=>{s.preventDefault();const o=document.querySelector("#email").value,i=document.querySelector("#password").value;await t.handleLogin({email:o,password:i})})}showLoading(){const e=document.querySelector("#login-page-message");e.innerText="Attempting to Login..."}showSuccess(){window.location.hash="/"}showError(e){const t=document.querySelector("#login-page-message");t.innerText=`Login failed: ${e}`}}class ve{constructor(){this.model=new re,this.view=new Ge}async render(){return this.view.render()}async afterRender(){await this.view.afterRender(this)}async handleLogin({email:e,password:t}){try{this.view.showLoading(),await this.model.loginUser({email:e,password:t}),this.view.showSuccess()}catch(r){this.view.showError(r.message)}}}class Je{render(){return`
          <section class="register-page-container">
            <h1 class="register-page-title">Register</h1>
            <form id="register-form" class="register-page-form">
        
              <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="register-page-input"
                  placeholder="Nama"
                  required
                />
              </div>
        
              <div class="form-group">
                <label for="email">Alamat Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="register-page-input"
                  placeholder="Email"
                  required
                />
              </div>
        
              <div class="form-group">
                <label for="password">Kata Sandi</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="register-page-input"
                  placeholder="Password"
                  required
                />
              </div>
        
              <button type="submit" class="register-page-button">Daftar</button>
            </form>
        
            <p id="register-message" class="register-page-message" aria-live="polite"></p>
          </section>
        `}async afterRender(e){document.querySelector("#register-form").addEventListener("submit",async r=>{r.preventDefault();const s=document.querySelector("#name").value,o=document.querySelector("#email").value,i=document.querySelector("#password").value;await e.handleRegister({name:s,email:o,password:i})})}showLoading(){const e=document.querySelector("#register-message");e.innerText="Processing to Register..."}showSuccess(){const e=document.querySelector("#register-message");e.innerText="Success to Refgister! Redirected to login.",setTimeout(()=>{window.location.hash="/login"},1e3)}showError(e){const t=document.querySelector("#register-message");t.innerText=`Register failed: ${e}`}}class Ke{constructor(){this.model=new re,this.view=new Je}async render(){return this.view.render()}async afterRender(){await this.view.afterRender(this)}async handleRegister({name:e,email:t,password:r}){try{this.view.showLoading(),await this.model.registerUser({name:e,email:t,password:r}),this.view.showSuccess()}catch(s){this.view.showError(s.message)}}}class Ye{render(){return`
          <section class="setting-page-container">
            <h1 class="setting-page-title">Settings</h1>
            <button id="btn-toggle-subscription" class="btn-subscribe">Checking...</button>
            <p id="subscription-message" class="unsubscribe-message"></p>
          </section>
        `}afterRender(e){const t=document.querySelector("#btn-toggle-subscription"),r=document.querySelector("#subscription-message"),s=o=>{t.textContent=o?"Unsubscribe from Notifications":"Subscribe to Notifications",t.classList.toggle("subscribed",o)};e.checkSubscription().then(s),t.addEventListener("click",async()=>{if(await e.checkSubscription()){const i=await e.unsubscribe();i.success?(s(!1),r.textContent="You have successfully unsubscribed."):r.textContent=`Unsubscribe failed: ${i.error}`}else{const i=await e.subscribe();i.success?(s(!0),r.textContent="You are now subscribed to notifications."):r.textContent=`Subscribe failed: ${i.error}`}})}}class Qe{constructor(){this.view=new Ye}async render(){return this.view.render()}async afterRender(){this.view.afterRender(this)}async checkSubscription(){return await Pe()}async subscribe(){try{return await ye(),{success:!0}}catch(e){return{success:!1,error:e.message}}}async unsubscribe(){try{return await Te(),{success:!0}}catch(e){return{success:!1,error:e.message}}}}const ge={"/":{page:te,protected:!0},"/about":{page:te,protected:!0},"/create":{page:qe,protected:!0},"/settings":{page:Qe,protected:!0},"/login":{page:ve,protected:!1},"/register":{page:Ke,protected:!1},"/show/:id":{page:be,protected:!0}};function Ze(n){const e=n.split("/");return{resource:e[1]||null,id:e[2]||null}}function Xe(n){let e="";return n.resource&&(e=e.concat(`/${n.resource}`)),n.id&&(e=e.concat("/:id")),e||"/"}function et(){return location.hash.replace("#","")||"/"}function tt(){const n=et(),e=Ze(n);return Xe(e)}var v,E,h,P,Se,Le;class nt{constructor({navigationDrawer:e,drawerButton:t,content:r}){k(this,P);k(this,v,null);k(this,E,null);k(this,h,null);x(this,v,r),x(this,E,t),x(this,h,e),B(this,P,Se).call(this)}async renderPage(){const e=tt(),t=ge[e];if(B(this,P,Le).call(this),!t){g(this,v).innerHTML="<h1 style='text-align: center; margin-top: 20px;'>404 Not Found</h1>";return}if(!localStorage.getItem("token")&&t.protected){const i=ge["/login"].page,c=new i;g(this,v).innerHTML=await c.render(),await c.afterRender();return}const s=t.page,o=new s;g(this,v).innerHTML=await o.render(),await o.afterRender()}}v=new WeakMap,E=new WeakMap,h=new WeakMap,P=new WeakSet,Se=function(){g(this,E).addEventListener("click",()=>{g(this,h).classList.toggle("open")}),document.body.addEventListener("click",e=>{!g(this,h).contains(e.target)&&!g(this,E).contains(e.target)&&g(this,h).classList.remove("open"),g(this,h).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&g(this,h).classList.remove("open")})})},Le=function(){const e=localStorage.getItem("token"),t=document.querySelector("#nav-list");t&&(e?(t.innerHTML=`
              <li>
                <a href="#/">
                  <i class="fas fa-house"></i> Home
                </a>
              </li>
              <li>
                <a href="#/create">
                  <i class="fas fa-plus-circle"></i> Create
                </a>
              </li>
              <li>
                <a href="#/settings">
                  <i class="fas fa-cog"></i> Settings
                </a>
              </li>
              <li>
                <a href="#" id="logout">
                  <i class="fas fa-sign-out-alt"></i> Logout
                </a>
              </li>

            `,document.querySelector("#logout").addEventListener("click",()=>{localStorage.removeItem("token"),window.location.hash="/login"})):t.innerHTML=`
              <li>
                <a href="#/login">
                  <i class="fas fa-sign-in-alt"></i> Login
                </a>
              </li>
              <li>
                <a href="#/register">
                  <i class="fas fa-user-plus"></i> Register
                </a>
              </li>
            `)};document.addEventListener("DOMContentLoaded",async()=>{const n=new nt({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}),e=document.querySelector("#main-content"),t=document.querySelector(".skip-link");e&&t&&t.addEventListener("click",r=>{r.preventDefault(),t.blur(),e.setAttribute("tabindex","-1"),e.focus(),e.scrollIntoView({behavior:"smooth"})}),await n.renderPage(),"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then(()=>{console.log("Service Worker registered"),ye()}).catch(r=>console.error("SW failed:",r)),window.addEventListener("hashchange",async()=>{await n.renderPage()})});
