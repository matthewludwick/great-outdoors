/* ============================================================
   Search results page
   - Reads ?q= from URL on load
   - Sortable + filterable
   - Two views: list (default, table-like) and grid (cards)
   ============================================================ */

// Tag → matcher: maps a tag filter value to a predicate against a trail's features
const TAG_MATCHERS = {
  'hidden-gem':    t => !!t.isHiddenGem,
  'water':         t => featuresMatch(t, ['lake','water','swimming','waterfall','river','creek']),
  'views':         t => featuresMatch(t, ['view','summit','peak','panoramic','360','overlook','ledge']),
  'forest':        t => featuresMatch(t, ['forest','canopy','old-growth']),
  'wildflowers':   t => featuresMatch(t, ['wildflower','meadow','larch','heather','flowers']),
  'family':        t => featuresMatch(t, ['family','gentle','well-maintained']),
  'quiet':         t => featuresMatch(t, ['quiet','less crowded','remote','solitude']),
  'photography':   t => featuresMatch(t, ['photo','dramatic','scenery','photography']),
  'historic':      t => featuresMatch(t, ['historic','fire lookout','mining','mailbox'])
};
function featuresMatch(t, needles) {
  const features = (t.features || []).map(f => f.toLowerCase()).join('|');
  const desc = (t.description || '').toLowerCase();
  return needles.some(n => features.includes(n) || desc.includes(n));
}

// Difficulty ranking for sort
const DIFF_RANK = { 'Easy': 1, 'Moderate': 2, 'Hard': 3 };

// Current filter/sort state
const state = {
  q: '',
  sort: 'default',
  difficulty: new Set(),
  routeType: new Set(),
  tags: new Set(),
  distMin: null,
  distMax: null,
  elevMin: null,
  elevMax: null,
  view: 'list'
};

function readQueryFromUrl() {
  const q = getQueryParam('q');
  if (q) {
    state.q = q;
    document.getElementById('search-input').value = q;
  }
}

