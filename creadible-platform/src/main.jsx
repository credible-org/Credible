import React from "react";
import ReactDOM from "react-dom/client";
import Testing from "./utils/Testing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/themeContext";
import { UserProvider } from "./utils/userContext";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/testing", element: <Testing /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
