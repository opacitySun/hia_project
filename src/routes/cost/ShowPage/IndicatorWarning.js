import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Row,
  Col
} from 'antd';
import FilterGroup from 'components/FilterGroup';
import styles from './IndicatorWarning.less';

@connect(({ filterGroup }) => ({
  filterGroup
}))
export default class IndicatorWarning extends PureComponent {
	handleFilterAdd = (id) => {
		this.props.dispatch({
      type: 'filterGroup/addResultArr',
      payload: {
        id
      }
    });
	};
	handleFilterDel = (id) => {
		this.props.dispatch({
      type: 'filterGroup/delResultArr',
      payload: {
        id
      }
    });
	};
	handleFilterClear = (id) => {
		this.props.dispatch({
      type: 'filterGroup/clearResultArr',
      payload: {
        id
      }
    });
	};

  render() {
    return (
      <div>
        <FilterGroup />
        <Row gutter={16}>
  	      <Col span={8}>
  	        <Card className={`${styles.card} ${styles.cardRed}`}>
  				    <div className="l">
  							<p className="txt1">成本结余率</p>
  							<strong className="num1">19%</strong>
  						</div>
  						<div className="r">
  							<p className="txt2">标杆值</p>
  							<strong className="num2">10%</strong>
  							<i className="line"></i>
  						</div>
  				  </Card>
  	      </Col>
  	      <Col span={8}>
  	        <Card className={`${styles.card} ${styles.cardYellow}`}>
  				    <div className="l">
  							<p className="txt1">成本结余率</p>
  							<strong className="num1">19%</strong>
  						</div>
  						<div className="r">
  							<p className="txt2">标杆值</p>
  							<strong className="num2">10%</strong>
  							<i className="line"></i>
  						</div>
  				  </Card>
  	      </Col>
  	      <Col span={8}>
  	        <Card className={`${styles.card} ${styles.cardBlue}`}>
  				    <div className="l">
  							<p className="txt1">成本结余率</p>
  							<strong className="num1">19%</strong>
  						</div>
  						<div className="r">
  							<p className="txt2">标杆值</p>
  							<strong className="num2">10%</strong>
  							<i className="line"></i>
  						</div>
  				  </Card>
  	      </Col>
  	    </Row>
      </div>
    )
  }
}
