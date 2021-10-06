import React, { useState, useEffect, Fragment } from "react";

export const MatchMedia = ({ mediaWidth, children }) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    function handleMatchMediaOnResize() {
      mediaWidth.forEach((width) => {
        setIsMatch(window.matchMedia(width).matches);
      });
    }

    handleMatchMediaOnResize();
    window.addEventListener("resize", handleMatchMediaOnResize, false);

    return () => {
      window.removeEventListener("resize", handleMatchMediaOnResize, false);
    };
  }, [mediaWidth]);

  return isMatch && <Fragment>{children}</Fragment>;
};

export default MatchMedia;
