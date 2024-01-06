import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import s from "./styles.module.css";

const VerifyEmail: React.FC = () => {
  return (
    <Layout addCoins="coins1" style={{ maxWidth: "800px" }}>
      <Header title="Register" />
      <Content style={{ paddingTop: "3rem" }}>
        <div className={s.container}></div>
      </Content>
    </Layout>
  );
};

export default VerifyEmail;
