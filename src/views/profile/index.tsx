import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import UserForm from "@components/forms/user";
import Password from "@components/forms/password";
import { getCurrentUser } from "@actions/user";
import { getCountries, getRegions, getCities } from "@actions/locations";
import { getGrades, getEducation } from "@actions/options";
import Referrals from "./referrals";
import Coins from "./coins";
import Instagram from "./instagram";
import s from "./styles.module.css";

interface Props {
  user: Array<String>;
  getCurrentUser: Function;
}

const Profile: React.FC<Props> = ({ user, getCurrentUser }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentUser((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Layout large={true}>
      <Header />
      <Content>
        {data ? (
          <div className={s.container}>
            <section className={s.profileInfo}>
              <h2>Update Profile Info</h2>
              <UserForm user={data} setProfileData={setData} />
            </section>

            <Coins data={data.player ? data.player.coins : []} />
            <Referrals />
            <Instagram
              data={
                data.player
                  ? data.player.coins.filter((ele) => ele.coin_type_id === 3)
                  : []
              }
            />

            <section className={s.updatePassword}>
              <h2>Update Password</h2>
              <Password user={data} />
            </section>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch: Function) => ({
  getCurrentUser: (callback) => dispatch(getCurrentUser(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
