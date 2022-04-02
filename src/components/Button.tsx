import { css } from "@emotion/react";
import Color from "color";
import React, { ComponentPropsWithoutRef } from "react";
import { theme } from "./theme";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const styles = {
  base: css`
    padding: 8px 20px;
    border-radius: 4px;
  `,
  icon: css`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
};

export const PrimaryButton = ({ icon, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      css={[
        styles.base,
        styles.icon,
        css`
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
              `rgb(${Color(theme.palette.primary.main)
                .array()
                .join(" ")} / 0.2)`
            )};
          }
        `,
      ]}
    >
      {icon}
      {children}
    </button>
  );
};

export const Button = ({ icon, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      css={[
        styles.base,
        styles.icon,
        css`
          background-color: ${theme.palette.gray[100]};

          &:hover {
            background-color: ${theme.palette.gray[200]};
          }
          &:active {
            background-color: ${theme.palette.gray[300]};
          }
        `,
      ]}
    >
      {icon}
      {children}
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
