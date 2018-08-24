import React from 'react';
import { connect } from 'dva';
import {Layout, Form, Button, Row, Col, Select, Table, Switch, Drawer} from 'antd';
import styles from './styles.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Sider, Content } = Layout;
const process = new SysParamConfigService();

const Form1 = Form.create()(
  class Form1 extends React.Component {
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
            result = [{'versionsName':'HIA三级医院001','year':'2017','isUsed':0},{'versionsName':'HIA三级医院001','year':'2018','isUsed':1}];
            result = result.map((item, index) => Object.assign(item, {key: index+1}))
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
        <Form  onSubmit={this.query} >
          <Row gutter={24}>
            <Col span={7}>
              <FormItem label="版本号" {...formItemLayout}>
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
      )
    }
  }
)

const Form2 = Form.create()(
  class Form2 extends React.Component {
    query2 = (e) => {
      e.preventDefault();
      console.log('query2')
      this.props.form.validateFields((err, values) => {
        if(!err){
          console.log(values);
          const param1 = values.indexType;
          const param2 = values.index;
          process.queryHospitalIndex(param1, param2 ,(result)=>{
            result = [{'indexType':'成本管控类','indexCode':'100001','indexName':'成本控制率','warning':1,'unit':'%','standardValue':0.567,'area':'北京','level':'三级甲等','type':'综合医院'},{'indexType':'运行效率类','indexCode':'100002','indexName':'床位周转次数','warning':0,'unit':'次','standardValue':32.50,'area':'北京','level':'三级甲等','type':'综合医院'}];
            result = result.map((item, index) => Object.assign(item, {key: index+1}))
            this.props.toParent(result);
          })
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return(
        <Form layout="inline" onSubmit={this.query2}>
          <FormItem label="指标分类">
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
            <Button type="primary">新增</Button>
            <Button type="primary">删除</Button>
            <Button type="primary">保存</Button>
          </FormItem>
        </Form>
        )
    }
  }
)

export default class SysHospitalStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource1:[],
      dataSource2:[],
      leftVisible:false,
      rightVisible:false,
    }
  }

  getChildInfo = (result)=>{
    this.setState({dataSource1:result});
  }

  getChildInfo2 = (result)=>{
    this.setState({dataSource2:result});
  }

  onCloseLeft = () => {
    this.setState({
      leftVisible: false,
    });
  };

  onCloseRight = () => {
    this.setState({
      rightVisible: false,
    });
  };

  render() {
    this.columns = [
      {
        title: '序号',
        width:'15%',
        align:'center',
        dataIndex: 'key',
      },{
        title: '版本号',
        width:'35%',
        align:'center',
        dataIndex: 'versionsName',
      },{
        title: '年度',
        width:'35%',
        align:'center',
        dataIndex: 'year',
      },{
        title: '启用',
        width:'15%',
        align:'center',
        dataIndex: 'isUsed',
        render:(text)=>{
          console.log(text)
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={text===1} />
          )
        },
      },
    ];

    this.columns2 = [
      {
        title: '序号',
        width:'10%',
        align:'center',
        dataIndex: 'key',
      },{
        title: '指标分类',
        width:'10%',
        align:'center',
        dataIndex: 'indexType',
      },{
        title: '指标编码',
        width:'10%',
        align:'center',
        dataIndex: 'indexCode',
      },{
        title: '指标名称',
        width:'10%',
        align:'center',
        dataIndex: 'indexName',
      },{
        title: '是否预警',
        width:'10%',
        align:'center',
        dataIndex: 'warning',
        render:(text)=>{
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={text===1} />
          )
        },
      },{
        title: '计量单位',
        width:'10%',
        align:'center',
        dataIndex: 'unit',
      },{
        title: '标杆值(E)',
        width:'10%',
        align:'center',
        dataIndex: 'standardValue',
      },{
        title: '区域(E)',
        width:'10%',
        align:'center',
        dataIndex: 'area',
      },{
        title: '医院等级(E)',
        width:'10%',
        align:'center',
        dataIndex: 'level',
      },{
        title: '医院类型(E)',
        width:'10%',
        align:'center',
        dataIndex: 'type',
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const rowSelection2 = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div className={styles.contentDiv}>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onCloseLeft}
          visible={this.state.leftVisible}
        >
          <p>Some contents...1</p>
          <p>Some contents...1</p>
          <p>Some contents...1</p>
        </Drawer>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onCloseRight}
          visible={this.state.rightVisible}
        >
          <p>Some contents...2</p>
          <p>Some contents...2</p>
          <p>Some contents...2</p>
        </Drawer>
        <Layout>
          <Header className={styles.tableHeader}>
            <Form1 toParent={this.getChildInfo.bind(this)} />
          </Header>
          <Layout>
            <Sider theme='light' width="400">
              <div>
                <Button type="primary">新增</Button>
                <Button type="primary">删除</Button>
                <Button type="primary">保存</Button>
                <Button type="primary">导入</Button>
              </div>
              <Table bordered rowSelection={rowSelection} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource1} columns={this.columns} />
            </Sider>
            <Content>
              <div>
                <Form2 toParent={this.getChildInfo2.bind(this)} />
              </div>
              <Table bordered rowSelection={rowSelection2} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource2} columns={this.columns2} />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

// const page = Form.create()(SysHospitalStandardMgr);
// export default page;
