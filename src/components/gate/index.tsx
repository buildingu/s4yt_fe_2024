import UserCredentials from "@typings/UserCredentials";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Profile from "@views/profile";

interface Props extends React.PropsWithChildren<{}> {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
  restricted: number;
}

// TODO: Add only pages you can only be redirected to... probably?
const Gate: React.FC<Props> = ({ children, user, gameConfig, restricted }) => {
  // FIXME: This is pissing me off for a long time, I have no idea why the other redirects work and the only one
  // that doesn't is "/profile", it doesn't make any sense, so in a last resort, I just import Profile, this is not ideal.
  const redirect =
    // gameConfig.restrictedAccess && user.token
    //   ? "/profile"
    //   :
    restricted === 1 && !user.token
      ? "/login"
      : restricted === 2 && user.token && user.credentials
      ? "/already-logged-in"
      : null;

  // console.log("allow", allow);
  // console.log("gameConfig", gameConfig);
  // console.log("redirect", redirect);
  // console.log("user", user);

  // return redirect ? (
  //   <Navigate to={redirect} replace={true} />
  // ) : gameConfig.restrictedAccess && user.token ? (
  //   <Profile />
  // ) : (
  //   children
  // );
  return <>{children}</>;
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
