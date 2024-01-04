import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "@root/store";

import { HistoryProvider } from "./utils/History";
import RoutesProvider from "@root/routes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <BrowserRouter>
        <HistoryProvider />
        <RoutesProvider />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
