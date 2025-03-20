import request from '../utils/request';

export function login(username: string, password: string, role: string) {
    return request.post('/login', { username, password, role });
  }

  export function logout() {
    return request.post('/logout');
  }