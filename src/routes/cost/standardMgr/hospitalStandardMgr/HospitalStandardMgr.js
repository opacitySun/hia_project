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

@connect(state => ({
  bdDict: state.bdDict,
  standardMgr: state.standardMgr,
}))
export default class HospitalStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftVisible:false,
      rightVisible:false,
      selectedRowKeys1:[],
      selectedRowKeys2:[],
      normValue:[],
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
        dataIndex: 'versionName',
      },{
        title: '年度',
        align:'center',
        dataIndex: 'yearCode',
      },{
        title: '启用',
        align:'center',
        dataIndex: 'isUsed',
        render:(text, record)=>{
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" checked={text===1} disabled={text===1} onChange={checked => this.enableVersionOnChange(record.pkId,checked)} />
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
        dataIndex: 'indexTypeName',
        // dataIndex: 'indexTypeCode',
        // render:(value) => MyUtil.mapListToObject(this.props.standardMgr.indexTypeList, 'indexTypeCode', 'indexTypeName')[value],
      },{
        title: '指标编码',
        align:'center',
        key: 'indexCode1',
        dataIndex: 'indexCode',
      },{
        title: '指标名称',
        align:'center',
        key: 'indexCode2',
        dataIndex: 'indexName',
        // dataIndex: 'indexCode',
        // render:(value) => MyUtil.mapListToObject(this.props.standardMgr.indexList, 'indexCode', 'indexName')[value],
      },{
        title: '是否预警',
        align:'center',
        dataIndex: 'isWarning',
        render:(text)=>{
          return(
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={text===1} disabled={true} />
          )
        },
      },{
        title: '计量单位',
        align:'center',
        dataIndex: 'meteringUnitName',
      },{
        title: '标杆值(E)',
        align:'center',
        dataIndex: 'standardValue',
        render:(text, record)=>{
          return(
            <InputNumber
              defaultValue={text}
              onChange={value => this.standardValueOnChange(record.pkId, value)}
              precision="2"
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )
        },
      },{
        title: '区域(E)',
        align:'center',
        dataIndex: 'areaName',
        // dataIndex: 'areaCode',
        // render:(value) => MyUtil.mapListToObject(this.props.standardMgr.allAreaList, 'areaCode', 'areaName')[value],

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

  showLeftDrawer = () => {
    this.setState({
      leftVisible: true,
    });
  };

  showRightDrawer = () => {
    // this.props.dispatch({
    //   type: 'bdDict/queryVersionDict',
    //   payload: {
    //     filterResult:{},
    //   },
    // })
    this.setState({
      rightVisible: true,
    });
  };

  deleteVersion = () => {
    const { selectedRowKeys1 } = this.state;
    if (selectedRowKeys1.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      const {dispatch} = this.props
      dispatch({
        type: 'bdDict/deleteVersion',
        payload: {
          pkId: selectedRowKeys1[0],
          isYes: false,
        },
        callback: response => {
          console.log('response', response)
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
                  type: 'bdDict/deleteVersion',
                  payload: {
                    pkId: selectedRowKeys1[0],
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
        pkIds: selectedRowKeys2,
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
    const that = this;
    const { selectedRowKeys2 } = this.state;
    if (selectedRowKeys2.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      console.log(selectedRowKeys2)
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

  enableVersionOnChange = (pkId) =>{
    console.log('enableVersionOnChange',pkId)
    this.props.dispatch({
      type: 'bdDict/enableVersion',
      payload: {
        pkId,
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

  standardValueOnChange = (id, value) =>{
    console.log('standardValueOnChange',id,value)
    const {normValue} = this.state;
    if(normValue.some((item) =>{return item.id === id})){
      normValue.forEach((item)=>{
        if(item.id === id){
          item.normValue = value;
        }
      });
    }else{
      normValue.push({'id':id,'normValue':value})
    }
    console.log(this.state.normValue)
  }

  updateIndex =() => {
    const {normValue} = this.state;
    console.log('updateIndex',normValue)
    if(normValue.length === 0){
      message.warn('没有修改数据，无需保存！');
    }else{
      this.props.dispatch({
        type: 'standardMgr/updateIndex',
        payload: {
          normValue,
        },
        callback: response => {
          console.log('callback',response)
          if(response.code === 1){
            this.setState({normValue:[]})
            message.success(response.msg)
          }else{
            message.error(response.msg);
          }
        },
      });
    }
  };
  importExcel =() => {
    this.refs.uploadModal.setState({visible:true})
  };

  // changeFilterResult1 = (res) => {
  //   console.log('res',res)
  //   this.props.dispatch({
  //     type: 'standardMgr/queryVersions',
  //     payload: {
  //       filterResult:res,
  //     },
  //   });
  // }

  changeFilterResult2 = (res) => {
    console.log('res',res)
    if(res.version_number == null)  return
    this.props.dispatch({
      type: 'standardMgr/queryHospitalIndex',
      payload: {
        filterResult:res,
      },
    });
  }

  render() {
    console.log(this.props)
    const { dataSource2 } = this.props.standardMgr
    const { versionList } = this.props.bdDict
    versionList.map((item, index) => {
      Object.assign(item, {key: item.pkId, sortNo:index+1})
      return item
    });

    const { selectedRowKeys1,selectedRowKeys2 } = this.state
    const rowSelection1 = {
      selectedRowKeys: selectedRowKeys1,
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys1: ${selectedRowKeys}`, 'selectedRows1: ', selectedRows);
        this.setState({ selectedRowKeys1: selectedRowKeys })
        // this.changeFilterResult2({versionId:selectedRows.pkId})
      },
    };
    const rowSelection2 = {
      selectedRowKeys: selectedRowKeys2,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys2: ${selectedRowKeys}`, 'selectedRows2: ', selectedRows);
        this.setState({ selectedRowKeys2: selectedRows });
      },
    };
    return (
      <div className={HiaStyles.contentDiv}>
        <div className={HiaStyles.showPageDiv}>
          <Drawer
            title="新增版本"
            placement="left"
            width={400}
            // zIndex='1000000'
            closable={false}
            onClose={this.onCloseLeft}
            visible={this.state.leftVisible}
            style={{
              height: 'calc(100% - 55px)',
              overflow: 'auto',
              paddingBottom: 53,
            }}
          >
            <VersionWindow onClose={this.onCloseLeft} versionForm={this.formRef1} />
          </Drawer>
          <Drawer
            title="新增指标"
            placement="left"
            width={720}
            // zIndex='1000000'
            closable={false}
            onClose={this.onCloseRight}
            visible={this.state.rightVisible}
            style={{
              height: 'calc(100% - 55px)',
              overflow: 'auto',
              paddingBottom: 53,
            }}
          >
            <IndexWindow onClose={this.onCloseRight} indexForm={this.formRef2} />
          </Drawer>

          {/*<FilterGroup*/}
            {/*onChange={this.changeFilterResult1}*/}
            {/*rowTypes={['versionNumber']}*/}
          {/*/>*/}
          <Table rowSelection={rowSelection1} pagination={{pageSize: 5}} dataSource={versionList} columns={this.columns} />
          <FooterToolbar>
            <Button onClick={this.showLeftDrawer}>新增</Button>
            <Button onClick={this.deleteVersion}>删除</Button>
            <Button onClick={this.importExcel}>导入</Button>
            <UploadModal {...this.props} ref="uploadModal" action="/hosIndexValMana/importSysStandardIndex1" templateName="医院标杆值模板.xlsx" />
          </FooterToolbar>

          <Divider />

          <FilterGroup
            onChange={this.changeFilterResult2}
            rowTypes={['versionNumber','indexClassification','index']}
          />
          <Table rowSelection={rowSelection2} pagination={{pageSize: 20}} dataSource={dataSource2} columns={this.columns2} />
          <FooterToolbar>
            <Button onClick={this.showRightDrawer}>新增</Button>
            <Button onClick={this.deleteIndex}>删除</Button>
            <Button onClick={this.updateIndex}>保存</Button>
          </FooterToolbar>
        </div>
      </div>
    )
  }
}
