import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'orbs-theme';

/** Stored choice wins; otherwise follow the OS. Falls back to dark for SSR. */
function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }, [theme]);

  // Keep following the OS until the visitor makes an explicit choice.
  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const mq = matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}
