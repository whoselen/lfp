import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

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
          <div className="flex h-min flex-col items-center justify-between gap-3">
            <span className="text-center font-semibold leading-3 text-foreground">
              {levelPrefix?.toUpperCase()}
            </span>
            <Badge className="text-[0.6rem] min-w-max bg-secondary text-secondary-foreground border-none">
              {name}
            </Badge>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Avatar className="rounded-none">
              <AvatarImage src={iconUrl} alt={name} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <Badge className="text-[0.6rem] min-w-max bg-secondary text-secondary-foreground border border-border">
              {name}
            </Badge>
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};

export default UserRank;
