import ReactDOM from "react-dom/client";
import {
  // createBrowserRouter,
  NavigateFunction,
  useNavigate,
  // RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import History from "./utils/History";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "@root/store";
import RoutesProvider from "@root/routes";
import "./index.css";

// const router = createBrowserRouter(Routes);

// const NavigateSetter = () => {
//   history.navigate

//   return null;
// };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <History />
        <RoutesProvider />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
