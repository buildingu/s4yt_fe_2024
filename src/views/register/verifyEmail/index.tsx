import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidEmail from "@root/utils/forms/checkValidEmail";

import { sendVerifyEmail } from "@actions/user";
import { addNotification } from "@actions/notifications";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import ExpiresInIndicator from "@components/forms/expiresInIndicator";

import s from "./styles.module.css";

interface Props {
  sendVerifyEmail: (email: string) => Promise<any>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

const VerifyEmail: React.FC<Props> = ({ sendVerifyEmail, addNotification }) => {
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
    if (!field.validity.valid && valid) {
      valid = false;
    }

    if (valid) {
      setForm({ success: false, processing: true });
      const res = await sendVerifyEmail(currentData.email);

      if (res.success) {
        formRef.current!.reset();
        addNotification({
          error: false,
          content:
            "Lastly, to complete the registration process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
          close: false,
          duration: 0,
        });
        setForm((prev) => ({ ...prev, success: true }));
      } else {
        addNotification({
          error: true,
          content: res.message,
          close: false,
          duration: 0,
        });
      }
      setForm((prev) => ({ ...prev, processing: false }));
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
    // TODO: coins1
    <Layout addCoins="coins1">
      <Header
        title="Verify Email"
        style={{
          maxWidth: "700px",
          ...(!breakCenter && { marginInline: "auto" }),
        }}
      />
      <Content style={{ maxWidth: "600px", marginInline: "auto" }}>
        <form
          id="verifyEmailForm"
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
              Enter your email address to resend the variation email. If your
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
  sendVerifyEmail: (email: string) =>
    dispatch(sendVerifyEmail(email) as unknown) as Promise<any>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(null, mapDispatchToProps)(VerifyEmail);
