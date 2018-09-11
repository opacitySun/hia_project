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
      const response = yield call(getIndicatorWarningCardList,{"p_year_code": 2018});
      yield put({
        type: 'getCardListReducers',
        payload: response,
      });
    },
  },

  reducers: {
    getCardListReducers(state, { payload }) {
      return {
        ...state,
        cardList: payload,
      };
    },
  }
};
