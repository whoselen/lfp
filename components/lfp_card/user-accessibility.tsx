import { AccessibilityToolKey } from "@/lib/constants";
import clsx from "clsx";
import React from "react";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import AccessibilityIcons from "./accessibility-icons";

interface UserAccessibilityProps {
  name: AccessibilityToolKey;
}

const UserAccessibility: React.FC<UserAccessibilityProps> = ({ name }) => {
  return (
    <Tooltip delayDuration={0}>
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
