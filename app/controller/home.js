module.exports = (app) => {

  class HomeController extends app.Controller {

    async index() {
      await this.ctx.render('index.html');
    }

  }

  return HomeController;
};