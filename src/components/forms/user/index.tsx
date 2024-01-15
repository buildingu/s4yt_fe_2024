import UserCredentials from "@typings/UserCredentials";
import FormOptionsState from "@typings/redux/FormOptionsState";
import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";

import { registerPlayer, userProfile } from "@actions/user";
import {
  getGrades,
  getEducation,
  getCountries,
  getRegions,
  getCities,
} from "@actions/formOptions";
import { addNotification } from "@actions/notifications";
import { SET_REGIONS } from "@actions/index";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";
import checkValidEmail from "@utils/forms/checkValidEmail";
import checkMatchingPasswords from "@utils/forms/checkMatchingPasswords";

import Spinner from "@components/loaders/spinner/Spinner";

import s from "./styles.module.css";

// FIXME: THESE RETURNS PROMISES.
interface Props {
  formOptions: FormOptionsState;
  getEducation: () => void;
  getGrades: () => void;
  getCountries: () => void;
  getRegions: (countryId: number) => void;
  resetRegions: () => void;
  getCities: (regionId: number) => void;
  user: { credentials?: UserCredentials; token?: string };
  registerPlayer: (userData: any) => Promise<any>;
  userProfile: (data: any, callback: () => void) => void;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
  referral?: string;
}

interface FromData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  // instagram: string;
  education_id: null | number;
  school: "";
  grade_id: null | number;
  country_id: null | number;
  region_id: null | number;
  city_id: null | number;
}

const UserForm: React.FC<Props> = ({
  formOptions,
  getEducation,
  getGrades,
  getCountries,
  getRegions,
  resetRegions,
  getCities,
  addNotification,
  // This will not be passed in at profile anymore, it will be in the redux.
  user,
  registerPlayer,
  userProfile,
  referral,
}) => {
  const [activeSelect, setActiveSelect] = useState<string | null>(null);
  const handleSelectBlur = () => {
    setActiveSelect(null);
  };
  const handleSelectClick = (selectId: string) => {
    if (activeSelect === selectId) {
      setActiveSelect(null);
    } else {
      setActiveSelect(selectId);
    }
  };

  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<FromData>({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      // instagram: "",
      education_id: null,
      school: "",
      grade_id: null,
      country_id: null,
      region_id: null,
      city_id: null,
      // TODO:
<<<<<<< HEAD
      //  ...(user.id && { ...user }),
    }),
    dispatch = useDispatch();
=======
      //  ...(userToken && { ...user }),
    });
