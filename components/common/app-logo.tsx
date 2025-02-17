"use client";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import Link from "next/link";
import { appLogoCharacterIndexAtom, randomColor } from "./atom";

const PROJECT_NAME = "ASAP";

type AppLogoType = {
  isSidebarCollapsed?: boolean;
  className?: string;
};

export const AppLogo = ({ isSidebarCollapsed, className }: AppLogoType) => {
  const [activeIndex, setActiveIndex] = useAtom(appLogoCharacterIndexAtom);
  const [randColor, refreshRandomColor] = useAtom(randomColor);

  const handleCharacterHover = (index: number) => () => {
    if (activeIndex === index) {
      return;
    }
    setActiveIndex(index);
    refreshRandomColor();
  };

  return (
    <div className={cn("flex justify-center h-20", className)}>
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
                backgroundColor: randColor,
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
