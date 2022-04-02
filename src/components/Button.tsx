import { css } from "@emotion/react";
import Color from "color";
import React, { ComponentPropsWithoutRef } from "react";
import { theme } from "./theme";

const styles = {
  base: css`
    height: 40px;
    border-radius: 4px;
  `,
  text: css`
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
  `,
  icon: css`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
  rounded: css`
    border-radius: 9999px;
  `,
  colors: {
    primary: css`
      color: ${theme.palette.primary.contrastText};
      background-color: ${theme.palette.primary.main};
      box-shadow: ${theme.shadow[3].replaceAll(
        "rgb(0 0 0 / 0.1)",
        `rgb(${Color(theme.palette.primary.main).array().join(" ")} / 0.2)`
      )};

      &:hover {
        background-color: ${theme.palette.primary.dark};
      }
      &:active {
        box-shadow: ${theme.shadow[4].replaceAll(
          "rgb(0 0 0 / 0.1)",
          `rgb(${Color(theme.palette.primary.main).array().join(" ")} / 0.2)`
        )};
      }
    `,
    default: css`
      background-color: ${theme.palette.gray[100]};

      &:hover {
        background-color: ${theme.palette.gray[200]};
      }
      &:active {
        background-color: ${theme.palette.gray[300]};
      }
    `,
  },
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  color?: "primary" | "default";
  rounded?: boolean;
}

export const Button = ({
  icon,
  children,
  color = "default",
  rounded = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      css={[
        styles.base,
        styles.text,
        styles.icon,
        styles.colors[color],
        rounded && styles.rounded,
      ]}
    >
      {icon}
      {children}
    </button>
  );
};

export const IconButton = ({
  icon,
  color = "default",
  rounded = false,
  ...props
}: Omit<ButtonProps, "children">) => {
  return (
    <button
      {...props}
      css={[
        styles.base,
        styles.icon,
        styles.colors[color],
        rounded && styles.rounded,
        css`
          display: flex;
          justify-content: center;
          aspect-ratio: 1 / 1;

          svg {
            font-size: inherit;
          }
        `,
      ]}
    >
      {icon}
    </button>
  );
};

export const LinkButton = (props: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      css={[
        theme.typography.body,
        css`
          display: inline-block;
          text-decoration: underline;

          &:hover {
            text-decoration: none;
          }
        `,
      ]}
    />
  );
};
