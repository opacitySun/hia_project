import NetUtil from '../../../constants/httpUtil';

export class LoadService {

}

export class SysParamConfigService {
  queryParamName = (successFn) => {
    successFn();
    // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
  }

  queryIndexTypeList = (successFn) => {
    successFn();
    // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
  }

  queryIndexNameList = (successFn) => {
    successFn();
    // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
  }

  queryByParam = (param, successFn) => {
    successFn();
    // NetUtil.ajaxGet(`http://localhost:8080/api/hosIndexValMana/getDataByCode/${param}`, successFn);
  }

  saveVersion = (params, successFn) => {
    successFn();
    // NetUtil.ajaxPost('http://localhost:8080/api/hosIndexValMana/updateSysStandardIndex1',params, successFn);
  }

  saveIndex = (params, successFn) => {
    successFn();
    // NetUtil.ajaxPost('http://localhost:8080/api/hosIndexValMana/updateSysStandardIndex2',params, successFn);
  }

  queryHospitalIndex = (param1, param2 , successFn) => {
    successFn();
    // NetUtil.ajaxGet(`http://localhost:8080/api/sysParams/findSysParams/${param}`, successFn);
  }

  deleteVersion = (id, successFn) => {
    successFn();
    // NetUtil.ajaxGet(`http://localhost:8080/api/sysParams/findSysParams/${param}`, successFn);
  }

  deleteIndex = (id, successFn) => {
    successFn();
    // NetUtil.ajaxGet(`http://localhost:8080/api/sysParams/findSysParams/${param}`, successFn);
  }

}
