"use client";

import { login, signup } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle as Google } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../ui/password-input";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be 2 or more characters long" }),
  password: z
    .string()
    .min(6)
    .max(50, { message: "Password must be between 6 and 50 characters long" }),
});

export function AuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [type, setType] = useState<"login" | "signup">("login");

  //@ts-ignore
  const [state, action, pending] = useActionState(login, undefined);
  const [signupState, signupAction, signupPending] = useActionState(
    //@ts-ignore
    signup,
    undefined
  );

  useEffect(() => {
    state?.message && toast.success(state.message);
  }, [state]);

  useEffect(() => {
    state?.errors && toast.error(state.errors);
  }, [state]);

  useEffect(() => {
    signupState?.message && toast.success(signupState.message);
  }, [signupState]);

  useEffect(() => {
    signupState?.errors && toast.error(signupState.errors);
  }, [signupState]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      if (type === "login") {
        // await action(formData);
        toast.success("Welcome back, pal!");
      } else {
        // await signup(formData);
        toast.success("Your account has been created!", {
          description: "You can login with your credentials now.",
        });
      }
    } catch (e) {
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden rounded-lg border-none">
          <CardContent className="grid p-0 md:grid-cols-2">
            <Form {...form}>
              <form
                className="p-6 md:p-8"
                // onSubmit={form.handleSubmit(onSubmit)}
                action={type === "login" ? action : signupAction}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border mb-2"
                      aria-hidden="true"
                    >
                      <div className="relative text-2xl font-[family-name:var(--font-silkscreen)] select-none">
                        ASAP
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                      {type === "login"
                        ? "Welcome back, warrior"
                        : "Hello, warrior"}
                    </h1>
                    <p className="text-balance text-muted-foreground">
                      People are waiting for you
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your username"
                            required
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                              required
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {type === "login" && (
                      <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id={`remember`} />
                          <Label
                            htmlFor={`remember`}
                            className="font-normal text-muted-foreground text-xs"
                          >
                            Remember me
                          </Label>
                        </div>
                        <a
                          className="underline hover:no-underline text-xs"
                          href="#"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={pending || signupPending}
                  >
                    {type === "login" ? "Sign in" : "Sign up"}
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground text-xs">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full col-span-full">
                      <Google className="h-6 w-6" />
                      <span className="sr-only">Login with Google</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    {type === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <Button
                      variant="link"
                      className="underline underline-offset-4"
                      type="button"
                      onClick={() =>
                        setType(type === "login" ? "signup" : "login")
                      }
                    >
                      {type === "login" ? "Sign up" : "Sign in"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
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
      {/* <Toast>
        <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
          <div className="flex gap-2">
            <p className="grow text-sm">
              <CircleCheck
                className="-mt-0.5 me-3 inline-flex text-emerald-500"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              You have created an account successfully!
            </p>
            <Button
              variant="ghost"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
              aria-label="Close notification"
            >
              <X
                size={16}
                strokeWidth={2}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </Toast> */}
    </>
  );
}
