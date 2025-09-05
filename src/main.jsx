import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

//notification
import { NotificationProvider } from "./createContextStore/NotificationContext";
//error boundary
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Store from "./Store/index.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <NotificationProvider>
        <ErrorBoundary>
          <BrowserRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </NotificationProvider>
    </Provider>
  </StrictMode>
);

// ✅ Disable console logs in production
if (process.env.NODE_ENV === "production") {
  console.log = console.debug = console.info = console.table = () => {};
}
// ✅ Vite way
if (import.meta.env.MODE === "production") {
  console.log = console.debug = console.info = console.table = () => {};
}
