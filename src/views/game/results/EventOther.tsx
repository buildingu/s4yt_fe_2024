import { RaffleItem } from "@reducers/getRaffleWinners";
import s from "./styles.module.css";

interface Props {
  data: any;
}
const Other: React.FC<Props> = ({ data }) => {
  return (
    <ul className={s.otherContainer}>
      {data.items.map((item: any, index: any) => {
        return (
          <li key={index}>
            <div className={s.otherImageContainer}>
              <img src={item.logo} alt={item.name} />
              <img
                className={s.partnerLogo}
                src={item.partnerLogo}
                alt={"Sponsor Logo"}
              />
            </div>
            <div className={s.winnerContainer}>
              {item.winners.map((winner: any, index: number) => {
                return (
                  <div className={s.singleWinner} key={index}>
                    <h3>{winner.name}</h3>
                    <address>
                        {winner.country},
                        {winner.region}
                    </address>
                  </div>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Other;
