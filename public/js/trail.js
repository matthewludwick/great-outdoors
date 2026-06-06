/* ============================================================
   Trail detail page
   ============================================================ */

/* In-page state for reviews (mirrors the React useState pattern). */
let _trail = null;
let _reviews = [];
let _newRating = 5;
let _langError = '';

function weatherIconFor(condition) {
  switch (condition) {
    case 'sunny':  return sizeIcon('sun', 32, 'wx-sunny');
    case 'cloudy': return sizeIcon('cloud', 32, 'wx-cloudy');
    case 'rainy':  return sizeIcon('cloudRain', 32, 'wx-rainy');
    case 'snowy':  return sizeIcon('cloudSnow', 32, 'wx-snowy');
    case 'windy':  return sizeIcon('wind', 32, 'wx-windy');
    default:       return sizeIcon('cloud', 32);
  }
}

function defaultForecast() {
  return [
    { day: 'Mon', high: 65, low: 48, condition: 'sunny',  precipitation: 0 },
    { day: 'Tue', high: 62, low: 45, condition: 'cloudy', precipitation: 10 },
    { day: 'Wed', high: 58, low: 43, condition: 'rainy',  precipitation: 70 },
    { day: 'Thu', high: 60, low: 44, condition: 'cloudy', precipitation: 20 },
    { day: 'Fri', high: 67, low: 49, condition: 'sunny',  precipitation: 5 }
  ];
}

function weatherHtml(location) {
  const forecast = defaultForecast();
  const cells = forecast.map(d => `
    <div class="weather-day">
      <div class="name">${d.day}</div>
      <div class="icon-wrap">${weatherIconFor(d.condition)}</div>
      <div class="cond">${d.condition.charAt(0).toUpperCase() + d.condition.slice(1)}</div>
      <div class="temps"><span class="hi">${d.high}°</span><span class="lo">${d.low}°</span></div>
      ${d.precipitation > 0 ? `<div class="prec">${d.precipitation}% 💧</div>` : ''}
    </div>`).join('');

  return `
    <div class="weather-card">
      <h3>5-Day Weather Forecast</h3>
      <p class="loc">${escapeHtml(location)}</p>
      <div class="weather-grid">${cells}</div>
      <p class="note">⚠️ Weather forecast is for planning purposes. Always check current conditions before your hike.</p>
    </div>`;
}

function mapHtml(name, coords, location) {
  // Use OpenStreetMap embed — no API key required.
  const lat = coords.lat, lng = coords.lng;
  const d = 0.05;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return `
    <div class="map-card">
      <div class="map-head">
        <h3>${sizeIcon('mapPin', 20)} Trailhead Location</h3>
        <p class="loc">${escapeHtml(location || name)}</p>
        <p class="coords">${lat.toFixed(4)}°, ${lng.toFixed(4)}°</p>
      </div>
      <iframe src="${embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of ${escapeHtml(name)}"></iframe>
      <div class="map-foot">
        <a class="btn btn-primary btn-block" href="${directionsUrl}" target="_blank" rel="noopener noreferrer">
          ${sizeIcon('external', 16)}
          Get Directions in Google Maps
        </a>
      </div>
    </div>`;
}

function reviewHtml(r) {
  const dateStr = new Date(r.date).toLocaleDateString();
  const userLink = r.username
    ? `<a class="name" href="profile.html?u=${encodeURIComponent(r.username)}">${escapeHtml(r.username)}</a>`
    : `<span class="name">anonymous</span>`;
  return `
    <div class="review">
      <div class="head">
        <div>
          <div class="who">${userLink}<span class="date">${dateStr}</span></div>
          ${renderStars(r.rating, { size: 'sm' })}
        </div>
      </div>
      <p>${escapeHtml(r.comment)}</p>
      ${r.helpfulCount ? `<div class="helpful">${sizeIcon('thumbsUp', 16)}<span>${r.helpfulCount} people found this helpful</span></div>` : ''}
    </div>`;
}

