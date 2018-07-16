import {
  queryRoles,
  saveRole,
  delRoles,
  allMenu,
  queryRole,
  queryAllUser,
  saveUser,
  queryUser,
  delUsers,
} from '../services/sys-api';
import { message } from 'antd/lib/index';

export default {
  namespace: 'sysUser',

  state: {
    roleList: [],
    menuList: [],
    userList: [],

    pagination: { // 表格翻页设置
      total: 0, // 表格数据总数量
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },

  effects: {
    /**
     * 角色管理初始化数据
     * @param _
     * @param call
     * @param put
     * @returns {IterableIterator<*>}
     */
    *initData(_, { call, put }) {
      // 角色
      const responseRole = yield call(queryRoles);
      yield put({
        type: 'setRoleList',
        payload: responseRole.data,
      });

      // 菜单
      const responseMenu = yield call(allMenu);
      yield put({
        type: 'setMenuList',
        payload: responseMenu.data,
      });
    },
    /**
     * 查询角色
     * @param _
     * @param call
     * @param put
     * @returns {IterableIterator<*>}
     */
    *fetchRoles(_, { call, put }) {
      const response = yield call(queryRoles);
      yield put({
        type: 'setRoleList',
        payload: response.data,
      });
    },

    /**
     * 查询指定角色信息（包括菜单ID：menuIds）
     * @param payload
     * @param call
     * @param put
     * @param select
     * @returns {IterableIterator<*>}
     */
    *queryRole({ payload, callback }, { call }) {
      const menuKeysRes = yield call(queryRole, payload);
      if (menuKeysRes.code === 200 || menuKeysRes.status === 'ok') {
        callback(menuKeysRes.data);
      }
    },

    /**
     * 保存（新增/修改） 角色
     * @param payload <Object>要添加的角色信息
     * @param call
     * @param put
     * @param select
     * @returns {IterableIterator<*>}
     */
    *saveRole({ payload }, {call, put, select}) {
      const response = yield call(saveRole, payload);

      const roleList = yield select(state => state.sysUser.roleList);
      if (response.code === 200 || response.status === 'ok') {
        message.success('保存成功');

        if (payload.id) { // 修改角色信息
          yield put({
            type: 'setRoleList',
            payload: roleList.map(role => {
              if (role.id === response.data.id) {
                return response.data;
              }
              else {
                return role;
              }
            }),
          });
        }
        else {  // 新增角色信息
          yield put({
            type: 'setRoleList',
            payload: [...roleList, response.data],
          });
        }

      }
      else {
        message.error('保存失败，请联系管理员');
      }
    },

    /**
     * 删除 角色
     * @param payload <Array> 要删除的角色 id
     * @param call
     * @param put
     * @param select
     * @returns {IterableIterator<*>}
     */
    *delRoles({ payload }, { call, put, select }) {
      const delRes = yield call(delRoles, payload);

      if (delRes.code === 200 || delRes.status === 'ok') {
        const roleList = yield select(state => state.sysUser.roleList);

        yield put({
          type: 'setRoleList',
          payload: roleList.filter(item => {
            return payload.indexOf(item.id) === -1;
          }),
        });

        message.success('删除成功');
      } else {
        message.error('删除存在问题，请联系管理员');
      }
    },

    /**
     * 查询所有用户
     * @param _
     * @param call
     * @param put
     * @returns {IterableIterator<*>}
     */
    *fetchUsers(_, { call, put }) {
      const response = yield call(queryAllUser);
      yield put({
        type: 'setUserList',
        payload: response,
      });
    },
    /**
     *
     * @param payload
     * @param callback
     * @param call
     * @returns {IterableIterator<*>}
     */
    *queryUser({ payload, callback }, { call }) {
      const response = yield call(queryUser, payload);
      if (response.code === 200 || response.status === 'ok') {
        if (callback) {
          callback(response.data);
        }
      }
    },

    /**
     * 保存（新增/修改）用户
     * @param payload
     * @param call
     * @param put
     * @param select
     * @returns {IterableIterator<*>}
     */
    *saveUser({ payload, callback }, { call, put, select }) {
      const response = yield call(saveUser, payload);
      // console.log('=============', response);

      if (response.code === 200) {
        const userList = yield select(state => state.sysUser.userList);
        if (payload.id) { // 修改
          const newUserList = userList.map(user => {
            if(user.id === payload.id) {
              return response.data;
            }
            return user;
          });
          yield put({
            type: 'setUserList',
            payload: newUserList,
          });
          message.success('修改用户信息保存完成！')
        }
        else {  // 新增
          yield put({
            type: 'setUserList',
            payload: [...userList, response.data],
          });
          message.success('新增用户信息保存完成！')
        }
        if (callback) {
          callback();
        };
      }
      else {
        message.error(`保存用户信息失败！`);
      }
    },

    /**
     * 删除用户信息
     * @param payload | Array : 删除用户的ID
     * @param call
     * @param put
     * @param select
     * @returns {IterableIterator<*>}
     */
    *delUsers({ payload }, { call, put, select }) {
      const delUserResponse = yield call(delUsers, payload);
      if (delUserResponse.code === 200 || delUserResponse.state === 'ok') {
        const userList = yield select(state => state.sysUser.userList);
        yield put({
          type: 'setUserList',
          payload: userList.filter(user => {
            return payload.indexOf(user.id) === -1;
          }),
        });
        message.success('删除用户信息完成！')
      }

    },
  },

  reducers: {
    /**
     * 更新角色列表
     * @param state
     * @param action
     * @returns {{roleList: *}}
     */
    setRoleList(state, action) {
      return {
        ...state,
        roleList: action.payload,
      };
    },

    /**
     * 更新菜单列表（state）
     * @param state
     * @param action
     * @returns {{menuList: *}}
     */
    setMenuList(state, action) {
      return {
        ...state,
        menuList: action.payload,
      };
    },


    /**
     * 更新用户信息列表
     * @param state
     * @param action
     * @returns {{userList: *}}
     */
    setUserList(state, action) {
      return {
        ...state,
        userList: action.payload,
      };
    },


  },
};
