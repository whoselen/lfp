"use client";

import { signout } from "@/app/actions";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import { useActionState } from "react";
import { Button } from "../ui/button";

type ButtonVariantTypes = ButtonProps["variant"];

type LogoutType = {
  className?: string;
  buttonVariant?: ButtonVariantTypes;
};
const LogOut = ({ className, buttonVariant = "outline" }: LogoutType) => {
  const [_state, action, pending] = useActionState(signout, { errors: "" });

  return (
    <form action={action} className="w-full">
      <Button
        className={cn("w-full justify-between gap-4", className)}
        variant={buttonVariant}
        disabled={pending}
      >
        <span>Log out</span>
        <LogOutIcon
          size={16}
          strokeWidth={2}
          className="text-destructive"
          aria-hidden="true"
        />
      </Button>
    </form>
  );
};

export default LogOut;
