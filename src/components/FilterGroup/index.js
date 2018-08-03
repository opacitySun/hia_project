import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker, Icon, Cascader } from 'antd';
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
    filterResult:[],
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

  handleFilterListChild = (e) => {
    const self = this;
    const _target = e.target;
    const val = _target.getAttribute('value');
    const name = _target.innerHTML;
    const resultChild =
    <li key={`resultChild-${val}`} value={val}>
      <span>{name}</span>
      <span onClick={self.delResult} className={styles.closeBtn}><Icon type="close" /></span>
    </li>;
    let resultChildArr = [];
    resultChildArr.push(resultChild);
    const newResult = this.state.filterResult.concat(resultChild);
    const resArr = self.removeRepetitionResult(newResult);
    this.setState({
      filterResult: resArr
    });
    this.submitFilterResult(resArr);
  }

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
    const {
      rowTypes,
      timeSelect,
      region,
      regionLoadData,
      regionOnChange,
      medicalInstitution,
      versionNumber,
      indexClassification,
      index
    } = this.props;
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
    }):null;
    //医疗机构
    const medicalInstitutionData = medicalInstitution?medicalInstitution.map(function(_items){
      let item = _items.data?_items.data.map(function(_item){
        switch(_items.key){
          case 'hospitalType':
            return (
              <Option key={_item.hospitalTypeCode} value={_item.hospitalTypeCode}>{_item.hospitalTypeName}</Option>
            )
            break;
          case 'bedRange':
            return (
              <Option key={_item.bedScopeCode} value={_item.bedScopeCode}>{_item.bedScopeName}</Option>
            )
            break;
          case 'hospitalGrade':
            return (
              <Option key={_item.hospitalLevelCode} value={_item.hospitalLevelCode}>{_item.hospitalLevelName}</Option>
            )
            break;
          case 'belonged':
            return (
              <Option key={_item.hospitalBelongCode} value={_item.hospitalBelongCode}>{_item.hospitalBelongName}</Option>
            )
            break;
          case 'hospital':
            return (
              <Option key={_item.hospitalCode} value={_item.hospitalCode}>{_item.hospitalName}</Option>
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
    const versionNumberData = versionNumber?versionNumber.map(function(_item){
      return (
        <li key={_item.value} value={_item.value} onClick={self.handleFilterListChild}>{_item.name}</li>
      )
    }):null;
    //指标分类
    const indexClassificationData = indexClassification?indexClassification.map(function(_item){
      return (
        <li key={_item.value} value={_item.value} onClick={self.handleFilterListChild}>{_item.name}</li>
      )
    }):null;
    //指标
    const indexData = index?index.map(function(_item){
      return (
        <li key={_item.value} value={_item.value} onClick={self.handleFilterListChild}>{_item.name}</li>
      )
    }):null;

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
                                      <li key={_item.value} value={_item.value} onClick={self.handleFilterListChild}>{_item.name}</li>
                                    )
                                  });
                                  return (
                                    (self.state.timeType == _index)?
                                      <ul key={_index} className={styles.filterList}>
                                        {item}
                                      </ul>
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
                            options={region}
                            loadData={regionLoadData}
                            onChange={regionOnChange}
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
                          <ul className={styles.filterList}>
                            {versionNumberData}
                          </ul>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'indexClassification':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标分类" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <ul className={styles.filterList}>
                            {indexClassificationData}
                          </ul>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'index':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <ul className={styles.filterList}>
                            {indexData}
                          </ul>
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
