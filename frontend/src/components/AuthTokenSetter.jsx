import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { axiosInstance } from "../lib/axios";

export default function AuthTokenSetter() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function setToken() {
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (!mounted) return;
          if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (e) {
          console.error("Failed to get Clerk token:", e);
        }
      } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
    }

    setToken();
    return () => { mounted = false; };
  }, [getToken, isSignedIn]);

  return null;
}
