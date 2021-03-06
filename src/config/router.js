import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  }
]

export default new VueRouter({
  mode: 'history',
  routes
});