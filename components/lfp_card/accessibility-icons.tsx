import { AccessibilityToolKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
  Gamepad,
  Headphones,
  Headset,
  Monitor,
  TabletSmartphone,
} from "lucide-react";
import React, { cloneElement, JSX } from "react";
import { FaDiscord, FaMicrophone } from "react-icons/fa6";

export interface AccessibilityIconsProps {
  name: AccessibilityToolKey;
  className?: string;
}

const iconClass = "h-3 w-3";

const iconMap: Record<AccessibilityToolKey, JSX.Element> = {
  headset: <Headset />,
  "mic-only": <FaMicrophone />,
  discord: <FaDiscord />,
  "headphone-only": <Headphones />,
  pc: <Monitor />,
  console: <Gamepad />,
  mobile: <TabletSmartphone />,
};

const AccessibilityIcons: React.FC<AccessibilityIconsProps> = ({
  name,
  className,
}) => {
  const Icon = iconMap[name];

  return (
    <>
      {Icon &&
        cloneElement(Icon, {
          className: clsx(
            cn(iconClass, className),
            name === "discord" && "text-[#7289da]"
          ),
        })}
    </>
  );
};

export default AccessibilityIcons;
