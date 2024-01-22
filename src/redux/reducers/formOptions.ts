import {
  SET_GRADES,
  SET_EDUCATIONS,
  SET_COUNTRIES,
  SET_REGIONS,
  SET_CITIES,
} from "@actions/index";

export interface FormOptionsState {
  education: { id: number; name: string }[];
  grades: { id: number; name: string }[];
  countries: { id: number; name: string }[];
  regions: { id: number; name: string }[];
  cities: { id: number; name: string }[];
}

const initialState: FormOptionsState = {
  education: [],
  grades: [],
  countries: [],
  regions: [],
  cities: [],
};

const formOptions = (
  state = initialState,
  action: { type: string; payload: { id: number; name: string }[] }
) => {
  switch (action.type) {
    case SET_GRADES:
      return { ...state, grades: action.payload };
    case SET_EDUCATIONS:
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
    default:
      return state;
  }
};

export default formOptions;
