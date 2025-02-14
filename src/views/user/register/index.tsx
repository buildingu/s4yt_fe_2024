import useRefreshReduxPersister from "@root/hooks/useRefreshReduxPersister";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import UserForm from "@components/forms/user";

const Register: React.FC = () => {
  // useRefreshReduxPersister(); // TODO: Use when starting.

  return (
    <Layout style={{ position: "relative", maxWidth: "800px" }}>
      <Header title="Register" />
      <Content addCoins="coins1" style={{ paddingTop: "3rem" }}>
        <UserForm />
      </Content>
      <a
        href="http://building-u.com/wp-content/uploads/Privacy-Notice.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="privacy fade move"
        style={{
          position: "absolute",
          right: 30,
          bottom: "-24px",
        }}
      >
        Private Policy
      </a>
    </Layout>
  );
};

export default Register;
