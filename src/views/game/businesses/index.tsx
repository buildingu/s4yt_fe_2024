import type { BusinessReduxState, Business } from "@reducers/businesses";

import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getBusinesses, businessChallengeAnswerSubmittedListener } from "@actions/businesses";

import { socket } from "@services/socket";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";

import s from "./styles.module.css";
import Spinner from "@root/components/loaders/spinner";

interface Props {
  businesses: Business[];
  getBusinesses: () => Promise<void>;
  businessChallengeAnswerSubmittedListener: () => (data: any) => void;
}

const Businesses: React.FC<Props> = ({
  businesses,
  getBusinesses,
  businessChallengeAnswerSubmittedListener,
}) => {
  useLayoutEffect(() => {
    let listener: ReturnType<typeof businessChallengeAnswerSubmittedListener> | undefined;

    getBusinesses().then(() => {
      if (!socket.hasListeners("business_challenge_submitted")) {
        listener = businessChallengeAnswerSubmittedListener();
      }
    });

    return () => {
      if (listener) socket.removeListener("business_challenge_submitted", listener);
    };
  }, []);

  return (
    <Layout>
      <Header title="See Businesses" />
      <Content addCoins="coins3" addFeather="left" 
        style={{ display: "grid", minHeight: "446px" }}
      >
        <div aria-live="polite" className={s.businesses}>
          {businesses.length ? (
            businesses?.map((business, i) => (
              <Link
                key={i}
                aria-label={`${business.name}'s details`}
                to={`/businesses/${business.name}`}
                state={business}
                className={s.businessContainer}
              >
                {business.challenge_question.answers_count > 0 && (
                  <div
                    aria-label="Answers Submitted"
                    className={s.answersCount}
                  >
                    {business.challenge_question.answers_count}
                  </div>
                )}
                <Image
                  src={business.logo}
                  alt={business.name}
                />
              </Link>
            ))
          ) : (
            <Spinner
              size="100px"
              style={{
                alignSelf: "center",
                border: "solid 10px #9c9c9c",
                borderTop: "solid 10px #242424"
              }}
            />
          )}
        </div>

        <button
          aria-label="Previous Page"
          className="backBtn fade move"
          onClick={() => history.push(-1)}
        />
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({ businesses }: { businesses: BusinessReduxState }) => ({
  businesses: businesses.businesses
});
const mapDispatchToProps = (dispatch: any) => ({
  getBusinesses: () => dispatch(getBusinesses()),
  businessChallengeAnswerSubmittedListener: () => dispatch(businessChallengeAnswerSubmittedListener())
});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
