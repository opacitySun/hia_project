
import request from '../utils/request';


const path = 'http://192.168.36.110:9999';


/**
 * 查询省
 * @returns {Promise<Object>}
 */
export async function findProvince(){
  return request(path+'/api/dictArea/findProvince', {
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
  return request(path+'/api/dictArea/findCity', {
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
  return request(path+'/api/dictArea/findCounty', {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询区域所有数据
 * @returns {Promise<Object>}
 */
export async function findArea(){
  return request(path+'/api/dictArea/find', {
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
  return request(path+'/api/dist/findSysHospitalBelong')

}

/**
 * 查询床位范围
 *
 * @returns {Promise<Object>}
 */
export async function findSysBedScope(){
  return request(path+'/api/dist/findSysBedScope')

}

/**
 * 查询医院等级
 *
 * @returns {Promise<Object>}
 */
export async function findSysHospitalLevel(){
  return request(path+'/api/dist/findSysHospitalLevel')
}

/**
 * 查询医院类型
 *
 * @returns {Promise<Object>}
 */
export async function findHospitalType(){
  return request(path+'/api/dist/findHospitalType')
}

/**
 * 查询上级单位
 *
 * @returns {Promise<Object>}
 */
export async function getParentOrg(){
  return request(path+'/api/org/getParentOrg')
}
