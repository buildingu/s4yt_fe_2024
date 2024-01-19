import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { getBusinesses } from "@root/redux/actions/getBusinesses";

import history from "@utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";
import { useEffect, useState } from "react";


const Businesses: React.FC = (props) => {
  const [businesses, setBusinesses] = useState<any>([]);
  useEffect(() => {
    props.getBusinesses().then((data) => {
      setBusinesses(data);
    });
  }, [props.getBusinesses]);

  return (
    <Layout
    // addFeather="right1"
    >
      <Header title="See Business" />
      <Content>
        <div className={s.businesses}>
          {businesses?.map((business, i) => (
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

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getBusinesses: () => dispatch(getBusinesses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
