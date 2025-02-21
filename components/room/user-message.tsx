import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UserAvatar } from "../lfp_card/user-avatar";
import { getUserById } from "@/queries/users";
import useSupabaseBrowser from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Message } from "./fetchMessages";
import { useFileUrl } from "@supabase-cache-helpers/storage-react-query";

const UserMessage = ({
  userId,
  message,
  isOnline,
}: {
  userId: string | null;
  message: Message;
  isOnline: boolean;
}) => {
  const supabase = useSupabaseBrowser();

  const { data: userData } = useQuery(getUserById(supabase, userId!), {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex items-center space-x-4 mx-4">
      <UserAvatar
        profilePictureSrc={
          userData?.avatar_url ??
          "https://upload.wikimedia.org/wikipedia/commons/5/55/Question_Mark.svg"
        }
        username={userData?.username ?? ""}
        isOnline={isOnline}
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm">{userData?.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(message.created_at, {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm break-all">{message.content}</p>
      </div>
    </div>
  );
};

export default UserMessage;
