import React from 'react';
import { connect } from 'dva';
import { Table,Icon,Divider } from 'antd';

@connect(({ projectCostAnalysis }) => ({
  projectCostAnalysis
}))
export default class ProjectHospitalComparison extends React.Component {

  state = {

  };

  queryHospitalComparison = () => {
    const { filterResult } = this.props;
    this.props.dispatch({
      type: 'projectCostAnalysis/queryHospitalComparison',
      payload: {
        filterResult:filterResult?filterResult:{}
      }
    });
  }

  componentDidMount() {
    this.queryHospitalComparison();
  }

  render() {
    const { projectCostAnalysis } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
        width:60
      },
      {
        title: '医院名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '服务量',
        dataIndex: 'service',
        key: 'service'
      },
      {
        title: '单位成本',
        dataIndex: 'unitCost',
        key: 'unitCost',
      },
      {
        title: '人员经费',
        dataIndex: 'personnelFunds',
        key: 'personnelFunds',
      },
      {
        title: '药品费',
        dataIndex: 'drugCharge',
        key: 'drugCharge',
      },
      {
        title: '卫生材料费',
        dataIndex: 'healthMaterialFee',
        key: 'healthMaterialFee',
      },
      {
        title: '固定资产折旧',
        dataIndex: 'assetsDepreciation',
        key: 'assetsDepreciation',
      },
      {
        title: '无形资产摊销',
        dataIndex: 'assetsAmortization',
        key: 'assetsAmortization',
      },
      {
        title: '提取医疗风险基金',
        dataIndex: 'medicalRiskFund',
        key: 'medicalRiskFund',
      },
      {
        title: '其他',
        dataIndex: 'other',
        key: 'other',
      }
    ];

    const data = projectCostAnalysis?projectCostAnalysis.hospitalComparison:[];

    return (
    	<div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
