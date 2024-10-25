import { useState, useEffect } from "react";
function useMediaScreen(min_max) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    setMatch(window.matchMedia(min_max).matches);
    // I write this into a function for better visibility
    const handleResize = (e) => {
      setMatch(e.matches);
    };
    const mediaQuery = window.matchMedia(min_max);
    mediaQuery.addEventListener("change", (e) => {
      handleResize(e);
    });
    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);
  return { match };
}

export default useMediaScreen;
