import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { registerPlayer, userProfile } from "@actions/user";
import { getCountries, getRegions, getCities } from "@actions/locations";
import { getGrades, getEducation } from "@actions/options";
import { setNotification } from "@actions/notifications";

import s from "./styles.module.css";

// TODO: Look at my old types for this.
interface Props {
  //   options: Array<String>;
  options: {
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
  setNotification: (data: any) => void;
  referral: number;
  // Fix all anys.
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
}

/* 
First you will call GET /countries. The response will be an array of objects like 
[...,{id:23, name:Chile}, ..]. You will populate the country selector. 
Then you will call GET/country/{id}/regions. he response will be an array of 
objects like [...,{id:23, name:"Metropolitan region"}, ..]. Then you will 
call GET /region/{id}/cities and the response will be an array of cities object 
in the same format and I will need just the city_id for the register. 
This sound good to you? maybe the URI will be more clear....
*/

const UserForm: React.FC<Props> = ({
  options,
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
  const [form, setForm] = useState<{
    processing: boolean;
    valid: boolean;
    submitted: boolean;
    error: any;
  }>({
    processing: false,
    valid: false,
    submitted: false,
    // ???
    error: null,
  });
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
  const [currentData, setCurrentData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    instagram: "",
    education_id: -1,
    grade_id: -1,
    country_id: -1,
    region_id: -1,
    city_id: -1,
    // TODO:
    //  ...(user.id && { ...user }),
  });

  // useEffect(() => {
  //   console.log("currentData", currentData);
  // }, [currentData]);

  // useEffect(() => {
  //   console.log("options", options);
  // }, [options]);

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  useEffect(() => {
    if (!options.grades.length) {
      // getGrades();
    }

    if (!options.education.length) {
      // getEducation();
    }

    if (!options.countries.length) {
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
    if (currentData.country_id && !options.regions.length) {
      getRegions(currentData.country_id);
    }
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
    if (currentData.region_id && !options.cities.length) {
      getCities(currentData.region_id);
    }
  }, [currentData.region_id]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll(
      "#userForm input,select, #registrationForm input,select"
    );

    let valid = true;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as HTMLInputElement | HTMLSelectElement;
      field.setAttribute("data-valid", field.validity.valid ? "1" : "0");

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
        // currentData.instagram ???
        const relevantData = {
          password_confirmation: currentData.password_confirmation,
          country_id: currentData.country_id,
          region_id: currentData.region_id,
          ...currentData,
        };
        registerPlayer(relevantData, (res) => {
          if (!res.errors) {
            setNotification({
              display: true,
              error: false,
              content:
                "Thank you for registering! To complete the process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
              timed: false,
            });
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
    }

    setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (
    e: // | React.KeyboardEvent<HTMLInputElement>
    React.ChangeEvent<HTMLSelectElement>
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

    if (form.submitted) {
      target.setAttribute("data-valid", target.validity.valid ? "1" : "0");
    }

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
    <form
      id={user.id ? "userForm" : "registrationForm"}
      onSubmit={(e) => submit(e)}
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
          // onKeyUp={(e) => updateField(e)}
          readOnly={form.processing}
          // defaultValue={data.name ? data.name : ""}
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
          // onKeyUp={(e) => updateField(e)}
          readOnly={form.processing}
          // defaultValue={data.email ? data.email : ""}
          autoComplete="off"
          required
        />
        <small>Not a valid email address</small>
      </div>

      {/* This id is for register. */}
      {!user.id && (
        <span>
          <div role="presentation">
            <label htmlFor="password">Pass</label>
            <input
              id="password"
              name="password"
              type="password"
              // onKeyUp={(e) => updateField(e)}
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
              // onKeyUp={(e) => updateField(e)}
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
          // ???
          type="ext"
          // onKeyUp={(e) => updateField(e)}
          readOnly={form.processing}
          // defaultValue={data.player ? data.player.instagram : ""}
          autoComplete="off"
        />
      </div>

      <span>
        <div role="presentation">
          <label htmlFor="education">Education</label>
          <select
            id="education"
            name="education_id"
            // onChange={(e) => updateField(e)}
            disabled={form.processing}
            // defaultValue={data.player ? data.player.education_id : ""}
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
            // onChange={(e) => updateField(e)}
            disabled={form.processing}
            // defaultValue={data.player ? data.player.grade_id : ""}
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
            name="country_id"
            onChange={(e) => {
              // setCurrentData((prev) => ({
              //   ...prev,
              //   country_id: e.target.value,
              // }));
              updateField(e);
            }}
            disabled={form.processing}
            // value={data.player ? data.player.country_iso : ""}
            required
          >
            <option value="">- Select -</option>
            {options.countries &&
              options.countries.map((country, index) => {
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
            id="region"
            name="region_id"
            onChange={(e) => updateField(e)}
            required
            // disabled={
            //   !data.player ||
            //   !data.player.country_iso ||
            //   data.player.country_iso === "" ||
            //   states.length === 0 ||
            //   form.processing
            // }
            disabled={!currentData.country_id || form.processing}
            // value={data.player ? data.player.state_iso : ""}
          >
            <option value="">- Select -</option>
            {options.regions &&
              options.regions.map((state, index) => {
                return (
                  <option key={index} value={state.id}>
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
          onChange={(e) => updateField(e)}
          required
          // disabled={
          //   !(
          //     data.player &&
          //     data.player.country_iso &&
          //     data.player.state_iso
          //   ) || form.processing
          // }
          disabled={!currentData.region_id || form.processing}
          // value={data.player ? data.player.city_id : ""}
        >
          <option value="">- Select -</option>
          {options.cities &&
            options.cities.map((city, index) => {
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
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getEducation: () => dispatch(getEducation()),
  getGrades: () => dispatch(getGrades()),
  getCountries: () => dispatch(getCountries()),
  getRegions: (regionId: number) => dispatch(getRegions(regionId)),
  getCities: (regionId: number) => dispatch(getCities(regionId)),
  registerPlayer: (userData: any, callback: () => void) =>
    dispatch(registerPlayer(userData, callback)),
  userProfile: (data: any, callback: () => void) =>
    dispatch(userProfile(data, callback)),
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
