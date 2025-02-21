import { create } from "zustand";

export type RoomState = {
  rooms: any;
  hasMore: boolean;
  page: number;
  participants: {
    [roomId: string]: {
      avatar_url: string;
      id: number;
      user_id: string;
      username: string;
    }[];
  };
  hasRoomsUpdated: boolean;
};

export type RoomActions = {
  addRooms: (newRooms: any) => void;
  resetRooms: () => void;
  updateParticipant: (
    connectionId: number,
    roomId: number | undefined,
    userId: string | undefined,
    info: any | undefined,
    action: "join" | "leave"
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
      rooms: {},
      hasMore: true,
      page: 0,
    }),

  updateParticipant: (connectionId, roomId, userId, info, action) => {
    return set((state) => {
      // Only find roomId based on connectionId if action is "leave"
      let currentRoomId = roomId;

      if (action === "leave" && connectionId) {
        // Search for the roomId that contains the participant with the matching connectionId
        Object.keys(state.participants).forEach((key) => {
          const participantsInRoom = state.participants[key];
          const participant = participantsInRoom.find(
            (user) => user.id === connectionId
          );
          if (participant) {
            currentRoomId = Number(key); // Room found, set the roomId
          }
        });
      }

      // If no roomId was found and action is "leave", return early
      if (!currentRoomId) {
        console.log("Participant not found in any room or no roomId provided");
        return state;
      }

      const currentParticipants = state.participants[currentRoomId] || [];
      let updatedParticipants = [...currentParticipants];

      if (
        action === "join" &&
        !updatedParticipants.some((user) => user.user_id === userId)
      ) {
        updatedParticipants.push({
          id: connectionId,
          user_id: userId!,
          avatar_url: info?.avatar_url || "",
          username: info?.username || "",
        });
      } else if (action === "leave") {
        // Filter out the participant by connectionId when leaving
        updatedParticipants = updatedParticipants.filter(
          (participant) => participant.id !== connectionId
        );
      }

      // Return the updated state
      return {
        participants: {
          ...state.participants,
          [currentRoomId]: updatedParticipants, // Update the participants for the correct room
        },
      };
    });
  },
}));

export default useRoomStore;
