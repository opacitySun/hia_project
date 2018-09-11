import React from 'react';
import { connect } from 'dva';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import FilterGroup from 'components/Hia/FilterGroup';
import {Form, Button, Table, message, InputNumber} from 'antd';
import UploadModal from '../UploadModal';

import HiaStyles from '../../../../utils/hia.less';

@connect(({ standardMgr }) => ({
  standardMgr,
}))
class DepartmentStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      standardValueList:[],
    }

    this.columns = [
      {
        title: '序号',
        // width:'6%',
        align:'center',
        dataIndex: 'sortNo',
      },{
        title: '版本号',
        // width:'8%',
        align:'center',
        dataIndex: 'versionName',
      },{
        title: '年度',
        align:'center',
        dataIndex: 'yearCode',
      },{
        title: '标准科室',
        align:'center',
        dataIndex: 'deptName',
      },{
        title: '指标分类',
        align:'center',
        dataIndex: 'indexTypeName',
      },{
        title: '指标编码',
        align:'center',
        dataIndex: 'indexCode',
      },{
        title: '指标名称',
        align:'center',
        dataIndex: 'indexName',
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

  componentDidMount() {
    this.changeFilterResult({})
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  standardValueOnChange = (id, value) =>{
    console.log('standardValueOnChange',id,value)
    const {standardValueList} = this.state;
    if(standardValueList.some((item, index, array) =>{return item.id === id})){
      standardValueList.forEach((item,index,arr)=>{
        if(item.id === id){
          item.normValue = value;
        }
      });
    }else{
      standardValueList.push({'id':id,'normValue':value})
    }
    console.log(this.state.standardValueList)
  }

  importExcel =() => {
    this.refs.uploadModal.setState({visible:true})
  };

  saveIndex =() => {
    const {standardValueList} = this.state;
    console.log('saveIndex',standardValueList)
    if(standardValueList.length === 0){
      message.warn('没有修改数据，无需保存！');
    }else{
      this.props.dispatch({
        type: 'standardMgr/updateDeptIndex',
        payload: {
          standardValueList,
        },
        callback: response => {
          console.log('callback',response)
          if(response.code === 1){
            this.setState({standardValueList:[]})
            message.success(response.msg)
          }else{
            message.error(response.msg);
          }
        },
      });
    }
  };

  delete = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      const {dispatch} = this.props
      dispatch({
        type: 'standardMgr/deleteDeptIndex',
        payload: {
          ids: selectedRowKeys,
        },
        callback: response => {
          console.log('deleteDeptIndex callback', response)
          if (response.code === 1) {
            this.setState({ selectedRowKeys:[] });
            message.success(response.msg)
          } else {
            message.error(response.msg);
          }
        },
      })
    }
  };

  changeFilterResult = (res) => {
    this.props.dispatch({
      type: 'standardMgr/queryDeptIndex',
      payload: {
        filterResult:res,
      },
    });
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {dataSource3} = this.props.standardMgr
    return (
      <div className={HiaStyles.contentDiv}>
        <div className={HiaStyles.showPageDiv}>
          <FilterGroup
            onChange={this.changeFilterResult}
            rowTypes={['versionNumber', 'standardDepartment', 'indexClassification', 'index']}
          />
          <Table rowSelection={rowSelection} pagination={{pageSize: 10}} dataSource={dataSource3} columns={this.columns} />
          <FooterToolbar>
            <Button onClick={this.delete}>删除</Button>
            <Button onClick={this.saveIndex}>保存</Button>
            <Button onClick={this.importExcel}>导入</Button>
            <UploadModal {...this.props} ref="uploadModal" checkValue="如果当前系统已存在该版本科室标杆值数据，是否继续导入?" action="/deptIndexValMana/exportExcel" templateName="科室标杆值模板.xlsx" />
          </FooterToolbar>
        </div>
      </div>
    )
  }
}

const page = Form.create()(DepartmentStandardMgr);
export default page;
