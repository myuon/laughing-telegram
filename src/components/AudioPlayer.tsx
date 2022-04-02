import { css } from "@emotion/react";
import React, { useRef } from "react";
import { theme } from "./theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, LinkButton } from "./Button";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export const AudioPlayer = ({
  src,
  coverSrc,
  title,
  artist,
}: {
  src?: string;
  coverSrc?: string;
  title?: string;
  artist?: string;
}) => {
  const ref = useRef(null);

  return (
    <div
      css={css`
        display: grid;
        gap: 16px;
        margin: 16px 0;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          gap: 16px;
          align-items: flex-end;

          @media screen and (max-width: ${theme.width.large}px) {
            margin: 0 16px;
          }
        `}
      >
        <img
          src={coverSrc}
          css={css`
            position: absolute;
            width: calc(min(300px, 30%));
            border-radius: 4px;
            box-shadow: ${theme.shadow[6]};
          `}
        />
        <div
          css={css`
            width: calc(min(300px, 30%));
          `}
        />
        <div
          css={css`
            display: grid;
            flex: 1;
            gap: 4px;
          `}
        >
          <h2
            css={css`
              @media screen and (max-width: ${theme.width.large}px) {
                font-size: 24px;
              }

              @media screen and (max-width: ${theme.width.small}px) {
                font-size: 18px;
              }
            `}
          >
            {title}
          </h2>
          <p
            css={css`
              color: ${theme.palette.gray[700]};
            `}
          >
            {artist}
          </p>
        </div>
      </div>

      <audio ref={ref} src={src} autoPlay loop muted />

      <div>
        <div
          css={css`
            width: 100%;
            height: 8px;
            background-color: ${theme.palette.primary.main};
          `}
        />
      </div>

      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1;
            justify-content: space-evenly;
          `}
        >
          <LinkButton
            css={css`
              svg {
                font-size: 36px;

                @media screen and (max-width: ${theme.width.small}px) {
                  font-size: 28px;
                }
              }
            `}
          >
            <RepeatOneIcon />
          </LinkButton>
          <LinkButton
            css={css`
              svg {
                font-size: 36px;

                @media screen and (max-width: ${theme.width.small}px) {
                  font-size: 28px;
                }
              }
            `}
          >
            <ShuffleIcon />
          </LinkButton>
        </div>
        <IconButton
          icon={<PlayArrowIcon />}
          rounded
          color="primary"
          css={css`
            width: 1.5em;
            height: 1.5em;
            font-size: 48px;

            @media screen and (max-width: ${theme.width.small}px) {
              font-size: 36px;
            }
          `}
        />
        <div
          css={css`
            display: flex;
            flex: 1;
            justify-content: space-evenly;
          `}
        >
          <LinkButton
            css={css`
              svg {
                font-size: 36px;

                @media screen and (max-width: ${theme.width.small}px) {
                  font-size: 28px;
                }
              }
            `}
          >
            <DownloadDoneIcon />
          </LinkButton>
          <LinkButton
            css={css`
              svg {
                font-size: 36px;

                @media screen and (max-width: ${theme.width.small}px) {
                  font-size: 28px;
                }
              }
            `}
          >
            <VolumeOffIcon />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