function reviewFormHtml() {
  const u = Auth.user();
  if (!u) {
    return `
      <div class="login-prompt">
        <p>Want to leave a review?</p>
        <a href="login.html">Log in to share your experience</a>
      </div>`;
  }

  const stars = [1, 2, 3, 4, 5].map(n => {
    const cls = n <= _newRating ? 'star-full' : 'star-empty';
    const svg = ICON.star.replace('<svg ', `<svg class="${cls}" `);
    return `<button type="button" data-rating="${n}" aria-label="Rate ${n} stars">${svg}</button>`;
  }).join('');

  return `
    <div class="review-form">
      <h3>Write a Review</h3>
      <form id="review-form">
        <div class="mb-2">
          <label>Your Rating</label>
          <div class="star-input" id="star-input">${stars}</div>
        </div>
        <div class="mb-2">
          <label for="review-comment">Your Review</label>
          <textarea id="review-comment" name="comment" placeholder="Share your experience on this trail..." required class="${_langError ? 'err' : ''}"></textarea>
          ${_langError
            ? `<div class="lang-error">${sizeIcon('alertCircle', 16)}<span>${escapeHtml(_langError)}</span></div>`
            : ''}
        </div>
        <button type="submit" class="btn btn-primary" id="submit-review">Submit Review</button>
      </form>
    </div>`;
}

