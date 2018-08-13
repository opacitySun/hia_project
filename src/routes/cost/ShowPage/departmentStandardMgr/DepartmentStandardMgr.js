import React from 'react';
import { connect } from 'dva';
import {Form, Button, Select, Table, message, Input} from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import FilterGroup from 'components/Hia/FilterGroup';
import HiaStyles from '../../../../utils/hia.less';
import {
  SysParamConfigService,
} from './../../process/LoadService'

const FormItem = Form.Item;
const {Option} = Select;

const process = new SysParamConfigService();

class DepartmentStandardMgr extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      dataSource:[],
    }
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
    console.log(selectedRowKeys)
    if (selectedRowKeys.length === 0) {
      message.warn('请选择要删除的行！');
    } else {
      process.deleteDepStdValue(selectedRowKeys, (result)=>{
        result = {'code':'1', 'msg':'删除成功'}
        console.log('deleteDepStdValue', selectedRowKeys, result)
        if(result.code === '1'){
          message.success(result.msg);
          // this.formRef1.query(e);
        }else{
          message.error(result.msg);
        }
      });
    }
  };

  save = () => {
    const { selectedRowKeys } = this.state;
    const { dataSource } = this.state;
    const selectedDataSource = dataSource.filter(item => selectedRowKeys.some(key => item.key === key));
    const selectedDataList = selectedDataSource.map((item) => {
      // Tip BdTitle 继承了Base带入了多余的父类属性，无法直接保存
      const depStdValue = new DepStdValue();
      // 让dataSource选中行置为不可编辑状态
      // delete item.$$editable;
      depStdValue.copyPropValues(item);
      return depStdValue;
    });
    console.log('selectedDataList', selectedDataList);
    process.saveDepStdValue(selectedDataList, (result) => {
      result = {'code':'1', 'msg':'保存成功'}
      console.log('saveDepStdValue', selectedDataList, result)
      if(result.code === '1'){
        message.success(result.msg);
        // this.props.versionForm.query(e)
      }else{
        message.error(result.msg);
      }
    });
  };

  import = () => {

  };

  render() {

    this.columns = [
      {
        title: '序号',
        width:'6%',
        align:'center',
        dataIndex: 'key',
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
        dataIndex: 'department',
      },{
        title: '指标分类',
        // width:'10%',
        align:'center',
        dataIndex: 'indexType',
      },{
        title: '指标编码',
        // width:'10%',
        align:'center',
        dataIndex: 'indexCode',
      },{
        title: '指标名称',
        width:'10%',
        align:'center',
        dataIndex: 'indexName',
      },{
        title: '计量单位',
        // width:'10%',
        align:'center',
        dataIndex: 'unit',
      },{
        title: '标杆值(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'standardValue',
        render:(text)=>{
          return(
            <Input defaultValue={text} />
          )
        },
      },{
        title: '区域(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'area',
      },{
        title: '医院等级(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'level',
      },{
        title: '医院类型(E)',
        // width:'10%',
        align:'center',
        dataIndex: 'type',
      },
    ];

    // const formItemLayout = {
    //   labelCol: {
    //     xs: {span: 0},
    //     sm: {span: 9},
    //   },
    //   wrapperCol: {
    //     xs: {span: 0},
    //     sm: {span: 13},
    //   },
    // };
    // const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: (selectedKeys, selectedRows) => {
    //     console.log(`selectedKeys: ${selectedKeys}`, 'selectedRows: ', selectedRows);
    //     this.setState({ selectedRowKeys:selectedKeys });
    //   },
    // };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys });
      },
    };

    return (
      <div className={HiaStyles.contentDiv}>
        <div className={HiaStyles.showPageDiv}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['versionNumber','indexClassification','index']}
          />
          <Table rowSelection={rowSelection} pagination={{pageSize: 10}} dataSource={this.state.dataSource} columns={this.columns} />
          <FooterToolbar>
            <Button onClick={this.delete}>删除</Button>
            <Button onClick={this.save}>保存</Button>
            <Button onClick={this.import}>导入</Button>
          </FooterToolbar>
        </div>
      </div>
    )
  }
}

const page = Form.create()(DepartmentStandardMgr);
export default page;
