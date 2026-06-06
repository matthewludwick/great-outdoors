/* ============================================================
   Profile page
   - Shows the profile for ?u=<username> (or the logged-in user if no ?u=)
   - Edit mode is available only for your own profile (you're logged in
     and ?u= matches your username, OR no ?u= and you're a non-admin user)
   - Renders bio, location, completed hikes, wishlist (next adventures),
     and a mini list of recent reviews by that user
   ============================================================ */

let _editMode = false;
let _profile = null;
let _username = null;

function miniTrailCard(t) {
  const badges = renderListStatusBadges(t.id);
  return `
    <a class="mini-trail-card" href="trail.html?id=${t.id}">
      <div class="mini-trail-img">
        <img src="${t.image}" alt="${escapeHtml(t.name)}" loading="lazy">
        ${badges}
      </div>
      <div class="mini-trail-body">
        <h4>${escapeHtml(t.name)}</h4>
        <div class="mini-trail-meta">
          <span class="diff-pill diff-${t.difficulty}">${t.difficulty}</span>
          <span>${t.distance} mi</span>
        </div>
      </div>
    </a>`;
}

function trailListSection({ title, icon, ids, emptyText }) {
  const trails = (ids || []).map(id => (window.trailsData || []).find(t => t.id === id)).filter(Boolean);
  return `
    <section class="profile-section">
      <h2>${sizeIcon(icon, 22)} ${title} <span class="profile-count">${trails.length}</span></h2>
      ${trails.length
        ? `<div class="mini-trail-grid">${trails.map(miniTrailCard).join('')}</div>`
        : `<p class="empty">${emptyText}</p>`}
    </section>`;
}

function recentReviewsSection() {
  const all = Reviews.all().filter(r => (r.username || '').toLowerCase() === (_username || '').toLowerCase());
  if (!all.length) return '';
  const items = all.slice(0, 5).map(r => {
    const d = r.date ? new Date(r.date).toLocaleDateString() : '';
    return `
      <a class="profile-review" href="trail.html?id=${r._trailId}">
        <div class="profile-review-head">
          <h4>${escapeHtml(r._trailName || 'A trail')}</h4>
          ${renderStars(r.rating || 0, { size: 'sm' })}
        </div>
        <p>${escapeHtml(r.comment || '')}</p>
        <span class="profile-review-date">${d}</span>
      </a>`;
  }).join('');
  return `
    <section class="profile-section">
      <h2>${sizeIcon('message', 22)} Recent reviews <span class="profile-count">${all.length}</span></h2>
      <div class="profile-review-list">${items}</div>
    </section>`;
}

function isEditable() {
  const u = Auth.user();
  if (!u) return false;
  if (u.role === 'admin') return false;
  return u.username.toLowerCase() === (_username || '').toLowerCase();
}

function render() {
  const root = document.getElementById('profile-root');
  const lists = Lists.get(_username);
  const editable = isEditable();
  // Suppress the viewer's-own list badges when looking at someone else's profile —
  // the trail cards on their profile reflect their lists, not yours.
  window._suppressListBadges = !editable;
  const avatarLetter = (_username || '?').charAt(0).toUpperCase();

  // Header
  const header = `
    <section class="profile-header">
      <div class="container-7xl profile-header-inner">
        <div class="profile-avatar">${escapeHtml(avatarLetter)}</div>
        <div class="profile-identity">
          ${_editMode ? '' : `
            <h1>${escapeHtml(_profile.username)}</h1>
            ${_profile.location ? `<p class="profile-location">${sizeIcon('mapPin', 16)} ${escapeHtml(_profile.location)}</p>` : ''}
            ${_profile.bio ? `<p class="profile-bio">${escapeHtml(_profile.bio)}</p>` : '<p class="profile-bio profile-bio-empty">No bio yet.</p>'}
            <p class="profile-joined">Member since ${escapeHtml(_profile.joined || '')}</p>
          `}
          ${_editMode ? `
            <form id="profile-form" class="profile-edit-form">
              <h2 style="color:#fff;margin-bottom:0.75rem">Edit Profile</h2>
              <div class="field">
                <label for="edit-location">Location</label>
                <input class="input" id="edit-location" type="text" maxlength="80"
                       value="${escapeHtml(_profile.location || '')}" placeholder="Seattle, WA">
              </div>
              <div class="field">
                <label for="edit-bio">Bio</label>
                <textarea id="edit-bio" rows="4" maxlength="500"
                          placeholder="Tell other hikers about yourself...">${escapeHtml(_profile.bio || '')}</textarea>
                <div class="field-hint"><span id="bio-count">0</span> / 500</div>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="profile-save" type="submit">${sizeIcon('save', 16)} Save</button>
                <button class="btn btn-outline" id="profile-cancel" type="button">${sizeIcon('close', 16)} Cancel</button>
              </div>
            </form>
          ` : ''}
        </div>
        ${editable && !_editMode ? `
          <button class="btn btn-light profile-edit-btn" id="profile-edit-btn" type="button">
            ${sizeIcon('edit', 16)} Edit Profile
          </button>
        ` : ''}
      </div>
    </section>`;

  // Body
  const body = `
    <div class="container-7xl profile-body">
      ${trailListSection({ title: 'Completed Hikes', icon: 'checkCircle', ids: lists.completed, emptyText: editable ? 'No hikes logged yet. Visit a trail page to mark it completed.' : 'No completed hikes yet.' })}
      ${trailListSection({ title: 'Next Adventures', icon: 'bookmark', ids: lists.wishlist, emptyText: editable ? 'Wishlist is empty. Tap the bookmark on any trail to save it.' : 'No trails on the wishlist yet.' })}
      ${recentReviewsSection()}
    </div>`;

  root.innerHTML = header + body;
  attachHandlers();
}

function attachHandlers() {
  const editBtn = document.getElementById('profile-edit-btn');
  if (editBtn) editBtn.addEventListener('click', () => { _editMode = true; render(); });

  const cancelBtn = document.getElementById('profile-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => { _editMode = false; render(); });

  const form = document.getElementById('profile-form');
  if (form) {
    const bio = document.getElementById('edit-bio');
    const counter = document.getElementById('bio-count');
    function updateCount() { if (counter && bio) counter.textContent = bio.value.length; }
    if (bio) bio.addEventListener('input', updateCount);
    updateCount();

    form.addEventListener('submit', e => {
      e.preventDefault();
      const location = document.getElementById('edit-location').value.trim();
      const bioVal = bio.value.trim();
      _profile = Profiles.save(_username, { location, bio: bioVal });
      _editMode = false;
      render();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Determine target username
  const queryUser = getQueryParam('u');
  const me = Auth.user();
  if (queryUser) {
    _username = queryUser;
  } else if (me) {
    if (me.role === 'admin') {
      // Admins don't get a profile per the design — send them home
      window.location.replace('admin.html');
      return;
    }
    _username = me.username;
  } else {
    // Not logged in and no ?u= → redirect to login
    window.location.replace('login.html');
    return;
  }

  _profile = Profiles.get(_username);
  if (!_profile) {
    // Should never happen because Profiles.get returns a blank shell, but guard anyway
    window.location.replace('index.html');
    return;
  }
  render();
});
