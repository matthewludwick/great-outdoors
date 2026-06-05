/* ============================================================
   Home page
   - Hero search box now routes to search.html?q=...
   - "Discover Trails" section shows all trails (Hidden Gems first)
   - No inline filter behavior — that lives on search.html
   ============================================================ */

// Trail card renderer (also used by search.html via window.trailCardHtml)
function trailCardHtml(t) {
  const stars = t.averageRating
    ? `<div class="rating-line">${renderStars(t.averageRating, { size: 'sm', showNumber: true })}
         <span class="count">(${(t.reviews && t.reviews.length) || 0} ${(t.reviews && t.reviews.length === 1) ? 'review' : 'reviews'})</span>
       </div>`
    : '';
  const badges = (typeof renderListStatusBadges === 'function') ? renderListStatusBadges(t.id) : '';
  return `
    <a class="trail-card" href="trail.html?id=${t.id}">
      <div class="trail-card-img-wrap">
        <img src="${t.image}" alt="${escapeHtml(t.name)}" loading="lazy">
        ${badges}
      </div>
      <div class="body">
        <div class="row-top">
          <h3>${escapeHtml(t.name)}</h3>
          <span class="diff-pill diff-${t.difficulty}">${t.difficulty}</span>
        </div>
        ${stars}
        <div class="stats">
          <div><span class="label">Distance</span><span class="val">${t.distance} mi</span></div>
          <div><span class="label">Elevation Gain</span><span class="val">${formatNum(t.elevationGain)} ft</span></div>
        </div>
      </div>
    </a>`;
}
window.trailCardHtml = trailCardHtml;

function renderDiscover() {
  const all = window.trailsData || [];
  const gems = all.filter(t => t.isHiddenGem);
  const popular = all.filter(t => !t.isHiddenGem);

  const gemHost = document.getElementById('hidden-gems-wrap');
  if (gemHost) {
    gemHost.innerHTML = gems.length
      ? `<div class="trail-row">${gems.map(trailCardHtml).join('')}</div>`
      : `<p class="empty">No hidden gems available.</p>`;
  }

  const popHost = document.getElementById('popular-wrap');
  if (popHost) {
    popHost.innerHTML = popular.length
      ? `<div class="trail-grid">${popular.map(trailCardHtml).join('')}</div>`
      : `<p class="empty">No popular trails available.</p>`;
  }
}

function goToSearch() {
  const input = document.getElementById('search-input');
  const q = input ? input.value.trim() : '';
  const url = q ? `search.html?q=${encodeURIComponent(q)}` : 'search.html';
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
  // Mount icons that aren't injected by mountChrome
  const searchIcon  = document.getElementById('search-icon');
  const searchArrow = document.getElementById('search-arrow');
  const safetyShield = document.getElementById('safety-shield');
  const leafIcon = document.getElementById('leaf-icon');
  const pinIcon  = document.getElementById('pin-icon');
  const heartIcon = document.getElementById('heart-icon');
  if (searchIcon)   searchIcon.innerHTML   = sizeIcon('search', 20);
  if (searchArrow)  searchArrow.innerHTML  = sizeIcon('search', 22);
  if (safetyShield) safetyShield.innerHTML = sizeIcon('shield', 32);
  if (leafIcon)     leafIcon.innerHTML     = sizeIcon('leaf', 20);
  if (pinIcon)      pinIcon.innerHTML      = sizeIcon('mapPin', 20);
  if (heartIcon)    heartIcon.innerHTML    = sizeIcon('heart', 48);

  // Render trail sections
  renderDiscover();

  // Search box → search.html
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); goToSearch(); } });
  }
  if (btn) {
    btn.addEventListener('click', goToSearch);
  }

  // Smooth-scroll if anchor present
  if (window.location.hash === '#discover') {
    setTimeout(() => {
      const el = document.getElementById('discover');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});
