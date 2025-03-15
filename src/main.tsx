import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
 HEAD
=======
import { Toaster } from "./components/ui/toaster";
git rebase --continue
 9f77d8f (first commit)

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
  HEAD
=======
      <Toaster />
  9f77d8f (first commit)
    </BrowserRouter>
  </React.StrictMode>,
);
