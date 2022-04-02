import React, { useState } from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import {
  uploadMusicFile,
  useDownloadUrl,
  useFetchMetadata,
  useListAll,
} from "../api/storage";
import { Button } from "../components/Button";

interface MusicFileObject {
  fullPath: string;
  name: string;
}

const AudioPlayer = ({ src }: { src?: string }) => {
  const { data: url } = useDownloadUrl(src);

  return <audio src={url} controls autoPlay />;
};

const MusicItem = ({
  file,
  onClick,
}: {
  file: MusicFileObject;
  onClick: () => void;
}) => {
  const { data: metadata } = useFetchMetadata(file.fullPath);
  console.log(metadata);

  return (
    <>
      <Button onClick={onClick}>{file.name}</Button>
    </>
  );
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

          await uploadMusicFile(userId, file);
        }}
      />

      <div
        css={css`
          display: grid;
          gap: 8px;
        `}
      >
        {files?.map((file) => (
          <MusicItem
            key={file.fullPath}
            file={file}
            onClick={() => setSelected(file.fullPath)}
          />
        ))}
      </div>

      <AudioPlayer src={selected} />
    </div>
  );
};

export default IndexPage;
