import { css } from "@emotion/react";
import React from "react";
import { PrimaryButton, Button, LinkButton } from "../components/Button";
import { theme } from "../components/theme";

export const ComponentsPage = () => {
  return (
    <div
      css={css`
        display: grid;
        gap: 48px;

        section {
          display: grid;
          gap: 12px;

          header {
            margin: 16px 0;
            font-size: 20px;
            font-weight: 500;
            text-transform: uppercase;
          }
        }
      `}
    >
      <section>
        <header>Typography</header>

        <h1>H1 Windowsでコンピューターの世界が広がります</h1>
        <h2>H2 Windowsでコンピューターの世界が広がります</h2>
        <h3>H3 Windowsでコンピューターの世界が広がります</h3>
        <h4>H4 Windowsでコンピューターの世界が広がります</h4>
        <p>
          Windowsでコンピューターの世界が広がります。
          Windowsでコンピューターの世界が広がります。
          Windowsでコンピューターの世界が広がります。
          Windowsでコンピューターの世界が広がります。
        </p>
        <div>
          <button>Windowsでコンピューターの世界が広がります。</button>
        </div>
      </section>
      <section>
        <header>Button</header>

        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <PrimaryButton>Subscribe</PrimaryButton>
          <PrimaryButton>プライマリー</PrimaryButton>
          <Button>Cancel</Button>
          <Button>キャンセル</Button>
        </div>
      </section>
      <section>
        <header>Link, LinkButton</header>

        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <LinkButton>https://example.com</LinkButton>
          <a href="https://example.com">https://example.com</a>
        </div>
      </section>
      <section>
        <header>Shadow</header>

        <div
          css={css`
            display: grid;
            flex-wrap: wrap;
            grid-template-columns: repeat(3, 1fr);
            row-gap: 24px;
          `}
        >
          {([0, 1, 2, 3, 4, 5, 6] as const).map((v) => (
            <div
              key={v}
              css={css`
                display: grid;
                place-items: center;
                width: 250px;
                height: 100px;
                border-radius: 3px;
                box-shadow: ${theme.shadow[v]};
              `}
            >
              {v}
            </div>
          ))}
        </div>
      </section>
      <section>
        <header>Gray</header>

        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          `}
        >
          {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map(
            (v) => (
              <div
                key={v}
                css={css`
                  display: grid;
                  gap: 4px;
                `}
              >
                <div
                  css={css`
                    display: grid;
                    place-items: center;
                    width: 75px;
                    height: 50px;
                    background-color: ${theme.palette.gray[v]};
                    border-radius: 5px;
                  `}
                />
                {v}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default ComponentsPage;
