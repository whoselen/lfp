import { getRandomColor } from "@/lib/colors";
import { useState } from "react";

export const useRandomColor = () => {
  const [color, setColor] = useState("");

  const refreshColor = () => {
    setColor(getRandomColor());
  };

  return [color, refreshColor] as const;
};
