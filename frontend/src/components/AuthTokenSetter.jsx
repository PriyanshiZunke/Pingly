import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { setGetToken } from "../lib/tokenService";

export default function AuthTokenSetter() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function setToken() {
      if (isSignedIn) {
        try {
          // register getToken so non-React modules (axios) can refresh when needed
          setGetToken(getToken);

          const token = await getToken();
          if (!mounted) return;
          if (token) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Ensure the app's auth check runs after the token is attached
            try {
              const check = useAuthStore.getState().checkAuth;
              if (typeof check === "function") check();
            } catch (e) {
              // ignore
            }
          }
        } catch (e) {
          console.error("Failed to get Clerk token:", e);
        }
      } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
        setGetToken(null);
      }
    }

    setToken();
    return () => { mounted = false; };
  }, [getToken, isSignedIn]);

  return null;
}
