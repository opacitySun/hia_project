import NetUtil from '../../../constants/httpUtil';

export class LoadService {

}

export class SysParamConfigService {
  queryParamName = (successFn) => {
    successFn();
    // NetUtil.ajaxGet('http://localhost:8080/api/dist/findSysStandardIndex1/', successFn);
  }

  queryByParam = (param, successFn) => {
    successFn();
    // NetUtil.ajaxGet(`http://localhost:8080/api/sysParams/findSysParams/${param}`, successFn);
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
