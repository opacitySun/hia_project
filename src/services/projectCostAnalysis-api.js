import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/*
项目成本对比start
 */

// 获取院间数据
export async function getHospitalComparison() {
  return request(`/api/projectHospitalComparison`);
}
// 获取区域数据
export async function getRegionComparison() {
  return request(`/api/projectRegionComparison`);
}
// 获取类型数据
export async function getStyleComparison() {
  return request(`/api/projectStyleComparison`);
}
// 获取等级数据
export async function getGradeComparison() {
  return request(`/api/projectGradeComparison`);
}

/*
项目成本对比end
 */
