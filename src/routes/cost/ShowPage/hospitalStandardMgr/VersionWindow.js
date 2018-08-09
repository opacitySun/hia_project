import React from 'react';
// import { connect } from 'dva';
import {Form, Button, Row, Col, Input} from 'antd';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const FormItem = Form.Item;
const process = new SysParamConfigService();
class ParamWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onClose = () => {
    this.props.onClose();
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit')
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values);
        // const param = values.paramName;
        // process.queryByParam(param,(result)=>{
        //   result = [{'versionsName':'HIA三级医院001','year':'2017','isUsed':0},{'versionsName':'HIA三级医院001','year':'2018','isUsed':1}];
        //   result = result.map((item, index) => Object.assign(item, {key: index+1}))
        //   this.props.toParent(result);
        // })
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.query}>
        <FormItem label="版本号" {...formItemLayout}>
          {
            getFieldDecorator('versionName', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="年度" {...formItemLayout}>
          {
            getFieldDecorator('year', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
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
export default Form.create()(ParamWindow)
