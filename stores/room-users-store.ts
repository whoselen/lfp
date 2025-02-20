import { create } from "zustand";

export type RoomUsersState = {
  roomUsers: {
    [roomId: string]: {
      id: number;
    }[];
  };
};

export type RoomUsersActions = {
  setUsersForRoom: (roomId: number, users: string[]) => void;
  addUserToRoom: (roomId: number, userId: string) => void;
  removeUserFromRoom: (roomId: number, userId: string) => void;
};

export type RoomUsersStore = RoomUsersState & RoomUsersActions;

const useRoomUsersStore = create<RoomUsersStore>((set) => ({
  roomUsers: {}, // Store users per room
  setUsersForRoom: (roomId, users) =>
    set((state) => ({
      roomUsers: { ...state.roomUsers, [roomId]: users },
    })),
  addUserToRoom: (roomId, user) =>
    set((state) => ({
      roomUsers: {
        ...state.roomUsers,
        [roomId]: [...(state.roomUsers[roomId] || []), user],
      },
    })),
  removeUserFromRoom: (roomId, userId) =>
    set((state) => ({
      roomUsers: {
        ...state.roomUsers,
        [roomId]: state.roomUsers[roomId].filter(
          (user) => user.id.toString() !== userId
        ),
      },
    })),
}));

export default useRoomUsersStore;
