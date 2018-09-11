import request from '../utils/request';

// const path = 'http://192.168.37.7:8080';
const path = 'http://localhost:8080';


export async function findDictIndexByTypeCode(indexTypeCode){
  return request(`${path}/api/dist/findDictIndex/${indexTypeCode}`);
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
 * 保存指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function saveIndex(params){
  return request(`${path}/api/hosIndexValMana/addSysStandardIndex2`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 保存指标2
 * @param params
 * @returns {Promise.<Object>}
 */
export async function saveIndex2(params){
  const {values, isAdd} = params
  return request(`${path}/api/hosIndexValMana/addIndex2/${isAdd}`, {
    method: 'POST',
    body: values,
  });
}
/**
 * 修改指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function updateIndex(params){
  return request(`${path}/api/hosIndexValMana/saveIndex2`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 修改科室指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function updateDeptIndex(params){
  return request(`${path}/api/deptIndexValMana/updateSysStandardIndex3`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除指标
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteIndex(params){
  return request(`${path}/api/hosIndexValMana/deleteSysStandardIndex2`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询科室指标
 * @param params
 * @returns {Promise.<Object>}
 */
export async function queryDeptIndex(params){
  return request(`${path}/api/deptIndexValMana/findSysStandardIndex3`, {
    method: 'POST',
    body: params,
  });
}

/**
 * 删除科室标杆值
 * @param ids
 * @returns {Promise.<Object>}
 */
export async function deleteDeptIndex(params){
  return request(`${path}/api/deptIndexValMana/deleteSysStandardIndex3`, {
    method: 'POST',
    body: params,
  });
}
