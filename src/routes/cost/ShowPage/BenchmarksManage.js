import React, { PureComponent } from "react";
import { connect } from "dva";
import classNames from "classnames";
import Banner from 'components/Hia/Banner';
import FilterGroup from 'components/Hia/FilterGroup';
import styles from './BenchmarksManage.less';

export default class BenchmarksManage extends PureComponent {
  testChange = (vals) => {
    console.log(vals);
  }

  render() {
    return (
      <div>
        <Banner pathname={this.props.location.pathname} />
        <div className={styles.contentDiv}>
          <div className={styles.showPageDiv}>
            <FilterGroup
              onChange={this.testChange}
              rowTypes={['versionNumber','indexClassification','index']}
            />
          </div>
        </div>
      </div>
    )
  }
}
