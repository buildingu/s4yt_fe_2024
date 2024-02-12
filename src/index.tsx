import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "@root/store";

import { HistoryProvider } from "./utils/History";
import RoutesProvider from "@root/routes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <HistoryProvider />
      <RoutesProvider />
    </BrowserRouter>
  </Provider>
);
