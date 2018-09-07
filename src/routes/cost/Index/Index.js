import React, { Component,Fragment } from "react";
import { connect } from "dva";
import { Row, Col } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import FilterGroup from 'components/Hia/FilterGroup';
import ColorCard from 'components/Hia/ColorCard';
import styles from './index.less';
import {
  createCanvasBar1,
  createCanvasLine1,
  createCanvasScatter1,
  createCanvasPie2,
  createCanvasRrose1
} from '../../../utils/create-echarts';

@connect(({ webIndex, loading }) => ({
  webIndex,
  loading: loading.models.webIndex
}))
export default class WebIndex extends Component {
  state = {

  };

  filterChange = (values) => {
    console.log(values);
  }

  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
    this.props.dispatch({
      type:'webIndex/queryData'
    }).then(() => {
      const { webIndex } = this.props;

      let chartScatterData = {};
      if(webIndex && webIndex.scatterData){
        let result = [];
        webIndex.scatterData.map(function(_item){
          result.push(_item.data);
        });
        chartScatterData.title = '收支结余率';
        chartScatterData.color = '#1ebb79';
        chartScatterData.data = result;
      }
      let chartLineData = {};
      if(webIndex && webIndex.lineData){
        chartLineData.title = '药品收入占比';
        chartLineData.yAxisName = '药品收入占比';
        chartLineData.data = [{'data':webIndex.lineData.data}];
      }
      let chartBarData = {};
      if(webIndex && webIndex.barData){
        chartBarData.title = '门急诊均次费用';
        chartBarData.yAxisName = '门急诊均次费用';
        chartBarData.data = [{'name':'','data':webIndex.barData.data}];
      }
      let chartPieData = {};
      if(webIndex && webIndex.pieData){
        chartPieData.title = '成本构成占比';
        chartPieData.data = webIndex.pieData;
      }
      this.renderCanvasScatter1Chart(chartScatterData,'canvasScatter1');
      this.renderCanvasLine1Chart(chartLineData,'canvasLine1');
      this.renderCanvasLine1Chart(chartLineData,'canvasLine2');
      this.renderCanvasScatter1Chart(chartScatterData,'canvasScatter2');
      this.renderCanvasBar1Chart(chartBarData,'canvasBar1');
      this.renderCanvasBar1Chart(chartBarData,'canvasBar2');
      this.renderCanvasPie2Chart(chartPieData,'canvasPie1');
      this.renderCanvasRrose1Chart(chartPieData,'canvasPie2');
      this.renderCanvasRrose1Chart(chartPieData,'canvasPie3');
    });
  }

  getMonth = () => {
    let monthArr = [];
    for(let i=0;i<7;i++){
      const nowMonth = i + 1;
      monthArr.push(nowMonth+'月');
    }
    return monthArr;
  }

  //绘制线性图表1
  renderCanvasLine1Chart(chartData, id) {
    const canvasLine1Parameter = {
      'title': chartData.title?chartData.title:'',
      'legend': null,
      'color': ['#6dbefc'],
      'yAxisName': [chartData.yAxisName?chartData.yAxisName:''],
      'markLine': {},
      'areaStyleColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#D1EBFE',
      }, {
        offset: 1,
        color: '#fff',
      }]),
      'xAxisData': this.getMonth(),
      'data': chartData.data?chartData.data:[],
    };

    const option = createCanvasLine1(canvasLine1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //绘制柱状图1
  renderCanvasBar1Chart(chartData, id) {
    const canvasBar1Parameter = {
      'title': chartData.title?chartData.title:'',
      'legend': chartData.legend?chartData.legend:[],
      'smooth': true,
      'yAxisName': chartData.yAxisName?chartData.yAxisName:'',
      'xAxisData': this.getMonth(),
      'data': chartData.data?chartData.data:[],
    };

    const option = createCanvasBar1(canvasBar1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //绘制饼状图2
  renderCanvasPie2Chart(chartData, id) {
    const canvasPie2Parameter = {
      'title': chartData.title?chartData.title:'',
      'legend': chartData.legend?chartData.legend:[],
      'data': chartData.data?chartData.data:[],
    };

    const option = createCanvasPie2(canvasPie2Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //绘制南丁格尔玫瑰图1
  renderCanvasRrose1Chart(chartData, id) {
    const canvasRrose1Parameter = {
      'title': chartData.title?chartData.title:'',
      'data': chartData.data?chartData.data:[],
    };

    const option = createCanvasRrose1(canvasRrose1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //绘制散射图1
  renderCanvasScatter1Chart(chartData, id) {
    const canvasScatter1Parameter = {
      'title': chartData.title?chartData.title:'',
      'color': chartData.color?chartData.color:'',
      'Axis':{
        'yAxis':{
          'min':0,
          'max':2.5,
          'interval':0.5
        },
        'xAxis':{
          'min':0,
          'max':700,
          'interval':100
        }
      },
      'data': chartData.data?chartData.data:[],
    };

    const option = createCanvasScatter1(canvasScatter1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  render() {
    const { webIndex } = this.props;

    const cardData = webIndex?webIndex.cardList:[];

    return (
      <Fragment>
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.filterChange}
            rowTypes={['timeSelect','date','area']}
          />

          <div style={{marginBottom:'20px'}}>
            <ColorCard type={2} data={cardData} />
          </div>

          <div style={{marginBottom:'20px'}}>
            <Row gutter={20} style={{marginBottom:'20px'}}>
              <Col span={8}>
                <div className={styles.canvas} id="canvasScatter1"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasLine1"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasLine2"></div>
              </Col>
            </Row>
            <Row gutter={20} style={{marginBottom:'20px'}}>
              <Col span={8}>
                <div className={styles.canvas} id="canvasScatter2"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasBar1"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasBar2"></div>
              </Col>
            </Row>
            <Row gutter={20} style={{marginBottom:'20px'}}>
              <Col span={8}>
                <div className={styles.canvas} id="canvasPie1"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasPie2"></div>
              </Col>
              <Col span={8}>
                <div className={styles.canvas} id="canvasPie3"></div>
              </Col>
            </Row>
          </div>
        </section>
      </Fragment>
    )
  }
}
