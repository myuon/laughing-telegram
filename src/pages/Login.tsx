import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/firebase";
import { useAuth } from "../helpers/useAuth";
import { Button } from "../components/Button";

const provider = new GoogleAuthProvider();

export const LoginPage = () => {
  const { login } = useAuth();

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
