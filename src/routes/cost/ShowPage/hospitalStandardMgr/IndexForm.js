import React from 'react';
import { connect } from 'dva';
import { Form, Button, Select} from 'antd';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const FormItem = Form.Item;
const {Option} = Select;
const process = new SysParamConfigService();
class IndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexTypeList:[],
      indexNameList:[],
    }
  }

  componentWillMount() {
    process.queryIndexTypeList((result)=>{
      result = [{'indexTypeCode':1,'indexTypeName':'经营风险'},{'indexTypeCode':2,'indexTypeName':'成本管控'},{'indexTypeCode':3,'indexTypeName':'运行效率'},{'indexTypeCode':4,'indexTypeName':'费用控制'}]
      console.log('queryIndexTypeList', result)
      result = result.map((item, index) => Object.assign(item, {key: index + 1}))
      this.setState({indexTypeList:result})
    })

    process.queryIndexNameList((result)=>{
      result = [{'indexCode':1,'indexName':'收支结余率'},{'indexCode':2,'indexName':'资产负债率'},{'indexCode':3,'indexName':'成本控制率'}]
      console.log('queryIndexNameList', result)
      result = result.map((item, index) => Object.assign(item, {key: index + 1}))
      this.setState({indexNameList:result})
    })
  }

  query = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const param1 = values.indexType;
        const param2 = values.index;
        process.queryHospitalIndex(param1, param2 ,(result)=>{
          result = [{'id':'1','indexType':'成本管控类','indexCode':'100001','indexName':'成本控制率','warning':1,'unit':'%','standardValue':0.567,'area':'北京','level':'三级甲等','type':'综合医院'},{'id':'2','indexType':'运行效率类','indexCode':'100002','indexName':'床位周转次数','warning':0,'unit':'次','standardValue':32.50,'area':'北京','level':'三级甲等','type':'综合医院'}];
          console.log('queryHospitalIndex', param1, param2, result)
          result = result.map((item) => Object.assign(item, {key: item.id}))
          this.props.toParent(result);
        })
      }
    });
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
    return(
      <Form layout="inline" onSubmit={this.query}>
        <FormItem label="指标分类" {...formItemLayout}>
          {getFieldDecorator('indexType', {
            initialValue: '',
          })(
            <Select style={{ width: 120 }}>
              <Option key='0' value="">全部</Option>
              {this.state.indexTypeList.map((item) => {
                return <Option key={item.key} value={item.indexTypeCode}>{item.indexTypeName}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="指标">
          {getFieldDecorator('index', {
            initialValue: '',
          })(
            <Select style={{ width: 120 }}>
              <Option key='0' value="">全部</Option>
              {this.state.indexNameList.map((item) => {
                return <Option key={item.key} value={item.indexCode}>{item.indexName}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">查询</Button>
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(IndexForm)
