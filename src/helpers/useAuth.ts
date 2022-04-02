import { del, get, set } from "idb-keyval";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextState {
  authenticated: boolean;
  loading: boolean;
  userId: string;
  token: string;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextState | undefined>(
  undefined
);
export const AuthProvider = AuthContext.Provider;

const IDB_TOKEN_KEY = "token";

export const useInitializeUseAuth = () => {
  interface IdbTokenData {
    token: string;
    userId: string;
  }

  const navigate = useNavigate();
  // If you want to check the value is truthy, check loading to be false.
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      (async () => {
        const data = (await get(IDB_TOKEN_KEY)) as IdbTokenData | undefined;
        if (!data) {
          // The redirect here will be done by Router in App (should be handled here? idk🙄)
          setLoading(false);
          return;
        }

        setToken(data.token);
        setUserId(data.userId);
        setLoading(false);
      })();
    }
  }, [navigate, token]);

  const value = useMemo(
    () => ({
      token,
      userId,
      authenticated: !!token,
      loading,
      login: async (token: string, userId: string) => {
        setToken(token);
        setUserId(userId);
        await set(IDB_TOKEN_KEY, {
          token,
          userId,
        } as IdbTokenData);

        navigate("/");
      },
      logout: async () => {
        setToken("");
        setUserId("");
        await del(IDB_TOKEN_KEY);

        navigate("/login");
      },
    }),
    [loading, navigate, token, userId]
  );

  return value;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
