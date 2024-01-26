import { Dispatch } from "redux";
import { connect } from "react-redux";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";

import s from "./styles.module.css";

interface Props {}

const Results: React.FC<Props> = () => {
  return (
    <Layout>
      <Header title="Event Results" />
      <Content addCoins="coins3" addFeather="left"></Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // getWinners?
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
