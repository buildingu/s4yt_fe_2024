import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import s from "./styles.module.css";

interface Props {}

const Raffle: React.FC<Props> = ({}) => {
  return (
    <Layout addFeather="right2">
      <Header />
      <Content>
        <Link to="/sponsors">back</Link>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
