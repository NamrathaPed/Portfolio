import { useEffect, useRef, useState, useCallback } from "react";

export const CustomCursor = () => {
  const ringRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  // DOM-direct cursor move — zero lag
  useEffect(() => {
    const move = (e) => {
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + "px";
        ringRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Global click ripple
  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 700);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
};
