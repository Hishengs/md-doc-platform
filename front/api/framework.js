import { http, urlPrefix } from './config';

module.exports = {
	// 获取框架列表
  getList() {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 获取框架列表');
      http.post(urlPrefix + '/framework/list').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};