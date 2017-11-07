module.exports = app => {
	app.router.get('/', 'home.index');

	app.router.get('/manage', 'home.manage');

	app.router.post('/doc/list', 'home.getDocList');

	app.router.get(/^docs\/?.*/, async function(){
		this.ctx.redirect('/static/docs');
	});
};