import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import { login } from "@actions/user";
import { setNotification, setToken } from "@actions/notifications";
import s from "./styles.module.css";
import coins1 from "@static/coins_variant1.png";

// TODO: Types...
interface Props {
  login: Function;
  // notification: Array<String>;
  setNotification: Function;
  setToken: Function;
}

const Login: React.FC<Props> = ({
  login,
  // notification,
  setNotification,
  setToken,
}) => {
  const [form, setForm] = useState({
    processing: false,
    valid: false,
    submitted: false,
    error: null,
  });
  const [data, setData] = useState({});
  const [isSmallerThen464, setIsSmallerThen464] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 464) {
        setIsSmallerThen464(true);
      } else {
        setIsSmallerThen464(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // TODO: Check if it redirects to the home page on login.
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fields = document.querySelectorAll("#loginForm input,select");
    let valid = true;

    for (let x = 0; x < fields.length; x++) {
      fields[x].setAttribute("data-valid", fields[x].validity.valid ? 1 : 0);

      if (!fields[x].validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      login(data, (res) => {
        if (res.success) {
          setToken(res.data.token);
        } else {
          setNotification({ display: true, error: true, content: res.message });
          setForm({ ...form, processing: false });
        }
      });
    }

    setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (event) => {
    const node = event.target;
    const key = node.getAttribute("name");

    if (form.submitted) {
      node.setAttribute("data-valid", node.validity.valid ? 1 : 0);
    }

    setData({ ...data, [key]: node.value });
  };

  // const redirect = (e) => {
  //   e.preventDefault();

  //   navigate(e.target.getAttribute("href"));
  // };

  return (
    <Layout style={{ maxWidth: "600px" }}>
      <img src={coins1} alt="Doblons" className={s.coins} />
      <Header title="Login" />
      <Content
        style={{
          paddingLeft: isSmallerThen464 ? "1rem" : "4rem",
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onKeyUp={updateField}
            readOnly={form.processing}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Pass</label>
          <input
            id="password"
            name="password"
            type="password"
            onKeyUp={updateField}
            readOnly={form.processing}
            autoComplete="off"
            required
          />
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

// const mapStateToProps = ({ notification }: any) => ({ notification });
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  login: (data: any, callback: () => void) => dispatch(login(data, callback)),
  setToken: (data: any, callback: () => void) => dispatch(setToken(data)),
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
