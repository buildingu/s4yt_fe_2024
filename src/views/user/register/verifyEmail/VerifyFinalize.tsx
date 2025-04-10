import type { Dispatch } from "redux";
import type NotificationValues from "@typings/NotificationValues";

import { useLayoutEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import uuidRegex from "@root/constants/uuidRegex";

import history from "@utils/History";

import { verifyEmail } from "@actions/user";
import { addNotification } from "@actions/notifications";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import OverlayLoader from "@root/components/loaders/overlayLoader";

import s from "./styles.module.css"

interface Props {
  verifyEmail: (
    token: string,
    setResult: React.Dispatch<React.SetStateAction<ResultState>>
  ) => Promise<void>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

type ResultState = { data: any; meta: Partial<Response> } | null;

function isHex(token: string) {
  return /^[a-f0-9]{40}$/i.test(token);
}

const VerifyFinalize: React.FC<Props> = ({ verifyEmail, addNotification }) => {
  const [searchParams] = useSearchParams(),
    [result, setResult] = useState<ResultState>(null);

  useLayoutEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      addNotification({
        error: true,
        content: "There is nothing to verify. Please use the link from the verification email to navigate here.",
        close: false,
        duration: 0
      });
    } else if (!isHex(token)) {
      addNotification({
        error: true,
        content: "Your token is malformed. Use the link from the verification email to try again.",
        close: false,
        duration: 0
      });
      history.push("/error-401")
    } else {
      verifyEmail(token, setResult);
      return;
    }

    setResult({ data: {}, meta: {} });
  }, []);

  return !result ? <OverlayLoader text="Verifying user" /> : <Result result={result} />
};

const Result: React.FC<{ result: NonNullable<ResultState> }> = ({ result }) => {
  const isSuccess = !!result.meta.ok,
    [breakCenter, setBreakCenter] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setBreakCenter(true);
      } else {
        setBreakCenter(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <Header
        title="Verifying Email"
        style={{
          maxWidth: "800px",
          ...(!breakCenter && { marginInline: "auto" })
        }}
      />
      <Content
        addCoins="coins1"
        className={s.finalize}
        style={{ maxWidth: "600px", paddingTop: "3rem", marginInline: "auto" }}
      >
        <h2 data-success={isSuccess}>{isSuccess ? "Success!" : "Failed"}</h2>
        <p>
          {isSuccess
            ? "Your email has been verified. Please check your inbox with details about the game and login info. Enjoy!"
            : "Your email was not verified due to security reasons or an server issue."}
        </p>
        {isSuccess && (
          <Link to="/login" className="fade move">
            Login Here
          </Link>
        )}
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  verifyEmail: (
    token: string,
    setResult: React.Dispatch<React.SetStateAction<ResultState>>
  ) =>
    dispatch(verifyEmail(token, setResult) as unknown) as Promise<void>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(null, mapDispatchToProps)(VerifyFinalize);
