import Vue from 'vue';
import Axios from 'axios';
import App from './App';
import router from './router';
import store from './store/Store';
import Auth from './lib/Auth';

Vue.config.productionTip = false;

Axios.interceptors.request.use((config) => {
  const request = config;
  if (Auth.getToken() !== null) {
    request.headers.accept = 'application/json, text/plain, */*';
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
