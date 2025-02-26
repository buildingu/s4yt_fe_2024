import { SET_BUSINESSES } from "@actions/index";

export interface Business {
  name: string;
  logo: string;
  link: string;
  description: string;
  challenge_question: {
    title: string;
    description: string;
    // TODO: We might need to put the count here so I have the count initially (so it's not a separate request) and then I listen to that event for updates.
    // answers_count: number;
    // submissionCount: number;
    // TODO: Need the count somehow (probably separate).
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
