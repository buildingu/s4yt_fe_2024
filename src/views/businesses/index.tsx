import { connect } from "react-redux";
import { navigate } from "../../utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";

const businesses = [
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
  require("@static/error-logo.png"),
];

const Businesses: React.FC = () => {
  return (
    <Layout
    // addFeather="right1"
    >
      <Header title="See Business" />
      <Content
      //   style={{
      //     display: "grid",
      //     placeItems: "center",
      //     paddingTop: "3.5rem",
      //     paddingBottom: "3rem",
      //   }}
      >
        <div className={s.businesses}>
          {businesses.map((business, i) => (
            <div key={i}>
              <img src={business} alt="" />
            </div>
          ))}
        </div>
        <a
          href="#"
          aria-label="Previous Page"
          className={s.backBtn}
          onClick={() => navigate(-1)}
        >
          Back
        </a>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
