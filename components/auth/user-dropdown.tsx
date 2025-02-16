import { signout } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";

import {
  Bolt,
  BookOpen,
  ChevronDown,
  Layers2,
  LogOut,
  Pin,
  UserPen,
} from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function UserDropdown() {
  const supabase = createClient();
  const user = supabase.auth.getUser();
  //@ts-ignore
  const [state, action, pending] = useActionState(signout, undefined);
  console.log({ state });

  useEffect(() => {
    state?.errors && toast.error(state.errors);
  }, [state]);

  useEffect(() => {
    state?.message && toast.info(state.message);
  }, [state]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-9 border border-border">
            <AvatarImage
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e3/e32de017ab05fe4e58083175ff1b4fa221ee78a7_full.jpg"
              alt="Profile image"
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          {/* <ChevronDown
            size={16}
            strokeWidth={2}
            className="ms-2 opacity-60"
            aria-hidden="true"
          /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={12} className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            Keith Kennedy
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {/* {user} */}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bolt
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pin
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={action}>
          <DropdownMenuItem>
            <Button
              type="submit"
              variant="ghost"
              className="flex items-center gap-2 w-full"
            >
              <LogOut
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Logout</span>
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
