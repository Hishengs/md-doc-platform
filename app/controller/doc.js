const fs = require('fs'), path = require('path');
// const docsDir = path.join(process.cwd(), '/app/static/docs');
const NodeGit = require('nodegit');
const findIndex = require('lodash/findIndex');

const docsDirMap = {
  docs: path.join(process.cwd(), '/app/static/docs'),
  blogs: path.join(process.cwd(), '/app/static/blogs'),
};

function getDocJSON(path){
  return JSON.parse(fs.readFileSync(path));
}

module.exports = (app) => {

  class DocController extends app.Controller {

    async index() {
      this.ctx.send('this is doc');
    }

    // 获取所有的文档
    // async getDocs (){
    //   const docNames = fs.readdirSync(docsDir);
    //   // 依次读取文档下的配置文件
    //   const docs = docNames.map(docName => {
    //     const config = require(path.join(docsDir, docName + '/doc-config.json'));
    //     return config;
    //   });
    //   this.ctx.done(docs);
    // }

    // 创建新的文档
    // async create (){
    //   const newDoc = this.ctx.request.body.newDoc;
    //   const docDir = path.join(docsDir, '/' + newDoc.name);
    //   if(fs.existsSync(docDir)){
    //     this.ctx.doneWithError('已存在同名文档');
    //   }else {
    //     try {
    //       // 创建文档目录
    //       fs.mkdirSync(docDir);
    //       // 创建文档配置文件
    //       fs.writeFileSync(path.join(docDir, '/doc-config.json'), JSON.stringify(newDoc, null, 2), { encoding: 'utf-8' });
    //       this.ctx.done('创建成功');
    //     }catch (e){
    //       this.ctx.doneWithError(e.toString());
    //     }
    //   }
    // }

    // 获取特定文档页面
    // async getMarkdownContent (){
    //   try {
    //     const filePath = this.ctx.request.body.filePath;
    //     const mdContent = fs.readFileSync(path.join(docsDir, filePath), { encoding: 'utf-8' });
    //     this.ctx.done(mdContent);
    //   }catch (e){
    //     this.ctx.doneWithError(e.toString());
    //   }
    // }

    // 创建文档
    async create (){
      try {
        const doc = this.ctx.request.body.doc;
        if(!doc){
          this.ctx.doneWithError('无效参数');
          return;
        }
        // 获取已存在的文档记录
        const docsDir = docsDirMap[this.ctx.request.query.category || 'docs'];
        const docs = getDocJSON(path.join(docsDir, 'docs.json'));
        const objIndex = findIndex(docs, { name: doc.name });
        if(objIndex === -1){
          // 尝试 clone 文档仓库
          const repo = await NodeGit.Clone(doc.gitUrl, path.resolve(docsDir, doc.name));
          // 保存到文档记录
          docs.push(doc);
          fs.writeFileSync(path.join(docsDir, 'docs.json'), JSON.stringify(docs, null, 2), { encode: 'utf-8' });
          this.ctx.done('创建成功');
        }else this.ctx.doneWithError('已存在同名文档');
      }catch (e){
        this.ctx.doneWithError(e.stack);
      }
    }

    // 获取所有文档
    async getDocs (){
      const docsDir = docsDirMap[this.ctx.request.query.category || 'docs'];
      const docs = JSON.parse(fs.readFileSync(path.join(docsDir, 'docs.json')));
      this.ctx.done(docs);
    }

    // 更新文档信息
    async updateDoc (){
      try {
        const doc = this.ctx.request.body.doc;
        if(!doc){
          this.ctx.doneWithError('无效参数');
          return;
        }
        // 添加到记录文件
        const docsDir = docsDirMap[this.ctx.request.query.category || 'docs'];
        const docs = getDocJSON(path.join(docsDir, 'docs.json'));
        const objIndex = findIndex(docs, { name: doc.name });
        if(objIndex !== -1){
          const objDoc = docs[objIndex];
          // 如果 git url 有变化
          if(objDoc.gitUrl.trim() !== doc.gitUrl.trim()){
            const { exec } = require('child_process');
            await new Promise((resolve, reject) => {
            exec(`git remote set-url origin ${doc.gitUrl.trim()}`, {
                cwd: path.join(docsDir, objDoc.name)
              }, (err, stdout, stderr) => {
                if(err){
                  reject(err.stack);
                }else resolve();
              });
            });
          }
          docs[objIndex] = doc;
          fs.writeFileSync(path.join(docsDir, 'docs.json'), JSON.stringify(docs, null, 2), { encode: 'utf-8' });
          this.ctx.done('更新成功');
        }else this.ctx.doneWithError('查找不到文档记录');
      }catch (e){
        this.ctx.doneWithError(e.stack);
      }
    }

    // 从 git 更新文档
    async updateDocFromGit (){
      try {
        const { doc,/* username, password*/ } = this.ctx.request.body;
        // console.log('==== updateDocFromGit =====', doc, username, password);
        // this.ctx.doneWithError('无效参数');return;
        if(!doc/* || !username || !password*/){
          this.ctx.doneWithError('无效参数');
          return;
        }
        // 添加到记录文件
        const docsDir = docsDirMap[this.ctx.request.query.category || 'docs'];
        const docs = getDocJSON(path.join(docsDir, 'docs.json'));
        const objIndex = findIndex(docs, { name: doc.name });
        if(objIndex !== -1){
          const objDoc = docs[objIndex];
          // git pull
          // 方法一： 没用
          /*const repo = await NodeGit.Repository.open(path.join(docsDir, doc.name));
          const remote = await repo.getRemote('origin');
          const result = await repo.fetch('origin', {
            credentials: function(url, userName){
              return NodeGit.Cred.sshKeyFromAgent(userName);
            }
          });
          console.log('==== updateDocFromGit =====', result);*/
          // 方法二： exec
          const { exec } = require('child_process');
          await new Promise((resolve, reject) => {
            exec('git pull origin master', {
              cwd: path.join(docsDir, objDoc.name)
            }, (err, stdout, stderr) => {
              if(err){
                reject(err.stack);
              }else resolve();
            });
          });
          this.ctx.done('更新成功');
        }else this.ctx.doneWithError('查找不到文档记录');
      }catch (e){
        this.ctx.doneWithError(e.stack);
      }
    }

  }

  return DocController;
};
