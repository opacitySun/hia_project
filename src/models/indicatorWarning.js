import {
  getIndicatorWarningCardList
} from '../services/indicatorWarning-api';

export default {
  namespace: 'indicatorWarning',

  state: {
    resultArr: []
  },

  effects: {
    //查询条件改变时的重新查询
    *getCardList({ payload }, { call, put }) {
      const response = yield call(getIndicatorWarningCardList,{filterResult:payload.filterResult});
      yield put({
        type: 'getCardList',
        payload: response.data,
      });
    },
  },

  reducers: {
    getCardList(state, { payload }) {
      return {
        ...state,
        cardList: payload.data,
      };
    },
  }
};
