const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');
const terms = [
  'MemoryRouter', 'HashRouter', 'BrowserRouter', 'createHashRouter',
  'createBrowserRouter', 'RouterProvider', 'useRoutes', 'useLocation',
  'pathname', 'history.push', 'history.replace', 'window.location.pathname',
  'path:"/"', "path:'/'", 'Route', 'Navigate', 'Outlet',
];
for (const t of terms) {
  let count = 0;
  let idx = 0;
  while ((idx = c.indexOf(t, idx)) >= 0) {
    count++;
    idx += t.length;
  }
  if (count) console.log(`${t}: ${count}`);
}

// find route definitions
const routeIdx = c.indexOf('path:"/products"');
console.log('\nroute context:', c.substring(routeIdx - 100, routeIdx + 300));
