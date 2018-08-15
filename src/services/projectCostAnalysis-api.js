import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/*
项目成本对比start
 */

// 获取院间数据
export async function getHospitalComparison(params) {
  return request('/api/projectHospitalComparison', {
    method: 'POST',
    body: params,
  });
}
// 获取区域数据
export async function getRegionComparison(params) {
  return request('/api/projectRegionComparison', {
    method: 'POST',
    body: params,
  });
}
// 获取类型数据
export async function getStyleComparison(params) {
  return request('/api/projectStyleComparison', {
    method: 'POST',
    body: params,
  });
}
// 获取等级数据
export async function getGradeComparison(params) {
  return request('/api/projectGradeComparison', {
    method: 'POST',
    body: params,
  });
}

/*
项目成本对比end
 */
