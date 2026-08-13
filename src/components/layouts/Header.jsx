import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MythemesContext } from "../../hooks/MyThemesContext";
import { BsList, BsX } from "react-icons/bs";

const Header = () => {
  const { themes, toggleTheme } = useContext(MythemesContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/Company%20Logo.png" alt="Kata Kham logo" className="h-12 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-logo font-extrabold text-xl">
              <span className="text-orange-500">Kata</span>{" "}
              <span className="text-green-600 dark:text-green-400">Kham</span>
            </span>
            <span className="text-[11px] tracking-wide text-slate-400 dark:text-slate-500">
              Find • Explore • Eat
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700 dark:text-slate-200">
          <Link to="/" className="text-orange-500 border-b-2 border-orange-500 pb-1">Home</Link>
          <Link to="/services" className="hover:text-orange-500 transition">Restaurants</Link>
          <Link to="/foods" className="hover:text-orange-500 transition">Foods</Link>
          <Link to="/about" className="hover:text-orange-500 transition">About Us</Link>
          <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-xl px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          >
            {themes === "light" ? "🌙" : "☀️"}
          </button>

          <Link
            to="/login"
            className="hidden md:inline-flex items-center border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hidden md:inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            Sign Up
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-2xl text-slate-700 dark:text-slate-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <BsX /> : <BsList />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 px-6 py-4 flex flex-col gap-4 font-medium text-slate-700 dark:text-slate-200">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Restaurants</Link>
          <Link to="/foods" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Foods</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Contact</Link>
          <div className="flex gap-3 pt-2">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border border-slate-300 dark:border-slate-600 px-4 py-2 rounded-lg">Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-orange-500 text-white px-4 py-2 rounded-lg">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;