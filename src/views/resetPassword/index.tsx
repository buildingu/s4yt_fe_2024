import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import ResetPasswordForm from "@components/forms/resetPassword";

const ResetPassword: React.FC = () => {
  const [breakCenter, setBreakCenter] = useState(false),
    [queryParameters] = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 764) {
        setBreakCenter(true);
      } else {
        setBreakCenter(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout addCoins="coins1">
      <Header
        title="Reset Password"
        style={{
          maxWidth: "700px",
          ...(!breakCenter && { marginInline: "auto" }),
        }}
      />
      <Content style={{ maxWidth: "600px", marginInline: "auto" }}>
        <ResetPasswordForm playerId={queryParameters.get("id")} />
      </Content>
    </Layout>
  );
};

export default ResetPassword;
