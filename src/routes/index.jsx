import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Gate from "@components/gate";

import Register from "@views/register";
import VerifyEmail from "@views/register/verifyEmail";
import VerifySuccess from "@views/register/verifyEmail/VerifySuccess";

import Login from "@views/login";
import ForgotPassword from "@root/views/login/forgot";
import PasswordReset from "@views/password/reset";

import Profile from "@views/profile";

import Home from "@views/home";
import Sponsors from "@views/sponsors";
import Raffle from "@views/raffle";
import Businesses from "@views/businesses";
import Details from "@views/businesses/Details";

import Error404 from "@views/errors/Error404";
import Error500 from "@views/errors/Error500";

export const routes = [
  { path: "/register", view: Register, restricted: 0 },
  { path: "/register/verify-email", view: VerifyEmail, restricted: 0 },
  {
    path: "/register/verify-email/success",
    view: VerifySuccess,
    restricted: 0,
  },

  { path: "/login", view: Login, restricted: 0 },
  { path: "/login/forgot", view: ForgotPassword, restricted: 0 },
  { path: "/password-reset", view: PasswordReset, restricted: 0 },

  { path: "/profile", view: Profile, restricted: 1 },

  { path: "/", view: Home, restricted: 1 },
  { path: "/sponsors", view: Sponsors, restricted: 1 },
  { path: "/raffle", view: Raffle, restricted: 1 },
  { path: "/businesses", view: Businesses, restricted: 1 },
  { path: "/businesses/:details", view: Details, restricted: 1 },
  // { path: "/results", view: SomeComponent, restricted: 1 },

  { path: "/error-500", view: Error500, restricted: 0 },
  { path: "/error-404", view: Error404, restricted: 0 },
];

const RoutesProvider = () => {
  const { details } = useParams();

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<Gate view={<route.view />} restricted={route.restricted} />}
        />
      ))}
      <Route path="*" element={<Navigate to="/error-404" />} />
    </Routes>
  );
};

export default RoutesProvider;
