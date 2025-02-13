import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
  iconUrl = "https://static.wikia.nocookie.net/valorant/images/0/0b/Immortal_3_Rank.png/revision/latest?cb=20200623203617",
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
          <Avatar className="rounded-none">
            <AvatarImage src={iconUrl} alt={name} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        )}
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};

export default UserRank;
