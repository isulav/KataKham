import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsPerson, BsEnvelope, BsTelephone, BsLock, BsEye, BsEyeSlash,
  BsGift, BsPersonHearts, BsHeart, BsBell, BsFacebook,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const perks = [
  { icon: BsGift, title: "Exclusive Offers", desc: "Get special discounts and offers from top restaurants.", bg: "bg-orange-500" },
  { icon: BsPersonHearts, title: "Personalized Experience", desc: "Get food recommendations tailored just for you.", bg: "bg-green-600" },
  { icon: BsHeart, title: "Save Favorites", desc: "Save your favorite dishes and restaurants.", bg: "bg-blue-500" },
  { icon: BsBell, title: "Stay Updated", desc: "Get the latest updates on new restaurants and offers.", bg: "bg-purple-500" },
];

const Signup = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed.");
        setLoading(false);
        return;
      }

      setSuccess(true);
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

          {success ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Account Created!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Welcome to Kata Kham. Start exploring Nepal's food scene.
              </p>
              <Link
                to="/login"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-black mb-1 dark:text-white">Create Your Account</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Join Kata Kham and start exploring the best food across Nepal.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 dark:text-slate-200">Full Name</label>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                    <BsPerson className="text-slate-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 dark:text-slate-200">Email Address</label>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                    <BsEnvelope className="text-slate-400 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 dark:text-slate-200">Phone Number</label>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                    <BsTelephone className="text-slate-400 flex-shrink-0" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-slate-200">Password</label>
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                      <BsLock className="text-slate-400 flex-shrink-0" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="flex-1 outline-none bg-transparent dark:text-white text-sm min-w-0"
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

                  <div>
                    <label className="block text-sm font-semibold mb-2 dark:text-slate-200">Confirm Password</label>
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                      <BsLock className="text-slate-400 flex-shrink-0" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className="flex-1 outline-none bg-transparent dark:text-white text-sm min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="accent-orange-500 mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Sign Up"}
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
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </>
          )}
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

export default Signup;