import {allMenu, addOrUpdateMenu, delMenus} from '../services/sys-api';
import { message } from 'antd/lib/index';

export default{
  namespace:'menu',
  state:{
    menus:[],
  },
  effects:{
    *findAllMenu(_, {call, put}){
      const response = yield call(allMenu);
      yield put({
        type: 'saveMenus',
        payload: response.data,
      });
    },
    *save({ payload }, {call, put, select}) {
      const response = yield call(addOrUpdateMenu, payload);

      const menus = yield select(state => state.menu.menus);

      message.success('保存完成');

      if (payload.id) { // 更新
        const newMenus = menus.map(menu => {
          if (menu.id === payload.id) {
            return response.data;
          }
          return menu;
        });

        yield put({
          type: 'saveMenus',
          payload: [...newMenus],
        });
      }
      else {  // 新增
        yield put({
          type: 'saveMenus',
          payload: [...menus, response.data],
        });
      }
    },
    *delMenus({ payload: ids }, { call, put, select }) {
      // 删除菜单
      const response = yield call(delMenus, ids);
      console.log('删除菜单响应结果：', response);

      if (response.code === 200) {
        const menus = yield select(state => state.menu.menus);
        const newMenus = menus.filter(menu => {
          return ids.indexOf(menu.id) === -1;
        });

        message.success('删除完成');

        yield put({
          type: 'saveMenus',
          payload: [...newMenus],
        });
      }
      else {
        message.error('删除失败');
      }


    },
  },
  reducers:{
    saveMenus(state, action){
      return {
        ...state,
        menus: action.payload,
      }
    },
  },
}
