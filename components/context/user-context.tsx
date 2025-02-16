"use client";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * @type {React.Context<import('@supabase/supabase-js').Session | null>}
 */

const SessionContext = createContext<Session | null>(null);

const UserContext = ({ children }: { children: ReactNode }) => {
  const supabaseClient = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
