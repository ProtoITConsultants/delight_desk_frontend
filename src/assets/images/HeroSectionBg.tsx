const HeroSectionBg = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="stripe-grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="rgba(147, 51, 234, 0.4)"
            strokeWidth="1"
          />
        </pattern>
        <pattern
          id="stripe-dots"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12.5" cy="12.5" r="1" fill="rgba(147, 51, 234, 0.3)" />
        </pattern>
      </defs>

      {/* Base grid pattern */}
      <rect width="100%" height="100%" fill="url(#stripe-grid)" />

      {/* Dot overlay */}
      <rect width="100%" height="100%" fill="url(#stripe-dots)" />

      {/* Diagonal lines */}
      <g stroke="rgba(236, 72, 153, 0.25)" strokeWidth="1">
        <line x1="0" y1="0" x2="1000" y2="1000" />
        <line x1="100" y1="0" x2="1100" y2="1000" />
        <line x1="200" y1="0" x2="1200" y2="1000" />
        <line x1="300" y1="0" x2="1300" y2="1000" />
        <line x1="400" y1="0" x2="1400" y2="1000" />
        <line x1="500" y1="0" x2="1500" y2="1000" />
        <line x1="-100" y1="0" x2="900" y2="1000" />
        <line x1="-200" y1="0" x2="800" y2="1000" />
        <line x1="-300" y1="0" x2="700" y2="1000" />
        <line x1="-400" y1="0" x2="600" y2="1000" />
        <line x1="-500" y1="0" x2="500" y2="1000" />
      </g>

      {/* Counter-diagonal lines */}
      <g stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1">
        <line x1="0" y1="1000" x2="1000" y2="0" />
        <line x1="100" y1="1000" x2="1100" y2="0" />
        <line x1="200" y1="1000" x2="1200" y2="0" />
        <line x1="300" y1="1000" x2="1300" y2="0" />
        <line x1="400" y1="1000" x2="1400" y2="0" />
        <line x1="-100" y1="1000" x2="900" y2="0" />
        <line x1="-200" y1="1000" x2="800" y2="0" />
        <line x1="-300" y1="1000" x2="700" y2="0" />
        <line x1="-400" y1="1000" x2="600" y2="0" />
      </g>
    </svg>
  );
};

export default HeroSectionBg;
