import NotificationValues from "@typings/NotificationValues";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";

import { loginPlayer, setCurrentUser, setToken } from "@actions/user";
import { setConfiguration } from "@actions/gameConfig";
import { addNotification } from "@actions/notifications";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

interface Props {
  loginPlayer: (userData: any) => Promise<any>;
  setCurrentUser: (userData: any) => void;
  setToken: (token: string) => void;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

interface FromData {
  player_id: string;
  password: string;
}

const Login: React.FC<Props> = ({
  loginPlayer,
  setCurrentUser,
  setToken,
  addNotification,
}) => {
  const [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<FromData>({
      player_id: "",
      password: "",
    });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fields =
      document.querySelectorAll<HTMLInputElement>("#loginForm input");
    let valid = true;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      checkValidity(field);
      if (!field.validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      setForm({ processing: true });
      const res = await loginPlayer(currentData);

      if (res.success) {
        setCurrentUser(res.data.user); // Roles too.
        setToken(res.data.token);
        setConfiguration(res.data.countdown);

        addNotification({
          error: false,
          content: `Welcome ${res.data.name} ✔`,
          close: false,
          duration: 4000,
        });
      } else {
        addNotification({
          error: true,
          content: res.message,
          close: false,
          duration: 0,
        });
      }
      setForm({ processing: false });
    }
  };

  return (
    <Layout style={{ maxWidth: "600px" }}>
      {/* <img src={coins1} alt="Doblons" className={s.coins} /> */}
      <Header title="Login" />
      <Content>
        <form
          id="loginForm"
          onSubmit={(e) => submit(e)}
          className={s.form}
          autoComplete="off"
          noValidate
        >
          <div role="presentation">
            <label htmlFor="player_id">Player Id</label>
            <input
              id="player_id"
              name="player_id"
              type="player_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              autoComplete="off"
              required
            />
          </div>

          <div role="presentation">
            <label htmlFor="password" aria-label="Password">
              Pass
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              autoComplete="off"
              minLength={8}
              maxLength={24}
              required
            />
          </div>

          <div role="presentation">
            <Link to="/login/forgot" className={s.forgot}>
              Forgot pass?
            </Link>
          </div>

          <div role="presentation">
            <button className="okBtn" disabled={form.processing}></button>
          </div>
        </form>
        <Link to="/register" />
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loginPlayer: (userData: any) =>
    dispatch(loginPlayer(userData) as unknown) as Promise<any>,
  setCurrentUser: (userData: any) => dispatch(setCurrentUser(userData)),
  setToken: (token: string) => dispatch(setToken(token)),
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(null, mapDispatchToProps)(Login);
