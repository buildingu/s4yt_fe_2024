import {
  GET_GRADES_SUCCESS,
  GET_EDUCATION_SUCCESS,
  SET_COUNTRIES,
  SET_REGIONS,
  SET_CITIES,
  // GET_COIN_TYPES_SUCCESS,
} from "@actions/index";

const initialState = {
  grades: [],
  education: [],
  countries: [],
  regions: [],
  cities: [],
  coinTypes: [],
};

const formOptions = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES_SUCCESS:
      return { ...state, grades: action.payload };
    case GET_EDUCATION_SUCCESS:
      return { ...state, education: action.payload };
    case SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case SET_CITIES:
      return { ...state, cities: action.payload };

    // case GET_COIN_TYPES_SUCCESS:
    //   return { ...state, coinTypes: action.payload };
    default:
      return state;
  }
};

export default formOptions;
