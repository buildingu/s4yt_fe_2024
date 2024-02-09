import { Routes, Route, Navigate } from "react-router-dom";

import Gate from "@components/gate";

import Register from "@views/user/register";
import VerifyEmail from "@views/user/register/verifyEmail";
import VerifySuccess from "@views/user/register/verifyEmail/VerifySuccess";

import Login from "@views/user/login";
import ForgotPassword from "@views/user/login/forgot";
import ResetPassword from "@views/user/resetPassword";

import Profile from "@views/user/profile";

import Home from "@views/game/home";
import Sponsors from "@views/game/sponsors";
import Raffle from "@views/game/raffle";
import Businesses from "@views/game/businesses";
import Details from "@views/game/businesses/Details";
import Results from "@views/game/results";
import GameClosed from "@views/game/gameClosed";

import Error404 from "@views/errors/Error404";
import Error401 from "@views/errors/Error401";
import Error409 from "@views/errors/Error409";
import Error500 from "@views/errors/Error500";

// prettier-ignore
export const routes = [
  // { path: "/register", view: Register, restricted: 2, title: "Register" },
  // { path: "/register/verify-email", view: VerifyEmail, restricted: 0, title: "Verify" },
  // { path: "/register/verify-email/success", view: VerifySuccess, restricted: 0, title: "Verify Success" },

  // { path: "/login", view: Login, restricted: 2, title: "Login" },
  // { path: "/login/forgot", view: ForgotPassword, restricted: 2, title: "Forgot Password" },
  // { path: "/password-reset", view: ResetPassword, restricted: 2, title: "Reset Password" },

  // { path: "/profile", view: Profile, restricted: 1, title: "Profile" },

  { path: "/", view: Home, restricted: 1, title: "Treasure Map" },
  // { path: "/sponsors", view: Sponsors, restricted: 1, title: "Sponsors", disableOn: ["reviewStart", "winnersAnnounced"] },
  // { path: "/raffle", view: Raffle, restricted: 1, title: "Raffle", disableOn: ["reviewStart", "winnersAnnounced"] },
  // { path: "/businesses", view: Businesses, restricted: 1, title: "See Businesses", disableOn: ["reviewStart", "winnersAnnounced"] },
  // { path: "/businesses/:details", view: Details, restricted: 1, title: "Business Details", disableOn: ["reviewStart", "winnersAnnounced"] },
  { path: "/results", view: Results, restricted: 1, title: "Event Results", disableOn: ["gameStart"] },
  { path: "/game-closed", view: GameClosed, restricted: 1, title: "Game Closed" },

  { path: "/error-409", view: Error409, restricted: 1, title: "ERROR 409" },
  { path: "/error-404", view: Error404, restricted: 0, title: "ERROR 404" },
  { path: "/error-401", view: Error401, restricted: 0, title: "ERROR 401" },
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
            <Gate restricted={route.restricted} disableOn={route.disableOn}>
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
