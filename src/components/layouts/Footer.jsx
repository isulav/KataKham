import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-2xl font-black text-orange-500">Kata</span>
              <span className="text-2xl font-black text-green-400">Kham</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find food. Compare prices. Know where to eat.
              Your go-to food discovery platform across Nepal.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-orange-400 transition">Home</Link>
              <Link to="/services" className="hover:text-orange-400 transition">Features</Link>
              <Link to="/about" className="hover:text-orange-400 transition">About Us</Link>
              <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <p>📧 hello@katakham.com</p>
              <p>📍 Kathmandu, Nepal</p>
              <p>📱 +977 98XXXXXXXX</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          © 2026 KataKham. All rights reserved. — <span className="text-orange-400">Aba Khana Kata Kham?</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;