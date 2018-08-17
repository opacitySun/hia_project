import request from '../utils/request';

const path = 'http://localhost:8080';

// queryParamName = (successFn) => {
//   successFn();
//   // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
// }

// queryIndexTypeList = (successFn) => {
//   successFn();
//   // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
// }

// queryIndexNameList = (successFn) => {
//   successFn();
//   // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
// }

/**
 * 查询版本号
 * @param params
 * @returns {Object}
 */
export async function queryVersions(params){
  // return request(`${path}/api/hosIndexValMana/getDataByCode?params=${params}`);
  return request(`${path}/api/hosIndexValMana/getDataByCode`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询医院指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryHospitalIndex(params){
  return request(`${path}/api/hosIndexValMana/findSysStandardIndex2s`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 启用版本号
 * @param id
 * @returns {Promise.<Object>}
 */
export async function enableVersion(id){
  return request(`${path}/api/me/${id}`);
}

/**
 * 保存版本号
 * @param params
 * @returns {Promise.<Object>}
 */
export async function saveVersion(params){
  return request(`${path}/api/login`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 保存指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function saveIndex(params){
  return request(`${path}/api/login`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除版本号
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteVersion(ids){
  return request(`${path}/api/me/${ids}`);
}

/**
 * 删除指标
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteIndex(ids){
  return request(`${path}/api/me/${ids}`);
}

/**
 * 查询科室指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryDepartmentIndex(params){
  return request(`${path}/api/login`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除科室标杆值
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteDepStdValue(ids){
  return request(`${path}/api/me/${ids}`);
}