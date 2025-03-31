import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import { SET_COUNTRIES, SET_REGIONS } from "@actions/index";

export const getCountries = () => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.get("/location/countries");

    if (meta?.ok) {
      dispatch({ type: SET_COUNTRIES, payload: data.countries });
    } else {
      showError(data, meta.status, dispatch);
    }
  } catch (error) {
    errorHandler("getCountries", error);
  }
};

export const getRegions = (countryName) => async (dispatch, _) => {
  try {
    dispatch({ type: SET_REGIONS, payload: [] }); // This is here for loading the field in the form.
    const { data, meta } = await Api.post("/location/regions", { name: countryName });

    if (meta?.ok) {
      dispatch({ type: SET_REGIONS, payload: data.regions });
    } else {
      showError(data, meta.status, dispatch);
    }
  } catch (error) {
    errorHandler("getRegions", error);
  }
};
