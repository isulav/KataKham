import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsSearch,
  BsGeoAlt,
  BsHeart,
  BsHeartFill,
  BsStarFill,
  BsSun,
  BsCloudSun,
  BsMoonStars,
  BsCupStraw,
  BsCake2,
  BsBasket3,
  BsGrid3X3Gap,
  BsGrid,
  BsList,
  BsChevronLeft,
  BsChevronRight,
  BsArrowRight,
  BsArrowLeft,
  BsX,
  BsShare,
  BsCart3,
  BsCheck2Circle,
} from "react-icons/bs";
import { GiHamburger } from "react-icons/gi";
import foodsData from "../data/foodsData";

const CATEGORIES = [
  "Nepali Food",
  "Chinese",
  "Indian",
  "Continental",
  "Fast Food",
  "Desserts",
  "Beverages",
];

const MEAL_TABS = [
  { key: "all", label: "All Foods", icon: BsGrid3X3Gap },
  { key: "breakfast", label: "Breakfast", icon: BsSun },
  { key: "lunch", label: "Lunch", icon: BsCloudSun },
  { key: "dinner", label: "Dinner", icon: BsMoonStars },
  { key: "snacks", label: "Snacks", icon: GiHamburger },
  { key: "desserts", label: "Desserts", icon: BsCake2 },
  { key: "drinks", label: "Drinks", icon: BsCupStraw },
  { key: "fastfood", label: "Fast Food", icon: BsBasket3 },
];

const POPULAR_SEARCHES = ["Momo", "Chowmein", "Pizza", "Biryani", "Thukpa", "Sel Roti"];

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

const PAGE_SIZE = 8;

