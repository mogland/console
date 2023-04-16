import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@icon-park/react/styles/index.css";
import "./index.css";
import { SWRConfig } from "swr";
import { apiClient } from "@utils/request";
import { Toaster } from "sonner"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: apiClient,
        }}
      >
        <Toaster
          richColors
        />
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
