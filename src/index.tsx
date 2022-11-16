import "./index.scss";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container && container.id === "root") {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No root element found");
}
