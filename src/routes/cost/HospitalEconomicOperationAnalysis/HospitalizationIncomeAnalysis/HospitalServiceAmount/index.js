import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import Iframe from "components/Hia/Iframe";
import classNames from "classnames";
import styles from './index.less';


export default class HospitalServiceAmount extends Component {
  state = {

  };

  testChange = (vals) => {
    console.log(vals);
    // this.getCardList(vals);
  };

  componentDidMount() {

  }

  render() {
    const iframePath = '';

    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          {/*
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
          */}
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
          />

          <div style={{marginTop:'20px'}}>
            <Iframe
              pageSrc={iframePath}
            />
          </div>
        </section>
      </Fragment>
    )
  }
}
