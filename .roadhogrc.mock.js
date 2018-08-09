import {delay} from 'roadhog-api-doc';

// 是否禁用代理
// const noProxy = process.env.NO_PROXY === 'true';
const noProxy = true;
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
};

export default (noProxy ? {
  'GET /api/(.*)': 'http://localhost:8080/api/',
  'POST /api/(.*)': 'http://localhost:8080/api/',} : delay(proxy, 1000));