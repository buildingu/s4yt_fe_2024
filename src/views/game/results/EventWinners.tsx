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
  console.log(data);
  return (
    <div>
      <div className={s.resultDisplayTop}>
        <img src={data.logo} alt={data?.name || "others"} />
        <ul>
          <li>{data.winners.main.name}</li>
          {data.winners.mentions?.map((mention: any, index: any) => {
            return (
              <li key={index}>
                {mention.name}, {mention.address}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={s.resultDisplayBottom}></div>
    </div>
  );
};

export default Winners;