// ---------- Detail Panel ----------
const FoodDetailPanel = ({ food, onClose, onSelectFood }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!food) return null;

  // Build a small gallery: the food's own image + images from siblings in the same category
  const gallery = [
    food.image,
    ...foodsData
      .filter((f) => f.category === food.category && f.id !== food.id)
      .slice(0, 2)
      .map((f) => f.image),
  ];

  const highlights = [
    `Rated ${food.rating.toFixed(1)} from ${
      food.reviews >= 1000 ? `${(food.reviews / 1000).toFixed(1)}k+` : `${food.reviews}+`
    } reviews`,
    food.badge ? `Marked as ${food.badge} on KataKham` : `A local favorite in ${food.location}`,
    food.dietary.length > 0
      ? `Suitable for ${food.dietary.join(", ")} diets`
      : `Great value at Rs. ${food.price}`,
  ];

  const popularDishes = foodsData
    .filter(
      (f) => f.id !== food.id && (f.restaurant === food.restaurant || f.category === food.category)
    )
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: food.name,
      text: `${food.name} at ${food.restaurant}, ${food.location}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url);
    }
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${food.restaurant}, ${food.location}, Nepal`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
        {/* Image / Gallery */}
        <div className="relative h-64">
          <img
            src={gallery[galleryIndex]}
            alt={food.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={onClose}
            aria-label="Back"
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/80 flex items-center justify-center text-slate-700 dark:text-slate-100 hover:bg-white transition"
          >
            <BsArrowLeft />
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/80 flex items-center justify-center text-slate-700 dark:text-slate-100 hover:bg-white transition"
          >
            <BsX className="text-lg" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={() =>
                  setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/70 flex items-center justify-center text-slate-700 dark:text-slate-100 hover:bg-white transition"
              >
                <BsChevronLeft />
              </button>
              <button
                onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/70 flex items-center justify-center text-slate-700 dark:text-slate-100 hover:bg-white transition"
              >
                <BsChevronRight />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {galleryIndex + 1} / {gallery.length}
              </span>
            </>
          )}
        </div>

        <div className="p-6">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="font-heading text-2xl font-black">{food.name}</h2>
            <span className="flex items-center gap-1 text-orange-500 font-semibold flex-shrink-0 mt-1">
              <BsStarFill className="text-sm" /> {food.rating.toFixed(1)}
              <span className="text-slate-400 font-normal text-sm">
                ({food.reviews >= 1000 ? `${(food.reviews / 1000).toFixed(1)}k` : food.reviews}{" "}
                reviews)
              </span>
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-1">{food.restaurant}</p>
          <p className="flex items-center gap-1 text-sm text-slate-400 mb-4">
            <BsGeoAlt /> {food.location}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
              {food.category}
            </span>
            {food.dietary.map((d) => (
              <span
                key={d}
                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full capitalize"
              >
                {d}
              </span>
            ))}
            {food.badge && (
              <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2.5 py-1 rounded-full font-semibold">
                {food.badge}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <button
              onClick={handleDirections}
              className="flex flex-col items-center gap-1.5 border border-slate-200 dark:border-slate-700 rounded-xl py-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500 transition"
            >
              <BsGeoAlt className="text-lg" />
              Directions
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex flex-col items-center gap-1.5 border rounded-xl py-3 text-xs font-medium transition ${
                saved
                  ? "border-red-400 text-red-500"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-300 hover:text-red-500"
              }`}
            >
              {saved ? <BsHeartFill className="text-lg" /> : <BsHeart className="text-lg" />}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1.5 border border-slate-200 dark:border-slate-700 rounded-xl py-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500 transition"
            >
              <BsShare className="text-lg" />
              Share
            </button>
            <Link
              to="/contact"
              className="flex flex-col items-center gap-1.5 border border-slate-200 dark:border-slate-700 rounded-xl py-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500 transition"
            >
              <BsCart3 className="text-lg" />
              Order
            </Link>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="font-heading font-bold text-lg mb-2">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {food.name} is a {food.badge ? food.badge.toLowerCase() : "well-loved"} dish at{" "}
              {food.restaurant} in {food.location}, known for its authentic{" "}
              {food.category.toLowerCase()} flavor and served at Rs. {food.price}.
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="font-heading font-bold text-lg mb-3">Highlights</h3>
            <div className="flex flex-col gap-2">
              {highlights.map((h) => (
                <p
                  key={h}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <BsCheck2Circle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  {h}
                </p>
              ))}
            </div>
          </div>

          {/* Popular Dishes */}
          {popularDishes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-lg">More Like This</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {popularDishes.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => {
                      onSelectFood(dish);
                      setGalleryIndex(0);
                    }}
                    className="text-left group"
                  >
                    <div className="h-20 rounded-xl overflow-hidden mb-1.5">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs font-semibold leading-tight mb-0.5 line-clamp-2">
                      {dish.name}
                    </p>
                    <p className="text-xs text-orange-500 font-medium">Rs. {dish.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Main Page ----------
const Foods = () => {
  const [search, setSearch] = useState("");
  const [mealType, setMealType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [dietary, setDietary] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [selectedFood, setSelectedFood] = useState(null);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const toggleDietary = (d) => {
    setDietary((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(5000);
    setDietary([]);
    setMinRating(0);
    setPage(1);
  };

  const filteredFoods = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = foodsData.filter((food) => {
      const matchesSearch =
        !q ||
        [food.name, food.restaurant, food.location, food.category]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesMeal = mealType === "all" || food.mealType === mealType;

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(food.category);

      const matchesPrice = food.price <= maxPrice;

      const matchesDietary =
        dietary.length === 0 ||
        dietary.every((d) => food.dietary.includes(d));

      const matchesRating = food.rating >= minRating;

      return (
        matchesSearch &&
        matchesMeal &&
        matchesCategory &&
        matchesPrice &&
        matchesDietary &&
        matchesRating
      );
    });

    if (sortBy === "priceLow") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") result = [...result].sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [search, mealType, selectedCategories, maxPrice, dietary, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredFoods.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* HERO */}
      <section className="bg-orange-50/50 dark:bg-slate-800 border-b border-orange-100 dark:border-slate-700">
        <div className="container mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4 leading-tight">
              Discover
              <br />
              <span className="text-orange-500">Amazing</span>{" "}
              <span className="text-green-600 dark:text-green-400">Foods</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
              Explore delicious foods from top restaurants across Nepal. Find
              your next favorite meal.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
                <BsSearch className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search for foods..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
                />
                <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-3">
                  <BsGeoAlt /> All Nepal
                </span>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition">
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Popular searches:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearch(term);
                    setPage(1);
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 hover:border-orange-400 hover:text-orange-500 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            <img
              src={foodsData[0].image}
              alt={foodsData[0].name}
              className="w-full h-56 object-cover rounded-3xl shadow-lg col-span-2"
            />
            <img
              src={foodsData[3].image}
              alt={foodsData[3].name}
              className="w-full h-40 object-cover rounded-2xl shadow-md"
            />
            <img
              src={foodsData[1].image}
              alt={foodsData[1].name}
              className="w-full h-40 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        {/* MEAL TYPE TABS */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-3 flex flex-wrap items-center gap-1 mb-8 shadow-sm">
          {MEAL_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setMealType(tab.key);
                setPage(1);
              }}
              className={`flex flex-col items-center gap-1 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition ${
                mealType === tab.key
                  ? "text-orange-500 bg-orange-50 dark:bg-orange-900/20"
                  : "text-slate-500 dark:text-slate-400 hover:text-orange-500"
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* FILTERS SIDEBAR */}
          <aside className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-orange-500 font-medium hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Categories</h4>
              <div className="flex flex-col gap-2.5">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Price Range</h4>
              <input
                type="range"
                min={0}
                max={5000}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>Rs. 0</span>
                <span>Rs. {maxPrice >= 5000 ? "5000+" : maxPrice}</span>
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Dietary Preference</h4>
              <div className="flex flex-col gap-2.5">
                {["vegetarian", "vegan", "glutenFree", "jain"].map((d) => (
                  <label
                    key={d}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer capitalize"
                  >
                    <input
                      type="checkbox"
                      checked={dietary.includes(d)}
                      onChange={() => toggleDietary(d)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    {d === "glutenFree" ? "Gluten Free" : d}
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Ratings</h4>
              <div className="flex flex-col gap-2.5">
                {RATING_OPTIONS.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => {
                        setMinRating(minRating === r ? 0 : r);
                        setPage(1);
                      }}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <BsStarFill
                          key={i}
                          className={i < Math.round(r) ? "" : "text-slate-300 dark:text-slate-600"}
                        />
                      ))}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {r.toFixed(1)} &amp; above
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPage(1)}
              className="w-full border border-orange-500 text-orange-500 font-semibold py-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition"
            >
              Apply Filters
            </button>
          </aside>

          {/* RESULTS */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Showing {filteredFoods.length} food{filteredFoods.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 outline-none"
                >
                  <option value="popular">Sort by: Popular</option>
                  <option value="rating">Sort by: Rating</option>
                  <option value="priceLow">Sort by: Price (Low to High)</option>
                  <option value="priceHigh">Sort by: Price (High to Low)</option>
                </select>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-md transition ${
                      view === "grid"
                        ? "bg-white dark:bg-slate-700 shadow-sm text-orange-500"
                        : "text-slate-400"
                    }`}
                  >
                    <BsGrid />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-md transition ${
                      view === "list"
                        ? "bg-white dark:bg-slate-700 shadow-sm text-orange-500"
                        : "text-slate-400"
                    }`}
                  >
                    <BsList />
                  </button>
                </div>
              </div>
            </div>

            {paginatedFoods.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {paginatedFoods.map((food) => (
                  <button
                    onClick={() => setSelectedFood(food)}
                    key={food.id}
                    className={`group text-left bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition ${
                      view === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        view === "list" ? "w-48 flex-shrink-0" : "h-44"
                      }`}
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Save"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 flex items-center justify-center text-slate-500 hover:text-red-500 transition"
                      >
                        <BsHeart />
                      </span>
                    </div>

                    <div className="p-4 flex-1">
                      <h3 className="font-heading font-bold text-base mb-1 group-hover:text-orange-500 transition">
                        {food.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        {food.restaurant}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                        <BsGeoAlt /> {food.location}
                        <span className="mx-1">•</span>
                        <span className="flex items-center gap-1 text-yellow-500 font-medium">
                          <BsStarFill className="text-[10px]" /> {food.rating.toFixed(1)}
                        </span>
                        <span className="text-slate-400">
                          ({food.reviews >= 1000 ? `${(food.reviews / 1000).toFixed(1)}k` : food.reviews})
                        </span>
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          Rs. {food.price}
                        </span>
                        {food.badge && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              food.badge === "Bestseller"
                                ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                          >
                            {food.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400">
                  No foods found matching your filters.
                </p>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40 hover:border-orange-400 hover:text-orange-500 transition"
                >
                  <BsChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-orange-500 text-white"
                        : "border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-orange-400 hover:text-orange-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40 hover:border-orange-400 hover:text-orange-500 transition"
                >
                  <BsChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA STRIP */}
        <div className="mt-12 bg-orange-50/60 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 rounded-2xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg mb-1">
              Can't find what you're looking for?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Tell us what food you want and we'll help you find the best
              places to get it!
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition flex-shrink-0"
          >
            Request a Food <BsArrowRight />
          </Link>
        </div>
      </div>

      {/* Slide-over detail panel */}
      {selectedFood && (
        <FoodDetailPanel
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onSelectFood={setSelectedFood}
        />
      )}
    </div>
  );
};

export default Foods;