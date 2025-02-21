import { getAvatarUrl } from "@/lib/utils";
import useRoomStore from "@/stores/room-store";
import Slot from "./slot";

const ActiveRoomParticipants = ({ roomId }: { roomId: number }) => {
  const participants = useRoomStore((state) => state.participants);

  // Ensure participants for a valid roomId
  const roomParticipants = roomId ? participants?.[roomId] || [] : [];

  console.log("roomParticipants", roomId, roomParticipants);

  // Return early if no roomParticipants or roomId
  if (!roomId || roomParticipants.length === 0) {
    return null;
  }

  return (
    <>
      {roomParticipants.map((user: any) => (
        <Slot
          filled
          key={user.user_id}
          src={getAvatarUrl(user.avatar_url)}
          username={user?.username ?? "Unknown User"}
        />
      ))}
    </>
  );
};

export default ActiveRoomParticipants;
