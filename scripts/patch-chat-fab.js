const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const cssInsert = `.chat-overlay {
  position: fixed;
  inset: 0;
  z-index: 9997;
  background: rgba(0, 0, 0, 0.2);
}

.chat-panel {
  position: fixed;
  bottom: 6.5rem;
  right: 1.5rem;
  z-index: 9998;
}

.chat-fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
}

.chat-fab-pulse {
  animation: chatFabPulse 2.5s ease-in-out infinite;
}

@keyframes chatFabPulse {
  0%, 100% {
    box-shadow: 0 4px 16px rgba(30, 64, 175, 0.25);
  }
  50% {
    box-shadow: 0 6px 24px rgba(30, 64, 175, 0.45);
  }
}

`;

if (!b.includes('.chat-fab {')) {
  b = b.replace('.whatsapp-float {\\n', cssInsert.replace(/\n/g, '\\n') + '.whatsapp-float {\\n');
  console.log('Inserted chat-fab CSS');
}

const replacements = [
  [
    'className:"fixed inset-0 z-[9997] bg-black/20",onClick:function(){return r(!1)}',
    'className:"chat-overlay",onClick:function(){return r(!1)}',
  ],
  [
    'className:"fixed bottom-24 right-6 z-[9998] w-[360px]',
    'className:"chat-panel w-[360px]',
  ],
  [
    '(0,ut.jsxs)(Hl.button,{onClick:function(){n?r(!1):(r(!0),o(0))},className:"fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center border-2 border-white","aria-label":"Open customer support chat",whileHover:{scale:1.08},whileTap:{scale:.95},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4},children:[(0,ut.jsx)("i",{className:"fas fa-comments text-2xl"}),!n&&(0,ut.jsx)("span",{className:"absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center",children:"1"})]})',
    '(0,ut.jsxs)(Hl.button,{onClick:function(){n?r(!1):(r(!0),o(0))},className:"chat-fab chat-fab-pulse w-14 h-14 bg-white rounded-full flex items-center justify-center relative","aria-label":"Open customer support chat",whileHover:{scale:1.06},whileTap:{scale:.95},initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.4},children:[(0,ut.jsx)("div",{className:"w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-inner",children:(0,ut.jsx)("i",{className:"fas fa-headset text-white text-lg"})}),(0,ut.jsx)("span",{className:"absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white","aria-hidden":"true"})]})',
  ],
];

let ok = 0;
for (const [oldStr, newStr] of replacements) {
  if (b.includes(oldStr)) {
    b = b.replace(oldStr, newStr);
    ok++;
    console.log('OK:', oldStr.slice(0, 50) + '...');
  } else {
    console.warn('MISSING:', oldStr.slice(0, 60) + '...');
  }
}

fs.writeFileSync(bundlePath, b);
console.log(`Done: ${ok}/${replacements.length} replacements`);
