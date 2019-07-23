import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./components/Error";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <span />
    </ErrorBoundary>
  );
}

ReactDOM.render(<App />, document.getElementById("react-root"));
