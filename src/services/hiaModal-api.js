
import request from '../utils/request';


const path = 'http://192.168.36.110:9999';


/**
 * 查询省
 * @returns {Promise<Object>}
 */
export async function findProvince(){
  return request(path+'/hia/dictArea/findProvince', {
    method: 'POST',
    // body: params,
  });
}

/**
 * 查询市
 * @param params
 * @returns {Promise<Object>}
 */
export async function findCity(params){
  return request(path+'/hia/dictArea/findCity', {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询区县
 * @param params
 * @returns {Promise<Object>}
 */
export async function findCounty(params){
  return request(path+'/hia/dictArea/findCounty', {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询区域所有数据
 * @returns {Promise<Object>}
 */
export async function findArea(){
  return request(path+'/hia/dictArea/find', {
    method: 'POST',
    // body: params,
  });
}

/**
 * 查询归属信息
 *
 * @returns {Promise<Object>}
 */
export async function findDictBelongTo(){
  return request(path+'/hia/dist/findSysHospitalBelong')

}

/**
 * 查询床位范围
 *
 * @returns {Promise<Object>}
 */
export async function findSysBedScope(){
  return request(path+'/hia/dist/findSysBedScope')

}

/**
 * 查询医院等级
 *
 * @returns {Promise<Object>}
 */
export async function findSysHospitalLevel(){
  return request(path+'/hia/dist/findSysHospitalLevel')
}

/**
 * 查询医院类型
 *
 * @returns {Promise<Object>}
 */
export async function findHospitalType(){
  return request(path+'/hia/dist/findHospitalType')
}

/**
 * 查询上级单位
 *
 * @returns {Promise<Object>}
 */
export async function getParentOrg(){
  return request(path+'/hia/org/getParentOrg')
}
