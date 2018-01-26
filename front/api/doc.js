import { http, urlPrefix } from './config';

module.exports = {
	// 获取文档列表
  getList() {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 获取文档列表');
      http.get(urlPrefix + '/docs').then(resolve).catch(reject);
    });
  },
  // 创建文档
  create(doc) {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 创建文档');
      http.put(urlPrefix + '/docs', {
      	doc,
      }).then(resolve).catch(reject);
    });
  },
  // 更新文档
  update(doc) {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 更新文档');
      http.post(urlPrefix + '/docs', {
        doc,
      }).then(resolve).catch(reject);
    });
  },
  // 从 git 更新文档
  updateFromGit(doc) {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 从 git 更新文档');
      http.post(urlPrefix + '/docs/git-sync', {
        doc,
      }).then(resolve).catch(reject);
    });
  },
  // 获取 markdown 文件内容
  getMarkdown(filePath) {
    return new Promise((resolve, reject) => {
      console.log('>>> [api.postData] 获取 markdown 文件内容');
      http.post(urlPrefix + '/docs/get-markdown', {
      	filePath,
      }).then(resolve).catch(reject);
    });
  },
};