import Slot from "./slot";

const ActiveRoomParticipants = ({ usersData }: { usersData: any }) => {
  return usersData?.map((user: any) => (
    <Slot
      filled
      key={user.id}
      src={user.avatar_url ?? ""}
      username={user?.username ?? "asdasddasdsa"}
    />
  ));
};

export default ActiveRoomParticipants;
