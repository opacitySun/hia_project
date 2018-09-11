import {
  queryHospitalIndex,
  saveIndex,
  saveIndex2,
  updateIndex,
  deleteIndex,
  queryDeptIndex,
  deleteDeptIndex,
  updateDeptIndex,
  findDictIndexByTypeCode,
} from '../services/standardMgr-api';

export default {
  namespace: 'standardMgr',

  state: {
    dataSource2:[],
    dataSource3:[],
    indexList:[],
  },

  effects: {
    *findDictIndexByTypeCode({ payload }, { call, put }) {
      const response = yield call(findDictIndexByTypeCode, payload.indexTypeCode)
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          indexList: results,
        },
      })
    },
    //  保存指标信息1
    *saveIndex({ payload, callback }, { call }) {
      const response = yield call(saveIndex, payload.values);
      callback(response);
    },
    //  保存指标信息2
    *saveIndex2({ payload, callback }, { call }) {
      const response = yield call(saveIndex2, {values:payload.values, isAdd:payload.isAdd});
      callback(response);
    },
    //  保存指标信息2
    *updateIndex({ payload, callback }, { call }) {
      const response = yield call(updateIndex, payload.normValue);
      callback(response);
    },
    //  保存科室指标信息
    *updateDeptIndex({ payload, callback }, { call }) {
      const response = yield call(updateDeptIndex, payload.standardValueList);
      callback(response);
    },
    //  删除指标信息
    *deleteIndex({ payload, callback }, { call, put }) {
      const response = yield call(deleteIndex, {pkIds: payload.pkIds, isYes: payload.isYes});
      callback(response);
      if(response.code === 1) {
        yield put({
          type: 'deleteIndexReducer',
          payload: {
            pkIds: payload.pkIds,
          },
        })
      }
    },
    //  查询医院指标
    *queryHospitalIndex({ payload }, { call, put }) {
      const response = yield call(queryHospitalIndex,payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.pkId, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource2: results,
        },
      })
    },
    //  查询科室指标
    *queryDeptIndex({ payload }, { call, put }) {
      const response = yield call(queryDeptIndex,payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.pkId, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource3: results,
        },
      })
    },
    //  删除科室指标
    *deleteDeptIndex({ payload, callback }, { call, put }) {
      const response = yield call(deleteDeptIndex, {ids: payload.ids});
      if(response.code === 1) {
        yield put({
          type: 'deleteDeptIndexReducer',
          payload: {
            ids: payload.ids,
          },
        })
      }
      callback(response);
    },
  },
  reducers: {
    dispatchPayload(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    deleteIndexReducer(state, {payload}) {
      state.dataSource2 = state.dataSource2.filter(item=>{
        return !payload.pkIds.includes(item.pkId)
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
    deleteDeptIndexReducer(state, {payload}) {
      state.dataSource3 = state.dataSource3.filter(item=>{
        return !payload.ids.includes(item.pkId)
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
  },
};
