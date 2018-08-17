import React from 'react';
import {Tabs} from 'antd';
import Banner from 'components/Hia/Banner';
import HospitalStandardMgr from './hospitalStandardMgr/HospitalStandardMgr'
import DepartmentStandardMgr from './departmentStandardMgr/DepartmentStandardMgr'
import styles from './styles.less';
const {TabPane} = Tabs;

export default class StandardMgr extends React.Component {

  render() {
    return (
      <div>
        <Banner pathname={this.props.location.pathname} />
        <div className={styles.tabs}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="医院标杆值管理" key="1"><HospitalStandardMgr /></TabPane>
            <TabPane tab="科室标杆值管理" key="2"><DepartmentStandardMgr /></TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
