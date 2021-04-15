<template>
  <div ref="logs" class="logs">
    <div v-for="log in logs" class="log">
      <div class="timestamp">{{ log.timestamp }}</div>
      <div class="level">{{ log.level }}</div>
      <div class="source">[<strong>{{ log.source }}</strong>]</div>
      <div class="message" v-html="log.message"></div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import { defineComponent } from 'vue'

import { Logger } from '../logger'

export default defineComponent({
  name: 'Logs',
  data() {
    return {
      logs: []
    }
  },
  created() {
    const log = level => ({ source, args }) => {
      this.logs.push({
        timestamp: format(new Date(), 'HH:mm:ss'),
        level,
        source,
        message: args.map(arg => (arg || '').toString()).join(' ')
      })
    }

    Logger.events.on('trace', log('TRACE'))
    Logger.events.on('debug', log('DEBUG'))
    Logger.events.on('info', log('INFO'))
    Logger.events.on('warn', log('WARN'))
    Logger.events.on('err', log('ERROR'))
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
  background-color: #232323;
  overflow-x: auto;
  overflow-y: scroll;
  color: #989898;
  box-shadow: inset 0 0 15px #000000;
}
.log {
  display: flex;
  margin: 2px 0;
  font-size: var(--default-font-size);
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

  &:deep(.success) {
    color: var(--color-info);
  }
}
</style>
