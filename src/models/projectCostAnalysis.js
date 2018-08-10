import {
  getHospitalComparison,
  getRegionComparison,
  getStyleComparison,
  getGradeComparison
} from '../services/projectCostAnalysis-api';

export default {
  namespace: 'projectCostAnalysis',

  state: {

  },

  effects: {
    //获取院间数据
    *queryHospitalComparison({}, { call, put }) {
      const response = yield call(getHospitalComparison);
      yield put({
        type: 'queryHospitalComparison',
        payload: response.data,
      });
    },
    //获取区域数据
    *queryRegionComparison({}, { call, put }) {
      const response = yield call(getRegionComparison);
      yield put({
        type: 'queryRegionComparison',
        payload: response.data,
      });
    },
    //获取类型数据
    *queryStyleComparison({}, { call, put }) {
      const response = yield call(getStyleComparison);
      yield put({
        type: 'queryStyleComparison',
        payload: response.data,
      });
    },
    //获取等级数据
    *queryGradeComparison({}, { call, put }) {
      const response = yield call(getGradeComparison);
      yield put({
        type: 'queryGradeComparison',
        payload: response.data,
      });
    },
  },

  reducers: {
    queryHospitalComparison(state, { payload }) {
      return {
        ...state,
        hospitalComparison: payload,
      };
    },
    queryRegionComparison(state, { payload }) {
      return {
        ...state,
        regionComparison: payload,
      };
    },
    queryStyleComparison(state, { payload }) {
      return {
        ...state,
        styleComparison: payload,
      };
    },
    queryGradeComparison(state, { payload }) {
      return {
        ...state,
        gradeComparison: payload,
      };
    },
  }
};
