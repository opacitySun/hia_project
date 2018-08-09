import React from 'react';
import { connect } from 'dva';
import { Form, Button, Select} from 'antd';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const FormItem = Form.Item;
const Option = {Select};
const process = new SysParamConfigService();
class IndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexTypeList:[],
      indexNameList:[],
    }
  }

  query = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values);
        const param1 = values.indexType;
        const param2 = values.index;
        process.queryHospitalIndex(param1, param2 ,(result)=>{
          result = [{'id':'1','indexType':'成本管控类','indexCode':'100001','indexName':'成本控制率','warning':1,'unit':'%','standardValue':0.567,'area':'北京','level':'三级甲等','type':'综合医院'},{'id':'2','indexType':'运行效率类','indexCode':'100002','indexName':'床位周转次数','warning':0,'unit':'次','standardValue':32.50,'area':'北京','level':'三级甲等','type':'综合医院'}];
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
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Select style={{ width: 120 }}>
              <Option key='1' value='1'>1</Option>
              <Option key='2' value='2'>2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="指标">
          {getFieldDecorator('index', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Select style={{ width: 120 }}>
              <Option key='3' value='3'>3</Option>
              <Option key='4' value='4'>4</Option>
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
