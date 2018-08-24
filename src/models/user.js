import { routerRedux } from 'dva/router';
import { queryCurrent } from '../services/user';
import { allMenu } from '../services/sys-api';
import { reloadAuthorized } from '../utils/Authorized';
import { VHArray } from '../utils/utils';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    userMenus: [],
  },

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      const token = localStorage.getItem('token');
      // console.log('token ---', token);
      const response = yield call(queryCurrent, token);
      // console.log('获取当前用户信息 ---', response);

      if (response.code === 200) {
        // 20180706获取用户菜单
        const menuResponse = yield call(allMenu);
        const userMenus = VHArray.treeFormat(menuResponse.data, 'parentId');

        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });

        yield put({
          type: 'saveUserMenus',
          payload: userMenus,
        });
      }
      else {
        console.error('获取当前用户信息失败, ', response);
        // 20180706查询用户信息失败，转到登录页面
        reloadAuthorized();
        if(payload && payload.pathsearch){
          if(payload.pathsearch.indexOf('token') == -1){
            yield put(routerRedux.push('/user/login'));
          }
        }else{
          yield put(routerRedux.push('/user/login'));
        }
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveUserMenus(state, action) {
      return {
        ...state,
        userMenus: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
