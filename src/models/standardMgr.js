import {
  queryVersions,
  queryHospitalIndex,
  enableVersion,
  saveIndex,
  saveIndex2,
  updateIndex,
  deleteIndex,
  queryDeptIndex,
  deleteDeptIndex,
  updateDeptIndex,
} from '../services/standardMgr-api';

export default {
  namespace: 'standardMgr',

  state: {
    dataSource1:[],
    dataSource2:[],
    dataSource3:[],
  },

  effects: {
    // //  查询版本号
    // *queryVersions({ payload }, { call, put }) {
    //   const response = yield call(queryVersions, payload.filterResult);
    //   const results = Array.isArray(response) ? response : [];
    //   results.map((item, index) => {
    //     Object.assign(item, {key: item.pkId, sortNo:index+1})
    //     return item
    //   });
    //   yield put({
    //     type: 'dispatchPayload',
    //     payload: {
    //       dataSource1: results,
    //     },
    //   })
    // },

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
    //  启用版本号
    *enableVersion({ payload, callback }, { call, put }) {
      const response = yield call(enableVersion, payload.pkId);
      callback(response);
      if(response.code === 1){
        yield put({
          type: 'enableVersionReducer',
          payload: {
            pkId: payload.pkId,
          },
        })
      }
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
    enableVersionReducer(state, {payload}) {
      const {dataSource1} = state
      dataSource1.map(item=>{
        if(item.pkId === payload.pkId){
          item.isUsed = 1;
        }else{
          item.isUsed = 0;
        }
        return item
      })
      return {...state,...dataSource1}
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
