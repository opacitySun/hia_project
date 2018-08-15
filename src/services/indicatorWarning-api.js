import request from '../utils/request';

const path = 'http://192.168.36.110:9999';


// 获取院间数据
export async function getIndicatorWarningCardList(params) {
  return request('/api/indicatorWarningCardList', {
    method: 'POST',
    body: params,
  });
}
