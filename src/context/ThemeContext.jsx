import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [systemTheme, setSystemTheme] = useState(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setSystemTheme(prefersDark ? 'dark' : 'light');
    
    // Only use system preference if no saved preference exists
    if (savedTheme === null) {
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      const isDark = savedTheme === 'true';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
    
    setIsLoading(false);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
      // Only update if user hasn't set a preference
      if (!('darkMode' in localStorage)) {
        setDarkMode(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Save user preference
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  }, [darkMode]);

  // Prevent flash of unstyled content
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      systemTheme,
      isUsingSystemTheme: !('darkMode' in localStorage)
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
