import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userProfile } from "@actions/user";
import { getCountries, getRegions, getCities } from "@actions/locations";
import { getGrades, getEducation } from "@actions/options";
import { setNotification } from "@actions/notifications";
import s from "./styles.module.css";

// TODO: Look at my old types for this.
interface Props {
  //   options: Array<String>;
  options: { [key: string]: any };
  userProfile: Function;
  getGrades: Function;
  getEducation: Function;
  getCountries: Function;
  getRegions: Function;
  getCities: Function;
  user: Array<String>;
  setNotification: Function;
  referral: Number;
  handler: Function;
}

const UserForm: React.FC<Props> = ({
  options,
  userProfile,
  getGrades,
  getEducation,
  getCountries,
  getRegions,
  getCities,
  setNotification,
  user,
  referral,
  handler,
}) => {
  const [form, setForm] = useState({
    processing: false,
    valid: false,
    submitted: false,
    error: null,
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState(
    user.id
      ? {
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
        }
      : { player: { country_iso: "", state_iso: "" } }
  );

  useEffect(() => {
    if (options.countries.length === 0) {
      getCountries();
    }

    if (options.grades.length === 0) {
      getGrades();
    }

    if (options.education.length === 0) {
      getEducation();
    }

    if (referral && user.email) {
      setData({ ...data, referral: parseInt(referral), email: user.email });
    }
  }, []);

  useEffect(() => {
    if (data.player && data.player.country_iso) {
      getRegions(data.player.country_iso, (data) => {
        setStates(data);
        setCities([]);
      });
    } else {
      setStates([]);
      setCities([]);
    }
  }, [data.player.country_iso]);

  useEffect(() => {
    if (data.player && data.player.state_iso) {
      getCities(data.player.country_iso, data.player.state_iso, (data) => {
        setCities(data);
      });
    } else {
      setStates([]);
      setCities([]);
    }
  }, [data.player.state_iso]);

  const submit = (e) => {
    e.preventDefault();

    const fields = document.querySelectorAll(
      "#userForm input,select, #registrationForm input,select"
    );
    let valid = true;

    for (let x = 0; x < fields.length; x++) {
      fields[x].setAttribute("data-valid", fields[x].validity.valid ? 1 : 0);

      if (!fields[x].validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      userProfile(
        data.id ? { ...data, _method: "PUT" } : { ...data },
        (res) => {
          if (!res.errors) {
            setNotification({
              display: true,
              error: false,
              content: data.id
                ? "Updated!"
                : "Thank you for registering! To complete the process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
              timed: data.id ? true : false,
            });

            if (data.id) {
              if (handler) {
                handler(res.data);
              }

              setForm({ data: { ...res.data }, ...form, processing: false });
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
        }
      );
    }

    setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (event) => {
    const node = event.target;
    const key = node.getAttribute("name");
    const isPlayerData =
      [
        "education_id",
        "grade_id",
        "country_iso",
        "state_iso",
        "city_id",
        "instagram",
      ].indexOf(key) === -1
        ? false
        : true;

    if (form.submitted) {
      node.setAttribute("data-valid", node.validity.valid ? 1 : 0);
    }

    setData(
      isPlayerData
        ? {
            ...data,
            player: {
              ...data.player,
              [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
            },
          }
        : {
            ...data,
            [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
          }
    );
  };

  return (
    <form
      id={user.id ? "userForm" : "registrationForm"}
      onSubmit={submit}
      className={s.form}
      autoComplete="off"
      noValidate
    >
      <div role="presentation">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onKeyUp={updateField}
          readOnly={form.processing}
          defaultValue={data.name ? data.name : ""}
          autoComplete="off"
          required
        />
      </div>

      <div role="presentation">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onKeyUp={updateField}
          readOnly={form.processing}
          defaultValue={data.email ? data.email : ""}
          autoComplete="off"
          required
        />
        <small>Not a valid email address</small>
      </div>

      {/* This id is for profile. */}
      {!user.id && (
        <span>
          <div role="presentation">
            <label htmlFor="password">Pass</label>
            <input
              id="password"
              name="password"
              type="password"
              onKeyUp={updateField}
              readOnly={form.processing}
              autoComplete="off"
              minLength={8}
              maxLength={24}
              required
            />
            <small>Must be between 8 and 24 characters</small>
          </div>
          <div role="presentation">
            <label htmlFor="password_confirmation">Confirm Pass</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              onKeyUp={updateField}
              readOnly={form.processing}
              autoComplete="off"
              minLength={8}
              maxLength={24}
              required
            />
            <small>Passwords do not match</small>
          </div>
        </span>
      )}

      <div role="presentation">
        <label htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          name="instagram"
          type="ext"
          onKeyUp={updateField}
          readOnly={form.processing}
          defaultValue={data.player ? data.player.instagram : ""}
          autoComplete="off"
        />
      </div>

      <span>
        <div role="presentation">
          <label htmlFor="education">Education</label>
          <select
            id="education"
            name="education_id"
            onChange={updateField}
            disabled={form.processing}
            defaultValue={data.player ? data.player.education_id : ""}
            required
          >
            <option value="">- Select -</option>
            {options.education &&
              options.education.map((education, index) => {
                return (
                  <option key={index} value={education.id}>
                    {education.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div role="presentation">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            name="grade_id"
            onChange={updateField}
            disabled={form.processing}
            defaultValue={data.player ? data.player.grade_id : ""}
            required
          >
            <option value="">- Select -</option>
            {options.grades &&
              options.grades.map((grade, index) => {
                return (
                  <option key={index} value={grade.id}>
                    {grade.name}
                  </option>
                );
              })}
          </select>
        </div>
      </span>

      <span>
        <div role="presentation">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country_iso"
            onChange={updateField}
            disabled={form.processing}
            value={data.player ? data.player.country_iso : ""}
            required
          >
            <option value="">- Select -</option>
            {options.countries &&
              options.countries.map((country, index) => {
                return (
                  <option key={index} value={country.iso2}>
                    {country.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div role="presentation">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="state_iso"
            onChange={updateField}
            required
            disabled={
              !data.player ||
              !data.player.country_iso ||
              data.player.country_iso === "" ||
              states.length === 0 ||
              form.processing
            }
            value={data.player ? data.player.state_iso : ""}
          >
            <option value="">- Select -</option>
            {states &&
              states.map((state, index) => {
                return (
                  <option key={index} value={state.iso2}>
                    {state.name}
                  </option>
                );
              })}
          </select>
        </div>
      </span>

      <div role="presentation">
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city_id"
          onChange={updateField}
          required
          disabled={
            !(
              data.player &&
              data.player.country_iso &&
              data.player.state_iso
            ) || form.processing
          }
          value={data.player ? data.player.city_id : ""}
        >
          <option value="">- Select -</option>
          {cities &&
            cities.map((city, index) => {
              return (
                <option key={index} value={city.id}>
                  {city.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <Link to="/login" className="fade move">
          Already have a account?
        </Link>
        <button disabled={form.processing}></button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ options }: any) => ({ options });
const mapDispatchToProps = (dispatch: Function) => ({
  getCountries: () => dispatch(getCountries()),
  userProfile: (data: any, callback: () => void) =>
    dispatch(userProfile(data, callback)),
  getGrades: () => dispatch(getGrades()),
  getRegions: (ciso: any, callback: () => void) =>
    dispatch(getRegions(ciso, callback)),
  getCities: (ciso: any, siso: any, callback: () => void) =>
    dispatch(getCities(ciso, siso, callback)),
  getEducation: () => dispatch(getEducation()),
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
