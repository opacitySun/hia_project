import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Card, Select, List, DatePicker, Icon, Cascader, Button } from 'antd';
import classNames from 'classnames';
import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ filterGroup,bdDict }) => ({
  filterGroup,
  bdDict
}))
class FilterGroup extends PureComponent {
  state = {
    //组件高度
    height:'70px',
    //组件展开状态 0:收起 1:展开
    heightStatus:0,
    //组件展开收起按钮图表
    bottomIcon:'down',
    //日期类型
    timeType:0,
    timeSelectDefaultValue:[],
    /*筛选结果列表*/
    //年
    p_year_code:null,
    //月
    p_month_code:null,
    //季度
    p_season_code:null,
    //半年
    p_half_year_code:null,
    //日期
    date_code:null,
    //区域
    area_code:null,
    //医院类型
    hosp_type_code:null,
    //床位范围
    bed_scale_code:null,
    //医院等级
    hosp_grade_code:null,
    //所属
    belong_to_code:null,
    //医院编码
    hosp_code:null,
    //版本号
    version_number:null,
    //标准科室
    standard_department:null,
    //指标分类
    index_classification:null,
    //指标
    index:null,
    //指标名称
    index_name:null,
    //单位名称
    org_name:null,
    //单位类型
    org_type:null,
    //上级单位
    parent_org:null,
    //项目分类
    project_type:null,
    //项目名称
    project_name:null
  };

  //在第一次渲染后调用
  componentDidMount() {
    const self = this;
    const { rowTypes } = this.props;
    this.setDefaultYear();
    rowTypes.map(function(_rowTypes,_rowIndex){
      switch(_rowTypes){
        case 'area':
          self.queryRegion();
          break;
        case 'medicalInstitution':
          self.queryMedicalInstitution();
          break;
        case 'versionNumber':
          self.queryVersionNumber();
          break;
        case 'org':
          self.queryParentOrg();
          break;
        case 'project':
          self.queryProjectType();
          self.queryProjectName();
          break;
        case 'month':
          self.setDefaultMonth();
          break;
      }
    });
  }

  //组件的展开收缩
  changeFilterHeight = () => {
    if(this.state.heightStatus == 0){
      this.setState({
        height:'auto',
        heightStatus:1,
        bottomIcon:'up'
      });
    }else{
      this.setState({
        height:'70px',
        heightStatus:0,
        bottomIcon:'down'
      });
    }
  }

  //设置默认年份
  setDefaultYear = () => {
    const yearArr = this.getYear();
    const defaultYearCode = yearArr[0].value;
    this.setState({
      p_year_code:defaultYearCode
    });
    this.submitFilterResult('p_year_code',defaultYearCode);
  }

  //设置默认月份
  setDefaultMonth = () => {
    const yearArr = this.getYear();
    const defaultYearCode = yearArr[0].value;
    const monthArr = this.getMonth();
    const defaultMonthCode = monthArr[0].value;
    this.setState({
      p_year_code:defaultYearCode,
      p_month_code:defaultMonthCode
    });
    this.submitFilterResult('p_year_code|p_month_code',[defaultYearCode,defaultMonthCode]);
  }

  //获取最近5年的年份
  getYear = () => {
    const d = new Date();
    let nowYear = d.getFullYear();
    let yearArr = [];
    for(let i=0;i<5;i++){
      yearArr.push({
        'name':nowYear+'年',
        'value':nowYear
      });
      nowYear--;
    }
    return yearArr;
  }
  //获取月份
  getMonth = () => {
    let monthArr = [];
    for(let i=0;i<12;i++){
      const nowMonth = i + 1;
      monthArr.push({
        'name':nowMonth+'月',
        'value':nowMonth
      });
    }
    return monthArr;
  }
  //获取季度
  getQuarter = () => {
    let quarterArr = [];
    for(let i=0;i<4;i++){
      const nowQuarter = i + 1;
      quarterArr.push({
        'name':nowQuarter+'季度',
        'value':nowQuarter
      });
    }
    return quarterArr;
  }
  //获取半年
  getHalfYear = () => {
    return [
      {
        "name":"上半年",
        "value":"1"
      },
      {
        "name":"下半年",
        "value":"2"
      }
    ];
  }

