import UserCredentials from "@typings/UserCredentials";
import FormOptionsState from "@typings/redux/FormOptionsState";
import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { registerPlayer, updateProfile } from "@actions/user";
import {
  getGrades,
  getEducation,
  getCountries,
  getRegions,
  getCities,
} from "@actions/formOptions";
import { addNotification } from "@actions/notifications";
import { SET_REGIONS, SET_CITIES } from "@actions/index";

import updateField from "@utils/forms/updateField";
import checkValidity from "@utils/forms/checkValidity";
import checkValidEmail from "@utils/forms/checkValidEmail";
import checkMatchingPasswords from "@utils/forms/checkMatchingPasswords";

import Spinner from "@components/loaders/spinner/Spinner";

import s from "./styles.module.css";

interface Props {
  formOptions: FormOptionsState;
  getEducation: () => Promise<void>;
  getGrades: () => Promise<void>;
  getCountries: () => Promise<void>;
  getRegions: (countryId: number) => Promise<void>;
  resetRegions: () => void;
  getCities: (regionId: number) => Promise<void>;
  resetCities: () => void;
  user: { credentials?: UserCredentials; token?: string };
  registerPlayer: (
    userData: any,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) => Promise<any>;
  updateProfile: (
    userData: any,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) => Promise<any>;
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
  school: string;
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
  resetCities,
  // This will not be passed in at profile anymore, it will be in the redux.
  user,
  registerPlayer,
  updateProfile,
  addNotification,
  referral,
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<FromData>({
      name: user.credentials?.name ?? "",
      email: user.credentials?.email ?? "",
      password: "",
      password_confirmation: "",
      education_id: user.credentials?.education_id ?? null,
      school: user.credentials?.school ?? "",
      grade_id: user.credentials?.grade_id ?? null,
      country_id: user.credentials?.country_id ?? null,
      region_id: user.credentials?.region_id ?? null,
      city_id: user.credentials?.city_id ?? null,
    });

  // useEffect(() => {
  //   console.log("currentData", currentData);
  // }, [currentData]);

