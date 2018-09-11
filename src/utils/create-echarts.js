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
        type: 'line',
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

export function createCanvasLine2(parameter) {
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:'line',
      stack: '总量',
      areaStyle: {normal: {opacity:0.1}},
      data:parameter.data[i].data
    };
    series.push(thisData);
  }

  const option = {
      title: {
          text: parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      color:parameter.color || ['#8897a9','#ffc53d','#50cb74','#5cb6fc'],
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data:parameter.legend,
          orient: 'horizontal',
          x: 'center',
          y: 'bottom'
      },
      grid:{
          left:'20px',
          right:'20px',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : parameter.xAxisData,
              axisLine : {    // 轴线
                  show: true,
                  lineStyle: {
                      color: '#f5f5f5',
                      type: 'dashed',
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis : [
          {
              type : 'value',
              interval: 500,
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              }
          }
      ],
      series : series
    };

    return option;
}

export function createCanvasLine3(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      data: parameter.data[i].data,
      type: 'line',
      areaStyle: {normal: {opacity:0.1}},
      markLine : parameter.markLine || {
        data : [
          {type : 'average', name: '平均值'}
        ]
      }
    };
    if(parameter.smooth){
      thisData.smooth = true;
    }
    if(parameter.legend != null){
      thisData.name = parameter.data[i].name;
    }
    series.push(thisData);
  }

  const option = {
      title: {
          text: parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      grid:{
          left:'20px',
          right:'20px',
          bottom:'20px',
          containLabel: true
      },
      color:parameter.color || ['#5db7fd','#1ebb79','#fed85c','#8897a9'],
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      markLine: {
          data: [{
              type: 'average',
              name: '平均值'
          }],
          lineStyle:{
              type:'dashed',
              color:['#5db7fd','#1ebb79','#fed85c','#8897a9']
          }
      },
      xAxis: {
          axisLine : {    // 轴线
              show: true,
              lineStyle: {
                  color: '#f5f5f5',
                  type: 'dashed',
                  width: 0
              }
          },
          axisTick:{
              show:false
          },
          axisLabel:{
              show:true,
              textStyle:{
                  color:'#666',
                  fontSize:'12'
              }
          },
          color:['#666'],
          type: 'category',
          data: parameter.xAxisData
      },
      yAxis: {
          type: 'value',
          name:'人次',
          nameLocation:'end',
          axisLine:{
              show:false
          },
          axisTick:{
              show:false
          },
          axisLabel:{
              show:true,
              textStyle:{
                  color:'#666',
                  fontSize:'12'
              }
          },
          splitLine:{
              show:true,
              lineStyle:{
                  type:'dashed'
              }
          }
      },
      series: series
  };

  if(parameter.legend != null){
    const legendOption = {
      data:parameter.legend,
      x:'center',
      y:'bottom'
    };
    option.legend = legendOption;
    delete option.grid;
  }
  if(parameter.yAxisName){
    for(let i=0;i<option.yAxis.length;i++){
      option.yAxis[i].name = parameter.yAxisName[i];
      option.yAxis[i].nameLocation = 'end';
    }
  }

  return option;
}

