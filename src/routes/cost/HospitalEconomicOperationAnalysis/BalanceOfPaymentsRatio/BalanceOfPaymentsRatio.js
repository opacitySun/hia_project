import React, { Component, Fragment } from 'react';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import FilterGroup from 'components/Hia/FilterGroup';
import { connect } from 'dva';
import { Table } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import styles from './index.less';
import { getDataByProperty, getXAxisData } from '../../../../utils/hia-dataHandler';
import { createCanvasBar21, createCanvasLine1 } from '../../../../utils/create-echarts';

@connect(({ balanceOfPaymentsRatio, loading }) => ({
  balanceOfPaymentsRatio,
  loading: loading.models.balanceOfPaymentsRatio,
}))
export default class BalanceOfPaymentsRatio extends Component {
  state = {
    queryParams: {
      p_year_code: 2018,
      p_month_code: null,
      p_quarter_code: null,
      p_half_year_code: null,
      area_code: null,
      hosp_type_code: null,
      level_code: null,
      belong_to_code: null,
      bed_scale_code: null,
      hospital_code: null,
    },
  };

  componentWillMount() {
    // 查询table
    const { dispatch } = this.props;
    dispatch({
      type: 'balanceOfPaymentsRatio/fetchTable',
      payload: this.state.queryParams,
    });
  }

  componentDidMount() {
    // 查询图表
    const { dispatch } = this.props;
    dispatch({
      type: 'balanceOfPaymentsRatio/fetchChartOverview',
      payload: this.state.queryParams,
    }).then(() => {
      const { balanceOfPaymentsRatio: { chartData } } = this.props;
      if (chartData && chartData.length > 0) {
        this.renderBalanceOfPaymentsChart(chartData, 'canvasLine1');
        this.renderCostControlRateChart(chartData, 'canvasLine2');
        this.renderMedicalIncomeChart(chartData,'canvasBar1');
      }

    });
  }

  testChange = (vals) => {
    console.log(vals);
  };

  expandeRow(record, index, indent, expanded) {
    setTimeout(()=>{
      this.renderBalanceOfPaymentsChart(record.chartData, `canvasLine1_${record.hosp_code}`);
      this.renderCostControlRateChart(record.chartData, `canvasLine2_${record.hosp_code}`);
      this.renderMedicalIncomeChart(record.chartData, `canvasBar1_${record.hosp_code}`);
    });
    return (
      <Fragment>
        <div className={styles['msp-inline-detail']}>
          <div className={`${styles.l} ${styles.canvas}`} id={`canvasLine1_${record.hosp_code}`}/>
          <div className={`${styles.r} ${styles.canvas}`} id={`canvasLine2_${record.hosp_code}`}/>
        </div>
        <div className={styles['msp-inline-detail']}>
          <div className={styles['canvas-block']} id={`canvasBar1_${record.hosp_code}`}/>
        </div>
      </Fragment>
    );

  }

