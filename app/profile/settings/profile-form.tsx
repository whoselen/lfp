"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { useUser } from "@/components/context/user-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Avatar from "./_components/avatar";
import { Check, LoaderCircle, X } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { Value } from "@radix-ui/react-select";
import { useDebounceValue } from "usehooks-ts";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  bio: z.string().max(160).min(4),
  avatar_url: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const supabase = createClient();
  const user = useUser();
  const username = useUserStore((state) => state.username) || "";
  const bio = useUserStore((state) => state.bio) || "";
  const avatar_url = useUserStore((state) => state.avatar_url) || "";
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [searchingUsername, setSearchingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const defaultValues: Partial<ProfileFormValues> = {
    username: "",
    bio: "",
    avatar_url: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const usernameFieldValue = form.watch("username");
  const avatarUrlValue = form.watch("avatar_url");

  useEffect(() => {
    form.setValue("avatar_url", avatar_url);
    form.setValue("username", username);
    form.setValue("bio", bio);
  }, [form, username, bio, avatar_url]);

  useEffect(() => {
    if (usernameFieldValue.length < 2) {
      setIsUsernameAvailable(false);
      return;
    }

    const searchUsername = async () => {
      setSearchingUsername(true);

      try {
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", usernameFieldValue);

        if (!data?.length) {
          setIsUsernameAvailable(true);
          return;
        }

        if (username === usernameFieldValue) return;

        form.setError("username", {
          message: "This username is already taken!",
        });
        setIsUsernameAvailable(false);
      } catch {
      } finally {
        setSearchingUsername(false);
      }
    };

    searchUsername();
  }, [usernameFieldValue]);

  async function updateAvatar(url: string) {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        avatar_url: url,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      setUserInfo({ avatar_url: url });
      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error("Error has occured!");
    } finally {
    }
  }

  async function updateProfile({
    username,
    bio,
  }: {
    username: string | null;
    bio: string | null;
  }) {
    try {
      //   setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        username,
        bio,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setUserInfo({ username, bio });
      toast.success("Profile updated!");
    } catch (error) {
    } finally {
      //   setLoading(false)
    }
  }

  function onSubmit(data: ProfileFormValues) {
    updateProfile(data);
  }

  const renderUsernameStatus = () => {
    if (username === usernameFieldValue) return null;

    if (searchingUsername) {
      return (
        <LoaderCircle
          className="animate-spin"
          size={16}
          strokeWidth={2}
          role="status"
          aria-label="Loading..."
        />
      );
    }

    if (isUsernameAvailable) {
      return (
        <Check
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="text-green-500"
        />
      );
    }

    return (
      <X
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="text-red-500"
      />
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <Avatar
            defaultImage={avatarUrlValue}
            onUpload={(url) => {
              form.setValue("avatar_url", url);
              updateAvatar(url);
            }}
          />

          <div className="">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
        </div>
        <Separator />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Unique username"
                      className="peer pe-9"
                      value={value}
                      onChange={onChange}
                      {...field}
                    />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      {renderUsernameStatus()}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A little bit about yourself"
                    className="resize-none"
                    value={value}
                    onChange={onChange}
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex ml-auto">
            Update
          </Button>
        </form>
      </div>
    </Form>
  );
}
