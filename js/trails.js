// Trail data — converted from the original React/TS data file.
// Image paths point to local files in ./images/trails/.
// To use real JPG photos: replace the SVG files with JPGs of the same base name,
// and change ".svg" to ".jpg" in this file (single search-and-replace).
window.trailsData = [
  {
    id: 1,
    name: 'Opal Creek Trail',
    image: 'images/trails/photo-1600929622034.jpg',
    difficulty: 'Easy',
    distance: 7.0,
    elevationGain: 500,
    isHiddenGem: true,
    location: 'Willamette National Forest, OR',
    routeType: 'Out & Back',
    description: 'A stunning trail through old-growth forest leading to crystal-clear Opal Creek and turquoise pools. This hidden gem offers pristine wilderness away from the crowds.',
    features: ['Old-growth forest', 'Swimming holes', 'Waterfalls', 'Historic mining sites'],
    coordinates: { lat: 44.8567, lng: -122.2344 },
    trailheadElevation: 2000,
    peakElevation: 2500,
    permitInfo: 'Northwest Forest Pass required. Available at recreation.gov or local ranger stations.',
    parkingInfo: 'Limited parking at trailhead. Arrive early on weekends. Parking area fits approximately 20 vehicles.',
    guidedTours: [
      { name: 'Oregon Hiking Tours', url: 'https://example.com/oregon-hiking' },
      { name: 'Willamette Valley Guides', url: 'https://example.com/wv-guides' }
    ],
    weatherNote: 'Trail accessible year-round but best May-October. Winter brings snow and ice. Check conditions before visiting.',
    reviews: [
      { id: 1, username: 'SarahM', rating: 5, date: '2026-04-15', comment: 'Absolutely stunning! The turquoise pools are breathtaking. Perfect for a summer swim. Went mid-week and had the place almost to ourselves.', helpfulCount: 24 },
      { id: 2, username: 'TrailRunner99', rating: 4, date: '2026-03-22', comment: 'Beautiful old-growth forest and the creek is gorgeous. Trail is well-maintained but can be muddy in spots. Parking fills up fast on weekends.', helpfulCount: 12 },
      { id: 3, username: 'NaturePhotog', rating: 5, date: '2026-02-10', comment: 'A photographer paradise! The historic mining sites add character. Water is crystal clear year-round. Highly recommend!', helpfulCount: 18 }
    ],
    averageRating: 4.7
  },
  {
    id: 2,
    name: "Sauer's Mountain",
    image: 'images/trails/photo-1630626883157.jpg',
    difficulty: 'Moderate',
    distance: 5.2,
    elevationGain: 1200,
    isHiddenGem: true,
    location: 'Columbia River Gorge, WA',
    routeType: 'Loop',
    description: 'A lesser-known loop offering spectacular views of the Columbia River Gorge without the typical crowds of more famous trails in the area.',
    features: ['Panoramic views', 'Wildflowers in spring', 'Forested sections', 'Quiet trail'],
    coordinates: { lat: 45.6789, lng: -121.8901 },
    trailheadElevation: 1500,
    peakElevation: 2700,
    permitInfo: 'No permit required. Free parking available at trailhead.',
    parkingInfo: 'Small parking area with space for 10-15 vehicles. Rarely fills up even on weekends.',
    guidedTours: [
      { name: 'Gorge Adventure Tours', url: 'https://example.com/gorge-tours' }
    ],
    weatherNote: 'Best spring through fall. Trail can be muddy after rain. Check for wildflower blooms in May-June.',
    reviews: [
      { id: 1, username: 'GorgeExplorer', rating: 5, date: '2026-05-01', comment: 'Such a hidden gem! Amazing views without the crowds. The wildflowers in May were spectacular. Highly recommend!', helpfulCount: 16 },
      { id: 2, username: 'QuietTrails', rating: 4, date: '2026-04-18', comment: 'Peaceful hike with great payoff. Only saw 3 other groups all day. Trail is well-marked and maintained.', helpfulCount: 11 }
    ],
    averageRating: 4.5
  },
  {
    id: 3,
    name: 'Little Si Trail',
    image: 'images/trails/photo-1621863200562.jpg',
    difficulty: 'Moderate',
    distance: 4.7,
    elevationGain: 1300,
    isHiddenGem: true,
    location: 'North Bend, WA',
    routeType: 'Out & Back',
    description: "Little Si offers stunning views similar to its famous sibling Mount Si, but with significantly fewer hikers. Perfect for those seeking solitude.",
    features: ['Mountain views', 'Rocky summit', 'Less crowded', 'Year-round access'],
    coordinates: { lat: 47.4881, lng: -121.7453 },
    trailheadElevation: 600,
    peakElevation: 1576,
    permitInfo: 'Discover Pass required for parking. Purchase at discoverpass.wa.gov.',
    parkingInfo: 'Moderate-sized parking lot. Less crowded than nearby Mount Si. Usually fills by mid-morning on weekends.',
    guidedTours: [
      { name: 'Seattle Hiking Club', url: 'https://example.com/seattle-hiking' }
    ],
    weatherNote: 'Accessible year-round. Lower elevation makes it a good winter option when higher trails have snow.',
    reviews: [
      { id: 1, username: 'MountainNewbie', rating: 5, date: '2026-04-30', comment: 'Perfect alternative to Mount Si! Much less crowded with similar views. Great workout without the masses of people.', helpfulCount: 29 },
      { id: 2, username: 'LocalDad', rating: 4, date: '2026-04-22', comment: 'Took the kids here instead of busy Mount Si. They loved it! Rocky summit is fun to explore. Parking was easy even on Saturday.', helpfulCount: 21 },
      { id: 3, username: 'SolitudeSeeker', rating: 5, date: '2026-04-08', comment: 'Finally a trail where I can enjoy peace and quiet! Views are fantastic. This is my new go-to hike.', helpfulCount: 14 }
    ],
    averageRating: 4.7
  },
  {
    id: 4,
    name: 'Whittier Ridge',
    image: 'images/trails/photo-1630123738777.jpg',
    difficulty: 'Easy',
    distance: 3.8,
    elevationGain: 600,
    isHiddenGem: true,
    location: 'Mount Baker-Snoqualmie National Forest, WA',
    routeType: 'Out & Back',
    description: 'A gentle trail through peaceful forest with occasional viewpoints. Perfect for families and those new to hiking.',
    features: ['Family-friendly', 'Gentle grade', 'Forest canopy', 'Wildlife viewing'],
    coordinates: { lat: 47.7567, lng: -121.8233 },
    trailheadElevation: 1400,
    peakElevation: 2000,
    permitInfo: 'No permit required. Free parking available.',
    parkingInfo: 'Small parking area with room for 15-20 vehicles. Rarely crowded.',
    guidedTours: [],
    weatherNote: 'Accessible spring through fall. Trail can be muddy after rain. Great option for beginners.',
    reviews: [
      { id: 1, username: 'FamilyHike2026', rating: 5, date: '2026-05-05', comment: 'Perfect family hike! Kids ages 5 and 8 had no problem. Gentle trail with nice forest scenery. Saw deer!', helpfulCount: 19 },
      { id: 2, username: 'BeginnerHiker', rating: 4, date: '2026-04-26', comment: 'Great starter hike. Not too challenging but still felt like an accomplishment. Trail is peaceful and well-maintained.', helpfulCount: 12 }
    ],
    averageRating: 4.5
  },
  {
    id: 5,
    name: 'Mount Si',
    image: 'images/trails/photo-1696219364293.jpg',
    difficulty: 'Hard',
    distance: 8.0,
    elevationGain: 3150,
    location: 'North Bend, WA',
    routeType: 'Out & Back',
    description: 'One of the most popular hikes near Seattle, Mount Si rewards hikers with incredible views of the Snoqualmie Valley. The steep climb is challenging but worthwhile.',
    features: ['Iconic summit', 'Challenging workout', 'Haystack scramble', 'Valley views'],
    coordinates: { lat: 47.4878, lng: -121.7233 },
    trailheadElevation: 700,
    peakElevation: 3900,
    permitInfo: 'Discover Pass required for parking. Purchase at discoverpass.wa.gov or at the trailhead.',
    parkingInfo: 'Large parking lot with overflow area. Often fills by 8am on weekends. Consider carpooling or arriving early.',
    guidedTours: [
      { name: 'Seattle Hiking Club', url: 'https://example.com/seattle-hiking' },
      { name: 'Summit Adventure Guides', url: 'https://example.com/summit-guides' }
    ],
    weatherNote: 'Best hiked April-November. Snow and ice possible in winter. Afternoon clouds common in summer.',
    reviews: [
      { id: 1, username: 'MikeH', rating: 5, date: '2026-04-28', comment: 'Tough climb but the views from the top are absolutely worth it! Great conditioning hike. Get there early for parking.', helpfulCount: 45 },
      { id: 2, username: 'JennyK', rating: 4, date: '2026-04-20', comment: 'Challenging but rewarding. Trail is well-maintained. Very crowded on weekends. The Haystack scramble at the top is optional but fun!', helpfulCount: 32 },
      { id: 3, username: 'AdventureSeeker', rating: 5, date: '2026-04-10', comment: 'My go-to training hike! Elevation gain is no joke. Views of Rainier on clear days are incredible. Bring plenty of water.', helpfulCount: 28 },
      { id: 4, username: 'FirstTimer', rating: 3, date: '2026-03-15', comment: 'Beautiful trail but definitely harder than I expected. Take your time and bring snacks. Parking was a nightmare on Saturday morning.', helpfulCount: 15 },
      { id: 5, username: 'LocalHiker', rating: 4, date: '2026-03-05', comment: 'Classic PNW hike. Can get busy but the trail is wide enough. Snow still lingering in early March. Microspikes recommended.', helpfulCount: 20 }
    ],
    averageRating: 4.2
  },
  {
    id: 6,
    name: 'Rattlesnake Ledge',
    image: 'images/trails/photo-1599606843763.jpg',
    difficulty: 'Moderate',
    distance: 4.0,
    elevationGain: 1160,
    location: 'North Bend, WA',
    routeType: 'Out & Back',
    description: 'A popular trail offering stunning views of Rattlesnake Lake and the surrounding peaks. The relatively short distance makes it accessible to many hikers.',
    features: ['Lake views', 'Rocky ledge', 'Photo opportunities', 'Well-maintained'],
    coordinates: { lat: 47.4359, lng: -121.7734 },
    trailheadElevation: 960,
    peakElevation: 2080,
    permitInfo: 'Discover Pass required for parking. Purchase online at discoverpass.wa.gov.',
    parkingInfo: 'Large parking lot at Rattlesnake Lake. Fills early on weekends (by 9am). Overflow parking available. Consider carpooling or midweek visits.',
    guidedTours: [
      { name: 'Seattle Hiking Club', url: 'https://example.com/seattle-hiking' },
      { name: 'Cascade Adventures', url: 'https://example.com/cascade-adventures' }
    ],
    weatherNote: 'Accessible year-round. Can be icy in winter. Trail is exposed at the ledge - check wind conditions.',
    reviews: [
      { id: 1, username: 'FamilyHiker', rating: 5, date: '2026-04-25', comment: 'Perfect family hike! Kids loved it. Not too long but still a good workout. The view at the top is spectacular!', helpfulCount: 38 },
      { id: 2, username: 'WeekendWarrior', rating: 4, date: '2026-04-18', comment: 'Great short hike with big payoff. Gets very crowded but worth it. Bring a jacket for the ledge - can be windy!', helpfulCount: 22 },
      { id: 3, username: 'DogLover', rating: 5, date: '2026-04-05', comment: 'Dog-friendly and they loved it! Well-maintained trail. Parking lot was full at 10am on Sunday. Beautiful lake views.', helpfulCount: 19 }
    ],
    averageRating: 4.7
  },
  {
    id: 7,
    name: 'Lake 22',
    image: 'images/trails/photo-1534991199945.jpg',
    difficulty: 'Moderate',
    distance: 5.4,
    elevationGain: 1350,
    location: 'Mount Baker-Snoqualmie National Forest, WA',
    routeType: 'Out & Back',
    description: 'A beautiful trail through old-growth forest leading to a stunning alpine lake surrounded by dramatic cliffs and waterfalls.',
    features: ['Alpine lake', 'Waterfalls', 'Old-growth forest', 'Dramatic scenery'],
    coordinates: { lat: 48.0767, lng: -121.7456 },
    trailheadElevation: 1080,
    peakElevation: 2430,
    permitInfo: 'Northwest Forest Pass required. Available at recreation.gov or local ranger stations ($5 daily, $30 annual).',
    parkingInfo: 'Moderate-sized parking lot. Fills by 10am on summer weekends. Consider arriving before 8am or visiting on weekdays.',
    guidedTours: [
      { name: 'Mountain Madness', url: 'https://example.com/mountain-madness' }
    ],
    weatherNote: 'Best June-October. Snow lingers until late spring. Trail can be very muddy in shoulder seasons. Check avalanche conditions in early season.',
    reviews: [
      { id: 1, username: 'AlpineLover', rating: 5, date: '2026-05-03', comment: 'Stunning alpine lake! The waterfalls along the trail are beautiful. Lake is surrounded by dramatic cliffs. Worth every muddy step!', helpfulCount: 34 },
      { id: 2, username: 'NatureWalker', rating: 4, date: '2026-04-29', comment: 'Beautiful hike but very muddy in spots. Bring waterproof boots! The old-growth forest is amazing. Lake is gorgeous.', helpfulCount: 23 },
      { id: 3, username: 'WeekendAdventurer', rating: 5, date: '2026-04-14', comment: 'One of my favorite hikes! Not too long but feels like a real mountain adventure. The lake is pristine.', helpfulCount: 18 }
    ],
    averageRating: 4.7
  },
  {
    id: 8,
    name: 'Poo Poo Point',
    image: 'images/trails/photo-1696219364361.jpg',
    difficulty: 'Moderate',
    distance: 7.2,
    elevationGain: 1858,
    location: 'Issaquah, WA',
    routeType: 'Out & Back',
    description: 'Famous for paragliders launching from the summit, this trail offers excellent views of Lake Sammamish and the surrounding valleys.',
    features: ['Paraglider watching', 'City views', 'Mountain views', 'Workout trail'],
    coordinates: { lat: 47.5089, lng: -122.0167 },
    trailheadElevation: 440,
    peakElevation: 1858,
    permitInfo: 'No permit required. Free parking available at Chirico Trail parking area.',
    parkingInfo: 'Large parking lot. Popular trail, can fill on weekends. Consider arriving early.',
    guidedTours: [
      { name: 'Issaquah Alps Trails Club', url: 'https://example.com/issaquah-trails' }
    ],
    weatherNote: 'Year-round access. Great training hike. Watch for paragliders taking off from the summit.',
    reviews: [
      { id: 1, username: 'TrainingMode', rating: 4, date: '2026-05-06', comment: 'Excellent workout hike! Watching paragliders launch from the summit is so cool. Trail is steep but consistent grade.', helpfulCount: 27 },
      { id: 2, username: 'ViewSeeker', rating: 5, date: '2026-04-27', comment: 'Amazing views of Lake Sammamish and Seattle skyline! The paragliders add such a unique element. Fun hike!', helpfulCount: 19 },
      { id: 3, username: 'FitnessHiker', rating: 4, date: '2026-04-16', comment: 'Great conditioning trail. Did it 3 times this month. Popular but not too crowded. Good year-round option.', helpfulCount: 13 }
    ],
    averageRating: 4.3
  },
  {
    id: 9,
    name: 'Wallace Falls',
    image: 'images/trails/photo-1593916845953.jpg',
    difficulty: 'Moderate',
    distance: 5.6,
    elevationGain: 1300,
    location: 'Gold Bar, WA',
    routeType: 'Out & Back',
    description: 'A spectacular trail featuring multiple viewpoints of the impressive 265-foot Wallace Falls cascading through a lush forest canyon.',
    features: ['Waterfall views', 'Multiple viewpoints', 'River scenery', 'Forested trail'],
    coordinates: { lat: 47.8667, lng: -121.6767 },
    trailheadElevation: 300,
    peakElevation: 1600,
    permitInfo: 'Discover Pass required for parking. Available at discoverpass.wa.gov.',
    parkingInfo: 'Wallace Falls State Park has a large parking area. Day-use fee applies. Can fill on summer weekends.',
    guidedTours: [
      { name: 'PNW Waterfall Tours', url: 'https://example.com/waterfall-tours' }
    ],
    weatherNote: 'Accessible year-round. Best views in spring with high water flow. Can be muddy in winter/spring.',
    reviews: [
      { id: 1, username: 'WaterfallChaser', rating: 5, date: '2026-05-08', comment: 'Incredible waterfalls! Multiple viewpoints make this trail special. Upper falls viewpoint is breathtaking. Best in spring!', helpfulCount: 42 },
      { id: 2, username: 'SpringHiker', rating: 5, date: '2026-04-25', comment: 'The water was raging in late April - so powerful! Trail is well-maintained with nice bridges. Great for all skill levels.', helpfulCount: 31 },
      { id: 3, username: 'FamilyAdventure', rating: 4, date: '2026-04-12', comment: 'Kids loved seeing the different waterfall viewpoints. Middle falls is easiest to reach. Trail gets steeper to upper falls but worth it!', helpfulCount: 24 }
    ],
    averageRating: 4.7
  },
  {
    id: 10,
    name: 'Heather Lake',
    image: 'images/trails/photo-1600929622034.jpg',
    difficulty: 'Moderate',
    distance: 4.6,
    elevationGain: 1050,
    isHiddenGem: true,
    location: 'Mount Pilchuck State Park, WA',
    routeType: 'Out & Back',
    description: 'A beautiful subalpine lake nestled beneath towering cliffs. The trail winds through old-growth forest before opening up to stunning mountain views.',
    features: ['Alpine lake', 'Old-growth forest', 'Mountain views', 'Wildflowers'],
    coordinates: { lat: 48.0628, lng: -121.7439 },
    trailheadElevation: 1600,
    peakElevation: 2650,
    permitInfo: 'Northwest Forest Pass required. Available at recreation.gov ($5 daily, $30 annual).',
    parkingInfo: 'Small parking area fills quickly on weekends. Arrive before 9am or visit on weekdays.',
    guidedTours: [
      { name: 'Alpine Hiking Guides', url: 'https://example.com/alpine-guides' }
    ],
    weatherNote: 'Best July-October. Snow lingers into late June. Trail can be muddy in early season.',
    reviews: [
      { id: 1, username: 'MountainLakes', rating: 5, date: '2026-05-02', comment: 'Beautiful hidden lake! The cliffs surrounding it are dramatic. Old-growth forest on the way up is magical. Less crowded than other alpine lakes.', helpfulCount: 25 },
      { id: 2, username: 'SubalpineSeeker', rating: 4, date: '2026-04-19', comment: 'Gorgeous lake and wildflowers were starting to bloom. Trail was muddy in spots. Bring good boots!', helpfulCount: 17 }
    ],
    averageRating: 4.5
  },
  {
    id: 11,
    name: 'Colchuck Lake',
    image: 'images/trails/photo-1696219364293.jpg',
    difficulty: 'Hard',
    distance: 8.5,
    elevationGain: 2280,
    location: 'Alpine Lakes Wilderness, WA',
    routeType: 'Out & Back',
    description: 'One of Washington most stunning alpine lakes, featuring brilliant turquoise water beneath the dramatic Dragontail Peak and Colchuck Peak.',
    features: ['Alpine lake', 'Granite peaks', 'Crystal-clear water', 'Photography hotspot'],
    coordinates: { lat: 47.5267, lng: -120.8367 },
    trailheadElevation: 3100,
    peakElevation: 5570,
    permitInfo: 'Northwest Forest Pass required. Enchantments permit required for overnight stays (permit lottery system).',
    parkingInfo: 'Very popular trailhead. Parking fills by 6am on summer weekends. Arrive very early or obtain overnight permit.',
    guidedTours: [
      { name: 'Cascade Alpine Guides', url: 'https://example.com/cascade-alpine' },
      { name: 'Mountain Madness', url: 'https://example.com/mountain-madness' }
    ],
    weatherNote: 'Best July-September. Snow until late June. Afternoon thunderstorms possible in summer.',
    reviews: [
      { id: 1, username: 'AlpineExplorer', rating: 5, date: '2026-04-22', comment: 'Most beautiful lake I have ever seen! The turquoise water is unreal. Tough hike but 100% worth every step. Get there early for parking!', helpfulCount: 67 },
      { id: 2, username: 'BackpackerPro', rating: 5, date: '2026-04-12', comment: 'Bucket list hike! The granite peaks surrounding the lake are stunning. Trail is challenging in spots. Bring layers - weather changes quickly.', helpfulCount: 52 },
      { id: 3, username: 'SeattleHiker', rating: 4, date: '2026-03-28', comment: 'Incredible views but very crowded even on a weekday. Trail is steep and rocky. Start early (like 5am) for parking. Worth the effort!', helpfulCount: 41 },
      { id: 4, username: 'PhotoEnthusiast', rating: 5, date: '2026-03-15', comment: 'Photographer dream! Every angle is postcard-worthy. The color of the water is insane. Went mid-week in early season - still busy!', helpfulCount: 35 }
    ],
    averageRating: 4.8
  },
  {
    id: 12,
    name: 'Snow Lake',
    image: 'images/trails/photo-1534991199945.jpg',
    difficulty: 'Moderate',
    distance: 6.0,
    elevationGain: 1300,
    location: 'Alpine Lakes Wilderness, WA',
    routeType: 'Out & Back',
    description: 'The most popular alpine lake trail in the Alpine Lakes Wilderness, offering spectacular views of a pristine mountain lake surrounded by peaks.',
    features: ['Alpine lake', 'Mountain views', 'Well-maintained trail', 'Swimming'],
    coordinates: { lat: 47.4667, lng: -121.4167 },
    trailheadElevation: 3100,
    peakElevation: 4400,
    permitInfo: 'Northwest Forest Pass required. Day use only, no overnight camping without permit.',
    parkingInfo: 'Very large parking lot but still fills early on weekends. Arrive before 8am in summer.',
    guidedTours: [
      { name: 'Seattle Hiking Club', url: 'https://example.com/seattle-hiking' }
    ],
    weatherNote: 'Best July-October. Snow-covered until early July. Can be very crowded on summer weekends.',
    reviews: [
      { id: 1, username: 'LakeLovers', rating: 4, date: '2026-04-20', comment: 'Beautiful alpine lake! Trail is well-maintained but very busy. Got there at 7am and parking lot was already half full. Lake is stunning though!', helpfulCount: 31 },
      { id: 2, username: 'DayHiker', rating: 5, date: '2026-04-08', comment: 'Perfect day hike! Not too difficult, amazing payoff. The lake is gorgeous and surrounded by snow-capped peaks. Bring a swimsuit!', helpfulCount: 26 },
      { id: 3, username: 'TrailExplorer', rating: 4, date: '2026-03-25', comment: 'Great trail but extremely crowded on weekends. We went on a Thursday and it was much better. Lake is worth the hike for sure.', helpfulCount: 18 }
    ],
    averageRating: 4.3
  },
  {
    id: 13,
    name: 'Maple Pass Loop',
    image: 'images/trails/photo-1630123738777.jpg',
    difficulty: 'Hard',
    distance: 7.5,
    elevationGain: 2150,
    location: 'North Cascades, WA',
    routeType: 'Loop',
    description: 'One of the most scenic loop trails in Washington, offering 360-degree views of North Cascades peaks, alpine lakes, and golden larches in fall.',
    features: ['360-degree views', 'Alpine lakes', 'Larch trees', 'Wildflower meadows'],
    coordinates: { lat: 48.5167, lng: -120.7333 },
    trailheadElevation: 4800,
    peakElevation: 6850,
    permitInfo: 'Northwest Forest Pass required. No permit needed for day hiking.',
    parkingInfo: 'Moderate-sized lot. Can fill on weekends. Parking along road if lot is full.',
    guidedTours: [
      { name: 'North Cascades Institute', url: 'https://example.com/north-cascades' }
    ],
    weatherNote: 'Best late July-October. Peak larch colors late September. Snow possible in early/late season.',
    reviews: [
      { id: 1, username: 'LarchLover', rating: 5, date: '2026-05-10', comment: 'Most scenic loop in Washington! 360-degree views the entire time. Planning to come back for larch season in fall. Absolutely stunning!', helpfulCount: 51 },
      { id: 2, username: 'LoopTrailFan', rating: 5, date: '2026-04-28', comment: 'Every turn offers a new incredible view. Alpine lakes, wildflower meadows, jagged peaks. This is world-class hiking!', helpfulCount: 38 },
      { id: 3, username: 'NorthCascadesFan', rating: 4, date: '2026-04-15', comment: 'Outstanding views but challenging elevation gain. Take your time and enjoy the scenery. Worth the effort!', helpfulCount: 29 }
    ],
    averageRating: 4.7
  },
  {
    id: 14,
    name: 'Blanca Lake',
    image: 'images/trails/photo-1621863200562.jpg',
    difficulty: 'Hard',
    distance: 8.0,
    elevationGain: 2700,
    isHiddenGem: true,
    location: 'Henry M. Jackson Wilderness, WA',
    routeType: 'Out & Back',
    description: 'A stunning glacier-fed lake with distinctive milky turquoise water. The challenging trail rewards hikers with one of Washington most photogenic alpine lakes.',
    features: ['Glacier-fed lake', 'Turquoise water', 'Mountain views', 'Challenging climb'],
    coordinates: { lat: 47.9567, lng: -121.3267 },
    trailheadElevation: 1900,
    peakElevation: 4600,
    permitInfo: 'No permit required for day use. Northwest Forest Pass needed for parking.',
    parkingInfo: 'Small parking area. Very popular, fills early. Arrive before 7am on weekends.',
    guidedTours: [
      { name: 'Evergreen Escapes', url: 'https://example.com/evergreen-escapes' }
    ],
    weatherNote: 'Best July-September. Very steep sections can be slippery when wet. Lake remains cold year-round.',
    reviews: [
      { id: 1, username: 'GlacialLakes', rating: 5, date: '2026-05-04', comment: 'The milky turquoise color is unreal! Steep descent to the lake but worth it. One of the most unique lakes in Washington!', helpfulCount: 44 },
      { id: 2, username: 'ChallengeSought', rating: 4, date: '2026-04-21', comment: 'Tough hike with major elevation changes. The lake color is incredible - unlike anything I have seen. Bring trekking poles for the descent!', helpfulCount: 32 },
      { id: 3, username: 'HiddenGemHunter', rating: 5, date: '2026-04-09', comment: 'True hidden gem! Less crowded than Colchuck but just as beautiful. The glacier-fed water is mesmerizing.', helpfulCount: 26 }
    ],
    averageRating: 4.7
  },
  {
    id: 15,
    name: 'Mailbox Peak',
    image: 'images/trails/photo-1696219364361.jpg',
    difficulty: 'Hard',
    distance: 9.4,
    elevationGain: 4100,
    location: 'Middle Fork Snoqualmie, WA',
    routeType: 'Out & Back',
    description: 'One of the steepest trails near Seattle, famous for its brutal elevation gain and unique mailbox at the summit. A true conditioning hike.',
    features: ['Extreme workout', 'Summit views', 'Famous mailbox', 'Challenging terrain'],
    coordinates: { lat: 47.4733, lng: -121.6733 },
    trailheadElevation: 1200,
    peakElevation: 4800,
    permitInfo: 'Discover Pass required for parking.',
    parkingInfo: 'Medium-sized parking lot. Popular conditioning hike, can fill on weekends.',
    guidedTours: [
      { name: 'Summit Adventure Guides', url: 'https://example.com/summit-guides' }
    ],
    weatherNote: 'Year-round access. Can be icy in winter, requires microspikes. Very steep and strenuous.',
    reviews: [
      { id: 1, username: 'SteepSeeker', rating: 4, date: '2026-05-07', comment: 'Brutal but rewarding! This trail does not mess around - straight up the entire way. Best conditioning hike around. The mailbox at top is fun!', helpfulCount: 39 },
      { id: 2, username: 'FitnessTest', rating: 3, date: '2026-04-23', comment: 'Hardest hike I have done. Relentless elevation gain. Views are nice but this is more about the challenge than scenery. Bring lots of water!', helpfulCount: 28 },
      { id: 3, username: 'TrainingHike', rating: 4, date: '2026-04-11', comment: 'My go-to training hike for mountaineering. Steep and tough but safe. Sign the logbook in the mailbox at the summit!', helpfulCount: 22 }
    ],
    averageRating: 3.7
  },
  {
    id: 16,
    name: 'Gothic Basin',
    image: 'images/trails/photo-1630626883157.jpg',
    difficulty: 'Hard',
    distance: 9.0,
    elevationGain: 2600,
    isHiddenGem: true,
    location: 'Henry M. Jackson Wilderness, WA',
    routeType: 'Out & Back',
    description: 'A spectacular alpine basin surrounded by jagged peaks and tarns. The trail passes through lush forest before opening to otherworldly mountain scenery.',
    features: ['Alpine basin', 'Mountain tarns', 'Jagged peaks', 'Remote wilderness'],
    coordinates: { lat: 48.0633, lng: -121.4567 },
    trailheadElevation: 2300,
    peakElevation: 5000,
    permitInfo: 'Northwest Forest Pass required. No permit needed for day hiking.',
    parkingInfo: 'Small trailhead parking. Less crowded than other alpine destinations. Road can be rough.',
    guidedTours: [
      { name: 'Alpine Hiking Guides', url: 'https://example.com/alpine-guides' }
    ],
    weatherNote: 'Best late July-September. Snow lingers. Stream crossings can be challenging in early season.',
    reviews: [
      { id: 1, username: 'AlpineBasinLover', rating: 5, date: '2026-05-09', comment: 'Otherworldly landscape! The jagged peaks and tarns are spectacular. Feels remote and wild. One of my favorite hikes!', helpfulCount: 33 },
      { id: 2, username: 'BackcountryExplorer', rating: 5, date: '2026-04-24', comment: 'Amazing alpine basin with so much to explore. Less crowded than other alpine destinations. The peaks are dramatic!', helpfulCount: 21 }
    ],
    averageRating: 5.0
  },
  {
    id: 17,
    name: 'Icicle Gorge Loop',
    image: 'images/trails/photo-1599606843763.jpg',
    difficulty: 'Easy',
    distance: 4.2,
    elevationGain: 600,
    isHiddenGem: true,
    location: 'Leavenworth, WA',
    routeType: 'Loop',
    description: 'A gentle loop along the beautiful Icicle Creek with interpretive signs about the area ecology. Perfect for families and a peaceful forest walk.',
    features: ['Creek views', 'Old-growth forest', 'Family-friendly', 'Interpretive signs'],
    coordinates: { lat: 47.5567, lng: -120.7867 },
    trailheadElevation: 1800,
    peakElevation: 2100,
    permitInfo: 'Northwest Forest Pass required for parking.',
    parkingInfo: 'Adequate parking. Rarely fills. Great option when other trails are crowded.',
    guidedTours: [],
    weatherNote: 'Accessible most of the year. Can be icy in winter. Beautiful in fall with changing leaves.',
    reviews: [
      { id: 1, username: 'RelaxedHiker', rating: 5, date: '2026-05-11', comment: 'Perfect easy hike! Beautiful creek and old-growth forest. Interpretive signs are educational. Great with kids or for a casual walk.', helpfulCount: 15 },
      { id: 2, username: 'FamilyFriendly', rating: 4, date: '2026-04-30', comment: 'Nice gentle loop near Leavenworth. Creek is beautiful. Good option when you want something mellow.', helpfulCount: 9 }
    ],
    averageRating: 4.5
  },
  {
    id: 18,
    name: 'Granite Mountain',
    image: 'images/trails/photo-1600929622034.jpg',
    difficulty: 'Hard',
    distance: 8.6,
    elevationGain: 3800,
    location: 'Alpine Lakes Wilderness, WA',
    routeType: 'Out & Back',
    description: 'A challenging climb to a historic fire lookout with panoramic views of the Alpine Lakes Wilderness, Mount Rainier, and countless Cascade peaks.',
    features: ['Fire lookout', 'Panoramic views', 'Wildflower meadows', 'Historic site'],
    coordinates: { lat: 47.4200, lng: -121.4867 },
    trailheadElevation: 2300,
    peakElevation: 5629,
    permitInfo: 'Northwest Forest Pass required. Fire lookout available for overnight rental.',
    parkingInfo: 'Large parking area. Popular trail, can fill on summer weekends by mid-morning.',
    guidedTours: [
      { name: 'Cascade Alpine Guides', url: 'https://example.com/cascade-alpine' }
    ],
    weatherNote: 'Best July-October. Wildflowers peak in July. Can be very hot on sunny days, bring plenty of water.',
    reviews: [
      { id: 1, username: 'LookoutLover', rating: 5, date: '2026-05-12', comment: 'Incredible 360-degree views from the fire lookout! Saw Mount Rainier, Baker, Glacier Peak. Tough climb but amazing payoff!', helpfulCount: 47 },
      { id: 2, username: 'WildflowerSeeker', rating: 5, date: '2026-04-26', comment: 'The wildflower meadows are stunning! Historic lookout is so cool. One of the best views in the Cascades.', helpfulCount: 36 },
      { id: 3, username: 'ChallengeAccepted', rating: 4, date: '2026-04-13', comment: 'Steep and challenging but the views are worth every step. Bring extra water - gets hot and exposed. Lookout is amazing!', helpfulCount: 28 }
    ],
    averageRating: 4.7
  },
  {
    id: 19,
    name: 'Chain Lakes Loop',
    image: 'images/trails/photo-1593916845953.jpg',
    difficulty: 'Moderate',
    distance: 7.0,
    elevationGain: 1700,
    location: 'Mount Baker Wilderness, WA',
    routeType: 'Loop',
    description: 'A spectacular loop with views of Mount Baker and Mount Shuksan, passing multiple alpine lakes and through flower-filled meadows.',
    features: ['Alpine lakes', 'Wildflower meadows', 'Mount Baker views', 'Heather slopes'],
    coordinates: { lat: 48.8567, lng: -121.6833 },
    trailheadElevation: 4300,
    peakElevation: 5400,
    permitInfo: 'Northwest Forest Pass required. No day-use permit needed.',
    parkingInfo: 'Large Artist Point parking area. Can fill on clear summer weekends. Road closes in winter.',
    guidedTours: [
      { name: 'North Cascades Institute', url: 'https://example.com/north-cascades' }
    ],
    weatherNote: 'Best late July-September. Road typically opens late July. Outstanding wildflowers in early August.',
    reviews: [
      { id: 1, username: 'MountBakerFan', rating: 5, date: '2026-05-14', comment: 'Best wildflower hike in Washington! Views of Baker and Shuksan are unreal. Multiple beautiful lakes. World-class scenery!', helpfulCount: 58 },
      { id: 2, username: 'AlpineMeadows', rating: 5, date: '2026-05-01', comment: 'Absolutely stunning! Wildflowers everywhere in early August. The heather slopes are gorgeous. Do this hike!', helpfulCount: 43 },
      { id: 3, username: 'LoopHiker', rating: 4, date: '2026-04-17', comment: 'One of the most scenic loops anywhere. High elevation start makes it accessible. Can be crowded but worth it for the views.', helpfulCount: 31 }
    ],
    averageRating: 4.7
  }
];
