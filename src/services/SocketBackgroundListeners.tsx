import type { Dispatch } from "redux";
import type { GameReduxState } from "@reducers/game";
import type { BusinessReduxState } from "@reducers/businesses";

import { connect } from "react-redux"
import { useRef, useEffect } from "react";

import { coinChangesListener, silverAndGoldCoinsListener } from "@actions/game";
import { businessChallengeAnswerSubmittedListener } from "@actions/businesses";

import { socket } from "@services/socket";

interface Props {
  raffleItems: GameReduxState["raffleItems"];
  businesses: BusinessReduxState["businesses"];
  coinChangesListener: () => void;
  silverAndGoldCoinsListener: () => (data: any) => void;
  businessChallengeAnswerSubmittedListener: () => (data: any) => void;
}

const SocketBackgroundListeners: React.FC<Props> = ({
  raffleItems,
  businesses,
  coinChangesListener,
  silverAndGoldCoinsListener,
  businessChallengeAnswerSubmittedListener
}) => {
  const silverAndGoldCoinsListenerRef =
      useRef<ReturnType<typeof silverAndGoldCoinsListener> | null>(null),
    businessChallengeAnswerSubmittedListenerRef =
      useRef<ReturnType<typeof businessChallengeAnswerSubmittedListener> | null>(null);

  useEffect(() => {
    coinChangesListener();
  }, []);

  useEffect(() => {
    if (raffleItems.length) {
      silverAndGoldCoinsListenerRef.current = silverAndGoldCoinsListener();
    } else {
      if (silverAndGoldCoinsListenerRef.current) {
        socket.removeListener(
          "raffle_gold_silver",
          silverAndGoldCoinsListenerRef.current
        );
        silverAndGoldCoinsListenerRef.current = null;
      }
    }

    // This is probably actually not needed because this component will never unmount, but oh well.
    return () => {
      if (silverAndGoldCoinsListenerRef.current) {
        socket.removeListener(
          "raffle_gold_silver",
          silverAndGoldCoinsListenerRef.current
        );
        silverAndGoldCoinsListenerRef.current = null;
      }
    };
  }, [raffleItems]);

  useEffect(() => {
    if (businesses.length) {
      businessChallengeAnswerSubmittedListenerRef.current =
        businessChallengeAnswerSubmittedListener();
    } else {
      if (businessChallengeAnswerSubmittedListenerRef.current) {
        socket.removeListener(
          "business_challenge_submitted",
          businessChallengeAnswerSubmittedListenerRef.current
        );
        businessChallengeAnswerSubmittedListenerRef.current = null;
      }
    }

    return () => {
      if (businessChallengeAnswerSubmittedListenerRef.current) {
        socket.removeListener(
          "business_challenge_submitted",
          businessChallengeAnswerSubmittedListenerRef.current
        );
        businessChallengeAnswerSubmittedListenerRef.current = null;
      }
    };
  }, [businesses]);

  return null;
};

const mapStateToProps = ({ game, businesses }: { game: GameReduxState, businesses: BusinessReduxState }) => ({
  raffleItems: game.raffleItems,
  businesses: businesses.businesses
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  coinChangesListener: () => dispatch(coinChangesListener()),
  silverAndGoldCoinsListener: () => dispatch(silverAndGoldCoinsListener()),
  businessChallengeAnswerSubmittedListener: () =>
    dispatch(businessChallengeAnswerSubmittedListener())
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketBackgroundListeners);
