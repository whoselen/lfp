import { create } from "zustand";

interface CurrentRoomState {
  roomId: number | null;
}

interface CurrentRoomAction {
  setRoomId: (id: number) => void;
}

type CurrentRoomStore = CurrentRoomAction & CurrentRoomState;

export const useRoomStore = create<CurrentRoomStore>((set) => ({
  roomId: null,
  setRoomId: (id) => set({ roomId: id }),
}));
