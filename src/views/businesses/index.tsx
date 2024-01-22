import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses } from "@root/redux/actions/getBusinesses";
import { BusinessReduxState } from "@root/redux/reducers/getBusinesses";

import history from "@utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";
import { useEffect, useState } from "react";

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
    <Layout
    // addFeather="right1"
    >
      <Header title="See Business" />
      <Content>
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
        ></button>
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
