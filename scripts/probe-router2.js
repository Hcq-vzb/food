const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');

// Find App component with routes
const markers = ['path:"/"', 'element:', 'createRoot', 'Routes', 'useRoutes'];
for (const m of markers) {
  let idx = 0;
  let n = 0;
  while ((idx = c.indexOf(m, idx)) >= 0 && n < 3) {
    console.log(`\n=== ${m} @ ${idx} ===`);
    console.log(c.substring(idx - 80, idx + 200));
    idx += m.length;
    n++;
  }
}

// Find K = useLocation pattern - look for pathname in return
const locIdx = c.lastIndexOf('pathname:');
console.log('\n=== last pathname usage ===');
console.log(c.substring(locIdx - 150, locIdx + 200));
