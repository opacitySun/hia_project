import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import classNames from "classnames";
import FilterGroup from 'components/FilterGroup';
import styles from './IndicatorWarning.less';

@connect(({ filterGroup }) => ({
  filterGroup
}))
export default class IndicatorWarning extends PureComponent {
	changeFilter = (vals) => {
		this.props.dispatch({
      type: 'filterGroup/changeResultArr',
      payload: {
        vals
      }
    });
	};
  testChange = (vals) => {
    console.log(vals);
  }

  render() {
    return (
      <div className={styles.contentDiv}>
        <div className={styles.showPageDiv}>
          <FilterGroup onChange={this.testChange} rowTypes={['timeSelect','region','medicalInstitution']} />

          <Row gutter={16} style={{"margin-top":"20px"}}>
            <Col span={8}>
              <Card className={classNames(styles.card,styles.cardRed)}>
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
              <Card className={classNames(styles.card,styles.cardYellow)}>
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
              <Card className={classNames(styles.card,styles.cardBlue)}>
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
      </div>
    )
  }
}
