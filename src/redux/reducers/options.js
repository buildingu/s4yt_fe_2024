import {
  GET_COUNTRIES_SUCCESS,
  GET_GRADES_SUCCESS,
  GET_EDUCATION_SUCCESS,
  GET_COIN_TYPES_SUCCESS,
} from "@selectors";

/*

	Initial Local state

*/
const initialState = {
  countries: [],
  grades: [],
  education: [],
  coinTypes: [],
};

const Options = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return { ...state, countries: action.data };
    case GET_GRADES_SUCCESS:
      return { ...state, grades: action.data };
    case GET_EDUCATION_SUCCESS:
      return { ...state, education: action.data };
    case GET_COIN_TYPES_SUCCESS:
      return { ...state, coinTypes: action.data };
    default:
      return state;
  }
};

export default Options;
