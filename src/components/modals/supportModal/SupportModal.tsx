import { UserReduxState } from "@reducers/user";
import UserCredentials from "@typings/UserCredentials";

import { useState } from "react";
import { connect } from "react-redux";

import ModalTemplate from "../ModalTemplate";
import s from "./styles.module.css";

interface Props {
  user?: UserCredentials;
}

const SupportModal: React.FC<Props> = ({ user }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        aria-label="Support"
        className={`${s.trigger} fade`}
      />
      <ModalTemplate
        show={show}
        setShow={setShow}
        height={294}
        label="Contact Support"
      >
        <div className={s.container}>
          <h2>Support</h2>
          <div>
            <p>
              Hey, {user ? user.name : "NA"}! If you need help with anything
              feel free to contact us via our email:
              <a
                href="mailto:connect@building-U.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fade move"
              >
                connect@building-U.com
              </a>
            </p>
            <p>
              Additionally, if you are a part of our discord community, we would
              be happy to provide help in our "SUPPORT" channel:
              <a
                href="https://discord.com/invite/A3dpd9Ex"
                target="_blank"
                rel="noopener noreferrer"
                className="fade move"
              >
                Discord
              </a>
            </p>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  user: user.credentials,
});

export default connect(mapStateToProps, null)(SupportModal);
