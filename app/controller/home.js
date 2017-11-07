module.exports = (app) => {

  class HomeController extends app.Controller {

    async index() {
      await this.ctx.render('index.html');
    }

    async manage() {
      await this.ctx.render('manage.html');
    }

    // 获取文档列表
    async getDocList (){
    	const fs = require('fs');
    	const path = require('path');
    	const docs = fs.readdirSync(path.join(process.cwd(), '/app/static/docs'));
    	this.ctx.done(docs);
    }

  }

  return HomeController;
};
