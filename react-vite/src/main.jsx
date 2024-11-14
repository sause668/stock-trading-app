import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router/App";
import * as sessionActions from "./redux/session";
import * as watchlistActions from "./redux/watchlist";
import "./index.css";

// Create the Redux store.
const store = configureStore();

// When in development, allow the browser console to execute dispatch commands specified here.
if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.watchlistActions = watchlistActions;
}

// Render the React application.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
