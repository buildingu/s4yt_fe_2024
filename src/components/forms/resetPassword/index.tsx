import NotificationValues from "@typings/NotificationValues";

import { useRef, useState } from "react";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";
import checkMatchingPasswords from "@utils/forms/checkMatchingPasswords";

import { resetPassword } from "@actions/user";
import { updatePassword } from "@actions/user";
import { addNotification } from "@actions/notifications";

import s from "./styles.module.css";

interface Props {
  playerId: string;
  user: any;
  resetPassword: (userData: any) => Promise<any>;
  updatePassword: (userData: any) => Promise<any>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

interface FromData {
  player_id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const ResetPasswordForm: React.FC<Props> = ({
  playerId,
  user,
  resetPassword,
  updatePassword,
  addNotification,
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    // FIXME: Weird type error.
    [currentData, setCurrentData] = useState<FormData>({
      ...(user.id ? { old_password: "" } : { player_id: playerId }),
      password: "",
      password_confirmation: "",
    });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentData.player_id)
      throw Error(
        "Somehow you were brought to this page without us finding your player_id, you should only get redirected here."
      );

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

      if (!field.validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));

      let res: any;
      user.id
        ? (res = await updatePassword(currentData))
        : (res = await resetPassword(currentData));

      if (!res.errors) {
        formRef.current!.reset();
        addNotification({
          error: false,
          content: user.id
            ? "Your password was successfully updated ✔"
            : "Your password reset successfully ✔",
          close: false,
          duration: 4000,
        });
      } else {
        const key = Object.keys(res.errors)[0];

        addNotification({
          error: true,
          content: res.errors[key],
          close: false,
          duration: 0,
        });
      }
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

  return (
    <form
      id={user.id ? "updatePasswordForm" : "resetPasswordForm"}
      className={s.form}
      onSubmit={(e) => submit(e)}
      ref={formRef}
      autoComplete="off"
      noValidate
    >
      {user.id && (
        <div role="presentation">
          <label htmlFor="old_password">Current Pass</label>
          <input
            id="old_password"
            name="old_password"
            type="old_password"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={form.processing}
            aria-disabled={form.processing}
            autoComplete="off"
            required
          />
        </div>
      )}

      <div role="presentation">
        <label aria-label="Password" htmlFor="password">
          Pass
        </label>
        <input
          aria-describedby="formError"
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
        <small aria-live="assertive" id="formError" className="formError">
          Must be between 8 and 24 characters
        </small>
      </div>

      <div role="presentation">
        <label aria-label="Confirm Password" htmlFor="password_confirmation">
          Confirm Pass
        </label>
        <input
          aria-describedby="formError"
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          onChange={(e) => updateField<FromData>(e, setCurrentData)}
          disabled={form.processing}
          aria-disabled={form.processing}
          autoComplete="off"
          minLength={8}
          maxLength={24}
          required
        />
        <small aria-live="assertive" id="formError" className="formError">
          Passwords do not match
        </small>
      </div>

      <div>
        {user.id ? (
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

const mapStateToProps = ({ user }: any) => ({
  user: user.credentials,
});
const mapDispatchToProps = (dispatch: Function) => ({
  resetPassword: (userData: FromData) =>
    dispatch(resetPassword(userData) as unknown) as Promise<any>,
  updatePassword: (userData: FromData) =>
    dispatch(updatePassword(userData) as unknown) as Promise<any>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
