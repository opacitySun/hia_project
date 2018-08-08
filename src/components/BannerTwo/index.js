import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon } from 'antd';
import classNames from 'classnames';
import config from './typeConfig';
import styles from './index.less';

class BannerTwo extends PureComponent {
	render(){
		const { title, desc, img ,type} = this.props;
		return(
				<div>
					<div className={styles.twoleveltop}>
						<div className={classNames(styles.center,styles.bgcgjgfx)}>
							<Row className={styles.twoleveltopcontent}>
						    	<Col className={styles.txt} span={12}>
						    		<h2>{title || config[type].title}</h2>
			        				<p className={styles.desc}>{desc || config[type].desc}</p>
						    	</Col>
						    	<Col className={styles.img} span={12}>
						    		<div
							          className={styles.imgEle}
							          style={{ backgroundImage: `url(${img || config[type].img})` }}
							        />
						    	</Col>
					    	</Row>
						</div>
					</div>
				</div>
			)
	}
}
export default BannerTwo;