import { useSearchParams } from "react-router-dom";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import UserForm from "@components/forms/user";

const Register: React.FC = () => {
  const [queryParameters] = useSearchParams(),
    referral =
      queryParameters.has("referral_code") && queryParameters.has("version_id")
        ? `referral_code=${queryParameters.get(
            "referral_code"
          )}&version_id=${queryParameters.get("version_id")}`
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
