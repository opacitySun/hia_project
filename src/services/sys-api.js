// import { stringify } from 'qs';
import request from '../utils/request';
//
// export async function queryTitle(params) {
//   return request(`/api/title?${stringify(params)}`);
// }
//

export async function accountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function register(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
//
// export async function queryNotices() {
//   return request('/api/notices');
// }

/* 系统角色管理 API start */
// 查询系统角色
export async function queryRoles() {
  return request('/api/sys/role/query');
}

// 根据 角色ID 查询角色信息（保存对应菜单的ID）
export async function queryRole(roleId) {
  return request(`/api/sys/role/${roleId}`);
}

// 添加系统角色
export async function saveRole(params) {
  return request('/api/sys/role/save', {
    method: 'POST',
    body: params,
  });
}

// 删除系统角色
export async function delRoles(params) {
  return request('/api/sys/role/delete', {
    method: 'POST',
    body: params,
  });
}

/* 系统角色管理  API end  */

/* 系统菜单管理 API start */
// 查询所有菜单
export async function allMenu(){
  return request('/api/sys/menu/all');
}

// 添加/修改菜单
export async function addOrUpdateMenu(params){
  return request('/api/sys/menu/save', {
    method: 'POST',
    body: params,
  });
}

// 删除菜单
export async function delMenus(ids){
  return request('/api/sys/menu/delete', {
    method: 'POST',
    body: ids,
  });
}

/* 系统菜单管理 API  end  */


/* 用户管理 API start */
// 查询用户
export async function queryAllUser(){
  return request('/api/sys/user/all')
}

/**
 * 查询指定用户
 * @param userId
 * @returns {Promise<Object>}
 */
export async function queryUser(userId){
  return request(`/api/sys/user/${userId}`)
}

// 保存用户
export async function saveUser(params){
  return request('/api/sys/user/save', {
    method: 'POST',
    body: params,
  });
}

// 删除用户
export async function delUsers(params){
  return request('/api/sys/user/delete', {
    method: 'POST',
    body: params,
  });
}



/* 用户管理 API  end  */
