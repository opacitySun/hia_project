import React from 'react';
import { connect } from 'dva';
import { Button, Table, Switch, Drawer, Divider, message, Upload, Icon, InputNumber, Modal} from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import FilterGroup from 'components/Hia/FilterGroup';
import UploadModal from '../UploadModal';
import VersionWindow from './VersionWindow.js';
import IndexWindow from './IndexWindow.js';
import HiaStyles from '../../../../utils/hia.less';
const {confirm} = Modal

@connect(({ standardMgr }) => ({
  standardMgr,
}))
export default class HospitalStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftVisible:false,
      rightVisible:false,
      selectedRowKeys1:[],
      selectedRowKeys2:[],
      standardValueList:[],
    }

    this.columns = [
      {
        title: '序号',
        align:'center',
        width:'6%',
        dataIndex: 'sortNo',
      },{
        title: '版本号',
        align:'center',
        dataIndex: 'versionsName',
      },{
        title: '年度',
        align:'center',
        dataIndex: 'year',
      },{
        title: '启用',
        align:'center',
        dataIndex: 'isUsed',
        render:(text, record)=>{
          // const {loadingId} = this.state;
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" checked={text===1} disabled={text===1} onChange={checked => this.enableVersionOnChange(record.normT,checked)} />
          )
        },
      },
    ];

    this.columns2 = [
      {
        title: '序号',
        align:'center',
        width:'6%',
        dataIndex: 'sortNo',
      },{
        title: '指标分类',
        align:'center',
        dataIndex: 'indCatName',
      },{
        title: '指标编码',
        align:'center',
        dataIndex: 'normIndCode',
      },{
        title: '指标名称',
        align:'center',
        dataIndex: 'normIndName',
      },{
        title: '是否预警',
        align:'center',
        dataIndex: 'isWorning',
        render:(text)=>{
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={text===1} disabled={true} />
          )
        },
      },{
        title: '计量单位',
        align:'center',
        dataIndex: 'meteringUnit',
      },{
        title: '标杆值(E)',
        align:'center',
        dataIndex: 'normValue',
        render:(text, record)=>{
          return(
            <InputNumber defaultValue={text} onChange={value => this.standardValueOnChange(record.normT, value)} />
          )
        },
      },{
        title: '区域(E)',
        align:'center',
        dataIndex: 'areaName',
      },{
        title: '医院等级(E)',
        align:'center',
        dataIndex: 'hospGradeName',
      },{
        title: '医院类型(E)',
        align:'center',
        dataIndex: 'hospTypeName',
      },
    ];
  }

  componentWillMount() {
    this.changeFilterResult1({})
    this.changeFilterResult2({})

    // process.queryByParam('',(result)=>{
    //   result = [{'id':'123','versionsName':'HIA三级医院001','year':'2017','isUsed':0},{'id':'321','versionsName':'HIA三级医院001','year':'2018','isUsed':1}];
    //   console.log('queryByParam', '', result)
    //   result = result.map((item, index) => Object.assign(item, {key: item.id, sortNo:index + 1}))
    //   this.setState({dataSource1:result});
    // })
    //
    // process.queryHospitalIndex('', '' ,(result)=>{
    //   result = [{'id':'123','indexType':'成本管控类','indexCode':'100001','indexName':'成本控制率','warning':1,'unit':'%','standardValue':0.567,'area':'北京','level':'三级甲等','type':'综合医院'},{'id':'321','indexType':'运行效率类','indexCode':'100002','indexName':'床位周转次数','warning':0,'unit':'次','standardValue':32.50,'area':'北京','level':'三级甲等','type':'综合医院'}];
    //   console.log('queryHospitalIndex', '', '', result)
    //   result = result.map((item, index) => Object.assign(item, {key: item.id, sortNo:index + 1}))
    //   this.setState({dataSource2:result});
    // })
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

  // getChildInfo = (result)=>{
  //   this.setState({dataSource1:result});
  // }
  //
  // getChildInfo2 = (result)=>{
  //   this.setState({dataSource2:result});
  // }

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
    const that = this
    const { selectedRowKeys1 } = this.state;
    if (selectedRowKeys1.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      const {dispatch} = this.props
      dispatch({
        type: 'standardMgr/deleteVersion',
        payload: {
          ids: selectedRowKeys1,
          isYes: false,
        },
        callback: response => {
          console.log('deleteVersion callback', response)
          if (response.code === 1) {
            message.success(response.msg)
          } else if(response.code === 2){
            confirm({
              title: '删除确认',
              content: response.msg,
              okText: '是',
              okType: 'danger',
              cancelText: '否',
              onOk() {
                dispatch({
                  type: 'standardMgr/deleteVersion',
                  payload: {
                    ids: selectedRowKeys1,
                    isYes: 1,
                  },
                  callback: res => {
                    console.log('deleteVersion callback', res)
                    if (res.code === 1) {
                      that.setState({ selectedRowKeys1:[] });
                      message.success(res.msg)
                    }else{
                      message.error(res.msg);
                    }
                  },
                })
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          } else{
            message.error(response.msg);
          }
        },
      });
    }
  };

  dispatchDeleteIndex = (selectedRowKeys2, isYes) => {
    console.log(selectedRowKeys2, isYes)
    const {dispatch} = this.props
    dispatch({
      type: 'standardMgr/deleteIndex',
      payload: {
        ids: selectedRowKeys2,
        isYes,
      },
      callback: response => {
        console.log('deleteIndex callback', response)
        if (response.code === 1) {
          message.success(response.msg)
        } else {
          message.error(response.msg);
        }
      },
    });
  }

  deleteIndex = () => {
    const { selectedRowKeys2 } = this.state;
    if (selectedRowKeys2.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      console.log(selectedRowKeys2)
      const that = this;
      confirm({
        title: '删除确认',
        content: '是否删除该指标对应科室标杆值?',
        okText: '是',
        cancelText: '否',
        onOk() {
          that.dispatchDeleteIndex(selectedRowKeys2, true)
        },
        onCancel() {
          that.dispatchDeleteIndex(selectedRowKeys2, false)
        },
      })
    }
  };

  enableVersionOnChange = (normT) =>{
    console.log('enableVersionOnChange',normT)
    this.props.dispatch({
      type: 'standardMgr/enableVersion',
      payload: {
        normT,
      },
      callback: response => {
        console.log('callback',response)
        if(response.code === 1){
          message.success(response.msg)
        }else{
          message.error(response.msg);
        }
      },
    });
  }

  standardValueOnChange = (normT, value) =>{
    console.log('standardValueOnChange',normT,value)
    const {standardValueList} = this.state;
    if(standardValueList.some((item, index, array) =>{return item.normT === normT})){
      standardValueList.forEach((item,index,arr)=>{
        if(item.normT === normT){
          item.standardValue = value;
        }
      });
    }else{
      standardValueList.push({'normT':normT,'standardValue':value})
    }
    console.log(this.state.standardValueList)
  }

  saveIndex =() => {
    const {standardValueList} = this.state;
    console.log('saveIndex',standardValueList)
    if(standardValueList.length === 0){
      message.warn('没有修改数据，无需保存！');
    }else{
      this.props.dispatch({
        type: 'standardMgr/saveIndex',
        payload: {
          standardValueList,
        },
      });
    }
  };
  importExcel =() => {
    this.refs.uploadModal.setState({visible:true})
  };

  changeFilterResult1 = (res) => {
    this.props.dispatch({
      type: 'standardMgr/queryVersions',
      payload: {
        filterResult:res,
      },
    });
  }

  changeFilterResult2 = (res) => {
    this.props.dispatch({
      type: 'standardMgr/queryHospitalIndex',
      payload: {
        filterResult:res,
      },
    });
  }

  render() {
    const { dataSource1, dataSource2 } = this.props.standardMgr;
    const { selectedRowKeys1,selectedRowKeys2 } = this.state;
    const rowSelection1 = {
      selectedRowKeys: selectedRowKeys1,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys1: ${selectedRowKeys}`, 'selectedRows1: ', selectedRows);
        // this.setState({ selectedRowKeys1:selectedRows.map(obj =>obj.key)});
        this.setState({ selectedRowKeys1: selectedRowKeys });
      },
    };
    const rowSelection2 = {
      selectedRowKeys: selectedRowKeys2,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys2: ${selectedRowKeys}`, 'selectedRows2: ', selectedRows);
        // this.setState({ selectedRowKeys2:selectedRows.map(obj =>obj.key) });
        this.setState({ selectedRowKeys2: selectedRowKeys });
      },
    };
    return (
      <div className={HiaStyles.contentDiv}>
        <div className={HiaStyles.showPageDiv}>
          <Drawer
            title="新增版本"
            placement="left"
            width="300"
            // zIndex='1000000'
            closable={false}
            onClose={this.onCloseLeft}
            visible={this.state.leftVisible}
          >
            <VersionWindow onClose={this.onCloseLeft} versionForm={this.formRef1} />
          </Drawer>
          <Drawer
            title="新增指标"
            placement="left"
            width="400"
            // zIndex='1000000'
            closable={false}
            onClose={this.onCloseRight}
            visible={this.state.rightVisible}
          >
            <IndexWindow onClose={this.onCloseRight} indexForm={this.formRef2} />
          </Drawer>

          <FilterGroup
            onChange={this.changeFilterResult1}
            rowTypes={['versionNumber']}
          />
          <Table rowSelection={rowSelection1} pagination={{pageSize: 10}} dataSource={dataSource1} columns={this.columns} />
          <FooterToolbar>
            <Button onClick={this.showLeftDrawer}>新增</Button>
            <Button onClick={this.deleteVersion}>删除</Button>
            <Button onClick={this.importExcel}>导入</Button>
            <UploadModal {...this.props} ref="uploadModal" action="url1" templateName="医院标杆值模板.xlsx" />
          </FooterToolbar>

          <Divider />

          <FilterGroup
            onChange={this.changeFilterResult2}
            rowTypes={['indexClassification','index']}
          />
          <Table rowSelection={rowSelection2} pagination={{pageSize: 10}} dataSource={dataSource2} columns={this.columns2} />
          <FooterToolbar>
            <Button onClick={this.showRightDrawer}>新增</Button>
            <Button onClick={this.deleteIndex}>删除</Button>
            <Button onClick={this.saveIndex}>保存</Button>
          </FooterToolbar>
          {/*<Layout>*/}
            {/*<Header style={{background:'#fff',padding:'10px'}}>*/}
              {/*<VersionForm toParent={this.getChildInfo.bind(this)} wrappedComponentRef={(inst) => this.formRef1 = inst} />*/}
            {/*</Header>*/}
            {/*<Layout>*/}
              {/*<Sider style={{background:'#fff',padding:'10px 10px'}} width="400">*/}
                {/*<div>*/}
                  {/*<Button type="primary" onClick={this.showLeftDrawer}>新增</Button>*/}
                  {/*<Button type="primary" onClick={this.deleteVersion}>删除</Button>*/}
                  {/*<Button type="primary">导入</Button>*/}
                {/*</div>*/}
                {/*<Table bordered rowSelection={rowSelection1} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource1} columns={this.columns} />*/}
              {/*</Sider>*/}
              {/*<Content>*/}
                {/*<div>*/}
                  {/*<Row>*/}
                    {/*<Col span={16}>*/}
                      {/*<IndexForm toParent={this.getChildInfo2.bind(this)} wrappedComponentRef={(inst) => this.formRef2 = inst} />*/}
                    {/*</Col>*/}
                    {/*<Col style={{padding:'3px'}}>*/}
                      {/*<Button type="primary" onClick={this.showRightDrawer}>新增</Button>*/}
                      {/*<Button type="primary" onClick={this.deleteIndex}>删除</Button>*/}
                    {/*</Col>*/}
                  {/*</Row>*/}
                {/*</div>*/}
                {/*<Table bordered rowSelection={rowSelection2} scroll={{ x: 100,y: 2400}} pagination={{pageSize: 10}} size='small'  dataSource={this.state.dataSource2} columns={this.columns2} />*/}
              {/*</Content>*/}
            {/*</Layout>*/}
          {/*</Layout>*/}
        </div>
      </div>
    )
  }
}

// const page = Form.create()(HospitalStandardMgr);
// export default page;
