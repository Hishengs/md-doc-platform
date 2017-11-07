import Vue from "vue";
import Router from "vue-router";
// components
import doc from './page/doc.vue';
import frameworkAndLibrary from './page/framework-and-library.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/doc' }, // root
    { path: '/doc', name: 'doc', component: doc },
    { path: '/framework-and-library', name: 'framework-and-library', component: frameworkAndLibrary },
  ]
});

router.beforeEach((to, from, next) => {
  console.log('>>> to, from', to, from);
  next();
});

module.exports = router;
