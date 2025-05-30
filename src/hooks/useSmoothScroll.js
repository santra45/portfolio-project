import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scrolling to all anchor links
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      
      if (target && target.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for header height
            behavior: 'smooth',
          });
          
          // Update URL without adding to history
          window.history.pushState(null, '', targetId);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};
