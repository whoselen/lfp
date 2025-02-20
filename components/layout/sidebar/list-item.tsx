import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight } from "lucide-react";
import ListItemHoverContent from "./hover-content";

interface ListItemProps {
  isCollapsed: boolean;
  name: string | null;
  description: string | null;
  image_url: string | null;
}

export function ListItem({
  name,
  description,
  image_url,
  isCollapsed,
}: ListItemProps) {
  return (
    <HoverCard openDelay={400}>
      <HoverCardTrigger asChild>
        <Button
          className={`group h-auto w-full gap-4 py-3 text-left rounded-none ${
            isCollapsed ? "justify-center" : ""
          }`}
          variant="ghost"
        >
          <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-border">
            <AvatarImage
              src={image_url ?? undefined}
              alt={`${name} logo`}
              className="object-cover"
            />
            <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <>
              <div className="flex-grow space-y-1 overflow-hidden">
                <h3 className="font-semibold truncate">{name}</h3>
                <p className="text-sm font-normal text-muted-foreground truncate">
                  {description}
                </p>
              </div>
              <ChevronRight
                className="opacity-60 transition-transform group-hover:translate-x-0.5 flex-shrink-0"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </HoverCardTrigger>
      <ListItemHoverContent
        imageSrc={image_url}
        name={name}
        description={description}
      />
    </HoverCard>
  );
}
