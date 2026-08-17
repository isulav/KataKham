import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsArrowLeft } from "react-icons/bs";
import placesData from "../data/placesData";

const AllPlaces = () => {
  const [search, setSearch] = useState("");

  const filteredPlaces = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return placesData;
    return placesData.filter((place) => {
      const haystack = [place.name, place.tagline, ...(place.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [search]);

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-[60vh]">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-orange-500 transition mb-6"
        >
          <BsArrowLeft />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black mb-2">
              Popular Food Places
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Explore food scenes in the most loved places.
            </p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-72">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5">
              <BsSearch className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a place or tag..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <Link
                to={`/places/${place.slug}`}
                key={place.slug}
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
                  <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-orange-500 transition">
                    {place.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    {place.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400">
              No places found matching "{search}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPlaces;