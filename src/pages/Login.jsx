import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../hooks/MyContext";
import {
  BsPersonCircle, BsLock, BsEye, BsEyeSlash,
  BsGeoAlt, BsSearch, BsCurrencyDollar, BsStarFill, BsBookmark,
  BsShieldCheck, BsFacebook,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const perks = [
  { icon: BsGeoAlt, title: "Find Nearby Food", desc: "Discover restaurants and dishes around you.", bg: "bg-orange-500" },
  { icon: BsSearch, title: "Search Anywhere", desc: "Search any place, city or landmark in Nepal.", bg: "bg-green-600" },
  { icon: BsCurrencyDollar, title: "Compare Prices", desc: "Compare dish prices and find the best value.", bg: "bg-blue-500" },
  { icon: BsStarFill, title: "Ratings & Reviews", desc: "Check reviews and ratings from real people.", bg: "bg-yellow-500" },
  { icon: BsBookmark, title: "Save Favorites", desc: "Save your favorite dishes and restaurants.", bg: "bg-purple-500" },
];

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      login(data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-10 bg-orange-50/40 dark:bg-slate-800">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT: Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img src="/Company%20Logo.png" alt="Kata Kham logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-logo font-extrabold text-lg">
                <span className="text-orange-500">Kata</span>{" "}
                <span className="text-green-600 dark:text-green-400">Kham</span>
              </span>
              <span className="text-[10px] tracking-wide text-slate-400 dark:text-slate-500">
                Find • Explore • Eat
              </span>
            </div>
          </Link>

          <h1 className="font-heading text-3xl font-black mb-1 dark:text-white">Welcome Back!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Login to continue discovering the best food across Nepal.
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-slate-200">
                Email or Phone Number
              </label>
              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                <BsPersonCircle className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-slate-200">
                Password
              </label>
              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                <BsLock className="text-slate-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0"
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <a href="#" className="text-sm text-orange-500 font-medium hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400">or continue with</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition dark:text-slate-200">
              <FcGoogle className="text-lg" /> Continue with Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition dark:text-slate-200">
              <BsFacebook className="text-lg text-blue-600" /> Continue with Facebook
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl px-4 py-3 mt-8">
            <BsShieldCheck className="text-orange-500 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold dark:text-slate-100">Your data is safe with us.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We never share your information with anyone.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Image + Perks */}
        <div className="hidden lg:flex flex-col bg-orange-50/60 dark:bg-slate-800">
          <div className="h-64 overflow-hidden">
            <img
              src="/placeimage/KTM.jpg"
              alt="Kathmandu food"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-5 px-8 py-8">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full ${p.bg} flex items-center justify-center flex-shrink-0`}>
                  <p.icon className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-slate-100">{p.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;