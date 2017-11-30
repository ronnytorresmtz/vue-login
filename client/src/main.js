import Vue from 'vue';
import Axios from 'axios';
import App from './App';
import router from './router';
import store from './store/Store';
import Auth from './lib/Auth';

require('es6-promise').polyfill();

Vue.config.productionTip = false;

Axios.interceptors.request.use((config) => {
  const request = config;
  // if the url contains gravatar does not add the access_token
  if (Auth.getToken() !== null && (config.url).search('gravatar') === -1) {
    request.headers.authorization = Auth.getAuthHeader();
  }
  return request;
}, error => console.log(error));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
});
