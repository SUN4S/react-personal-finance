import { useEffect, useState } from "react";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const setTheme = (mode: string) => {
    localStorage.setItem("theme", mode);
    setCurrentTheme(mode);
  };

  // On load, set html->data-theme to currentTheme('light' or 'dark')
  useEffect(() => {
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return { currentTheme, setTheme };
};
