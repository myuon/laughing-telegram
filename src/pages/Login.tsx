import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/firebase";
import { useAuth } from "../helpers/useAuth";
import { Button } from "../components/Button";

const provider = new GoogleAuthProvider();

export const LoginPage = () => {
  const { login } = useAuth();
  useEffect(() => {
    (async () => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        login(token, auth.currentUser?.uid ?? "");
      }
    })();
  }, [login]);

  return (
    <div>
      <Button
        onClick={async () => {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          if (!token) {
            return;
          }

          await login(token, result.user.uid);
        }}
      >
        Sign In With Google
      </Button>
    </div>
  );
};

export default LoginPage;
