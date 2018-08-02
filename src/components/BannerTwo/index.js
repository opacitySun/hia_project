import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

class BannerTwo extends PureComponent {
render() {
	return(
		<div className={styles.twoleveltop}>
			<div className={classNames(styles.center,styles.bgcgjgfx)}>
				<Row className={styles.twoleveltopcontent}>
			    	<Col className={styles.txt} span={12}>
			    		<h2>指标预警</h2>
						<p>
						医改对医院的经营风险、成本管控、运行效率、费用控制方面提出了明确的要求，指标预警时时掌握关键指标是否达标。不达标的指标还能进一步挖掘关键的影响因素。
						</p>
			    	</Col>
			    	<Col className={styles.img} span={12}>
			    		
			    	</Col>
		    	</Row>
			</div>
		</div>
	);
}
}
export default BannerTwo;