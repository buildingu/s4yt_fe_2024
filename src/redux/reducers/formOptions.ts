import { SET_COUNTRIES, SET_REGIONS } from "@actions/index";

export interface FormOptionsState {
  countries: {
    name: string;
    abbr: string;
    callingCode: string;
    continent: string;
  }[];
  regions: { name: string; abbr: string }[];
}

const initialState: FormOptionsState = {
  countries: [],
  regions: []
};

const formOptions = (
  state = initialState,
  action: { type: string; payload: { id: number; name: string }[] }
) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_REGIONS:
      return { ...state, regions: action.payload };
    default:
      return state;
  }
};

export default formOptions;
