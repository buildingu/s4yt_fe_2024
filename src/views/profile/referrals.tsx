import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getReferrals, createReferral } from "@actions/user";
import { setNotification } from "@actions/notification";
import s from "./styles.module.css";

interface Props {
  getReferrals: Function;
  createReferral: Function;
  setNotification: Function;
}

const Referral: React.FC<Props> = ({
  getReferrals,
  createReferral,
  setNotification,
  configuration,
}) => {
  const [form, setForm] = useState({
    processing: false,
    valid: false,
    submitted: false,
    error: null,
  });
  const [data, setData] = useState({});
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    getReferrals((res) => {
      setReferrals(res.data);
    });
  }, []);

  const submit = (event) => {
    event.preventDefault();

    const fields = document.querySelectorAll("#referralForm input");
    let valid = true;

    for (let x = 0; x < fields.length; x++) {
      fields[x].setAttribute("data-valid", fields[x].validity.valid ? 1 : 0);

      if (!fields[x].validity.valid && valid) {
        valid = false;
      }
    }

    if (valid) {
      createReferral(data, (res) => {
        if (!res.errors) {
          fields[0].value = "";
          fields[1].value = "";

          setNotification({
            display: true,
            error: false,
            content: "A referral email has been sent to " + data.email,
            timed: true,
          });

          getReferrals((res) => {
            setReferrals(res.data);
          });
        } else {
          const key = Object.keys(res.errors)[0];

          setNotification({
            display: true,
            error: true,
            content: res.errors[key],
            timed: true,
          });
        }

        setForm({ ...form, processing: false });
      });
    }

    setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (event) => {
    const node = event.target;
    const key = node.getAttribute("name");

    if (form.submitted) {
      node.setAttribute("data-valid", node.validity.valid ? 1 : 0);
    }

    setData({ ...data, [key]: node.value });
  };

  return (
    <section className={s.referrals}>
      <h2>Referrals</h2>
      <form
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
      </form>
      {referrals.length > 0 && (
        <>
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
              {referrals.map((referral, index) => {
                const date = new Date(Date.parse(referral.created_at));

                return (
                  <tr key={index}>
                    <td>
                      {date.getMonth() + 1}/{date.getDate()}/
                      {date.getFullYear()}
                    </td>
                    <td>{referral.name}</td>
                    <td>{referral.email}</td>
                    <td>{referral.status}</td>
                    <td>
                      {referral.status === "accepted"
                        ? configuration.instagram_coins
                        : 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

const mapStateToProps = ({ configuration }) => ({ configuration });
const mapDispatchToProps = (dispatch: Function) => ({
  getReferrals: (callback) => dispatch(getReferrals(callback)),
  createReferral: (data, callback) => dispatch(createReferral(data, callback)),
  setNotification: (data) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Referral);
