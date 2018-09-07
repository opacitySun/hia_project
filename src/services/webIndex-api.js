import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

export async function queryCardList() {
  return request('/api/indexCardList');
}

export async function getIndexScatterData() {
  return request('/api/getIndexScatterData');
}

export async function getIndexLineData() {
  return request('/api/getIndexLineData');
}

export async function getIndexBarData() {
  return request('/api/getIndexBarData');
}

export async function getIndexPieData() {
  return request('/api/getIndexPieData');
}

export async function accountLogin(params) {
  return request(path+'/api/login', {
    method: 'POST',
    body: params,
  });
}
