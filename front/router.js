import Vue from "vue";
import Router from "vue-router";
// components
import login from './page/login.vue';
import docsIndex from './page/docs/index.vue';
import doc from './page/docs/doc.vue';
import frameworkAndLibrary from './page/framework-and-library.vue';
import blog from './page/blog.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/docs/index' }, // root
    { path: '/login', name: 'login', component: login },
    { path: '/docs/index', name: 'docs-index', component: docsIndex },
    { path: '/docs/doc/:docName', name: 'doc', component: doc },
    { path: '/framework-and-library', name: 'framework-and-library', component: frameworkAndLibrary },
    { path: '/blog', name: 'blog', component: blog },
  ]
});

router.beforeEach((to, from, next) => {
  console.log('>>> to, from', to, from);
  const verified = Boolean(localStorage.getItem('verified'));
  if(!verified){
  	if(to.path !== '/login'){
	  	next('/login');
	  }else next();
  }else next();
  // next();
});

module.exports = router;
