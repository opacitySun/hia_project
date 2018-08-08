import React from 'react';
import { connect } from 'dva';
import {Form, Button, Row, Col, Select, Table} from 'antd';
import styles from './IndicatorWarning.less';
import {
  SysParamConfigService,
} from './../process/LoadService'

const FormItem = Form.Item;
const Option = Select.Option;

const process = new SysParamConfigService();

class DepartmentStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paramList:[],
      dataSource:[],
    }
  }

  componentWillMount() {
    process.queryParamName((result)=>{
      this.setState({paramList:[{'versionsCode':0,'versionsName':'全部'}].concat(result)})
    })
  }

  // query = (paramName) => {
  //   const {dispatch} = this.props;
  //   dispatch({
  //     type: 'sysParamConfig/dispatchPayload',
  //     payload: {
  //       doQuery: paramName,
  //     },
  //   });
  // }

  query = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values);
        const param = values.paramName;
        process.queryByParam(param,(result)=>{
          console.log(result)
          this.setState({dataSource:result})
        })
      }
    });
  }

  render() {

    this.columns = [
      {
        title: '参数名称',
        width:'50%',
        align:'center',
        dataIndex: 'versionsName',
      },{
        title: '参数配置',
        width:'50%',
        align:'center',
        dataIndex: 'versionsCode',
        render: (value) => {
          return (
            <div>
              {value}
            </div>
          )
        },
      },
    ];

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

    return (
      <div className={styles.contentDiv}>
        <div className={styles.showPageDiv}>
          <Form  onSubmit={this.query} className="ant-advanced-search-form">
            <Row gutter={24}>
              <Col span={7}>
                <FormItem label="参数名称" {...formItemLayout}>
                  {
                    getFieldDecorator('paramName', {
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
                  <Button  type="primary"  htmlType="submit">查询</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>

          {/*<Button onClick={this.save}>保存</Button>*/}
          <Table bordered scroll={{ x: 1000,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource} columns={this.columns}/>
        </div>
      </div>
    )
  }
}

const page = Form.create()(DepartmentStandardMgr);
export default page;
