import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../api/firebase";
import React, { useState } from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import { useDownloadUrl, useListAll } from "../api/storage";
import { Button } from "../components/Button";

const AudioPlayer = ({ src }: { src?: string }) => {
  const { data: url } = useDownloadUrl(src);

  return <audio src={url} controls autoPlay />;
};

export const IndexPage = () => {
  const { userId } = useAuth();
  const { data: files } = useListAll(`/user/${userId}`);

  const [selected, setSelected] = useState<string>();

  return (
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
            ref(storage, `/user/${userId}/${file.name}`),
            file
          );
          console.log(snapshot);
        }}
      />

      <div
        css={css`
          display: grid;
          gap: 8px;
        `}
      >
        {files?.map((file) => (
          <Button key={file} onClick={() => setSelected(file)}>
            {file}
          </Button>
        ))}
      </div>

      <AudioPlayer src={selected} />
    </div>
  );
};

export default IndexPage;
