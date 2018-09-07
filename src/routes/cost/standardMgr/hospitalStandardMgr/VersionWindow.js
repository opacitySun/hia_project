import React from 'react';
import { connect } from 'dva';
import {Form, Button, Row, Col, Input, message, InputNumber} from 'antd';
// import {
//   SysParamConfigService,
// } from './../../process/LoadService'
// const process = new SysParamConfigService();

const FormItem = Form.Item;
@connect(state => ({
  standardMgr: state.standardMgr,
}))
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
    const { dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      if(!err){
        dispatch({
          type: 'bdDict/saveVersion',
          payload: {
            values,
          },
          callback: response => {
            console.log('callback', response)
            if (response.code === 1) {
              dispatch({
                type: 'bdDict/queryVersionDict',
              })
              message.success(response.msg)
            } else {
              message.error(response.msg);
            }
          },
        });
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
            getFieldDecorator('versionName', {
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
              <InputNumber />
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
