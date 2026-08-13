import { Link, useParams } from "react-router-dom";
import {
  BsHouseDoorFill, BsChevronRight, BsGeoAltFill, BsPeopleFill,
  BsInfoCircleFill, BsStarFill, BsCheckCircleFill, BsArrowRight,
  BsCalendarEventFill, BsLightbulbFill, BsCheck2,
} from "react-icons/bs";
import placesData from "../data/placesData";

const PlaceDetail = () => {
  const { slug } = useParams();
  const place = placesData.find((p) => p.slug === slug);

  if (!place) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-7xl mb-6">🗺️</div>
        <h1 className="text-3xl font-black mb-3 dark:text-white">Place Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          We don't have this place in Kata Kham yet.
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-6 py-16">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-orange-500 transition">
            <BsHouseDoorFill /> Home
          </Link>
          <BsChevronRight className="text-xs" />
          <Link to="/services" className="hover:text-orange-500 transition">Places</Link>
          <BsChevronRight className="text-xs" />
          <span className="text-slate-700 dark:text-slate-200 font-medium">{place.name}</span>
        </div>

        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden mb-10">
          <img src={place.image} alt={place.name} className="w-full h-72 sm:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-10 max-w-xl">
            <span className="inline-flex items-center gap-1 w-fit bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <BsGeoAltFill className="text-orange-500" /> {place.name}
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl font-black text-white mb-3">{place.name}</h1>
            <p className="text-white/90 text-lg mb-4">{place.tagline}</p>
            <p className="text-white/80 text-sm leading-relaxed mb-6 hidden sm:block">{place.description}</p>
            <div className="flex flex-wrap gap-5 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-1"><BsGeoAltFill className="text-orange-400" /> {place.province}</span>
              <span className="flex items-center gap-1"><BsPeopleFill className="text-orange-400" /> {place.population}</span>
              <span className="flex items-center gap-1">⛰️ {place.altitude}</span>
            </div>
          </div>
        </div>

        {/* ABOUT + HIGHLIGHTS + IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 mb-16 items-stretch">
          {/* About */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">
                <BsInfoCircleFill />
              </span>
              <h2 className="font-heading font-bold text-lg">About {place.name}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">{place.about}</p>
            <div className="flex flex-wrap gap-2">
              {place.aboutTags.map((tag) => (
                <span key={tag} className="text-xs bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white text-sm">
                <BsStarFill />
              </span>
              <h2 className="font-heading font-bold text-lg">Highlights</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {place.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <BsCheckCircleFill className="text-orange-500 mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Side image */}
          <div className="hidden lg:block w-56 rounded-2xl overflow-hidden">
            <img src={place.image} alt={`${place.name} highlight`} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* POPULAR FOOD PLACES */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-2">
            <h2 className="font-heading text-2xl font-black">Popular Food Places in {place.name}</h2>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-orange-500 hover:underline">
              View all places <BsArrowRight />
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Explore some of the most loved restaurants, cafés and food spots in the city.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {place.foodPlaces.map((fp) => (
              <div
                key={fp.name}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-slate-100 dark:border-slate-700"
              >
                <div className={`h-32 bg-gradient-to-br ${fp.bg} flex items-center justify-center text-5xl`}>
                  {fp.emoji}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold mb-1">{fp.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">{fp.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mb-3">
                    <BsGeoAltFill /> {fp.area}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {fp.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                    <BsStarFill className="text-xs" /> {fp.rating} <span className="text-slate-400 dark:text-slate-500 font-normal">({fp.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOCAL FOOD + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Local food to try */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
            <h2 className="font-heading text-2xl font-black mb-1">Local Food to Try</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Must-try dishes when you are in {place.name}.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-8">
              {place.localFoods.map((food) => (
                <div key={food.name} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl mb-3 shadow-sm">
                    {food.emoji}
                  </div>
                  <h3 className="font-heading font-bold text-sm mb-1">{food.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{food.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-orange-500 text-orange-500 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-orange-500 hover:text-white transition"
            >
              Explore more foods <BsArrowRight />
            </Link>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">
                  <BsCalendarEventFill />
                </span>
                <h3 className="font-heading font-bold">Best Time to Visit</h3>
              </div>
              <p className="font-semibold text-sm mb-1">{place.bestTime.range}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{place.bestTime.desc}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white text-sm">
                  <BsLightbulbFill />
                </span>
                <h3 className="font-heading font-bold">Travel Tips</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {place.travelTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <BsCheck2 className="text-orange-500 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;