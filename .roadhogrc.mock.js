import {delay} from 'roadhog-api-doc';
import mockjs from 'mockjs';

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

// 是否禁用代理
// const noProxy = process.env.NO_PROXY === 'true';
const noProxy = false;
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/projectHospitalComparison': getProjectHospitalComparison,
  'GET /api/projectRegionComparison': getProjectRegionComparison,
  'GET /api/projectStyleComparison': getProjectStyleComparison,
  'GET /api/projectGradeComparison': getProjectGradeComparison,
  'GET /api/diseaseHospitalComparison': getDiseaseHospitalComparison,
  'GET /api/diseaseRegionComparison': getDiseaseRegionComparison,
  'GET /api/diseaseStyleComparison': getDiseaseStyleComparison,
  'GET /api/diseaseGradeComparison': getDiseaseGradeComparison,
};

export default (noProxy ? {
  'GET /api/(.*)': 'http://localhost:8080/api/',
  'POST /api/(.*)': 'http://localhost:8080/api/',} : delay(proxy, 1000));
