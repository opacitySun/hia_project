/**
 * 机构管理
 * 1.机构管理 -- 增删改查
 *
 */
import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Icon,
  Button,
  Table,
  Modal,
  Select,
  Cascader,
  Pagination,
  Switch
} from "antd";
import FilterGroup from "components/Hia/FilterGroup";
import HiaPagination from 'components/Hia/HiaPagination';
import HiaModal from 'components/Hia/HiaModal';
import styles from "./org.less";

// const CheckboxGroup = Checkbox.Group;
@connect(({ org, loading }) => ({
  org,
  loading: loading.models.org
}))

export default class Org extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    selectedRowKeys: [],
    orgOnForm: {},
    cityVisible:true,
    countyVisible:true,
    provinceValue:"",
    cityValue:"",
    countyValue:"",
    areaValue:[],
    belongToCode:"",
    bedScaleCode:"",
    hospGradeCode:"",
    hospTypeCode:"",
    OrgType:"",
    parentOrg:"",
    pageSize:10,
    pageNum:1
    // provinceOptions:[],
    // cityOptions:[],
    // countyOptions:[],
    // provinces: provinces[provinceData[0]],
  };
//界面渲染后，立即调用，查询所有的机构
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "org/fetchOrgs",
      payload:{
        pageSize:10,
        pageNum:1
      }
    });

  }


  /**
   * Table表格勾选changed
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  /**
   * Table 点击行事件处理
   * @param record
   */
  handleTableRowClick = record => {
    // 查询机构信息
    this.props.dispatch({
      type: "org/queryOrg",
      payload: record.id,
      callback: dictOrg => {
        if(dictOrg.areaCode!=null&&dictOrg.areaCode!==""){
          if(dictOrg.areaCode.length===6){
            dictOrg.areaCodeList = [
              dictOrg.areaCode.substring(0,2).toString(),
              dictOrg.areaCode.substring(0,4).toString(),
              dictOrg.areaCode.toString(),
            ];
          }
          if(dictOrg.areaCode.length===4){
            dictOrg.areaCodeList = [
              dictOrg.areaCode.substring(0,2).toString(),
              dictOrg.areaCode.toString(),
            ];
          }
          if(dictOrg.areaCode.length===2){
            dictOrg.areaCodeList = [
              dictOrg.areaCode.toString(),
            ];
          }
        }
        this.setState({
          // 打开 Modal,设置 Form 信息
          modalVisible: true,
          orgOnForm: dictOrg,
        });
      }
    });
  };

  // 弹出框开关
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      orgOnForm: {}
    });
  };

  // 删除
  handleDel = () => {
    const { selectedRows } = this.state;
    const delIds = selectedRows.map(item => {
      return item.id;
    });
    this.props.dispatch({
      type: "org/deleteOrgs",
      payload: delIds,
      callback: () => {
        //删除完成后，重新查询展示界面
        const { dispatch } = this.props;
        dispatch({
          type: "org/fetchOrgs",
          payload:{
            pageSize:this.state.pageSize,
            pageNum:this.state.pageNum
          }
        });
      }

    });
  };

  // 保存
  handleSave = formValues => {
    let areaCodeTmp = '';
    if(formValues.areaCode && formValues.areaCode instanceof Array && formValues.areaCode.length > 0){
      areaCodeTmp = formValues.areaCode[formValues.areaCode.length-1];
    }
    const { orgOnForm } = this.state;
    this.props.dispatch({
      type: "org/saveOrg",
      payload: {
        id: orgOnForm.id,
        orgName: formValues.orgName,
        address: formValues.address,
        phone:formValues.phone,
        fax:formValues.fax,
        parentOrg: formValues.parentOrg,
        areaCode: areaCodeTmp,
        belongToCode: formValues.belongToCode,
        hospGradeCode: formValues.hospGradeCode,
        hospTypeCode:formValues.hospTypeCode,
        bedScaleCode:formValues.bedScaleCode,
        orgType:formValues.orgType
      },
      callback: () => {
        // 保存成功后，重置变量
        this.setState({
          modalVisible: false,
          orgOnForm: {}
        });
        //新增保存完成后，重新查询展示界面
        const { dispatch } = this.props;
        dispatch({
          type: "org/fetchOrgs",
          payload:{
            pageSize:this.state.pageSize,
            pageNum:1
          }
        });
      }
    });
  };

  // // Modal 勾选角色
  // handleRoleChecked = formValues => {
  //   // console.log("Modal checked handle， ", formValues);
  //   const { orgOnForm } = this.state;
  //   this.setState({
  //     orgOnForm: Object.assign({}, orgOnForm, formValues)
  //   });
  // };

  //搜索结果提交
  handleQuery = (values) =>{
    const { dispatch } = this.props;
    dispatch({
      type: "org/fetchOrgs",
      payload:{
        orgName:values.org_name,
        orgType:values.org_type,
        provinceValue:this.state.provinceValue,
        cityValue:this.state.cityValue,
        countyValue:this.state.countyValue,
        areaValue:values.area_code,
        belongToCode:values.belong_to_code,
        bedScaleCode:values.bed_scale_code,
        hospGradeCode:values.hosp_grade_code,
        hospTypeCode:values.hosp_type_code,
        parentOrg:values.parent_org,
        pageSize:this.state.pageSize,
        pageNum:1
      }
    });
  };
  //根据省查询市
  handleProvinceChange = (value) => {
    // const {citys} = this.props.org;
    // citys.length = 0;
    this.setState({
      provinceValue:value,
      cityVisible:false,
      // cityOptions:[],
      // this.state.provinceOptions.length = 0,
    });
    const { dispatch } = this.props;
    dispatch({
      type: "org/findCity",
      payload:value,
    });
  }
  handleCityChange = (value) => {
    this.setState({
      cityValue:value,
      countyVisible:false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: "org/findCounty",
      payload:value,
    });
  }
  handleCountyChange = (value) => {
    this.setState({
      countyValue:value,
    });
  }

  onChangePagination = (pageNum,pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: "org/fetchOrgs",
      payload:{
        orgName:this.state.orgName,
        orgType:this.state.orgType,
        pageSize:pageSize,
        pageNum:pageNum
      }
    });
    this.setState({
      pageNum:pageNum,
      pageSize:pageSize
    });
  }

  changeIsStop = (status,record) => {
    const { dispatch } = this.props;
    dispatch({
      type: "org/startOrStop",
      payload:{
        id:record.id,
        isStop:status
      }
    });

  }

  render() {
    const columns = [
      { title: "单位名称", dataIndex: "orgName" },
      { title: "单位类型", dataIndex: "orgType",
        render:(col) => {
          return col == 0?'医院':'政府';
        } },
      // { title: "区域", dataIndex: "areaCode" },
      { title: "区域", dataIndex: "areaCodeName" },
      // { title: "归属", dataIndex: "belongToCode" },
      { title: "归属", dataIndex: "belongToName" },
      // { title: "医院类型", dataIndex: "hospTypeCode" },
      { title: "医院类型", dataIndex: "hospTypeName" },
      // { title: "医院等级", dataIndex: "hospGradeCode" },
      { title: "医院等级", dataIndex: "hospGradeName" },
      // { title: "床位范围", dataIndex: "bedScaleCode" },
      // { title: "床位范围", dataIndex: "bedScaleCode" },
      { title: "床位范围", dataIndex: "bedScaleName" },
      { title: "电话", dataIndex: "phone" },
      { title: "传真", dataIndex: "fax" },
      { title: "地址", dataIndex: "address" },
      { title:'状态',
        dataIndex:'isStop',
        render:(col) => {
          const status = col == 1?true:false;
          return <Switch defaultChecked={status} />
        }
      },
    ];

    const {
      org
    } = this.props;
    const orgList = (org && org.pageResult)?org.pageResult.result:[];
    const rowCount = (org && org.pageResult)?org.pageResult.rowCount:1;
    const { selectedRowKeys, modalVisible, orgOnForm } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange
    };

    const parentArguments = {
      handleSave: this.handleSave,
      handleModalVisible: this.handleModalVisible,
      // handleRoleChecked: this.handleRoleChecked,
      orgOnForm,
      // area:org.area
      org,
    };

    return (
      <div>
        <FilterGroup
          onChange={this.handleQuery}
          rowTypes={['org','area','medicalInstitution']}
        />
        <div className={styles.tableListOperator}>
          <Button
            icon="plus"
            type="primary"
            onClick={() => this.handleModalVisible(true)}
          >
            新建
          </Button>
          <Button
            icon="minus"
            type="primary"
            onClick={() => this.handleDel()}
          >
            删除
          </Button>
        </div>
        <div className={styles.tableList}>
          <Table
            bordered
            rowKey="id"
            dataSource={orgList}
            columns={columns}
            rowSelection={rowSelection}
            pagination={false}
            onRow={record => {
              return {
                onClick: (e) => {
                  const targetClass = e.target.getAttribute('class');
                  if(targetClass.indexOf('ant-switch') > -1){
                    let status = 1;
                    if(targetClass.indexOf('ant-switch-checked') > -1){
                      status = 0;
                    }else{
                      status = 1;
                    }
                    this.changeIsStop(status,record);
                    return false;
                  }
                  this.handleTableRowClick(record);
                } // 点击行
              };
            }}
          />
          <HiaPagination total={rowCount} onChange={this.onChangePagination} />
        </div>

        <HiaModal parentArguments={parentArguments} modalVisible={modalVisible} />
      </div>
    );
  }
}
