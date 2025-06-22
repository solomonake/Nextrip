import { useState, useEffect } from 'react';

/**
 * A hook that returns true if the current viewport matches the given media query
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state initially
    setMatches(media.matches);
    
    // Define a callback function to handle changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add the callback as a listener for changes to the media query
    media.addEventListener('change', listener);
    
    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;