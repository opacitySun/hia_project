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
    //  获取版本号字典
    *queryVersionDict({ payload }, { call, put }) {
      const response = yield call(queryVersions, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          versionList: response,
        },
      })
    },
    //  获取计量单位字典
    *findMeteringUnit({ payload }, { call, put }) {
      const response = yield call(findMeteringUnit, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          meteringUnitList: response,
        },
      })
    },
    //  获取指标字典
    *findDictIndex({ payload }, { call, put }) {
      const response = yield call(findDictIndex, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          indexList: response,
        },
      })
    },
    //  获取指标分类字典
    *findDictIndexType({ payload }, { call, put }) {
      const response = yield call(findDictIndexType, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          indexTypeList: response,
        },
      })
    },
    //  获取医院类型列表
    *getHospitalType({ payload }, { call, put }) {
      const response = yield call(getHospitalType, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          hospitalTypeList: response,
        },
      })
    },
    //  获取医院级别列表
    *getHospitalLevel({ payload }, { call, put }) {
      const response = yield call(getHospitalLevel, {})
      yield put({
        type: 'dispatchPayload',
        payload: {
          hospitalLevelList: response,
        },
      })
    },
    //  获取区域字典
    *findDictArea({ payload, callback }, { call, put }) {
      const response = yield call(findDictArea, payload.areaCode);
      if(callback !== undefined){
        callback(response)
      }else if(payload.areaCode === '0'){
          yield put({
            type: 'dispatchPayload',
            payload: {
              provinceAreaList: response,
            },
          })
        }else if(payload.areaCode === ''){
          yield put({
            type: 'dispatchPayload',
            payload: {
              allAreaList: response,
            },
          })
        }
      },
      //  获取标准科室列表
      *getSysDept({ payload }, { call, put }) {
        const response = yield call(findSysDept, {})
        yield put({
          type: 'dispatchPayload',
          payload: {
            sysDeptList: response,
          },
        })
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
            type: 'bdDict/getSysDept',
          })
          dispatch({
            type: 'bdDict/findDictArea',
            payload: {
              areaCode: '0',
            },
          });
          dispatch({
            type: 'bdDict/queryVersionDict',
          });
        }
      });
    },
  },
};
