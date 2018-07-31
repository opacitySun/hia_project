import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TagSelect from 'components/TagSelect';
import AvatarList from 'components/AvatarList';
import Ellipsis from 'components/Ellipsis';
import StandardFormRow from 'components/StandardFormRow';

import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

class FilterGroup extends PureComponent {
  state = {
    //日期类型
    timeType:0,
    //筛选结果列表
    filterResult:[]
  };

  handleSelectOption = (value,option) => {
    const resultChild =
    <li value={option.props.value}>
      <span>{option.props.children}</span>
      <span onClick={this.delResult} className={styles.closeBtn}><Icon type="close" /></span>
    </li>;
    this.setState({
      filterResult: this.state.filterResult.concat(resultChild)
    });
  };

  changeTagSelect = (value) => {
    const self = this;
    const resultChild = value.map(function(_v){
      return (
        <li value={_v.value}>
          <span>{_v.name}</span>
          <span onClick={self.delResult} className={styles.closeBtn}><Icon type="close" /></span>
        </li>
      )
    });
    const newResult = this.state.filterResult.concat(resultChild);
    this.setState({
      filterResult: self.removeRepetitionResult(newResult)
    });
  };

  //filterResult去重
  removeRepetitionResult = (result) => {
    let len = result.length;
    for(let i = 0; i < len; i++){
      for(let j = i + 1; j < len; j++){
        if(result[i].props.value == result[j].props.value){
          result.splice(j,1);
          len--;
          j--;
        }
      }
    }
    return result;
  }

  selectTimeType = (value) => {
    this.setState({
      timeType: parseInt(value)
    });
  };

  //清空条件功能
  clearResult = () => {
    this.setState({
      filterResult: []
    });
  };

  //把相关value值的li从filterResult中筛选出去
  delResult = e => {
    let _target = e.target;
    const val = _target.parentNode.parentNode.getAttribute('value');
    this.setState({
      filterResult: this.state.filterResult.filter((_, i) => _.props.value !== val)
    });
  };

  render() {
    const { rowTypes } = this.props;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const timeSelectJsonData = [
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
    ];
    const timeSelectData = timeSelectJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });

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
    const regionData = regionJsonData.map(function(_item){
      const val = {"value":_item.value,"name":_item.name};
      return (
        <TagSelect.Option value={val}>{_item.name}</TagSelect.Option>
      )
    });

    const hospitalTypeJsonData = [
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
    ];
    const hospitalTypeData = hospitalTypeJsonData.map(function(_item){
      return (
        <TagSelect.Option value={_item.value}>{_item.name}</TagSelect.Option>
      )
    });
    const bedRangeJsonData = [
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
    ];
    const bedRangeData = bedRangeJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });
    const hospitalGradeJsonData = [
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
    ];
    const hospitalGradeData = hospitalGradeJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });
    const belongedJsonData = [
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
    ];
    const belongedData = belongedJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });
    const hospitalJsonData = [
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
    ];
    const hospitalData = hospitalJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });
    const medicalInstitution =
    <Row gutter={16}>
      <Select
        onChange={this.handleSelectOption}
        defaultValue="hospitalType1"
        style={{ maxWidth: 200, width: '100%' }}
      >
        {hospitalTypeData}
      </Select>
      <Select
        onChange={this.handleSelectOption}
        defaultValue="bedRange1"
        style={{ maxWidth: 200, width: '100%' }}
      >
        {bedRangeData}
      </Select>
      <Select
        onChange={this.handleSelectOption}
        defaultValue="hospitalGrade1"
        style={{ maxWidth: 200, width: '100%' }}
      >
        {hospitalGradeData}
      </Select>
      <Select
        onChange={this.handleSelectOption}
        defaultValue="belonged1"
        style={{ maxWidth: 200, width: '100%' }}
      >
        {belongedData}
      </Select>
      <Select
        onChange={this.handleSelectOption}
        defaultValue="hospital1"
        style={{ maxWidth: 200, width: '100%' }}
      >
        {hospitalData}
      </Select>
    </Row>;

    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="筛选结果">
              <Row gutter={16}>
                <Col lg={20} md={20} sm={20} xs={20}>
                  <ul className={styles.resultList}>
                    {this.state.filterResult}
                  </ul>
                </Col>
                <Col lg={4} md={4} sm={4} xs={4}>
                  <div className={styles.clearBtn} onClick={this.clearResult}>
                    <Icon type="delete" />清除条件
                  </div>
                </Col>
              </Row>
            </StandardFormRow>
            {(rowTypes.indexOf("timeSelect") > -1)?
              <StandardFormRow title="日期" grid>
                <Row gutter={16}>
                  <Col lg={6} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout}>
                        <Select
                          onChange={this.selectTimeType}
                          defaultValue="0"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          {timeSelectData}
                        </Select>
                    </FormItem>
                  </Col>
                  <Col lg={18} md={14} sm={14} xs={24}>
                    <FormItem>
                      {(this.state.timeType == 0)?
                        <TagSelect>
                          <TagSelect.Option value="0">2018年</TagSelect.Option>
                          <TagSelect.Option value="1">2017年</TagSelect.Option>
                        </TagSelect>
                      :null}
                      {(this.state.timeType == 1)?
                        <TagSelect>
                          <TagSelect.Option value="2">上半年</TagSelect.Option>
                          <TagSelect.Option value="3">下半年</TagSelect.Option>
                        </TagSelect>
                      :null}
                      {(this.state.timeType == 2)?
                        <TagSelect>
                          <TagSelect.Option value="4">1季度</TagSelect.Option>
                          <TagSelect.Option value="5">2季度</TagSelect.Option>
                          <TagSelect.Option value="6">3季度</TagSelect.Option>
                          <TagSelect.Option value="7">4季度</TagSelect.Option>
                        </TagSelect>
                      :null}
                      {(this.state.timeType == 3)?
                        <TagSelect>
                          <TagSelect.Option value="8">1月</TagSelect.Option>
                          <TagSelect.Option value="9">2月</TagSelect.Option>
                        </TagSelect>
                      :null}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            :null}
            {(rowTypes.indexOf("region") > -1)?
              <StandardFormRow title="区域" block style={{ paddingBottom: 11 }}>
                <FormItem>
                    <TagSelect onChange={this.changeTagSelect} hasCheckedAll expandable>
                      {regionData}
                    </TagSelect>
                </FormItem>
              </StandardFormRow>
            :null}
            {(rowTypes.indexOf("medicalInstitution") > -1)?
              <StandardFormRow title="医疗机构" grid last>
                {medicalInstitution}
              </StandardFormRow>
            :null}
          </Form>
        </Card>
      </div>
    )
  }
}

export default FilterGroup;
