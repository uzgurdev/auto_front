import React from "react";
import ReactDOM from "react-dom/client";

import { Routes } from "routes";
import { BrowserRouter } from "react-router";

import { StoreProvider } from "store";
import "./assets/styles/style.css";

const elm = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(elm);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Routes />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
