import { Link } from "react-router-dom";
import {
  BsArrowRight,
  BsBasket2Fill,
  BsBullseye,
  BsEnvelope,
  BsEyeFill,
  BsGeoAltFill,
  BsGithub,
  BsHeartFill,
  BsInstagram,
  BsLinkedin,
  BsPeopleFill,
  BsSearch,
  BsShop,
  BsStarFill,
  BsTagFill,
} from "react-icons/bs";
import momoImg from "../assets/Momo.jpg";
import ktmImg from "../../public/placeimage/KTM.jpg";

const stats = [
  { icon: BsShop, value: "500+", label: "Restaurants" },
  { icon: BsBasket2Fill, value: "1500+", label: "Foods" },
  { icon: BsGeoAltFill, value: "25+", label: "Cities" },
  { icon: BsPeopleFill, value: "10K+", label: "Happy Users" },
];

const whyChoose = [
  {
    icon: BsGeoAltFill,
    iconBg: "bg-orange-100 dark:bg-orange-500/10",
    iconColor: "text-orange-500",
    title: "Local & Trusted",
    desc: "Curated data from trusted sources across Nepal.",
  },
  {
    icon: BsSearch,
    iconBg: "bg-green-100 dark:bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-400",
    title: "Smart Search",
    desc: "Find restaurants and foods easily in your area.",
  },
  {
    icon: BsTagFill,
    iconBg: "bg-orange-100 dark:bg-orange-500/10",
    iconColor: "text-orange-500",
    title: "Price Transparency",
    desc: "Compare prices and find the best deals.",
  },
  {
    icon: BsStarFill,
    iconBg: "bg-green-100 dark:bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-400",
    title: "User Reviews",
    desc: "Real reviews from real food lovers.",
  },
  {
    icon: BsHeartFill,
    iconBg: "bg-orange-100 dark:bg-orange-500/10",
    iconColor: "text-orange-500",
    title: "Made for Nepal",
    desc: "Built with love for Nepali food lovers.",
  },
];

const team = [
  { name: "Sulav Rijal", role: "Founder & Developer", socials: ["linkedin", "github", "mail"] },
  { name: "Anusha KC", role: "UI/UX Designer", socials: ["linkedin", "globe", "mail"] },
  { name: "Sujan Thapa", role: "Backend Developer", socials: ["linkedin", "github", "mail"] },
  { name: "Pragya Shrestha", role: "Content & Marketing", socials: ["linkedin", "instagram", "mail"] },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

const socialIcon = (type) => {
  switch (type) {
    case "linkedin":
      return BsLinkedin;
    case "github":
      return BsGithub;
    case "instagram":
      return BsInstagram;
    case "mail":
      return BsEnvelope;
    default:
      return BsLinkedin;
  }
};

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden bg-orange-50/60 dark:bg-slate-800/40">
        <div className="container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-block bg-orange-500 text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full mb-6">
              ABOUT US
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-2">
              About
            </h1>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-orange-500">Kata</span>
              <span className="text-green-600 dark:text-green-400">Kham</span>
            </h1>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Connecting Food Lovers with the Best Places in Nepal
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-md">
              KataKham is Nepal's smart food discovery platform that helps you
              find the best restaurants, popular foods, and their prices across
              your favorite locations.
            </p>
            <Link
              to="/places"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Our Story <BsArrowRight />
            </Link>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full bg-orange-100 dark:bg-orange-500/10 -z-10" />
            <img
              src={momoImg}
              alt="Delicious Nepali food platter"
              className="w-full max-w-sm object-contain drop-shadow-xl"
            />
            <div className="absolute -bottom-4 -left-2 sm:left-4 w-28 h-28 rounded-full bg-white dark:bg-slate-800 shadow-lg flex flex-col items-center justify-center text-center border border-orange-100 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-300 leading-tight">
                Made with
                <br />
                Love in
              </span>
              <span className="text-sm font-bold text-orange-500">Nepal ❤</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="bg-orange-50/60 dark:bg-slate-800/40 rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={ktmImg}
            alt="Kathmandu Durbar Square at dusk"
            className="rounded-2xl w-full h-72 md:h-80 object-cover shadow-md"
          />
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
              Our Mission &amp; Vision
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center mb-3">
                  <BsBullseye className="text-lg" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To make food discovery easy and accessible for everyone by
                  providing accurate information about restaurants, foods, and
                  prices across Nepal.
                </p>
              </div>
              <div>
                <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center mb-3">
                  <BsEyeFill className="text-lg" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To become Nepal's most trusted and loved platform for food
                  discovery, helping people connect with great food and amazing
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="container mx-auto px-6 py-4 md:py-8 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
          Why Choose <span className="text-orange-500">Kata</span>
          <span className="text-green-600 dark:text-green-400">Kham</span>?
        </h2>
        <div className="w-14 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {whyChoose.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-4`}
              >
                <Icon className={`text-2xl ${iconColor}`} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-green-800 dark:bg-green-900 rounded-2xl px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500 flex items-center justify-center">
                <Icon className="text-xl text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-extrabold text-white leading-none">
                  {value}
                </p>
                <p className="text-sm text-green-100">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-6 pb-16 md:pb-20 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
          Our Team
        </h2>
        <div className="w-14 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-green-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                {initials(member.name)}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {member.role}
              </p>
              <div className="flex items-center justify-center gap-3 text-slate-400 dark:text-slate-500">
                {member.socials.map((s) => {
                  const Icon = socialIcon(s);
                  return (
                    <Icon
                      key={s}
                      className="text-base hover:text-orange-500 transition cursor-pointer"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 dark:bg-green-950 py-14">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-3">
            Let's Explore Great Food Together!
          </h2>
          <p className="text-green-100 mb-8 max-w-lg mx-auto">
            Join thousands of food lovers discovering amazing places and
            delicious food across Nepal.
          </p>
          <Link
            to="/places"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Explore Now <BsArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;