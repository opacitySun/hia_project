import {
  queryCardList,
  getIndexScatterData,
  getIndexLineData,
  getIndexBarData,
  getIndexPieData
} from '../services/webIndex-api';

export default {
  namespace: 'webIndex',

  state: {

  },

  effects: {
    *queryData({ payload }, { put,call }) {
      const resCardList = yield call(queryCardList);
      const resScatterData = yield call(getIndexScatterData);
      const resLineData = yield call(getIndexLineData);
      const resBarData = yield call(getIndexBarData);
      const resPieData = yield call(getIndexPieData);
      yield put({
        type: 'dataReducers',
        payload: {
          'cardList':resCardList.data,
          'scatterData':resScatterData.data,
          'lineData':resLineData.data,
          'barData':resBarData.data,
          'pieData':resPieData.data,
        }
      });
    },
  },

  reducers: {
    dataReducers(state, { payload }) {
      return {
        ...state,
        cardList: payload.cardList,
        scatterData:payload.scatterData,
        lineData:payload.lineData,
        barData:payload.barData,
        pieData:payload.pieData,
      };
    },
  }
};
