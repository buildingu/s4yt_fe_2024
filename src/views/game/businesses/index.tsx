import { BusinessReduxState } from "@reducers/getBusinesses";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getBusinesses } from "@actions/getBusinesses";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";

import s from "./styles.module.css";

interface Props {
  partners: BusinessReduxState[];
  getBusinesses: () => Promise<any>;
}

const Businesses: React.FC<Props> = ({ partners, getBusinesses }) => {
  const [businesses, setBusinesses] = useState<BusinessReduxState[]>([]);
  useEffect(() => {
    if (partners && partners.length > 0) {
      setBusinesses(partners);
    } else {
      getBusinesses();
    }
  }, [partners, getBusinesses]);

  return (
    <Layout>
      <Header title="See Business" />
      <Content addCoins="coins3" addFeather="left">
        <div className={s.businesses}>
          {businesses?.map((business: BusinessReduxState, i: number) => (
            <Link
              aria-label={`${business.name}'s details`}
              key={i}
              to={`/businesses/${business.name}`}
              state={business}
              className={s.businessContainer}
            >
              <img className={s.logos} src={business.logo} alt="" />
            </Link>
          ))}
        </div>
        <button
          aria-label="Previous Page"
          className={s.backBtn}
          onClick={() => history.push(-1)}
        />
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({
  getBusinesses,
}: {
  getBusinesses: BusinessReduxState[];
}) => ({
  partners: getBusinesses,
});
const mapDispatchToProps = (dispatch: Function) => ({
  getBusinesses: () => dispatch(getBusinesses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
