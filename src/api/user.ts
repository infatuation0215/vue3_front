import request from '../utils/request';

export function getUserInfo() {
  return request.get('/user/info');
}
