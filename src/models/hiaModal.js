import {
  findProvince,
  findCity,
  findCounty,
  findArea,
  findDictBelongTo,
  findSysBedScope,
  findSysHospitalLevel,
  findHospitalType,
  getParentOrg,
} from '../services/hiaModal-api';

export default {
  namespace: 'hiaModal',

  state: {

  },

  effects: {
    /**
     * 查询省
     * @param payload
     * @param call
     * @param put
     */
    *findProvince({payload}, { call, put }){
      const response = yield call(findProvince);
      yield put({
        type: 'setProvince',
        payload: response.result,
      });
    },

    /**
     * 查询市
     * @param payload
     * @param call
     * @param put
     */
    *findCity({payload}, { call, put }){
      // this.state.citys = [];
      const response = yield call(findCity, payload);
      yield put({
        type: 'setCity',
        payload: response.result,
      });
    },


  /**
   * 查询区/县
   * @param payload
   * @param call
   * @param put
   */
  *findCounty({payload}, { call, put }){
    const response = yield call(findCounty,payload);
    yield put({
      type: 'setCounty',
      payload: response.result,
    });
  },


  /**
   * 查询所有区域数据
   * @param payload
   * @param call
   * @param put
   */
  *findArea({payload}, { call, put }){
    const response = yield call(findArea);
    yield put({
      type: 'setFindArea',
      payload: response.result,
    });
  },

    /**
     * 查询医院归属
     * @param payload
     * @param call
     * @param put
     */
    *findDictBelongTo({payload}, { call, put }){
      const response = yield call(findDictBelongTo);
      yield put({
        type: 'setDictBelongTo',
        payload: response,
      });
    },

    /**
     * 查询医院类型
     * @param payload
     * @param call
     * @param put
     */
    *findHospitalType({payload}, { call, put }){
      const response = yield call(findHospitalType);
      yield put({
        type: 'setHospitalType',
        payload: response,
      });
    },

    /**
     * 查询医院等级
     * @param payload
     * @param call
     * @param put
     */
    *findSysHospitalLevel({payload}, { call, put }){
        const response = yield call(findSysHospitalLevel);
        yield put({
          type: 'setHospitalLevel',
          payload: response,
        });
      },

    /**
     * 查询医院床位范围
     * @param payload
     * @param call
     * @param put
     */
    *findSysBedScope({payload}, { call, put }){
      const response = yield call(findSysBedScope);
      yield put({
        type: 'setSysBedScope',
        payload: response,
      });
    },

    /**
     * 查询上级单位
     * @param payload
     * @param call
     * @param put
     */
    *getParentOrg({payload},{ call, put }){
      const response = yield call(getParentOrg);
      yield put({
        type: 'setParentOrg',
        payload: response.result,
      });
    },
  },

  reducers: {
    setProvince(state, action) {
      return {
        ...state,
        provinces: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        citys: action.payload,
      };
    },
    setCounty(state, action) {
      return {
        ...state,
        countys: action.payload,
      };
    },
    setFindArea(state, action) {
     return {
       ...state,
        area: action.payload,
      };
    },
    setDictBelongTo(state, action) {
      return {
        ...state,
       dictBelongTo: action.payload,
      };
    },
    setHospitalType(state, action) {
      return {
        ...state,
        hospitalType: action.payload,
      };
    },
    setSysBedScope(state, action) {
      return {
        ...state,
        sysBedScope: action.payload,
      };
    },
    setHospitalLevel(state, action) {
      return {
        ...state,
        hospitalLevel: action.payload,
      };
    },
    setParentOrg(state, action) {
      return {
        ...state,
        parentOrg: action.payload,
      };
    },
  }
};
