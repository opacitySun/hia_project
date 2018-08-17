import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/* 成本监管 API start */

// 查询筛选区域
export async function queryRegion() {
  return request(path+'/api/cost/region/query');
}

// 查询医院类型
export async function queryHospitalType() {
  return request(path+'/api/dist/findHospitalType');
}

// 查询床位范围
export async function queryBedRange() {
  return request(path+'/api/dist/findSysBedScope');
}

// 查询医院等级
export async function queryHospitalGrade() {
  return request(path+'/api/dist/findSysHospitalLevel');
}

// 查询所属
export async function queryBelonged() {
  return request(path+'/api/dist/findSysHospitalBelong');
}

// 查询医院
export async function queryHospital() {
  return request(path+'/api/dist/findSysHospitalName');
}

/* 成本监管  API end  */
