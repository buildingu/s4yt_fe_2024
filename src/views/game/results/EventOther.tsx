import s from "./styles.module.css";

interface Props {
  data: {
    items: [
      {
        itemName: string;
        logo: any;
        winners: [
          {
            winnerName: string;
            address: string;
          }
        ];
      }
    ];
    logo: any;
    name: string;
  };
}

const Other: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <ul className={s.otherContainer}>
      {data.items?.map((item, index) => {
        return (
          <li key={index}>
            <img src={item.logo} alt={item.itemName} />
            <div className={s.winnerContainer}>
              {item.winners?.map((winner, index) => {
                return (
                  <div className={s.singleWinner} key={index}>
                    <p>{winner.winnerName}</p>
                    <address>{winner.address}</address>
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
