import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./components/Error";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <span />
    </ErrorBoundary>
  );
}

export default App;