export function createCanvasLine4(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      data: parameter.data[i].data,
      type: 'line',
      markLine : {
          data : [
              {type : 'average', name: '平均值'}
          ]
      }
    };
    if(parameter.legend != null){
      thisData.name = parameter.data[i].name;
    }
    series.push(thisData);
  }

  const option = {
      title: {
          text: parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      grid:{
          left:'20px',
          right:'20px',
          bottom:'20px',
          containLabel: true
      },
      color:['#1ebb79','#1ebb79','#fed85c','#8897a9'],
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      markLine: {
          data: [{
              type: 'average',
              name: '平均值'
          }],
          lineStyle:{
              type:'dashed',
              color:['#5db7fd','#1ebb79','#fed85c','#8897a9']
          }
      },
      xAxis: {
          axisLine : {    // 轴线
              show: true,
              lineStyle: {
                  color: '#f5f5f5',
                  type: 'dashed',
                  width: 0
              }
          },
          axisTick:{
              show:false
          },
          axisLabel:{
              show:true,
              textStyle:{
                  color:'#666',
                  fontSize:'12'
              }
          },
          color:['#666'],
          type: 'category',
          data: parameter.xAxisData
      },
      yAxis: {
          type: 'value',
          name:'人次',
          nameLocation:'end',
          axisLine:{
              show:false
          },
          axisTick:{
              show:false
          },
          axisLabel:{
              show:true,
              textStyle:{
                  color:'#666',
                  fontSize:'12'
              }
          },
          splitLine:{
              show:true,
              lineStyle:{
                  type:'dashed'
              }
          }
      },
      series: series
  };

  if(parameter.legend != null){
    const legendOption = {
      data:parameter.legend,
      x:'center',
      y:'bottom'
    };
    option.legend = legendOption;
    delete option.grid;
  }
  if(parameter.yAxisName){
    for(let i=0;i<option.yAxis.length;i++){
      option.yAxis[i].name = parameter.yAxisName[i];
      option.yAxis[i].nameLocation = 'end';
    }
  }

  return option;
}


//创建柱状图表
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

export function createCanvasBar1(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:'bar',
      barWidth: '20px',
      data:parameter.data[i].data
    };
    if(parameter.data[i].barStyleColor){
      thisData.itemStyle = {
        normal:{color: parameter.data[i].barStyleColor}
      }
    }
    series.push(thisData);
  }

  const option = {
      color: ['#5fb7fc','#22bc7b','#fed95f'],
      title:{
          text:parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      grid:{
          left:'25px',
          right:'25px',
          bottom:'20px',
          containLabel: true
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:parameter.legend,
          x:'center',
          y:'bottom',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 5,
          textStyle: {color: '#333'}
      },
      xAxis : [
          {
              type : 'category',
              data : parameter.xAxisData,
              axisLine : {    // 轴线
                  show: true,
                  lineStyle: {
                      color: '#f5f5f5',
                      type: 'dashed',
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis : [
          {
              type : 'value',
              name:parameter.yAxisName[0],
              nameLocation:'end',
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              }
          }
      ],
      series : series
  };

  return option;
}

export function createCanvasBar2(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:parameter.data[i].type,
      barWidth: '20px',
      data:parameter.data[i].data
    };
    if(parameter.data[i].type == 'line'){
      thisData.smooth = true;
    }

    series.push(thisData);
  }

  const option = {
      title:{
          text:parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      tooltip: {
          trigger: 'axis'
      },
      color:parameter.color || ['#5db7fd','#fed85c','#1ebb79','#8897a9'],
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
          containLabel: true
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
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              name: parameter.yAxisName[0],
              nameLocation:'end',
              min: 0,
              // max: 100,
              interval: 20,
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              }
          },
          {
              type: 'value',
              name: parameter.yAxisName[1],
              min: 0,
              max: 100,
              interval: 20,
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              }
          }
      ],
      series: series
  };

  return option;
}

