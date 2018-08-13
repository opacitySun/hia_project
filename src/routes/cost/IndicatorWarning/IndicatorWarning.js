import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import ColorCard from 'components/Hia/ColorCard';
import classNames from "classnames";
import styles from './styles.less';

@connect(({ cost,loading }) => ({
  cost,
  loading: loading.models.cost
}))
export default class IndicatorWarning extends Component {
  state = {
  };

	changeFilter = (vals) => {
		this.props.dispatch({
      type: 'cost/changeResultArr',
      payload: {
        filterResult:vals
      }
    });
	};

  testChange = (vals) => {
    console.log(vals);
    // this.changeFilter(vals);
  };

  render() {
    const data = [
      {
        "type":0,
        "color":"red",
        "cardLeft":{
          "name":"成本结余率",
          "value":"19%"
        },
        "cardRight":{
          "name":"标杆值",
          "value":"10%"
        }
      },
      {
        "type":0,
        "color":"yellow",
        "cardLeft":{
          "name":"成本结余率",
          "value":"19%"
        },
        "cardRight":{
          "name":"标杆值",
          "value":"10%"
        }
      }
    ];

    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          <Banner pathname={this.props.location.pathname}/>
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onClick={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
          />

          <ColorCard data={data} />
        </section>
      </Fragment>
    )
  }
}
