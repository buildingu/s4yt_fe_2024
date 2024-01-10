import NotificationValues from "@typings/NotificationValues";

import { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";

import { sendVerifyEmail } from "@actions/user";
import { setNotification } from "@actions/notification";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

interface Props {
  sendVerifyEmail: (email: string) => Promise<any>;
  setNotification: (data: NotificationValues) => void;
}

const VerifyEmail: React.FC<Props> = ({ sendVerifyEmail, setNotification }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false, success: false }),
    [currentData, setCurrentData] = useState({ email: "" });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = document.querySelector<HTMLInputElement>(
      "#verifyEmailForm input"
    )!;
    let valid = true;

    checkValidity(field);
    if (!field.validity.valid && valid) {
      valid = false;
    }

    if (valid) {
      setForm({ success: false, processing: true });
      const res = await sendVerifyEmail(currentData.email);
      // console.log("res", res);
      if (res.success) {
        formRef.current!.reset();
        setNotification({
          display: true,
          error: false,
          content:
            "Lastly, to complete the registration process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
          close: false,
          duration: 0,
        });
      } else {
        setForm((prev) => ({ ...prev, success: true }));
        setNotification({
          display: true,
          error: true,
          content: res.message,
          close: false,
          duration: 0,
        });
      }
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

  return (
    // TODO: coins1
    <Layout addCoins="coins1" style={{ maxWidth: "600px" }}>
      <Header title="Verify Email" />
      <Content>
        <form
          id="verifyEmailForm"
          onSubmit={(e) => submit(e)}
          className={s.form}
          ref={formRef}
          autoComplete="off"
          noValidate
        >
          <div role="presentation">
            {form.success && <span>This is when a timer will appear.</span>}
            <label htmlFor="email">Email</label>
            <input
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

          <div>
            <p>
              Enter your email address to resend the variation email. If your
              account exists, the message will be resent.
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
  sendVerifyEmail: (email: string) =>
    dispatch(sendVerifyEmail(email) as unknown) as Promise<any>,
  setNotification: (data: NotificationValues) =>
    dispatch(setNotification(data)),
});

export default connect(null, mapDispatchToProps)(VerifyEmail);
