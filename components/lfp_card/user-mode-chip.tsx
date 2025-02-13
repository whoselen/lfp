import React from "react";

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
    <div
      className={`h-min w-fit max-w-chip-1 select-none rounded-lg px-2 py-[3px] text-[9px] font-light leading-none 
                bg-gray-500 text-main-gray
                ${backgroundColor ? `bg-[#${backgroundColor}]` : ""}
                ${textColor ? `text-[#${textColor}]` : ""}`}
    >
      {title}
    </div>
  );
};

export default UserModeChip;
