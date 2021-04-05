import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import PortsPage from './pages/PortsPage.vue'
import ConfigurationPage from './pages/ConfigurationPage.vue'
import AdvancedTuningPage from './pages/AdvancedTuningPage.vue'
import ReceiverPage from './pages/ReceiverPage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/ports', component: PortsPage },
    { path: '/configuration', component: ConfigurationPage },
    { path: '/advanced-tuning', component: AdvancedTuningPage },
    { path: '/receiver', component: ReceiverPage },
  ]
})
