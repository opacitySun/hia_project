import React, { Component } from 'react';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import styles from './index.less';

export default class RevenueGrowthAnalysis extends Component {
  render() {
    return (
      <section className={styles['two-level-top']}>
        <Banner pathname={this.props.location.pathname}/>
        <HiaTabs pathname={this.props.location.pathname}/>
      </section>);
  }
}
