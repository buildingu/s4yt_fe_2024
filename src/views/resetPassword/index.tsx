import { useSearchParams } from "react-router-dom";
// import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import ResetPasswordForm from "@components/forms/resetPassword";
// import s from "./styles.module.css";

const ResetPassword: React.FC = () => {
  const [queryParameters] = useSearchParams();

  return (
    <Layout addCoins="coins1" style={{ maxWidth: "600px" }}>
      <Header title="Reset Password" />
      <Content
      // style={{ paddingTop: "3rem" }}
      >
        <ResetPasswordForm playerId={queryParameters.get("id")} />
      </Content>
    </Layout>
  );
};

export default ResetPassword;
