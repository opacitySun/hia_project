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
