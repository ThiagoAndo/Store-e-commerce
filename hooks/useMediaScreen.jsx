import { useState, useEffect } from "react";
/**
 * useMediaScreen Hook
 * A custom hook that listens for changes in screen size based on a given media query.
 * It returns whether the screen matches the specified media query.
 *
 * @param {string} min_max - A media query string (e.g., "only screen and (min-width: 768px)").
 * @returns {Object} - An object containing `match`, a boolean indicating whether the query matches.
 */
function useMediaScreen(min_max) {
  const [match, setMatch] = useState(false); // State to track whether the media query matches

  useEffect(() => {
    // Initial check for the media query match
    setMatch(window.matchMedia(min_max).matches);
    /**
     * Updates the `match` state whenever the media query condition changes.
     * Declared as a separate function for better readability.
     */
    const handleResize = (e) => {
      setMatch(e.matches);
    };
    const mediaQuery = window.matchMedia(min_max);
    // Add an event listener to track changes to the media query
    mediaQuery.addEventListener("change", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [min_max]); // Dependency ensures the effect runs again if the query string changes

  return { match }; // Return the `match` state
}

export default useMediaScreen;
