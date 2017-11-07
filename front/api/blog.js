import { http, urlPrefix } from './config';

module.exports = {
	// 获取博客列表
  getList() {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 获取博客列表');
      http.post(urlPrefix + '/blog/list').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};