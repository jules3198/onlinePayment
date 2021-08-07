import { createContext, useEffect, useState } from 'react';

const initialTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeContext = createContext('light');

// ThemeContext.Provider;
//    va diffuser la data du context dans les composants enfant de celui-ci

// ThemeContext.Consumer;
//    va récuperer la data envoyé par le premier Provider ascendant trouvé

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({ mode: initialTheme });

  useEffect(() => {
    const listener = (e) => {
      setTheme({ ...theme, mode: e.matches ? 'dark' : 'light' });
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listener);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
    };
  }, []);

  const toggleTheme = () => setTheme({ ...theme, mode: theme.mode === 'light' ? 'dark' : 'light' });

  return (
    <ThemeContext.Provider value={{ theme: theme.mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
