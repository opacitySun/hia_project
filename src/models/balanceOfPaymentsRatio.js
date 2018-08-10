// 收支结余率
import {
  getBalanceOfPaymentsRatioChartByHospital,
  getBalanceOfPaymentsRatioCharts, getBalanceOfPaymentsRatioTable,
} from '../services/hospitalEconomicOperationAnalysis-api';

export default {
  namespace: 'balanceOfPaymentsRatio',
  state:{
    chartData: [],
    chartDetail:[],
    tableData:[],
  },
  effects:{
    *fetchChartOverview({payload},{call, put}){
      const response = yield call(getBalanceOfPaymentsRatioCharts, payload);
      yield put({
        type:'fetchChartOverviewSuccess',
        payload: response,
      });
    },
    *fetchChartDetail({payload},{call,put}){
      const response = yield call(getBalanceOfPaymentsRatioChartByHospital, payload);
      yield put({
        type:'fetchChartDetailSuccess',
        payload: response,
      });
    },
    *fetchTable({payload},{call,put}){
      const response = yield call(getBalanceOfPaymentsRatioTable, payload);
      yield put({
        type: 'fetchTableSuccess',
        payload: response,
      })
    },
  },
  reducers:{
    fetchChartOverviewSuccess(state,{payload}){
      console.log(payload);
      return {
        ...state,
        chartData: payload,
      };
    },
    fetchChartDetailSuccess(state,{payload}){
      return {
        ...state,
        chartDetail: payload,
      };
    },
    fetchTableSuccess(state,{payload}){
      return {
        ...state,
        tableData: payload,
      };
    },
  },
}
