import React from 'react';
import {Tabs} from 'antd';
import Banner from 'components/Hia/Banner';
import HospitalStandardMgr from './hospitalStandardMgr/HospitalStandardMgr'
import DepartmentStandardMgr from './departmentStandardMgr/DepartmentStandardMgr'

const TabPane = Tabs.TabPane;

export default class StandardMgr extends React.Component {

  render() {
    return (
      <div>
        <Banner pathname={this.props.location.pathname} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="医院标杆值管理" key="1"><HospitalStandardMgr /></TabPane>
          <TabPane tab="科室标杆值管理" key="2"><DepartmentStandardMgr /></TabPane>
        </Tabs>
      </div>
    )
  }
}
