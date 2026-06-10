const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');
const terms = ['createBrowserHistory', 'createHashHistory', 'createMemoryHistory', 'BrowserRouter', 'HashRouter', 'Router ', 'history:', 'basename:'];
for (const t of terms) {
  let idx = c.indexOf(t);
  if (idx >= 0) console.log(t, '->', c.substring(idx, idx + 120));
}
