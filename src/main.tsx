import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@icon-park/react/styles/index.css";
import "./index.css";
import "./style.css";
import { SWRConfig } from "swr";
import { fetch } from "@utils/request";
import { DialogProvider } from "react-hook-dialog";
import { dialogs } from "./libs/dialogs";
import { FileContextMenu } from "@components/universal/FileContextMenu";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DialogProvider dialogs={dialogs}>
        <SWRConfig
          value={{
            fetcher: fetch,
          }}
        >
          <FileContextMenu />
          <App />
        </SWRConfig>
      </DialogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
