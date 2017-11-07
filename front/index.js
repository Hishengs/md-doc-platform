import Vue from 'vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import App from './page/app.vue';
import router from './router.js';
import api from './api';
import config from './config.js';

Vue.use(iview);

window.api = api;
api.install = function(Vue, options){
  Vue.prototype.api = this;
};
Vue.use(api);

config.install = function(Vue, options){
  Vue.prototype.config = this;
};
Vue.use(config);

const eventHub = new Vue();
window.eventHub = eventHub;
eventHub.install = function(Vue, options){
  Vue.prototype.eventHub = this;
};
Vue.use(eventHub);

const app = new Vue({
  el: '#app',
  router,
  render: h => {
    return h(App);
  }
});

window.app = app;