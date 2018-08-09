import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon, Cascader } from 'antd';
import classNames from 'classnames';
import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ filterGroup,loading }) => ({
  filterGroup,
  loading: loading.models.filterGroup
}))
class FilterGroup extends PureComponent {
  state = {
    regionOptions:[
      {
        value: 'beijing',
        label: '北京',
        isLeaf: false
      }
    ],
    //日期类型
    timeType:0,
    //筛选结果列表
    timeSelect:[],
    region:[],
    hospitalType:'',
    bedRange:'',
    hospitalGrade:'',
    belonged:'',
    hospital:'',
    versionNumber:[],
    indexClassification:[],
    index:[]
  };

  componentWillMount() {
    this.queryMedicalInstitution();
  }

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
  //区域
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
  }
  regionOnChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }

  //监听下拉框值的改变
  handleSelectOption = (value,option) => {
    switch(option.props.type){
      case 'hospitalType':
        this.setState({
          hospitalType: value
        });
        this.submitFilterResult('hospitalType',value);
        break;
      case 'bedRange':
        this.setState({
          bedRange: value
        });
        this.submitFilterResult('bedRange',value);
        break;
      case 'hospitalGrade':
        this.setState({
          hospitalGrade: value
        });
        this.submitFilterResult('hospitalGrade',value);
        break;
      case 'belonged':
        this.setState({
          belonged: value
        });
        this.submitFilterResult('belonged',value);
        break;
      case 'hospital':
        this.setState({
          hospital: value
        });
        this.submitFilterResult('hospital',value);
        break;
    }
  };

  //监听日期的改变
  changeTimeSelect = (value) => {
    this.setState({
      timeSelect: value
    });
    this.submitFilterResult('timeSelect',value);
  };

  //监听版本号的改变
  changeVersionNumber = (value) => {
    this.setState({
      versionNumber: value
    });
    this.submitFilterResult('versionNumber',value);
  };

  //监听指标分类的改变
  changeIndexClassification = (value) => {
    this.setState({
      indexClassification: value
    });
    this.submitFilterResult('indexClassification',value);
  };

  //监听指标的改变
  changeIndex = (value) => {
    this.setState({
      index: value
    });
    this.submitFilterResult('index',value);
  };

  //监听日期选择下拉框，并显示下拉框值对应的列表
  selectTimeType = (value) => {
    this.setState({
      timeType: parseInt(value)
    });
  };

  //获取筛选结果的value,并暴露给外部onChange
  submitFilterResult = (_type,_res) => {
    const { onChange } = this.props;
    let filterResult = {};
    filterResult['timeSelect'] = this.state.timeSelect;
    filterResult['region'] = this.state.region;
    filterResult['hospitalType'] = this.state.hospitalType;
    filterResult['bedRange'] = this.state.bedRange;
    filterResult['hospitalGrade'] = this.state.hospitalGrade;
    filterResult['belonged'] = this.state.belonged;
    filterResult['hospital'] = this.state.hospital;
    filterResult['versionNumber'] = this.state.versionNumber;
    filterResult['indexClassification'] = this.state.indexClassification;
    filterResult['index'] = this.state.index;
    switch(_type){
      case 'timeSelect':
        filterResult['timeSelect'] = _res;
        break;
      case 'hospitalType':
        filterResult['hospitalType'] = _res;
        break;
      case 'bedRange':
        filterResult['bedRange'] = _res;
        break;
      case 'hospitalGrade':
        filterResult['hospitalGrade'] = _res;
        break;
      case 'belonged':
        filterResult['belonged'] = _res;
        break;
      case 'hospital':
        filterResult['hospital'] = _res;
        break;
      case 'versionNumber':
        filterResult['versionNumber'] = _res;
        break;
      case 'indexClassification':
        filterResult['indexClassification'] = _res;
        break;
      case 'index':
        filterResult['index'] = _res;
        break;
    }
    if (onChange) {
      onChange(filterResult);
    }
  }

  render() {
    const self = this;
    const {
      rowTypes,
      filterGroup
    } = this.props;

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

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    //日期选择
    const timeSelectType = (timeSelect && timeSelect.type && timeSelect.type instanceof Array)?timeSelect.type.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):null;
    //医疗机构
    const medicalInstitutionData = (medicalInstitution && medicalInstitution instanceof Array)?medicalInstitution.map(function(_items){
      let item = (_items.data && _items.data instanceof Array)?_items.data.map(function(_item){
        switch(_items.key){
          case 'hospitalType':
            return (
              <Option key={_item.hospitalTypeCode} value={_item.hospitalTypeCode} type="hospitalType">{_item.hospitalTypeName}</Option>
            )
            break;
          case 'bedRange':
            return (
              <Option key={_item.bedScopeCode} value={_item.bedScopeCode} type="bedRange">{_item.bedScopeName}</Option>
            )
            break;
          case 'hospitalGrade':
            return (
              <Option key={_item.hospitalLevelCode} value={_item.hospitalLevelCode} type="hospitalGrade">{_item.hospitalLevelName}</Option>
            )
            break;
          case 'belonged':
            return (
              <Option key={_item.hospitalBelongCode} value={_item.hospitalBelongCode} type="belonged">{_item.hospitalBelongName}</Option>
            )
            break;
          case 'hospital':
            return (
              <Option key={_item.hospitalCode} value={_item.hospitalCode} type="hospital">{_item.hospitalName}</Option>
            )
            break;
        }
      }):null;
      return (
        <Select
          key={_items.key}
          onChange={self.handleSelectOption}
          placeholder={_items.name}
          style={{ maxWidth: 200, width: '100%' }}
        >
          {item}
        </Select>
      )
    }):null;
    const medicalInstitutionHTML =
    <Row gutter={16}>
      {medicalInstitutionData}
    </Row>;
    //版本号
    const versionNumberData = (versionNumber && versionNumber instanceof Array)?versionNumber.map(function(_item){
      return (
        <TagSelect.Option key={_item.value} value={_item.value}>{_item.name}</TagSelect.Option>
      )
    }):null;
    //指标分类
    const indexClassificationData = (indexClassification && indexClassification instanceof Array)?indexClassification.map(function(_item){
      return (
        <TagSelect.Option key={_item.value} value={_item.value}>{_item.name}</TagSelect.Option>
      )
    }):null;
    //指标
    const indexData = (index && index instanceof Array)?index.map(function(_item){
      return (
        <TagSelect.Option key={_item.value} value={_item.value}>{_item.name}</TagSelect.Option>
      )
    }):null;

    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline">
            {
              rowTypes.map(function(_rowTypes,_rowIndex){
                switch(_rowTypes){
                  case 'timeSelect':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="日期" grid last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <Row gutter={16}>
                          <Col lg={6} md={10} sm={10} xs={24}>
                            <FormItem {...formItemLayout}>
                                <Select
                                  onChange={self.selectTimeType}
                                  defaultValue="0"
                                  style={{ maxWidth: 200, width: '100%' }}
                                >
                                  {timeSelectType}
                                </Select>
                            </FormItem>
                          </Col>
                          <Col lg={18} md={14} sm={14} xs={24}>
                            <FormItem>
                              {
                                (timeSelect && timeSelect.data)?timeSelect.data.map(function(_items,_index){
                                  const item = _items.map(function(_item){
                                    return (
                                      <TagSelect.Option key={_item.value} value={_item.value}>{_item.name}</TagSelect.Option>
                                    )
                                  });
                                  return (
                                    (self.state.timeType == _index)?
                                      <TagSelect key={_index} onChange={self.changeTimeSelect}>
                                        {item}
                                      </TagSelect>
                                    :null
                                  )
                                }):null
                              }
                            </FormItem>
                          </Col>
                        </Row>
                      </StandardFormRow>
                    );
                    break;
                  case 'region':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="区域" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Cascader
                            options={self.state.regionOptions}
                            loadData={self.regionLoadData}
                            onChange={self.regionOnChange}
                            changeOnSelect
                          />
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'medicalInstitution':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="医疗机构" grid last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        {medicalInstitutionHTML}
                      </StandardFormRow>
                    );
                    break;
                  case 'versionNumber':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="版本号" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeVersionNumber}>
                            {versionNumberData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'indexClassification':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标分类" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeIndexClassification} expandable>
                            {indexClassificationData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'index':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeIndex} expandable>
                            {indexData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                }
              })
            }
          </Form>
        </Card>
      </div>
    )
  }
}

export default FilterGroup;