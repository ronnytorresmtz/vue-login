/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';
import login from '../store/Login/Store';
// import Axios from 'axios';

Vue.use(Vuex);
// Vue.prototype.$http = Axios;

const store = new Vuex.Store({
  modules: {
    login,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
});

export default store;
