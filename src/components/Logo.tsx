import React from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean; // if true, adjusts contrast if needed or keeps iconic yellow/blue branding
}

export default function Logo({ className = "", showTagline = true, size = "md", lightMode = false }: LogoProps) {
  // Dimension scales
  const sizeMap = {
    sm: { height: 36, fontSize: "text-lg", taglineSize: "text-[9px]" },
    md: { height: 48, fontSize: "text-2xl", taglineSize: "text-[11px]" },
    lg: { height: 64, fontSize: "text-3xl", taglineSize: "text-xs" },
    xl: { height: 80, fontSize: "text-4xl", taglineSize: "text-sm" },
  };

  const { height } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon: Yellow Chef Hat on Light-Blue Glazed Sprinkled Donut */}
      <svg
        style={{ height: `${height}px`, width: "auto" }}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md transition-transform hover:scale-105"
      >
        {/* Yellow Chef's Hat */}
        <path
          d="M 52 50 C 42 42, 38 25, 52 16 C 62 8, 88 5, 98 16 C 112 12, 122 26, 114 42 C 122 52, 112 64, 98 60 C 85 68, 60 66, 52 50 Z"
          fill="#FFEB3B"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Chef Hat band & folds */}
        <path d="M 52 50 L 98 56" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <path d="M 65 30 Q 68 45 70 52" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 85 28 Q 86 43 88 54" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* Donut Base (Golden Crust) */}
        <circle cx="80" cy="100" r="48" fill="#D9822B" stroke="#1A1A1A" strokeWidth="4" />

        {/* Light Blue Frosting / Icing */}
        <circle cx="80" cy="100" r="44" fill="#29B6F6" />

        {/* Inner Donut Hole */}
        <circle cx="80" cy="100" r="18" fill={lightMode ? "#FDFBF7" : "#120A07"} stroke="#1A1A1A" strokeWidth="4" />

        {/* Sprinkles on Frosting (Red, White, Green, Yellow) */}
        {/* Red sprinkles */}
        <rect x="58" y="75" width="8" height="3" rx="1.5" transform="rotate(30 58 75)" fill="#E53935" />
        <rect x="96" y="85" width="8" height="3" rx="1.5" transform="rotate(-20 96 85)" fill="#E53935" />
        <rect x="70" y="125" width="8" height="3" rx="1.5" transform="rotate(45 70 125)" fill="#E53935" />

        {/* White sprinkles */}
        <rect x="85" y="70" width="8" height="3" rx="1.5" transform="rotate(-40 85 70)" fill="#FFFFFF" />
        <rect x="52" y="105" width="8" height="3" rx="1.5" transform="rotate(15 52 105)" fill="#FFFFFF" />
        <rect x="98" y="115" width="8" height="3" rx="1.5" transform="rotate(-60 98 115)" fill="#FFFFFF" />

        {/* Green sprinkles */}
        <rect x="98" y="72" width="8" height="3" rx="1.5" transform="rotate(25 98 72)" fill="#43A047" />
        <rect x="62" y="90" width="8" height="3" rx="1.5" transform="rotate(-30 62 90)" fill="#43A047" />

        {/* Yellow sprinkles */}
        <rect x="74" y="80" width="8" height="3" rx="1.5" transform="rotate(10 74 80)" fill="#FFEB3B" />
        <rect x="104" y="100" width="8" height="3" rx="1.5" transform="rotate(50 104 100)" fill="#FFEB3B" />
        <rect x="82" y="130" width="8" height="3" rx="1.5" transform="rotate(-15 82 130)" fill="#FFEB3B" />
      </svg>

      {/* Brand Name & Official Tagline */}
      <div className="flex flex-col text-left">
        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-tight text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-sans uppercase text-2xl sm:text-3xl">
            OVEN
          </span>
          <span className="font-black tracking-wider text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-sans uppercase text-xl sm:text-2xl -mt-0.5">
            GRAINS
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-serif italic text-[#e8c56e] font-semibold tracking-wide block mt-0.5 whitespace-nowrap">
            Baking fresh memories
          </span>
        )}
      </div>
    </div>
  );
}
