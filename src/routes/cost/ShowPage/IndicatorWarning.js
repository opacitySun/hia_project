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

    const regionJsonData = [
      {
        "name":"朝阳区",
        "value":"region1"
      },
      {
        "name":"海淀区",
        "value":"region2"
      },
      {
        "name":"西城区",
        "value":"region3"
      },
      {
        "name":"东城区",
        "value":"region4"
      },
      {
        "name":"崇文区",
        "value":"region5"
      },
      {
        "name":"宣武区",
        "value":"region6"
      },
      {
        "name":"丰台区",
        "value":"region7"
      },
      {
        "name":"石景山区",
        "value":"region8"
      },
      {
        "name":"门头沟",
        "value":"region9"
      },
      {
        "name":"房山区",
        "value":"region10"
      },
      {
        "name":"通州区",
        "value":"region11"
      },
      {
        "name":"大兴区",
        "value":"region12"
      },
      {
        "name":"顺义区",
        "value":"region13"
      },
      {
        "name":"怀柔区",
        "value":"region14"
      },
      {
        "name":"密云区",
        "value":"region15"
      },
      {
        "name":"昌平区",
        "value":"region16"
      },
      {
        "name":"平谷区",
        "value":"region17"
      },
      {
        "name":"延庆县",
        "value":"region18"
      }
    ];

    const medicalInstitution = {
      "hospitalType":[
        {
          "name":"综合医院",
          "value":"hospitalType1"
        },
        {
          "name":"中医医院",
          "value":"hospitalType2"
        },
        {
          "name":"中西医结合医院",
          "value":"hospitalType3"
        },
        {
          "name":"民族医院",
          "value":"hospitalType4"
        },
        {
          "name":"专科医院",
          "value":"hospitalType5"
        },
        {
          "name":"口腔医院",
          "value":"hospitalType6"
        },
        {
          "name":"眼科医院",
          "value":"hospitalType7"
        },
        {
          "name":"耳鼻喉科医院",
          "value":"hospitalType8"
        },
        {
          "name":"肿瘤医院",
          "value":"hospitalType9"
        },
        {
          "name":"心血管病医院",
          "value":"hospitalType10"
        },
        {
          "name":"胸科医院",
          "value":"hospitalType11"
        },
        {
          "name":"血液病医院",
          "value":"hospitalType12"
        },
        {
          "name":"妇产（科）医院",
          "value":"hospitalType13"
        },
        {
          "name":"儿童医院",
          "value":"hospitalType14"
        },
        {
          "name":"精神病医院",
          "value":"hospitalType15"
        },
        {
          "name":"传染病医院",
          "value":"hospitalType16"
        },
        {
          "name":"皮肤病医院",
          "value":"hospitalType17"
        },
        {
          "name":"结核病医院",
          "value":"hospitalType18"
        },
        {
          "name":"麻风病医院",
          "value":"hospitalType19"
        },
        {
          "name":"职业病医院",
          "value":"hospitalType20"
        },
        {
          "name":"骨科医院",
          "value":"hospitalType21"
        },
        {
          "name":"康复医院",
          "value":"hospitalType22"
        },
        {
          "name":"整形外科医院",
          "value":"hospitalType23"
        },
        {
          "name":"美容医院",
          "value":"hospitalType24"
        },
        {
          "name":"其他专科医院",
          "value":"hospitalType25"
        },
        {
          "name":"护理院",
          "value":"hospitalType26"
        }
      ],
      "bedRange":[
        {
          "name":"1500及以上",
          "value":"bedRange1"
        },
        {
          "name":"1000（含）-1500",
          "value":"bedRange2"
        },
        {
          "name":"500（含）-1000",
          "value":"bedRange3"
        },
        {
          "name":"500以下",
          "value":"bedRange4"
        }
      ],
      "hospitalGrade":[
        {
          "name":"三级甲等",
          "value":"hospitalGrade1"
        },
        {
          "name":"三级乙等",
          "value":"hospitalGrade2"
        },
        {
          "name":"二级甲等",
          "value":"hospitalGrade3"
        },
        {
          "name":"二级乙等",
          "value":"hospitalGrade4"
        }
      ],
      "belonged":[
        {
          "name":"部署医院",
          "value":"belonged1"
        },
        {
          "name":"省（直辖市）级医院",
          "value":"belonged2"
        },
        {
          "name":"地级市医院",
          "value":"belonged3"
        },
        {
          "name":"县级医院",
          "value":"belonged4"
        }
      ],
      "hospital":[
        {
          "name":"广东省中医院",
          "value":"hospital1"
        },
        {
          "name":"北京中日医院",
          "value":"hospital2"
        },
        {
          "name":"北京同仁医院",
          "value":"hospital3"
        },
        {
          "name":"上海中医医院",
          "value":"hospital4"
        },
        {
          "name":"深圳附属医院",
          "value":"hospital5"
        }
      ]
    };

    return (
      <div className={styles.contentDiv}>
        <div className={styles.showPageDiv}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
            timeSelect={timeSelect}
            region={regionJsonData}
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
    )
  }
}
