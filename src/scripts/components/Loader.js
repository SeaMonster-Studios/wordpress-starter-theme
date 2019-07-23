// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

export const Loader = () => (
  <div
    css={css`
      text-align: center;
      padding: 60px;

      .lds-facebook {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 6px;
        width: 13px;
        background: tomato;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }
      .lds-facebook div:nth-of-type(1) {
        left: 6px;
        animation-delay: -0.24s;
      }
      .lds-facebook div:nth-of-type(2) {
        left: 26px;
        animation-delay: -0.12s;
      }
      .lds-facebook div:nth-of-type(3) {
        left: 45px;
        animation-delay: 0;
      }
      @keyframes lds-facebook {
        0% {
          top: 6px;
          height: 51px;
        }
        50%,
        100% {
          top: 19px;
          height: 26px;
        }
      }
    `}
  >
    <div className="lds-facebook">
      <div />
      <div />
      <div />
    </div>
  </div>
);
