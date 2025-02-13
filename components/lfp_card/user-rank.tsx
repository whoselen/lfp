import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface UserRankProps {
  isLevelBased?: boolean;
  levelPrefix?: string;
  name?: string;
  iconUrl?: string;
}

const UserRank: React.FC<UserRankProps> = ({
  isLevelBased = false,
  levelPrefix = "AR",
  name = "20",
  iconUrl = "https://via.placeholder.com/150",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {isLevelBased ? (
          <div className="flex h-min flex-col items-center justify-between gap-0">
            <span className="font-os text-center text-xs font-semibold leading-3 text-white">
              {levelPrefix?.toUpperCase()}
            </span>
            <span className="font-os text-2xl font-bold leading-6 text-white">
              {name}
            </span>
          </div>
        ) : (
          <span>
            <img
              alt="user_rank"
              src={iconUrl}
              className="w-9 select-none"
              draggable="false"
            />
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};

export default UserRank;
