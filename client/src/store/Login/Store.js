/* eslint no-param-reassign: ["error", { "props": false }] */
// import Vue from 'vue';
import Axios from 'axios';
import router from '../../router';
import Auth from '../../lib/Auth';
import { storeInLocalStorage } from '../../lib/General';

const store = {
  namespaced: true,
  state: {
    moduleName: 'Login',
    baseUrlServer: 'http://localhost:8000/',
    loading: false,
    showPopUpMessage: false,
    message: {
      id: '',
      type: '',
      text: '',
      show: false,
    },
  },
  mutations: {
    UPDATE_LOADING(state, loading) {
      state.loading = loading;
    },
    SHOW_MESSAGE(state, response) {
      state.message.text = (response.data.message) ? response.data.message : 'The operation was NOT executed as expected, try again or please contact the support service';
      state.message.type = (response.data.error || !response.data.message) ? 'danger' : 'info';
      state.message.show = true;
      state.showPopUpMessage = true;
    },
    SHOW_MESSAGE_ERROR(state, message) {
      state.message.text = message;
      state.message.type = 'danger';
      state.message.show = true;
      state.showPopUpMessage = true;
    },
    CLOSE_MESSAGE(state, close) {
      state.message.show = close;
      state.showPopUpMessage = false;
    },
  },
  actions: {
    checkLogIn(context, data) {
      context.commit('UPDATE_LOADING', true);
      const baseUrl = context.getters.getBaseUrlServer;
      return Axios.post(`${baseUrl}oauth/token`, data)
      .then((response) => {
        if (response.status === 200) {
          Auth.setToken(response.data);
          Auth.setRememberMe(data);
          router.push(data.url);
          storeInLocalStorage('username', data.username);
          context.commit('UPDATE_LOADING', false);
        } else {
          context.commit('SHOW_MESSAGE', response);
          context.commit('UPDATE_LOADING', false);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          context.commit('SHOW_MESSAGE_ERROR', 'Username or password is incorrect');
        } else {
          context.commit('SHOW_MESSAGE_ERROR', error.message);
        }
        context.commit('UPDATE_LOADING', false);
      });
    },
    sendEmail(context, email) {
      const response = { data: { error: true, message: `Pending to CODE the sending mail with a token to reset the username if it exists in the user table: ${email}` } };
      context.commit('SHOW_MESSAGE', response);
      // context.commit('UPDATE_LOADING', true);
      // const baseUrl = context.getters.getBaseUrlServer;
      // return Axios.post(`${baseUrl}login/sendYourPassword`, { email })
      // .then((response) => {
      //   context.commit('SHOW_MESSAGE', response);
      //   context.commit('UPDATE_LOADING', false);
      // })
      // .catch((error) => {
      //   context.commit('SHOW_MESSAGE_ERROR', error.message);
      //   context.commit('UPDATE_LOADING', false);
      // });
    },
    logout(context) {
      Auth.destroyToken();
      router.push('/Login');
      context.commit('UPDATE_LOADING', false);
    },
  },
  getters: {
    getMessage: state => state.message,
    getShowPopUpMessage: state => state.showPopUpMessage,
    getShowMessage: state => state.message.show,
    getLoading: state => state.loading,
    getBaseUrlServer: state => state.baseUrlServer,
  },
};

export default store;
