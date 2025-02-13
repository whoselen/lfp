"use client";

import { useRandomColor } from "@/hooks/useRandomColor";
import Link from "next/link";
import { useEffect, useState } from "react";

const PROJECT_NAME = "ASAP";

type SidebarLogoType = {
  isSidebarCollapsed: boolean;
};

export const SidebarLogo = ({ isSidebarCollapsed }: SidebarLogoType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomColor, refreshRandomColor] = useRandomColor();

  useEffect(() => {
    refreshRandomColor();
  }, [activeIndex]);

  const handleCharacterHover = (index: number) => () => {
    setActiveIndex(index);
  };

  return (
    <div className="p-5 border-b">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className={`flex items-center justify-center gap-2 ${
            isSidebarCollapsed ? "flex-col" : ""
          }`}
        >
          <img
            src={`/images/${activeIndex + 1}.png`}
            alt="logo-prev"
            className="h-12 w-12 object-contain"
          />
          <div className="relative text-2xl font-[family-name:var(--font-silkscreen)] select-none">
            {PROJECT_NAME.split("").map((char, index) => (
              <span
                key={char + index}
                className=""
                onMouseEnter={handleCharacterHover(index)}
              >
                {char}
              </span>
            ))}
            <div
              className={`absolute -bottom-1 w-2 h-2 rounded-full transition-all duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)]`}
              style={{
                left: `calc(${(activeIndex + 1) * 1}ch - 0.69ch)`,
                backgroundColor: randomColor,
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
