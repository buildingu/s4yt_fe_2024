import { connect } from "react-redux";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import React, { useState } from "react";
import s from "./styles.module.css";

const MeetUp: React.FC = () => {
  return (
    <Layout>
      <Content>
        <div className={s.optionsView}>
          <h2>MEET UP</h2>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MeetUp);
