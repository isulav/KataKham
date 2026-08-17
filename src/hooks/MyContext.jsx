import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

const STORAGE_KEY = "katakham_user";

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <MyContext.Provider value={{ appName: "KataKham", user, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};