  // useEffect(() => {
  //   console.log("formOptions", formOptions);
  // }, [formOptions]);

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
    if (currentData.country_id) {
      getRegions(currentData.country_id);
      // Reset too because of change of if country changes.
      if (currentData.city_id) resetCities();
    }
  }, [currentData.country_id]);

  useEffect(() => {
    if (currentData.region_id) getCities(currentData.region_id);
  }, [currentData.region_id]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll<
      HTMLInputElement | HTMLSelectElement
    >(
      "#userForm input,#userForm select, #registerForm input,#registerForm select"
    );
    let valid = true,
      passwordValue: string;

    let relevantData: any = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.name === "email" && field.value)
        checkValidEmail(field as HTMLInputElement);

      if (!user.token && field.name === "password") passwordValue = field.value;
      if (!user.token && field.name === "password_confirmation") {
        checkMatchingPasswords(field as HTMLInputElement, passwordValue!);
      } else {
        checkValidity(field);
      }

      if (!field.validity.valid && valid) valid = false;

      if (valid) {
        if (user.token) {
          const userCredentialsValue =
              user.credentials && (user.credentials as any)[field.name],
            fieldValue = parseInt(field.value)
              ? parseInt(field.value)
              : field.value;

          if (fieldValue && fieldValue !== userCredentialsValue)
            relevantData[field.name] = field.value;
        } else {
          if (field.value) relevantData[field.name] = field.value;
        }
      }
    }

    if (user.token && !Object.keys(relevantData).length) {
      addNotification({
        error: true,
        content: "Nothing to update",
        close: false,
        duration: 0,
      });
    } else if (valid) {
      if (user.token) {
        setForm((prev) => ({ ...prev, processing: true }));
        await updateProfile(relevantData, formRef, setForm);
      } else {
        setForm((prev) => ({ ...prev, processing: true }));
        await registerPlayer(relevantData, formRef, setForm);
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
        id={user.token ? "userForm" : "registerForm"}
        onSubmit={(e) => submit(e)}
        className={s.form}
        ref={formRef}
        autoComplete="off"
        noValidate
      >
        <div role="presentation">
          <label htmlFor="name">
            Name
            {!user.token && (
              <span aria-hidden="true" className={s.required}>
                *
              </span>
            )}
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
            {...(!user.token && { required: true })}
            minLength={2}
          />
        </div>

        <div role="presentation">
          <label htmlFor="email">
            Email
            {!user.token && (
              <span aria-hidden="true" className={s.required}>
                *
              </span>
            )}
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
            {...(!user.token && { required: true })}
          />
          <small aria-live="assertive" id="formError" className="formError">
            Not a valid email address
          </small>
        </div>

        {/* This is for the register only. */}
        <span
          style={{
            display: user.token ? "none" : "",
          }}
        >
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

        <div
          role="presentation"
          style={{
            display: user.token ? "none" : "",
          }}
        >
          <label htmlFor="instagram" style={{ opacity: "0.65" }}>
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            // onChange={(e) => updateField(e)}
            // disabled={form.processing}
            // aria-disabled={form.processing}
            // {...(currentData.instagram && {
            //   defaultValue: currentData.instagram,
            // })}
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
              {!user.token && (
                <span aria-hidden="true" className={s.required}>
                  *
                </span>
              )}
            </label>
            <select
              id="education"
              name="education_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              {...(currentData.education_id && {
                defaultValue: currentData.education_id,
              })}
              {...(!user.token && { required: true })}
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
              {!user.token && (
                <span aria-hidden="true" className={s.required}>
                  *
                </span>
              )}
            </label>
            <select
              id="grade"
              name="grade_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              {...(currentData.grade_id && {
                defaultValue: currentData.grade_id,
              })}
              {...(!user.token && { required: true })}
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
            autoComplete="off"
          />
        </div>

        <span>
          <div role="presentation">
            <label htmlFor="country">
              Country
              {!user.token && (
                <span aria-hidden="true" className={s.required}>
                  *
                </span>
              )}
            </label>
            <select
              id="country"
              name="country_id"
              onChange={(e) => updateField<FromData>(e, setCurrentData)}
              disabled={form.processing}
              aria-disabled={form.processing}
              {...(currentData.country_id && { value: currentData.country_id })}
              {...(!user.token && { required: true })}
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

        <div
          role="presentation"
          {...(user.token &&
            typeof formOptions.regions === "string" && {
              className: s.notFoundMsg,
            })}
        >
          <label htmlFor="city">City</label>
          <select
            aria-live="polite"
            aria-busy={formOptions.cities.length === 0}
            id="city"
            name="city_id"
            onChange={(e) => updateField<FromData>(e, setCurrentData)}
            disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              typeof formOptions.regions === "string" ||
              form.processing
            }
            aria-disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              typeof formOptions.regions === "string" ||
              form.processing
            }
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
          {formOptions.cities.length === 0 &&
            currentData.region_id &&
            currentData.region_id !== user.credentials?.region_id && (
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
              className="updateBtn"
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
  getEducation: () => dispatch(getEducation() as unknown) as Promise<void>,
  getGrades: () => dispatch(getGrades() as unknown) as Promise<void>,
  getCountries: () => dispatch(getCountries() as unknown) as Promise<void>,
  getRegions: (regionId: number) =>
    dispatch(getRegions(regionId) as unknown) as Promise<void>,
  getCities: (regionId: number) =>
    dispatch(getCities(regionId) as unknown) as Promise<void>,
  registerPlayer: (
    userData: FormData,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) =>
    dispatch(
      registerPlayer(userData, formRef, setForm) as unknown
    ) as Promise<any>,
  updateProfile: (
    userData: FormData,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<
      React.SetStateAction<{
        processing: boolean;
      }>
    >
  ) =>
    dispatch(
      updateProfile(userData, formRef, setForm) as unknown
    ) as Promise<any>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),

  resetRegions: () => dispatch({ type: SET_REGIONS, payload: [] }),
  resetCities: () => dispatch({ type: SET_CITIES, payload: [] }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
