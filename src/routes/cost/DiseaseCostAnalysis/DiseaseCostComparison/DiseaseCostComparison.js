import React, { Component, Fragment } from 'react';
import {Tabs} from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import HospitalComparison from './HospitalComparison';
import RegionComparison from './RegionComparison';
import StyleComparison from './StyleComparison';
import GradeComparison from './GradeComparison';
import styles from './styles.less';

const TabPane = Tabs.TabPane;

export default class DiseaseCostComparison extends Component {

  callback = (key)=>{
    console.log(key);
  }

  render() {

    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
          />

          <div className={styles.tabs}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="院间对比" key="1"><HospitalComparison /></TabPane>
              <TabPane tab="区域对比" key="2"><RegionComparison /></TabPane>
              <TabPane tab="类型对比" key="3"><StyleComparison /></TabPane>
              <TabPane tab="等级对比" key="4"><GradeComparison /></TabPane>
            </Tabs>
          </div>
        </section>
      </Fragment>
    )
  }
}
