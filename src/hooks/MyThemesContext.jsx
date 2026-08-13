import { createContext, useState, useEffect } from "react";

export const MythemesContext = createContext();

export const MythemesContextProvider = ({ children }) => {
  const [themes, setThemes] = useState(() => {
    const saved = localStorage.getItem("themes");
    return saved ? saved : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themes === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("themes", themes);
  }, [themes]);

  const toggleTheme = () => {
    setThemes((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <MythemesContext.Provider value={{ themes, setThemes, toggleTheme }}>
      {children}
    </MythemesContext.Provider>
  );
};