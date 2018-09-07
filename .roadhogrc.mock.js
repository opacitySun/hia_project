import {delay} from 'roadhog-api-doc';

// 引入分离的 mock 文件
import {
  getProjectHospitalComparison,
  getProjectRegionComparison,
  getProjectStyleComparison,
  getProjectGradeComparison
} from './mock/cost/projectCostAnalysis';
import {
  getDiseaseHospitalComparison,
  getDiseaseRegionComparison,
  getDiseaseStyleComparison,
  getDiseaseGradeComparison
} from './mock/cost/diseaseCostAnalysis';
import {
  getIndicatorWarningCardList
} from './mock/cost/indicatorWarning';
import {
  loginPath
} from './mock/cost/login';
import {
  indexCardList,
  getIndexScatterData,
  getIndexLineData,
  getIndexBarData,
  getIndexPieData
} from './mock/cost/index';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
// const noProxy = false;
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/loginPath': loginPath,
  'GET /api/indexCardList': indexCardList,
  'GET /api/getIndexScatterData': getIndexScatterData,
  'GET /api/getIndexLineData': getIndexLineData,
  'GET /api/getIndexBarData': getIndexBarData,
  'GET /api/getIndexPieData': getIndexPieData,
  'POST /api/projectHospitalComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getProjectHospitalComparison });
  },
  'POST /api/projectRegionComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getProjectRegionComparison });
  },
  'POST /api/projectStyleComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getProjectStyleComparison });
  },
  'POST /api/projectGradeComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getProjectGradeComparison });
  },
  'POST /api/diseaseHospitalComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getDiseaseHospitalComparison });
  },
  'POST /api/diseaseRegionComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getDiseaseRegionComparison });
  },
  'POST /api/diseaseStyleComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getDiseaseStyleComparison });
  },
  'POST /api/diseaseGradeComparison': (req, res) => {
    res.send({ status:200,ok:true,data:getDiseaseGradeComparison });
  },
  'POST /api/indicatorWarningCardList': (req, res) => {
    res.send({ status:200,ok:true,data:getIndicatorWarningCardList });
  },
};

export default (noProxy ? {
  'GET /api/(.*)': 'http://localhost:8080/api/',
  'POST /api/(.*)': 'http://localhost:8080/api/',} : delay(proxy, 1000));
