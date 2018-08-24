import {
  queryVersions,
  queryHospitalIndex,
  enableVersion,
  saveVersion,
  deleteVersion,
  saveIndex,
  deleteIndex,
  queryDeptIndex,
  deleteDeptIndex,
} from '../services/standardMgr-api';

export default {
  namespace: 'standardMgr',

  state: {
    dataSource1:[],
    dataSource2:[],
    dataSource3:[],
  },

  effects: {
    //  查询版本号
    *queryVersions({ payload }, { call, put }) {
      const response = yield call(queryVersions, payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.normT, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource1: results,
        },
      })
    },
    *saveVersion({ payload, callback }, { call }) {
      const response = yield call(saveVersion, payload.values);
      callback(response);
    },
    *deleteVersion({ payload, callback }, { call, put }) {
      const response = yield call(deleteVersion, {normT: payload.ids, isYes:payload.isYes});
      if(response.code === 1){
        yield put({
          type: 'deleteVersionReducer',
          payload: {
            ids: payload.ids,
          },
        })
      }
      callback(response);
    },
    *saveIndex({ payload, callback }, { call }) {
      const response = yield call(saveIndex, payload.values);
      callback(response);
    },
    *deleteIndex({ payload, callback }, { call, put }) {
      const response = yield call(deleteIndex, {normT: payload.ids, isYes: payload.isYes});
      callback(response);
      if(response.code === 1) {
        yield put({
          type: 'deleteIndexReducer',
          payload: {
            ids: payload.ids,
          },
        })
      }
    },
    //  查询医院指标
    *queryHospitalIndex({ payload }, { call, put }) {
      const response = yield call(queryHospitalIndex,payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.id, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource2: results,
        },
      })
    },
    //  启用版本号
    *enableVersion({ payload, callback }, { call, put }) {
      const response = yield call(enableVersion, payload.normT);
      callback(response);
      if(response.code === 1){
        yield put({
          type: 'enableVersionReducer',
          payload: {
            normT: payload.normT,
          },
        })
      }
    },
    //  查询科室指标
    *queryDeptIndex({ payload }, { call, put }) {
      const response = yield call(queryDeptIndex,payload.filterResult);
      const results = Array.isArray(response) ? response : [];
      results.map((item, index) => {
        Object.assign(item, {key: item.id, sortNo:index+1})
        return item
      });
      yield put({
        type: 'dispatchPayload',
        payload: {
          dataSource3: results,
        },
      })
    },
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
    enableVersionReducer(state, {payload}) {
      const {dataSource1} = state
      dataSource1.map(item=>{
        if(item.normT === payload.normT){
          item.isUsed = 1;
        }else{
          item.isUsed = 0;
        }
        return item
      })
      return {...state,...dataSource1}
    },
    deleteVersionReducer(state, {payload}) {
      state.dataSource1 = state.dataSource1.filter(item=>{
        return !payload.ids.includes(item.normT)
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
    deleteIndexReducer(state, {payload}) {
      state.dataSource2 = state.dataSource2.filter(item=>{
        return !payload.ids.includes(item.id)
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
    deleteDeptIndexReducer(state, {payload}) {
      state.dataSource3 = state.dataSource3.filter(item=>{
        return !payload.ids.includes(item.id)
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
  },
};
