const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const oldCss =
  '.chat-overlay {\\n  position: fixed;\\n  inset: 0;\\n  z-index: 9997;\\n  background: rgba(0, 0, 0, 0.2);\\n}\\n\\n.chat-panel {\\n  position: fixed;\\n  bottom: 6.5rem;\\n  right: 1.5rem;\\n  z-index: 9998;\\n}\\n\\n.chat-fab {\\n  position: fixed;\\n  bottom: 1.5rem;\\n  right: 1.5rem;\\n  z-index: 9999;\\n}\\n\\n.chat-fab-pulse {\\n  animation: chatFabPulse 2.5s ease-in-out infinite;\\n}\\n\\n@keyframes chatFabPulse {\\n  0%, 100% {\\n    box-shadow: 0 4px 16px rgba(30, 64, 175, 0.25);\\n  }\\n  50% {\\n    box-shadow: 0 6px 24px rgba(30, 64, 175, 0.45);\\n  }\\n}\\n\\n';

const newCss =
  '.chat-overlay {\\n  position: fixed;\\n  inset: 0;\\n  z-index: 9997;\\n  background: rgba(0, 0, 0, 0.15);\\n}\\n\\n.chat-panel {\\n  position: fixed;\\n  bottom: 5.25rem;\\n  right: 1.25rem;\\n  z-index: 9998;\\n  width: 288px;\\n  max-width: calc(100vw - 1.5rem);\\n  max-height: min(340px, calc(100vh - 6.5rem));\\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n.chat-fab {\\n  position: fixed;\\n  bottom: 1.25rem;\\n  right: 1.25rem;\\n  z-index: 9999;\\n  width: 52px;\\n  height: 52px;\\n  border-radius: 50%;\\n  background: linear-gradient(135deg, #1e40af, #2563eb);\\n  color: #fff;\\n  border: 2px solid #fff;\\n  cursor: pointer;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  box-shadow: 0 4px 14px rgba(30, 64, 175, 0.4);\\n}\\n\\n.chat-fab i {\\n  font-size: 1.3rem;\\n  color: #fff;\\n}\\n\\n.chat-fab-dot {\\n  position: absolute;\\n  bottom: 2px;\\n  right: 2px;\\n  width: 11px;\\n  height: 11px;\\n  background: #22c55e;\\n  border-radius: 50%;\\n  border: 2px solid #fff;\\n}\\n\\n.chat-fab-pulse {\\n  animation: chatFabPulse 2.5s ease-in-out infinite;\\n}\\n\\n@keyframes chatFabPulse {\\n  0%, 100% { box-shadow: 0 4px 14px rgba(30, 64, 175, 0.35); }\\n  50% { box-shadow: 0 6px 20px rgba(30, 64, 175, 0.55); }\\n}\\n\\n';

const replacements = [
  [oldCss, newCss],
  [
    'className:"chat-panel w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col",style:{maxHeight:"min(520px,calc(100vh - 8rem))"}',
    'className:"chat-panel bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"',
  ],
  [
    'className:"bg-gradient-to-r from-blue-800 to-blue-600 px-5 py-4 flex items-center justify-between flex-shrink-0"',
    'className:"bg-gradient-to-r from-blue-800 to-blue-600 px-3 py-2.5 flex items-center justify-between flex-shrink-0"',
  ],
  [
    'className:"w-10 h-10 bg-white/20 rounded-full flex items-center justify-center",children:(0,ut.jsx)("i",{className:"fas fa-headset text-white text-lg"})',
    'className:"w-8 h-8 bg-white/20 rounded-full flex items-center justify-center",children:(0,ut.jsx)("i",{className:"fas fa-headset text-white text-sm"})',
  ],
  [
    'className:"flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"',
    'className:"flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50"',
  ],
  [
    'className:"bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[85%]"',
    'className:"bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100 max-w-[88%]"',
  ],
  [
    'children:"We are a professional Chinese manufacturer of wholesale food additives with 20+ years experience. ISO certified, exporting thickeners, sweeteners and preservatives to 30+ countries."',
    'children:"China wholesale food additives manufacturer. ISO certified, 20+ years export experience."',
  ],
  [
    'className:"p-3 bg-white border-t border-gray-100 flex-shrink-0"',
    'className:"p-2 bg-white border-t border-gray-100 flex-shrink-0"',
  ],
  [
    'className:"flex flex-wrap gap-1.5 mb-3"',
    'className:"flex flex-wrap gap-1 mb-2"',
  ],
  [
    'className:"flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-green-500/25"',
    'className:"flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"',
  ],
  [
    'children:"Chat on WhatsApp with Sales Manager"',
    'children:"WhatsApp Chat"',
  ],
  [
    '(0,ut.jsxs)(Hl.button,{onClick:function(){n?r(!1):(r(!0),o(0))},className:"chat-fab chat-fab-pulse w-14 h-14 bg-white rounded-full flex items-center justify-center relative","aria-label":"Open customer support chat",whileHover:{scale:1.06},whileTap:{scale:.95},initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.4},children:[(0,ut.jsx)("div",{className:"w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-inner",children:(0,ut.jsx)("i",{className:"fas fa-headset text-white text-lg"})}),(0,ut.jsx)("span",{className:"absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white","aria-hidden":"true"})]})',
    '(0,ut.jsxs)(Hl.button,{onClick:function(){n?r(!1):(r(!0),o(0))},className:"chat-fab chat-fab-pulse relative","aria-label":"Open customer support chat",whileHover:{scale:1.06},whileTap:{scale:.95},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.35},children:[(0,ut.jsx)("i",{className:"fas fa-comment-dots"}),(0,ut.jsx)("span",{className:"chat-fab-dot","aria-hidden":"true"})]})',
  ],
];

let ok = 0;
for (const [oldStr, newStr] of replacements) {
  if (b.includes(oldStr)) {
    b = b.replace(oldStr, newStr);
    ok++;
  } else {
    console.warn('MISSING:', oldStr.slice(0, 70) + '...');
  }
}

fs.writeFileSync(bundlePath, b);
console.log(`Done: ${ok}/${replacements.length}`);
