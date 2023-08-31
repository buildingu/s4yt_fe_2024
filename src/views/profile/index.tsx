import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";

import { getCurrentUser, registration } from "@actions/user";

import s from "./styles.module.css";
import coins from "@static/coins.png";

interface Props {
  getCurrentUser: Function;
}

type User = {
  name: string;
  email: string;
  education: string;
  grade: string;
  country: string;
  region: string;
  city: string;
};

const Profile: React.FC<Props> = ({ getCurrentUser }) => {
  const [data, setData] = useState<User | null>();

  useEffect(() => {
    try {
      // getCurrentUser((res: any) => {
      //   setData(res.data);
      // });

      setTimeout(() => {
        setData({
          name: "Dave",
          email: "test@test.com",
          education: "High School",
          grade: "10th grade",
          country: "Canada",
          region: "Newfoundland and Labrador",
          city: "Bay Roberts",
        });
      }, 2000);
    } catch (error: any) {
      console.error("Getting user data error: ", error.message);
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Content>
        {data ? (
          <div className={s.container}>
            <section className={s.profileInfo}>
              <h2>Update Profile Info</h2>
              <form
                // onSubmit={submit}
                className={s.form}
                autoComplete="off"
                noValidate
              >
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={data.name}
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={data.email}
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="location">Location</label>
                  <select
                    id="education"
                    name="education_id"
                    // onChange={updateField}
                    // disabled={form.processing}
                    required
                  >
                    <option value="">{data.region}</option>
                    {/* {options.education && options.education.map((education,index) => {
								return <option key={index} value={education.id}>{education.name}</option>
							})} */}
                  </select>

                  <label htmlFor="grade">Grade</label>
                  <input
                    id="grade"
                    name="grade"
                    type="text"
                    placeholder={data.grade}
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>

                <fieldset>
                  <button
                    type="submit"
                    // disabled={form.processing}
                  />
                </fieldset>
              </form>
            </section>

            <section className={s.doblonStatus}>
              <h2>My Doblon Status</h2>
              <div>
                <div className={s.coins}>
                  <img src={coins} alt="Doblon Coins" />
                  <p>
                    You got <br />
                    <b>14</b> <br /> <span>Doblons</span>
                  </p>
                </div>
                <div className={s.statuses}>
                  <div>
                    <h4>Event Registration</h4>
                    <span>3</span>
                  </div>
                  <div>
                    <h4>Referrals</h4>
                    <span>1</span>
                  </div>
                  <div>
                    <h4>Instagram</h4>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={s.referrals}>
              <h2>Referrals</h2>

              <form
                // onSubmit={submit}
                className={s.form}
                autoComplete="off"
                noValidate
              >
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <button
                    type="submit"
                    // disabled={form.processing}
                  >
                    Send
                  </button>
                </fieldset>
              </form>

              <h3>Added</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span>Date</span>
                      8/24/2023
                    </td>
                    <td>
                      <span>Name</span>
                      Mary Smith
                    </td>
                    <td>
                      <span>Email</span>
                      marysmith@buildingu.com
                    </td>
                    <td>
                      <span>Status</span>
                      Accepted
                    </td>
                    <td>
                      <span>Points</span>5
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Date</span>
                      8/26/2023
                    </td>
                    <td>
                      <span>Name</span>
                      Darryl Johnson
                    </td>
                    <td>
                      <span>Email</span>
                      darryljohnson@buildingu.com
                    </td>
                    <td>
                      <span>Status</span>
                      Pending
                    </td>
                    <td>
                      <span>Points</span>5
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className={s.interactions}>
              <h2>
                Instagram
                <br /> Interactions
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Post Topic</th>
                    <th>Action</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span>Date</span>
                      8/24/2023
                    </td>
                    <td>
                      <span>Post Topic</span>
                      Lorem, ipsum.
                    </td>
                    <td>
                      <span>Action</span>
                      Comment
                    </td>
                    <td>
                      <span>Points</span>5
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Date</span>
                      8/26/2023
                    </td>
                    <td>
                      <span>Post Topic</span>
                      Lorem, ipsum dolor.
                    </td>
                    <td>
                      <span>Action</span>
                      Like
                    </td>
                    <td>
                      <span>Points</span>5
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className={s.updatePassword}>
              <h2>Update Password</h2>
              <form
                // onSubmit={submit}
                className={s.form}
                autoComplete="off"
                noValidate
              >
                <fieldset>
                  <label htmlFor="password">New Pass</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="password_confirmation">Confirm Pass</label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    // readOnly={form.processing}
                    // autoComplete="off"
                    required
                  />
                </fieldset>
                <fieldset>
                  <button
                    type="submit"
                    // disabled={form.processing}
                  >
                    Update
                  </button>
                </fieldset>
              </form>
            </section>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  getCurrentUser: (callback: () => any) => dispatch(getCurrentUser(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
