'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { event } from '@/lib/analytics';

type Theme = 'light' | 'dark';
type ThemePreference = 'system' | Theme;

const THEME_STORAGE_KEY = 'markdowntools-theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? getSystemTheme() : preference;
}

function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'system';
}

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
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredPreference();
    setPreference(stored);
    setTheme(resolveTheme(stored));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || preference !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => setTheme(getSystemTheme());

    syncSystemTheme();
    mediaQuery.addEventListener('change', syncSystemTheme);
    return () => mediaQuery.removeEventListener('change', syncSystemTheme);
  }, [mounted, preference]);

  useEffect(() => {
    if (!mounted) return;

    const resolved = resolveTheme(preference);
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);

    if (preference === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  }, [preference, mounted]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setPreference(next);
    event('change_theme', { theme: next });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
