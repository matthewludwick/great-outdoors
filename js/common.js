/* ============================================================
   The Great Outdoors — shared client-side helpers
   ============================================================
   - Inline SVG icons (replaces lucide-react)
   - Auth via localStorage (replaces React AuthContext)
   - Renders the shared header & footer
   - Star-rating renderer
   - Bad-language filter
   - URL/query helpers
   ============================================================ */

/* ---------- Icon library (inline SVG strings) ---------- */
const ICON = {
  mountain:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  user:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  logout:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
  search:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  shield:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  leaf:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.2c2 6.09-1.85 12.34-8 13.34-2.93.48-6 0-6-4"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
  mapPin:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  heart:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  arrowDown:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
  arrowLeft:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  lock:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  target:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  users:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  backpack:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M8 10h8"/><path d="M8 18h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',
  alertTri:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  alertCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  phone:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  navigation:  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
  trending:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  ticket:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  parking:     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
  external:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  star:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  thumbsUp:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l5-7s2.5.5 3 2c.5 1.5 0 3.88 0 3.88z"/></svg>',
  cloud:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"/></svg>',
  cloudRain:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/><path d="M17.5 13H9a4.5 4.5 0 0 1-1.41-8.775 5 5 0 0 1 9.823 1.27A3.5 3.5 0 0 1 17.5 13Z"/></svg>',
  sun:         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  cloudSnow:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/><path d="M17.5 13H9a4.5 4.5 0 0 1-1.41-8.775 5 5 0 0 1 9.823 1.27A3.5 3.5 0 0 1 17.5 13Z"/></svg>',
  wind:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
  bar:         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
  settings:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  plus:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  edit:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  trash:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  close:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  save:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  message:     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  mail:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  userPlus:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
,  calendar:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>'
,  bookmark:    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>'
,  bookmarkFill:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>'
,  check:       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
,  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
,  checkCircleFill: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke="currentColor"/><polyline points="8 12 11 15 16 9"/></svg>'
,  filter:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>'
,  sort:        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M11 18h2"/></svg>'
};

/* sizeIcon(name, sizePx[, classNames]) → returns the icon SVG string sized to N px.
   Replaces width="24" height="24" with the requested size. */
function sizeIcon(name, size = 20, cls = '') {
  let svg = ICON[name] || '';
  svg = svg.replace('width="24" height="24"', `width="${size}" height="${size}"`);
  if (cls) svg = svg.replace('<svg ', `<svg class="${cls}" `);
  return svg;
}

/* ---------- Auth (localStorage-based, replaces React AuthContext) ---------- */
const AUTH_KEY = 'tgo_auth_user';

const DUMMY_ACCOUNTS = [
  { username: 'user',  password: 'user123',  role: 'user',  email: 'user@example.com'  },
  { username: 'admin', password: 'admin123', role: 'admin', email: 'admin@example.com' }
];

const REGISTERED_KEY = 'tgo_registered_users';

const Auth = {
  user() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)); }
    catch (e) { return null; }
  },
  registeredUsers() {
    try { return JSON.parse(localStorage.getItem(REGISTERED_KEY)) || []; }
    catch (e) { return []; }
  },
  login(username, password) {
    // Check dummy accounts first
    const acct = DUMMY_ACCOUNTS.find(a => a.username === username && a.password === password);
    if (acct) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        username: acct.username, role: acct.role, email: acct.email
      }));
      return true;
    }
    // Check registered users
    const registered = this.registeredUsers();
    const reg = registered.find(a => a.username === username && a.password === password);
    if (reg) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        username: reg.username, role: 'user', email: reg.email,
        firstName: reg.firstName, lastName: reg.lastName
      }));
      return true;
    }
    return false;
  },
  register({ firstName, lastName, username, email, dob, city, state, password }) {
    const registered = this.registeredUsers();
    registered.push({ firstName, lastName, username, email, dob, city, state, password });
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(registered));
    // Auto-login
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      username, role: 'user', email, firstName, lastName, dob, city, state
    }));
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
  isAdmin() {
    const u = this.user();
    return !!(u && u.role === 'admin');
  }
};

