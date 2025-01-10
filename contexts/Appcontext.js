"use client";
import useViewport from "@/hooks/useViewport";
import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/config/firebase";
export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [viewport] = useViewport();
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    async function signInToFirebase() {
      try {
        const token = await getToken({ template: "integration_firebase" });
        await signInWithCustomToken(auth, token);
      } catch (error) {
        alert(error.message);
      }
    }

    if (isSignedIn) {
      signInToFirebase();
    }
  }, [isSignedIn]);

  return (
    <AppContext.Provider value={{ viewport: viewport }}>
      {children}
    </AppContext.Provider>
  );
}
