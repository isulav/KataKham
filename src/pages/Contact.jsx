import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-xl">
      <h1 className="text-4xl font-black mb-2 text-orange-500">Contact Us</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Have a question or want to partner with us? Reach out!
      </p>

      {submitted ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Message Sent!</h2>
          <p className="text-slate-500 dark:text-slate-400">We'll get back to you soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 dark:text-white"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 dark:text-white resize-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;