export function createCanvasBar3(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name: parameter.data[i].name,
      type: parameter.data[i].type,
      barWidth:'40px',
      stack: '总量',
      label: {
          normal: {
              show: true,
              position: 'insideTop'
          }
      },
      data: parameter.data[i].data
    };
    series.push(thisData);
  }

  const option = {
      color: parameter.color || ['#5cb6fc','#1ebb79','#fed85c','#8897a9','#35c3d6','#e6965c','#e65c5c'],
      legend: {
        data:parameter.legend,
        x:'center',
        y:'bottom',
         itemWidth: 12,
          itemHeight: 8,
          itemGap: 5
      },
      title:{
          text:parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      tooltip : {
          trigger: 'axis',
      },
      grid: {
        left: '5px',
        right: '10px',
        bottom: '50px',
        containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : parameter.xAxisData,
              axisLine : {    // 轴线
                  show: true,
                  lineStyle: {
                      color: '#f5f5f5',
                      type: 'dashed',
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis : [
          {
              type : 'value',
              name:parameter.yAxisName[0],
              nameLocation:'end',
              nameTextStyle:{
                align:'center'
              },
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              }
          }
      ],
      series: series
  };

  return option;
}

export function createCanvasBar4(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:parameter.data[i].type,
      stack: '总量',
      itemStyle: {
          normal: {
            label : {show: true, position: 'inside'},
            color: parameter.data[i].barStyleColor || new echarts.graphic.LinearGradient(
                0, 0, 0, 0,
                [
                  {offset: 0, color: 'rgba(0,0,0,0)'},
                  {offset: 1, color: 'rgba(0,0,0,0)'}
                ]
              )
          }
      },
      label: {
          normal: {
              show: true,
              position: 'inside',
              color:'#fff'
          }
      },
      data:parameter.data[i].data
    };
    series.push(thisData);
  }
  const auxiliary = {
    name:'辅助',
    type:'bar',
    stack: '总量',
    barWidth:'60px',
    data:[0, 1700, 1400, 1200, 300, 200,0]
  };
  series.unshift(auxiliary);

  const option = {
      title: {
          text: parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      color:'#fff',
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
              var tar = params[1];
              return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
      },
      grid:{
          left:'20px',
          right:'20px',
          bottom:'20px',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              splitLine: {show:false},
              data : parameter.xAxisData,
              axisLine : {    // 轴线
                  show: true,
                  lineStyle: {
                      color: '#f5f5f5',
                      type: 'dashed',
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis : [
          {
              type : 'value',
              name:parameter.yAxisName[0],
              nameLocation:'end',
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              }
          }
      ],
      series : series
  };

  return option;
}

export function createCanvasBar5(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name:parameter.data[i].name,
      type:parameter.data[i].type,
      barWidth: '20px',
      data:parameter.data[i].data
    };
    if(parameter.data[i].type == 'line'){
      thisData.smooth = true;
    }
    series.push(thisData);
  }

  const option = {
      title:{
          text:parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      grid:{
          left:'25px',
          right:'20px',
          bottom:'25px',
          containLabel: true
      },
      tooltip: {
          trigger: 'axis'
      },
      color:['#f90','#1ebb79','#8897a9','#fed85c'],
      legend: {
          data:parameter.legend,
          x:'center',
          y:'bottom',
          itemWidth: 12,
          itemHeight: 8,
          itemGap: 5
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
                      width: 0
                  }
              },
              axisTick:{
                  show:false
              },
              axisLabel:{
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              name: parameter.yAxisName[0],
              nameLocation:'end',
              min: 0,
              // max: 100,
              interval: 20,
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              }
          },
          {
              type: 'value',
              name: parameter.yAxisName[1],
              min: 0,
              max: 100,
              interval: 20,
              axisLine:{
                  show:false
              },
              axisTick:{
                  show:false
              },
              splitLine:{
                  show:true,
                  lineStyle:{
                      type:'dashed'
                  }
              },
              axisLabel: {
                  formatter: '{value}',
                  show:true,
                  textStyle:{
                      color:'#666',
                      fontSize:'12'
                  }
              }
          }
      ],
      series: series
  };

  return option;
}


