import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './pages/HomePage'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage }
  ]
})
