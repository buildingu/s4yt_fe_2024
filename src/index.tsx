import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@root/store";

import { HistoryProvider } from "./utils/History";
import RoutesProvider from "@root/routes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <HistoryProvider />
        <RoutesProvider />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
