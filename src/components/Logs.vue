<template>
  <div ref="logs" class="logs">
    <div v-for="log in logs" class="log">
      <div class="timestamp">{{ log.timestamp }}</div>
      <div class="level">{{ log.level }}</div>
      <div class="source">[<strong>{{ log.source }}</strong>]</div>
      <div class="message">{{ log.message }}</div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import { defineComponent } from 'vue'
import { Logger } from '../logger'

export default defineComponent({
  data() {
    return {
      logs: []
    }
  },
  created() {
    Logger.events.on('trace', ({ source, args }) => {
      this.logs.push({ timestamp: format(new Date(), 'HH:mm:ss'), level: 'TRACE', source, message: args.map(arg => arg.toString()).join(' ') })
    })
    Logger.events.on('debug', ({ source, args }) => {
      this.logs.push({ timestamp: format(new Date(), 'HH:mm:ss'), level: 'DEBUG', source, message: args.map(arg => arg.toString()).join(' ') })
    })
    Logger.events.on('info', ({ source, args }) => {
      this.logs.push({ timestamp: format(new Date(), 'HH:mm:ss'), level: 'INFO', source, message: args.map(arg => arg.toString()).join(' ') })
    })
    Logger.events.on('warn', ({ source, args }) => {
      this.logs.push({ timestamp: format(new Date(), 'HH:mm:ss'), level: 'WARN', source, message: args.map(arg => arg.toString()).join(' ') })
    })
    Logger.events.on('error', ({ source, args }) => {
      this.logs.push({ timestamp: format(new Date(), 'HH:mm:ss'), level: 'ERROR', source, message: args.map(arg => arg.toString()).join(' ') })
    })
  },
  mounted() {
    Logger.events.on('*', () => {
      this.$nextTick(() => {
        if (this.$refs.logs) {
          this.$refs.logs.scrollTop = Number.MAX_SAFE_INTEGER
        }
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.logs {
  overflow-x: auto;
  overflow-y: scroll;
}
.log {
  display: flex;
  margin: 2px 0;
  font-size: 12px;
}
.timestamp {
  width: 50px;
}
.source {
  padding-left: 4px;
}
.level {
  padding-left: 4px;
}
.message {
  padding-left: 4px;
}
</style>
