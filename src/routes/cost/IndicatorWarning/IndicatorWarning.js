import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import ColorCard from 'components/Hia/ColorCard';
import classNames from "classnames";
import styles from './styles.less';

@connect(({ indicatorWarning }) => ({
  indicatorWarning
}))
export default class IndicatorWarning extends Component {
  state = {
  };

  //获取卡片列表数据
	getCardList = (req) => {
		this.props.dispatch({
      type: 'indicatorWarning/getCardList',
      payload: {
        filterResult:req
      }
    });
	};

  testChange = (vals) => {
    console.log(vals);
    // this.changeFilter(vals);
  };

  componentDidMount() {
    this.getCardList({});
  }

  render() {
    const { indicatorWarning } = this.props;

    const data = indicatorWarning?indicatorWarning.cardList:[];

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