  //获取区域
  queryRegion = () => {
    this.props.dispatch({
      type: 'filterGroup/queryReg'
    });
  }
  //获取医疗机构
  queryMedicalInstitution = () => {
    this.props.dispatch({
      type: 'filterGroup/queryMedicalInstitution'
    });
  }
  //获取版本号
  queryVersionNumber = () => {
    this.props.dispatch({
      type: 'bdDict/queryVersionDict'
    });
  }
  //获取上级单位
  queryParentOrg = () => {
    this.props.dispatch({
      type: 'filterGroup/queryParentOrg'
    });
  }
  //获取项目类别
  queryProjectType = () => {
    this.props.dispatch({
      type: 'filterGroup/queryProjectType'
    });
  }
  //获取项目名称
  queryProjectName = (typeCode) => {
    if(!typeCode){
      typeCode = '';
    }
    this.props.dispatch({
      type: 'filterGroup/queryProjectName',
      payload:{
        typeCode:typeCode
      }
    });
  }

  //监听日期的改变
  changeTimeSelect = (value) => {
    // value = value.join(',');
    switch(this.state.timeType){
      case 0:
        this.setState({
          p_year_code: value
        });
        this.submitFilterResult('p_year_code',value);
        break;
      case 1:
        this.setState({
          p_month_code: value
        });
        this.submitFilterResult('p_month_code',value);
        break;
      case 2:
        this.setState({
          p_season_code: value
        });
        this.submitFilterResult('p_season_code',value);
        break;
      case 3:
        this.setState({
          p_half_year_code: value
        });
        this.submitFilterResult('p_half_year_code',value);
        break;
    }
  };

  //监听年份的改变
  changeYear = (value) => {
    this.setState({
      p_year_code: value
    });
    this.submitFilterResult('p_year_code',value);
  }

  //监听月份的改变
  changeMonth = (value) => {
    this.setState({
      p_month_code: value
    });
    this.submitFilterResult('p_month_code',value);
  }

  //监听日期的改变
  changeDate = (moment,dateString) => {
    this.setState({
      date_code: dateString
    });
    this.submitFilterResult('date_code',dateString);
  }

  //监听区域的改变
  changeRegion = (value) => {
    this.setState({
      area_code: value
    });
    this.submitFilterResult('area_code',value);
  };

  //监听版本号的改变
  changeVersionNumber = (value) => {
    this.setState({
      version_number: value
    });
    this.submitFilterResult('version_number',value);
  };

  //监听标准科室的改变
  changeStandardDepartment = (value) => {
    this.setState({
      standard_department: value
    });
    this.submitFilterResult('standard_department',value);
  };

  //监听指标分类的改变
  changeIndexClassification = (value) => {
    this.setState({
      index_classification: value
    });
    this.submitFilterResult('index_classification',value);
  };

  //监听指标的改变
  changeIndex = (value) => {
    this.setState({
      index: value
    });
    this.submitFilterResult('index',value);
  };

  //监听指标名称的改变
  changeIndexName = (value) => {
    this.setState({
      index_name: value
    });
    this.submitFilterResult('index_name',value);
  };

  //监听单位名称的改变
  changeOrgName = (value) => {
    this.setState({
      org_name: value
    });
    this.submitFilterResult('org_name',value);
  };

  //监听单位类型的改变
  changeOrgType = (value) => {
    this.setState({
      org_type: value
    });
    this.submitFilterResult('org_type',value);
  };

  //监听上级单位的改变
  changeParentOrg = (value) => {
    this.setState({
      parent_org: value
    });
    this.submitFilterResult('parent_org',value);
  };

  //监听项目类别的改变
  changeProjectType = (value) => {
    this.queryProjectName(value);
    this.setState({
      project_type: value
    });
    this.submitFilterResult('project_type',value);
  };

