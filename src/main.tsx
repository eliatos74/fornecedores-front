import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR"
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
