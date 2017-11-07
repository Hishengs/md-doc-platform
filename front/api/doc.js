import { http, urlPrefix } from './config';

module.exports = {
	// 获取文档列表
  getList() {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 获取文档列表');
      http.post(urlPrefix + '/doc/list').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};