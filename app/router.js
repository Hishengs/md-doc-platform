module.exports = app => {
	app.router.get('/', 'home.index');

	app.router.get(/^docs\/?.*/, async function(){
		this.ctx.redirect('/static/docs');
	});
};