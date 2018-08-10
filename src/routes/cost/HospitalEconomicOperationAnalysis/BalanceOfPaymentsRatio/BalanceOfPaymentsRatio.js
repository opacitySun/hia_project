import React, { Component, Fragment } from 'react';
import Banner from 'components/Hia/Banner';
import HiaTabs from 'components/Hia/HiaTabs';
import FilterGroupDemo from 'components/Hia/FilterGroupDemo';
import { connect } from 'dva';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import styles from './index.less';
import { getDataByProperty, getXAxisData } from '../../../../utils/hia-dataHandler';
import { createCanvasLine1 } from '../../../../utils/create-echarts';

@connect(({ balanceOfPaymentsRatio, loading }) => ({
  balanceOfPaymentsRatio,
  loading,
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
  }

  componentDidMount() {
    // 查询图表
    const { dispatch } = this.props;
    dispatch({
      type: 'balanceOfPaymentsRatio/fetchChartOverview',
      payload: this.state.queryParams,
    }).then(() => {
      console.log('图表数据');
      console.log(this.props);
      this.renderBalanceOfPaymentsChart();
    });
  }

  renderBalanceOfPaymentsChart() {
    const { balanceOfPaymentsRatio: { chartData } } = this.props;
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
    const myChart = echarts.init(document.getElementById('canvasLine1'));
    // 绘制图表
    myChart.setOption(option);
  }

  render() {
    return (
      <Fragment>
        <section className={styles['two-level-top']}>
          <Banner pathname={this.props.location.pathname}/>
          <HiaTabs pathname={this.props.location.pathname}/>
        </section>
        <section className={styles['two-level-content']} style={{}}>
          <FilterGroupDemo/>
          <div className={styles['msp-tabs']} style={{ margin: '30px 0 0 0' }}>
            <h3 className={styles['msp-tabs-title']}>分析结果</h3>
            <div className={styles['tabs-btn']}>
              <div className={styles['btn-absolute']}>
                <div className={styles['bottom-line']}/>
                <a href="javascript:void(0)" className={styles.selected}>图表数据</a>
                <a href="javascript:void(0)">明细数据</a>
              </div>
            </div>

            <ul className={styles['tabs-content']}>
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
                {/*<div className="report-table">
                  <table className="liebiaotable customtable">
                    <tr>
                      <th align="center" id="table_padding_left">序号</th>
                      <th align="left">医院名称</th>
                      <th align="right">业务收入（亿）</th>
                      <th align="right">业务支出（亿）</th>
                      <th align="right">收支结余率（%）</th>
                      <th align="right">医疗收入（亿）</th>
                      <th align="right">医疗收入增长率（%）</th>
                      <th align="right">医疗成本（亿）</th>
                      <th align="right" id="table_padding_right">成本控制率（%）</th>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">1</td>
                      <td>北京同仁医院</td>
                      <td align="right">32.58</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%<i className="down"></i></td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right" id="table_padding_right">3.67%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">2</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%<i className="up"></td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">3</td>
                      <td>天津市第一协和医院</td>
                      <td align="right">19.03</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%<i className="down"></i></td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right" id="table_padding_right">3.67%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">4</td>
                      <td>大连医科大学附属医院</td>
                      <td align="right">25.21</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%<i className="down"></i></td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right" id="table_padding_right">32.5%<i className="down"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">5</td>
                      <td>北京同仁医院</td>
                      <td align="right">32.58</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%<i className="down"></i></td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right" id="table_padding_right">3.67%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">6</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%<i className="down"></i></td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">7</td>
                      <td>天津市第一协和医院</td>
                      <td align="right">19.03</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%<i className="down"></i></td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right" id="table_padding_right">3.67%<i className="down"></i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">8</td>
                      <td>大连医科大学附属医院</td>
                      <td align="right">25.21</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%<i className="down"></i></td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right" id="table_padding_right">32.5%<i className="up"><i></td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">9</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%<i className="down"></i></td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%<i className="up"><i></td>
                    </tr>
                  </table>
                  <div className="manu"><span className="disabled"> <  上一页</span><span className="current">1</span>
                    <a href="#?page=2">2</a>
                    <a href="#?page=3">3</a>
                    <a href="#?page=4">4</a>
                    <a href="#?page=5">5</a> ...
                    <a href="#?page=2">下一页 > </a>
                  </div>
                </div>*/}
              </li>
              <li>
                <div className="msp-title-2">
                  <span>收支结余率明细</span>
                  <em>为您找到200条结果</em>
                  <i className="line"></i>
                </div>
                {/*<div className="report-table">
                  <table className="liebiaotable customtable">
                    <tr>
                      <th align="center" id="table_padding_left">序号</th>
                      <th align="left">医院名称</th>
                      <th align="right">业务收入（亿）</th>
                      <th align="right">业务支出（亿）</th>
                      <th align="right">收支结余率（%）</th>
                      <th align="right">医疗收入（亿）</th>
                      <th align="right">医疗收入增长率（%）</th>
                      <th align="right">医疗成本（亿）</th>
                      <th align="right" id="table_padding_right">成本控制率（%）</th>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">1</td>
                      <td>北京同仁医院</td>
                      <td align="right">32.58</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right" id="table_padding_right">3.67%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">2</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">3</td>
                      <td>天津市第一协和医院</td>
                      <td align="right">19.03</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right" id="table_padding_right">3.67%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">4</td>
                      <td>大连医科大学附属医院</td>
                      <td align="right">25.21</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right" id="table_padding_right">32.5%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">5</td>
                      <td>北京同仁医院</td>
                      <td align="right">32.58</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right">3.67%</td>
                      <td align="right">32.58</td>
                      <td align="right" id="table_padding_right">3.67%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">6</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">7</td>
                      <td>天津市第一协和医院</td>
                      <td align="right">19.03</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right">3.67%</td>
                      <td align="right">19.03</td>
                      <td align="right" id="table_padding_right">3.67%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">8</td>
                      <td>大连医科大学附属医院</td>
                      <td align="right">25.21</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right">32.5%</td>
                      <td align="right">25.21</td>
                      <td align="right" id="table_padding_right">32.5%</td>
                    </tr>
                    <tr>
                      <td align="center" id="table_padding_left">9</td>
                      <td>北京协和医院</td>
                      <td align="right">26.5</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right">32.5%</td>
                      <td align="right">26.5</td>
                      <td align="right" id="table_padding_right">32.5%</td>
                    </tr>
                  </table>
                  <div className="manu"><span className="disabled"> <  上一页</span><span className="current">1</span>
                    <a href="#?page=2">2</a>
                    <a href="#?page=3">3</a>
                    <a href="#?page=4">4</a>
                    <a href="#?page=5">5</a> ...
                    <a href="#?page=2">下一页 > </a>
                  </div>
                </div>*/}
              </li>
            </ul>
          </div>
        </section>
      </Fragment>
    );
  }
}
