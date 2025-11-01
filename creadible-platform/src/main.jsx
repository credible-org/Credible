import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/themeContext";
import { UserProvider } from "./utils/userContext";
import App from "./App";
import "./index.css";
import UserSelection from "./pages/UserSelection";
import HolderDashboard from "./pages/HolderDashboard";
import IssuerDashboard from "./pages/IssuerDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/user-select", element: <UserSelection /> },
  { path: "/holder-dashboard", element: <HolderDashboard /> },
  { path: "/issuer-dashboard", element: <IssuerDashboard /> },
  { path: "/verifier-dashboard", element: <VerifierDashboard /> },
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
