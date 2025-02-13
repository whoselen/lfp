import React from "react";
import AccessibilityIcons from "./accessibility-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface UserAccessibilityProps {
  name: string;
}

const UserAccessibility: React.FC<UserAccessibilityProps> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={`h-min min-w-fit rounded-full ${
            name === "discord" ? "bg-[#5367F7]" : "bg-slate-500"
          } px-[6px] py-[2px]`}
        >
          <AccessibilityIcons name={name} />
        </div>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};

export default UserAccessibility;