  //监听项目名称的改变
  changeProjectName = (value) => {
    this.setState({
      project_name: value
    });
    this.submitFilterResult('project_name',value);
  };

  //监听日期选择下拉框，并显示下拉框值对应的列表
  selectTimeType = (value) => {
    const yearArr = this.getYear();
    const yearCode = yearArr[0].value;
    this.setState({
      timeType: parseInt(value),
      timeSelectDefaultValue:[],
      p_year_code:yearCode,
      p_month_code:null,
      p_season_code:null,
      p_half_year_code:null
    });
    this.submitFilterResult('p_year_code',yearCode);
  };

  //获取筛选结果的value,并暴露给外部onChange
  submitFilterResult = (_type,_res) => {
    const { onChange } = this.props;
    let filterResult = {};
    filterResult['p_year_code'] = this.state.p_year_code;
    filterResult['p_month_code'] = this.state.p_month_code;
    filterResult['p_season_code'] = this.state.p_season_code;
    filterResult['p_half_year_code'] = this.state.p_half_year_code;
    filterResult['date_code'] = this.state.date_code;
    filterResult['area_code'] = this.state.area_code;
    filterResult['hosp_type_code'] = this.state.hosp_type_code;
    filterResult['bed_scale_code'] = this.state.bed_scale_code;
    filterResult['hosp_grade_code'] = this.state.hosp_grade_code;
    filterResult['belong_to_code'] = this.state.belong_to_code;
    filterResult['hosp_code'] = this.state.hosp_code;
    filterResult['version_number'] = this.state.version_number;
    filterResult['standard_department'] = this.state.standard_department;
    filterResult['index_classification'] = this.state.index_classification;
    filterResult['index'] = this.state.index;
    filterResult['index_name'] = this.state.index_name;
    filterResult['org_name'] = this.state.org_name;
    filterResult['org_type'] = this.state.org_type;
    filterResult['parent_org'] = this.state.parent_org;
    filterResult['project_type'] = this.state.project_type;
    filterResult['project_name'] = this.state.project_name;
    switch(_type){
      case 'p_year_code':
        filterResult['p_year_code'] = _res;
        break;
      case 'p_month_code':
        filterResult['p_month_code'] = _res;
        break;
      case 'p_year_code|p_month_code':
        filterResult['p_year_code'] = _res[0];
        filterResult['p_month_code'] = _res[1];
        break;
      case 'p_season_code':
        filterResult['p_season_code'] = _res;
        break;
      case 'p_half_year_code':
        filterResult['p_half_year_code'] = _res;
        break;
      case 'date_code':
        filterResult['date_code'] = _res;
        break;
      case 'area_code':
        filterResult['area_code'] = _res;
        break;
      case 'hosp_type_code':
        filterResult['hosp_type_code'] = _res;
        break;
      case 'bed_scale_code':
        filterResult['bed_scale_code'] = _res;
        break;
      case 'hosp_grade_code':
        filterResult['hosp_grade_code'] = _res;
        break;
      case 'belong_to_code':
        filterResult['belong_to_code'] = _res;
        break;
      case 'hosp_code':
        filterResult['hosp_code'] = _res;
        break;
      case 'version_number':
        filterResult['version_number'] = _res;
        break;
      case 'standard_department':
        filterResult['standard_department'] = _res;
        break;
      case 'index_classification':
        filterResult['index_classification'] = _res;
        break;
      case 'index':
        filterResult['index'] = _res;
        break;
      case 'index_name':
        filterResult['index_name'] = _res;
        break;
      case 'org_name':
        filterResult['org_name'] = _res;
        break;
      case 'org_type':
        filterResult['org_type'] = _res;
        break;
      case 'parent_org':
        filterResult['parent_org'] = _res;
        break;
      case 'project_type':
        filterResult['project_type'] = _res;
        break;
      case 'project_name':
        filterResult['project_name'] = _res;
        break;
    }
    if (onChange) {
      onChange(filterResult);
    }
  }

