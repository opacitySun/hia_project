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
    *queryHospitalComparison({ payload }, { call, put }) {
      const response = yield call(getHospitalComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryHospitalComparison',
        payload: response.data,
      });
    },
    //获取区域数据
    *queryRegionComparison({ payload }, { call, put }) {
      const response = yield call(getRegionComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryRegionComparison',
        payload: response.data,
      });
    },
    //获取类型数据
    *queryStyleComparison({ payload }, { call, put }) {
      const response = yield call(getStyleComparison,{filterResult:payload.filterResult});
      yield put({
        type: 'queryStyleComparison',
        payload: response.data,
      });
    },
    //获取等级数据
    *queryGradeComparison({ payload }, { call, put }) {
      const response = yield call(getGradeComparison,{filterResult:payload.filterResult});
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
        hospitalComparison: payload.data,
      };
    },
    queryRegionComparison(state, { payload }) {
      return {
        ...state,
        regionComparison: payload.data,
      };
    },
    queryStyleComparison(state, { payload }) {
      return {
        ...state,
        styleComparison: payload.data,
      };
    },
    queryGradeComparison(state, { payload }) {
      return {
        ...state,
        gradeComparison: payload.data,
      };
    },
  }
};
