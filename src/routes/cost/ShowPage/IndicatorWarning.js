import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List } from 'antd';
import classNames from "classnames";
import BannerTwo from 'components/BannerTwo';
import FilterGroup from 'components/FilterGroup';
import styles from './IndicatorWarning.less';

@connect(({ filterGroup,cost,loading }) => ({
  filterGroup
}))
export default class IndicatorWarning extends PureComponent {
  state = {
    regionOptions:[
      {
        value: 'beijing',
        label: '北京',
        isLeaf: false
      }
    ]
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

  regionLoadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          "label":"朝阳区",
          "value":"region1"
        },
        {
          "label":"海淀区",
          "value":"region2"
        },
        {
          "label":"西城区",
          "value":"region3"
        },
        {
          "label":"东城区",
          "value":"region4"
        },
        {
          "label":"崇文区",
          "value":"region5"
        },
        {
          "label":"宣武区",
          "value":"region6"
        },
        {
          "label":"丰台区",
          "value":"region7"
        },
        {
          "label":"石景山区",
          "value":"region8"
        },
        {
          "label":"门头沟",
          "value":"region9"
        },
        {
          "label":"房山区",
          "value":"region10"
        },
        {
          "label":"通州区",
          "value":"region11"
        },
        {
          "label":"大兴区",
          "value":"region12"
        },
        {
          "label":"顺义区",
          "value":"region13"
        },
        {
          "label":"怀柔区",
          "value":"region14"
        },
        {
          "label":"密云区",
          "value":"region15"
        },
        {
          "label":"昌平区",
          "value":"region16"
        },
        {
          "label":"平谷区",
          "value":"region17"
        },
        {
          "label":"延庆县",
          "value":"region18"
        }
      ];
      this.setState({
        regionOptions: [...this.state.regionOptions],
      });
    }, 500);
  };

  regionOnChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  //获取区域
  queryRegion = () => {
    this.props.dispatch({
      type: 'filterGroup/queryReg'
    });
  }
  //获取医疗机构
  queryMedicalInstitution = () => {
    this.props.dispatch({
      type: 'filterGroup/queryMedicalInstitution'
    });
  }

  componentDidMount() {
    // this.queryRegion();
    this.queryMedicalInstitution();
  }

  render() {
    const { filterGroup } = this.props;

    const timeSelect = {
      "type":[
        {
          "name":"年",
          "value":"0"
        },
        {
          "name":"半年",
          "value":"1"
        },
        {
          "name":"季度",
          "value":"2"
        },
        {
          "name":"月",
          "value":"3"
        }
      ],
      "data":[
        [
          {
            "name":"2018年",
            "value":"timeType0"
          },
          {
            "name":"2017年",
            "value":"timeType1"
          }
        ],
        [
          {
            "name":"上半年",
            "value":"timeType2"
          },
          {
            "name":"下半年",
            "value":"timeType3"
          }
        ],
        [
          {
            "name":"1季度",
            "value":"timeType4"
          },
          {
            "name":"2季度",
            "value":"timeType5"
          },
          {
            "name":"3季度",
            "value":"timeType6"
          },
          {
            "name":"4季度",
            "value":"timeType7"
          }
        ],
        [
          {
            "name":"1月",
            "value":"timeType8"
          },
          {
            "name":"2月",
            "value":"timeType9"
          }
        ]
      ]
    };

    const medicalInstitution = [
      {
        "key":"hospitalType",
        "name":"医院类型",
        "data":filterGroup.hospitalType || []
      },
      {
        "key":"bedRange",
        "name":"床位范围",
        "data":filterGroup.bedRange || []
      },
      {
        "key":"hospitalGrade",
        "name":"医院等级",
        "data":filterGroup.hospitalGrade || []
      },
      {
        "key":"belonged",
        "name":"所属",
        "data":filterGroup.belonged || []
      },
      {
        "key":"hospital",
        "name":"医院",
        "data":filterGroup.hospital || []
      }
    ];

    return (
    	<div>
      	<BannerTwo />
        <div className={styles.contentDiv}>
          <div className={styles.showPageDiv}>
            <FilterGroup
              onChange={this.testChange}
              rowTypes={['timeSelect','region','medicalInstitution']}
              timeSelect={timeSelect}
              region={this.state.regionOptions}
              regionLoadData={this.regionLoadData}
              regionOnChange={this.regionOnChange}
              medicalInstitution={medicalInstitution}
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
