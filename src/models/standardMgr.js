import {
  queryVersions,
  queryHospitalIndex,
  enableVersion,
} from '../services/standardMgr-api';

export default {
  namespace: 'standardMgr',

  state: {
    dataSource1:[],
    dataSource2:[],
    selectedRowKeys1:[],
    selectedRowKeys2:[],
  },

  effects: {
    //  查询版本号
    *queryVersions({ payload }, { call, put }) {
      const response = yield call(queryVersions, payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.normT, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource1: results,
          selectedRowKeys1: [],
        },
      })
    },
    //  查询医院指标
    *queryHospitalIndex({ payload }, { call, put }) {
      const response = yield call(queryHospitalIndex,payload.filterResult);
      yield put({
        type: 'queryHospitalIndex',
        payload: response.data,
      });
    },
    //  启用版本号
    *enableVersion({ payload }, { call, put }) {
      const response = yield call(enableVersion,{filterResult:payload.filterResult});
      yield put({
        type: 'enableVersion',
        payload: response.data,
      });
    },
  },
  reducers: {
    dispatchPayload(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
