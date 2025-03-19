import type { Dispatch } from "redux";
import type { GameReduxState } from "@reducers/game";
import type { BusinessReduxState } from "@reducers/businesses";

import { connect } from "react-redux"
import { useRef, useEffect } from "react";

import { coinChangesListener, sliverAndGoldCoinsListener } from "@actions/game";
import { businessChallengeAnswerSubmittedListener } from "@actions/businesses";

import { socket } from "@services/socket";

interface Props {
  raffleItems: GameReduxState["raffleItems"];
  businesses: BusinessReduxState["businesses"];
  coinChangesListener: () => void;
  sliverAndGoldCoinsListener: () => (data: any) => void;
  businessChallengeAnswerSubmittedListener: () => (data: any) => void;
}

const SocketBackgroundListeners: React.FC<Props> = ({
  raffleItems,
  businesses,
  coinChangesListener,
  sliverAndGoldCoinsListener,
  businessChallengeAnswerSubmittedListener
}) => {
  const sliverAndGoldCoinsListenerRef =
      useRef<ReturnType<typeof sliverAndGoldCoinsListener>>(),
    businessChallengeAnswerSubmittedListenerRef =
      useRef<ReturnType<typeof businessChallengeAnswerSubmittedListener>>();

  useEffect(() => {
    coinChangesListener();
  }, []);

  useEffect(() => {
    if (raffleItems.length) {
      if (!socket.hasListeners("raffle_gold_sliver"))
        sliverAndGoldCoinsListenerRef.current = sliverAndGoldCoinsListener();
    } else {
      if (sliverAndGoldCoinsListenerRef.current)
        socket.removeListener(
          "raffle_gold_sliver",
          sliverAndGoldCoinsListenerRef.current
        );
    }

    // This is probably actually not needed because this component will never unmount, but oh well.
    return () => {
      if (sliverAndGoldCoinsListenerRef.current)
        socket.removeListener(
          "raffle_gold_sliver",
          sliverAndGoldCoinsListenerRef.current
        );
    };
  }, [raffleItems]);

  useEffect(() => {
    if (businesses.length) {
      if (socket.hasListeners("business_challenge_submitted"))
        businessChallengeAnswerSubmittedListenerRef.current =
          businessChallengeAnswerSubmittedListener();
    } else {
      if (businessChallengeAnswerSubmittedListenerRef.current)
        socket.removeListener(
          "business_challenge_submitted",
          businessChallengeAnswerSubmittedListenerRef.current
        );
    }

    return () => {
      if (businessChallengeAnswerSubmittedListenerRef.current)
        socket.removeListener(
          "business_challenge_submitted",
          businessChallengeAnswerSubmittedListenerRef.current
        );
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
  sliverAndGoldCoinsListener: () => dispatch(sliverAndGoldCoinsListener()),
  businessChallengeAnswerSubmittedListener: () =>
    dispatch(businessChallengeAnswerSubmittedListener())
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketBackgroundListeners);
