import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsSearch, BsGeoAlt, BsCurrencyDollar, BsChevronDown,
  BsStarFill, BsBookmark, BsArrowRight, BsPeopleFill,
  BsShop, BsEggFried
} from "react-icons/bs";

const popularSearches = ["Kathmandu", "Pokhara", "Momo", "Thakali", "Chowmein"];

const features = [
  { icon: BsGeoAlt, title: "Find Nearby Food", desc: "Discover restaurants and dishes around you.", bg: "bg-orange-500" },
  { icon: BsSearch, title: "Search Anywhere", desc: "Search any place, city or landmark in Nepal.", bg: "bg-green-600" },
  { icon: BsCurrencyDollar, title: "Compare Prices", desc: "Compare dish prices and find the best value.", bg: "bg-blue-500" },
  { icon: BsStarFill, title: "Ratings & Reviews", desc: "Check reviews and ratings from real people.", bg: "bg-yellow-500" },
  { icon: BsBookmark, title: "Save Favorites", desc: "Save your favorite dishes and restaurants.", bg: "bg-purple-500" },
];

const popularPlaces = [
  {
    name: "Kathmandu",
    image: "/placeimage/KTM.jpg",
    desc: "Momo, Newari cuisine & boutique cafés",
    tags: ["Momo", "Newari", "Thakali"],
  },
  {
    name: "Pokhara",
    image: "/placeimage/Pokhara.jpg",
    desc: "Lakeside cafés, Thakali sets & fresh trout",
    tags: ["Thakali", "Trout", "Café"],
  },
  {
    name: "Chitwan",
    image: "/placeimage/Chitwan.jpg",
    desc: "Tharu cuisine & jungle-side eateries",
    tags: ["Tharu", "Local", "Snacks"],
  },
  {
    name: "Butwal",
    image: "/placeimage/Butwal.jpg",
    desc: "Popular local snacks & budget diners",
    tags: ["Snacks", "Momo", "Local"],
  },
];

const steps = [
  { step: "01", icon: BsGeoAlt, title: "Detect Location", desc: "Allow location access to discover nearby food.", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
  { step: "02", icon: BsSearch, title: "Search", desc: "Search for a place, restaurant or dish.", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
  { step: "03", icon: BsCurrencyDollar, title: "Compare", desc: "Browse dishes, prices and ratings.", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { step: "04", icon: BsStarFill, title: "Choose", desc: "Pick your favorite place and enjoy your meal.", color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30" },
];

const stats = [
  { icon: BsGeoAlt, value: "77+", label: "Districts Covered", color: "text-green-600" },
  { icon: BsEggFried, value: "1000+", label: "Food Options", color: "text-orange-500" },
  { icon: BsShop, value: "500+", label: "Restaurants", color: "text-amber-500" },
  { icon: BsPeopleFill, value: "10K+", label: "Happy Users", color: "text-red-500" },
];

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Nepal");

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-green-50 dark:from-slate-800 dark:to-slate-900 py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text + search */}
          <div>
            <span className="inline-block bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-6">
              🍜 Nepal's Food Discovery Platform
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="text-slate-900 dark:text-white">Aba Khana</span>
              <br />
              <span className="text-orange-500">Kata </span>
              <span className="text-green-600 dark:text-green-400">Kham?</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
              Find food, compare prices and discover the best restaurants across Nepal.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700">
                <BsGeoAlt className="text-orange-500 text-lg flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 leading-none mb-1">Your Location</span>
                  <div className="flex items-center gap-1">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent text-sm font-semibold outline-none appearance-none pr-4 cursor-pointer"
                    >
                      <option value="Nepal">Nepal</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Pokhara">Pokhara</option>
                      <option value="Chitwan">Chitwan</option>
                    </select>
                    <BsChevronDown className="text-xs text-slate-400 -ml-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-1 px-4">
                <BsSearch className="text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a place, restaurant or dish..."
                  className="flex-1 py-3 outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm"
                />
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold transition">
                Search
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-sm text-slate-500 dark:text-slate-400">Popular Searches:</span>
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full hover:border-orange-400 hover:text-orange-500 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right: image collage placeholder */}
          <div className="relative w-full aspect-[4/5] overflow-hidden
                rounded-[48%_48%_15%_15%]
                border-4 border-orange-400
                shadow-2xl">
            <img
              src="/Secondlogo.png"
              alt="Kata Kham logo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-6 bg-orange-50/50 dark:bg-slate-800">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className={`w-12 h-12 rounded-full ${f.bg} flex items-center justify-center mx-auto mb-4`}>
                <f.icon className="text-white text-xl" />
              </div>
              <h3 className="font-heading font-bold mb-2">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR PLACES */}
      <section className="py-16 px-6 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-black mb-2">Popular Places</h2>
              <p className="text-slate-500 dark:text-slate-400">Explore food scenes in the most loved places.</p>
            </div>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-orange-500 hover:underline">
              View all places <BsArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlaces.map((place) => (
              <div
                key={place.name}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-slate-100 dark:border-slate-700"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-orange-500 transition">{place.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{place.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto text-center mb-14">
          <h2 className="font-heading text-3xl font-black mb-3">How Kata Kham Works</h2>
          <p className="text-slate-500 dark:text-slate-400">Simple steps to find your next meal.</p>
        </div>
        <div className="container mx-auto relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] border-t-2 border-dashed border-slate-300 dark:border-slate-600" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${s.bg} flex items-center justify-center mb-4 relative z-10`}>
                  <s.icon className={`text-2xl ${s.color}`} />
                </div>
                <span className={`font-heading font-black text-sm mb-1 ${s.color}`}>{s.step}</span>
                <h3 className="font-heading font-bold mb-1">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden py-16 px-6 bg-orange-500 text-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">
              Hungry? Let's find something good.
            </h2>
            <p className="text-orange-100 mb-8 text-lg max-w-md">
              Join thousands of food lovers across Nepal discovering the best places to eat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition"
              >
                Start Exploring <BsArrowRight />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-56 h-96 bg-white/10 border-4 border-white/30 rounded-[2rem] flex items-center justify-center text-6xl backdrop-blur-sm">
              📱
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 justify-center">
              <s.icon className={`text-2xl ${s.color}`} />
              <div>
                <p className="font-heading font-black text-xl leading-none">{s.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Homepage;