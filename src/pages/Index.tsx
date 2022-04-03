import React, { useState } from "react";
import { useAuth } from "../helpers/useAuth";
import { css } from "@emotion/react";
import {
  uploadMusicFile,
  useDownloadUrl,
  useFetchMetadata,
  useListAll,
} from "../api/storage";
import { CoverView } from "./Index/CoverView";
import { ListView } from "./Index/ListView";
import { MusicFile } from "../model/MusicFile";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button } from "../components/Button";
import { AudioPlayer } from "../components/AudioPlayer";
import { getCoverImageInBase64 } from "../model/Metadata";
import { theme } from "../components/theme";

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

const Player = ({ fullPath }: { fullPath?: string }) => {
  const { data: src } = useDownloadUrl(fullPath);
  const { data: meta } = useFetchMetadata(fullPath);

  return (
    <div
      css={[
        theme.glassmorphism,
        css`
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        `,
      ]}
    >
      <div
        css={css`
          margin: 0 auto;
        `}
      >
        <AudioPlayer
          src={src}
          coverSrc={getCoverImageInBase64(meta)}
          title={meta?.title}
          artist={meta?.artist}
        />
      </div>
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
        multiple
        type="file"
        onChange={async (event) => {
          const files = event.currentTarget.files;
          if (!files) return;

          await Promise.allSettled(
            Array.from(files).map(async (file) => {
              uploadMusicFile(userId, file);
            })
          );
          console.log("Upload finished");
        }}
      />

      <div
        css={css`
          margin-bottom: 250px;
        `}
      >
        <MusicList onClick={(file) => setSelected(file.fullPath)} />
      </div>

      <Player fullPath={selected} />
    </div>
  );
};

export default IndexPage;
