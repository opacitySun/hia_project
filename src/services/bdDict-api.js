import request from '../utils/request';

// const path = 'http://192.168.37.7:8080';
const path = 'http://192.168.36.110:9999';

/**
 * 获取计量单位字典列表
 * @param params
 * @returns {Object}
 */
export async function findMeteringUnit(){
  return request(`${path}/api/dist/findMeteringUnit`);
}
/**
 * 获取医院类型列表
 * @param params
 * @returns {Object}
 */
export async function getHospitalType(){
  return request(`${path}/api/dist/findHospitalType`);
}
/**
 * 获取医院级别列表
 * @param params
 * @returns {Object}
 */
export async function getHospitalLevel(){
  return request(`${path}/api/dist/findSysHospitalLevel`);
}

/**
 * 获取指标列表
 * @param params
 * @returns {Object}
 */
export async function findDictIndex(){
  return request(`${path}/api/dist/findDictIndex`);
}

/**
 * 获取指标分类列表
 * @param params
 * @returns {Object}
 */
export async function findDictIndexType(){
  return request(`${path}/api/dist/findDictIndexType`);
}

/**
 * 获取区域字典
 * @param params
 * @returns {Object}
 */
export async function findDictArea(areaCode){
  return request(`${path}/api/dist/findDictArea/${areaCode}`);
}

/**
 * 获取标准科室
 * @param params
 * @returns {Object}
 */
export async function findSysDept(areaCode){
  return request(`${path}/api/dist/findSysDept`);
}

/**
 * 查询版本号
 * @param params
 * @returns {Object}
 */
export async function queryVersions(params){
  return request(`${path}/api/hosIndexValMana/getDataByCode`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 保存版本号
 * @param params
 * @returns {Promise.<Object>}
 */
export async function saveVersion(params){
  return request(`${path}/api/hosIndexValMana/saveIndex1`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除版本号
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteVersion(params){
  // return request(`${path}/api/me/${ids}`);
  return request(`${path}/api/hosIndexValMana/deleteIndex1`, {
    method: 'POST',
    body: params,
  });
}
