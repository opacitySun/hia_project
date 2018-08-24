import React from 'react';
import { connect } from 'dva';
import { Form, Button, Select, Input, Switch, message} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;
class IndexWindow extends React.Component {
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
        // process.saveIndex(values,(result)=>{
        //   result = {'code':'1', 'msg':'保存成功'}
        //   console.log('saveIndex', values, result)
        //   if(result.code === '1'){
        //     message.success(result.msg);
        //     this.props.form.resetFields()
        //     // this.props.indexForm.query(e)
        //   }else{
        //     message.error(result.msg);
        //   }
        // })
        this.props.dispatch({
          type: 'standardMgr/saveIndex',
          payload: {
            values,
          },
          callback: response => {
            console.log('saveIndex callback', response)
            if (response.code === 1) {
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
      <Form onSubmit={this.query}>
        <FormItem label="指标分类" {...formItemLayout}>
          {
            getFieldDecorator('indCatName', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="指标编码" {...formItemLayout}>
          {
            getFieldDecorator('indexCode', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="指标名称" {...formItemLayout}>
          {
            getFieldDecorator('indexName', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="是否预警" {...formItemLayout}>
          {
            getFieldDecorator('warning', {
              initialValue: '',
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" />
            )
          }
        </FormItem>
        <FormItem label="计量单位" {...formItemLayout}>
          {
            getFieldDecorator('warning', {
              initialValue: '',
            })(
              <Select>
                <Option key='1' value='%'>%</Option>
                <Option key='2' value='次'>次</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="标杆值(E)" {...formItemLayout}>
          {
            getFieldDecorator('standardValue', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="区域(E)" {...formItemLayout}>
          {
            getFieldDecorator('area', {
              initialValue: '',
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="医院等级(E)" {...formItemLayout}>
          {
            getFieldDecorator('area', {
              initialValue: '',
            })(
              <Select>
                <Option key='1' value='1'>三级甲等</Option>
                <Option key='2' value='2'>三级乙等</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="医院类型(E)" {...formItemLayout}>
          {
            getFieldDecorator('type', {
              initialValue: '',
            })(
              <Select>
                <Option key='1' value='1'>综合医院</Option>
                <Option key='2' value='2'>中医医院</Option>
              </Select>
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
export default Form.create()(IndexWindow)
