import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

export const LoginPage = () => {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log(result.user);
          console.log(token);
        }}
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default LoginPage;
