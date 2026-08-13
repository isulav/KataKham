const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-black mb-6 text-orange-500">About KataKham</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        KataKham is a location-based food discovery platform built for Nepal.
        Our mission is to bring local food discovery to everyone, everywhere in the country.
      </p>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
        The name comes from the Nepali phrase <strong className="text-orange-500">"Aba Khana Kata Kham?"</strong> —
        meaning "Where should we eat now?" We answer that question for students,
        tourists, food lovers, and local residents every day.
      </p>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
        Built with React.js on the frontend, KataKham aims to centralize food discovery
        into a single, location-aware platform that surfaces dishes, prices, ratings,
        and directions — so users can decide quickly and confidently where to eat.
      </p>
    </div>
  );
};

export default AboutUs;