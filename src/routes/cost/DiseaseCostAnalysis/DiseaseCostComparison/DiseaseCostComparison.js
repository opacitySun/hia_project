import React, { Component, Fragment } from 'react';
import {Tabs} from 'antd';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import HospitalComparison from './HospitalComparison/index';
import RegionComparison from './RegionComparison/index';
import StyleComparison from './StyleComparison/index';
import GradeComparison from './GradeComparison/index';
import styles from './styles.less';

const TabPane = Tabs.TabPane;

export default class DiseaseCostComparison extends Component {
  state = {
    filterResult:{}
  };

  callback = (key)=>{
    console.log(key);
  }

  changeFilterResult = (res) => {
    this.setState({
      filterResult:res
    });
  }

  render() {

    return (
      <Fragment>
        <section className={styles['two-level-top']}>
        {/*
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
          */}
        </section>
        <section className={styles['two-level-content']}>
          <div className={styles.tabs}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="院间对比" key="1"><HospitalComparison filterResult={this.state.filterResult} /></TabPane>
              <TabPane tab="区域对比" key="2"><RegionComparison filterResult={this.state.filterResult} /></TabPane>
              <TabPane tab="类型对比" key="3"><StyleComparison filterResult={this.state.filterResult} /></TabPane>
              <TabPane tab="等级对比" key="4"><GradeComparison filterResult={this.state.filterResult} /></TabPane>
            </Tabs>
          </div>
        </section>
      </Fragment>
    )
  }
}
