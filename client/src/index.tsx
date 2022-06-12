import "./styles/main.scss";
import "./styles/normalize.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes/RouteTypes";

import { App } from "./components/App/App";
import { Dashboard } from "./routes/Dashboard/Dashboard";
import { Login } from "./routes/Login/Login";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactNotifications } from "react-notifications-component";
import { Register } from "./routes/Register/Register";
import { store } from "./app/store";

// Creating root for React to inject code into
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Provider is used to create a Redux Toolkit store */}
    <Provider store={store}>
      {/* React Notifications are not visible by default,
      they are called when needed thought Redux dispatch functions */}
      <ReactNotifications />
      {/* React Router is used to simulate page changes */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes are used when user ir not logged in, or session expired */}
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Protected Routed are only used for users who are successfully authenticated */}
          <Route path="/" element={<ProtectedRoutes />}>
            {/* App contains nav check(normal or mobile) and an Outlet */}
            <Route path="/" element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="history" element={<h1>history</h1>} />
              <Route path="stocks" element={<h1>stocks</h1>} />
              <Route path="weekly" element={<h1>weekly</h1>} />
              <Route path="monthly" element={<h1>monthly</h1>} />
            </Route>
          </Route>
          {/* Catch all for 404 pages */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404 not found</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./serviceWorker.js")
    .then((registration) => {
      console.log("Service Worker Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("Service Worker Registration Failed");
      console.log(error);
    });
}
