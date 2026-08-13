const Services = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-4 text-orange-500">Our Features</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-12">Everything KataKham offers to make food discovery easy.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { emoji: "📍", title: "Location-Based Suggestions", desc: "Personalized list of nearby dishes and eateries based on your current location." },
          { emoji: "🔍", title: "Search by Place", desc: "Search any city, area, or landmark across Nepal — Kathmandu, Pokhara, Chitwan and more." },
          { emoji: "💰", title: "Price Comparison", desc: "See price ranges side-by-side to choose value or specialty options." },
          { emoji: "⭐", title: "Ratings & Reviews", desc: "Community-sourced reviews and aggregated ratings for quick vetting." },
          { emoji: "❤️", title: "Save Favorites", desc: "Bookmark dishes and restaurants for later or travel planning." },
          { emoji: "🗺️", title: "Map & Directions", desc: "Get directions to any restaurant directly from the app." },
        ].map((s) => (
          <div key={s.title} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
            <div className="text-4xl mb-4">{s.emoji}</div>
            <h3 className="font-bold text-xl mb-2">{s.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;