/* ---------- Reviews (localStorage-backed) ----------
   Funnels review reads/writes through one helper. Until a real database is
   added, user-submitted reviews are kept in localStorage and merged with the
   baked-in reviews from trails.js. Swap THIS object to wire up a backend later.
*/
const REVIEWS_KEY       = 'tgo_user_reviews';   // user-submitted reviews
const DELETED_BAKED_KEY = 'tgo_deleted_baked';  // ids of baked-in reviews admin deleted

const Reviews = {
  userReviews() {
    try { return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || []; }
    catch (e) { return []; }
  },
  _saveUserReviews(arr) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(arr));
  },
  _deletedBakedIds() {
    try { return JSON.parse(localStorage.getItem(DELETED_BAKED_KEY)) || []; }
    catch (e) { return []; }
  },
  _saveDeletedBakedIds(arr) {
    localStorage.setItem(DELETED_BAKED_KEY, JSON.stringify(arr));
  },
  forTrail(trailId) {
    const id = Number(trailId);
    const trail = (window.trailsData || []).find(t => t.id === id);
    const deleted = this._deletedBakedIds();
    const baked = (trail && trail.reviews ? trail.reviews : [])
      .map(r => ({ ...r, _source: 'baked', _trailId: id }))
      .filter(r => !deleted.includes(`${id}:${r.id}`));
    const user = this.userReviews()
      .filter(r => r.trailId === id)
      .map(r => ({ ...r, _source: 'user', _trailId: id }));
    user.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    baked.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return [...user, ...baked];
  },
  all() {
    const out = [];
    const deleted = this._deletedBakedIds();
    (window.trailsData || []).forEach(t => {
      (t.reviews || []).forEach(r => {
        if (deleted.includes(`${t.id}:${r.id}`)) return;
        out.push({ ...r, _source: 'baked', _trailId: t.id, _trailName: t.name });
      });
    });
    const trailById = new Map((window.trailsData || []).map(t => [t.id, t]));
    this.userReviews().forEach(r => {
      const t = trailById.get(r.trailId);
      out.push({ ...r, _source: 'user', _trailId: r.trailId, _trailName: t ? t.name : '(unknown trail)' });
    });
    out.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return out;
  },
  add({ trailId, username, rating, comment }) {
    const all = this.userReviews();
    const review = {
      id: Date.now(),
      trailId: Number(trailId),
      username,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };
    all.push(review);
    this._saveUserReviews(all);
    return review;
  },
  remove(source, id, trailId) {
    if (source === 'user') {
      const all = this.userReviews();
      const filtered = all.filter(r => r.id !== Number(id));
      if (filtered.length === all.length) return false;
      this._saveUserReviews(filtered);
      return true;
    }
    if (source === 'baked') {
      const key = `${trailId}:${id}`;
      const deleted = this._deletedBakedIds();
      if (deleted.includes(key)) return false;
      deleted.push(key);
      this._saveDeletedBakedIds(deleted);
      return true;
    }
    return false;
  }
};

/* ---------- Lists (wishlist + completed) ---------------------
   Per-user wishlist and completed trails. Keyed by username so
   data persists per account. Easy swap to Firestore later — each
   user gets a doc with { wishlist: [trailId,...], completed: [...] }.
*/
const LISTS_KEY_PREFIX = 'tgo_lists_';   // tgo_lists_<username>