  submitBtnClick = () => {
    const { onClick } = this.props;
    let filterResult = {};
    filterResult['p_year_code'] = this.state.p_year_code;
    filterResult['p_month_code'] = this.state.p_month_code;
    filterResult['p_season_code'] = this.state.p_season_code;
    filterResult['p_half_year_code'] = this.state.p_half_year_code;
    filterResult['date_code'] = this.state.date_code;
    filterResult['area_code'] = this.state.area_code;
    filterResult['hosp_type_code'] = this.state.hosp_type_code;
    filterResult['bed_scale_code'] = this.state.bed_scale_code;
    filterResult['hosp_grade_code'] = this.state.hosp_grade_code;
    filterResult['belong_to_code'] = this.state.belong_to_code;
    filterResult['hosp_code'] = this.state.hosp_code;
    filterResult['version_number'] = this.state.version_number;
    filterResult['standard_department'] = this.state.standard_department;
    filterResult['index_classification'] = this.state.index_classification;
    filterResult['index'] = this.state.index;
    filterResult['index_name'] = this.state.index_name;
    filterResult['org_name'] = this.state.org_name;
    filterResult['org_type'] = this.state.org_type;
    filterResult['parent_org'] = this.state.parent_org;
    filterResult['project_type'] = this.state.project_type;
    filterResult['project_name'] = this.state.project_name;
    if (onClick) {
      onClick(filterResult);
    }
  }

