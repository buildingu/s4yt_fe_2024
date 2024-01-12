// import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
// import { getConfiguration } from "@actions/configuration";

interface Props {
  user: any;
  configuration: any;
  view: object;
  restricted: Boolean;
  getConfiguration: any;
}

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
};

const mapStateToProps = ({ user, configuration }: any) => ({
  user,
  configuration,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // getConfiguration: () => dispatch(getConfiguration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gate);
