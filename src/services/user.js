import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/**
 * 查询当前用户信息
 * @returns {Promise<Object>}
 */
export async function queryCurrent(token) {
  return request(`${path}/api/me/${token}`);
}
