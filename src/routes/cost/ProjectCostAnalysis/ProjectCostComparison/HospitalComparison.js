import React from 'react';
import { Table,Icon,Divider } from 'antd';

export default class ProjectHospitalComparison extends React.Component {

  state = {

  };

  componentWillMount() {
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
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

    const data = [{
      key: '1',
      no:'1',
      name: '北京同仁医院',
      service:2321,
      unitCost:3845.8,
      personnelFunds:7694,
      drugCharge:7439.65,
      healthMaterialFee:36497,
      assetsDepreciation:8657,
      assetsAmortization:3456,
      medicalRiskFund:128,
      other:8756
    }, {
      key: '2',
      no:'2',
      name: '北京协和医院',
      service:2321,
      unitCost:3845.8,
      personnelFunds:7694,
      drugCharge:7439.65,
      healthMaterialFee:36497,
      assetsDepreciation:8657,
      assetsAmortization:3456,
      medicalRiskFund:128,
      other:8756
    }, {
      key: '3',
      no:'3',
      name: '天津第一人民医院',
      service:2321,
      unitCost:3845.8,
      personnelFunds:7694,
      drugCharge:7439.65,
      healthMaterialFee:36497,
      assetsDepreciation:8657,
      assetsAmortization:3456,
      medicalRiskFund:128,
      other:8756
    }];

    return (
    	<div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
