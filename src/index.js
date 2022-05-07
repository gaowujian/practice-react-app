import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-table/dist/table.css";
import "@ant-design/pro-card/dist/card.css";
import "@ant-design/pro-layout/dist/layout.css";
import { Alert } from "antd";
const { ErrorBoundary } = Alert;
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
