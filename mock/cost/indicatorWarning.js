import mockjs from 'mockjs';

export default {
  //获取卡片列表数据
  getIndicatorWarningCardList: mockjs.mock({
    'data|10':[
      {
        'id|+1': 1,
        'type|1': 1,
        'color|1': ['red','yellow','blue'],
        'tag|1':['经营风险类指标'],
        'name|1':['成本结余率','资产负债率','业务现金流量比率','成本控制率'],
        'ratio|1-100':1,
        'benchmarksVal|1-100':1
      }
    ]
  }),
};