function renderReviewsSection() {
  const host = document.getElementById('reviews-section');
  if (!host || !_trail) return;
  const sum = _trail.averageRating;
  const summary = sum
    ? `<div style="display:flex;align-items:center;gap:0.75rem">
         ${renderStars(sum, { size: 'lg', showNumber: true })}
         <span style="font-size:0.875rem;color:var(--slate)">Based on ${_reviews.length} ${_reviews.length === 1 ? 'review' : 'reviews'}</span>
       </div>`
    : '';

  host.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <div>
        <h2 class="mb-1">Trail Reviews</h2>
        ${summary}
      </div>
    </div>
    <div id="review-form-host">${reviewFormHtml()}</div>
    ${_reviews.length
      ? `<div class="review-list">${_reviews.map(reviewHtml).join('')}</div>`
      : `<p class="empty">No reviews yet. Be the first to review this trail!</p>`}
  `;

  // Wire up form events
  const formHost = document.getElementById('review-form-host');
  if (!formHost) return;
  const starInput = document.getElementById('star-input');
  if (starInput) {
    starInput.addEventListener('click', e => {
      const btn = e.target.closest('button[data-rating]');
      if (!btn) return;
      _newRating = parseInt(btn.getAttribute('data-rating'), 10);
      // Just repaint the form (preserves typed comment by reading it out first)
      const ta = document.getElementById('review-comment');
      const txt = ta ? ta.value : '';
      formHost.innerHTML = reviewFormHtml();
      const ta2 = document.getElementById('review-comment');
      if (ta2) ta2.value = txt;
      attachFormHandlers();
    });
  }
  attachFormHandlers();
}

function attachFormHandlers() {
  const ta = document.getElementById('review-comment');
  if (ta) {
    ta.addEventListener('input', () => {
      const text = ta.value;
      if (containsBadLanguage(text)) {
        _langError = `Please remove inappropriate language: ${getDetectedBadWords(text).join(', ')}`;
      } else {
        _langError = '';
      }
      const formHost = document.getElementById('review-form-host');
      const cursor = ta.selectionStart;
      const val = ta.value;
      formHost.innerHTML = reviewFormHtml();
      const ta2 = document.getElementById('review-comment');
      if (ta2) {
        ta2.value = val;
        ta2.focus();
        try { ta2.setSelectionRange(cursor, cursor); } catch (e) {}
      }
      attachFormHandlers();
    });
  }
  const form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const u = Auth.user();
      const text = document.getElementById('review-comment').value.trim();
      if (!u || !text) return;
      if (containsBadLanguage(text)) {
        _langError = `Cannot submit review with inappropriate language: ${getDetectedBadWords(text).join(', ')}`;
        renderReviewsSection();
        return;
      }
      // Persist via the Reviews helper (localStorage now, real DB later)
      Reviews.add({
        trailId: _trail.id,
        username: u.username,
        rating: _newRating,
        comment: text
      });
      _reviews = Reviews.forTrail(_trail.id);
      _newRating = 5;
      _langError = '';
      renderReviewsSection();
    });
  }
}

function renderTrail(t) {
  _trail = t;
  // Merged list: baked-in + user-submitted, minus admin-deleted
  _reviews = Reviews.forTrail(t.id);

  const isHiddenGem = !!t.isHiddenGem;
  const featuresHtml = (t.features && t.features.length)
    ? `<section>
         <h3>Trail Features</h3>
         <div class="feature-tags">${t.features.map(f => `<span class="feature-tag">${escapeHtml(f)}</span>`).join('')}</div>
       </section>`
    : '';

  const elevHtml = t.trailheadElevation
    ? `<section>
         <h3>Elevation Profile</h3>
         <div class="elev-grid">
           <div class="elev-card"><div class="label">Trailhead Elevation</div><div class="val">${formatNum(t.trailheadElevation)} ft</div></div>
           ${t.peakElevation
             ? `<div class="elev-card"><div class="label">Peak Elevation</div><div class="val">${formatNum(t.peakElevation)} ft</div></div>`
             : ''}
         </div>
       </section>`
    : '';

  const permitHtml = t.permitInfo
    ? `<div class="callout callout-amber">
         ${sizeIcon('ticket', 20)}
         <div><h4>Permit Required</h4><p>${escapeHtml(t.permitInfo)}</p></div>
       </div>`
    : '';
  const parkingHtml = t.parkingInfo
    ? `<div class="callout callout-parking">
         ${sizeIcon('parking', 20)}
         <div><h4>Parking Information</h4><p>${escapeHtml(t.parkingInfo)}</p></div>
       </div>`
    : '';

  const tourHtml = (t.guidedTours && t.guidedTours.length)
    ? `<section>
         <h3>Guided Tour Options</h3>
         <div class="callout callout-parking" style="display:block">
           <div style="display:flex;gap:0.75rem;align-items:flex-start;margin-bottom:0.75rem">
             ${sizeIcon('users', 20)}
             <p style="font-size:0.875rem;color:var(--slate);margin:0">Consider a guided tour if you're new to hiking or want expert knowledge about the area.</p>
           </div>
           <div class="tour-list">
             ${t.guidedTours.map(tr => `
               <a class="tour-link" href="${escapeHtml(tr.url)}" target="_blank" rel="noopener noreferrer">
                 <span>${escapeHtml(tr.name)}</span>
                 ${sizeIcon('external', 16)}
               </a>`).join('')}
           </div>
         </div>
       </section>`
    : '';

  document.getElementById('trail-root').innerHTML = `
    <div class="container-5xl">
      <a class="back-link" href="index.html">${sizeIcon('arrowLeft', 20)} Back to all trails</a>
    </div>

    <div class="trail-hero">
      <img src="${t.image}" alt="${escapeHtml(t.name)}">
      <div class="grad"></div>
      <div class="title-wrap">
        <div class="inner">
          <div class="badges">
            <span class="diff-pill diff-${t.difficulty}">${t.difficulty}</span>
            ${isHiddenGem ? `<span class="gem-pill">Hidden Gem</span>` : ''}
          </div>
          <h1>${escapeHtml(t.name)}</h1>
          ${t.location ? `<div class="loc">${sizeIcon('mapPin', 20)} <span>${escapeHtml(t.location)}</span></div>` : ''}
        </div>
      </div>
    </div>

    <div id="trail-list-actions"></div>

    <div class="trail-stats">
      <div class="container-5xl">
        <div class="grid">
          <div class="stat">
            <div class="label">${sizeIcon('navigation', 20)} Distance</div>
            <p class="val">${t.distance} mi</p>
          </div>
          <div class="stat">
            <div class="label">${sizeIcon('trending', 20)} Elev. Gain</div>
            <p class="val">${formatNum(t.elevationGain)} ft</p>
          </div>
          <div class="stat">
            <div class="label">${sizeIcon('mountain', 20)} Route Type</div>
            <p class="val">${escapeHtml(t.routeType || 'Out & Back')}</p>
          </div>
          <div class="stat">
            <div class="label">${sizeIcon('mountain', 20)} Peak Elev.</div>
            <p class="val">${t.peakElevation ? formatNum(t.peakElevation) + ' ft' : 'N/A'}</p>
          </div>
          ${t.averageRating
            ? `<div class="stat">
                 <div class="label">${ICON.star.replace('<svg ', '<svg class="star-full" ').replace('width="24" height="24"', 'width="20" height="20"')} Rating</div>
                 <div>${renderStars(t.averageRating, { size: 'sm', showNumber: true })}</div>
               </div>`
            : ''}
        </div>
      </div>
    </div>

    <div class="container-5xl">
      <div class="trail-main">
        <div class="col-main">
          <section>
            <h2>About This Trail</h2>
            <p>${escapeHtml(t.description || 'No description available for this trail.')}</p>
          </section>

          ${featuresHtml}

          <section>${weatherHtml(t.location || t.name)}</section>

          ${elevHtml}

          <section>
            <h3>Permits &amp; Parking</h3>
            <div style="display:flex;flex-direction:column;gap:1rem">
              ${permitHtml}
              ${parkingHtml}
            </div>
          </section>

          ${t.coordinates
            ? `<section><h3>Getting There</h3>${mapHtml(t.name, t.coordinates, t.location)}</section>`
            : ''}

          ${tourHtml}

          <section>
            <div class="callout callout-blue" style="display:flex">
              ${sizeIcon('shield', 24)}
              <div>
                <h4>Hiking Safety Resources</h4>
                <p style="margin-bottom:0.75rem">Make sure you're prepared with the 10 Essentials and understand Leave No Trace principles before hitting the trail.</p>
                <a href="safety.html" style="display:inline-flex;gap:0.5rem;align-items:center;color:var(--blue-700);text-decoration:underline">
                  Read the Complete Safety Guide
                  ${sizeIcon('external', 16)}
                </a>
              </div>
            </div>
          </section>

          <section>
            <div class="support-box">
              ${sizeIcon('heart', 32, 'heart')}
              <h3>Support Us</h3>
              <p>Help us keep this site running and continue providing valuable trail information for the hiking community. Your support helps cover hosting, maintenance, and development costs.</p>
              <a class="btn btn-light" href="https://www.paypal.com/" target="_blank" rel="noopener noreferrer">Make a Donation</a>
            </div>
          </section>

          <section id="reviews-section"></section>
        </div>

        <aside class="col-side">
          <div class="trail-sidebar">
            <div class="before-you-go">
              <h3>Before You Go</h3>
              <ul>
                <li>• Review weather forecast above</li>
                <li>• Check trail conditions</li>
                <li>• Bring plenty of water</li>
                <li>• Carry <a href="safety.html">the 10 Essentials</a></li>
                <li>• Pack out all trash</li>
                <li>• Stay on marked trails</li>
                <li>• Share your hiking plan</li>
              </ul>
              <a class="footer-link" href="safety.html">Safety Guide &amp; Emergency Contacts</a>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <div class="related-wrap">
      <div class="container-5xl">
        <h2 class="mb-2">Similar Trails</h2>
        <div class="related-grid">${
          window.trailsData
            .filter(rt => rt.id !== t.id && rt.difficulty === t.difficulty)
            .slice(0, 3)
            .map(rt => `
              <a class="related-card" href="trail.html?id=${rt.id}">
                <img src="${rt.image}" alt="${escapeHtml(rt.name)}" loading="lazy">
                <div class="body">
                  <h4>${escapeHtml(rt.name)}</h4>
                  <div class="meta"><span>${rt.distance} mi</span><span>•</span><span>${formatNum(rt.elevationGain)} ft</span></div>
                </div>
              </a>`).join('')
        }</div>
      </div>
    </div>
  `;

  renderReviewsSection();
  renderListActions();
}

function renderListActions() {
  const host = document.getElementById('trail-list-actions');
  if (!host || !_trail) return;
  const u = Auth.user();
  // Only show for logged-in non-admin users
  if (!u || u.role === 'admin') {
    host.innerHTML = '';
    return;
  }
  const wished = Lists.isOnWishlist(u.username, _trail.id);
  const done = Lists.isCompleted(u.username, _trail.id);
  host.innerHTML = `
    <div class="trail-list-actions container-5xl">
      <button class="trail-action-btn ${wished ? 'is-active' : ''}" id="btn-wishlist" type="button">
        ${sizeIcon(wished ? 'bookmarkFill' : 'bookmark', 18)}
        <span>${wished ? 'On wishlist' : 'Add to wishlist'}</span>
      </button>
      <button class="trail-action-btn ${done ? 'is-active' : ''}" id="btn-completed" type="button">
        ${sizeIcon(done ? 'checkCircleFill' : 'checkCircle', 18)}
        <span>${done ? 'Completed' : 'Mark completed'}</span>
      </button>
    </div>`;
  document.getElementById('btn-wishlist').addEventListener('click', () => {
    Lists.toggleWishlist(u.username, _trail.id);
    renderListActions();
  });
  document.getElementById('btn-completed').addEventListener('click', () => {
    Lists.toggleCompleted(u.username, _trail.id);
    renderListActions();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const id = Number(getQueryParam('id'));
  const t = window.trailsData.find(x => x.id === id);
  if (!t) { window.location.replace('index.html'); return; }
  renderTrail(t);
});
