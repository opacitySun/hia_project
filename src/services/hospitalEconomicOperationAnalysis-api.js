import request from '../utils/request';

const path = 'http://192.168.36.110:9999';

/*
收支结余率start
 */

// 获取图表overview
export async function getBalanceOfPaymentsRatioCharts(params) {
  return request(`${path}/api/cost/balanceOfPayments/getViewData-1`, {
    method: 'POST',
    body: params,
  });
}

// 获取表格数据
export async function getBalanceOfPaymentsRatioTable(params) {
  return request(`${path}/api/cost/balanceOfPayments/getViewData-2`, {
    method: 'POST',
    body: params,
  });
}

// 获取某医院图表
export async function getBalanceOfPaymentsRatioChartByHospital(params) {
  return request(`${path}/api/cost/balanceOfPayments/getViewData-2`, {
    method: 'POST',
    body: params,
  });
}

/*
收支结余率end
 */
