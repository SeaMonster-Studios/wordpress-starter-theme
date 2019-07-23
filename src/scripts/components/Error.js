// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

export const Error = () => (
  <div
    css={css`
      margin: 30px;
      padding: 15px;
      text-align: center;
      background-color: #70311b;
      color: #f07146;
      width: 100%;
    `}
  >
    We've encountered a problem. Please try again later.
  </div>
);
