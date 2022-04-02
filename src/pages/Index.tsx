import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import React from "react";

export const IndexPage = () => {
  return (
    <div>
      <input
        type="file"
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;

          const storageRef = ref(storage, "file.mp3");
          const snapshot = await uploadBytes(storageRef, file);
          console.log(snapshot);
        }}
      />
    </div>
  );
};

export default IndexPage;
