import type { UserReduxState } from "@reducers/user";
import type NotificationValues from "@typings/NotificationValues";

import { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";
import checkMatchingPasswords from "@utils/forms/checkMatchingPasswords";
import delay from "@utils/delay";
import history from "@utils/History";

import { showError } from "@root/services/errorHandler";

import { resetPassword } from "@actions/user";
import { updatePassword } from "@actions/user";
import { addNotification } from "@actions/notifications";

import Input from "@components/forms/controls/Input";

import s from "./styles.module.css";

interface Props {
  verificationToken?: string | null;
  userToken?: string;
  resetPassword: (userData: PasswordFormData) => Promise<any>;
  updatePassword: (userData: PasswordFormData) => Promise<any>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
  showError: (data: any, status: number) => void;
}

interface PasswordFormData {
  token?: string;
  old_password?: string;
  password: string;
  password_confirmation: string;
}

const PasswordForm: React.FC<Props> = ({
  verificationToken,
  userToken,
  resetPassword,
  updatePassword,
  addNotification,
  showError
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<PasswordFormData>({
      ...(userToken ? { old_password: "" } : { token: verificationToken! }),
      password: "",
      password_confirmation: ""
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userToken && !currentData.token)
      addNotification({
        error: true,
        content: "The reset link is invalid. Please ensure you accessed this page through the link provided in your email.",
        close: false,
        duration: 0
      });

    const fields = document.querySelectorAll<HTMLInputElement>(
      "#updatePasswordForm input, #resetPasswordForm input"
    );
    let valid = true,
      passwordValue: string;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.name === "password") passwordValue = field.value;
      if (field.name === "password_confirmation") {
        checkMatchingPasswords(field, passwordValue!);
      } else {
        checkValidity(field);
      }

      if (!field.validity.valid && valid) valid = false;
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));

      let res: { data: any; meta: Response };
      userToken
        ? (res = await updatePassword(currentData))
        : (res = await resetPassword(currentData));

      if (res.meta?.ok) {
        formRef.current!.reset();
        addNotification({
          error: false,
          content: userToken
            ? "Your password was successfully updated ✔"
            : "Your password reset successfully ✔",
          close: false,
          duration: 4000
        });
        !userToken && delay(2500, () => history.push("/login"));
      } else {
        showError(res.data, res.meta?.status)
      }
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

  return (
    <form
      id={userToken ? "updatePasswordForm" : "resetPasswordForm"}
      className={s.form}
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
      autoComplete="off"
      noValidate
    >
      {userToken && (
        <div role="presentation">
          <label htmlFor="old_password">Current Pass</label>
          <Input
            id="old_password"
            name="old_password"
            type="text"
            onChange={(e) => updateField<PasswordFormData>(e, setCurrentData)}
            disabled={form.processing}
            autoComplete="off"
            required
          />
        </div>
      )}

      <div role="presentation">
        <label aria-label="Password" htmlFor="password">
          Pass
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          errorMsg="Must be between 8 and 24 characters"
          onChange={(e) => updateField<PasswordFormData>(e, setCurrentData)}
          disabled={form.processing}
          autoComplete="off"
          minLength={8}
          maxLength={24}
          required
        />
      </div>

      <div role="presentation">
        <label aria-label="Confirm Password" htmlFor="password_confirmation">
          Confirm Pass
        </label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          errorMsg="Passwords do not match"
          onChange={(e) => updateField<PasswordFormData>(e, setCurrentData)}
          disabled={form.processing}
          autoComplete="off"
          minLength={8}
          maxLength={24}
          required
        />
      </div>

      <div>
        {userToken ? (
          <button
            type="submit"
            className="updateBtn"
            disabled={form.processing}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="okBtn flip"
            disabled={form.processing}
          />
        )}
      </div>
    </form>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  userToken: user.tokens.access
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  resetPassword: (userData: PasswordFormData) =>
    dispatch(resetPassword(userData) as unknown) as Promise<any>,
  updatePassword: (userData: PasswordFormData) =>
    dispatch(updatePassword(userData) as unknown) as Promise<any>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
  showError: (data: any, status: number) => showError(data, status, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm);
