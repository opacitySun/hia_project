import { routerRedux } from 'dva/router';
import { goLoginPage } from '../services/sys-api';
import { setAuthority, setToken,removeToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'newlogin',

  state: {
    status: undefined,
  },

  effects: {
    *newlogin({ payload }, { call, put }) {
      yield put({
        type: 'loginReducers',
        payload: {
          token:payload.token,
          currentAuthority: 'admin',
          status: true,
        },
      });
      reloadAuthorized();
      // yield put(routerRedux.push('/'));
    },
    *newlogout(_, { put, select }) {
      yield put({
        type: 'logoutReducers',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(routerRedux.push('/user/login'));
    },
    *goPage(_, { call, put }) {
      const response = yield call(goLoginPage);
      yield put({
        type: 'goPageReducers',
        payload: response
      });
      // yield put({
      //   type: 'goPageReducers',
      //   payload: {
      //     code:200,
      //     message:response.data.path
      //   }
      // });
    },
  },

  reducers: {
    loginReducers(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.token);
      return {
        ...state,
        status: payload.status,
        token: payload.token,
      };
    },
    logoutReducers(state, { payload }) {
      setAuthority(payload.currentAuthority);
      removeToken();
      return {
        ...state,
        status: payload.status,
      };
    },
    goPageReducers(state, { payload }) {
      return {
        ...state,
        pagePath: payload,
      };
    }
  },
};
