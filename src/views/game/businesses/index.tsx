import type { Dispatch } from "redux";
import type { BusinessReduxState, Business } from "@reducers/businesses";

import { useLayoutEffect } from "react";
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
  businesses: Business[];
  getBusinesses: () => Promise<void>;
}

const Businesses: React.FC<Props> = ({ businesses, getBusinesses }) => {
  useLayoutEffect(() => {
    if (!businesses.length) {
      getBusinesses();
    }
    return () => console.log("UNMOUNTING!!")
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
                <Image
                  // className={s.logos}
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
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getBusinesses: () => dispatch(getBusinesses() as unknown) as Promise<void>
});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
