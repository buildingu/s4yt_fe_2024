import type { Dispatch } from "redux";

import { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidEmail from "@root/utils/forms/checkValidEmail";

import { sendVerifyEmail } from "@actions/user";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Input from "@components/forms/controls/Input";
import ExpiresInIndicator from "@components/forms/expiresInIndicator";

import s from "./styles.module.css";

interface Props {
  sendVerifyEmail: (
    email: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
        success: boolean;
      }>
    >
  ) => Promise<void>;
}

const VerifyEmail: React.FC<Props> = ({ sendVerifyEmail }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false, success: false }),
    [currentData, setCurrentData] = useState({ email: "" });

  const [breakCenter, setBreakCenter] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = document.querySelector<HTMLInputElement>(
      "#verifyEmailForm input"
    )!;
    let valid = true;

    checkValidEmail(field);
    if (!field.validity.valid && valid) valid = false;

    if (valid) {
      setForm({ success: false, processing: true });
      await sendVerifyEmail(currentData.email, formRef, setForm);
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 764) {
        setBreakCenter(true);
      } else {
        setBreakCenter(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <Header
        title="Verify Email"
        style={{
          maxWidth: "700px",
          ...(!breakCenter && { marginInline: "auto" })
        }}
      />
      <Content
        addCoins="coins1"
        style={{ maxWidth: "600px", marginInline: "auto" }}
      >
        <form
          aria-describedby="explanation"
          id="verifyEmailForm"
          onSubmit={(e) => submit(e)}
          className={s.form}
          ref={formRef}
          autoComplete="off"
          noValidate
        >
          <div role="presentation">
            <div role="presentation" className={s.labelContainer}>
              <label htmlFor="email">Email</label>
              <ExpiresInIndicator
                formSuccess={form.success}
                setForm={setForm}
              />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              errorMsg="Not a valid email address"
              onChange={(e) =>
                updateField<{ email: string }>(e, setCurrentData)
              }
              disabled={form.processing}
              autoComplete="off"
              required
            />
          </div>

          <div role="presentation">
            <p id="explanation">
              Enter your email address to resend the verification email. If your
              account exists, the email will be resent.
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
  sendVerifyEmail: (
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
      sendVerifyEmail(email, formRef, setForm) as unknown
    ) as Promise<void>
});

export default connect(null, mapDispatchToProps)(VerifyEmail);
