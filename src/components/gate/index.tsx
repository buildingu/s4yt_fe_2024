import UserCredentials from "@typings/UserCredentials";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props extends React.PropsWithChildren<{}> {
  user: { credentials?: UserCredentials; token?: string };
  gameConfig: any;
  restricted: number;
}

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
