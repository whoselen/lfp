import { login } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
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

const initialState = {
  message: "",
  errors: "",
};

const LoginForm = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<"login" | "signup">>;
}) => {
  const [state, action, pending] = useActionState(login, initialState);

  useEffect(() => {
    state?.message && toast.success(state.message);
  }, [state]);

  useEffect(() => {
    state?.errors && toast.error(state.errors);
  }, [state]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="p-6 md:p-8" action={action}>
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
            <h1 className="text-2xl font-bold">Welcome back, warrior</h1>
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
              <a className="underline hover:no-underline text-xs" href="#">
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Sign in
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
            Don't have an account?
            <Button
              variant="link"
              className="underline underline-offset-4"
              type="button"
              onClick={() => setType("signup")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
