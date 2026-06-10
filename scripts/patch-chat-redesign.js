const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const oldCssStart = b.indexOf('.chat-overlay {\\n');
const oldCssEnd = b.indexOf('.whatsapp-float {\\n');
if (oldCssStart < 0 || oldCssEnd < 0) {
  console.error('CSS block not found');
  process.exit(1);
}

const newCss = `.chat-overlay {
  position: fixed;
  inset: 0;
  z-index: 9997;
  background: rgba(15, 23, 42, 0.2);
}

.chat-panel {
  position: fixed;
  bottom: 5.75rem;
  right: 1.5rem;
  z-index: 9998;
  width: 340px;
  max-width: calc(100vw - 2rem);
  max-height: min(460px, calc(100vh - 8rem));
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.18);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  font-family: Inter, system-ui, sans-serif;
}

.chat-header {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-header-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chat-header-avatar i {
  color: #fff;
  font-size: 1.15rem;
}

.chat-header-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  background: #4ade80;
  border-radius: 50%;
  border: 2px solid #1e40af;
}

.chat-header-title {
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
}

.chat-header-sub {
  color: #bfdbfe;
  font-size: 12px;
  margin-top: 2px;
}

.chat-close {
  color: rgba(255, 255, 255, 0.85);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  padding: 6px;
  line-height: 1;
}

.chat-close:hover {
  color: #fff;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.chat-msg-row-user {
  display: flex;
  justify-content: flex-end;
}

.chat-msg-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #2563eb;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-msg-avatar i {
  color: #fff;
  font-size: 13px;
}

.chat-bubble {
  background: #fff;
  border-radius: 14px 14px 14px 4px;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  max-width: 82%;
}

.chat-bubble p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: #4b5563;
}

.chat-bubble-title {
  font-weight: 600;
  color: #111827 !important;
  margin-bottom: 6px !important;
}

.chat-bubble-page {
  font-size: 12px;
  color: #2563eb !important;
  font-weight: 500;
  margin-top: 8px !important;
}

.chat-bubble-user {
  background: #2563eb;
  color: #fff;
  border-radius: 14px 14px 4px 14px;
  padding: 10px 14px;
  max-width: 82%;
  font-size: 13.5px;
  line-height: 1.5;
}

.chat-footer {
  padding: 12px 14px 14px;
  background: #fff;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;
}

.chat-footer-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: 500;
}

.chat-quick-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.chat-quick-btn {
  font-size: 12.5px;
  padding: 7px 13px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.chat-quick-btn:hover {
  border-color: #93c5fd;
  color: #2563eb;
  background: #f8fafc;
}

.chat-quick-btn.active {
  background: #eff6ff;
  border-color: #60a5fa;
  color: #1d4ed8;
}

.chat-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 13px 16px;
  background: #25d366;
  color: #fff;
  font-weight: 600;
  font-size: 14.5px;
  border-radius: 12px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}

.chat-wa-btn:hover {
  background: #20bd5a;
}

.chat-wa-btn i {
  font-size: 1.3rem;
}

.chat-fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  height: 58px;
  padding: 0 22px 0 14px;
  border-radius: 29px;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.45);
  font-family: Inter, system-ui, sans-serif;
}

.chat-fab-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-fab-icon i {
  font-size: 1.15rem;
  color: #fff;
}

.chat-fab-label {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.chat-fab-dot {
  position: absolute;
  top: 4px;
  right: 14px;
  width: 11px;
  height: 11px;
  background: #4ade80;
  border-radius: 50%;
  border: 2px solid #1e40af;
  animation: chatDotBlink 2s ease-in-out infinite;
}

.chat-fab-pulse {
  animation: chatFabPulse 2.5s ease-in-out infinite;
}

@keyframes chatFabPulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(30, 58, 138, 0.4); }
  50% { box-shadow: 0 10px 32px rgba(30, 58, 138, 0.6); }
}

@keyframes chatDotBlink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.92); }
}

`.replace(/\n/g, '\\n');

b = b.slice(0, oldCssStart) + newCss + b.slice(oldCssEnd);

const hcStart = b.indexOf('Hc=function(){');
const hcEnd = b.indexOf(',Wc=function(){');
if (hcStart < 0 || hcEnd < 0) {
  console.error('Hc function not found');
  process.exit(1);
}

