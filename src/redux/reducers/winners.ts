import { SET_WINNERS, CLEAR_WINNERS } from "@actions/index";

export interface RaffleWinner {
  name: string;
  education: string;
  country: string;
  region?: string;
}

export interface ChallengeWinner extends RaffleWinner {
  award: number;
}

export interface PartnerMain {
  name: string;
  logo: string;
  winners: {
    raffle: { image_src: string; users: RaffleWinner[] }[];
    challenge: ChallengeWinner[];
  };
}

/** A partner that is only a raffle partner. */
export interface PartnerOther {
  name: string;
  image_src: string;
  logo: string;
  winners: { raffle: RaffleWinner[] };
}

export interface WinnersReduxState {
  partners: {
    main: PartnerMain[]; // Business or both.
    other: PartnerOther[]; // Just a raffle partner.
  }
}

const initialState: WinnersReduxState = {
  partners: {
    main: [],
    other: []
  }
};

const winners = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_WINNERS:
      return { ...state, partners: action.payload };
    case CLEAR_WINNERS:
      return initialState;
    default:
      return state;
  }
};

export default winners;
