import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/*
病种成本对比start
 */

// 获取院间数据
export async function getHospitalComparison() {
  return request(`/api/diseaseHospitalComparison`);
}
// 获取区域数据
export async function getRegionComparison() {
  return request(`/api/diseaseRegionComparison`);
}
// 获取类型数据
export async function getStyleComparison() {
  return request(`/api/diseaseStyleComparison`);
}
// 获取等级数据
export async function getGradeComparison() {
  return request(`/api/diseaseGradeComparison`);
}

/*
病种成本对比end
 */
