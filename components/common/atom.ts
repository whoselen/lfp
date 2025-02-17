import { getRandomColor } from "@/lib/colors";
import { atom } from "jotai";

const appLogoCharacterIndexAtom = atom(0);

const randomColorAtom = atom(getRandomColor());

const randomColor = atom(
  (get) => get(randomColorAtom),
  (_, set) => {
    const newColor = getRandomColor();
    set(randomColorAtom, newColor);
  }
);

export { appLogoCharacterIndexAtom, randomColor };
