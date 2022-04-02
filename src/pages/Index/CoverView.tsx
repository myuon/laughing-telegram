import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { useFetchMetadata } from "../../api/storage";
import { theme } from "../../components/theme";
import { getCoverImageInBase64 } from "../../model/Metadata";
import { MusicFile } from "../../model/MusicFile";

const MusicItem = ({
  file,
  onClick,
}: {
  file: MusicFile;
  onClick: () => void;
}) => {
  const { data: metadata } = useFetchMetadata(file.fullPath);
  const image = useMemo(() => metadata?.images?.[0], [metadata?.images]);

  return (
    <div
      css={css`
        display: grid;
        gap: 4px;

        button {
          aspect-ratio: 1;
          border-radius: 4px;
          box-shadow: ${theme.shadow[5]};

          img {
            display: flex;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            box-shadow: ${theme.shadow[5]};
          }
        }
      `}
    >
      {image ? (
        <button onClick={onClick}>
          <img src={getCoverImageInBase64(metadata)} />
        </button>
      ) : (
        <button
          onClick={onClick}
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
        </button>
      )}
    </div>
  );
};

export const CoverView = ({
  files,
  onClick,
}: {
  files?: MusicFile[];
  onClick: (file: MusicFile) => void;
}) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;

        @media screen and (max-width: ${theme.width.large}px) {
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media screen and (max-width: ${theme.width.small}px) {
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
      `}
    >
      {files?.map((file) => (
        <MusicItem
          key={file.fullPath}
          file={file}
          onClick={() => onClick(file)}
        />
      ))}
    </div>
  );
};
