import { css } from "@emotion/react";
import Color from "color";
import React, { ComponentPropsWithoutRef } from "react";
import { theme } from "./theme";

const buttonStyle = css`
  padding: 12px 20px;
  border-radius: 4px;
`;

export const PrimaryButton = (props: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      css={[
        buttonStyle,
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
    />
  );
};

export const Button = (props: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      css={[
        buttonStyle,
        css`
          background-color: ${theme.palette.gray[50]};

          &:hover {
            background-color: ${theme.palette.gray[100]};
          }
          &:active {
            background-color: ${theme.palette.gray[200]};
          }
        `,
      ]}
    />
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
