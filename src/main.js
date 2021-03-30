import './main.scss'

import './plyfills'
import './extensions'

import { Logger, LogLevel } from './logger'
Logger.getLogger('DEFAULT').level = LogLevel.info

import { Serial } from './Serial'
new Serial().cleanup()

import { createApp } from 'vue'
import App from './App.vue'
import { logger, ipc, serial } from './plugins'
import { router } from './router'

const app = createApp(App)
  .use(logger)
  .use(ipc)
  .use(serial)
  .use(router)


router.isReady().then(() => app.mount('#app'))
