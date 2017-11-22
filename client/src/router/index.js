import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Auth from '../lib/Auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: 'auth',
    },
    {
      path: '*',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === undefined) {
    Auth.destroyToken();
    next('/Login');
  }
  if (to.meta === 'auth') {
    if (!Auth.isAuthenticated()) {
      next('/Login');
    }
  }
  next();
});

export default router;
