import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Gate from "@components/gate";

import Register from "@views/register";
import VerifyEmail from "@views/register/verifyEmail";
import Login from "@views/login";
import PasswordReset from "@views/password/reset";

import Home from "@views/home";
import Profile from "@views/profile";
import Raffle from "@views/raffle";
import Sponsors from "@views/sponsors";
import Businesses from "@views/businesses";
import Details from "@views/businesses/Details";

import Error404 from "@views/errors/Error404";
import Error500 from "@views/errors/Error500";

const RoutesProvider = () => {
  // temporary useParams for business details
  const { details } = useParams();

  return (
    <Routes>
      <Route
        path="/register"
        element={<Gate view={<Register />} restricted={0} />}
      />
      <Route
        path="/verify-email"
        element={<Gate view={<VerifyEmail />} restricted={0} />}
      />
      <Route path="/login" element={<Gate view={<Login />} restricted={0} />} />
      <Route
        path="/password-reset"
        element={<Gate view={<PasswordReset />} restricted={0} />}
      />
      <Route path="/" element={<Gate view={<Home />} restricted={1} />} />
      <Route
        path="/profile"
        element={<Gate view={<Profile />} restricted={1} />}
      />
      <Route
        path="/raffle"
        element={<Gate view={<Raffle />} restricted={1} />}
      />
      <Route
        path="/sponsors"
        element={<Gate view={<Sponsors />} restricted={1} />}
      />
      <Route
        path="/businesses"
        element={<Gate view={<Businesses />} restricted={1} />}
      />
      <Route
        path="/businesses/:details"
        element={<Gate view={<Details />} restricted={1} />}
      />
      {/* <Route path="/results" element={<Gate view={< />} restricted={1} />} /> */}
      <Route
        path="/error-500"
        element={<Gate view={<Error500 />} restricted={0} />}
      />
      <Route
        path="/error-404"
        element={<Gate view={<Error404 />} restricted={0} />}
      />
      <Route path="*" element={<Navigate to="/error-404" />} />
    </Routes>
  );
};

export default RoutesProvider;
