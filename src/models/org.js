import {
  queryAllOrg,
  saveOrg,
  queryOrg,
  updateOrg,
  deleteOrgs,
  startOrStop,
  findProvince,
  findCity,
  findCounty,
  findArea,
  findDictBelongTo,
  findSysBedScope,
  findSysHospitalLevel,
  findHospitalType,
  getParentOrg,
} from '../services/org-api';
import { message } from 'antd/lib/index';
import request from "../utils/request";


export default {
  namespace: 'org',

  state: {
    orgList: [],

    provinces:[],
    citys:[],
    countys:[],
    area:[],
    dictBelongTo:[],
    hospitalType:[],
    sysBedScope:[],
    hospitalLevel:[],
    parentOrg:[],

    pagination: { // 表格翻页设置
      total: 0, // 表格数据总数量
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },

  effects: {


    /**
     * 查询所有机构
     * @param _
     * @param call
     * @param put
     * @returns {IterableIterator<*>}
     */
    *fetchOrgs({payload}, { call, put }) {
      const response = yield call(queryAllOrg,{
        "orgType":payload.orgType,
        "orgName":payload.orgName,
        "provinceValue":payload.provinceValue,
        "cityValue":payload.cityValue,
        "countyValue":payload.countyValue,
        "areaValue":payload.areaValue,
        "belongToCode":payload.belongToCode,
        "bedScaleCode":payload.bedScaleCode,
        "hospGradeCode":payload.hospGradeCode,
        "hospTypeCode":payload.hospTypeCode,
        "parentOrg":payload.parentOrg,
        "pageSize":payload.pageSize,
        "pageNum":payload.pageNum});
      // const response = yield call(queryAllOrg,{payload});
      yield put({
        type: 'setOrgList',
        payload: response,
      });
    },


    /**
     * 根据ID查询指定机构
     * @param Id
     * @returns {Promise<Object>}
     */
    *queryOrg({payload,callback}, { call}) {
      const response = yield call(queryOrg,payload);
      if (response.code === 200 || response.status === 'ok') {
        if (callback) {
          callback(response.result);
        }
      }
    },

    /**
     * 保存（新增/修改）机构
     * @param payload
     * @param call
     * @param put
     * @param
     * @returns {IterableIterator<*>}
     */
    *saveOrg({ payload,callback }, { call }) {
        if(payload.id == null || payload.id === ""){
          const response = yield call(saveOrg, payload);
          // 新增
          if(response.code === 200){
            message.success('新增机构保存完成！')
            if (callback) {
              callback();
            };
          }
        }else {
          const response = yield call(updateOrg, payload);
          // 修改
          if(response.code === 200){
            message.success('修改机构信息完成！')
            if (callback) {
              callback();
            };
          }
        }
      },

    /**
     * 删除机构
     * @param payload
     * @param call
     * @param put
     * @param
     * @returns {IterableIterator<*>}
     */
   *deleteOrgs({ payload,callback }, { call }) {
      if(payload.id == null || payload.id === ""){
        const response = yield call(deleteOrgs, payload);
        // 删除
        if(response.code === 200){
          message.success('删除完成！')
          if (callback) {
            callback();
          };
        }
      }
    },

    /**
     *机构启用、停止
     * @param payload
     * @param callback
     * @param call
     */
    *startOrStop({ payload,callback }, { call }) {
      const response = yield call(startOrStop, payload);
      if(payload.id == null || payload.id === ""){
        // =机构启用、停止
        if(response.code === 200){
          message.success('操作完成！')
          if (callback) {
            callback();
          };
        }
      }
    },


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

    /**
     * 更新机构信息列表
     * @param state
     * @param action
     * @returns {{orgList: *}}
     */
    setOrgList(state, action) {
      return {
        ...state,
        pageResult: action.payload.pageResult,
      };
    },
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
  },
};
