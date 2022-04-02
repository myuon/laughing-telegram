import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { useAuth } from "../helpers/useAuth";

const getRef = (userId: string) => {
  return ref(storage, `/user/${userId}/file.mp3`);
};

export const IndexPage = () => {
  const { userId } = useAuth();

  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (userId) {
      getDownloadURL(getRef(userId)).then(setUrl);
    }
  }, [userId]);
  console.log(url);

  return userId ? (
    <div>
      <input
        type="file"
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;

          const snapshot = await uploadBytes(getRef(userId), file);
          console.log(snapshot);
        }}
      />

      <audio src={url} controls />
    </div>
  ) : null;
};

export default IndexPage;
