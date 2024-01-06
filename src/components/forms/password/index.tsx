import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userProfile } from "@actions/user";
import { setNotification } from "@actions/notification";
import s from "./styles.module.css";

interface Props {
  data: Array<String>;
  userProfile: Function;
  setNotification: Function;
}

// FIXME: This one is in profile...
const Password: React.FC<Props> = ({ user, userProfile, setNotification }) => {
  const [form, setForm] = useState({
    processing: false,
    valid: false,
    submitted: false,
    error: null,
  });
  const [data, setData] = useState({
    ...user,
    player: user.player
      ? {
          grade_id: user.player.grade_id,
          education_id: user.player.education_id,
          instagram: user.player.instagram,
          country_iso: user.player.country_iso,
          state_iso: user.player.state_iso,
          city_id: user.player.city_id,
        }
      : {},
  });

  const submit = (e) => {
    e.preventDefault();

    const fields = document.querySelectorAll("#userForm input");
    let valid = true;

    for (let x = 0; x < fields.length; x++) {
      fields[x].setAttribute("data-valid", fields[x].validity.valid ? 1 : 0);

      if (!fields[x].validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      userProfile({ ...data, _method: "PUT" }, (res) => {
        if (!res.errors) {
          fields[0].value = "";
          fields[0].value = "";

          setNotification({
            display: true,
            error: false,
            content: "Password updated!",
            timed: true,
          });

          if (data.id) {
            setForm({
              data: {
                ...res.data,
                password: null,
                password_confirmation: null,
              },
              ...form,
              processing: false,
            });
          }
        } else {
          const key = Object.keys(res.errors)[0];

          setNotification({
            display: true,
            error: true,
            content: res.errors[key],
            timed: true,
          });
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

  return (
    <form
      id="userForm"
      className={s.form}
      onSubmit={submit}
      autoComplete="off"
      noValidate
    >
      <fieldset>
        <label htmlFor="password">New Pass</label>
        <input
          id="password"
          name="password"
          type="password"
          onKeyUp={updateField}
          readOnly={form.processing}
          autoComplete="off"
          minLength="8"
          maxLength="24"
          required
        />
        <small>Must be between 8 and 24 characters</small>
      </fieldset>
      <fieldset>
        <label htmlFor="password_confirmation">Confirm Pass</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          onKeyUp={updateField}
          readOnly={form.processing}
          autoComplete="off"
          minLength="8"
          maxLength="24"
          required
        />
        <small>Passwords do not match</small>
      </fieldset>
      <fieldset>
        <button disabled={form.processing}>Update</button>
      </fieldset>
    </form>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  userProfile: (data, callback) => dispatch(userProfile(data, callback)),
  setNotification: (data) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);
