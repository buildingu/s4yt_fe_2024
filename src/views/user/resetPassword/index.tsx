import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import PasswordForm from "@components/forms/password";

const ResetPassword: React.FC = () => {
  const [breakCenter, setBreakCenter] = useState(false),
    [searchParams] = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 764) {
        setBreakCenter(true);
      } else {
        setBreakCenter(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Header
        title="Reset Password"
        style={{
          maxWidth: "700px",
          ...(!breakCenter && { marginInline: "auto" }),
        }}
      />
      <Content
        addCoins="coins1"
        style={{ maxWidth: "600px", marginInline: "auto" }}
      >
        <PasswordForm verificationToken={searchParams.get("token")} />
      </Content>
    </Layout>
  );
};

export default ResetPassword;
