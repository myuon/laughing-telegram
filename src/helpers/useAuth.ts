import { del, get, set } from "idb-keyval";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextState {
  userId: string | undefined;
  token: string | undefined;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextState | undefined>(
  undefined
);
export const AuthProvider = AuthContext.Provider;

const IDB_TOKEN_KEY = "token";

export const initializeUseAuth = () => {
  interface IdbTokenData {
    token: string;
    userId: string;
  }

  const navigate = useNavigate();
  const [token, setToken] = useState<string | undefined>();
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    if (!token) {
      (async () => {
        const data = (await get(IDB_TOKEN_KEY)) as IdbTokenData | undefined;
        if (!data) {
          return navigate("/login");
        }

        setToken(data.token);
        setUserId(data.userId);
      })();
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      userId,
      login: async (token: string, userId: string) => {
        setToken(token);
        await set(IDB_TOKEN_KEY, {
          token,
          userId,
        } as IdbTokenData);

        navigate("/");
      },
      logout: async () => {
        setToken(undefined);
        await del(IDB_TOKEN_KEY);

        navigate("/login");
      },
    }),
    []
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
