import { Link } from "react-router-dom";

import history from "@utils/History";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";
import errorLogo from "@static/error-logo.png";

interface Props extends React.PropsWithChildren<{}> {
  status: number;
  text: string;
  linkType: "back" | "home";
}

const Error: React.FC<Props> = ({ children, status, text, linkType }) => {
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
            <br /> {status}
          </h1>
          <h4>{text}</h4>
          {linkType === "back" ? (
            <a
              aria-label="Back to Main Map"
              onClick={() => history.push(-1)}
              className="fade move"
            />
          ) : (
            <Link aria-label="Back to Main Map" to="/" className="fade move" />
          )}
        </div>
        {linkType === "back" ? (
          <a
            aria-label="Back to Main Map"
            onClick={() => history.push(-1)}
            className={s.responsiveBack}
          />
        ) : (
          <Link
            aria-label="Back to Main Map"
            to="/"
            className={s.responsiveBack}
          />
        )}
        {/* If any. */}
        {children}
      </Content>
    </Layout>
  );
};

export default Error;