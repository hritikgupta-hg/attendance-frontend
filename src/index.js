import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Attendance } from "./attendance";
import { Defaulters } from "./defaulters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "defaulter",
        element: <Defaulters />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      {/* <App /> */}
    </RouterProvider>
  </React.StrictMode>
);
