import { useRef, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidEmail from "@utils/forms/checkValidEmail";

import { sendResetPasswordEmail } from "@actions/user";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import ExpiresInIndicator from "@components/forms/expiresInIndicator";

import s from "./styles.module.css";

interface Props {
  sendResetPasswordEmail: (
    email: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
        success: boolean;
      }>
    >
  ) => Promise<any>;
}

const ForgotPassword: React.FC<Props> = ({ sendResetPasswordEmail }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false, success: false }),
    [currentData, setCurrentData] = useState({ email: "" });

  const [breakCenter, setBreakCenter] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = document.querySelector<HTMLInputElement>(
      "#forgotPasswordForm input"
    )!;
    let valid = true;

    checkValidEmail(field);
    if (!field.validity.valid && valid) valid = false;

    if (valid) {
      setForm({ success: false, processing: true });
      await sendResetPasswordEmail(currentData.email, formRef, setForm);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 764) {
        setBreakCenter(true);
      } else {
        setBreakCenter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout addCoins="coins1">
      <Header
        title="Forgot Password"
        style={{
          maxWidth: "700px",
          ...(!breakCenter && { marginInline: "auto" }),
        }}
      />
      <Content style={{ maxWidth: "600px", marginInline: "auto" }}>
        <form
          id="forgotPasswordForm"
          onSubmit={(e) => submit(e)}
          className={s.form}
          ref={formRef}
          autoComplete="off"
          noValidate
        >
          <div role="presentation">
            <div role="presentation">
              <label htmlFor="email">Email</label>
              <ExpiresInIndicator
                formSuccess={form.success}
                setForm={setForm}
              />
            </div>
            <input
              aria-describedby="explanation"
              id="email"
              name="email"
              type="email"
              onChange={(e) =>
                updateField<{ email: string }>(e, setCurrentData)
              }
              disabled={form.processing}
              aria-disabled={form.processing}
              autoComplete="off"
              required
            />
            <small className="formError">Not a valid email address</small>
          </div>

          <div role="presentation">
            <p id="explanation">
              Enter your email address to receive a password reset link. If your
              account exists, the email will be sent to your email address.
            </p>
            <button
              type="submit"
              className="okBtn"
              disabled={form.processing}
            />
          </div>
        </form>
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  sendResetPasswordEmail: (
    email: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
        success: boolean;
      }>
    >
  ) =>
    dispatch(
      sendResetPasswordEmail(email, formRef, setForm) as unknown
    ) as Promise<any>,
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
