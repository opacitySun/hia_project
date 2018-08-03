import {
  changeFilterResult
} from '../services/sys-api';

export default {
  namespace: 'cost',

  state: {
    resultArr: []
  },

  effects: {
    //查询条件改变时的重新查询
    *changeResultArr({ payload }, { call, put }) {
      const data = yield call(changeFilterResult,payload.filterResult);
      yield put({
        type: 'changeResultArr',
        payload: data,
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
  }
};
