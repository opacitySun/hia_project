
import request from '../utils/request';


const path = 'http://localhost:8080';

/* 机构管理 API start */
// 查询机构
export async function queryAllOrg(params){
  return request('http://localhost:8080/hia/org/getDictOrg', {
    method: 'POST',
    body: params,
  })
}

/**
 * 根据id查询指定机构
 * @param id
 * @returns {Promise<Object>}
 */
export async function queryOrg(id){
  return request(`http://localhost:8080/hia/org/${id}`)
}

// 保存机构
export async function saveOrg(params){
  return request('http://localhost:8080/hia/org/save', {
    method: 'POST',
    body: params,
  });
}

// 修改机构
export async function updateOrg(params){
  return request('http://localhost:8080/hia/org/update', {
    method: 'POST',
    body: params,
  });
}


// 删除机构
export async function deleteOrgs(params){
  return request('http://localhost:8080/hia/org/delete', {
    method: 'POST',
    body: params,
  });
}


// 机构启用和停止
export async function startOrStop(params){
  return request('http://localhost:8080/hia/org/startOrStop', {
    method: 'POST',
    body: params,
  });
}


/**
 * 查询省
 * @returns {Promise<Object>}
 */
export async function findProvince(){
  return request('http://localhost:8080/hia/dictArea/findProvince', {
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
  console.info("查询市params------：",params)
  return request('http://localhost:8080/hia/dictArea/findCity', {
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
  return request('http://localhost:8080/hia/dictArea/findCounty', {
    method: 'POST',
    body: params,
  });
}

/**
 * 查询区域所有数据
 * @returns {Promise<Object>}
 */
export async function findArea(){
  return request('http://localhost:8080/hia/dictArea/find', {
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
  return request('http://localhost:8080/hia/dist/findSysHospitalBelong')

}

/**
 * 查询床位范围
 *
 * @returns {Promise<Object>}
 */
export async function findSysBedScope(){
  return request('http://localhost:8080/hia/dist/findSysBedScope')

}

/**
 * 查询医院等级
 *
 * @returns {Promise<Object>}
 */
export async function findSysHospitalLevel(){
  return request('http://localhost:8080/hia/dist/findSysHospitalLevel')
}

/**
 * 查询医院类型
 *
 * @returns {Promise<Object>}
 */
export async function findHospitalType(){
  return request('http://localhost:8080/hia/dist/findHospitalType')
}


/**
 * 查询上级单位
 *
 * @returns {Promise<Object>}
 */
export async function getParentOrg(){
  return request('http://localhost:8080/hia/org/getParentOrg')
}



/* 管理 API  end  */
