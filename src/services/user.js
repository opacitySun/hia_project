import request from '../utils/request';

const path = 'http://192.168.36.110:9999';
// const path = 'http://192.168.37.170:8080';
// const path = 'http://localhost:8080';

/**
 * 查询当前用户信息
 * @returns {Promise<Object>}
 */
export async function queryCurrent(token) {
  return request(`${path}/api/me/${token}`);
}
