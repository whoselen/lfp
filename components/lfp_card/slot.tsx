import { Plus } from "lucide-react";
import React from "react";

interface SlotProps {
  filled: boolean;
  href?: string;
  src?: string;
  username?: string;
}

const Slot: React.FC<SlotProps> = ({ filled, href, src, username }) => {
  return (
    <>
      {filled ? (
        <a
          href={href}
          tabIndex={0}
          className="h-[30px] w-[30px] rounded-full hover:cursor-pointer hover:shadow-sm"
          draggable="false"
          title={username}
        >
          <img
            draggable="false"
            className="h-full w-full select-none rounded-full border-1 border-stone-400 border-opacity-50 object-cover"
            src={src}
            alt="pfp"
          />
        </a>
      ) : (
        <div
          draggable="false"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#616161] p-1"
        >
          <Plus className="h-5 w-5 text-white" />
        </div>
      )}
    </>
  );
};

export default Slot;