//创建饼状图表
export function createCanvasPie1(parameter){
  const series = [];
  for(let i=0;i<parameter.data.length;i++){
    const thisData = {
      name: parameter.data[i].name,
      type: 'pie',
      radius : parameter.radius || '55%',
      label: {
        normal: {
          rich: {
            a: {
              color: '#666',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      labelLine:{   //标线长度
        normal:{
          length:20,
          length2:0
        }
      },
      data:parameter.data[i].data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };
    series.push(thisData);
  }

  const option = {
    title : {
      text: parameter.title,
      textStyle:{
        color:['#333'],
        fontSize:'14'
      }
    },
    grid:{
      left:'20px',
      right:'20px',
      top:'20px'
    },
    color:parameter.color || ['#1ebb79','#5cb6fc','#8897a9','#e6965c'],
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      y:'bottom',
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 5,
      data: parameter.legend,
      textStyle:{
        fontSize:'12px',
        color:'#9d9d9d'
      }
    },
    series : series
  };

  return option;
}

export function createCanvasPie2(parameter){
  const option = {
      title : {
          text: parameter.title,
          textStyle:{
              color:['#333'],
              fontSize:'14'
          }
      },
      color: ['#1ebb79','#5cb6fc','#729dea','#43ce94','#35b6cc','#ffd950','#e35f90','#9b56d7'],
      grid:{
          left:'20px',
          right:'20px',
          bottom:'20px',
          top:'20px'
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'horizontal',
          x: 'center',
          y:'bottom',
          data:parameter.legend
      },
      series: [
          {
              name:parameter.data[0].name || '',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                  normal: {
                      position: 'inner'
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:parameter.data[0].data || []
          },
          {
              name:parameter.data[1].name || '',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                  normal: {
                      //formatter: '{d}% ',
                      rich: {
                          a: {
                              color: '#666',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              labelLine:{   //标线长度
                  normal:{
                      length:20,
                      length2:0
                  }
              },
              data:parameter.data[1].data || []
          }
      ]
  };

  if(!parameter.legend){
    delete option.legend;
  }

  return option;
}


//创建散射图
export function createCanvasScatter1(parameter){
  const option = {
    color:parameter.color,
    title:{
      text:parameter.title,
      textStyle:{
        color:['#333'],
        fontSize:'14'
      }
    },
    title: {
      text: parameter.title,
      left: 'left',
      textStyle:{
        color:['#333'],
        fontSize:'14'
      }
    },
    grid:{
      left:'0',
      right:'10px',
      bottom:'20px',
      top:'35px',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel:{
        show:true,
        textStyle:{
          color:'#333',
          fontSize:'12'
        }
      },
      axisLine:{
        lineStyle:{
          type:'dashed',
          color:'rgba(51,51,51,0.10)'
        }
      },
      splitLine:{
        show:true,
        lineStyle:{
          type:'dashed',
          color:'rgba(51,51,51,0.10)'
        }
      },
      min: parameter.Axis.xAxis.min,
      max:  parameter.Axis.xAxis.max,
      interval: parameter.Axis.xAxis.interval
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        show:true,
        textStyle:{
          color:'#333',
          fontSize:'12'
        }
      },
      axisLine:{
        lineStyle:{
          type:'dashed',
          color:'rgba(51,51,51,0.10)'
        }
      },
      splitLine:{
        show:true,
        lineStyle:{
          type:'dashed',
          color:'rgba(51,51,51,0.10)'
        }
      },
      min: parameter.Axis.yAxis.min,
      max:parameter.Axis.yAxis.max,
      interval:parameter.Axis.yAxis.interval
    },
    series: [{
      symbolSize: 8,
      data: parameter.data,
      type: 'scatter',
      markLine : {
        lineStyle: {
          normal: {
            type: 'dashed',
            color:'#5cb6fc'
          }
        },
        label:{
          show:false
        },
        data : [
          {yAxis: 0.9},
          {xAxis: 330 }
        ]
      }
    }]
  };

  return option;
}


//创建南丁格尔玫瑰图
export function createCanvasRrose1(parameter){
  const option ={
    title : {
      text: parameter.title,
      x:'left',
      textStyle:{
        color:['#333'],
        fontSize:'14'
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable : true,
    color:parameter.color ||['#5cb6fc','#ffc760','#1ebb79','#35c3d6','#e65c5c','#e6965c'],
    series : [
      {
        name:parameter.data[0].name,
        type:'pie',
        radius : [20, 90],
        center : ['50%', '50%'],
        roseType : 'radius',
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data:parameter.data[0].data
      }
    ]
  };

  return option;
}
