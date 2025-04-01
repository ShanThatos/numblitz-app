import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "~/lib/clients";

import type { Session } from "@supabase/supabase-js";

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  error: null,
});

export function useSession() {
  return useContext(SessionContext);
}

export function useUser() {
  const { session } = useSession();
  return session?.user;
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error);
      } else {
        setSession(session);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return subscription.unsubscribe;
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
