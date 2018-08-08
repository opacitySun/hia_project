import React from 'react';
import {Tabs} from 'antd';
import HospitalStandardMgr from './HospitalStandardMgr'
import DepartmentStandardMgr from './DepartmentStandardMgr'
import Banner from 'components/Hia/Banner';

const TabPane = Tabs.TabPane;

export default class StandardMgr extends React.Component {

  callback = (key)=>{
    console.log(key);
  }

  render() {

    return (
    	<div>
    	<Banner pathname={this.props.location.pathname} />
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="医院标杆值管理" key="1"><HospitalStandardMgr /></TabPane>
        <TabPane tab="科室标杆值管理" key="2"><DepartmentStandardMgr /></TabPane>
      </Tabs>
      </div>
    )
  }
}
