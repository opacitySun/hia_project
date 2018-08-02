import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TagSelect from 'components/TagSelect';
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
    <li key={`resultChild-${option.props.value}`} value={option.props.value}>
      <span>{option.props.children}</span>
      <span onClick={this.delResult} className={styles.closeBtn}><Icon type="close" /></span>
    </li>;
    const resArr = this.state.filterResult.concat(resultChild);
    this.setState({
      filterResult: resArr
    });
    this.submitFilterResult(resArr);
  };

  changeTagSelect = (value) => {
    const self = this;
    const resultChild = value.map(function(_v){
      return (
        <li key={`resultChild-${_v.value}`} value={_v.value}>
          <span>{_v.name}</span>
          <span onClick={self.delResult} className={styles.closeBtn}><Icon type="close" /></span>
        </li>
      )
    });
    const newResult = this.state.filterResult.concat(resultChild);
    const resArr = self.removeRepetitionResult(newResult);
    this.setState({
      filterResult: resArr
    });
    this.submitFilterResult(resArr);
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
    const resArr = [];
    this.setState({
      filterResult: resArr
    });
    this.submitFilterResult(resArr);
  };

  //把相关value值的li从filterResult中筛选出去
  delResult = e => {
    let _target = e.target;
    const val = _target.parentNode.parentNode.getAttribute('value');
    const resArr = this.state.filterResult.filter((_, i) => _.props.value !== val);
    this.setState({
      filterResult: resArr
    });
    this.submitFilterResult(resArr);
  };

  //获取筛选结果的value,并暴露给外部onChange
  submitFilterResult = (resArr) => {
    const { onChange } = this.props;
    let filterResultVal = [];
    resArr.map(function(_item){
      filterResultVal.push(_item.props.value);
    });
    if (onChange) {
      onChange(filterResultVal);
    }
  }

  render() {
    const self = this;
    const { rowTypes,timeSelect,region,medicalInstitution } = this.props;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    //日期选择
    const timeSelectType = (timeSelect && timeSelect.type)?timeSelect.type.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];

    //区域
    const regionData = region?region.map(function(_item){
      const val = {"value":_item.value,"name":_item.name};
      return (
        <TagSelect.Option key={_item.value} value={val}>{_item.name}</TagSelect.Option>
      )
    }):[];
    //医院类型
    const hospitalTypeData = (medicalInstitution && medicalInstitution.hospitalType)?medicalInstitution.hospitalType.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];
    //床位范围
    const bedRangeData = (medicalInstitution && medicalInstitution.bedRange)?medicalInstitution.bedRange.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];
    //医院等级
    const hospitalGradeData = (medicalInstitution && medicalInstitution.hospitalGrade)?medicalInstitution.hospitalGrade.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];
    //所属
    const belongedData = (medicalInstitution && medicalInstitution.belonged)?medicalInstitution.belonged.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];
    //医院
    const hospitalData = (medicalInstitution && medicalInstitution.hospital)?medicalInstitution.hospital.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):[];
    //医疗机构HTML
    const medicalInstitutionHTML =
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
                          {timeSelectType}
                        </Select>
                    </FormItem>
                  </Col>
                  <Col lg={18} md={14} sm={14} xs={24}>
                    <FormItem>
                      {
                        (timeSelect && timeSelect.data)?timeSelect.data.map(function(_items,_index){
                          const item = _items.map(function(_item){
                            const val = {"value":_item.value,"name":_item.name};
                            return (
                              <TagSelect.Option key={_item.value} value={val}>{_item.name}</TagSelect.Option>
                            )
                          });
                          return (
                            (self.state.timeType == _index)?
                                <TagSelect key={_index} onChange={self.changeTagSelect}>
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
                {medicalInstitutionHTML}
              </StandardFormRow>
            :null}
          </Form>
        </Card>
      </div>
    )
  }
}

export default FilterGroup;