const Lists = {
  _key(username) { return LISTS_KEY_PREFIX + (username || '').toLowerCase(); },
  _read(username) {
    try {
      const raw = localStorage.getItem(this._key(username));
      const data = raw ? JSON.parse(raw) : {};
      return {
        wishlist: Array.isArray(data.wishlist) ? data.wishlist.map(Number) : [],
        completed: Array.isArray(data.completed) ? data.completed.map(Number) : []
      };
    } catch (e) {
      return { wishlist: [], completed: [] };
    }
  },
  _write(username, data) {
    if (!username) return;
    localStorage.setItem(this._key(username), JSON.stringify(data));
  },
  get(username) {
    if (!username) return { wishlist: [], completed: [] };
    return this._read(username);
  },
  isOnWishlist(username, trailId) {
    if (!username) return false;
    return this._read(username).wishlist.includes(Number(trailId));
  },
  isCompleted(username, trailId) {
    if (!username) return false;
    return this._read(username).completed.includes(Number(trailId));
  },
  toggleWishlist(username, trailId) {
    if (!username) return false;
    const id = Number(trailId);
    const data = this._read(username);
    const i = data.wishlist.indexOf(id);
    if (i >= 0) data.wishlist.splice(i, 1);
    else data.wishlist.push(id);
    this._write(username, data);
    return data.wishlist.includes(id);
  },
  toggleCompleted(username, trailId) {
    if (!username) return false;
    const id = Number(trailId);
    const data = this._read(username);
    const i = data.completed.indexOf(id);
    if (i >= 0) data.completed.splice(i, 1);
    else data.completed.push(id);
    this._write(username, data);
    return data.completed.includes(id);
  }
};

/* ---------- Profiles ----------------------------------------
   Per-user bio/location/avatar profile. Sample-review usernames get
   auto-generated dummy profiles on first access so the demo feels
   real. Real users (the ones registered or actively logged in) start
   blank and can edit.
*/
const PROFILE_KEY_PREFIX = 'tgo_profile_';   // tgo_profile_<username>

