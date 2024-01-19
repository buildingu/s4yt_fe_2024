import { useState } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";

import { loginPlayer } from "@actions/user";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

interface Props {
  loginPlayer: (
    userData: any,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) => Promise<any>;
}

interface FromData {
  player_id: string;
  password: string;
}

const Login: React.FC<Props> = ({ loginPlayer }) => {
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
      if (!field.validity.valid && valid) valid = false;
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));
      await loginPlayer(currentData, setForm);
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
  loginPlayer: (
    userData: any,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) => dispatch(loginPlayer(userData, setForm) as unknown) as Promise<any>,
});

export default connect(null, mapDispatchToProps)(Login);
