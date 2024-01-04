import {
  GET_GRADES_SUCCESS,
  GET_EDUCATION_SUCCESS,
  SET_COUNTRIES,
  SET_REGIONS,
  SET_CITIES,
  GET_COIN_TYPES_SUCCESS,
} from "@selectors";

/*

	Initial Local state

*/
const initialState = {
  grades: [],
  education: [],
  countries: [],
  regions: [],
  cities: [],
  coinTypes: [],
};

const Options = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES_SUCCESS:
      return { ...state, grades: action.data };
    case GET_EDUCATION_SUCCESS:
      return { ...state, education: action.data };
    case SET_COUNTRIES:
      return { ...state, countries: action.data };
    case SET_REGIONS:
      return { ...state, regions: action.data };
    case SET_CITIES:
      return { ...state, cities: action.data };

    case GET_COIN_TYPES_SUCCESS:
      return { ...state, coinTypes: action.data };
    default:
      return state;
  }
};

export default Options;
