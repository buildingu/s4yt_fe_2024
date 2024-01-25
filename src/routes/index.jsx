import { Routes, Route, Navigate } from "react-router-dom";
import Gate from "@components/gate";

import Register from "@views/register";
import VerifyEmail from "@views/register/verifyEmail";
import VerifySuccess from "@views/register/verifyEmail/VerifySuccess";

import Login from "@views/login";
import ForgotPassword from "@views/login/forgot";
import ResetPassword from "@views/resetPassword";

import Profile from "@views/profile";

import Home from "@views/home";
import Sponsors from "@views/sponsors";
import Raffle from "@views/raffle";
import Businesses from "@views/businesses";
import Details from "@views/businesses/Details";

import Error404 from "@views/errors/Error404";
import Error409 from "@views/errors/Error409";
import Error500 from "@views/errors/Error500";

// prettier-ignore
export const routes = [
  { path: "/register", view: Register, restricted: 2, title: "Register" },
  { path: "/register/verify-email", view: VerifyEmail, restricted: 0, title: "Verify" },
  { path: "/register/verify-email/success", view: VerifySuccess, restricted: 0, title: "Verify Success" },

  { path: "/login", view: Login, restricted: 2, title: "Login" },
  { path: "/login/forgot", view: ForgotPassword, restricted: 2, title: "Forgot Password" },
  { path: "/password-reset", view: ResetPassword, restricted: 2, title: "Reset Password" },

  { path: "/profile", view: Profile, restricted: 1, title: "Profile" },

  { path: "/", view: Home, restricted: 1, title: "Treasure Map" },
  { path: "/sponsors", view: Sponsors, restricted: 1, title: "Sponsors" },
  { path: "/raffle", view: Raffle, restricted: 1, title: "Raffle" },
  { path: "/businesses", view: Businesses, restricted: 1, title: "See Businesses" },
  { path: "/businesses/:details", view: Details, restricted: 1, title: "Business Details" },
  // { path: "/results", view: SomeComponent, restricted: 1 },

  { path: "/error-409", view: Error409, restricted: 1, title: "ERROR 409" },
  { path: "/error-404", view: Error404, restricted: 0, title: "ERROR 404" },
  { path: "/error-500", view: Error500, restricted: 0, title: "ERROR 500" },
];

const RoutesProvider = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Gate restricted={route.restricted}>
              <route.view />
            </Gate>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/error-404" />} />
    </Routes>
  );
};

export default RoutesProvider;
