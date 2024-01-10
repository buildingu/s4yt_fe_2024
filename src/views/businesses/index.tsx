import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "@utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";

const businesses = [
  {
    name: "HOP Group",
    img: require("@static/businessLogos/HOPGroup.jpg"),
  },
  {
    name: "KnowledgeFlow",
    img: require("@static/businessLogos/KnowledgeFlow.png"),
  },
  {
    name: "Matrix",
    img: require("@static/businessLogos/matrix.png"),
  },
  {
    name: "Meridian Stories",
    img: require("@static/businessLogos/meridianstories.png"),
  },
  {
    name: "Porter",
    img: require("@static/businessLogos/Porter.jpg"),
  },
  {
    name: "Robotics For All",
    img: require("@static/businessLogos/roboticsforall.png"),
  },
];
const Businesses: React.FC = () => {
  return (
    <Layout
    // addFeather="right1"
    >
      <Header title="See Business" />
      <Content>
        <div className={s.businesses}>
          {businesses.map((business, i) => (
            <Link
              aria-label={`${business.name}'s details`}
              key={i}
              to={`/businesses/${business.name}`}
              className={s.businessContainer}
            >
              <img className={s.logos} src={business.img} alt="" />
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
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
