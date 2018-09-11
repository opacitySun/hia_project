import {
  findMeteringUnit,
  getHospitalType,
  getHospitalLevel,
  findDictIndex,
  findDictIndexType,
  findDictArea,
  queryVersions,
  saveVersion,
  deleteVersion,
  enableVersion,
  findSysDept,
} from '../services/bdDict-api';

export default {
  namespace: 'bdDict',

  state: {
    hospitalTypeList:[],
    hospitalLevelList:[],
    indexList:[],
    indexTypeList:[],
    allAreaList:[],
    provinceAreaList:[],
    meteringUnitList:[],
    versionList:[],
  },

  effects: {
    //  保存版本信息
    *saveVersion({ payload, callback }, { call }) {
      const response = yield call(saveVersion, payload.values);
      if(callback){
        callback(response)
      }
    },
    //  删除版本信息
    *deleteVersion({ payload, callback }, { call, put }) {
      const response = yield call(deleteVersion, {pkId: payload.pkId, isYes:payload.isYes});
      if(response.code === 1){
        yield put({
          type: 'deleteVersionReducer',
          payload: {
            pkId: payload.pkId,
          },
        })
      }
      if(callback){
        callback(response)
      }
    },
    //  启用版本号
    *enableVersion({ payload, callback }, { call, put }) {
      const response = yield call(enableVersion, payload.pkId);
      if(callback){
        callback(response);
      }
      if(response.code === 1){
        yield put({
          type: 'enableVersionReducer',
          payload: {
            pkId: payload.pkId,
          },
        })
      }
    },
    //  获取版本号字典
    *queryVersionDict({ payload }, { call, put }) {
      const response = yield call(queryVersions, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          versionList: results,
        },
      })
    },
    //  获取计量单位字典
    *findMeteringUnit({ payload }, { call, put }) {
      const response = yield call(findMeteringUnit, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          meteringUnitList: results,
        },
      })
    },
    //  获取指标字典
    *findDictIndex({ payload }, { call, put }) {
      const response = yield call(findDictIndex, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          indexList: results,
        },
      })
    },
    //  获取指标分类字典
    *findDictIndexType({ payload }, { call, put }) {
      const response = yield call(findDictIndexType, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          indexTypeList: results,
        },
      })
    },
    //  获取医院类型列表
    *getHospitalType({ payload }, { call, put }) {
      const response = yield call(getHospitalType, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          hospitalTypeList: results,
        },
      })
    },
    //  获取医院级别列表
    *getHospitalLevel({ payload }, { call, put }) {
      const response = yield call(getHospitalLevel, {})
      const results = Array.isArray(response) ? response : [];
      yield put({
        type: 'dispatchPayload',
        payload: {
          hospitalLevelList: results,
        },
      })
    },
    //  获取区域字典
    *findDictArea({ payload, callback }, { call, put }) {
      const response = yield call(findDictArea, payload.areaCode);
      const results = Array.isArray(response) ? response : [];
      if(callback !== undefined){
        callback(results)
      }else if(payload.areaCode === '0'){
          yield put({
            type: 'dispatchPayload',
            payload: {
              provinceAreaList: results,
            },
          })
        }else if(payload.areaCode === ''){
          yield put({
            type: 'dispatchPayload',
            payload: {
              allAreaList: results,
            },
          })
        }
    },
  },

  reducers: {
    dispatchPayload(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    deleteVersionReducer(state, {payload}) {
      state.versionList = state.versionList.filter(item=>{
        return payload.pkId !== item.pkId
      }).map((item, index) => {
        Object.assign(item, {sortNo:index+1})
        return item
      });
      return {...state}
    },
    enableVersionReducer(state, {payload}) {
      const {versionList} = state
      versionList.map(item=>{
        if(item.pkId === payload.pkId){
          item.isUsed = 1;
        }else{
          item.isUsed = 0;
        }
        return item
      })
      return {...state,...versionList}
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        if (pathname === '/' || history.action === 'POP') {
          dispatch({
            type: 'bdDict/findMeteringUnit',
          });
          dispatch({
            type: 'bdDict/findDictIndex',
          });
          dispatch({
            type: 'bdDict/findDictIndexType',
          });
          dispatch({
            type: 'bdDict/getHospitalType',
          });
          dispatch({
            type: 'bdDict/getHospitalLevel',
          });
          dispatch({
            type: 'bdDict/findDictArea',
            payload: {
              areaCode: '',
            },
          });
          dispatch({
            type: 'bdDict/findDictArea',
            payload: {
              areaCode: '0',
            },
          })
          dispatch({
            type: 'bdDict/queryVersionDict',
          })
        }
      });
    },
  },
};
