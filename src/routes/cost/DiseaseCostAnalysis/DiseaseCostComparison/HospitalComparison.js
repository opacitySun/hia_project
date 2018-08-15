import React from 'react';
import { connect } from 'dva';
import { Table,Icon,Divider } from 'antd';

@connect(({ diseaseCostAnalysis }) => ({
  diseaseCostAnalysis
}))
export default class DiseaseHospitalComparison extends React.Component {

  state = {

  };

  queryHospitalComparison = () => {
    const { filterResult } = this.props;
    this.props.dispatch({
      type: 'diseaseCostAnalysis/queryHospitalComparison',
      payload: {
        filterResult:filterResult?filterResult:{}
      }
    });
  }

  componentDidMount() {
    this.queryHospitalComparison();
  }

  render() {
    const { diseaseCostAnalysis } = this.props;

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
        title: '例数',
        dataIndex: 'number',
        key: 'number'
      },
      {
        title: '单位成本',
        dataIndex: 'unitCost',
        key: 'unitCost',
      },
      {
        title: '卫生材料成本',
        dataIndex: 'healthMaterialFee',
        key: 'healthMaterialFee',
      },
      {
        title: '药品成本',
        dataIndex: 'drugCharge',
        key: 'drugCharge',
      },
      {
        title: '医疗服务项目成本',
        dataIndex: 'serviceItemCost',
        key: 'serviceItemCost',
      }
    ];

    const data = diseaseCostAnalysis?diseaseCostAnalysis.hospitalComparison:[];

    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
