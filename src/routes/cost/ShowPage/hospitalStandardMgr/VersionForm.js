import React from 'react';
// import { connect } from 'dva';
import {Form, Button, Row, Col, Select} from 'antd';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const FormItem = Form.Item;
const Option = {Select};
const process = new SysParamConfigService();
class ParamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramList:[],
    }
  }

  componentWillMount() {
    process.queryParamName((result)=>{
      result = [{'versionsCode':1,'versionsName':'HIA三级医院001'},{'versionsCode':2,'versionsName':'HIA三级医院002'}]
      this.setState({paramList:[{'versionsCode':0,'versionsName':'全部'}].concat(result)})
    })
  }

  query = (e) => {
    e.preventDefault();
    console.log('query')
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values);
        const param = values.paramName;
        process.queryByParam(param,(result)=>{
          result = [{'id':'1','versionsName':'HIA三级医院001','year':'2017','isUsed':0},{'id':'2','versionsName':'HIA三级医院001','year':'2018','isUsed':1}];
          result = result.map((item) => Object.assign(item, {key: item.id}))
          this.props.toParent(result);
        })
      }
    });
  }

  render() {
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
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.query}>
        <Row gutter={24}>
          <Col span={7}>
            <FormItem label="版本号" {...formItemLayout}>
              {
                getFieldDecorator('versionName', {
                  initialValue: '',
                })(
                  <Select>
                    {this.state.paramList.map((item) => {
                      return <Option key={item.versionsCode} value={item.versionsCode}>{item.versionsName}</Option>
                    })}
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={7} />
          <Col span={7} />
          <Col span={3}>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default Form.create()(ParamForm)
