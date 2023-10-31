import Gate from "@components/gate";
import Home from "@views/home";
import Login from "@views/login";
import Register from "@views/register";
import Profile from "@views/profile";
import Raffle from "@views/raffle";
import Sponsors from "@views/sponsors";
import PasswordReset from "@views/password/reset";

export default [
  {
    path: "/login",
    element: <Gate view={<Login />} restricted={0} />,
  },
  {
    path: "/register",
    element: <Gate view={<Register />} restricted={0} />,
  },
  {
    path: "/password-reset",
    element: <Gate view={<PasswordReset />} restricted={0} />,
  },
  {
    path: "/",
    element: <Gate view={<Home />} restricted={1} />,
  },
  {
    path: "/profile",
    element: <Gate view={<Profile />} restricted={1} />,
  },
  {
    path: "/raffle",
    element: <Gate view={<Raffle />} restricted={1} />,
  },
  {
    path: "/sponsors",
    element: <Gate view={<Sponsors />} restricted={1} />,
  },
  // {
  //   path: "/businesses",
  //   element: <Gate view={<Sponsors />} restricted={1} />,
  // },
  // {
  //   path: "/results",
  //   element: <Gate view={<Sponsors />} restricted={1} />,
  // },
];
