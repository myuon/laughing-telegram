import React, { useState } from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import {
  uploadMusicFile,
  useDownloadUrl,
  useFetchMetadata,
  useListAll,
} from "../api/storage";
import { LinkButton } from "../components/Button";
import { theme } from "../components/theme";

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
  const image = metadata?.images?.[0];

  return (
    <div
      css={css`
        display: grid;
        gap: 4px;

        & > *:first-child {
          width: 250px;
          aspect-ratio: 1;
          border-radius: 4px;
          box-shadow: ${theme.shadow[5]};

          img {
            width: inherit;
            border-radius: inherit;
          }
        }
      `}
    >
      {image ? (
        <div>
          <img src={`data:${image.mime ?? "image/jpg"};base64,${image.data}`} />
        </div>
      ) : (
        <div
          css={[
            theme.typography.h3,
            css`
              display: grid;
              place-items: center;
              color: white;
              background-color: ${theme.palette.gray[300]};
            `,
          ]}
        >
          NO IMAGE
        </div>
      )}

      <LinkButton onClick={onClick}>{file.name}</LinkButton>
    </div>
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
          grid-template-columns: repeat(4, 1fr);
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
