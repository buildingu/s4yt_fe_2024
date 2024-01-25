import { Link } from "react-router-dom";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

const VerifySuccess: React.FC = () => {
  return (
    <Layout style={{ maxWidth: "600px" }}>
      <Header title="Email Verified" />
      <Content addCoins="coins1" style={{ paddingTop: "3rem" }}>
        <h2
          style={{
            fontFamily: "'BebasNeue', Arial",
            fontSize: "var(--heading-38)",
            color: "var(--pbrown)",
          }}
        >
          Thanks!
        </h2>
        <p
          style={{
            fontFamily: "'Corbel', Arial",
            fontSize: "21px",
            color: "var(--pbrown)",
            marginBottom: "1.5rem",
          }}
        >
          Your email has been verified. Please check your inbox with details
          about the game and login info. Enjoy!
        </p>
        <Link
          to="/login"
          className="fade move"
          style={{
            fontSize: "21px",
            color: "var(--pbrown)",
          }}
        >
          Login Here
        </Link>
      </Content>
    </Layout>
  );
};

export default VerifySuccess;
