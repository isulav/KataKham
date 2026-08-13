// Central data source for all "place" pages (Kathmandu, Pokhara, Chitwan, Butwal, ...)
// Add a new object here and a new page automatically appears at /places/<slug>
//
// IMAGE SOURCES:
// - City hero images and a few well-documented dishes (momo, sel roti, choila) use
//   verified, freely-licensed photos from Wikimedia Commons (CC BY / CC BY-SA), loaded
//   via the stable Special:FilePath redirect (works directly as an <img src>).
//   NOTE: these require attribution under their CC license if you publish this site —
//   check each file's license page on commons.wikimedia.org before shipping.
// - Every restaurant photo and the remaining regional dishes use loremflickr.com, a
//   live keyword-based photo API, since the restaurant names read as placeholder/demo
//   data rather than real, findable businesses. These return a real photo (not a
//   broken image) but are NOT guaranteed accurate or rights-cleared for commercial use —
//   swap them for your own photography or licensed stock before production.

const wikimedia = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const placeholder = (keyword, w = 800, h = 600) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keyword)}`;

const placesData = [
  {
    slug: "kathmandu",
    name: "Kathmandu",
    image: wikimedia("Kathmandu Durbar Square, Maju Dega 2, Nepal.jpg"),
    tagline: "Momo, Newari cuisine & boutique cafés",
    tags: ["Momo", "Newari", "Thakali"],
    province: "Bagmati Province",
    population: "1.5M+ Population",
    altitude: "1,400m Altitude",
    description:
      "Kathmandu is the cultural heart of Nepal, where ancient traditions meet modern living. From bustling bazaars to peaceful courtyards, the city offers some of the most diverse food experiences in the country.",
    about:
      "Kathmandu Valley is home to a unique blend of Newari heritage, street food culture, and trendy cafés. Whether you're exploring heritage sites or relaxing in a courtyard café, the city has something for every food lover.",
    aboutTags: ["Heritage", "Culture", "Street Food", "Cafés", "Shopping"],
    highlights: [
      "Historic Durbar Squares & Temples",
      "Vibrant Food Markets & Street Food",
      "Traditional Newari Cuisine",
      "Boutique Cafés & Rooftop Views",
      "Easy Access to Nearby Attractions",
    ],
    bestTime: { range: "Sep – Nov, Mar – May", desc: "Pleasant weather and clear skies." },
    travelTips: [
      "Try local food in local eateries",
      "Carry cash for local markets",
      "Respect local culture and traditions",
      "Stay hydrated and be eco-friendly",
    ],
    foodPlaces: [
      { name: "Yala Momo", desc: "Best momos in town!", area: "Thamel, Kathmandu", tags: ["Momo", "Tibetan", "Popular"], rating: 4.6, reviews: "1.2k", image: "/src/assets/images/momo.jpg", bg: "from-orange-200 to-orange-400" },
      { name: "Kantipur Kitchen", desc: "Authentic Newari dining experience", area: "Durbar Marg, Kathmandu", tags: ["Newari", "Traditional", "Dining"], rating: 4.5, reviews: "982", image: placeholder("newari,food"), bg: "from-amber-200 to-amber-400" },
      { name: "Roadhouse Café", desc: "Cozy vibes & great coffee", area: "Thamel, Kathmandu", tags: ["Café", "Coffee", "Brunch"], rating: 4.4, reviews: "861", image: placeholder("cafe,coffee"), bg: "from-green-200 to-green-400" },
      { name: "The Momo Hut", desc: "Rooftop view & fusion delights", area: "Lazimpat, Kathmandu", tags: ["Rooftop", "Fusion", "Popular"], rating: 4.3, reviews: "742", image: placeholder("rooftop,restaurant"), bg: "from-purple-200 to-purple-400" },
    ],
    localFoods: [
      { name: "Momo", desc: "Steamed dumplings served with spicy momo achar.", image: wikimedia("Momo, Nepal.JPG"), },
      { name: "Newari Khaja Set", desc: "A traditional Newari feast with beaten rice, meat, egg & more.", image: placeholder("newari,khaja,set"), },
      { name: "Chatamari", desc: "Newari-style rice crepe topped with meat, egg & spices.", image: placeholder("chatamari,nepali,crepe"), },
      { name: "Choila", desc: "Spicy grilled meat marinated with traditional spices.", image: wikimedia("Choila.jpg"), },
      { name: "Sel Roti", desc: "Traditional rice doughnut — crispy outside, soft inside.", image: wikimedia("Sel roti, Nepalese food.jpg"),},
    ],
  },
  {
    slug: "pokhara",
    name: "Pokhara",
    image: wikimedia("Phewa Lake and Annapurna Range, Pokhara.jpg"),
    tagline: "Lakeside cafés, Thakali sets & fresh trout",
    tags: ["Thakali", "Trout", "Café"],
    province: "Gandaki Province",
    population: "500K+ Population",
    altitude: "820m Altitude",
    description:
      "Pokhara sits beside Phewa Lake with the Annapurna range as a backdrop. It's Nepal's most relaxed city — a place for lakeside cafés, mountain views, and unhurried meals.",
    about:
      "Pokhara pairs a laid-back lakeside café culture with hearty Thakali thali sets and some of the freshest trout dishes in Nepal. Lakeside is the beating heart of the food scene here.",
    aboutTags: ["Lakeside", "Café Culture", "Trout", "Trekking", "Mountains"],
    highlights: [
      "Phewa Lake & Annapurna Views",
      "Lakeside Café Strip",
      "Fresh Trout Farms Nearby",
      "Thakali Thali Sets",
      "Base for Annapurna Treks",
    ],
    bestTime: { range: "Oct – Dec, Mar – Apr", desc: "Clear mountain views and mild temperatures." },
    travelTips: [
      "Book lakeside seating early for sunset",
      "Try trout fresh from local farms",
      "Rent a bicycle to explore Lakeside",
      "Carry a light jacket for the evenings",
    ],
    foodPlaces: [
      { name: "Godfather Restaurant", desc: "Classic Thakali thali done right", area: "Lakeside, Pokhara", tags: ["Thakali", "Traditional", "Dining"], rating: 4.5, reviews: "1.1k", image: placeholder("thakali,thali"), bg: "from-orange-200 to-orange-400" },
      { name: "Fewa Trout Farm", desc: "Farm-to-table grilled trout", area: "Fewa Lake, Pokhara", tags: ["Trout", "Farm", "Popular"], rating: 4.6, reviews: "890", image: placeholder("grilled,trout,fish"), bg: "from-blue-200 to-blue-400" },
      { name: "Boomerang Café", desc: "Garden café with continental brunch", area: "Lakeside, Pokhara", tags: ["Café", "Brunch", "Garden"], rating: 4.4, reviews: "760", image: placeholder("garden,cafe,brunch"), bg: "from-green-200 to-green-400" },
      { name: "Moondance Restaurant", desc: "Multi-cuisine with mountain views", area: "Lakeside, Pokhara", tags: ["Multi-cuisine", "Views", "Dinner"], rating: 4.3, reviews: "654", image: placeholder("restaurant,mountain,view"), bg: "from-purple-200 to-purple-400" },
    ],
    localFoods: [
      { name: "Thakali Set", desc: "Rice, lentils, seasonal veg & meat curry served on a brass plate.", image: placeholder("thakali,set,nepal"), emoji: "🍚" },
      { name: "Grilled Trout", desc: "Fresh lake trout, grilled and served with herbs.", image: placeholder("grilled,trout"), emoji: "🐟" },
      { name: "Lakeside Momo", desc: "Steamed dumplings with a lakeside view.", image: placeholder("momo,lake"), emoji: "🥟" },
      { name: "Apple Pie", desc: "A Pokhara classic, baked fresh daily.", image: placeholder("apple,pie"), emoji: "🥧" },
      { name: "Dhindo Set", desc: "Traditional buckwheat dish with gundruk & curry.", image: placeholder("dhindo,nepali,food"), emoji: "🍲" },
    ],
  },
  {
    slug: "chitwan",
    name: "Chitwan",
    image: wikimedia("Greater one-horned rhinoceros at Chitwan.jpg"),
    tagline: "Tharu cuisine & jungle-side eateries",
    tags: ["Tharu", "Local", "Snacks"],
    province: "Bagmati Province",
    population: "220K+ Population",
    altitude: "415m Altitude",
    description:
      "Home to Chitwan National Park, this region serves smoky, home-style Tharu cuisine — best enjoyed at jungle-side eateries after a day of wildlife safaris.",
    about:
      "Chitwan's food culture is deeply tied to the Tharu community. Expect home-style curries, river fish and hearty thalis served in open-air eateries close to the jungle.",
    aboutTags: ["Wildlife", "Tharu Culture", "River Food", "Safari", "Local"],
    highlights: [
      "Chitwan National Park Safaris",
      "Authentic Tharu Villages",
      "Rapti River Dining Spots",
      "Traditional Ghonghi & Dhikri",
      "Elephant & Jungle Walks Nearby",
    ],
    bestTime: { range: "Oct – Feb", desc: "Cool, dry weather — best for safaris and dining outdoors." },
    travelTips: [
      "Try Ghonghi if you like bold flavors",
      "Book jungle-side seating for sunset views",
      "Ask about safari-friendly meal times",
      "Support local Tharu-run eateries",
    ],
    foodPlaces: [
      { name: "Tharu Kitchen", desc: "Home-style Tharu curries & thalis", area: "Sauraha, Chitwan", tags: ["Tharu", "Traditional", "Dining"], rating: 4.5, reviews: "690", image: placeholder("tharu,food,curry"), bg: "from-amber-200 to-amber-400" },
      { name: "Jungle View Restaurant", desc: "Local & multi-cuisine near the park", area: "Sauraha, Chitwan", tags: ["Local", "Multi-cuisine", "Views"], rating: 4.3, reviews: "540", image: placeholder("jungle,restaurant"), bg: "from-green-200 to-green-400" },
      { name: "Rapti Riverside Café", desc: "Riverside café with light bites", area: "Rapti River, Chitwan", tags: ["Café", "Riverside", "Snacks"], rating: 4.2, reviews: "410", image: placeholder("riverside,cafe"), bg: "from-blue-200 to-blue-400" },
      { name: "Chitwan Village Kitchen", desc: "Village-style Tharu cooking", area: "Bachhauli, Chitwan", tags: ["Tharu", "Village", "Popular"], rating: 4.4, reviews: "505", image: placeholder("village,kitchen,nepal"), bg: "from-orange-200 to-orange-400" },
    ],
    localFoods: [
      { name: "Ghonghi", desc: "Spiced snail curry, a Tharu specialty.", image: placeholder("snail,curry"), emoji: "🐌" },
      { name: "Dhikri", desc: "Steamed rice-flour dumplings served with curry.", image: placeholder("rice,dumplings"), emoji: "🍥" },
      { name: "Tharu Thali", desc: "A full plate of local curries, rice & pickles.", image: placeholder("tharu,thali"), emoji: "🍛" },
      { name: "Sidhra", desc: "Sun-dried fish curry, a Tharu classic.", image: placeholder("dried,fish,curry"), emoji: "🐟" },
      { name: "Bagiya", desc: "Sweet rice-flour dumplings filled with jaggery.", image: placeholder("sweet,dumplings,jaggery"), emoji: "🍡" },
    ],
  },
  {
    slug: "butwal",
    name: "Butwal",
    image: wikimedia("Butwal.jpg"),
    tagline: "Popular local snacks & budget diners",
    tags: ["Snacks", "Momo", "Local"],
    province: "Lumbini Province",
    population: "180K+ Population",
    altitude: "150m Altitude",
    description:
      "A busy trade hub in western Nepal, Butwal is known for its no-frills local diners, budget-friendly thalis and street snacks that keep traders and travellers fed.",
    about:
      "Butwal's food scene is fast, affordable and honest — think street-side chatpate carts, sekuwa stalls and dal bhat diners that serve the city's constant flow of travelers.",
    aboutTags: ["Street Food", "Budget Eats", "Trade Hub", "Local", "Snacks"],
    highlights: [
      "Busy Traffic Chowk Food Stalls",
      "Budget-Friendly Dal Bhat Diners",
      "Sekuwa & Street Snack Corners",
      "Gateway to Lumbini",
      "Affordable Local Momo Spots",
    ],
    bestTime: { range: "Oct – Mar", desc: "Cooler temperatures, comfortable for street food hopping." },
    travelTips: [
      "Street snacks are best eaten fresh & hot",
      "Carry small cash for street vendors",
      "Sekuwa corners get busy in the evening",
      "Use Butwal as a base to visit Lumbini",
    ],
    foodPlaces: [
      { name: "Traffic Chowk Diner", desc: "Classic local dal bhat sets", area: "Traffic Chowk, Butwal", tags: ["Local", "Nepali", "Budget"], rating: 4.2, reviews: "320", image: placeholder("dal,bhat,thali"), bg: "from-amber-200 to-amber-400" },
      { name: "Butwal Sekuwa Corner", desc: "Smoky grilled sekuwa specialist", area: "Milan Chowk, Butwal", tags: ["Sekuwa", "Grill", "Popular"], rating: 4.4, reviews: "410", image: placeholder("grilled,skewers,sekuwa"), bg: "from-red-200 to-red-400" },
      { name: "Golden Momo House", desc: "Budget-friendly veg & meat momo", area: "Devinagar, Butwal", tags: ["Momo", "Budget", "Local"], rating: 4.1, reviews: "275", image: placeholder("momo,dumplings,plate"), bg: "from-orange-200 to-orange-400" },
      { name: "Shreenagar Snacks Center", desc: "Street snacks & chatpate cart", area: "Shreenagar, Butwal", tags: ["Snacks", "Street Food", "Quick Bite"], rating: 4.0, reviews: "198", image: placeholder("street,food,cart"), bg: "from-green-200 to-green-400" },
    ],
    localFoods: [
      { name: "Chatpate", desc: "Spicy, tangy puffed rice street snack.", image: placeholder("chatpate,street,snack"), emoji: "🌶️" },
      { name: "Veg Momo", desc: "Budget-friendly steamed dumplings.", image: placeholder("vegetable,momo"), emoji: "🥟" },
      { name: "Dal Bhat Set", desc: "Rice, lentils, veg & pickle — the everyday staple.", image: placeholder("dal,bhat,set"), emoji: "🍛" },
      { name: "Sekuwa", desc: "Smoky skewered grilled meat.", image: placeholder("sekuwa,grilled,meat"), emoji: "🍢" },
      { name: "Aloo Chop", desc: "Deep-fried spiced potato patties.", image: placeholder("potato,patties,fried"), emoji: "🥔" },
    ],
  },
];

export default placesData;