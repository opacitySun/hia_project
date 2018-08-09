import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import { bannerConfig } from './bannerConfig';
import { findChar } from '../../../utils/utils';

export default class Banner extends PureComponent {

  render() {
    // 根据url获取一级url
    const index = findChar(this.props.pathname, '/', 2);
    const pathname = this.props.pathname.substring(0, index);
    const bannerData = bannerConfig[pathname];

    return (
      <div className={styles.twoleveltop}>
        <div className={classNames(styles.center, styles.bgcgjgfx)}>
          <Row className={styles.twoleveltopcontent}>
            <Col className={styles.txt} span={12}>
              <h2>{bannerData.title}</h2>
              <p>
                {bannerData.content}
              </p>
            </Col>
            <Col className={classNames(styles.img, styles[bannerData.imageName])} span={12}/>
          </Row>
        </div>
      </div>
    );
  }
}
