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

    // 获取博客列表
    async getBlogList (){
      const fs = require('fs');
      const path = require('path');
      const blogs = fs.readdirSync(path.join(process.cwd(), '/app/static/blogs'));
      this.ctx.done(blogs);
    }

    // 获取框架与库列表
    async getFrameworkList (){
      const fs = require('fs');
      const path = require('path');
      const frameworks = fs.readdirSync(path.join(process.cwd(), '/app/static/framework-and-library'));
      this.ctx.done(frameworks);
    }

  }

  return HomeController;
};
