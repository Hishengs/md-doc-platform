const urlPrefix = 'gumi/';

const localPaths = {
	'bootstrap': './libs/bootstrap/bootstrap.min',
	'docute-style': './libs/docute/docute',
	'docute-reset': './libs/docute/reset',
	'docute': './libs/docute/docute',
};

const paths = {
	'bootstrap': '/static/assets/libs/bootstrap/bootstrap.min',
	'docute-style': '/static/assets/libs/docute/docute',
	'docute-reset': '/static/assets/libs/docute/reset',
	'docute': '/static/assets/libs/docute/docute',
};

const isLocal = window.location.href.indexOf('localhost') !== -1;

require.config({
	baseUrl: urlPrefix,
	paths: isLocal ? localPaths : paths,
	map: {
		'*': {
			'css': urlPrefix + 'libs/require-css-0.1.10.min.js',
		}
	},
});

require(['css!bootstrap', 'css!docute-style', 'css!docute-reset', 'docute'], function(bootstrap, docuteStyle, docuteReset, docute){
	console.log('==== done ====', docute);
	const app = docute.init({
    url: urlPrefix,
    sidebar: false,
    tocVisibleDepth: 2,
    nav: [
      { title: '首页', path: '/' },
      { title: '用户', path: '/user' },
      { title: '圈子', path: '/circle' },
      { title: '策略', path: '/strategy' },
      { title: '投资账户', path: '/invest-account' },
      { title: '更新记录', path: '/update' },
    ]
  });
  app.$mount('#app');
});