import usePagination from "@hooks/usePagination";

import s from "./styles.module.css";

interface Props {
  data: {
    name: string;
    logo: any;
    winners: {
      items: [];
      main: {
        address: string;
        name: string;
        prize: string;
      };
      mentions: [];
    };
  };
}

const Winners: React.FC<Props> = ({ data }) => {
  const {
    currentItems,
  } = usePagination({ data: data.winners.items, maxPerPage: 2 });
  return (
    <>
      <div className={s.resultDisplayTop}>
        <img src={data.logo} alt={data?.name || "others"} />
        <ul>
          <li>
            <p>
              {`${
                data.winners.main.prize
                  ? data.winners.main.prize + " prize awarded to:"
                  : "No winner"
              } `}
            </p>

            <h3>{data.winners.main.name}</h3>

            <p>{data.winners.main.address}</p>
          </li>
          {data.winners.mentions?.map((mention: any, index: any) => {
            return (
              <li key={index}>
                Honourable mention: {mention.name} {mention.address}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={s.resultDisplayBottom}>
        {currentItems.length > 0 &&
          currentItems.map((item, index) => {
            return (
              <div className={s.partnerRaffleItems} key={index}>
                <img src={item.logo} alt={item.itemName} />
                <div>
                  <p>{item.winnerName}</p>
                  <p>{item.itemName}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Winners;
