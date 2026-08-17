import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MythemesContext } from "../hooks/MyThemesContext";
import { MyContext } from "../hooks/MyContext";
import {
  BsTelephone,
  BsPencil,
  BsCheck2,
  BsX,
  BsPerson,
  BsSliders,
  BsBell,
  BsShieldCheck,
  BsHeart,
  BsCreditCard,
  BsGlobe,
  BsQuestionCircle,
  BsInfoCircle,
  BsEnvelope,
  BsCalendar3,
  BsGeoAlt,
  BsSearch,
  BsCashCoin,
  BsRulers,
  BsChevronRight,
  BsExclamationTriangle,
  BsHeadset,
  BsArrowRight,
  BsAwardFill,
} from "react-icons/bs";

// Builds a username from the person's full name, e.g. "Ram Thapa" -> "ram.thapa"
const makeUsernameFromName = (name) => {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .join(".");
};

const avatar = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || "guest")}&backgroundColor=fdba74,86efac,fed7aa,bbf7d0`;

const sidebarNav = [
  { key: "account", label: "Account Settings", icon: BsPerson },
  { key: "preferences", label: "Preferences", icon: BsSliders },
  { key: "notifications", label: "Notifications", icon: BsBell },
  { key: "privacy", label: "Privacy & Security", icon: BsShieldCheck },
  { key: "saved", label: "Saved Places", icon: BsHeart },
  { key: "payment", label: "Payment Methods", icon: BsCreditCard },
  { key: "language", label: "Language", icon: BsGlobe },
  { key: "help", label: "Help & Support", icon: BsQuestionCircle },
  { key: "aboutapp", label: "About KataKham", icon: BsInfoCircle },
];

const Settings = () => {
  const { user, login } = useContext(MyContext);
  const [activeNav, setActiveNav] = useState("account");

  const displayUsername = user
    ? makeUsernameFromName(user.name) || user.username
    : "";

  // Phone editing (wired to backend)
  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneValue, setPhoneValue] = useState(user?.phone || "");
  const [phoneError, setPhoneError] = useState("");
  const [phoneSuccess, setPhoneSuccess] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);

  const startEditingPhone = () => {
    setPhoneValue(user?.phone || "");
    setPhoneError("");
    setPhoneSuccess("");
    setEditingPhone(true);
  };

  const cancelEditingPhone = () => {
    setEditingPhone(false);
    setPhoneError("");
  };

  const handleSavePhone = async () => {
    setPhoneError("");
    setPhoneSuccess("");

    const trimmed = phoneValue.trim();
    if (!trimmed) {
      setPhoneError("Phone number cannot be empty.");
      return;
    }
    const phonePattern = /^[0-9+\-\s()]{7,15}$/;
    if (!phonePattern.test(trimmed)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    setSavingPhone(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/phone", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, phone: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPhoneError(data.error || "Could not update phone number.");
        setSavingPhone(false);
        return;
      }

      login({ ...user, phone: trimmed });
      setPhoneSuccess("Phone number updated.");
      setEditingPhone(false);
    } catch (err) {
      console.error(err);
      setPhoneError("Could not connect to server. Is the backend running?");
    } finally {
      setSavingPhone(false);
    }
  };

  // Notification toggles (UI state only)
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    orderAlerts: true,
    newRestaurant: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">You're not logged in</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Log in to view and manage your account settings.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Go to Login <BsArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {/* Page header */}
        <h1 className="font-heading text-3xl sm:text-4xl font-black mb-1 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Manage your account, preferences and app settings.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* SIDEBAR */}
          <aside className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 lg:sticky lg:top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-200 dark:border-slate-700 mb-3">
                <img
                  src={avatar(user.username || user.name)}
                  alt={user.name || user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-heading font-bold text-lg dark:text-white">
                {user.name || displayUsername}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.username}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                <BsAwardFill /> Premium Member
              </span>
            </div>

            <nav className="flex flex-col gap-1">
              {sidebarNav.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition ${
                    activeNav === item.key
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-500 border-l-4 border-orange-500 pl-2"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="text-lg flex-shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1 text-green-700 dark:text-green-400 font-semibold">
                <BsHeadset /> Need Help?
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Visit our Help Center or contact our support team.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
              >
                Help Center <BsArrowRight />
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex flex-col gap-6">
            {/* Account Settings */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <BsPerson className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg dark:text-white">Account Settings</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Update your personal information and account details.
                    </p>
                  </div>
                </div>
                <button className="hidden sm:inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex-shrink-0">
                  Edit Profile
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <BsPerson className="text-slate-400" />
                    <span className="font-medium">Full Name</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    {user.name || "Not set"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <BsEnvelope className="text-slate-400" />
                    <span className="font-medium">Email Address</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{user.username}</span>
                </div>

                {/* Phone Number - editable */}
                <div className="py-3">
                  {editingPhone ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-orange-400 transition">
                        <BsTelephone className="text-slate-400 flex-shrink-0" />
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phoneValue}
                          onChange={(e) => setPhoneValue(e.target.value)}
                          className="flex-1 outline-none bg-transparent dark:text-white text-sm"
                          autoFocus
                        />
                      </div>

                      {phoneError && (
                        <p className="text-red-600 dark:text-red-400 text-sm">{phoneError}</p>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={handleSavePhone}
                          disabled={savingPhone}
                          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                        >
                          <BsCheck2 />
                          {savingPhone ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEditingPhone}
                          disabled={savingPhone}
                          className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm"
                        >
                          <BsX />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <BsTelephone className="text-slate-400" />
                        <span className="font-medium">Phone Number</span>
                      </div>
                      <button
                        onClick={startEditingPhone}
                        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm hover:text-orange-500 transition"
                      >
                        {user.phone || "Not set"}
                        <BsPencil className="text-xs" />
                      </button>
                    </div>
                  )}
                  {phoneSuccess && !editingPhone && (
                    <p className="text-green-600 dark:text-green-400 text-sm mt-2">{phoneSuccess}</p>
                  )}
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <BsCalendar3 className="text-slate-400" />
                    <span className="font-medium">Member Since</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">—</span>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <BsSliders className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg dark:text-white">Preferences</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customize your experience on KataKham.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { icon: BsGeoAlt, label: "Preferred Location", value: "Kathmandu, Nepal" },
                  { icon: BsSearch, label: "Default Search Type", value: "Restaurants" },
                  { icon: BsCashCoin, label: "Currency", value: "NPR (Rs.)" },
                  { icon: BsRulers, label: "Distance Unit", value: "Kilometers (km)" },
                ].map((row) => (
                  <button
                    key={row.label}
                    className="w-full flex items-center justify-between py-3 text-left hover:opacity-80 transition"
                  >
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <row.icon className="text-slate-400" />
                      <span className="font-medium">{row.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      {row.value}
                      <BsChevronRight className="text-xs" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                  <BsBell className="text-orange-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg dark:text-white">Notifications</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage how you want to receive notifications.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { key: "push", label: "Push Notifications", desc: "Receive notifications on your device" },
                  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "orderAlerts", label: "Order & Price Alerts", desc: "Get notified about price drops and offers" },
                  { key: "newRestaurant", label: "New Restaurant Updates", desc: "Get updates about new restaurants in your area" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">{item.label}</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      aria-pressed={notifications[item.key]}
                      className={`relative w-12 h-7 rounded-full transition flex-shrink-0 ${
                        notifications[item.key] ? "bg-green-600" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          notifications[item.key] ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy & Security */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <BsShieldCheck className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg dark:text-white">Privacy &amp; Security</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your privacy and security preferences.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { label: "Change Password", desc: "Update your account password", value: null },
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security", value: "Off" },
                  { label: "Login Activity", desc: "View your recent login sessions", value: null },
                  { label: "Manage Data", desc: "Download or delete your data", value: null },
                ].map((row) => (
                  <button
                    key={row.label}
                    className="w-full flex items-center justify-between py-3 text-left hover:opacity-80 transition"
                  >
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">{row.label}</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">{row.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm flex-shrink-0">
                      {row.value}
                      <BsChevronRight className="text-xs" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-heading font-bold mb-1">
                <BsExclamationTriangle /> Danger Zone
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                These actions are permanent and cannot be undone.
              </p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">Delete Account</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Permanently delete your account and all data.
                  </p>
                </div>
                <button className="border border-red-500 text-red-600 dark:text-red-400 font-semibold px-5 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition flex-shrink-0">
                  Delete Account
                </button>
              </div>
            </section>

            {/* Feedback strip */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-heading font-bold dark:text-white">Your feedback matters!</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Help us improve KataKham by sharing your feedback.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-green-600 text-green-700 dark:text-green-400 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-600 hover:text-white transition"
              >
                Give Feedback <BsArrowRight />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;