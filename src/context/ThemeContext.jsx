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
  const [systemTheme, setSystemThemeState] = useState(null);
  const [isUsingSystemTheme, setIsUsingSystemTheme] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setSystemThemeState(prefersDark ? 'dark' : 'light');
    
    // Only use system preference if no saved preference exists
    if (savedTheme === null) {
      setIsUsingSystemTheme(true);
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      const isDark = savedTheme === 'true';
      setIsUsingSystemTheme(false);
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
    
    setIsLoading(false);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      setSystemThemeState(e.matches ? 'dark' : 'light');
      // Only update if user hasn't set a preference
      if (!('darkMode' in localStorage)) {
        setIsUsingSystemTheme(true);
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
    setIsUsingSystemTheme(false);
    document.documentElement.classList.toggle('dark', newDarkMode);
  }, [darkMode]);

  const setSystemThemePreference = useCallback(() => {
    // Remove user preference to use system setting
    localStorage.removeItem('darkMode');
    setIsUsingSystemTheme(true);
    
    // Apply system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // First remove any existing class to ensure clean state
    document.documentElement.classList.remove('dark');
    
    // Then apply the system preference
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    
    // Update the state to match system preference
    setDarkMode(prefersDark);
  }, []);

  const setDarkTheme = useCallback(() => {
    // Explicitly set dark mode regardless of current state
    localStorage.setItem('darkMode', true);
    setIsUsingSystemTheme(false);
    if (!darkMode) {
      setDarkMode(true);
    }
    document.documentElement.classList.add('dark');
  }, [darkMode]);

  const setLightTheme = useCallback(() => {
    localStorage.setItem('darkMode', false);
    setIsUsingSystemTheme(false);
    if (darkMode) {
      setDarkMode(false);
    }
    document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Prevent flash of unstyled content
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      setSystemThemePreference,
      setDarkTheme,
      setLightTheme,
      systemTheme,
      isUsingSystemTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
