/* ============================================================
   Admin Trails — CRUD for trails (in-memory only) and review
   moderation modal.
   ============================================================ */

let _trails = null;   // working copy, derived from window.trailsData
let _mode = 'none';   // 'none' | 'add' | 'edit'
let _draft = null;    // the trail object being added/edited
let _modal = null;    // { trailId, reviews } | null

function blankTrail() {
  return {
    name: '', image: '', difficulty: 'Moderate', distance: 0, elevationGain: 0,
    isHiddenGem: false, description: '', location: '', routeType: 'Out & Back',
    features: [], coordinates: { lat: 0, lng: 0 },
    trailheadElevation: 0, peakElevation: 0,
    permitInfo: '', parkingInfo: '', guidedTours: [], weatherNote: ''
  };
}

/* ---------- Renderers ---------- */
function renderTable() {
  document.getElementById('trails-tbody').innerHTML = _trails.map(t => `
    <tr>
      <td class="ink">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span>${escapeHtml(t.name)}</span>
          ${t.isHiddenGem ? '<span class="tag-gem">Gem</span>' : ''}
        </div>
      </td>
      <td>${escapeHtml(t.location || '')}</td>
      <td><span class="tag-soft tag-${t.difficulty}">${t.difficulty}</span></td>
      <td>${t.distance} mi</td>
      <td>${
        (t.reviews && t.reviews.length)
          ? `<button class="icon-btn comments" data-view-reviews="${t.id}" title="View reviews">${sizeIcon('message', 16)}<span>${t.reviews.length}</span></button>`
          : '<span style="font-size:0.875rem;color:var(--slate)">0</span>'
      }</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn edit" data-edit="${t.id}" title="Edit trail">${sizeIcon('edit', 16)}</button>
          <button class="icon-btn del"  data-delete="${t.id}" title="Delete trail">${sizeIcon('trash', 16)}</button>
        </div>
      </td>
    </tr>`).join('');
}

function renderForm() {
  const host = document.getElementById('form-host');
  if (_mode === 'none' || !_draft) { host.innerHTML = ''; return; }
  const isEdit = _mode === 'edit';
  const d = _draft;
  host.innerHTML = `
    <div class="trail-form">
      <h3>${isEdit ? 'Edit Trail' : 'Add New Trail'}</h3>

      <div class="form-row">
        <div class="field"><label>Trail Name *</label><input class="input" data-field="name" value="${escapeHtml(d.name)}" placeholder="Mount Si"></div>
        <div class="field"><label>Location *</label><input class="input" data-field="location" value="${escapeHtml(d.location || '')}" placeholder="North Bend, WA"></div>
        <div class="field"><label>Image URL *</label><input class="input" data-field="image" value="${escapeHtml(d.image || '')}" placeholder="images/trails/your-image.svg"></div>
        <div class="field"><label>Difficulty *</label>
          <select data-field="difficulty">
            <option value="Easy"${d.difficulty === 'Easy' ? ' selected' : ''}>Easy</option>
            <option value="Moderate"${d.difficulty === 'Moderate' ? ' selected' : ''}>Moderate</option>
            <option value="Hard"${d.difficulty === 'Hard' ? ' selected' : ''}>Hard</option>
          </select>
        </div>
        <div class="field"><label>Distance (miles) *</label><input class="input" type="number" step="0.1" data-field="distance" value="${d.distance}"></div>
        <div class="field"><label>Elevation Gain (ft) *</label><input class="input" type="number" data-field="elevationGain" value="${d.elevationGain}"></div>
        <div class="field"><label>Route Type</label><input class="input" data-field="routeType" value="${escapeHtml(d.routeType || '')}" placeholder="Out & Back"></div>
        <div class="field"><label>Trailhead Elevation (ft)</label><input class="input" type="number" data-field="trailheadElevation" value="${d.trailheadElevation || ''}"></div>
        <div class="field"><label>Peak Elevation (ft)</label><input class="input" type="number" data-field="peakElevation" value="${d.peakElevation || ''}"></div>
        <div class="field"><label class="checkbox-row"><input type="checkbox" data-field="isHiddenGem"${d.isHiddenGem ? ' checked' : ''}><span>Hidden Gem</span></label></div>
      </div>

      <div class="form-row">
        <div class="field"><label>Latitude</label><input class="input" type="number" step="0.0001" data-field="lat" value="${(d.coordinates && d.coordinates.lat) || ''}"></div>
        <div class="field"><label>Longitude</label><input class="input" type="number" step="0.0001" data-field="lng" value="${(d.coordinates && d.coordinates.lng) || ''}"></div>
      </div>

      <div class="field-block"><label>Description</label><textarea data-field="description" placeholder="Trail description...">${escapeHtml(d.description || '')}</textarea></div>
      <div class="field-block"><label>Features (comma-separated)</label><input class="input" data-field="features" value="${escapeHtml((d.features || []).join(', '))}" placeholder="Alpine lake, Mountain views, Waterfalls"></div>
      <div class="field-block"><label>Permit Information</label><textarea data-field="permitInfo" placeholder="Northwest Forest Pass required...">${escapeHtml(d.permitInfo || '')}</textarea></div>
      <div class="field-block"><label>Parking Information</label><textarea data-field="parkingInfo" placeholder="Large parking lot...">${escapeHtml(d.parkingInfo || '')}</textarea></div>
      <div class="field-block"><label>Weather Note</label><textarea data-field="weatherNote" placeholder="Best July-September...">${escapeHtml(d.weatherNote || '')}</textarea></div>

      <div class="actions">
        <button class="btn btn-primary" id="save-trail-btn" type="button">${sizeIcon('save', 16)} Save Trail</button>
        <button class="btn btn-gray"   id="cancel-trail-btn" type="button">${sizeIcon('close', 16)} Cancel</button>
      </div>
    </div>`;
}

