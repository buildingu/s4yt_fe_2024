import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "@root/store";
import Routes from "@root/routes";
import "./index.css";

const router = createBrowserRouter(Routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
