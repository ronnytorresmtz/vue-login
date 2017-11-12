import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '*',
      component: Login,
    },
  ],
});
