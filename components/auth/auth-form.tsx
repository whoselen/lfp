import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import LoginForm from "./login-form";
import SignUpForm from "./signup-form";

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [type, setType] = useState<"login" | "signup">("login");

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden rounded-lg border-none">
          <CardContent className="grid p-0 md:grid-cols-2">
            {type === "login" && <LoginForm setType={setType} />}
            {type === "signup" && <SignUpForm setType={setType} />}
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://i.pinimg.com/originals/d0/e0/e2/d0e0e259bf0aba4da742bedff1d4b8a5.gif"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
