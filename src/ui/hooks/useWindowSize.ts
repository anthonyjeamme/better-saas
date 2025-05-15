import { useEffect, useState } from "react";

/**
 *
 */
export function useWindowSize() {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

function getSize() {
  if (typeof window === "undefined") return { width: 0, height: 0 };

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
