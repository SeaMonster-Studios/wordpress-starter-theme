import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const AccordionButton = ({ children, ...props }) => (
  <button
    {...props}
    css={css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      transition: all 0.3s ease;

      > * {
        margin: 0;
      }

      &:focus {
        outline: none;
      }
    `}
  >
    {children}
  </button>
);

function AccordionContents({ isOpen, ...props }) {
  return (
    <div
      css={css`
        overflow: hidden;

        ${!isOpen &&
          css`
            display: none;
          `};
      `}
      {...props}
    />
  );
}

const AccordionItem = ({ children, direction, isOpen, ...props }) => (
  <div
    {...props}
    css={css`
      padding: 15px;
      display: grid;
      grid-template: auto auto;
      grid-gap: 4;
      grid-auto-flow: row;
      grid-auto-flow: ${direction === "horizontal" ? "column" : "row"};
      border-top: 1px solid #eee;
      transition: background 0.3s ease;

      &:last-of-type {
        border-bottom: 1px solid #eee;
      }

      ${isOpen &&
        css`
          background-color: #eee;
        `};
    `}
  >
    {children}
  </div>
);

const preventClose = (state, changes) =>
  changes.type === "closing" && state.openIndexes.length < 2
    ? { ...changes, openIndexes: state.openIndexes }
    : changes;

const single = (state, changes) =>
  changes.type === "opening"
    ? { ...changes, openIndexes: changes.openIndexes.slice(-1) }
    : changes;

const combineReducers = (...reducers) => (state, changes) =>
  reducers.reduce((acc, reducer) => reducer(state, acc), changes);

export {
  css,
  AccordionButton,
  AccordionItem,
  AccordionContents,
  combineReducers,
  preventClose,
  single
};
