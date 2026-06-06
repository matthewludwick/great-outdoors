/* ============================================================
   Admin Review Moderation (redesigned)
   - Section 1: New reviews awaiting moderation, highlighted
   - Section 2: All reviews, newest first
   - No tags on existing reviews; new reviews get a "NEW" badge
   ============================================================ */

function reviewCardHtml(r, opts = {}) {
  const { highlight = false } = opts;
  const dateStr = r.date ? new Date(r.date).toLocaleDateString() : '';
  const avgRating = Number(r.rating || 0);
  return `
    <article class="review-card ${highlight ? 'review-card-new' : ''}"
             data-source="${r._source}" data-id="${r.id}" data-trail-id="${r._trailId}">
      <header class="review-card-head">
        <div class="review-card-trail">
          <a href="trail.html?id=${r._trailId}" class="trail-name-link">${escapeHtml(r._trailName || 'a trail')}</a>
          ${highlight ? '<span class="badge-new">NEW</span>' : ''}
        </div>
        <button class="icon-btn del" data-delete-review type="button" title="Delete review"
                aria-label="Delete review by ${escapeHtml(r.username || '')}">
          ${sizeIcon('trash', 18)}
        </button>
      </header>
      <div class="review-card-meta">
        <div class="review-card-author">
          <span class="avatar" aria-hidden="true">${escapeHtml((r.username || '?').charAt(0).toUpperCase())}</span>
          <div>
            <div class="author-name">${escapeHtml(r.username || 'anonymous')}</div>
            <div class="author-date">${dateStr}</div>
          </div>
        </div>
        <div class="review-card-rating">
          ${renderStars(avgRating, { size: 'md' })}
          <span class="rating-num">${avgRating.toFixed(1)}</span>
        </div>
      </div>
      <p class="review-card-body">${escapeHtml(r.comment || '')}</p>
    </article>`;
}

function statCard({ icon, label, val, boxClass }) {
  return `
    <div class="stat-card">
      <div class="icon-box ${boxClass}">${icon}</div>
      <div>
        <p class="label">${label}</p>
        <p class="val">${val}</p>
      </div>
    </div>`;
}

function render() {
  const all = Reviews.all();
  const newReviews = all.filter(r => r._source === 'user');
  const trailsWithReviews = new Set(all.map(r => r._trailId)).size;
  const avgRating = all.length
    ? (all.reduce((s, r) => s + Number(r.rating || 0), 0) / all.length).toFixed(1)
    : '—';

  // Stat cards
  document.getElementById('stat-cards').innerHTML = [
    statCard({ icon: sizeIcon('message', 24),   label: 'Total Reviews',   val: all.length,        boxClass: 'icon-box-blue' }),
    statCard({ icon: sizeIcon('plus', 24),      label: 'New (Awaiting)',  val: newReviews.length, boxClass: 'icon-box-leaf' }),
    statCard({ icon: sizeIcon('mapPin', 24),    label: 'Trails Reviewed', val: trailsWithReviews, boxClass: 'icon-box-green' }),
    statCard({ icon: sizeIcon('star', 24),      label: 'Average Rating',  val: avgRating,         boxClass: 'icon-box-brown' })
  ].join('');

  // New / awaiting moderation section
  const newSection = document.getElementById('new-section');
  if (newReviews.length) {
    newSection.innerHTML = `
      <div class="section-banner section-banner-new">
        <div class="banner-icon">${sizeIcon('alertCircle', 24)}</div>
        <div>
          <h2>New Reviews Awaiting Moderation</h2>
          <p>${newReviews.length} ${newReviews.length === 1 ? 'review has' : 'reviews have'} been submitted recently. Review and approve, or delete if inappropriate.</p>
        </div>
      </div>
      <div class="review-card-grid">
        ${newReviews.map(r => reviewCardHtml(r, { highlight: true })).join('')}
      </div>`;
  } else {
    newSection.innerHTML = `
      <div class="section-banner section-banner-empty">
        <div class="banner-icon">${sizeIcon('shield', 24)}</div>
        <div>
          <h2>No New Reviews</h2>
          <p>All caught up! New user-submitted reviews will appear here for moderation.</p>
        </div>
      </div>`;
  }

  // All reviews section
  const allSection = document.getElementById('all-section');
  if (!all.length) {
    allSection.innerHTML = `<div class="panel"><p class="empty" style="margin:0">No reviews to show.</p></div>`;
    return;
  }
  allSection.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;gap:1rem;flex-wrap:wrap">
      <h2 style="margin:0">All Reviews</h2>
      <p style="font-size:0.875rem;color:var(--slate);margin:0">${all.length} total · sorted newest first</p>
    </div>
    <div class="review-card-grid">
      ${all.map(r => reviewCardHtml(r, { highlight: r._source === 'user' })).join('')}
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

  // Event-delegated delete buttons (covers both sections)
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-delete-review]');
    if (!btn) return;
    const card = btn.closest('.review-card');
    if (!card) return;
    if (!confirm('Delete this review? This cannot be undone.')) return;
    const source = card.getAttribute('data-source');
    const id = card.getAttribute('data-id');
    const trailId = card.getAttribute('data-trail-id');
    Reviews.remove(source, id, trailId);
    render();
  });
});
