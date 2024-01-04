import { SET_COUNTRIES, SET_REGIONS, SET_CITIES } from "@selectors";
import { setNotification } from "@actions/notifications";
import { Api } from "@services";

export const getCountries = () => (dispatch, getState) => {
  return Api.get("/countries").then((response) => {
    dispatch({ type: SET_COUNTRIES, data: response.data.countries });
  });
};

// FIXME: Will become /regions
export const getRegions = (countryId) => (dispatch, getState) => {
  // return Api.get("/location/states?ciso=" + ciso).then((response) => {
  //   callback(response.data.states);
  // });
  return Api.post("/states", { country_id: countryId }).then((response) => {
    dispatch({ type: SET_REGIONS, data: response.data.states });
  });
};

export const getCities = (regionId) => (dispatch, getState) => {
  // return Api.get("/location/cities?ciso=" + ciso + "&siso=" + siso).then(
  //   (response) => {
  //     callback(response.data.cities);
  //   }
  // );
  return Api.post("/cities", { state_id: regionId }).then((response) => {
    dispatch({ type: SET_CITIES, data: response.data.cities });
  });
};
