import { useEffect, useState } from 'react';

const AbstractBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Abstract floating shapes */}
      <div className="abstract-bg">
        {/* Large blurred gradient orbs */}
        <div
          className="floating-shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
        <div
          className="floating-shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
          }}
        />
        <div
          className="floating-shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
          }}
        />
        <div
          className="floating-shape shape-4"
          style={{
            transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
          }}
        />

        {/* Geometric shapes */}
        <div className="geometric-shape geo-1" />
        <div className="geometric-shape geo-2" />
        <div className="geometric-shape geo-3" />
        <div className="geometric-shape geo-4" />

        {/* Additional floating elements */}
        <svg
          className="absolute top-[20%] left-[5%] w-16 h-16 opacity-10 animate-rotate-slow"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#024de6"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>

        <svg
          className="absolute top-[70%] right-[8%] w-20 h-20 opacity-10 animate-bounce-subtle"
          viewBox="0 0 100 100"
          style={{ animationDelay: '-1s' }}
        >
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="#024de6"
            strokeWidth="2"
          />
        </svg>

        <svg
          className="absolute bottom-[15%] left-[15%] w-12 h-12 opacity-10"
          viewBox="0 0 100 100"
          style={{ animation: 'rotate-slow 15s linear infinite reverse' }}
        >
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="#024de6"
            strokeWidth="2"
            transform="rotate(45 50 50)"
          />
        </svg>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(2, 77, 230, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(2, 77, 230, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </>
  );
};

export default AbstractBackground;
