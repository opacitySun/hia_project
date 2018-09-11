import {
  queryRegion,
  queryHospitalType,
  queryBedRange,
  queryHospitalGrade,
  queryBelonged,
  queryHospital,
  queryParentOrg,
  queryProjectType,
  queryProjectName
} from '../services/filterGroup-api';

export default {
  namespace: 'filterGroup',

  state: {

  },

  effects: {
    //查询区域
    *queryReg({}, { call,put }) {
      const region = yield call(queryRegion);
      yield put({
        type: 'queryRegion',
        payload:region.result
      });
    },
    //查询医疗机构
    *queryMedicalInstitution(_, { call,put }) {
      //医院类型
      const hospitalType = yield call(queryHospitalType);
      yield put({
        type: 'queryHospitalType',
        payload:hospitalType
      });
      //床位范围
      const bedRange = yield call(queryBedRange);
      yield put({
        type: 'queryBedRange',
        payload:bedRange
      });
      //医院等级
      const hospitalGrade = yield call(queryHospitalGrade);
      yield put({
        type: 'queryHospitalGrade',
        payload:hospitalGrade
      });
      //所属
      const belonged = yield call(queryBelonged);
      yield put({
        type: 'queryBelonged',
        payload:belonged
      });
      //医院
      const hospital = yield call(queryHospital);
      yield put({
        type: 'queryHospital',
        payload:hospital
      });
    },
    //查询区域
    *queryParentOrg({}, { call,put }) {
      const parentOrg = yield call(queryParentOrg);
      yield put({
        type: 'queryParentOrgReducers',
        payload:parentOrg.result
      });
    },
    //查询项目类别
    *queryProjectType({}, { call,put }) {
      const projectType = yield call(queryProjectType);
      yield put({
        type: 'getProjectType',
        payload:projectType
      });
    },
    //查询项目名称
    *queryProjectName({payload}, { call,put }) {
      const projectName = yield call(queryProjectName,payload.typeCode);
      yield put({
        type: 'getProjectName',
        payload:projectName
      });
    },
  },

  reducers: {
    queryRegion(state, { payload }) {
      return {
        ...state,
        region: payload
      };
    },
    queryHospitalType(state, { payload }) {
      return {
        ...state,
        hospitalType: payload
      };
    },
    queryBedRange(state, { payload }) {
      return {
        ...state,
        bedRange: payload
      };
    },
    queryHospitalGrade(state, { payload }) {
      return {
        ...state,
        hospitalGrade: payload
      };
    },
    queryBelonged(state, { payload }) {
      return {
        ...state,
        belonged: payload
      };
    },
    queryHospital(state, { payload }) {
      return {
        ...state,
        hospital: payload
      };
    },
    queryParentOrgReducers(state, { payload }) {
      return {
        ...state,
        parentOrg: payload
      };
    },
    getProjectType(state, { payload }) {
      return {
        ...state,
        projectType: payload
      };
    },
    getProjectName(state, { payload }) {
      return {
        ...state,
        projectName: payload
      };
    },
  }
};
