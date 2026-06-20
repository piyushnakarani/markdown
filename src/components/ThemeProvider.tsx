'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'markdowntools-theme';
const THEME_VERSION_KEY = 'markdowntools-theme-version';
const THEME_VERSION = 'premium-dark-v2';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const savedVersion = localStorage.getItem(THEME_VERSION_KEY);

    if (savedVersion === THEME_VERSION && (saved === 'dark' || saved === 'light')) {
      setTheme(saved);
      return;
    }

    setTheme('dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(THEME_VERSION_KEY, THEME_VERSION);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (!mounted) {
    return <div className="w-full min-h-screen flex flex-col" style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
