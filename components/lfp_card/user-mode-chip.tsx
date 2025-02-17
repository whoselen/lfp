import React from "react";
import { Badge } from "../ui/badge";

interface UserModeChipProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const UserModeChip: React.FC<UserModeChipProps> = ({
  title,
  backgroundColor,
  textColor,
}) => {
  return (
    <Badge
      className="text-[10px] font-light text-white max-h-min bg-muted text-secondary-foreground border border-border"
      // className={`h-min w-fit max-w-chip-1 select-none rounded-lg px-2 py-[3px] text-[9px] font-light leading-none
      //           bg-gray-500 text-main-gray text-white
      //           ${backgroundColor ? `bg-[#${backgroundColor}]` : ""}
      //           ${textColor ? `text-[#${textColor}]` : ""}`}
    >
      {title}
    </Badge>
  );
};

export default UserModeChip;
