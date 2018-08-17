import React, { PureComponent,Fragment } from 'react';
import { Row, Col, Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import classNames from 'classnames';
import styles from './index.less';
import { createCanvasBar1, createCanvasLine1 } from '../../../utils/create-echarts';

export default class ColorCard extends PureComponent {
  state = {
    //当前被点击卡片的标记key
    clickKey:''
  };

  componentDidMount() {
    // 查询图表

  }

  //绘制线性图表1
  renderCanvasLine1Chart(chartData, id) {
    const canvasLine1Parameter = {
      'title': chartData.title,
      'legend': null,
      'color': ['#6dbefc'],
      'yAxisName': [chartData.yAxisName],
      'markLine': {},
      'areaStyleColor': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#D1EBFE',
      }, {
        offset: 1,
        color: '#fff',
      }]),
      'xAxisData': ['2018','2017'],
      'data': chartData.data,
    };

    const option = createCanvasLine1(canvasLine1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //绘制柱状图1
  renderCanvasBar1Chart(chartData, id) {
    chartData.data = [
      {'name':'','data':''}
    ];
    const canvasBar1Parameter = {
      'title': legend.title,
      'legend': chartData.legend,
      'smooth': true,
      'yAxisName': chartData.yAxisName,
      'xAxisData': ['2018','2017'],
      'data': chartData.data,
    };

    const option = createCanvasBar1(canvasBar1Parameter);
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
  }

  //点击卡片时触发
  handleCard = (e) => {
    let thisCol;  //当前被点击卡片Dom
    let clickIndex = e.target.getAttribute('clickindex'); //由于react的点击事件是冒泡式的，因此点击位置的不同导致所获去的Dom不同，此变量为被点击位置所处的Dom层级
    switch(clickIndex){
      case '0':
        thisCol = e.target;
        break;
      case '1':
        thisCol = e.target.parentElement;
        break;
      case '2':
        thisCol = e.target.parentElement.parentElement.parentElement;
        break;
      case '3':
        thisCol = e.target.parentElement.parentElement.parentElement.parentElement;
        break;
      default:
        thisCol = e.target.parentElement.parentElement;
    }
    let thisColKey = thisCol.getAttribute('clickkey');
    let parentRow = thisCol.parentElement;  //卡片所处的Row的Dom
    let nextRow = parentRow.nextElementSibling;
    let nextRowDisplay = nextRow.style.display;
    let showRowClassName = this.refs.showRow.props.className; //每行下方折叠区域的class
    let hideCardClassName = this.refs.hideCard.props.className; //隐藏卡片的class
    hideCardClassName = hideCardClassName.split(' ');
    hideCardClassName = hideCardClassName[0];
    if(nextRowDisplay == 'none'){
      //先隐藏所有折叠区域，然后重新设置折叠区域的内容，再显示折叠区域并标记此卡片的key
      let showRows = document.getElementsByClassName(showRowClassName);
      for(let i=0;i<showRows.length;i++){
        showRows[i].style.display = 'none';
      }
      let hideCard = document.getElementsByClassName(hideCardClassName);
      for(let i=0;i<hideCard.length;i++){
        hideCard[i].style.display = 'none';
      }
      let thisHideCard = thisCol.getElementsByClassName(hideCardClassName);
      nextRow.innerHTML = '11111111';
      nextRow.style.display = 'block';
      thisHideCard[0].style.display = 'block';
      this.setState({
        clickKey:thisColKey
      });
    }else{
      //如果是当前已展开卡片的点击，则隐藏折叠区域，否则重置折叠区域内容，并标记被点击的卡片key
      if(thisColKey == this.state.clickKey){
        let showRows = document.getElementsByClassName(showRowClassName);
        for(let i=0;i<showRows.length;i++){
          showRows[i].style.display = 'none';
        }
        let hideCard = document.getElementsByClassName(hideCardClassName);
        for(let i=0;i<hideCard.length;i++){
          hideCard[i].style.display = 'none';
        }
      }else{
        let hideCard = document.getElementsByClassName(hideCardClassName);
        for(let i=0;i<hideCard.length;i++){
          hideCard[i].style.display = 'none';
        }
        let thisHideCard = thisCol.getElementsByClassName(hideCardClassName);
        thisHideCard[0].style.display = 'block';
        nextRow.innerHTML = '22222222';
        this.setState({
          clickKey:thisColKey
        });
      }
    }
  }

  render() {
    const self = this;
    const { data } = this.props;

    let cards = [],cardsHtml = [];
    const cardData = (data && data.length > 0)?data.map(function(_item,_index){
      let cardClass = classNames(styles.card,styles.cardRed);
      let hideCardClass = classNames(styles.hideCard,styles.hideCardRed);
      switch(_item.color){
        case 'red':
          cardClass = classNames(styles.card,styles.cardRed);
          hideCardClass = classNames(styles.hideCard,styles.hideCardRed);
          break;
        case 'yellow':
          cardClass = classNames(styles.card,styles.cardYellow);
          hideCardClass = classNames(styles.hideCard,styles.hideCardYellow);
          break;
        case 'blue':
          cardClass = classNames(styles.card,styles.cardBlue);
          hideCardClass = classNames(styles.hideCard,styles.hideCardBlue);
          break;
      }
      const singleCard =
      <Col span={6} key={`singleCard${_index}`} onClick={self.handleCard} clickkey={`singleCard${_index}`} clickindex="0" style={{position:'relative'}}>
        <Card className={cardClass} clickindex="1">
          <div className={styles.cardLeft} clickindex="2">
            <p className="txt1" clickindex="3">{_item.name}</p>
            <strong className="num1" clickindex="3">{_item.ratio}</strong>
          </div>
          <div className={styles.cardRight} clickindex="2">
            <p className="txt2" clickindex="3">标杆值</p>
            <strong className="num2" clickindex="3">{_item.benchmarksVal}</strong>
            <i className={styles.line} clickindex="3"></i>
          </div>
        </Card>
        <Card className={hideCardClass} clickindex="1" ref="hideCard">
          <div className={styles.cardLeft} clickindex="2">
            <p className="txt1" clickindex="3">{_item.name}</p>
            <strong className="num1" clickindex="3">{_item.ratio}</strong>
          </div>
          <div className={styles.cardRight} clickindex="2">
            <p className="txt2" clickindex="3">标杆值</p>
            <strong className="num2" clickindex="3">{_item.benchmarksVal}</strong>
            <i className={styles.line} clickindex="3" style={{background:'#999'}}></i>
          </div>
          <div className={styles.cardTag}>{_item.tag}</div>
        </Card>
      </Col>;
      if(_index !=0 && (_index+1)%4 == 0){
        cards.push(singleCard);
        let rowCard =
        <Fragment key={`rowCard${_index}`} >
          <Row gutter={20} style={{"marginTop":"20px"}}>
            {cards}
          </Row>
          <Row className={styles.cardBottomDiv} ref="showRow" style={{display:'none'}}>
          </Row>
        </Fragment>;
        cardsHtml.push(rowCard);
        cards = [];
      }else if(_index == data.length-1 && (_index+1)%4 != 0){
        cards.push(singleCard);
        let rowCard =
        <Fragment key={`rowCard${_index}`}>
          <Row gutter={20} style={{"marginTop":"20px"}}>
            {cards}
          </Row>
          <Row className={styles.cardBottomDiv} ref="showRow" style={{display:'none'}}>
          </Row>
        </Fragment>;
        cardsHtml.push(rowCard);
      }else{
        cards.push(singleCard);
      }
    }):null;

    return (
      <Fragment>
        {cardsHtml}
      </Fragment>
    );
  }
}
