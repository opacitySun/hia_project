import React from 'react';
import { connect } from 'dva';
import { Table,Icon,Divider } from 'antd';

@connect(({ diseaseCostAnalysis }) => ({
  diseaseCostAnalysis
}))
export default class DiseaseGradeComparison extends React.Component {

  state = {

  };

  queryGradeComparison = () => {
    const { filterResult } = this.props;
    this.props.dispatch({
      type: 'diseaseCostAnalysis/queryGradeComparison',
      payload: {
        filterResult:filterResult?filterResult:{}
      }
    });
  }

  componentDidMount() {
    this.queryGradeComparison({});
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
        title: '等级名称',
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

    const data = diseaseCostAnalysis?diseaseCostAnalysis.gradeComparison:[];

    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
