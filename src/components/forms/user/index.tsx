import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { registerPlayer, userProfile } from "@actions/user";
import {
  getGrades,
  getEducation,
  getCountries,
  getRegions,
  getCities,
} from "@actions/formOptions";
import { setNotification } from "@actions/notification";

import Spinner from "@components/loaders/spinner/Spinner";

import s from "./styles.module.css";

interface Props {
  //   options: Array<String>;
  formOptions: {
    education: Array<{ id: number; name: string }>;
    grades: Array<{ id: number; name: string }>;
    countries: Array<{ id: number; name: string }>;
    regions: Array<{ id: number; name: string }>;
    cities: Array<{ id: number; name: string }>;
  };
  getEducation: () => void;
  getGrades: () => void;
  getCountries: () => void;
  getRegions: (countryId: number) => void;
  getCities: (regionId: number) => void;
  // TODO: Find what the actual user object is.
  user: any;
  registerPlayer: (userData: any, callback: (res: any) => void) => void;
  userProfile: (data: any, callback: () => void) => void;
  setNotification: (data: NotificationValues) => void;
  referral: number;
  // TODO:
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
}

interface FromData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  // instagram: string;
  education_id: null | number;
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
  getCities,
  setNotification,
  // This will not be passed in at profile anymore, it will be in the redux.
  user,
  registerPlayer,
  userProfile,
  referral,
  setProfileData,
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState<{
      processing: boolean;
      // valid: boolean;
      // submitted: boolean;
      // error: any;
    }>({
      processing: false,
      // valid: false,
      // submitted: false,
      // ???
      // error: null,
    }),
    // const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [data, setData] = useState(
    //   user.id
    //     ? {
    //         ...user,
    //         player: user.player
    //           ? {
    //               grade_id: user.player.grade_id,
    //               education_id: user.player.education_id,
    //               instagram: user.player.instagram,
    //               country_iso: user.player.country_iso,
    //               state_iso: user.player.state_iso,
    //               city_id: user.player.city_id,
    //             }
    //           : {},
    //       }
    //     : { player: { country_id: "", state_id: "" } }
    // );
    [currentData, setCurrentData] = useState<FromData>({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      // instagram: "",
      education_id: null,
      grade_id: null,
      country_id: null,
      region_id: null,
      city_id: null,
      // TODO:
      //  ...(user.id && { ...user }),
    });

  // useEffect(() => {
  //   console.log("currentData", currentData);
  // }, [currentData]);

  // useEffect(() => {
  //   console.log("formOptions", formOptions);
  // }, [formOptions]);

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  useEffect(() => {
    if (!formOptions.grades.length) {
      getGrades();
    }

    if (!formOptions.education) {
      console.log("NMACHUCA", formOptions)
      getEducation();
    }

    if (!formOptions.countries.length) {
      getCountries();
    }

    // if (referral && user.email) {
    //   setData({ ...data, referral: parseInt(referral), email: user.email });
    // }
  }, []);

  useEffect(() => {
    // if (data.player && data.player.country_iso) {
    //   getRegions(data.player.country_iso, (data) => {
    //     setStates(data);
    //     setCities([]);
    //   });
    // } else {
    //   setStates([]);
    //   setCities([]);
    // }
    if (currentData.country_id) getRegions(currentData.country_id);
  }, [currentData.country_id]);

  useEffect(() => {
    // if (data.player && data.player.state_iso) {
    //   getCities(data.player.country_iso, data.player.state_iso, (data) => {
    //     setCities(data);
    //   });
    // } else {
    //   setStates([]);
    //   setCities([]);
    // }
    if (currentData.region_id) getCities(currentData.region_id);
  }, [currentData.region_id]);

  const checkValidity = (field: HTMLInputElement | HTMLSelectElement) => {
    field.setAttribute("data-valid", field.validity.valid ? "true" : "false");
    field.setAttribute("aria-invalid", field.validity.valid ? "true" : "false");
  };
  const checkMatchingPasswords = (
    conPassField: HTMLInputElement,
    passwordValue: string
  ) => {
    if (conPassField.value && passwordValue! !== conPassField.value) {
      conPassField.setAttribute("matching-passwords", "false");
      conPassField.setAttribute("aria-invalid", "false");
    } else {
      checkValidity(conPassField);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll(
      "#userForm input,select, #registrationForm input,select"
    );
    let valid = true,
      passwordValue: string;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as HTMLInputElement | HTMLSelectElement;
      if (!user.id) {
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
      // userProfile(
      //   currentData.id
      //     ? { ...currentData, _method: "PUT" }
      //     : { ...currentData },
      //   (res: any) => {
      //     if (!res.errors) {
      //       setNotification({
      //         display: true,
      //         error: false,
      //         content: currentData.id
      //           ? "Updated!"
      //           : "Thank you for registering! To complete the process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
      //         timed: currentData.id ? true : false,
      //       });

      //       if (currentData.id) {
      //         if (setProfileData) {
      //           setProfileData(res.data);
      //         }

      //         // setForm({ data: { ...res.data }, ...form, processing: false });
      //         setForm({...form, processing: false });
      //         // ??
      //         setCurrentData({...currentData, ...res.data})
      //       }
      //     } else {
      //       const key = Object.keys(res.errors)[0];

      //       setNotification({
      //         display: true,
      //         error: true,
      //         content: res.errors[key],
      //         timed: true,
      //       });
      //       setForm({ ...form, processing: false });
      //     }
      //   }
      // );
      if (user.id) {
        // userProfile
      } else {
        const relevantData = {
          password_confirmation: currentData.password_confirmation,
          country_id: currentData.country_id,
          // region_id: currentData.region_id,
          // city_id: currentData.city_id,
          ...currentData,
        };
        registerPlayer(relevantData, (res) => {
          setForm({ ...form, processing: true });

          if (!res.errors) {
            formRef.current!.reset();
            setNotification({
              display: true,
              error: false,
              content:
                "Thank you for registering! To complete the process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
              close: false,
              duration: 0,
            });
          } else {
            const key = Object.keys(res.errors)[0];

            setNotification({
              display: true,
              error: true,
              content: res.errors[key],
              close: false,
              duration: 0,
            });
          }

          setForm({ ...form, processing: false });
        });
      }
    }

    // setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.getAttribute("name");
    // const isPlayerData =
    //   [
    //     "education_id",
    //     "grade_id",
    //     "country_iso",
    //     "state_iso",
    //     "city_id",
    //     "instagram",
    //   ].indexOf(key) === -1
    //     ? false
    //     : true;

    target.removeAttribute("data-valid");
    target.removeAttribute("matching-passwords");

    setCurrentData((prev) => ({
      ...prev,
      [name!]:
        name!.split("_")[1] === "id" ? parseInt(target.value) : target.value,
    }));

    // setData(
    //   isPlayerData
    //     ? {
    //         ...data,
    //         player: {
    //           ...data.player,
    //           [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
    //         },
    //       }
    //     : {
    //         ...data,
    //         [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
    //       }
    // );
  };

  return (
    <>
      {!user.id && (
        <div className={s.detail}>
          Required: <span className={s.required}>*</span>
        </div>
      )}
      <form
        id={user.id ? "userForm" : "registrationForm"}
        onSubmit={(e) => submit(e)}
        className={s.form}
        ref={formRef}
        autoComplete="off"
        noValidate
      >
        <div role="presentation">
          <label htmlFor="name">
            Name<span className={s.required}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => updateField(e)}
            disabled={form.processing}
            aria-disabled={form.processing}
            // defaultValue={data.name ? data.name : ""}
            autoComplete="off"
            required
          />
        </div>

        <div role="presentation">
          <label htmlFor="email">
            Email<span className={s.required}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => updateField(e)}
            disabled={form.processing}
            aria-disabled={form.processing}
            // defaultValue={data.email ? data.email : ""}
            autoComplete="off"
            required
          />
          <small>Not a valid email address</small>
        </div>

        {/* This is for the register. */}
        {!user.id && (
          <span>
            <div role="presentation">
              <label htmlFor="password">
                Pass<span className={s.required}>*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => updateField(e)}
                disabled={form.processing}
                aria-disabled={form.processing}
                autoComplete="off"
                minLength={8}
                maxLength={24}
                required
              />
              <small>Must be between 8 and 24 characters</small>
            </div>
            <div role="presentation">
              <label htmlFor="password_confirmation">
                Confirm Pass<span className={s.required}>*</span>
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                onChange={(e) => updateField(e)}
                disabled={form.processing}
                aria-disabled={form.processing}
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
          <label htmlFor="instagram" style={{ opacity: "0.65" }}>
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            // ???
            // type="ext"
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
              Education<span className={s.required}>*</span>
            </label>
            <select
              id="education"
              name="education_id"
              onChange={(e) => updateField(e)}
              disabled={form.processing}
              aria-disabled={form.processing}
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
              Grade<span className={s.required}>*</span>
            </label>
            <select
              id="grade"
              name="grade_id"
              onChange={(e) => updateField(e)}
              disabled={form.processing}
              aria-disabled={form.processing}
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

        <span>
          <div role="presentation">
            <label htmlFor="country">
              Country<span className={s.required}>*</span>
            </label>
            <select
              id="country"
              name="country_id"
              onChange={(e) => updateField(e)}
              disabled={form.processing}
              aria-disabled={form.processing}
              // value={data.player ? data.player.country_iso : ""}
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
          {/* TODO: Waiting for the message in the response for countries with no region/cities. */}
          <div role="presentation">
            <label htmlFor="region">Region</label>
            <select
              aria-live="polite"
              aria-busy={formOptions.regions.length === 0}
              id="region"
              name="region_id"
              onChange={(e) => updateField(e)}
              // disabled={
              //   !data.player ||
              //   !data.player.country_iso ||
              //   data.player.country_iso === "" ||
              //   states.length === 0 ||
              //   form.processing
              // }
              disabled={
                !currentData.country_id ||
                formOptions.regions.length === 0 ||
                form.processing
              }
              aria-disabled={
                !currentData.country_id ||
                formOptions.regions.length === 0 ||
                form.processing
              }
              // value={data.player ? data.player.state_iso : ""}
            >
              <option value="">- Select -</option>
              {formOptions.regions &&
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
          </div>
        </span>

        <div role="presentation">
          <label htmlFor="city">City</label>
          <select
            aria-live="polite"
            aria-busy={formOptions.cities.length === 0}
            id="city"
            name="city_id"
            onChange={(e) => updateField(e)}
            // disabled={
            //   !(
            //     data.player &&
            //     data.player.country_iso &&
            //     data.player.state_iso
            //   ) || form.processing
            // }
            disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              form.processing
            }
            aria-disabled={
              !currentData.region_id ||
              formOptions.cities.length === 0 ||
              form.processing
            }
            // value={data.player ? data.player.city_id : ""}
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
        </div>

        <div>
          <Link to="/login" className="fade move">
            Already have a account?
          </Link>
          <button disabled={form.processing} />
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({ formOptions }: Props) => ({ formOptions });
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getEducation: () => dispatch(getEducation()),
  getGrades: () => dispatch(getGrades()),
  getCountries: () => dispatch(getCountries()),
  getRegions: (regionId: number) => dispatch(getRegions(regionId)),
  getCities: (regionId: number) => dispatch(getCities(regionId)),
  registerPlayer: (userData: any, callback: (res: any) => void) =>
    dispatch(registerPlayer(userData, callback)),
  userProfile: (data: any, callback: () => void) =>
    dispatch(userProfile(data, callback)),
  setNotification: (data: NotificationValues) =>
    dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
