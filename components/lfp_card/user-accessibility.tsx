import React from "react";
import AccessibilityIcons from "./accessibility-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import clsx from "clsx";

interface UserAccessibilityProps {
  name: string;
}

const UserAccessibility: React.FC<UserAccessibilityProps> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          className={clsx(
            "max-h-min px-2 py-1",
            name === "discord" ? "bg-[#5367F7] text-white" : "bg-primary"
          )}
        >
          <AccessibilityIcons name={name} />
        </Badge>
      </TooltipTrigger>
      <TooltipContent>I have {name}</TooltipContent>
    </Tooltip>
  );
};

export default UserAccessibility;
