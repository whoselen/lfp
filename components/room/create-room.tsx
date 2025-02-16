import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { GlowEffect } from "../ui/glow-effect";
import { TextLoop } from "../ui/text-loop";
import { forwardRef } from "react";

export const CreateRoom = forwardRef<HTMLDivElement>((props, forwardedRef) => (
  <div
    className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border mx-4 ml-8 bg-background"
    {...props}
    ref={forwardedRef}
  >
    {/* <p className="">Create your own room, make your own rule</p> */}
    {/* <div className="flex-grow">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      </div> */}
    <Button
      tabIndex={-1}
      variant="outline"
      className="flex-grow border border-border justify-start hover:bg-background"
    >
      <TextLoop className="text-sm">
        <span>+3 low rank</span>
        <span>Break my losing streak, please!</span>
        <span>Let's learn together</span>
        <span>+2 valorant lobby</span>
      </TextLoop>
    </Button>

    <div className="relative">
      <GlowEffect
        colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
        mode="colorShift"
        blur="soft"
        duration={3}
        scale={0.9}
      />
      <Button variant="outline" className="relative flex gap-2">
        Create <Plus className="size-4" />
      </Button>
    </div>
  </div>
));
