import React from 'react';
import { connect } from 'dva';
import { Form, Button, Select, Input, Switch, message, InputNumber, Cascader, Row, Col, Modal} from 'antd';
import MyUtil from '../../../../constants/MyUtil'

const FormItem = Form.Item;
const {confirm} = Modal
const {Option} = Select;

@connect(state => ({
  bdDict: state.bdDict,
  standardMgr: state.standardMgr,
}))
class IndexWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceAreaList:this.props.bdDict.provinceAreaList,
    }
  }

  onClose = () => {
    this.props.onClose();
  };

  onSubmit = (e) => {
    console.log('submit')
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if(!err){
        values.areaCode = values.areaCode[values.areaCode.length - 1]
        values.areaName = MyUtil.mapListToObject(that.props.bdDict.allAreaList, 'areaCode', 'areaName')[values.areaCode]
        values.indexName = MyUtil.mapListToObject(that.props.bdDict.indexList, 'indexCode', 'indexName')[values.indexCode]
        values.indexTypeName = MyUtil.mapListToObject(that.props.bdDict.indexTypeList, 'indexTypeCode', 'indexTypeName')[values.indexTypeCode]
        values.hospGradeName = MyUtil.mapListToObject(that.props.bdDict.hospitalLevelList, 'hospGradeCode', 'hospGradeName')[values.hospGradeCode]
        values.hospTypeName = MyUtil.mapListToObject(that.props.bdDict.hospitalTypeList, 'hospTypeCode', 'hospTypeName')[values.hospTypeCode]
        values.meteringUnitName = MyUtil.mapListToObject(that.props.bdDict.meteringUnitList, 'meteringUnitCode', 'meteringUnitName')[values.meteringUnitCode]
        values.versionName = MyUtil.mapListToObject(that.props.bdDict.versionList, 'pkId', 'versionName')[values.hospStandardVersionId]
        values.isWarning = 1
        console.log(values)
        const {dispatch} = this.props
        dispatch({
          type: 'standardMgr/saveIndex',
          payload: {
            values,
          },
          callback: response => {
            console.log('response', response)
            if (response.code === 1) {
              message.success(response.msg)
            } else if(response.code === 2){
              confirm({
                title: '新增确认',
                content: response.msg,
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk() {
                  that.dispatchInsertIndex(values,true)
                },
                onCancel() {
                  that.dispatchInsertIndex(values,false)
                },
              });
            } else{
              message.error(response.msg);
            }
          },
        });
      }
    });
  };

  onChange = (value, selectedOptions) => {
    console.log('onChange',value, selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    this.props.dispatch({
      type: 'bdDict/findDictArea',
      payload: {
        areaCode: targetOption.areaCode,
      },
      callback: res => {
        res = res.map((item) =>{
          if(item.areaCode.length === 6){
            item.isLeaf = true
          }
          return item
        })
        targetOption.loading = false;
        targetOption.children = res
      },
    })
  }

  loadData = (selectedOptions) => {
    console.log('loadData',selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
  }

  dispatchInsertIndex = (values, isAdd) => {
    const {dispatch} = this.props
    dispatch({
      type: 'standardMgr/saveIndex2',
      payload: {
        values,
        isAdd,
      },
      callback: response => {
        console.log('response', response)
        if (response.code === 1) {
          message.success(response.msg)
        } else {
          message.error(response.msg);
        }
      },
    });
  }

  onTypeSelect = (value) =>{
    this.props.form.resetFields('indexCode')
    this.props.dispatch({
      type: 'standardMgr/findDictIndexByTypeCode',
      payload: {
        indexTypeCode: value,
      },
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 0},
        sm: {span: 9},
      },
      wrapperCol: {
        xs: {span: 0},
        sm: {span: 13},
      },
    };
    const {hospitalLevelList, hospitalTypeList, indexTypeList, meteringUnitList, versionList} = this.props.bdDict
    const { indexList } = this.props.standardMgr
    console.log(this.props)
    return(
      <Form
        layout="vertical"
        hideRequiredMark
        onSubmit={this.onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="指标分类" {...formItemLayout}>
              {
                getFieldDecorator('indexTypeCode', {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择指标分类!' }],
                })(
                  <Select
                    showSearch
                    onSelect={this.onTypeSelect}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {indexTypeList.map((item) => {
                      return <Option key={item.indexTypeCode} value={item.indexTypeCode}>{item.indexTypeName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="指标名称" {...formItemLayout}>
              {
                getFieldDecorator('indexCode', {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择指标!' }],
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {indexList.map((item) => {
                      return <Option key={item.indexCode} value={item.indexCode}>{item.indexName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="计量单位" {...formItemLayout}>
              {
                getFieldDecorator('meteringUnitCode', {
                  initialValue: '',
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {meteringUnitList.map((item) => {
                      return <Option key={item.meteringUnitCode} value={item.meteringUnitCode}>{item.meteringUnitName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="标杆值(E)" {...formItemLayout}>
              {
                getFieldDecorator('standardValue', {
                  initialValue: '100',
                })(
                  <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    precision="2"
                  />
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="区域(E)" {...formItemLayout}>
              {
                getFieldDecorator('areaCode', {
                  initialValue: '',
                })(
                  <Cascader
                    options={this.state.provinceAreaList}
                    fieldNames={{ label: 'areaName', value: 'areaCode' }}
                    loadData={this.loadData}
                    onChange={this.onChange}
                    placeholder=""
                    changeOnSelect
                  />
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="医院等级(E)" {...formItemLayout}>
              {
                getFieldDecorator('hospGradeCode', {
                  initialValue: '',
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {hospitalLevelList.map((item) => {
                      return <Option key={item.hospGradeCode} value={item.hospGradeCode}>{item.hospGradeName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="医院类型(E)" {...formItemLayout}>
              {
                getFieldDecorator('hospTypeCode', {
                  initialValue: '',
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {hospitalTypeList.map((item) => {
                      return <Option key={item.hospTypeCode} value={item.hospTypeCode}>{item.hospTypeName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="版本号" {...formItemLayout}>
              {
                getFieldDecorator('hospStandardVersionId', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入版本号!' }],
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {versionList.map((item) => {
                      return <Option key={item.pkId} value={item.pkId}>{item.versionName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
        </Row>
        {/*<Row gutter={16}>*/}
          {/*<Col span={12}>*/}
            {/*<FormItem label="版本号" {...formItemLayout}>*/}
              {/*{*/}
                {/*getFieldDecorator('hospStandardVersionId', {*/}
                  {/*initialValue: '',*/}
                {/*})(*/}
                  {/*<Select*/}
                    {/*showSearch*/}
                    {/*filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}*/}
                  {/*>*/}
                    {/*{versionList.map((item) => {*/}
                      {/*return <Option key={item.pkId} value={item.pkId}>{item.versionName}</Option>*/}
                    {/*})}*/}
                  {/*</Select>*/}
                {/*)*/}
              {/*}*/}
            {/*</FormItem>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={this.onClose}
          >
            取消
          </Button>
          <Button onClick={this.onSubmit} type="primary">
            提交
          </Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(IndexWindow)
