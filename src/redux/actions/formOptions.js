import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import {
  SET_GRADES,
  SET_EDUCATIONS,
  SET_COUNTRIES,
  SET_REGIONS,
  SET_CITIES,
} from "@actions/index";

export const getEducation = () => async (dispatch, getState) => {
  try {
    const res = await Api.get("/education");

    if (res.success) {
      dispatch({
        type: SET_EDUCATIONS,
        payload: res.data.education,
      });
    } else {
      showError(res, dispatch);
    }

    return res;
  } catch (error) {
    errorHandler("getEducation", error);
  }
};

export const getGrades = () => async (dispatch, getState) => {
  try {
    const res = await Api.get("/grades");

    if (res.success) {
      dispatch({
        type: SET_GRADES,
        payload: res.data.grades,
      });
    } else {
      showError(res, dispatch);
    }

    return res;
  } catch (error) {
    errorHandler("getGrades", error);
  }
};

export const getCountries = () => async (dispatch, getState) => {
  try {
    const res = await Api.get("/countries");

    if (res.success) {
      dispatch({
        type: SET_COUNTRIES,
        payload: res.data.countries,
      });
    } else {
      showError(res, dispatch);
    }

    return res;
  } catch (error) {
    errorHandler("getCountries", error);
  }
};

export const getRegions = (countryId) => async (dispatch, getState) => {
  try {
    // This is here for loading the field in the form.
    dispatch({ type: SET_REGIONS, payload: [] });
    const res = await Api.post("/regions", { country_id: countryId });

    if (res.success) {
      dispatch({ type: SET_REGIONS, payload: res.data.regions });
    } else {
      res.message && res.message === "No regions found"
        ? dispatch({ type: SET_REGIONS, payload: "Not Found" }) // 404 message.
        : showError(res, dispatch);
    }

    return res;
  } catch (error) {
    errorHandler("getRegions", error);
  }
};

export const getCities = (regionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_CITIES, payload: [] });
    const res = await Api.post("/cities", { region_id: regionId });

    if (res.success) {
      dispatch({
        type: SET_CITIES,
        payload: res.data.cities,
      });
    } else {
      showError(res, dispatch);
    }

    return res;
  } catch (error) {
    errorHandler("getCities", error);
  }
};
