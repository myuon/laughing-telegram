import { MusicFile } from "../../model/MusicFile";
import React from "react";
import { Button } from "../../components/Button";
import { css } from "@emotion/react";

export const ListView = ({
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
        gap: 8px;
      `}
    >
      {files?.map((file) => (
        <Button
          key={file.fullPath}
          onClick={() => onClick(file)}
          css={css`
            display: grid;
            justify-content: flex-start;
            width: 100%;
          `}
        >
          {file.name}
        </Button>
      ))}
    </div>
  );
};