function applyFilters(all) {
  const q = state.q.toLowerCase().trim();
  let out = all.filter(t => {
    // Text search across the same fields as the old home filter,
    // plus synthetic tokens for boolean flags like isHiddenGem.
    if (q) {
      const tokens = [
        t.name, t.location, t.description, t.difficulty,
        ...(t.features || []),
        t.routeType || ''
      ];
      if (t.isHiddenGem) tokens.push('hidden gem', 'hidden');
      const haystack = tokens.join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    // Difficulty
    if (state.difficulty.size && !state.difficulty.has(t.difficulty)) return false;
    // Route type
    if (state.routeType.size && !state.routeType.has(t.routeType)) return false;
    // Tags (must match ALL selected tags — AND, not OR)
    for (const tag of state.tags) {
      const matcher = TAG_MATCHERS[tag];
      if (matcher && !matcher(t)) return false;
    }
    // Distance range
    if (state.distMin != null && t.distance < state.distMin) return false;
    if (state.distMax != null && t.distance > state.distMax) return false;
    // Elevation range
    if (state.elevMin != null && t.elevationGain < state.elevMin) return false;
    if (state.elevMax != null && t.elevationGain > state.elevMax) return false;
    return true;
  });
  return out;
}

function applySort(arr) {
  const a = arr.slice();
  switch (state.sort) {
    case 'name-asc':       a.sort((x,y) => x.name.localeCompare(y.name)); break;
    case 'rating-desc':    a.sort((x,y) => (y.averageRating||0) - (x.averageRating||0)); break;
    case 'distance-asc':   a.sort((x,y) => x.distance - y.distance); break;
    case 'distance-desc':  a.sort((x,y) => y.distance - x.distance); break;
    case 'elev-asc':       a.sort((x,y) => x.elevationGain - y.elevationGain); break;
    case 'elev-desc':      a.sort((x,y) => y.elevationGain - x.elevationGain); break;
    case 'difficulty-asc': a.sort((x,y) => (DIFF_RANK[x.difficulty]||0) - (DIFF_RANK[y.difficulty]||0)); break;
    case 'difficulty-desc':a.sort((x,y) => (DIFF_RANK[y.difficulty]||0) - (DIFF_RANK[x.difficulty]||0)); break;
    case 'default':
    default:
      a.sort((x,y) => {
        if (x.isHiddenGem !== y.isHiddenGem) return x.isHiddenGem ? -1 : 1;
        return (y.averageRating||0) - (x.averageRating||0);
      });
  }
  return a;
}

function rowHtml(t) {
  const badges = renderListStatusBadges(t.id);
  const features = (t.features || []).slice(0, 4).map(f => `<span class="feature-tag">${escapeHtml(f)}</span>`).join('');
  const moreCount = Math.max(0, (t.features || []).length - 4);
  const more = moreCount ? `<span class="feature-tag feature-tag-muted">+${moreCount} more</span>` : '';
  return `
    <a class="result-row" href="trail.html?id=${t.id}">
      <div class="result-row-img">
        <img src="${t.image}" alt="${escapeHtml(t.name)}" loading="lazy">
        ${badges}
      </div>
      <div class="result-row-body">
        <div class="result-row-top">
          <h3>${escapeHtml(t.name)}</h3>
          <div class="result-row-pills">
            <span class="diff-pill diff-${t.difficulty}">${t.difficulty}</span>
            ${t.isHiddenGem ? '<span class="gem-pill">Hidden Gem</span>' : ''}
          </div>
        </div>
        <p class="result-row-loc">${sizeIcon('mapPin', 14)} ${escapeHtml(t.location || '')}</p>
        <div class="result-row-stats">
          <span><strong>${t.distance} mi</strong> ${t.routeType || ''}</span>
          <span><strong>${formatNum(t.elevationGain)} ft</strong> elev.</span>
          ${t.averageRating ? `<span>${renderStars(t.averageRating, { size: 'sm', showNumber: true })}</span>` : ''}
        </div>
        <div class="result-row-tags">${features}${more}</div>
      </div>
    </a>`;
}

function render() {
  const all = window.trailsData || [];
  const filtered = applyFilters(all);
  const sorted = applySort(filtered);

  // Counts
  const count = sorted.length;
  document.getElementById('results-count').textContent =
    count === 0 ? 'No trails match your filters'
                : `${count} trail${count === 1 ? '' : 's'} found`;

  // Filter badge
  const activeCount =
    state.difficulty.size + state.routeType.size + state.tags.size +
    (state.distMin != null ? 1 : 0) + (state.distMax != null ? 1 : 0) +
    (state.elevMin != null ? 1 : 0) + (state.elevMax != null ? 1 : 0);
  const badge = document.getElementById('filter-badge');
  if (activeCount > 0) { badge.hidden = false; badge.textContent = activeCount; }
  else { badge.hidden = true; }

  // Render
  const host = document.getElementById('results-host');
  if (!sorted.length) {
    host.innerHTML = `
      <div class="empty-state">
        <p>No trails match your search and filters.</p>
        <button class="btn btn-outline" id="empty-clear" type="button">Clear all filters</button>
      </div>`;
    const ec = document.getElementById('empty-clear');
    if (ec) ec.addEventListener('click', clearAllFilters);
    return;
  }
  if (state.view === 'list') {
    host.innerHTML = `<div class="result-list">${sorted.map(rowHtml).join('')}</div>`;
  } else {
    host.innerHTML = `<div class="trail-grid">${sorted.map(window.trailCardHtml).join('')}</div>`;
  }
}

function clearAllFilters() {
  state.q = '';
  state.sort = 'default';
  state.difficulty.clear();
  state.routeType.clear();
  state.tags.clear();
  state.distMin = state.distMax = state.elevMin = state.elevMax = null;
  document.getElementById('search-input').value = '';
  document.getElementById('sort-select').value = 'default';
  document.querySelectorAll('[data-filter]').forEach(c => { c.checked = false; });
  document.getElementById('dist-min').value = '';
  document.getElementById('dist-max').value = '';
  document.getElementById('elev-min').value = '';
  document.getElementById('elev-max').value = '';
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  // Icons
  document.getElementById('search-icon').innerHTML = sizeIcon('search', 18);
  document.getElementById('filter-icon').innerHTML = sizeIcon('filter', 16);
  document.getElementById('ic-heart').innerHTML = sizeIcon('heart', 16);
  document.getElementById('ic-list').innerHTML = sizeIcon('sort', 18);
  document.getElementById('ic-grid').innerHTML = sizeIcon('bar', 18);

  readQueryFromUrl();

  // Search input — live filter as user types
  const input = document.getElementById('search-input');
  input.addEventListener('input', () => { state.q = input.value; render(); });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    state.sort = e.target.value;
    render();
  });

  // Filter checkboxes (event delegation)
  document.getElementById('filter-sidebar').addEventListener('change', e => {
    const cb = e.target;
    if (!cb.matches('[data-filter]')) return;
    const kind = cb.getAttribute('data-filter');
    const val = cb.value;
    const set = kind === 'tag' ? state.tags : state[kind];
    if (cb.checked) set.add(val);
    else set.delete(val);
    render();
  });

  // Range inputs
  ['dist-min','dist-max','elev-min','elev-max'].forEach(id => {
    document.getElementById(id).addEventListener('input', e => {
      const v = e.target.value === '' ? null : Number(e.target.value);
      if (id === 'dist-min') state.distMin = v;
      if (id === 'dist-max') state.distMax = v;
      if (id === 'elev-min') state.elevMin = v;
      if (id === 'elev-max') state.elevMax = v;
      render();
    });
  });

  // Clear
  document.getElementById('clear-filters').addEventListener('click', clearAllFilters);

  // Filter sidebar toggle (mobile)
  document.getElementById('filter-toggle').addEventListener('click', () => {
    document.getElementById('filter-sidebar').classList.toggle('open');
  });

  // View toggle (list vs grid)
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.view = btn.getAttribute('data-view');
      render();
    });
  });

  render();
});
