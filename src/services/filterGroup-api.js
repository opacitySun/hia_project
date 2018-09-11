import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

// 查询筛选区域
export async function queryRegion() {
  return request(path+'/api/dictArea/find', {
    method: 'POST',
    body: {},
  });
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

// 查询上级单位
export async function queryParentOrg(){
  return request(path+'/api/org/getParentOrg')
}

// 查询项目类别
export async function queryProjectType(){
  return request(path+'/api/dist/findDictIncomeType')
}

// 查询项目名称
export async function queryProjectName(typeCode){
  if(typeCode == ''){
    return request(path+'/api/dist/findDictIncomePro')
  }else{
    return request(path+'/api/dist/findDictIncomePro/'+typeCode)
  }
}
