import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import React from "react";
import { useAuth } from "../helpers/useAuth";

export const IndexPage = () => {
  const { userId } = useAuth();

  return (
    <div>
      <input
        type="file"
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;

          const storageRef = ref(storage, `/user/${userId}/file.mp3`);
          const snapshot = await uploadBytes(storageRef, file);
          console.log(snapshot);
        }}
      />
    </div>
  );
};

export default IndexPage;