>>>>>>> 74f78b4d7040b4f196e3b05cd1e3ce442cf7ac07

  useEffect(() => {
    console.log("currentData", currentData);
  }, [currentData]);

  useEffect(() => {
    console.log("formOptions", formOptions);
  }, [formOptions]);

  // useEffect(() => {
  //   console.log("form", form);
  // }, [form]);

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  useEffect(() => {
    if (!formOptions.grades.length) getGrades();

    if (!formOptions.education.length) getEducation();

    if (!formOptions.countries.length) getCountries();

    // if (referral && user.email) {
    //   setData({ ...data, referral: parseInt(referral), email: user.email });
    // }
  }, []);

  useEffect(() => {
    // Just for a reset if refresh or something.
    if (typeof formOptions.regions === "string") resetRegions();
    if (currentData.country_id) getRegions(currentData.country_id);
  }, [currentData.country_id]);

  useEffect(() => {
    if (currentData.region_id) getCities(currentData.region_id);
  }, [currentData.region_id]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll<
      HTMLInputElement | HTMLSelectElement
    >("#userForm input,select, #registrationForm input,select");
    let valid = true,
      passwordValue: string;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!user.token) {
        if (field.name === "email") checkValidEmail(field as HTMLInputElement);

        if (field.name === "password") passwordValue = field.value;
        if (field.name === "password_confirmation") {
          checkMatchingPasswords(field as HTMLInputElement, passwordValue!);
        } else {
          checkValidity(field);
        }
      } else {
        checkValidity(field);
      }

      if (!field.validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      if (user.token) {
        // userProfile
      } else {
        setForm((prev) => ({ ...prev, processing: true }));
        const relevantData = {
          password_confirmation: currentData.password_confirmation,
          region_id: currentData.region_id,
          city_id: currentData.city_id,
          ...currentData,
        };

        const res = await registerPlayer(relevantData);
        if (!res.errors) {
          formRef.current!.reset();
          addNotification({
            error: false,
            content:
              "Thank you for registering! To complete the process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
            close: false,
            duration: 0,
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
    }
  };

  return (
    <>
      {!user.token && (
        <div className={s.detail} aria-label="* Means the Field is Required">
          Required: <span className={s.required}>*</span>
        </div>
      )}
      <form
        id={user.token ? "userForm" : "registrationForm"}
        onSubmit={(e) => submit(e)}
        className={s.form}
        ref={formRef}
        autoComplete="off"
        noValidate
      >
        <div role="presentation">
          <label htmlFor="name">
            Name
            <span aria-hidden="true" className={s.required}>
              *
            </span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={form.processing}
            aria-disabled={form.processing}
            {...(currentData.name && { defaultValue: currentData.name })}
            autoComplete="off"
            required
            minLength={2}
          />
        </div>

        <div role="presentation">
          <label htmlFor="email">
            Email
            <span aria-hidden="true" className={s.required}>
              *
            </span>
          </label>
          <input
            aria-describedby="formError"
            id="email"
            name="email"
            type="email"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={form.processing}
            aria-disabled={form.processing}
            {...(currentData.email && { defaultValue: currentData.email })}
            autoComplete="off"
            required
          />
          <small aria-live="assertive" id="formError" className="formError">
            Not a valid email address
          </small>
        </div>

        {/* This is for the register. */}
        {!user.token && (
          <span>
            <div role="presentation">
              <label aria-label="Password" htmlFor="password">
                Pass
                <span aria-hidden="true" className={s.required}>
                  *
                </span>
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
              <label
                aria-label="Confirm Password"
                htmlFor="password_confirmation"
              >
                Confirm Pass
                <span aria-hidden="true" className={s.required}>
                  *
                </span>
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
          </span>
        )}

        <div role="presentation">
          <label htmlFor="instagram" style={{ opacity: "0.65" }}>
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            // onChange={(e) => updateField(e)}
            // disabled={form.processing}
            // aria-disabled={form.processing}
            // // defaultValue={data.player ? data.player.instagram : ""}
            autoComplete="off"
            disabled={true}
            aria-disabled="true"
            title="Work in Progress"
            style={{ opacity: "0.65" }}
          />
        </div>

        <span>
          <div role="presentation">
            <label htmlFor="education">
              Education
              <span aria-hidden="true" className={s.required}>
                *
              </span>
            </label>
            <select
              onBlur={handleSelectBlur}
              onClick={() => handleSelectClick("education")}
              className={activeSelect === "education" ? "activeSelect" : ""}
              id="education"
              name="education_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              {...(currentData.education_id && {
                defaultValue: currentData.education_id,
              })}
              // defaultValue={data.player ? data.player.education_id : ""}
              required
            >
              <option value="">- Select -</option>
              {formOptions.education &&
                formOptions.education.map((education, index) => {
                  return (
                    <option key={index} value={education.id}>
                      {education.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div role="presentation">
            <label htmlFor="grade">
              Grade
              <span aria-hidden="true" className={s.required}>
                *
              </span>
            </label>
            <select
              onBlur={handleSelectBlur}
              onClick={() => handleSelectClick("grade")}
              className={activeSelect === "grade" ? "activeSelect" : ""}
              id="grade"
              name="grade_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              {...(currentData.grade_id && {
                defaultValue: currentData.grade_id,
              })}
              // defaultValue={data.player ? data.player.grade_id : ""}
              required
            >
              <option value="">- Select -</option>
              {formOptions.grades &&
                formOptions.grades.map((grade, index) => {
                  return (
                    <option key={index} value={grade.id}>
                      {grade.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </span>

        {/* Hidden */}
        <div
          role="presentation"
          style={{ display: currentData.education_id !== 1 ? "none" : "" }}
        >
          <label htmlFor="school">school</label>
          <input
            id="school"
            name="school"
            type="text"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={form.processing}
            aria-disabled={form.processing}
            {...(currentData.school && { defaultValue: currentData.school })}
            // defaultValue={data.name ? data.name : ""}
            autoComplete="off"
          />
        </div>

        <span>
          <div role="presentation">
            <label htmlFor="country">
              Country
              <span aria-hidden="true" className={s.required}>
                *
              </span>
            </label>
            <select
              onBlur={handleSelectBlur}
              onClick={() => handleSelectClick("country")}
              className={activeSelect === "country" ? "activeSelect" : ""}
              id="country"
              name="country_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              // value={data.player ? data.player.country_iso : ""}
              {...(currentData.country_id && { value: currentData.country_id })}
              required
            >
              <option value="">- Select -</option>
              {formOptions.countries &&
                formOptions.countries.map((country, index) => {
                  return (
                    <option key={index} value={country.id}>
                      {country.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div role="presentation">
            <label htmlFor="region">Region</label>
            <select
              onBlur={handleSelectBlur}
              onClick={() => handleSelectClick("region")}
              className={activeSelect === "region" ? "activeSelect" : ""}
              aria-live="polite"
              aria-busy={formOptions.regions.length === 0}
              id="region"
              name="region_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={
                !currentData.country_id ||
                formOptions.regions.length === 0 ||
                typeof formOptions.regions === "string" ||
                form.processing
              }
              aria-disabled={
                !currentData.country_id ||
                formOptions.regions.length === 0 ||
                typeof formOptions.regions === "string" ||
                form.processing
              }
              {...(currentData.region_id && { value: currentData.region_id })}
              // value={data.player ? data.player.state_iso : ""}
            >
              <option value="">- Select -</option>
              {formOptions.regions &&
                typeof formOptions.regions !== "string" &&
                formOptions.regions.map((state, index) => {
                  return (
                    <option key={index} value={state.id}>
                      {state.name}
                    </option>
                  );
                })}
            </select>
            {formOptions.regions.length === 0 && currentData.country_id && (
              <Spinner />
            )}
            {typeof formOptions.regions === "string" && (
              <small className={s.notFoundMsg}>
                No regions were found for the given country
              </small>
            )}
          </div>
        </span>

        <div role="presentation">
          <label htmlFor="city">City</label>
          <select
            onBlur={handleSelectBlur}
            onClick={() => handleSelectClick("city")}
            className={activeSelect === "city" ? "activeSelect" : ""}
            aria-live="polite"
            aria-busy={formOptions.cities.length === 0}
            id="city"
            name="city_id"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              typeof formOptions.cities === "string" ||
              form.processing
            }
            aria-disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              typeof formOptions.cities === "string" ||
              form.processing
            }
            // value={data.player ? data.player.city_id : ""}
            {...(currentData.city_id && { value: currentData.city_id })}
          >
            <option value="">- Select -</option>
            {formOptions.cities &&
              formOptions.cities.map((city, index) => {
                return (
                  <option key={index} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
          </select>
          {formOptions.cities.length === 0 && currentData.region_id && (
            <Spinner />
          )}
          {typeof formOptions.regions === "string" && (
            <small className={s.notFoundMsg}>
              No cities were found for the given region
            </small>
          )}
        </div>

        <div>
          {user.token ? (
            <button
              type="submit"
              className={s.updateBtn}
              disabled={form.processing}
            >
              Update
            </button>
          ) : (
            <>
              <Link to="/login" className="fade move">
                Already have a account?
              </Link>
              <button
                type="submit"
                className="okBtn flip"
                disabled={form.processing}
              />
            </>
          )}
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({
  user,
  formOptions,
}: {
  user: { credentials?: UserCredentials; token?: string };
  formOptions: FormOptionsState;
}) => ({
  user,
  formOptions,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getEducation: () => dispatch(getEducation()),
  getGrades: () => dispatch(getGrades()),
  getCountries: () => dispatch(getCountries()),
  getRegions: (regionId: number) => dispatch(getRegions(regionId)),
  getCities: (regionId: number) => dispatch(getCities(regionId)),
  registerPlayer: (userData: FormData) =>
    dispatch(registerPlayer(userData) as unknown) as Promise<any>,
  userProfile: (data: any, callback: () => void) =>
    dispatch(userProfile(data, callback)),
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),

  resetRegions: () => dispatch({ type: SET_REGIONS, payload: [] }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
