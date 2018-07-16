// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  console.log(`set token ${token}`);
  return localStorage.setItem('token', token);
}
