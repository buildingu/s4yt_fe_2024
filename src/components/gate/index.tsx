import UserCredentials from "@typings/UserCredentials";

import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import history from "@utils/History";

interface Props extends React.PropsWithChildren<{}> {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
  restricted: number;
}

// TODO: Add only pages you can only be redirected to... probably?
// TODO: We can maybe fix by adding some kind of condition like newLogin and in the gate there will be a useEffect on this condition to add this data?
const Gate: React.FC<Props> = ({ children, user, gameConfig, restricted }) => {
  const location = useLocation();

  let redirect = "";
  useEffect(() => {
    redirect =
      gameConfig.restrictedAccess && user.token
        ? "/profile"
        : restricted === 1 && !user.token
        ? "/login"
        : restricted === 2 && user.token && user.credentials
        ? "/error-409" // Already logged in.
        : "";

    if (redirect)
      history.push(redirect, { state: { from: location }, replace: true });
  }, [user.token, gameConfig.restrictedAccess]);

  return children;
};

const mapStateToProps = ({
  user,
  gameConfig,
}: {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
}) => ({
  user,
  gameConfig,
});

export default connect(mapStateToProps, null)(Gate);
