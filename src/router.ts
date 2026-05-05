import { createRouter, createWebHashHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import CreditsView from './views/CreditsView.vue';
import PrototypeView from './views/PrototypeView.vue';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'prototype',
      component: PrototypeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/credits',
      name: 'credits',
      component: CreditsView,
    },
  ],
});
