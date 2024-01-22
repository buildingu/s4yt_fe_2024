import { UserReduxState } from "@reducers/user";
import UserCredentials from "@typings/UserCredentials";

import { useState } from "react";
import { connect } from "react-redux";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

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
        className={`${s.questions} fade`}
      />
      <ModalTemplate show={show} setShow={setShow} label="Raffle Item Details">
        <div className={s.modalContainer}>
          <h2>Support</h2>
          <div className={s.supportContainer}>
            <p>
              Hey, {user ? user.name : "NA"}! If you need help with anything
              feel free to contact us via our email:
              <a onClick={() => window.open("mailto:connect@building-U.com")}>
                connect@building-U.com
              </a>
            </p>
            <p>
              Additionally, if you are a part of our discord community, we would
              be happy to provide help in our 'SUPPORT' channel:
              {/* TODO: Need to get the link. */}
              <a>Discord Link</a>
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
