import { Link } from "react-router-dom";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import s from "./styles.module.css";
import errorLogo from "@static/error-logo.png";

const Error404: React.FC = () => {
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
            <br /> 404
          </h1>
          <h4>The requested page was not found</h4>
          <Link aria-label="Back to Main Map" to="/" className="fade move" />
        </div>
        <Link
          aria-label="Back to Main Map"
          to="/"
          className={s.responsiveBack}
        />
      </Content>
    </Layout>
  );
};

export default Error404;
