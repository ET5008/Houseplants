import { useEffect } from 'react';

// Hook to handle click outside of a referenced element
export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      // Check if click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
};
