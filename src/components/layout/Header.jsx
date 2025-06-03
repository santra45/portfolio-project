import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { 
    darkMode, 
    toggleDarkMode, 
    setSystemThemePreference,
    setDarkTheme,
    setLightTheme,
    isUsingSystemTheme 
  } = useTheme();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  
  const handleThemeChange = (theme) => {
    setShowThemeOptions(false);
    
    if (theme === 'system') {
      // Use system theme preference
      setSystemThemePreference();
    } else if (theme === 'light') {
      // Explicitly set to light mode
      setLightTheme();
    } else if (theme === 'dark') {
      // Explicitly set to dark mode
      setDarkTheme();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* Theme selector dropdown */}
            <div className="relative hidden md:block">
              <motion.button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowThemeOptions(!showThemeOptions)}
                whileTap={{ scale: 0.95 }}
                aria-label="Theme options"
              >
                {isUsingSystemTheme ? (
                  <ComputerDesktopIcon className="h-5 w-5" />
                ) : darkMode ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </motion.button>
              
              <AnimatePresence>
                {showThemeOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                        !darkMode && !isUsingSystemTheme
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <SunIcon className="h-4 w-4" />
                      <span>Light</span>
                      {!darkMode && !isUsingSystemTheme && (
                        <span className="ml-auto text-primary-500">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                        darkMode && !isUsingSystemTheme
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <MoonIcon className="h-4 w-4" />
                      <span>Dark</span>
                      {darkMode && !isUsingSystemTheme && (
                        <span className="ml-auto text-primary-500">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                        isUsingSystemTheme
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ComputerDesktopIcon className="h-4 w-4" />
                      <span>System</span>
                      {isUsingSystemTheme && (
                        <span className="ml-auto text-primary-500">✓</span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile theme toggle (simplified) */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 py-4 px-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2">THEME</p>
                <button
                  className="w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    handleThemeChange('light');
                    setMobileMenuOpen(false);
                  }}
                >
                  <SunIcon className="h-5 w-5" />
                  <span>Light</span>
                  {!darkMode && !isUsingSystemTheme && (
                    <span className="ml-auto text-primary-500">✓</span>
                  )}
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    handleThemeChange('dark');
                    setMobileMenuOpen(false);
                  }}
                >
                  <MoonIcon className="h-5 w-5" />
                  <span>Dark</span>
                  {darkMode && !isUsingSystemTheme && (
                    <span className="ml-auto text-primary-500">✓</span>
                  )}
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    handleThemeChange('system');
                    setMobileMenuOpen(false);
                  }}
                >
                  <ComputerDesktopIcon className="h-5 w-5" />
                  <span>System</span>
                  {isUsingSystemTheme && (
                    <span className="ml-auto text-primary-500">✓</span>
                  )}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