  // 收支结余率图表
  renderBalanceOfPaymentsChart(chartData, id) {
    const xAxisType = 0;
    const canvasLine1Data = [{ 'data': getDataByProperty(chartData, 'balance_of_payments'), 'smooth': true }];
    const xAxisData = getXAxisData(chartData, this.state.queryParams);
    const canvasLine1Parameter = {
      'title': '收支结余率',
      'legend': null,
      'color': ['#6dbefc'],
      'yAxisName': ['%'],
      'markLine': {},
      'areaStyleColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#D1EBFE',
      }, {
        offset: 1,
        color: '#fff',
      }]),
      'xAxisType': xAxisType,
      'xAxisData': xAxisData,
      'data': canvasLine1Data,
    };

    const option = createCanvasLine1(canvasLine1Parameter);
    const myChart = echarts.init(document.getElementById(id));/*'canvasLine1'*/
    // 绘制图表
    myChart.setOption(option);
  }

  // 成本控制率图表
  renderCostControlRateChart(chartData, id) {
    const canvasLine2Data = [{ 'data': getDataByProperty(chartData, 'cost_control_rate'), 'smooth': true }];
    const xAxisType = 0;
    const xAxisData = getXAxisData(chartData, this.state.queryParams);
    const canvasLine2Parameter = {
      'title': '成本控制率',
      'legend': null,
      'color': ['#36c287'],
      'yAxisName': ['%'],
      'markLine': {},
      'areaStyleColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#cbf1e1',
      }, {
        offset: 1,
        color: '#fff',
      }]),
      'xAxisType': xAxisType,
      'xAxisData': xAxisData,
      'data': canvasLine2Data,
    };

    const option = createCanvasLine1(canvasLine2Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  // 医疗收入增长图表
  renderMedicalIncomeChart(chartData, id) {
    const xAxisData = getXAxisData(chartData, this.state.queryParams);
    const canvasBar1Data = [
      {
        'name': '医疗收入',
        'data': getDataByProperty(chartData, 'medical_income'),
        'type': 'bar',
        'barStyleColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00abee',
        }, {
          offset: 1,
          color: '#00d9e5',
        }]),
      },
      { 'name': '增长率', 'data': getDataByProperty(chartData, 'income_grow_rate'), 'type': 'line', 'color': '#fed85c' },
    ];
    const canvasBar1Parameter = {
      'title': '医疗收入增长情况',
      'legend': ['医疗收入', '增长率'],
      'xAxisType': 0,
      'smooth': true,
      'yAxisName': ['医疗收入（万元）', '增长率（%）'],
      'xAxisData': xAxisData,
      'data': canvasBar1Data,
    };

    const option = createCanvasBar21(canvasBar1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  render() {
    const { balanceOfPaymentsRatio: { tableData }, loading } = this.props;
    const columns = [
      {
        title: '医院名称',
        dataIndex: 'hosp_name',
      },
      {
        title: '业务收入（亿）',
        dataIndex: 'bus_income',
      },
      {
        title: '业务支出（亿）',
        dataIndex: 'bus_outcome',
      },
      {
        title: '收支结余率（%）',
        dataIndex: 'balance_of_payments',
      },
      {
        title: '医疗收入（亿）',
        dataIndex: 'medical_income',
      },
      {
        title: '医疗收入增长率（%）',
        dataIndex: 'income_grow_rate',
      },
      {
        title: '医疗成本（亿）',
        dataIndex: 'medical_all_cost',
      },
      {
        title: '成本控制率（%）',
        dataIndex: 'cost_control_rate',
      },
    ];

    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          {/*
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
          */}
        </section>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.testChange}
            rowTypes={['timeSelect','region','medicalInstitution']}
          />
          <div className={styles['msp-tabs']} style={{ margin: '30px 0 0 0' }}>
            <h3 className={styles['msp-tabs-title']}>分析结果</h3>
            <div className={styles['tabs-btn']}>
              <div className={styles['btn-absolute']}>
                <div className={styles['bottom-line']}/>
                <a href="javascript:void(0)" className={styles.selected}>图表数据</a>
                <a href="javascript:void(0)">明细数据</a>
              </div>
            </div>

            <ul className={styles['tabs-content']} style={{ padding: '0' }}>
              <li className={styles.selected}>
                <div className={styles['msp-inline']}>
                  <div className={`${styles.l} ${styles.canvas}`} id="canvasLine1"/>
                  <div className={`${styles.r} ${styles.canvas}`} id="canvasLine2"/>
                </div>
                <div className={styles['msp-inline']}>
                  <div className={styles['canvas-block']} id="canvasBar1"/>
                </div>
                <div className={styles['msp-title-2']}>
                  <span>收支结余率明细</span>
                  <em>为您找到200条结果</em>
                  <i className={styles.line}/>
                </div>

                <Table
                  rowKey="hosp_code"
                  dataSource={tableData}
                  loading={loading}
                  columns={columns}
                  expandedRowRender={(record, index, indent, expanded) => this.expandeRow(record, index, indent, expanded)}
                />
              </li>
              <li>
                <div className="msp-title-2">
                  <span>收支结余率明细</span>
                  <em>为您找到200条结果</em>
                  <i className="line"></i>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </Fragment>
    );
  }
}
