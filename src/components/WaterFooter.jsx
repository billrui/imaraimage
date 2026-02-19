import { useEffect, useState } from "react";

const NUM_BUBBLES = 18;
const NUM_PARTICLES = 15;

export default function WaterFooter() {
  const [scrollY, setScrollY] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Show bubbles after 1s delay
    const timer = setTimeout(() => setShowBubbles(true), 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const bubbles = Array.from({ length: NUM_BUBBLES });
  const particles = Array.from({ length: NUM_PARTICLES });

  return (
    <div className="absolute bottom-0 w-full h-48 overflow-hidden pointer-events-none z-0">
      {/* Micro-particles */}
      {particles.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const leftStart = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 10;
        const speed = 8 + Math.random() * 4;

        return (
          <span
            key={`p-${i}`}
            className={`absolute bottom-0 rounded-full bg-white/40 animate-bubble
                        transition-all duration-1000 ease-out
                        ${showBubbles ? "opacity-40 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${leftStart}%`,
              animationDuration: `${speed}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateX(${drift}px)`,
              filter: "blur(1px)",
            }}
          />
        );
      })}

      {/* Main glowing drifting bubbles */}
      {bubbles.map((_, i) => {
        const size = 10 + Math.random() * 18;
        const leftStart = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 25;
        const speed = 6 + Math.random() * 6;
        const scrollFactor = 1 - Math.min(scrollY / 800, 0.4);

        return (
          <span
            key={`b-${i}`}
            className={`absolute bottom-0 rounded-full bg-white/70
                        shadow-[0_0_10px_4px_rgba(255,255,255,0.5)] animate-bubble
                        transition-all duration-1000 ease-out
                        ${showBubbles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${leftStart}%`,
              animationDuration: `${speed * scrollFactor}s`,
              animationDelay: `${Math.random() * 4}s`,
              "--drift": `${drift}px`,
              filter: "blur(1.5px)",
            }}
          />
        );
      })}

      {/* Animated wave */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-28 absolute bottom-0"
      >
        <path
          fill="#ffffff"
          d="M0,60 C150,100 350,20 600,40 850,60 1050,20 1200,40 L1200,120 L0,120 Z"
        >
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values={`
              M0,60 C150,100 350,20 600,40 850,60 1050,20 1200,40 L1200,120 L0,120 Z;
              M0,40 C200,20 400,100 600,60 800,20 1000,80 1200,60 L1200,120 L0,120 Z;
              M0,60 C150,100 350,20 600,40 850,60 1050,20 1200,40 L1200,120 L0,120 Z
            `}
          />
        </path>
      </svg>
    </div>
  );
}
