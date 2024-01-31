import React from "react";
import ReactDOM from "react-dom/client";
// import { HelmetProvider } from "react-helmet-async";

import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <HelmetProvider>
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
  // </HelmetProvider>
);
