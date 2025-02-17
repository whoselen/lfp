"use client";

import { useUserStore } from "@/stores/user-store";
import { createClient } from "@/utils/supabase/client";
import { AuthSession } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SessionContext = createContext<AuthSession | null>(null);

const UserContext = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [session, setSession] = useState<AuthSession | null>(null);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        clearUserInfo();
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      if (!session) {
        return;
      }

      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select(`username, bio, avatar_url`)
          .eq("id", session.user.id)
          .single();

        if (error && status !== 406) {
          console.log("error", error);
        }

        if (data) {
          setUserInfo({
            username: data.username,
            bio: data.bio,
            avatar_url: data.avatar_url,
          });
        }
      } catch (error) {
        console.error("Error loading user data!");
      } finally {
      }
    };
    getProfile();
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

const useUser = () => {
  const session = useContext(SessionContext);
  return session?.user;
};

export { useUser };

export default UserContext;
