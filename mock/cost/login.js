import mockjs from 'mockjs';

export default {
  //获取病种成本的院间对比数据
  loginPath: mockjs.mock({
    'data|1':[
      {
        'key|+1': 1,
        'path|1': ['http://www.baidu.com','http://donghua.dmzj.com/','http://www.u17.com/'],
      }
    ]
  }),
};
