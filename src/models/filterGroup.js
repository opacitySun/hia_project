// import { delFilterResult,addFilterResult } from '../services/sys-api';

export default {
  namespace: 'filterGroup',

  state: {
    resultArr: []
  },

  effects: {
    *addResultArr({ payload }, { call, put }) {
      const data = yield call(addFilterResult,payload.id);
      yield put({
        type: 'addResultArr',
        payload: data,
      });
    },
    *delResultArr({ payload }, { call, put }) {
      const data = yield call(delFilterResult,payload.id);
      yield put({
        type: 'delResultArr',
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
    addResultArr(state, { payload }) {
      return {
        ...state,
        resultArr: payload,
      };
    },
    delResultArr(state, { payload }) {
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