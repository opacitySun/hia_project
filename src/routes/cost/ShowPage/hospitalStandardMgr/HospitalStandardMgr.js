import React from 'react';
import { connect } from 'dva';
import {Layout, Button, Row, Col, Table, Switch, Drawer, message} from 'antd';
import VersionForm from './VersionForm.js';
import IndexForm from './IndexForm.js';
import VersionWindow from './VersionWindow.js';
import IndexWindow from './IndexWindow.js';
import styles from './HospitalStandardMgr.less';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const { Header, Sider, Content } = Layout;
const process = new SysParamConfigService();

// const Form1 = Form.create()(ParamForm);
// const Form2 = Form.create()(IndexForm);

export default class HospitalStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource1:[],
      dataSource2:[],
      leftVisible:false,
      rightVisible:false,
      selectedRowKeys1:[],
      selectedRowKeys2:[],
    }
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

  getChildInfo = (result)=>{
    this.setState({dataSource1:result});
  }

  getChildInfo2 = (result)=>{
    this.setState({dataSource2:result});
  }

  showLeftDrawer = () => {
    this.setState({
      leftVisible: true,
    });
  };

  showRightDrawer = () => {
    this.setState({
      rightVisible: true,
    });
  };

  deleteVersion = () => {
    const { selectedRowKeys1 } = this.state;
    if (selectedRowKeys1.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      process.deleteVersion(selectedRowKeys1, (result)=>{
        message.success('删除成功！')
        this.formRef1.query();
        // process.query(null, (result) => {
        //   this.setState({
        //     dataSource1: result.getSinglePrimary().map((item) => Object.assign(item, { key: item.id })),
        //     selectedRowKeys1: [],
        //   });
        // });
      });
    }
  };

  deleteIndex = () => {
    const { selectedRowKeys2 } = this.state;
    if (selectedRowKeys2.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      process.deleteIndex(selectedRowKeys2, (result)=>{
        message.success('删除成功！');
        this.formRef2.query();
        // process.query(null, null, (result) => {
        //   this.setState({
        //     dataSource2: result.getSinglePrimary().map((item) => Object.assign(item, { key: item.id })),
        //     selectedRowKeys2: [],
        //   });
        // });
      });
    }
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

    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }),
    // };
    //
    // const rowSelection2 = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }),
    // };

    const { selectedRowKeys1 } = this.state;
    const { selectedRowKeys2 } = this.state;
    const rowSelection1 = {
      selectedRowKeys1,
      onChange: (keys, selectedRows) => {
        console.log(`selectedRowKeys1: ${keys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys1:keys });
      },
    };
    const rowSelection2 = {
      selectedRowKeys2,
      onChange: (keys2, selectedRows) => {
        console.log(`selectedRowKeys2: ${keys2}`, 'selectedRows2: ', selectedRows);
        this.setState({ selectedRowKeys2:keys2 });
      },
    };

    return (
      <div className={styles.contentDiv}>
        <div className={styles.showPageDiv}>
          <Drawer
            title="Basic Drawer"
            placement="left"
            width="300"
            closable={false}
            onClose={this.onCloseLeft}
            visible={this.state.leftVisible}
          >
            <VersionWindow onClose={this.onCloseLeft} />
          </Drawer>
          <Drawer
            title="Basic Drawer"
            placement="right"
            width="400"
            closable={false}
            onClose={this.onCloseRight}
            visible={this.state.rightVisible}
          >
            <IndexWindow onClose={this.onCloseRight} />
          </Drawer>
          <Layout>
            <Header>
              <VersionForm toParent={this.getChildInfo.bind(this)} wrappedComponentRef={(inst) => this.formRef1 = inst} />
            </Header>
            <Layout>
              <Sider theme='light' width="400">
                <div>
                  <Button type="primary" onClick={this.showLeftDrawer}>新增</Button>
                  <Button type="primary" onClick={this.deleteVersion}>删除</Button>
                  <Button type="primary">导入</Button>
                </div>
                <Table bordered rowSelection={rowSelection1} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource1} columns={this.columns} />
              </Sider>
              <Content>
                <div>
                  <Row>
                    <Col span={16}>
                      <IndexForm toParent={this.getChildInfo2.bind(this)} wrappedComponentRef={(inst) => this.formRef2 = inst} />
                    </Col>
                    <Col>
                      <Button type="primary" onClick={this.showRightDrawer}>新增</Button>
                      <Button type="primary" onClick={this.deleteIndex}>删除</Button>
                    </Col>
                  </Row>
                </div>
                <Table bordered rowSelection={rowSelection2} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource2} columns={this.columns2} />
              </Content>
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}

// const page = Form.create()(HospitalStandardMgr);
// export default page;
