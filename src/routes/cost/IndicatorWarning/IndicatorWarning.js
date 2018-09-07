import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import ColorCard from 'components/Hia/ColorCard';
import classNames from "classnames";
import styles from './styles.less';

@connect(({ indicatorWarning, loading }) => ({
  indicatorWarning,
  loading: loading.models.indicatorWarning
}))
export default class IndicatorWarning extends Component {
  state = {
    queryParams: {
      p_year_code: 2018,
      p_month_code: null,
      p_quarter_code: null,
      p_half_year_code: null,
      area_code: null,
      hosp_type_code: null,
      level_code: null,
      belong_to_code: null,
      bed_scale_code: null,
      hospital_code: null,
    },
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
    // this.getCardList(vals);
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
          {/*<Banner pathname={this.props.location.pathname}/>*/}
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onClick={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
          />

          <div style={{marginBottom:'20px'}}>
            <ColorCard data={data} />
          </div>
        </section>
      </Fragment>
    )
  }
}
