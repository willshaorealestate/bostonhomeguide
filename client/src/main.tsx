import { createRoot } from "react-dom/client";
import App, { preloadAllPages, preloadPageFor } from "./App";
import "./index.css";

// Load the current page's code before rendering so React replaces the prerendered
// HTML with the same page instead of a blank loading state.
preloadPageFor(window.location.pathname)
  .catch(() => {})
  .then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
    setTimeout(preloadAllPages, 3000);
  });
