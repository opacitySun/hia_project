import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import classNames from "classnames";
import Banner from 'components/Hia/Banner';
import FilterGroup from 'components/Hia/FilterGroup';
import styles from './IndicatorWarning.less';

@connect(({ cost,loading }) => ({
  cost,
  loading: loading.models.cost
}))
export default class IndicatorWarning extends PureComponent {
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
    return (
    	<div>
      	<Banner pathname={this.props.location.pathname} />
        <div className={styles.contentDiv}>
          <div className={styles.showPageDiv}>
            <FilterGroup
              onChange={this.testChange}
              rowTypes={['timeSelect','region','medicalInstitution']}
            />

            <Row gutter={16} style={{"marginTop":"20px"}}>
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
    	</div>
    )
  }
}
