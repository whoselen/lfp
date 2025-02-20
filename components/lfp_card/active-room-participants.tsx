import { getAvatarUrl } from "@/lib/utils";
import Slot from "./slot";

const ActiveRoomParticipants = ({ usersData }: { usersData: any }) => {
  return usersData?.map((user: any) => {
    return (
      <Slot
        filled
        key={user.user_id}
        src={getAvatarUrl(user.avatar_url)}
        username={user?.username ?? "asdasddasdsa"}
      />
    );
  });
};

export default ActiveRoomParticipants;
