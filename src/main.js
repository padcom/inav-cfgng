import './main.scss'
import './polyfills'

import { Logger, LogLevel } from './logger'
Logger.getLogger('DEFAULT').level = LogLevel.info
// Logger.getLogger('UTILS').level = LogLevel.trace
// Logger.getLogger('SCHEDULER').level = LogLevel.trace
// Logger.getLogger('REGISTRY').level = LogLevel.trace
// Logger.getLogger('MSPV1').level = LogLevel.trace
// Logger.getLogger('MSPV2').level = LogLevel.trace
Logger.events.on('warn', ({ source, args }) => { console.warn(`[${source}]`, ...args) })
Logger.events.on('err', ({ source, args }) => { console.error(`[${source}]`, ...args) })

import { Serial } from './SerialPort'
new Serial().cleanup()

import { createApp } from 'vue'
import App from './App.vue'
import { logger, ipc, serial, taskScheduler } from './plugins'
import { router } from './router'
import { install as installDirectives } from './directives'

const app = createApp(App)
  .use(logger)
  .use(ipc)
  .use(serial)
  .use(taskScheduler)
  .use(router)

installDirectives(app)

router.isReady().then(() => app.mount('#app'))