const newHc = `Hc=function(){var e=Oc((0,t.useState)(!1),2),n=e[0],r=e[1],a=Oc((0,t.useState)(0),2),i=a[0],o=a[1],s=K(),l=s.pathname,c=s.search,u="https://foodingredientschina.com"+l+c,d=function(e,t){if("/products"===e&&t){var n=new URLSearchParams(t).get("category");if(n)return"Products: "+decodeURIComponent(n)}return"/"===e?"Homepage":"/products"===e?"Products Catalog":"/specification"===e?"Specifications":"/faq"===e?"FAQ":"/contact"===e?"Contact Us":0===e.indexOf("/products/")?"Product: "+e.replace("/products/","").replace(/-/g," "):e}(l,c),p=[{q:"What products do you offer?",a:"We supply 97+ wholesale food additives including thickeners, sweeteners, emulsifiers and preservatives. ISO and HACCP certified, exported to 30+ countries."},{q:"What is your MOQ?",a:"MOQ is typically 1 ton for most additives, 500kg for specialty items. Free samples available with buyer covering shipping."},{q:"How can I get a quote?",a:"Share your product name, quantity and destination. Our sales manager will reply on WhatsApp within 1 hour."}],f=encodeURIComponent("Hello! I am interested in Food Ingredients China.\\n\\nPage: "+d+"\\nURL: "+u+"\\n\\nI would like to speak with your sales manager."),h="https://wa.me/8617751189576?text="+f;return(0,ut.jsxs)(t.Fragment,{children:[n&&(0,ut.jsx)("div",{className:"chat-overlay",onClick:function(){return r(!1)}}),n&&(0,ut.jsxs)(Hl.div,{initial:{opacity:0,y:16,scale:.97},animate:{opacity:1,y:0,scale:1},transition:{duration:.3},className:"chat-panel",children:[(0,ut.jsxs)("div",{className:"chat-header",children:[(0,ut.jsxs)("div",{className:"chat-header-info",children:[(0,ut.jsxs)("div",{className:"chat-header-avatar",children:[(0,ut.jsx)("i",{className:"fas fa-headset"}),(0,ut.jsx)("span",{className:"chat-header-dot"})]}),(0,ut.jsxs)("div",{children:[(0,ut.jsx)("div",{className:"chat-header-title",children:"Food Ingredients China"}),(0,ut.jsx)("div",{className:"chat-header-sub",children:"Sales Support · Online now"})]})]}),(0,ut.jsx)("button",{onClick:function(){return r(!1)},className:"chat-close","aria-label":"Close chat",children:(0,ut.jsx)("i",{className:"fas fa-times"})})]}),(0,ut.jsxs)("div",{className:"chat-body",children:[(0,ut.jsxs)("div",{className:"chat-msg-row",children:[(0,ut.jsx)("div",{className:"chat-msg-avatar",children:(0,ut.jsx)("i",{className:"fas fa-robot"})}),(0,ut.jsxs)("div",{className:"chat-bubble",children:[(0,ut.jsx)("p",{className:"chat-bubble-title",children:"Hello! Welcome to Food Ingredients China."}),(0,ut.jsx)("p",{children:"Professional wholesale food additives manufacturer from China. ISO & HACCP certified, exporting to 30+ countries worldwide."}),(0,ut.jsxs)("p",{className:"chat-bubble-page",children:["Viewing: ",d]})]})]}),i>0&&(0,ut.jsx)("div",{className:"chat-msg-row-user",children:(0,ut.jsx)("div",{className:"chat-bubble-user",children:p[i-1].q})}),i>0&&(0,ut.jsxs)("div",{className:"chat-msg-row",children:[(0,ut.jsx)("div",{className:"chat-msg-avatar",children:(0,ut.jsx)("i",{className:"fas fa-robot"})}),(0,ut.jsx)("div",{className:"chat-bubble",children:(0,ut.jsx)("p",{children:p[i-1].a})})]})]}),(0,ut.jsxs)("div",{className:"chat-footer",children:[(0,ut.jsx)("div",{className:"chat-footer-label",children:"Quick questions:"}),(0,ut.jsx)("div",{className:"chat-quick-btns",children:p.map(function(e,t){return(0,ut.jsx)("button",{onClick:function(){return o(t+1)},className:"chat-quick-btn"+(i===t+1?" active":""),children:e.q.length>32?e.q.slice(0,30)+"...":e.q},t)})}),(0,ut.jsxs)(Hl.a,{href:h,target:"_blank",rel:"noopener noreferrer",className:"chat-wa-btn",whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,ut.jsx)("i",{className:"fab fa-whatsapp"}),(0,ut.jsx)("span",{children:"Chat on WhatsApp"})]})]})]}),(0,ut.jsxs)(Hl.button,{onClick:function(){n?r(!1):(r(!0),o(0))},className:"chat-fab chat-fab-pulse",whileHover:{scale:1.04},whileTap:{scale:.97},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.35},"aria-label":"Open customer support chat",children:[(0,ut.jsx)("span",{className:"chat-fab-dot","aria-hidden":"true"}),(0,ut.jsx)("span",{className:"chat-fab-icon",children:(0,ut.jsx)("i",{className:"fas fa-comments"})}),(0,ut.jsx)("span",{className:"chat-fab-label",children:"Chat"})]})]})}`;

b = b.slice(0, hcStart) + newHc + b.slice(hcEnd);
// hcEnd points at ',Wc=function...' so newHc must end with '}' only

fs.writeFileSync(bundlePath, b);
console.log('Chat widget redesigned: CSS + Hc component replaced');
