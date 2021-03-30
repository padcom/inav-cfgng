import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import SerialConfigurationPage from './pages/SerialConfigurationPage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/serial-configuration', component: SerialConfigurationPage }
  ]
})
