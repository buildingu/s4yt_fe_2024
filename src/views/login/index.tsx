import NotificationValues from "@typings/NotificationValues";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";

import { loginPlayer } from "@actions/user";
import { setToken } from "@actions/user";
import { setNotification } from "@actions/notification";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

// import coins1 from "@static/coins_variant1.png";

interface Props {
  loginPlayer: (userData: any) => Promise<any>;
  setNotification: (data: NotificationValues) => void;
  setToken: (token: string) => void;
}

interface FromData {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ loginPlayer, setNotification, setToken }) => {
  const [form, setForm] = useState({
      processing: false,
      // valid: false,
      // submitted: false,
      // error: null,
    }),
    [currentData, setCurrentData] = useState<FromData>({
      email: "",
      password: "",
    });
  // const [isSmallerThen464, setIsSmallerThen464] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 464) {
  //       setIsSmallerThen464(true);
  //     } else {
  //       setIsSmallerThen464(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
        setToken(res.data.token);
      } else {
        setNotification({
          display: true,
          error: false,
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
      <Content
        style={{
          // paddingLeft: isSmallerThen464 ? "1rem" : "4rem",
          paddingLeft: "4rem",
          paddingTop: "3.5rem",
        }}
      >
        <form
          id="loginForm"
          onSubmit={(e) => submit(e)}
          className={s.form}
          autoComplete="off"
          noValidate
        >
          {/* TODO: This may be changed. */}
          <div role="presentation">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              autoComplete="off"
              required
            />
            <small className="formError">Not a valid email address</small>
          </div>

          <div role="presentation">
            <label htmlFor="password">Pass</label>
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
            <small className="formError">
              Must be between 8 and 24 characters
            </small>
          </div>
          {/* TODO: May add a confirm password. */}

          <Link to="/password-reset" className={s.forgot}>
            Forgot pass?
          </Link>

          <button disabled={form.processing}></button>
        </form>
        <Link to="/register" />
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loginPlayer: (userData: any) =>
    dispatch(loginPlayer(userData) as unknown) as Promise<any>,
  setToken: (token: string) => dispatch(setToken(token)),
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(null, mapDispatchToProps)(Login);
