import { createApp } from 'vue'
import App from './App'
import './main.scss'
import router from './router'

import { Logger, LogLevel } from './logger'

Logger.events.on('trace', ({ source, args }) => { console.log(`[${source}]`, ...args) })
Logger.events.on('debug', ({ source, args }) => { console.debug(`[${source}]`, ...args) })
Logger.events.on('info', ({ source, args }) => { console.info(`[${source}]`, ...args) })
Logger.events.on('warn', ({ source, args }) => { console.warn(`[${source}]`, ...args) })
Logger.events.on('error', ({ source, args }) => { console.error(`[${source}]`, ...args) })

Logger.getLogger('MSPv1').level = LogLevel.trace
Logger.getLogger('MSPv2').level = LogLevel.trace

const app = createApp(App).use(router)

router.isReady().then(() => app.mount('#app'))
