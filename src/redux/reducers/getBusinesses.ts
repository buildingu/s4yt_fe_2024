import { SET_BUSINESSES } from "@actions/index";

export interface BusinessReduxState {
  name: string;
  logo: string;
  link: string;
  description: string;
  meetUp: {
    date: string;
    time: string;
    method: string;
  };
  challenge: {
    title: string;
    content: string;
    submissionCount: number;
  };
  video: {
    title: string;
    link: string;
  };
}

const initialState: BusinessReduxState[] = [];

const getBusinesses = (
  state: BusinessReduxState[] = initialState,
  action: { type: string; payload: { businesses?: BusinessReduxState[] } }
) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return action.payload || state;
    default:
      return state;
  }
};

export default getBusinesses;
