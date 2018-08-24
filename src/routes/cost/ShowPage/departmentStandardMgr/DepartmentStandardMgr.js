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
        dataIndex: 'versionsName',
      },{
        title: '年度',
        // width:'6%',
        align:'center',
        dataIndex: 'year',
      },{
        title: '标准科室',
        // width:'10%',
        align:'center',
        dataIndex: 'deptName',
      },{
        title: '指标分类',
        // width:'10%',
        align:'center',
        dataIndex: 'indCatName',
      },{
        title: '指标编码',
        // width:'10%',
        align:'center',
        dataIndex: 'normIndCode',
      },{
        title: '指标名称',
        // width:'10%',
        align:'center',
        dataIndex: 'normIndName',
      },{
        title: '计量单位',
        // width:'10%',
        align:'center',
        dataIndex: 'meteringUnit',
      },{
        title: '标杆值(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'normValue',
        render:(text, record)=>{
          return(
            <InputNumber defaultValue={text} onChange={value => this.standardValueOnChange(record.id, value)} />
          )
        },
      },{
        title: '区域(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'areaName',
      },{
        title: '医院等级(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'hospGradeName',
      },{
        title: '医院类型(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'hospTypeName',
      },
    ];
  }

  componentWillMount() {
    // process.queryDepartmentIndex('', '' ,(result)=>{
    //   result = [{'id':'123','versionsName':'HIA三级医院001','year':'2017','department':'标准科室1','indexType':'成本管控类','indexCode':'100001','indexName':'成本控制率','warning':1,'unit':'%','standardValue':0.567,'area':'北京','level':'三级甲等','type':'综合医院'},{'id':'321','versionsName':'HIA三级医院002','year':'2018','department':'标准科室2','indexType':'运行效率类','indexCode':'100002','indexName':'床位周转次数','warning':0,'unit':'次','standardValue':32.50,'area':'北京','level':'三级甲等','type':'综合医院'}];
    //   console.log('queryDepartmentIndex', '', '', result)
    //   result = result.map((item, index) => Object.assign(item, {key: item.id, sortNo:index + 1}))
    //   this.setState({dataSource:result});
    // })
    this.changeFilterResult({})
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

  // query = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if(!err){
  //       console.log(values);
  //       const param = values.paramName;
  //       process.queryByParam(param,(result)=>{
  //         console.log(result)
  //         this.setState({dataSource:result})
  //       })
  //     }
  //   });
  // }

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

  saveIndex =() => {
    const {standardValueList} = this.state;
    console.log('saveIndex',standardValueList)
    if(standardValueList.length == 0){
      message.warn('没有修改数据，无需保存！');
    }else{

    }
  };

  standardValueOnChange = (id, value) =>{
    console.log('standardValueOnChange',id,value)
    const {standardValueList} = this.state;
    if(standardValueList.some((item, index, array) =>{return item.id === id})){
      standardValueList.forEach((item,index,arr)=>{
        if(item.id === id){
          item.standardValue = value;
        }
      });
    }else{
      standardValueList.push({'id':id,'standardValue':value})
    }
    console.log(this.state.standardValueList)
  }

  importExcel =() => {
    this.refs.uploadModal.setState({visible:true})
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

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
            <UploadModal {...this.props} ref="uploadModal" action="url2" templateName="科室标杆值模板.xlsx" />
          </FooterToolbar>
        </div>
      </div>
    )
  }
}

const page = Form.create()(DepartmentStandardMgr);
export default page;
