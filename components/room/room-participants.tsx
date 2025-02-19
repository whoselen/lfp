import { getUsersByIds } from "@/queries/users";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UserAvatar } from "../lfp_card/user-avatar";

const RoomParticipants = ({
  userIds,
  onlineUsers,
}: {
  userIds: string[];
  onlineUsers: { user_id: string }[];
}) => {
  const supabase = useSupabaseBrowser();
  const { data: roomParticipants } = useQuery(getUsersByIds(supabase, userIds));

  return (
    <div className="space-y-4 first:mt-4 last:mb-4">
      {roomParticipants?.map((participant) => (
        <div key={participant.username} className="flex items-center space-x-2">
          <UserAvatar
            profilePictureSrc={participant.avatar_url ?? ""}
            username={participant?.username ?? ""}
            isOnline={onlineUsers.some(
              (user) => user.user_id === participant.id
            )}
            size="sm"
          />
          <div className="flex flex-col">
            <span className="font-medium text-xs line-clamp-1">
              {participant.username}
            </span>
            <span className="text-xxs text-muted-foreground line-clamp-1">
              @{participant.username}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomParticipants;
