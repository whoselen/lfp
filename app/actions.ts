"use server";

import { FormState } from "@/lib/definitions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = {
    email,
    password,
  };

  if (!email || !password) {
    return {
      errors: "Email and password are required.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      errors: error.message,
    };
  }

  return {
    message: "Welcome!",
  };
}

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      errors: error.message,
    };
  }
  return {
    message:
      "Registration successful! Please check your email to verify your account.",
  };
}

export async function signout(state: FormState) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      errors: error.message,
    };
  }

  return redirect("/");
}
