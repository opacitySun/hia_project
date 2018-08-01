// import { changeFilterResult } from '../services/sys-api';

export default {
  namespace: 'filterGroup',

  state: {
    resultArr: []
  },

  effects: {
    *addResultArr({ payload }, { call, put }) {
      const data = yield call(changeFilterResult,payload.id);
      yield put({
        type: 'changeResultArr',
        payload: data,
      });
    },
    *clearResultArr({ payload }, { put }) {
      yield put({
        type: 'clearResultArr',
        payload,
      });
    },
  },

  reducers: {
    changeResultArr(state, { payload }) {
      return {
        ...state,
        resultArr: payload,
      };
    },
    clearResultArr(state, { payload }) {
      return {
        ...state,
        resultArr: payload,
      };
    },
  }
};
