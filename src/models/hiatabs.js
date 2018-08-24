import { routerRedux } from 'dva/router';

export default {
  namespace: 'hiatabs',

  state: {

  },

  effects: {
    *redirect({ payload }, { put }) {
      yield put(routerRedux.push(payload.path));
    },
  },

  reducers: {

  }
};
