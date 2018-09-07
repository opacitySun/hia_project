import mockjs from 'mockjs';

export default {
  //获取卡片数据
  indexCardList: mockjs.mock({
    'data|6':[
      {
        'key|+1': 1,
        'type|1':[1,2,3],
        'title|1':['医疗收支结余','人均人力成本','药品收入占比','百元医疗收入卫生材料消耗','门诊询价均次费用','出院病人例均费用'],
        'val1|1-100': 1,
        'val2|1-100': 1,
        'val3|1-100': 1,
      }
    ]
  }),
  //获取散点图数据
  getIndexScatterData: mockjs.mock({
    'data|20':[
      {
        'key|+1': 1,
        'x|0-700': 1,
        'y|0-2': 1,
        'data': function(){
          return [this.x,this.y];
        },
      }
    ]
  }),
  //获取线性图数据
  getIndexLineData: mockjs.mock({
    'data|1':[
      {
        'key|+1': 1,
        'data': [26,31,21,44,33],
      }
    ]
  }),
  //获取柱状图数据
  getIndexBarData: mockjs.mock({
    'data|1':[
      {
        'key|+1': 1,
        'data': [100,60,50,250,300,220,106],
      }
    ]
  }),
  //获取饼状图数据
  getIndexPieData: mockjs.mock({
    'data|3':[
      {
        'key|+1': 1,
        'name|1':['成本构成占比','门诊收入占比','住院收入占比'],
        'data|6': [
          {
            'name|1':['门诊收入','住院收入','收入1','收入2','收入3','收入4'],
            'value|1-1000':1
          }
        ],
      }
    ]
  }),
};
