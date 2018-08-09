import React from 'react';
import {Tabs} from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HospitalComparison from './HospitalComparison';
import RegionComparison from './RegionComparison';
import StyleComparison from './StyleComparison';
import GradeComparison from './GradeComparison';
import HiaStyles from '../../../../utils/hia.less';

const TabPane = Tabs.TabPane;

export default class DiseaseCostComparison extends React.Component {

  callback = (key)=>{
    console.log(key);
  }

  render() {

    return (
      <div>
        <Banner pathname={this.props.location.pathname} />
        <div className={HiaStyles.contentDiv}>
          <div className={HiaStyles.showPageDiv}>
            <FilterGroup
              onChange={this.testChange}
              rowTypes={['timeSelect','region','medicalInstitution']}
            />

            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="院间对比" key="1"><HospitalComparison /></TabPane>
              <TabPane tab="区域对比" key="2"><RegionComparison /></TabPane>
              <TabPane tab="类型对比" key="3"><StyleComparison /></TabPane>
              <TabPane tab="等级对比" key="4"><GradeComparison /></TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
