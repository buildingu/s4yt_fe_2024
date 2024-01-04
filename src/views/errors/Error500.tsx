import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import history from "@utils/history";
import s from "./styles.module.css";
import errorLogo from "@static/error-logo.png";

const Error500: React.FC = () => {
  return (
    <Layout
    // addCoins="coins2"
    // addFeather="right1"
    >
      <Header />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem 0.5rem",
          flexWrap: "wrap-reverse",
          paddingTop: "5rem",
          paddingBottom: "1rem",
        }}
      >
        <img src={errorLogo} alt="Error Pirate" className={s.errorLogo} />
        <div className={s.text}>
          <h1>
            Error
            <br /> 500
          </h1>
          <h4>Internal server error</h4>
          <a
            aria-label="Back to Main Map"
            onClick={() => history.push(-1)}
            className="fade move"
          />
        </div>
        <a
          aria-label="Back to Main Map"
          onClick={() => history.push(-1)}
          className={s.responsiveBack}
        />
      </Content>
    </Layout>
  );
};

export default Error500;
