import './main.scss'

import { createApp } from 'vue'

import App from './App'
import router from './router'

import { Logger, LogLevel } from './logger'
import { logger, ipc, serial } from './plugins'

import { Serial } from './Serial'

Logger.getLogger('DEFAULT').level = LogLevel.trace

new Serial().cleanup()

const app = createApp(App)
  .use(logger)
  .use(ipc)
  .use(serial)
  .use(router)


router.isReady().then(() => app.mount('#app'))
