import s from "./styles.module.css";

interface Props {}

const Instagram: React.FC<Props> = () => {
  return (
    <section className={s.interactions}>
      <h2>
        Instagram
        <br /> Interactions
      </h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1/14/2024</td>
            <td>description</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Instagram;
