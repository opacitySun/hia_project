import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

// 查询对应关系数据
export async function querySysIndexRelevances() {
  return request(path+'/api/getSysIndexRelevances', {
     method: 'GET',
   });
}

/*// 获取自动匹配接口
export async function querySysIndexRelevancespp(params) {
  return request(path+'/api/autoMatch', {
    method: 'POST',
    body: params,
  });
}*/

/*// 获取保存按钮接口
export async function querySysIndexRelevancesbc(params) {
  return request(path+'/api/updateSysIndexRelevance', {
    method: 'POST',
    body: params,
  });
}*/