function renderModal() {
  const host = document.getElementById('modal-host');
  if (!_modal) { host.innerHTML = ''; return; }
  const list = _modal.reviews.length
    ? _modal.reviews.map(r => `
        <div class="modal-review">
          <div class="head">
            <div>
              <span class="who">${escapeHtml(r.username)}</span>
              <span class="date">${escapeHtml(r.date)}</span>
              <div class="rating">Rating: ${r.rating}/5 ⭐</div>
            </div>
            <button class="icon-btn del" data-delete-review="${r.id}" title="Delete review">${sizeIcon('trash', 16)}</button>
          </div>
          <p>${escapeHtml(r.comment)}</p>
        </div>`).join('')
    : '<p class="empty">No reviews for this trail.</p>';
  host.innerHTML = `
    <div class="modal-back" id="modal-back">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-head">
          <h2 id="modal-title">Review Moderation</h2>
          <button class="icon-btn" id="close-modal-btn" title="Close">${sizeIcon('close', 20)}</button>
        </div>
        <div class="modal-body">${list}</div>
      </div>
    </div>`;
}

/* ---------- Event handlers ---------- */
function attachAllHandlers() {
  // Add button
  document.getElementById('add-trail-btn').addEventListener('click', () => {
    _mode = 'add';
    _draft = blankTrail();
    renderForm();
    attachFormHandlers();
  });

  // Table actions
  document.getElementById('trails-tbody').addEventListener('click', e => {
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      const id = Number(editBtn.getAttribute('data-edit'));
      const t = _trails.find(x => x.id === id);
      if (t) {
        _mode = 'edit';
        // Deep-ish clone so we don't mutate while typing
        _draft = JSON.parse(JSON.stringify(t));
        renderForm();
        attachFormHandlers();
        // Scroll to form
        document.getElementById('form-host').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    const delBtn = e.target.closest('[data-delete]');
    if (delBtn) {
      const id = Number(delBtn.getAttribute('data-delete'));
      if (confirm('Are you sure you want to delete this trail?')) {
        _trails = _trails.filter(t => t.id !== id);
        renderTable();
      }
      return;
    }
    const viewBtn = e.target.closest('[data-view-reviews]');
    if (viewBtn) {
      const id = Number(viewBtn.getAttribute('data-view-reviews'));
      const t = _trails.find(x => x.id === id);
      if (t) {
        _modal = { trailId: id, reviews: (t.reviews || []).slice() };
        renderModal();
        attachModalHandlers();
      }
    }
  });
}

function readDraftFromForm() {
  const fields = document.querySelectorAll('[data-field]');
  const draft = { ..._draft };
  if (!draft.coordinates) draft.coordinates = { lat: 0, lng: 0 };
  fields.forEach(el => {
    const f = el.getAttribute('data-field');
    let v;
    if (el.type === 'checkbox') v = el.checked;
    else if (el.type === 'number') v = el.value === '' ? 0 : (el.step === '0.1' || el.step === '0.0001' ? parseFloat(el.value) : parseInt(el.value, 10));
    else v = el.value;
    if (f === 'lat') { draft.coordinates = { ...draft.coordinates, lat: parseFloat(el.value) || 0 }; return; }
    if (f === 'lng') { draft.coordinates = { ...draft.coordinates, lng: parseFloat(el.value) || 0 }; return; }
    if (f === 'features') {
      draft.features = (el.value || '').split(',').map(s => s.trim()).filter(Boolean);
      return;
    }
    draft[f] = v;
  });
  return draft;
}

function attachFormHandlers() {
  const save = document.getElementById('save-trail-btn');
  const cancel = document.getElementById('cancel-trail-btn');
  if (!save) return;

  save.addEventListener('click', () => {
    const draft = readDraftFromForm();
    if (_mode === 'add') {
      const nextId = (_trails.reduce((m, t) => Math.max(m, t.id), 0) || 0) + 1;
      _trails.push({ ...draft, id: nextId, reviews: [], averageRating: 0 });
    } else {
      _trails = _trails.map(t => t.id === _draft.id ? { ...t, ...draft } : t);
    }
    _mode = 'none';
    _draft = null;
    renderForm();
    renderTable();
  });

  cancel.addEventListener('click', () => {
    _mode = 'none';
    _draft = null;
    renderForm();
  });
}

function attachModalHandlers() {
  const back = document.getElementById('modal-back');
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    _modal = null;
    renderModal();
  });
  // Click outside modal to close
  back.addEventListener('click', e => {
    if (e.target === back) {
      _modal = null;
      renderModal();
    }
  });
  // Delete review buttons
  back.addEventListener('click', e => {
    const btn = e.target.closest('[data-delete-review]');
    if (!btn) return;
    const reviewId = Number(btn.getAttribute('data-delete-review'));
    if (confirm('Are you sure you want to delete this review?')) {
      // Update _trails
      _trails = _trails.map(t => {
        if (t.id !== _modal.trailId) return t;
        const updated = (t.reviews || []).filter(r => r.id !== reviewId);
        const avg = updated.length ? updated.reduce((s, r) => s + r.rating, 0) / updated.length : 0;
        return { ...t, reviews: updated, averageRating: avg };
      });
      // Update modal
      _modal.reviews = _modal.reviews.filter(r => r.id !== reviewId);
      renderModal();
      renderTable();
      attachModalHandlers();
    }
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isAdmin()) {
    window.location.replace(Auth.user() ? 'index.html' : 'login.html');
    return;
  }
  document.getElementById('ic-arrow').innerHTML = sizeIcon('arrowLeft', 16);
  document.getElementById('ic-plus').innerHTML  = sizeIcon('plus', 16);

  // Working copy of trails (deep clone)
  _trails = JSON.parse(JSON.stringify(window.trailsData));
  renderTable();
  attachAllHandlers();
});
