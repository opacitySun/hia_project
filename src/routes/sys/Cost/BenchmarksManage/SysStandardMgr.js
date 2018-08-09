import React from 'react';
import {Tabs} from 'antd';
import SysHospitalStandardMgr from './SysHospitalStandardMgr'
import SysDepartmentStandardMgr from './SysDepartmentStandardMgr'

const TabPane = Tabs.TabPane;

export default class SysStandardMgr extends React.Component {

  callback = (key)=>{
    console.log(key);
  }

  render() {

    return (
    	<div>
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="医院标杆值管理" key="1"><SysHospitalStandardMgr /></TabPane>
        <TabPane tab="科室标杆值管理" key="2">22222</TabPane>
      </Tabs>
      </div>
    )
  }
}
