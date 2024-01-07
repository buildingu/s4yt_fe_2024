import {
  GET_GRADES_SUCCESS,
  GET_EDUCATION_SUCCESS,
  SET_COUNTRIES,
  SET_REGIONS,
  SET_CITIES,
  // GET_COIN_TYPES_SUCCESS
} from "@actions";
import { Api } from "@services";

export const getGrades = () => (dispatch, getState) => {
  return Api.get("/grades").then((response) => {
    dispatch({ type: GET_GRADES_SUCCESS, payload: response.data.grades });
  });
};

export const getEducation = () => (dispatch, getState) => {
  return Api.get("/education").then((response) => {
    dispatch({ type: GET_EDUCATION_SUCCESS, payload: response.data.education });
  });
};

export const getCountries = () => (dispatch, getState) => {
  return Api.get("/countries").then((response) => {
    dispatch({ type: SET_COUNTRIES, payload: response.data.countries });
  });
};

export const getRegions = (countryId) => (dispatch, getState) => {
  // This is here for loading the field in the form.
  dispatch({ type: SET_REGIONS, payload: [] });

  return Api.post("/regions", { country_id: countryId }).then((response) => {
    // 404 message.
    response.message && response.message === "No regions found"
      ? dispatch({ type: SET_REGIONS, payload: "Not Found" })
      : dispatch({ type: SET_REGIONS, payload: response.data.regions });
  });
};

export const getCities = (regionId) => (dispatch, getState) => {
  dispatch({ type: SET_CITIES, payload: [] });

  return Api.post("/cities", { region_id: regionId }).then((response) => {
    dispatch({ type: SET_CITIES, payload: response.data.cities });
  });
};

// export const getCoinTypes = () => (dispatch, getState) => {
//   return Api.get("/cointype").then((response) => {
//     dispatch({ type: GET_COIN_TYPES_SUCCESS, payload: response.data });
//   });
// };
