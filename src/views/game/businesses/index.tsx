import type { BusinessReduxState } from "@reducers/businesses";

import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getBusinesses } from "@actions/businesses";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";

import s from "./styles.module.css";
import Spinner from "@root/components/loaders/spinner";

interface Props {
  businesses: BusinessReduxState["businesses"];
  getBusinessesTimestamp: BusinessReduxState["getBusinessesTimestamp"];
  getBusinesses: () => Promise<void>;
}

const Businesses: React.FC<Props> = ({
  businesses,
  getBusinessesTimestamp,
  getBusinesses
}) => {
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (
      !businesses.length ||
      (getBusinessesTimestamp && Date.now() >= getBusinessesTimestamp)
    ) {
      setLoading(true);
      getBusinesses().finally(() => setLoading(false));
    }
  }, []);

  return (
    <Layout>
      <Header title="See Businesses" />
      <Content addCoins="coins3" addFeather="left" 
        style={{ display: "grid", minHeight: "446px" }}
      >
        <div aria-live="polite" className={s.businesses}>
          {!loading ? (
            businesses.length ? (
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
                  <Image src={business.logo} alt={business.name} />
                </Link>
              ))
            ) : (
              <p className={s.failed}>Unexpectedly failed to retrieve business data.</p>
            )
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
  businesses: businesses.businesses,
  getBusinessesTimestamp: businesses.getBusinessesTimestamp
});
const mapDispatchToProps = (dispatch: any) => ({
  getBusinesses: () => dispatch(getBusinesses())
});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
