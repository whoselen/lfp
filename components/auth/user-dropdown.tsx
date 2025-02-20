"use client";

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

import { BookOpen, Layers2, Pin, Settings, UserPen } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "../context/user-context";
import LogOut from "./logout";
import { useUserStore } from "@/stores/user-store";
import { getAvatarUrl } from "@/lib/utils";

export default function UserDropdown() {
  const user = useUser();

  const [state, action, pending] = useActionState(signout, undefined);
  const username = useUserStore((state) => state.username);
  const bio = useUserStore((state) => state.bio);
  const avatar_url = useUserStore((state) => state.avatar_url);

  useEffect(() => {
    state?.errors && toast.error(state.errors);
  }, [state]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-9 border border-border">
            <AvatarImage src={getAvatarUrl(avatar_url)} alt="Profile image" />
            <AvatarFallback className="text-[xxs]">{username}</AvatarFallback>
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
            {username}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {/* {user} */}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile/settings">
              <Settings
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
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
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
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
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogOut buttonVariant="ghost" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
