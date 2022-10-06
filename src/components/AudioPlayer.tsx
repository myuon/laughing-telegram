import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { theme } from "./theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, LinkButton } from "./Button";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocalStorage } from "./useLocalStorage";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={[
          css`
            position: absolute;
            height: 8px;
            background-color: ${theme.palette.primary.main};
            transition: width 0.15s linear;
          `,
          { width: `${progress * 100}%` },
        ]}
      />
      <div
        css={css`
          width: 100%;
          height: 8px;
          background-color: ${theme.palette.gray[100]};
        `}
      />
    </div>
  );
};

const styles = {
  iconButton: css`
    display: grid;
    align-items: center;
  `,
  iconWrapper: css`
    svg {
      font-size: 36px;

      @media screen and (max-width: ${theme.width.small}px) {
        font-size: 28px;
      }
    }
  `,
  hideInMobile: css`
    @media screen and (max-width: ${theme.width.small}px) {
      display: none;
    }
  `,
};

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
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(true);
  const [volume, setVolume] = useLocalStorage("volume", 50);
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume / 100;
      ref.current.loop = loop;
    }
  }, [loop, volume]);

  const [duration, setDuration] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);

  const [volumeSliderOpen, setVolumeSliderOpen] = useState(false);

  return (
    <div
      css={css`
        display: grid;
        gap: 16px;
        margin: 24px 0;

        @media screen and (max-width: ${theme.width.large}px) {
          margin: 16px 0;
        }
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          gap: 32px;
          align-items: flex-end;
          margin: 0 32px;

          @media screen and (max-width: ${theme.width.large}px) {
            gap: 16px;
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
              display: -webkit-box;
              overflow: hidden;
              color: ${theme.palette.gray[700]};
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            `}
          >
            {artist}
          </p>
        </div>
      </div>

      <audio
        ref={ref}
        src={src}
        autoPlay
        loop={loop}
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(element) =>
          setSeekPosition(element.currentTarget.currentTime)
        }
        onDurationChange={(element) =>
          setDuration(element.currentTarget.duration)
        }
      />

      <ProgressBar progress={duration > 0 ? seekPosition / duration : 0} />

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
            icon={<RepeatOneIcon />}
            css={[
              styles.iconButton,
              styles.iconWrapper,
              css`
                color: inherit;

                &[aria-selected="true"] {
                  color: ${theme.palette.primary.main};
                }
              `,
            ]}
            aria-selected={loop}
            onClick={() => setLoop((t) => !t)}
          />
          <LinkButton icon={<ShuffleIcon />} css={[styles.iconWrapper]} />
        </div>
        <IconButton
          icon={playing ? <PauseIcon /> : <PlayArrowIcon />}
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
          onClick={() => {
            ref.current?.paused ? ref.current?.play() : ref.current?.pause();
          }}
        />
        <div
          css={css`
            display: flex;
            flex: 1;
            justify-content: space-evenly;
          `}
        >
          <LinkButton icon={<DownloadDoneIcon />} css={styles.iconWrapper} />
          <div
            css={css`
              display: flex;
              gap: 16px;
              align-items: center;
            `}
          >
            <LinkButton
              icon={muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
              css={styles.iconWrapper}
              onClick={() => {
                if (!ref.current) return;

                if (muted) {
                  ref.current.muted = false;
                  setMuted(false);
                } else {
                  ref.current.muted = true;
                  setMuted(true);
                }
              }}
            />
            <div
              css={[
                css`
                  display: flex;
                  gap: 4px;

                  &[data-muted="true"] {
                    opacity: 0.5;
                  }
                `,
                styles.hideInMobile,
              ]}
              data-muted={muted}
            >
              <LinkButton
                icon={<RemoveIcon />}
                css={css`
                  display: grid;
                `}
                onClick={() => setVolume(Math.max(volume - 10, 0))}
              />
              <p
                css={css`
                  position: relative;
                `}
              >
                <code
                  css={css`
                    font-size: ${theme.typography.h2.fontSize};
                    cursor: pointer;
                  `}
                  onClick={() => setVolumeSliderOpen((t) => !t)}
                >
                  {volume.toString().padStart(2, "0")}
                </code>
                {volumeSliderOpen && (
                  <div
                    css={css`
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      margin-bottom: 24px;
                    `}
                  >
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      css={css`
                        width: 100%;
                        -webkit-appearance: slider-vertical;
                      `}
                    />
                  </div>
                )}
              </p>
              <LinkButton
                icon={<AddIcon />}
                css={css`
                  display: grid;
                `}
                onClick={() => setVolume(Math.min(volume + 10, 100))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
