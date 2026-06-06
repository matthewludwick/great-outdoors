/* ============================================================
   Safety page: LNT principles, 10 essentials, emergency tips
   ============================================================ */

const TEN_ESSENTIALS = [
  { category: 'Navigation', icon: '🧭', items: ['Map', 'Compass', 'GPS device or app', 'Personal locator beacon (PLB)'] },
  { category: 'Sun Protection', icon: '☀️', items: ['Sunglasses', 'Sunscreen', 'Sun-protective clothing', 'Hat with brim'] },
  { category: 'Insulation', icon: '🧥', items: ['Jacket', 'Rain gear', 'Extra layers', 'Hat and gloves'] },
  { category: 'Illumination', icon: '🔦', items: ['Headlamp or flashlight', 'Extra batteries'] },
  { category: 'First-Aid Supplies', icon: '🩹', items: ['First-aid kit', 'Personal medications', 'Insect repellent', 'Blister treatment'] },
  { category: 'Fire', icon: '🔥', items: ['Waterproof matches', 'Lighter', 'Fire starter', 'Stove for cooking'] },
  { category: 'Repair Kit & Tools', icon: '🔧', items: ['Multi-tool or knife', 'Duct tape', 'Repair supplies for gear', 'Cord or rope'] },
  { category: 'Nutrition', icon: '🍎', items: ['Extra food beyond planned meals', 'High-energy snacks', 'Emergency rations'] },
  { category: 'Hydration', icon: '💧', items: ['Water bottles', 'Water filter or purification tablets', 'Extra water'] },
  { category: 'Emergency Shelter', icon: '⛺', items: ['Emergency blanket', 'Bivy sack', 'Tarp or tent', 'Whistle for signaling'] }
];

const LNT_PRINCIPLES = [
  { title: 'Plan Ahead and Prepare', icon: '📋', description: 'Know the regulations and special concerns for the area you will visit. Prepare for extreme weather, hazards, and emergencies. Schedule your trip to avoid times of high use. Visit in small groups when possible. Repackage food to minimize waste.' },
  { title: 'Travel and Camp on Durable Surfaces', icon: '👣', description: 'Durable surfaces include established trails and campsites, rock, gravel, dry grasses, or snow. Protect riparian areas by camping at least 200 feet from lakes and streams. Good campsites are found, not made. Keep campsites small and focus activity in areas where vegetation is absent.' },
  { title: 'Dispose of Waste Properly', icon: '🗑️', description: 'Pack it in, pack it out. Inspect your campsite for trash or spilled foods. Pack out all trash, leftover food, and litter. Deposit solid human waste in catholes dug 6-8 inches deep, at least 200 feet from water, camp, and trails. Pack out toilet paper and hygiene products.' },
  { title: 'Leave What You Find', icon: '🌿', description: 'Preserve the past: examine, photograph, but do not touch cultural or historic structures and artifacts. Leave rocks, plants, and other natural objects as you find them. Avoid introducing or transporting non-native species. Do not build structures or furniture or dig trenches.' },
  { title: 'Minimize Campfire Impacts', icon: '🔥', description: 'Campfires can cause lasting impacts to the environment. Use a lightweight stove for cooking and enjoy a candle lantern for light. Where fires are permitted, use established fire rings, fire pans, or mound fires. Keep fires small. Burn all wood and coals to ash, put out campfires completely, then scatter cool ashes.' },
  { title: 'Respect Wildlife', icon: '🦌', description: 'Observe wildlife from a distance. Do not follow or approach them. Never feed animals. Feeding wildlife damages their health, alters natural behaviors, and exposes them to predators and other dangers. Protect wildlife and your food by storing rations and trash securely.' },
  { title: 'Be Considerate of Other Visitors', icon: '🤝', description: 'Respect other visitors and protect the quality of their experience. Be courteous. Yield to other users on the trail. Step to the downhill side of the trail when encountering pack stock. Take breaks and camp away from trails and other visitors. Let the sounds of nature prevail. Avoid loud voices and noises.' }
];

const EMERGENCY_TIPS = [
  { title: 'Before You Go', tips: ['Share your hiking plan with someone who will not be with you', 'Check weather forecasts and trail conditions', 'Know your physical limits and abilities', 'Research the trail difficulty and distance'] },
  { title: 'On the Trail', tips: ['Stay on marked trails to avoid getting lost', 'Turn back if weather conditions worsen', 'Pace yourself and take regular breaks', 'Monitor yourself and others for signs of fatigue or distress'] },
  { title: 'If You Get Lost', tips: ['Stay calm and stay put if you are completely lost', 'Use your whistle: 3 blasts is the universal distress signal', 'Stay warm and dry using your emergency shelter', 'Conserve your phone battery for emergency calls only'] },
  { title: 'Wildlife Encounters', tips: ['Make noise while hiking to avoid surprising animals', 'Keep a safe distance - use zoom lenses for photos', 'Never run from a bear; back away slowly while facing it', 'Carry bear spray in bear country and know how to use it'] }
];

document.addEventListener('DOMContentLoaded', () => {
  // Section heading icons
  document.getElementById('hero-shield').innerHTML  = sizeIcon('shield', 48);
  document.getElementById('leaf-head').innerHTML    = sizeIcon('leaf', 28);
  document.getElementById('backpack-head').innerHTML= sizeIcon('backpack', 28);
  document.getElementById('alert-head').innerHTML   = sizeIcon('alertTri', 28);
  document.getElementById('phone-head').innerHTML   = sizeIcon('phone', 28);

  // LNT principles
  document.getElementById('principles-grid').innerHTML = LNT_PRINCIPLES.map(p => `
    <div class="principle">
      <div class="head">
        <span class="icon">${p.icon}</span>
        <h3>${escapeHtml(p.title)}</h3>
      </div>
      <p>${escapeHtml(p.description)}</p>
    </div>`).join('');

  // 10 Essentials
  document.getElementById('essentials-grid').innerHTML = TEN_ESSENTIALS.map(e => `
    <div class="essential">
      <div class="head">
        <span class="icon">${e.icon}</span>
        <h3>${escapeHtml(e.category)}</h3>
      </div>
      <ul>${e.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>
    </div>`).join('');

  // Emergency tips
  document.getElementById('emergency-grid').innerHTML = EMERGENCY_TIPS.map(s => `
    <div class="emerg-section">
      <h3>${escapeHtml(s.title)}</h3>
      <ul>${s.tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
    </div>`).join('');
});
