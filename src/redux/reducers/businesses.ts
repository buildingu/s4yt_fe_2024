import { SET_BUSINESSES } from "@actions/index";

export interface Business {
  name: string;
  logo: string;
  link: string;
  description: string;
  challenge_question: {
    title: string;
    description: string;
    answers_count: number;
    answer_submitted: boolean;
  };
  video_url: string;
  video_title: string
}

export interface BusinessReduxState {
  businesses: Business[];
}

const initialState: BusinessReduxState = {
  businesses: []
};

const businesses = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        businesses: action.payload
      };
    default:
      return state;
  }
};

export default businesses;
