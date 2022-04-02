import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../api/firebase";
import React from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import { useDownloadUrl } from "../api/storage";

export const IndexPage = () => {
  const { userId } = useAuth();
  const { data: url } = useDownloadUrl(`/user/${userId}/file.mp3`);

  return userId ? (
    <div
      css={css`
        display: grid;
        gap: 16px;
      `}
    >
      <input
        type="file"
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;

          const snapshot = await uploadBytes(
            ref(storage, `/user/${userId}/file.mp3`),
            file
          );
          console.log(snapshot);
        }}
      />

      <audio src={url} controls />
    </div>
  ) : null;
};

export default IndexPage;
