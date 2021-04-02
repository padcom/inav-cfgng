import './main.scss'
import './polyfills'

import { Logger, LogLevel } from './logger'
Logger.getLogger('DEFAULT').level = LogLevel.info
// Logger.getLogger('REGISTRY').level = LogLevel.trace
// Logger.getLogger('MSPV1').level = LogLevel.trace
// Logger.getLogger('MSPV2').level = LogLevel.trace
Logger.events.on('warn', ({ source, args }) => { console.warn(`[${source}]`, ...args) })
Logger.events.on('err', ({ source, args }) => { console.error(`[${source}]`, ...args) })

import { Serial } from './Serial'
new Serial().cleanup()

import { createApp } from 'vue'
import App from './App.vue'
import { logger, ipc, serial, taskScheduler } from './plugins'
import { router } from './router'

const app = createApp(App)
  .use(logger)
  .use(ipc)
  .use(serial)
  .use(taskScheduler)
  .use(router)

router.isReady().then(() => app.mount('#app'))
