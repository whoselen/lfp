"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { FormState } from "@/lib/definitions";

export async function login(state: FormState, formData: FormData) {
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

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        errors: error.message,
      };
    }

    return {
      message: "Authenticated",
    };
  } catch (err) {
    return {
      errors: "An error occurred. Please try again.",
    };
  }
}

export async function signup(state: FormState, formData: FormData) {
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
    message: "Account has been created",
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
  return {
    message: "Until next time!",
  };
}
