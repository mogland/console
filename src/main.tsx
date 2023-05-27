import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@icon-park/react/styles/index.css";
import "./index.css";
import { SWRConfig } from "swr";
import { fetch } from "@utils/request";
import { Toaster } from "sonner";
import { DialogProvider } from "react-hook-dialog";
import { dialogs } from "./libs/dialogs";
import { FileContextMenu } from "@components/universal/FileContextMenu";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: fetch,
        }}
      >
        <DialogProvider dialogs={dialogs}>
          <FileContextMenu />
          <Toaster richColors />
          <App />
        </DialogProvider>
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
