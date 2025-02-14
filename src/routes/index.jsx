import { Routes, Route, Navigate } from "react-router-dom";

import ResourceLoader from "@services/ResourceLoader";

import routeDisableOn from "./disableOn";
import Redirects from "./Redirects";

import Register from "@views/user/register";
import VerifyEmail from "@views/user/register/verifyEmail";
import VerifyFinalize from "@views/user/register/verifyEmail/VerifyFinalize";

import Login from "@views/user/login";
import ForgotPassword from "@views/user/login/forgot";
import ResetPassword from "@views/user/resetPassword";

import Profile from "@views/user/profile";

import Home from "@views/game/home";
import LearnAndEarn from "@views/game/learnAndEarn";
import Raffle from "@views/game/raffle";
// import Businesses from "@views/game/businesses";
// import Details from "@views/game/businesses/Details";
// import Results from "@views/game/results";
// import GameClosed from "@views/game/gameClosed";

import Error409 from "@views/errors/Error409";
import Error404 from "@views/errors/Error404";
import Error403 from "@views/errors/Error403";
import Error401 from "@views/errors/Error401";
import Error500 from "@views/errors/Error500";

// NOTE: This is how I'm doing it, I am going page by page and they will be uncommented when started.
export const routes = [
  { path: "/register", view: Register, restricted: 2, title: "Register" },
  { path: "/register/verify-email", view: VerifyEmail, restricted: 0, title: "Verify" },
  { path: "/register/verify-email/verify", view: VerifyFinalize, restricted: 0, title: "Verify Success" },

  { path: "/login", view: Login, restricted: 2, title: "Login" },
  { path: "/login/forgot", view: ForgotPassword, restricted: 2, title: "Forgot Password" },
  { path: "/password-reset", view: ResetPassword, restricted: 2, title: "Reset Password" },

  { path: "/profile", view: Profile, restricted: 1, title: "Profile" },

  { path: "/", view: Home, restricted: 1, title: "Treasure Map" },
  { path: "/learn", view: LearnAndEarn, restricted: 1, title: "Learn and Earn", disableOn: routeDisableOn["/learn"] },
  { path: "/raffle", view: Raffle, restricted: 1, title: "Raffle", disableOn: routeDisableOn["/raffle"] },
  // { path: "/businesses", view: Businesses, restricted: 1, title: "See Businesses", disableOn: routeDisableOn["/businesses"]  },
  // { path: "/businesses/:details", view: Details, restricted: 1, title: "Business Details", disableOn: routeDisableOn["/businesses"] },
  // { path: "/results", view: Results, restricted: 1, title: "Event Results", disableOn: routeDisableOn["/results"] },
  // { path: "/game-closed", view: GameClosed, restricted: 1, title: "Game Closed" },

  { path: "/error-409", view: Error409, restricted: 1, title: "ERROR 409" },
  { path: "/error-404", view: Error404, restricted: 0, title: "ERROR 404" },
  { path: "/error-403", view: Error403, restricted: 0, title: "ERROR 403" },
  { path: "/error-401", view: Error401, restricted: 0, title: "ERROR 401" },
  { path: "/error-500", view: Error500, restricted: 0, title: "ERROR 500" }
];

const RoutesProvider = () => {
  return (
    <Routes>
      <Route element={<ResourceLoader />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Redirects restricted={route.restricted} disableOn={route.disableOn}>
                <route.view />
              </Redirects>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/error-404" />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
