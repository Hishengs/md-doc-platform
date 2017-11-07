module.exports = app => {
	app.router.get('/', 'home.index');

	app.router.get('/manage', 'home.manage');

	app.router.post('/doc/list', 'home.getDocList');

	app.router.post('/blog/list', 'home.getBlogList');

	app.router.post('/framework/list', 'home.getFrameworkList');

	app.router.get(/^docs\/?.*/, async function(){
		this.ctx.redirect('/static/docs');
	});
};