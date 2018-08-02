import React, { PureComponent } from "react";
import { connect } from "dva";
import classNames from "classnames";
import FilterGroup from 'components/FilterGroup';
import styles from './BenchmarksManage.less';

export default class BenchmarksManage extends PureComponent {
  testChange = (vals) => {
    console.log(vals);
  }

  render() {
    const versionNumber = [
      {
        "name":"三级医院1.0",
        "value":"versionNumber1"
      },
      {
        "name":"二级医院1.0",
        "value":"versionNumber2"
      }
    ];

    const indexClassification = [
      {
        "name":"经验风险",
        "value":"indexClassification1"
      },
      {
        "name":"成本管控",
        "value":"indexClassification2"
      },
      {
        "name":"运行效率",
        "value":"indexClassification3"
      },
      {
        "name":"费用控制",
        "value":"indexClassification4"
      }
    ];

    const index = [
      {
        "name":"收支结余率",
        "value":"index1"
      },
      {
        "name":"资产负债率",
        "value":"index2"
      },
      {
        "name":"成本控制率",
        "value":"index3"
      },
      {
        "name":"百万元固定资产服务量",
        "value":"index4"
      },
      {
        "name":"百万元专用设备服务量",
        "value":"index5"
      },
      {
        "name":"床位周转次数",
        "value":"index6"
      },
      {
        "name":"门急诊次均费用",
        "value":"index7"
      },
      {
        "name":"门急诊次均费用变动率",
        "value":"index8"
      },
      {
        "name":"出院病人例均费用",
        "value":"index9"
      },
      {
        "name":"出院病人例均费用变动率",
        "value":"index10"
      },
      {
        "name":"门急诊人均药品费用变动率",
        "value":"index11"
      },
      {
        "name":"每出院病人耗材费用变动率",
        "value":"index12"
      }
    ];

    return (
      <div className={styles.contentDiv}>
        <div className={styles.showPageDiv}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['versionNumber','indexClassification','index']}
            versionNumber={versionNumber}
            indexClassification={indexClassification}
            index={index}
          />
        </div>
      </div>
    )
  }
}