// Determinstic helpers for the dummy-profile generator
function _strHash(s) {
  let h = 0;
  for (let i = 0; i < (s || '').length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
const _PNW_LOCATIONS = [
  'Seattle, WA', 'Bellingham, WA', 'Tacoma, WA', 'Olympia, WA', 'Spokane, WA',
  'Bend, OR', 'Portland, OR', 'Eugene, OR', 'Hood River, OR', 'Ashland, OR',
  'Leavenworth, WA', 'North Bend, WA', 'Vancouver, BC', 'Boise, ID', 'Missoula, MT'
];
const _BIO_TEMPLATES = [
  'Weekend warrior chasing summits and good coffee. Always looking for the next quiet trail.',
  'Born and raised in the PNW. Happiest above the treeline.',
  'Backpacker, photographer, occasional fly-fisher. Pet-friendly trails preferred.',
  'Slow hiker, big views. Don\'t rush me past the wildflowers.',
  'Solo female hiker logging miles since 2018. Always happy to swap trail tips.',
  'Trail running and peak bagging when the weather cooperates.',
  'Family-friendly recs welcome — I have two small adventurers in tow.',
  'Day-hikes only, but I do them often. Bonus points for waterfalls.',
  'Backcountry skier turned summer hiker. Looking for the off-the-beaten-path stuff.',
  'New to the Cascades and obsessed. Send me your favorite hidden gems!'
];

const Profiles = {
  _key(username) { return PROFILE_KEY_PREFIX + (username || '').toLowerCase(); },
  // Anyone who has authored a review counts as a "known user" for profile purposes
  _isKnownSampleUser(username) {
    if (!username) return false;
    const lower = username.toLowerCase();
    return (window.trailsData || []).some(t =>
      (t.reviews || []).some(r => (r.username || '').toLowerCase() === lower)
    );
  },
  _generateDummy(username) {
    const seed = _strHash(username);
    const bio = _BIO_TEMPLATES[seed % _BIO_TEMPLATES.length];
    const location = _PNW_LOCATIONS[(seed >> 3) % _PNW_LOCATIONS.length];
    // Auto-add trails they reviewed to "completed", scatter some others into wishlist
    const completed = [];
    (window.trailsData || []).forEach(t => {
      const reviewed = (t.reviews || []).some(r => (r.username || '').toLowerCase() === username.toLowerCase());
      if (reviewed) completed.push(t.id);
    });
    // Add 1-3 wishlist trails (pseudo-random based on seed, must not overlap completed)
    const allIds = (window.trailsData || []).map(t => t.id).filter(id => !completed.includes(id));
    const wishlistCount = 1 + (seed % 3);
    const wishlist = [];
    for (let i = 0; i < wishlistCount && i < allIds.length; i++) {
      const pick = allIds[(seed + i * 7) % allIds.length];
      if (!wishlist.includes(pick)) wishlist.push(pick);
    }
    return {
      username,
      bio,
      location,
      joined: '2024',
      isAutoGenerated: true,
      _wishlist: wishlist,
      _completed: completed
    };
  },
  get(username) {
    if (!username) return null;
    // Already saved?
    try {
      const raw = localStorage.getItem(this._key(username));
      if (raw) {
        const saved = JSON.parse(raw);
        // Merge with current Lists data (Lists is the source of truth for wishlist/completed)
        return { ...saved, username };
      }
    } catch (e) {}
    // Sample user? Generate, save, also seed Lists with their completed/wishlist
    if (this._isKnownSampleUser(username)) {
      const dummy = this._generateDummy(username);
      const profile = { username: dummy.username, bio: dummy.bio, location: dummy.location, joined: dummy.joined, isAutoGenerated: true };
      localStorage.setItem(this._key(username), JSON.stringify(profile));
      // Seed lists (don't overwrite if user already has data)
      const existingLists = Lists.get(username);
      if (existingLists.wishlist.length === 0 && existingLists.completed.length === 0) {
        Lists._write(username, { wishlist: dummy._wishlist, completed: dummy._completed });
      }
      return profile;
    }
    // Real user with no profile yet — return a blank shell so they can edit
    return { username, bio: '', location: '', joined: new Date().getFullYear().toString(), isAutoGenerated: false };
  },
  save(username, { bio, location }) {
    if (!username) return null;
    const current = this.get(username) || { username, joined: new Date().getFullYear().toString() };
    const updated = {
      username,
      bio: (bio || '').slice(0, 500),
      location: (location || '').slice(0, 80),
      joined: current.joined || new Date().getFullYear().toString(),
      isAutoGenerated: false
    };
    localStorage.setItem(this._key(username), JSON.stringify(updated));
    return updated;
  }
};

/* ---------- Bad-language filter (replaces utils/badLanguageFilter.ts) ---------- */
const BAD_WORDS = ['damn', 'hell', 'crap', 'stupid', 'idiot', 'sucks'];
function containsBadLanguage(text) {
  const t = (text || '').toLowerCase();
  return BAD_WORDS.some(w => new RegExp(`\\b${w}\\b`, 'i').test(t));
}
function getDetectedBadWords(text) {
  const t = (text || '').toLowerCase();
  return BAD_WORDS.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(t));
}

/* ---------- URL helper ---------- */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------- Star rating renderer ---------- */
function renderStars(rating, opts = {}) {
  const { size = 'md', showNumber = false, maxRating = 5 } = opts;
  const sizeClass = `size-${size}`;
  let html = `<span class="stars ${sizeClass}">`;
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.round(rating);
    const isPartial = i > rating && i - 1 < rating;
    const cls = isFilled ? 'star-full' : isPartial ? 'star-partial' : 'star-empty';
    html += ICON.star.replace('<svg ', `<svg class="${cls}" `);
  }
  if (showNumber) html += `<span class="num">${Number(rating).toFixed(1)}</span>`;
  html += '</span>';
  return html;
}

