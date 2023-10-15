import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCoinTypes } from "@actions/options";
import coins from "@static/coins_variant1.png";
import s from "./styles.module.css";

interface Props {
  data: Array<String>;
  options: Array<String>;
  getCoinTypes: Function;
}

const Coins: React.FC<Props> = ({ data, options, getCoinTypes }) => {
  useEffect(() => {
    if (options.cointypes.length === 0) {
      getCoinTypes();
    }
  }, []);

  return (
    <section className={s.doblonStatus}>
      <h2>My Doblon Status</h2>
      <div>
        <div className={s.coins}>
          <img src={coins} alt="Doblon Coins" />
          <p>
            You got <br />
            <b>{data.length}</b> <br /> <span>Doblons</span>
          </p>
        </div>
        <div className={s.statuses}>
          {options.cointypes.map((type, index) => {
            const total = data.filter(
              (ele) => ele.coin_type_id === type.id
            ).length;

            return (
              <div key={index}>
                <h4>{type.event}</h4>
                <span>{total}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ options }) => ({ options });
const mapDispatchToProps = (dispatch: Function) => ({
  getCoinTypes: () => dispatch(getCoinTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
