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
  return Api.get("/educations").then((response) => {
    dispatch({ type: GET_EDUCATION_SUCCESS, payload: response.data.educations });
  });
};

export const getCountries = () => (dispatch, getState) => {
  return Api.get("/location/countries").then((response) => {
    dispatch({ type: SET_COUNTRIES, payload: response.data.countries });
  });
};

export const getRegions = (countryId) => (dispatch, getState) => {
  // This is here for loading the field in the form.
  dispatch({ type: SET_REGIONS, payload: [] });

  return Api.post("/location/regions", { country_id: countryId }).then((response) => {
    dispatch({ type: SET_REGIONS, payload: response.data.regions });
  });
};

export const getCities = (regionId) => (dispatch, getState) => {
  dispatch({ type: SET_CITIES, payload: [] });

  return Api.post("/location/cities", { region_id: regionId }).then((response) => {
    dispatch({ type: SET_CITIES, payload: response.data.cities });
  });
};

// export const getCoinTypes = () => (dispatch, getState) => {
//   return Api.get("/cointype").then((response) => {
//     dispatch({ type: GET_COIN_TYPES_SUCCESS, payload: response.data });
//   });
// };