/* ---------- Header & footer ---------- */
function renderHeader() {
  const u = Auth.user();

  const adminLink = u && u.role === 'admin'
    ? `<a href="admin.html">Admin</a>`
    : '';

  const userArea = u
    ? `<div class="nav-account-wrap">
         <button class="nav-account-btn" id="nav-account-btn" type="button" aria-haspopup="true" aria-expanded="false">
           ${sizeIcon('user', 16)}
           <span>${escapeHtml(u.username)}${u.role === 'admin' ? '<span class="admin-pill">Admin</span>' : ''}</span>
           ${sizeIcon('chevronDown', 14)}
         </button>
         <div class="nav-account-dropdown" id="nav-account-dropdown" role="menu">
           ${u.role === 'admin' ? '' : `<a href="profile.html" role="menuitem">${sizeIcon('user', 16)}<span>My Profile</span></a>`}
           <button id="nav-logout" type="button" role="menuitem">${sizeIcon('logout', 16)}<span>Logout</span></button>
         </div>
       </div>`
    : `<div class="nav-account-wrap">
         <button class="nav-account-btn" id="nav-account-btn" type="button" aria-haspopup="true" aria-expanded="false">
           ${sizeIcon('user', 16)}<span>Account</span>${sizeIcon('chevronDown', 14)}
         </button>
         <div class="nav-account-dropdown" id="nav-account-dropdown" role="menu">
           <a href="login.html" role="menuitem">${sizeIcon('user', 16)}<span>Sign In</span></a>
           <a href="signup.html" role="menuitem">${sizeIcon('userPlus', 16)}<span>Create Account</span></a>
         </div>
       </div>`;



  return `
  <header class="site-header">
    <div class="inner">

      <a class="brand" href="index.html">
        ${sizeIcon('mountain', 32)}
        <span class="brand-name">The Great Outdoors</span>
      </a>

      <button
        class="menu-toggle"
        id="menu-toggle"
        aria-label="Toggle navigation menu">
        ☰
      </button>

      <nav class="site-nav" id="site-nav">
        <a href="index.html#discover" id="nav-discover">
          Discover Trails
        </a>

        <a href="safety.html">
          Safety &amp; Leave No Trace
        </a>

        <a href="about.html">
          About Us
        </a>

        ${adminLink}

        <span class="divider" aria-hidden="true"></span>

        ${userArea}
      </nav>

    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <p>&copy; 2026 The Great Outdoors. Tread lightly, explore responsibly.</p>
  </footer>`;
}

/* Mount header + footer into the page, wire up nav events */
function mountChrome() {

  // Header
  const headerHost = document.getElementById('site-header');

  if (headerHost) {
    headerHost.outerHTML = renderHeader();

    const logoutBtn = document.getElementById('nav-logout');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        Auth.logout();
        window.location.reload();
      });
    }

    // Account dropdown toggle (shown when logged out)
    const accountBtn = document.getElementById('nav-account-btn');
    const accountDropdown = document.getElementById('nav-account-dropdown');
    if (accountBtn && accountDropdown) {
      accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = accountDropdown.classList.toggle('open');
        accountBtn.setAttribute('aria-expanded', isOpen);
      });
      document.addEventListener('click', () => {
        accountDropdown.classList.remove('open');
        accountBtn.setAttribute('aria-expanded', 'false');
      });
      accountDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    // Mobile Menu Toggle
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });
    }

    // Smooth-scroll for #discover when already on home
    const discover = document.getElementById('nav-discover');

    if (discover) {
      discover.addEventListener('click', (e) => {

        const isHome =
          /(^|\/)(index\.html)?$/.test(window.location.pathname);

        if (isHome) {

          const el = document.getElementById('discover');

          if (el) {
            e.preventDefault();

            el.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    }
  }

  // Footer
  const footerHost = document.getElementById('site-footer');

  if (footerHost) {
    footerHost.outerHTML = renderFooter();
  }
}

/* ---------- Helpers ---------- */
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNum(n) {
  return Number(n).toLocaleString();
}

/* Render wishlist/completed status badges to overlay on a trail card.
   Returns inline HTML (empty string when user not logged in or no status).
   Pages can set window._suppressListBadges = true to hide badges
   (used by profile pages showing someone else's lists). */
function renderListStatusBadges(trailId) {
  if (window._suppressListBadges) return '';
  const u = Auth.user();
  if (!u || u.role === 'admin') return '';
  const wished = Lists.isOnWishlist(u.username, trailId);
  const done = Lists.isCompleted(u.username, trailId);
  if (!wished && !done) return '';
  let html = '<div class="card-status-badges">';
  if (done)  html += `<span class="card-status-badge badge-completed" title="Completed">${sizeIcon('checkCircleFill', 18)}</span>`;
  if (wished) html += `<span class="card-status-badge badge-wishlist" title="On wishlist">${sizeIcon('bookmarkFill', 18)}</span>`;
  html += '</div>';
  return html;
}

/* Auto-init chrome when DOM is ready */
document.addEventListener('DOMContentLoaded', mountChrome);