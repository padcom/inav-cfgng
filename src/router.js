import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import PortsPage from './pages/PortsPage.vue'
import ConfigurationPage from './pages/ConfigurationPage.vue'
import AdvancedTuningPage from './pages/AdvancedTuningPage.vue'
import ReceiverPage from './pages/ReceiverPage.vue'
import ModesPage from './pages/ModesPage.vue'
import AdjustmentsPage from './pages/AdjustmentsPage.vue'
import ProgrammingPage from './pages/ProgrammingPage.vue'
import OsdPage from './pages/OsdPage.vue'
import OutputsPage from './pages/OutputsPage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/ports', component: PortsPage },
    { path: '/configuration', component: ConfigurationPage },
    { path: '/advanced-tuning', component: AdvancedTuningPage },
    { path: '/receiver', component: ReceiverPage },
    { path: '/modes', component: ModesPage },
    { path: '/adjustments', component: AdjustmentsPage },
    { path: '/programming', component: ProgrammingPage },
    { path: '/osd', component: OsdPage },
    { path: '/outputs', component: OutputsPage },
  ]
})
