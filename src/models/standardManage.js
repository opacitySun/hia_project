import { querySysIndexRelevances, querySysIndexRelevancespp, querySysIndexRelevancesbc} from '../services/standardManage-api';

export default {
  namespace: 'standardManage',

  state: {
    resultArr: []
  },

  effects: {
    //查询对应关系数据
    *queryCorrespondence({ payload }, { call, put }) {
      const response = yield call(querySysIndexRelevances);
      yield put({
        type: 'queryCorrespondenceReducers',
        payload: response
      });
    },
    //获取自动匹配
/*    *queryCorrespondencepp({ payload }, { call, put }) {
      const response = yield call(querySysIndexRelevancespp);
      yield put({
        type: 'queryCorrespondenceReducerspp',
        payload: response
      });
    },*/
    //获取保存按钮
/*    *queryCorrespondencebc({ payload }, { call, put }) {
      const response = yield call(querySysIndexRelevancesbc);
      yield put({
        type: 'queryCorrespondenceReducersbc',
        payload: response
      });
    },*/
  },

  reducers: {
    queryCorrespondenceReducers(state, { payload }) {
      return {
        ...state,
        correspondenceData: payload,
      };
    },
/*    queryCorrespondenceReducerspp(state, { payload }) {
      return {
        ...state,
        correspondenceDatapp: payload,
      };
    },*/
/*    queryCorrespondenceReducersbc(state, { payload }) {
      return {
        ...state,
        correspondenceDatabc: payload,
      };
    },*/
  },
};
