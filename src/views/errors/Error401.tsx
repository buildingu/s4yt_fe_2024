import { Dispatch } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";

import { logoutPlayer } from "@actions/user";
import delay from "@utils/delay";

import Error from ".";

const Error500: React.FC<{ logoutPlayer: () => void }> = ({ logoutPlayer }) => {
  useEffect(() => {
    delay(1200, () => logoutPlayer());
  }, []);

  return (
    <Error
      status={401}
      text="Unauthorized; there was a error validating your user token where Authorization is required"
      linkType="login"
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logoutPlayer: () => dispatch(logoutPlayer()),
});

export default connect(null, mapDispatchToProps)(Error500);
