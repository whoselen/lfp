import { create } from "zustand";

export type RoomState = {
  rooms: any;
  hasMore: boolean;
  page: number;
  participants: any;
  hasRoomsUpdated: boolean;
};

export type RoomActions = {
  addRooms: (newRooms: any) => void;
  resetRooms: () => void;
  updateParticipant: (
    roomId: number,
    userId: string,
    info: any,
    action: any
  ) => void;
  onRoomsUpdated: () => void;
};

export type RoomStore = RoomState & RoomActions;

const useRoomStore = create<RoomStore>((set) => ({
  rooms: {},
  hasMore: true,
  page: 0,
  participants: {},
  hasRoomsUpdated: false,
  onRoomsUpdated: () =>
    set((state) => ({ hasRoomsUpdated: !state.hasRoomsUpdated })),
  addRooms: (newRooms) =>
    set((state) => {
      const updatedRooms = { ...state.rooms };

      newRooms.forEach((room: any) => {
        updatedRooms[room.id] = {
          ...room,
          participants: state.participants[room.id] || [], // Initialize participants if they don't exist yet
        };
      });

      return {
        rooms: updatedRooms,
        hasMore: newRooms.length > 6,
        page: state.page + 1,
      };
    }),

  resetRooms: () =>
    set({
      rooms: [],
      hasMore: true,
      page: 0,
    }),

  updateParticipant: (roomId, userId, info, action) =>
    set((state) => {
      const currentParticipants = state.participants[roomId] || [];
      let updatedParticipants = [...currentParticipants];

      if (
        action === "join" &&
        !updatedParticipants.some((user) => user.user_id === userId)
      ) {
        updatedParticipants.push({
          user_id: userId,
          avatar_url: info?.avatar_url || "",
          username: info?.username || "",
        });
      } else if (action === "leave") {
        updatedParticipants = updatedParticipants.filter(
          ({ user_id }) => user_id !== userId
        );
      }

      return {
        participants: {
          ...state.participants,
          [roomId]: updatedParticipants,
        },
      };
    }),
}));

export default useRoomStore;
