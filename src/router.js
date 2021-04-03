import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import PortsPage from './pages/PortsPage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/ports', component: PortsPage }
  ]
})