  render() {
    const self = this;
    const {
      rowTypes,
      filterGroup,
      bdDict,
      onClick
    } = this.props;

    const timeSelect = {
      "type":[
        {
          "name":"年",
          "value":"0"
        },
        {
          "name":"月",
          "value":"1"
        },
        {
          "name":"季度",
          "value":"2"
        },
        {
          "name":"半年",
          "value":"3"
        }
      ],
      "data":[
        self.getYear(),
        self.getMonth(),
        self.getQuarter(),
        self.getHalfYear()
      ]
    };
    const region = (filterGroup && filterGroup.region)?filterGroup.region:[];
    const medicalInstitution = [
      {
        "key":"hospitalType",
        "name":"医院类型",
        "data":(filterGroup && filterGroup.hospitalType)?filterGroup.hospitalType:[]
      },
      {
        "key":"bedRange",
        "name":"床位范围",
        "data":(filterGroup && filterGroup.bedRange)?filterGroup.bedRange:[]
      },
      {
        "key":"hospitalGrade",
        "name":"医院等级",
        "data":(filterGroup && filterGroup.hospitalGrade)?filterGroup.hospitalGrade:[]
      },
      {
        "key":"belonged",
        "name":"所属",
        "data":(filterGroup && filterGroup.belonged)?filterGroup.belonged:[]
      },
      {
        "key":"hospital",
        "name":"医院",
        "data":(filterGroup && filterGroup.hospital)?filterGroup.hospital:[]
      }
    ];
    const versionNumber = bdDict.versionList;
    const standardDepartment = bdDict.sysDeptList;
    const indexClassification = bdDict.indexTypeList;
    const index = bdDict.indexList;
    const indexName = bdDict.indexList;
    const orgType = [
      {
        "name":"医院",
        "value":0
      },
      {
        "name":"政府",
        "value":1
      }
    ];
    const parentOrg = (filterGroup && filterGroup.parentOrg)?filterGroup.parentOrg:[];
    const projectType = (filterGroup && filterGroup.projectType)?filterGroup.projectType:[];
    const projectName = (filterGroup && filterGroup.projectName)?filterGroup.projectName:[];

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    //日期选择
    const timeSelectType = (timeSelect && timeSelect.type && timeSelect.type instanceof Array)?timeSelect.type.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):null;
    //年份选择
    const yearData = (timeSelect && timeSelect.data && timeSelect.data[0])?timeSelect.data[0].map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):null;
    //月份选择
    const monthData = (timeSelect && timeSelect.data && timeSelect.data[1])?timeSelect.data[1].map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):null;
    //医疗机构
    const medicalInstitutionData = (medicalInstitution && medicalInstitution instanceof Array)?medicalInstitution.map(function(_items){
      let item = (_items.data && _items.data instanceof Array)?_items.data.map(function(_item){
        switch(_items.key){
          case 'hospitalType':
            const hospitalTypeCode = (_item && _item.hospTypeCode)?_item.hospTypeCode:'';
            const hospitalTypeName = (_item && _item.hospTypeName)?_item.hospTypeName:'';
            return (
              <Option key={hospitalTypeCode} value={hospitalTypeCode} type="hospitalType">{hospitalTypeName}</Option>
            )
            break;
          case 'bedRange':
            const bedScopeCode = (_item && _item.bedScaleCode)?_item.bedScaleCode:'';
            const bedScopeName = (_item && _item.bedScaleName)?_item.bedScaleName:'';
            return (
              <Option key={bedScopeCode} value={bedScopeCode} type="bedRange">{bedScopeName}</Option>
            )
            break;
          case 'hospitalGrade':
            const hospitalLevelCode = (_item && _item.hospGradeCode)?_item.hospGradeCode:'';
            const hospitalLevelName = (_item && _item.hospGradeName)?_item.hospGradeName:'';
            return (
              <Option key={hospitalLevelCode} value={hospitalLevelCode} type="hospitalGrade">{hospitalLevelName}</Option>
            )
            break;
          case 'belonged':
            const hospitalBelongCode = (_item && _item.belongToCode)?_item.belongToCode:'';
            const hospitalBelongName = (_item && _item.belongToName)?_item.belongToName:'';
            return (
              <Option key={hospitalBelongCode} value={hospitalBelongCode} type="belonged">{hospitalBelongName}</Option>
            )
            break;
          case 'hospital':
            const hospitalCode = (_item && _item.orgCode)?_item.orgCode:'';
            const hospitalName = (_item && _item.orgName)?_item.orgName:'';
            return (
              <Option key={hospitalCode} value={hospitalCode} type="hospital">{hospitalName}</Option>
            )
            break;
        }
      }):null;
      return (
        <Select
          key={_items.key}
          onChange={self.handleSelectOption}
          placeholder={_items.name}
          style={{ maxWidth: 160, width: '100%' }}
          allowClear
        >
          {item}
        </Select>
      )
    }):null;
    const medicalInstitutionHTML =
    <Row gutter={16}>
      {medicalInstitutionData}
    </Row>;
    //版本号
    const versionNumberData = (versionNumber && versionNumber instanceof Array)?versionNumber.map(function(_item){
      return (
        <Option key={_item.pkId} value={_item.pkId}>{_item.versionName}</Option>
      )
    }):null;
    //标准科室
    const standardDepartmentData = (standardDepartment && standardDepartment instanceof Array)?standardDepartment.map(function(_item){
      return (
        <TagSelect.Option key={_item.deptCode} value={_item.deptCode}>{_item.deptName}</TagSelect.Option>
      )
    }):null;
    //指标分类
    const indexClassificationData = (indexClassification && indexClassification instanceof Array)?indexClassification.map(function(_item){
      return (
        <TagSelect.Option key={_item.indexTypeCode} value={_item.indexTypeCode}>{_item.indexTypeName}</TagSelect.Option>
      )
    }):null;
    //指标
    const indexData = (index && index instanceof Array)?index.map(function(_item){
      return (
        <TagSelect.Option key={_item.indexCode} value={_item.indexCode}>{_item.indexName}</TagSelect.Option>
      )
    }):null;
    //指标名称
    const indexNameData = (indexName && indexName instanceof Array)?indexName.map(function(_item){
      return (
        <Option key={_item.indexCode} value={_item.indexCode}>{_item.indexName}</Option>
      )
    }):null;
    //单位类型
    const orgTypeData = (orgType && orgType instanceof Array)?orgType.map(function(_item){
      return (
        <Option key={_item.value} value={_item.value}>{_item.name}</Option>
      )
    }):null;
    //上级单位
    const parentOrgData = (parentOrg && parentOrg instanceof Array)?parentOrg.map(function(_item){
      return (
        <Option key={_item.orgCode} value={_item.orgCode}>{_item.orgName}</Option>
      )
    }):null;
    //项目类别
    const projectTypeData = (projectType && projectType instanceof Array)?projectType.map(function(_item){
      return (
        <Option key={_item.incomeTypeCode} value={_item.incomeTypeCode}>{_item.incomeTypeName}</Option>
      )
    }):null;
    //项目名称
    const projectNameData = (projectName && projectName instanceof Array)?projectName.map(function(_item){
      return (
        <Option key={_item.incomeProjectCode} value={_item.incomeProjectCode}>{_item.incomeTypeName}</Option>
      )
    }):null;

    return (
      <div>
        <Card bordered={false} className={styles.filterCard} style={{height:self.state.height}}>
          <Form layout="inline">
            {
              rowTypes.map(function(_rowTypes,_rowIndex){
                switch(_rowTypes){
                  case 'timeSelect':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="日期类型" grid last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <Row gutter={16}>
                          <Col lg={4} md={8} sm={10} xs={24}>
                            <FormItem {...formItemLayout}>
                                <Select
                                  onChange={self.selectTimeType}
                                  defaultValue="0"
                                  className={styles.select}
                                >
                                  {timeSelectType}
                                </Select>
                            </FormItem>
                          </Col>
                          <Col lg={20} md={16} sm={14} xs={24}>
                            <FormItem>
                              {
                                (timeSelect && timeSelect.data)?timeSelect.data.map(function(_items,_index){
                                  let itemPlaceholder = '年份';
                                  switch(_index){
                                    case 1:
                                      itemPlaceholder = '月份';
                                      break;
                                    case 2:
                                      itemPlaceholder = '季度';
                                      break;
                                    case 3:
                                      itemPlaceholder = '半年';
                                      break;
                                    default:
                                      itemPlaceholder = '年份';
                                  }
                                  const item = _items.map(function(_item){
                                    return (
                                      <TagSelect.Option key={_item.value} value={_item.value}>{_item.name}</TagSelect.Option>
                                    )
                                  });
                                  const yearItem =
                                  <Fragment key={_index}>
                                    {/*<TagSelect key={_index} onChange={self.changeTimeSelect} defaultValue={[timeSelect.data[0][0].value]}>
                                      {item}
                                    </TagSelect>*/}
                                    <Select className={styles.select} defaultValue={timeSelect.data[0][0].value} onChange={self.changeYear}>
                                      {yearData}
                                    </Select>
                                  </Fragment>;
                                  const noYearItem =
                                  <Fragment key={_index}>
                                    <Row gutter={16}>
                                      <Col lg={6} md={8} sm={10} xs={24}>
                                        <Select className={styles.select} defaultValue={timeSelect.data[0][0].value} onChange={self.changeYear}>
                                          {yearData}
                                        </Select>
                                      </Col>
                                      {/*<Col lg={20} md={16} sm={14} xs={24}>
                                        <TagSelect key={_index} onChange={self.changeTimeSelect} defaultValue={self.timeSelectDefaultValue}>
                                          {item}
                                        </TagSelect>
                                      </Col>*/}
                                      <Col lg={6} md={8} sm={10} xs={24}>
                                        <Select className={styles.select} placeholder={itemPlaceholder} onChange={self.changeTimeSelect}>
                                          {item}
                                        </Select>
                                      </Col>
                                    </Row>
                                  </Fragment>;
                                  return (
                                    (self.state.timeType == _index)?
                                      (self.state.timeType == 0)?yearItem:noYearItem
                                    :null
                                  )
                                }):null
                              }
                            </FormItem>
                          </Col>
                        </Row>
                      </StandardFormRow>
                    );
                    break;
                  case 'month':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="日期类型" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Row gutter={16}>
                            <Col span={6} className={styles.select}>
                              <Select placeholder="年份" defaultValue={timeSelect.data[0][0].value} onChange={self.changeYear}>
                                {yearData}
                              </Select>
                            </Col>
                            <Col span={6} className={styles.select}>
                              <Select placeholder="月份" defaultValue={timeSelect.data[1][0].value} onChange={self.changeMonth}>
                                {monthData}
                              </Select>
                            </Col>
                          </Row>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'date':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="日期" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <DatePicker
                            onChange={self.changeDate}
                            className={styles.select}
                           />
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'area':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="区域" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Cascader
                            options={region}
                            onChange={self.changeRegion}
                            changeOnSelect
                            placeholder="区域"
                            className={styles.select}
                          />
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'medicalInstitution':
                    let isShow = true;
                    if(rowTypes.indexOf('org') > -1){
                      if(self.state.org_type == 0){
                        isShow = true;
                      }else{
                        isShow = false;
                      }
                    }else{
                      isShow = true;
                    }
                    return (
                      isShow?
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="医疗机构" grid last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        {medicalInstitutionHTML}
                      </StandardFormRow>
                      :null
                    )
                    break;
                  case 'versionNumber':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="版本号" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Select className={styles.select} placeholder={'版本号'} onChange={self.changeVersionNumber} allowClear>
                            {versionNumberData}
                          </Select>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'standardDepartment':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="标准科室" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeStandardDepartment} expandable>
                            {standardDepartmentData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'indexClassification':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标分类" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeIndexClassification} expandable>
                            {indexClassificationData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'index':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <TagSelect onChange={self.changeIndex} expandable>
                            {indexData}
                          </TagSelect>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'indexName':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="指标名称" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Select className={styles.select} onChange={self.changeIndexName} allowClear>
                            {indexNameData}
                          </Select>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'org':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="单位" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Row gutter={16}>
                            <Col span={6} className={styles.select}>
                              <Input placeholder="单位名称"  onChange={self.changeOrgName} />
                            </Col>
                            <Col span={6} className={styles.select}>
                              <Select placeholder="单位类型" onChange={self.changeOrgType}>
                                {orgTypeData}
                              </Select>
                            </Col>
                            {
                              self.state.org_type == 0?
                              <Col span={6} className={styles.select}>
                                <Select placeholder="上级单位" onChange={self.changeParentOrg} allowClear>
                                  {parentOrgData}
                                </Select>
                              </Col>
                              :null
                            }
                          </Row>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                  case 'project':
                    return (
                      <StandardFormRow key={`rowTypes${_rowIndex}`} title="项目" block last={(_rowIndex == rowTypes.length - 1)?true:false}>
                        <FormItem>
                          <Row gutter={16}>
                            <Col span={6} className={styles.select}>
                              <Select placeholder="项目类型" onChange={self.changeProjectType} allowClear>
                                {projectTypeData}
                              </Select>
                            </Col>
                            <Col span={6} className={styles.select}>
                              <Select placeholder="项目名称" onChange={self.changeProjectName} allowClear>
                                {projectNameData}
                              </Select>
                            </Col>
                          </Row>
                        </FormItem>
                      </StandardFormRow>
                    );
                    break;
                }
              })
            }
            {
              (rowTypes.length > 0 && onClick)?
              <StandardFormRow key={`rowTypes${rowTypes.length}`} block last className={styles.submitBtnDiv}>
                <FormItem>
                  <Button onClick={self.submitBtnClick}>提交</Button>
                </FormItem>
              </StandardFormRow>
              :null
            }
          </Form>
        </Card>
        <div className={styles.filterBottom}>
          <div className={styles.bottomCenter} onClick={self.changeFilterHeight}>
            <Icon type={self.state.bottomIcon} theme="outlined" />
          </div>
        </div>
      </div>
    )
  }
}

export default FilterGroup;
