import React, { Component, Fragment } from 'react';
import { Modal, Button, Icon } from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import StandardCorrespondence from './StandardCorrespondence';
import styles from './styles.less';
import iconBalance from '../../../assets/balance.png';

export default class StandardManage extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  testChange = (vals) => {
    console.log(vals);
  }

  render() {
    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
          <div className={styles.HiaTabsModalBtn} onClick={this.showModal}>
            <img src={iconBalance} />
            标杆值对应关系
          </div>
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['versionNumber','indexClassification','index']}
          />

          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="1170px"
            footer={null}
          >
            <StandardCorrespondence />
          </Modal>
        </section>
      </Fragment>
    )
  }
}
