import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";

interface Props {}

const products = [
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Bag & Key Chain",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Lanyard",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
  },
];

const Raffle: React.FC<Props> = ({}) => {
  return (
    <Layout
    // addFeather="right2"
    >
      <Header title="Raffle Page" />
      <Content
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className={s.container}>
          <div className={s.top}>
            <h2>
              Tokens for
              <br /> Treasure
            </h2>
            <h4>
              Your Total: <span>1</span>
            </h4>
          </div>
          <div className={s.products}>
            {products.map((item, i) => (
              <div aria-label={item.name} key={i}>
                <div className={s.imgBox}>
                  <img src={item.img} alt={item.name} />
                </div>
                <h4 className={s.name}>{item.name}</h4>
                <div className={s.controls}>
                  <button aria-label="Subtract">-</button>
                  <h4>2</h4>
                  <button aria-label="Add">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);