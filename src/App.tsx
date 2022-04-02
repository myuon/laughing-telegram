import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "./firebase";

const App = () => {
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
      ></input>
    </div>
  );
};

export default App;
