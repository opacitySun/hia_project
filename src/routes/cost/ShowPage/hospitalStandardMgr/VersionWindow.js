import React from 'react';
// import { connect } from 'dva';
import {Form, Button, Row, Col, Input, message} from 'antd';
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
    this.props.form.validateFields((err, values) => {
      if(!err){
        process.saveVersion(values,(result)=>{
          result = {'code':'1', 'msg':'保存成功'}
          console.log('saveVersion', values, result)
          if(result.code === '1'){
            message.success(result.msg);
            this.props.form.resetFields()
            // this.props.versionForm.query(e)
          }else{
            message.error(result.msg);
          }
        })
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
      <Form onSubmit={this.onSubmit}>
        <FormItem label="版本号" {...formItemLayout}>
          {
            getFieldDecorator('versionsName', {
              initialValue: '',
              rules: [{ required: true, message: '请输入版本号!' }],
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="年度" {...formItemLayout}>
          {
            getFieldDecorator('yearCode', {
              initialValue: '',
              rules: [{ required: true, message: '请输入年度!' }],
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
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </div>
      </Form>
    )
  }
}
export default Form.create()(ParamWindow)
