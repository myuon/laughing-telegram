import React, { useState } from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import { uploadMusicFile, useDownloadUrl, useListAll } from "../api/storage";
import { CoverView } from "./Index/CoverView";
import { ListView } from "./Index/ListView";
import { MusicFile } from "../model/MusicFile";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button } from "../components/Button";

const AudioPlayer = ({ src }: { src?: string }) => {
  const { data: url } = useDownloadUrl(src);

  return <audio src={url} controls autoPlay muted />;
};

const MusicList = ({ onClick }: { onClick: (file: MusicFile) => void }) => {
  const { userId } = useAuth();
  const { data: files } = useListAll(`/user/${userId}`);
  const [mode, setMode] = useState<"cover" | "list">("cover");

  return (
    <div
      css={css`
        display: grid;
        gap: 32px;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 8px;
          justify-content: center;
        `}
      >
        <Button
          icon={<LibraryMusicIcon />}
          onClick={() => setMode("cover")}
          color={mode === "cover" ? "primary" : "default"}
          rounded
        >
          アルバム
        </Button>
        <Button
          icon={<ViewListIcon />}
          onClick={() => setMode("list")}
          color={mode === "list" ? "primary" : "default"}
          rounded
        >
          曲一覧
        </Button>
      </div>

      {mode === "cover" ? (
        <CoverView files={files} onClick={onClick} />
      ) : (
        <ListView files={files} onClick={onClick} />
      )}
    </div>
  );
};

export const IndexPage = () => {
  const { userId } = useAuth();
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

      <MusicList onClick={(file) => setSelected(file.fullPath)} />

      <AudioPlayer src={selected} />
    </div>
  );
};

export default IndexPage;
