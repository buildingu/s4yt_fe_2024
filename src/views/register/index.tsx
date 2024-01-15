import { useSearchParams } from "react-router-dom";
// import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import UserForm from "@components/forms/user";
// import s from "./styles.module.css";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const [queryParameters] = useSearchParams();
  const referral = queryParameters.has("referral")
    ? queryParameters.get("referral")
    : null;

  return (
    <Layout addCoins="coins1" style={{ maxWidth: "800px" }}>
      <Header title="Register" />
      <Content style={{ paddingTop: "3rem" }}>
        <UserForm referral={referral} />
      </Content>
    </Layout>
  );
};

export default Register;
