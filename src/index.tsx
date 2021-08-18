import React from "react";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(
  <ErrorBoundary>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ErrorBoundary>,
  rootElement
);
