import { getRankById } from "@/queries/games";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface UserRankProps {
  rankId: number;
}

const UserRank: React.FC<UserRankProps> = ({ rankId }) => {
  const supabase = useSupabaseBrowser();

  const {
    data: rank,
    isLoading,
    error,
  } = useQuery(getRankById(supabase, rankId), {
    refetchOnWindowFocus: false,
    // enabled: false,
  });

  return (
    <Tooltip>
      <TooltipTrigger>
        {rank?.rating_prefix ? (
          <div className="flex h-min flex-col items-center justify-between gap-3">
            <span className="text-center font-semibold leading-3 text-foreground">
              {rank?.rating_prefix?.toUpperCase()}
            </span>
            <Badge className="text-[0.6rem] min-w-max bg-secondary text-secondary-foreground border-none">
              {rank.name}
            </Badge>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Avatar className="rounded-none">
              <AvatarImage
                src={rank?.image_url ?? undefined}
                alt={rank?.name}
              />
              <AvatarFallback>{rank?.name}</AvatarFallback>
            </Avatar>
            <Badge className="text-[0.6rem] min-w-max bg-secondary text-secondary-foreground border border-border">
              {rank?.name}
            </Badge>
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>{rank?.name}</TooltipContent>
    </Tooltip>
  );
};

export default UserRank;
