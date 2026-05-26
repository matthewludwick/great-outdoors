/* ============================================================
   Admin Review Moderation
   Lists every review across every trail, newest first.
   Admin can delete any review; user-submitted ones disappear
   from localStorage, baked-in ones get hidden via a deletion mask.
   ============================================================ */

let _filter = 'all'; // 'all' | 'user' | 'baked'

function reviewRowHtml(r) {
  const dateStr = r.date ? new Date(r.date).toLocaleDateString() : '';
  const sourcePill = r._source === 'user'
    ? '<span class="tag-soft tag-new" title="Submitted by a user">User</span>'
    : '<span class="tag-soft tag-baked" title="Built-in sample review">Sample</span>';
  // Each row gets data attributes so the click handler can find what to delete
  return `
    <div class="review-row" data-source="${r._source}" data-id="${r.id}" data-trail-id="${r._trailId}">
      <div class="review-row-main">
        <div class="review-row-head">
          <div class="review-row-who">
            <span class="name">${escapeHtml(r.username || 'anonymous')}</span>
            ${sourcePill}
            <span class="trail-link">on <a href="trail.html?id=${r._trailId}">${escapeHtml(r._trailName || 'a trail')}</a></span>
          </div>
          <div class="review-row-meta">
            ${renderStars(r.rating || 0, { size: 'sm' })}
            <span class="date">${dateStr}</span>
          </div>
        </div>
        <p class="review-row-body">${escapeHtml(r.comment || '')}</p>
      </div>
      <button class="icon-btn del" data-delete-review type="button" title="Delete review">
        ${sizeIcon('trash', 18)}
      </button>
    </div>`;
}

function applyFilter(all) {
  if (_filter === 'user')  return all.filter(r => r._source === 'user');
  if (_filter === 'baked') return all.filter(r => r._source === 'baked');
  return all;
}

function render() {
  const all = Reviews.all();
  const filtered = applyFilter(all);
  document.getElementById('review-count').textContent = filtered.length;

  const host = document.getElementById('reviews-host');
  if (!filtered.length) {
    host.innerHTML = `<div class="panel"><p class="empty" style="margin:0">No reviews to show.</p></div>`;
    return;
  }
  host.innerHTML = `<div class="panel" style="padding:0;overflow:hidden">
    <div class="review-list-admin">
      ${filtered.map(reviewRowHtml).join('')}
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Guard: admin only
  if (!Auth.isAdmin()) {
    window.location.replace(Auth.user() ? 'index.html' : 'login.html');
    return;
  }

  document.getElementById('ic-arrow').innerHTML = sizeIcon('arrowLeft', 16);

  render();

  // Filter dropdown
  document.getElementById('filter-select').addEventListener('change', e => {
    _filter = e.target.value;
    render();
  });

  // Event-delegated delete buttons
  document.getElementById('reviews-host').addEventListener('click', e => {
    const btn = e.target.closest('[data-delete-review]');
    if (!btn) return;
    const row = btn.closest('.review-row');
    if (!row) return;
    if (!confirm('Delete this review? This cannot be undone.')) return;
    const source = row.getAttribute('data-source');
    const id = row.getAttribute('data-id');
    const trailId = row.getAttribute('data-trail-id');
    Reviews.remove(source, id, trailId);
    render();
  });
});
