import echarts from 'echarts/lib/echarts';

// 创建线性图表
export function createCanvasLine1(parameter) {
  const series = [];
  for (let i = 0; i < parameter.data.length; i++) {
    const thisData = {
      data: parameter.data[i].data,
      type: 'line',
      areaStyle: {
        normal: {
          color: parameter.areaStyleColor || new echarts.graphic.LinearGradient(0, 0, 0, 0, [{
            offset: 0,
            color: '#FFF',
          }, {
            offset: 1,
            color: '#FFF',
          }]),
        },
      },
      markLine: parameter.markLine || {
        data: [
          { type: 'average', name: '平均值' },
        ],
      },
      smooth: parameter.data[i].smooth || false,
    };
    if (parameter.legend != null) {
      thisData.name = parameter.data[i].name;
    }
    series.push(thisData);
  }

  /* const myChart = echarts.init($(parameter.target)[0]); */
  const option = {
    title: {
      text: parameter.title,
      textStyle: {
        color: ['#333'],
        fontSize: '14',
      },
    },
    grid: {
      left: '10px',
      right: '25px',
      bottom: '20px',
      containLabel: true,
    },
    color: parameter.color || ['#5db7fd', '#1ebb79', '#fed85c', '#8897a9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#FFF',
        },
      },
    },
    markLine: {
      data: [{
        type: 'average',
        name: '平均值',
      }],
      lineStyle: {
        type: 'dashed',
        color: ['#5db7fd', '#1ebb79', '#fed85c', '#8897a9'],
      },
    },
    xAxis: {
      boundaryGap: false, // 水平铺满整个布局
      axisLine: {    // 轴线
        show: true,
        lineStyle: {
          color: '#f5f5f5',
          type: 'dashed',
          width: 0,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#666',
          fontSize: '12',
        },
      },
      color: ['#666'],
      type: 'category',
      data: parameter.xAxisData,
    },
    yAxis: {
      type: 'value',
      name: (parameter.yAxisName && parameter.yAxisName[0]) ? parameter.yAxisName[0] : '',
      nameLocation: 'end',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#666',
          fontSize: '12',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series,
  };

  if (parameter.legend != null) {
    const legendOption = {
      data: parameter.legend,
      x: 'center',
      y: 'bottom',
    };
    option.legend = legendOption;
    delete option.grid;
  }
  if (parameter.yAxisName) {
    for (let i = 0; i < option.yAxis.length; i++) {
      option.yAxis[i].name = parameter.yAxisName[i];
      option.yAxis[i].nameLocation = 'end';
    }
  }

  // 为echarts对象加载数据
  /* myChart.setOption(option); */
  return option;
};

export function createCanvasBar21(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:parameter.data[i].type,
      barWidth: parameter.barWidth||'20px',/* zs */
      itemStyle: {
        normal: {
          color: parameter.data[i].barStyleColor || new echarts.graphic.LinearGradient(
            0, 0, 0, 0,
            [
              {offset: 0, color: '#fff'},
              {offset: 1, color: '#fff'},
            ]
          ),
        },
      },
      data:parameter.data[i].data,
    };
    if(parameter.data[i].type === 'line'){
      // thisData.smooth = true;
      thisData.itemStyle = {
        normal:{color:parameter.data[i].color},
      }
    }
    if(parameter.smooth){
      thisData.smooth = true;
    }

    series.push(thisData);
  }

  const option = {
    title:{
      text:parameter.title,
      textStyle:{
        color:['#333'],
        fontSize:'14',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    color:['#5db7fd','#fed85c','#1ebb79','#8897a9'],
    legend: {
      data:parameter.legend,
      x:'center',
      y:'bottom',
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 5,
    },
    grid:{
      left:'25px',
      right:'25px',
      bottom:'25px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: parameter.xAxisData,
        axisLine : {    // 轴线
          show: true,
          lineStyle: {
            color: '#f5f5f5',
            type: 'dashed',
            width: 0,
          },
        },
        axisTick:{
          show:false,
        },
        axisLabel:{
          show:true,
          textStyle:{
            color:'#666',
            fontSize:'12',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: parameter.yAxisName[0],
        nameLocation:'end',
        min: 0,
        // max: 100,
        //interval: 20,
        axisLine:{
          show:false,
        },
        axisTick:{
          show:false,
        },
        splitLine:{
          show:true,
          lineStyle:{
            type:'dashed',
          },
        },
        axisLabel: {
          formatter: '{value}',
          show:true,
          textStyle:{
            color:'#666',
            fontSize:'12',
          },
        },
      },
      {
        type: 'value',
        name: parameter.yAxisName[1],
        min: 0,
        max: 100,
        //interval: 20,
        axisLine:{
          show:false,
        },
        axisTick:{
          show:false,
        },
        splitLine:{
          show:true,
          lineStyle:{
            type:'dashed',
          },
        },
        axisLabel: {
          formatter: '{value}',
          show:true,
          textStyle:{
            color:'#666',
            fontSize:'12',
          },
        },
      },
    ],
    series,
  };
  return option;
}
