import UserCredentials from "@typings/UserCredentials";
import { ThunkResult } from "@typings/redux/ThunkResult";

import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { getReferrals } from "@actions/user";
import copyToClipboard from "@utils/copyToClipboard";

import s from "./styles.module.css";

interface ReferralsDTO {
  created_at: string;
  name: string;
  email: string;
}

interface Props {
  user: UserCredentials;
  getReferrals: (
    setReferrals: React.Dispatch<React.SetStateAction<ReferralsDTO[]>>
  ) => ThunkResult<Promise<any>>;
}

// TODO: The table no longer show invites but actual registers (no status, just completed registers).
const Referral: React.FC<Props> = ({ user, getReferrals }) => {
  const [referrals, setReferrals] = useState<ReferralsDTO[] | string>([]);

  useEffect(() => {
    if (!referrals.length) getReferrals(setReferrals);
  }, []);

  return (
    <section className={s.referrals}>
      <h2>Referrals</h2>
      {/* <form
        id="referralForm"
        className={s.form}
        autoComplete="off"
        onSubmit={submit}
        noValidate
      >
        <fieldset>
          <label htmlFor="referral_name">Name</label>
          <input
            id="referral_name"
            name="name"
            type="text"
            onKeyUp={updateField}
            readOnly={form.processing}
            autoComplete="off"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="referral_email">Email</label>
          <input
            id="referral_email"
            name="email"
            type="email"
            onKeyUp={updateField}
            readOnly={form.processing}
            autoComplete="off"
            required
          />
        </fieldset>
        <fieldset>
          <button>Send</button>
        </fieldset>
      </form> */}
      <div className={s.referralLink}>
        <button onClick={() => copyToClipboard(user.referral_link)}>
          {user.referral_link}
        </button>
      </div>

      {referrals.length > 0 && (
        <>
          <h3>Added</h3>
          {typeof referrals === "string" ? (
            <span className={s.noReferralsMsg}>{referrals}</span>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date Used</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral, i) => {
                  const date = new Date(Date.parse(referral.created_at));

                  return (
                    <tr key={i}>
                      <td>
                        {date.getMonth() + 1}/{date.getDate()}/
                        {date.getFullYear()}
                      </td>
                      <td>{referral.created_at}</td>
                      <td>{referral.email}</td>
                      <td>3</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
};

// const mapStateToProps = ({ configuration }) => ({ configuration });
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getReferrals: (
    setReferrals: React.Dispatch<React.SetStateAction<ReferralsDTO[]>>
  ) => dispatch(getReferrals(setReferrals)),
});

export default connect(null, mapDispatchToProps)(Referral);
