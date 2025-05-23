import type UserCredentials from "@typings/UserCredentials";
import type { Dispatch } from "redux";

import { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getReferrals } from "@actions/user";
import copyToClipboard from "@utils/copyToClipboard";

import s from "./styles.module.css";

interface ReferralsDTO {
  invited_user: {
    name: string;
    email: string;
  };
  coins: number;
  created_at: string;
}

interface Props {
  user: UserCredentials;
  getReferrals: (
    setReferrals: React.Dispatch<React.SetStateAction<ReferralsDTO[] | string>>
  ) => Promise<void>;
}

const Referral: React.FC<Props> = ({ user, getReferrals }) => {
  const [referrals, setReferrals] = useState<ReferralsDTO[] | string>([]);

  useLayoutEffect(() => {
    if (!referrals.length) getReferrals(setReferrals);
  }, []);

  return (
    <section className={s.referrals}>
      <h2>Referrals</h2>

      <button
        aria-label="Your Referral Link"
        title="Copy Referral Link"
        className={s.referralLink}
        onClick={() => copyToClipboard(user.referral_link)}
      >
        {user.referral_link}
      </button>
      {referrals.length > 0 && (
        <>
          <h3 {...(typeof referrals !== "string" && { className: s.move })}>
            Used
          </h3>
          {typeof referrals === "string" ? (
            <span role="dialog" className={s.noReferralsMsg}>
              {referrals}
            </span>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
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
                        <span>Date</span>
                        {date.getMonth() + 1}/{date.getDate()}/
                        {date.getFullYear()}
                      </td>
                      <td>
                        <span>Name</span>
                        {referral.invited_user.name}
                      </td>
                      <td>
                        <span>Email</span>
                        {referral.invited_user.email}
                      </td>
                      <td>
                        <span>Points</span>
                        {referral.coins}
                      </td>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getReferrals: (
    setReferrals: React.Dispatch<React.SetStateAction<ReferralsDTO[] | string>>
  ) => dispatch(getReferrals(setReferrals) as unknown) as Promise<void>,
});

export default connect(null, mapDispatchToProps)(Referral);
