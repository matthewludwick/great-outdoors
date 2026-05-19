/* ============================================================
   Home page — search + render trail cards
   ============================================================ */

function trailCardHtml(t) {
  const stars = t.averageRating
    ? `<div class="rating-line">${renderStars(t.averageRating, { size: 'sm', showNumber: true })}
         <span class="count">(${(t.reviews && t.reviews.length) || 0} ${(t.reviews && t.reviews.length === 1) ? 'review' : 'reviews'})</span>
       </div>`
    : '';
  return `
    <a class="trail-card" href="trail.html?id=${t.id}">
      <img src="${t.image}" alt="${escapeHtml(t.name)}" loading="lazy">
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

function applyFilter(query) {
  const q = (query || '').toLowerCase();
  return window.trailsData.filter(t => {
    if (!q) return true;
    if (t.name.toLowerCase().includes(q)) return true;
    if (t.location && t.location.toLowerCase().includes(q)) return true;
    if (t.features && t.features.some(f => f.toLowerCase().includes(q))) return true;
    if (t.description && t.description.toLowerCase().includes(q)) return true;
    if (t.difficulty.toLowerCase().includes(q)) return true;
    return false;
  });
}

function renderHome() {
  const q = document.getElementById('search-input').value;
  const filtered = applyFilter(q);
  const gems = filtered.filter(t => t.isHiddenGem);
  const popular = filtered.filter(t => !t.isHiddenGem);

  const gemHost = document.getElementById('hidden-gems-wrap');
  if (gems.length) {
    gemHost.innerHTML = `<div class="trail-row">${gems.map(trailCardHtml).join('')}</div>`;
  } else {
    gemHost.innerHTML = `<p class="empty">No hidden gems match your search.</p>`;
  }

  const popHost = document.getElementById('popular-wrap');
  if (popular.length) {
    popHost.innerHTML = `<div class="trail-grid">${popular.map(trailCardHtml).join('')}</div>`;
  } else {
    popHost.innerHTML = `<p class="empty">No popular trails match your search.</p>`;
  }
}

function scrollToResults() {
  const el = document.getElementById('results');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  // Inject icons (relies on common.js being loaded before this file)
  document.getElementById('search-icon').innerHTML = sizeIcon('search', 20);
  document.getElementById('search-arrow').innerHTML = sizeIcon('arrowDown', 20);
  document.getElementById('safety-shield').innerHTML = sizeIcon('shield', 32);
  document.getElementById('leaf-icon').innerHTML    = sizeIcon('leaf', 20);
  document.getElementById('pin-icon').innerHTML     = sizeIcon('mapPin', 20);
  document.getElementById('heart-icon').innerHTML   = sizeIcon('heart', 48);

  // Initial render
  renderHome();

  // Search wiring
  const input = document.getElementById('search-input');
  input.addEventListener('input', renderHome);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') scrollToResults(); });
  document.getElementById('search-btn').addEventListener('click', scrollToResults);

  // If linked directly to #discover, scroll
  if (window.location.hash === '#discover') {
    setTimeout(() => {
      const el = document.getElementById('discover');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});
