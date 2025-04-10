import { SET_BUSINESSES, UPDATE_BUSINESS_CHALLENGE, CLEAR_BUSINESSES } from "@actions/index";

export interface Business {
  name: string;
  logo: string;
  link: string;
  description: string;
  challenge_question: {
    challenge_id: string;
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
  getBusinessesTimestamp?: number; // Timestamp is in milliseconds.
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
        businesses: action.payload,
        getBusinessesTimestamp: Date.now() + 3 * 60 * 60 * 1000
      };
    case UPDATE_BUSINESS_CHALLENGE:
      return {
        ...state,
        businesses: state.businesses.map((business) =>
          business.challenge_question.challenge_id === action.payload.challenge_id
            ? {
                ...business,
                challenge_question: {
                  ...business.challenge_question,
                  ...action.payload.update
                }
              }
            : business
        ),
      };
    case CLEAR_BUSINESSES:
      return initialState;
    default:
      return state;
  }
};

export default businesses;
