import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class ColorCard extends PureComponent {
  state = {
    divDisplay:'none'
  };

  render() {
    const { data } = this.props;

    const cardData = data.map(function(_item){
      let cardClass = classNames(styles.card,styles.cardRed);
      switch(_item.color){
        case 'red':
          cardClass = classNames(styles.card,styles.cardRed);
          break;
        case 'yellow':
          cardClass = classNames(styles.card,styles.cardYellow);
          break;
        case 'blue':
          cardClass = classNames(styles.card,styles.cardBlue);
          break;
      }
      return (
        <Col span={8}>
          <Card className={cardClass}>
            <div className="l">
              <p className="txt1">{_item.cardLeft.name}</p>
              <strong className="num1">{_item.cardLeft.value}</strong>
            </div>
            <div className="r">
              <p className="txt2">{_item.cardRight.name}</p>
              <strong className="num2">{_item.cardRight.value}</strong>
              <i className="line"></i>
            </div>
          </Card>
        </Col>
      )
    });



    return (
      <div>
        <Row gutter={16} style={{"marginTop":"20px"}}>
          {cardData}
        </Row>
        <div className={styles.cardBottomDiv} style={{display:this.state.divDisplay}}>
        </div>
      </div>
    );
  }
}
