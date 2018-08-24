import {
  getHospitalComparison,
  getRegionComparison,
  getStyleComparison,
  getGradeComparison
} from '../services/diseaseCostAnalysis-api';

export default {
  namespace: 'diseaseCostAnalysis',

  state: {

  },

  effects: {
    //获取院间数据
    *queryHospitalComparison({ payload }, { call, put }) {
      const response = yield call(getHospitalComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryHospitalComparisonReducer',
        payload: response.data,
      });
    },
    //获取区域数据
    *queryRegionComparison({ payload }, { call, put }) {
      const response = yield call(getRegionComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryRegionComparisonReducer',
        payload: response.data,
      });
    },
    //获取类型数据
    *queryStyleComparison({ payload }, { call, put }) {
      const response = yield call(getStyleComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryStyleComparisonReducer',
        payload: response.data,
      });
    },
    //获取等级数据
    *queryGradeComparison({ payload }, { call, put }) {
      const response = yield call(getGradeComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryGradeComparisonReducer',
        payload: response.data,
      });
    },
  },

  reducers: {
    queryHospitalComparisonReducer(state, { payload }) {
      return {
        ...state,
        hospitalComparison: payload.data,
      };
    },
    queryRegionComparisonReducer(state, { payload }) {
      return {
        ...state,
        regionComparison: payload.data,
      };
    },
    queryStyleComparisonReducer(state, { payload }) {
      return {
        ...state,
        styleComparison: payload.data,
      };
    },
    queryGradeComparisonReducer(state, { payload }) {
      return {
        ...state,
        gradeComparison: payload.data,
      };
    },
  }
};
