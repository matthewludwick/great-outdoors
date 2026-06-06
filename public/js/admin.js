/* ============================================================
   Admin Dashboard
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Guard: admins only. Send logged-in non-admins home (not back through login).
  if (!Auth.isAdmin()) {
    window.location.replace(Auth.user() ? 'index.html' : 'login.html');
    return;
  }

  document.getElementById('ic-settings').innerHTML = sizeIcon('settings', 16);
  const reviewsIcon = document.getElementById('ic-reviews');
  if (reviewsIcon) reviewsIcon.innerHTML = sizeIcon('message', 16);

  const trails = window.trailsData;
  const totalTrails = trails.length;
  const hiddenGems = trails.filter(t => t.isHiddenGem).length;
  const popularTrails = totalTrails - hiddenGems;
  const avgDistance = (trails.reduce((s, t) => s + t.distance, 0) / totalTrails).toFixed(1);
  const avgElevation = Math.round(trails.reduce((s, t) => s + t.elevationGain, 0) / totalTrails);

  const counts = {
    Easy: trails.filter(t => t.difficulty === 'Easy').length,
    Moderate: trails.filter(t => t.difficulty === 'Moderate').length,
    Hard: trails.filter(t => t.difficulty === 'Hard').length
  };

  // Stat cards
  const stats = [
    { box: 'icon-box-green', icon: sizeIcon('mapPin', 24),    label: 'Total Trails',  val: totalTrails },
    { box: 'icon-box-brown', icon: sizeIcon('trending', 24),  label: 'Hidden Gems',   val: hiddenGems },
    { box: 'icon-box-blue',  icon: sizeIcon('bar', 24),       label: 'Avg Distance',  val: `${avgDistance} mi` },
    { box: 'icon-box-leaf',  icon: sizeIcon('users', 24),     label: 'Avg Elevation', val: `${formatNum(avgElevation)} ft` }
  ];
  document.getElementById('stats-grid').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="icon-box ${s.box}">${s.icon}</div>
      <div>
        <p class="label">${s.label}</p>
        <p class="val">${s.val}</p>
      </div>
    </div>`).join('');

  // Difficulty rows
  document.getElementById('difficulty-rows').innerHTML = ['Easy', 'Moderate', 'Hard'].map(d => `
    <div class="row">
      <div class="top"><span class="lbl">${d}</span><span class="val">${counts[d]} trails</span></div>
      <div class="bar bar-${d}"><div style="width:${(counts[d] / totalTrails) * 100}%"></div></div>
    </div>`).join('');

  // Categories
  document.getElementById('categories').innerHTML = `
    <div class="cat-row">
      <div><p class="name">Popular Trails</p><p class="desc">Featured on main page</p></div>
      <span class="num green">${popularTrails}</span>
    </div>
    <div class="cat-row">
      <div><p class="name">Hidden Gems</p><p class="desc">Lesser-known destinations</p></div>
      <span class="num brown">${hiddenGems}</span>
    </div>
    <div class="cat-row">
      <div><p class="name">With Permits</p><p class="desc">Require passes or permits</p></div>
      <span class="num green">${trails.filter(t => t.permitInfo).length}</span>
    </div>`;

  // Trails table
  document.getElementById('trails-tbody').innerHTML = trails.map(t => `
    <tr>
      <td class="ink">${escapeHtml(t.name)}</td>
      <td>${escapeHtml(t.location || '')}</td>
      <td><span class="tag-soft tag-${t.difficulty}">${t.difficulty}</span></td>
      <td>${t.distance} mi</td>
      <td>${t.isHiddenGem ? '<span class="tag-gem">Hidden Gem</span>' : ''}</td>
    </tr>`).join('');
});
