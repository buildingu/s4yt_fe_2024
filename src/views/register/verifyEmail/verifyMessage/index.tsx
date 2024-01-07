import { Link } from "react-router-dom";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

interface Props {
  title: string;
  heading: string;
  text: string;
}

const VerifyMessage: React.FC<Props> = ({ title, heading, text }) => {
  return (
    <Layout addCoins="coins1" style={{ maxWidth: "600px" }}>
      <Header title={title} />
      <Content style={{ paddingTop: "3rem" }}>
        <h2>{heading}</h2>
        <p>{text}</p>
        {title.includes("Verified") && (
          <Link to="/login" className="fade move">
            Login Here
          </Link>
        )}
      </Content>
    </Layout>
  );
};

export default VerifyMessage;
