module.exports = app => {
  // app.router.group({
  //   prefix: '/api',
  // }, router => {
    app.router.get('/', 'home.index');
    app.router.get('/manage', 'home.manage');

    app.router.get('/api/docs', 'doc.getDocs');                       // 获取所有文档
    app.router.put('/api/docs', 'doc.create');                        // 创建文档
    app.router.post('/api/docs', 'doc.updateDoc');                    // 更新文档
    app.router.post('/api/docs/git-sync', 'doc.updateDocFromGit');    // 从 git 更新文档
  // });
};