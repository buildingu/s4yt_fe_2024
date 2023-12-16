import { connect } from "react-redux";
import { navigate } from "../../utils/History";
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
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className={s.businesses}>
          {businesses.map((business, i) => (
            <a
              href={`/businesses/${business.name}`}
              className={s.businessContainer}
              key={i}
            >
              <img
                className={s.logos}
                src={business.img}
                alt=""
              />
            </a>
          ))}
        </div>
        <a
          href="#"
          aria-label="Previous Page"
          className={s.backBtn}
          onClick={() => navigate(-1)}
        ></a>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
