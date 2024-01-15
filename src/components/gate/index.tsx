<<<<<<< HEAD
// import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// import { getConfiguration } from "@actions/configuration";
=======
import UserCredentials from "@typings/UserCredentials";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
>>>>>>> 74f78b4d7040b4f196e3b05cd1e3ce442cf7ac07

interface Props extends React.PropsWithChildren<{}> {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
  restricted: number;
}

<<<<<<< HEAD
// TODO:
const Gate: React.FC<Props> = ({
  // user,
  // configuration,
  view,
  restricted,
  // getConfiguration,
}) => {
  // const allow =
  //   (restricted && user.token) || (!restricted && !user.token) ? true : false;
  const allow = restricted ? false : true;
  const redirect = !restricted ? "/" : "/register";

  // useEffect(() => {
  //   if (!configuration.loaded) {
  //     getConfiguration();
  //   }
  // }, []);

  // return configuration.loaded ? (
  return allow ? <>{view}</> : <Navigate to={redirect} />;
  // ) : null;
=======
// TODO: Add only pages you can only be redirected to... probably?
const Gate: React.FC<Props> = ({ children, user, gameConfig, restricted }) => {
  // const allow =
  //   (restricted && user.token) || (!restricted && !user.token) ? true : false;
  const redirect =
    restricted === 1 && !user.token
      ? "/login"
      : restricted === 2 && user.token && user.credentials
      ? "/already-logged-in"
      : null;

  // console.log("allow", allow);
  // console.log("redirect", redirect);
  // console.log("user", user);

  return !redirect ? (
    <>{children}</>
  ) : (
    <Navigate to={redirect} replace={true} />
  );
  // return <>{children}</>;
>>>>>>> 74f78b4d7040b4f196e3b05cd1e3ce442cf7ac07
};

const mapStateToProps = ({
  user,
<<<<<<< HEAD
  configuration,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // getConfiguration: () => dispatch(getConfiguration()),
=======
  gameConfig,
}: {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
}) => ({
  user,
  gameConfig,
>>>>>>> 74f78b4d7040b4f196e3b05cd1e3ce442cf7ac07
});

export default connect(mapStateToProps, null)(Gate);
