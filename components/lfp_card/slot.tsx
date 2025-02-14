import { Plus } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Tilt } from "../ui/tilt";

interface SlotProps {
  filled: boolean;
  href?: string;
  src?: string;
  username?: string;
  availableSlotLength?: number;
}

const Slot: React.FC<SlotProps> = ({
  filled,
  href,
  src,
  username,
  availableSlotLength,
}) => {
  return (
    <>
      {filled ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              href={href}
              tabIndex={0}
              className="size-[30px] hover:cursor-pointer hover:shadow-sm"
              draggable="false"
            >
              {/* <img
            draggable="false"
            className="h-full w-full select-none rounded-full border-1 border-stone-400 border-opacity-50 object-cover"
            src={src}
            alt="pfp"
          /> */}
              <Avatar className="h-full w-full ring-2 ring-background">
                <AvatarImage src={src} alt="pfp" />
                <AvatarFallback />
              </Avatar>
            </a>
          </HoverCardTrigger>

          <HoverCardContent>
            <Tilt rotationFactor={8} isRevese>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRS741KWlE3yP4BRZZs9KGWZmCKSXEeDMbw&s"
                      width={40}
                      height={40}
                      alt="Avatar"
                    />
                    <AvatarFallback />
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Keith Kennedy</p>
                    <p className="text-xs text-muted-foreground">@k.kennedy</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Designer at{" "}
                  <strong className="font-medium text-foreground">
                    NOTHING
                  </strong>
                  . Playing only for fun.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <img
                      className="rounded-full ring-1 ring-background"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCtFKDuFX3qHZZK2AhY7SC_E8WFtuYR5FnA&s"
                      width={20}
                      height={20}
                      alt="Friend 01"
                    />
                    <img
                      className="rounded-full ring-1 ring-background"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s"
                      width={20}
                      height={20}
                      alt="Friend 02"
                    />
                    <img
                      className="rounded-full ring-1 ring-background"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s"
                      width={20}
                      height={20}
                      alt="Friend 03"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    3 mutual games
                  </div>
                </div>
              </div>
            </Tilt>
          </HoverCardContent>
        </HoverCard>
      ) : (
        availableSlotLength !== 0 && (
          <Button
            variant="secondary"
            className="flex size-[30px] items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-2 ring-background hover:bg-secondary hover:text-foreground z-10"
            size="icon"
          >
            +{availableSlotLength}
          </Button>
          // <div
          //   draggable="false"
          //   className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#616161] p-1"
          // >
          //   <Plus className="h-5 w-5 text-white" />
          // </div>
        )
      )}
    </>
  );
};

export default Slot;
