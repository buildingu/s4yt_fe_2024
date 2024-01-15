import UserCredentials from "@typings/UserCredentials";

import { useState, useEffect } from "react";
import { connect } from "react-redux";

// import { getCurrentUser } from "@actions/user";
// import { getCountries, getRegions, getCities } from "@actions/locations";
// import { getGrades, getEducation } from "@actions/options";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import UserForm from "@components/forms/user";
import PasswordForm from "@components/forms/password";
import Referrals from "./referrals";
import Coins from "./coins";
// import Instagram from "./instagram";

import s from "./styles.module.css";

interface Props {
  user?: UserCredentials;
}

const Profile: React.FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   getCurrentUser((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  return (
    <Layout style={{ maxWidth: "1200px" }}>
      <Header title="Profile" />
      <Content style={{ backgroundColor: "transparent" }}>
        <div aria-live="polite" aria-busy={loading} className={s.container}>
          {user ? (
            <>
              <section className={s.profileInfo}>
                <h2>Update Profile Info</h2>
                <UserForm />
              </section>

              <Coins />

              <Referrals user={user} />

              {/* <Instagram /> */}

              <section className={s.updatePassword}>
                <h2>Update Password</h2>
                <PasswordForm />
              </section>
            </>
          ) : (
            <span role="dialog" className={s.noUserMsg}>
              Pretty weird you are able to see this message, but you're not
              logged in.
            </span>
          )}
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({
  user,
}: {
  user: { credentials?: UserCredentials; token?: string };
}) => ({
  user: user.credentials,
});

export default connect(mapStateToProps, null)(Profile);
