import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">🍽️</div>
      <h1 className="text-6xl font-black text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Page Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Looks like this page went out for food and never came back!
      </p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;