<template>
  <div class="container">
    <Header class="header" />
    <Logs class="logs" />
    <Navigation class="navigation" />
    <Content class="content">
      <button @click="test">Testme</button>
      <button @click="cleanup">Cleanup</button>
    </Content>
    <Stats class="stats" />
  </div>
</template>

<script>
import ipc from './ipc'
import { defineComponent } from 'vue'
import Header from './components/Header'
import Logs from './components/Logs'
import Navigation from './components/Navigation'
import Content from './components/Content'
import Stats from './components/Stats'

import { MSP } from './protocol/MSP'
import { MSPv1 } from './protocol/MSPv1'
import { MSP_IDENT, IdentRequest, IdentResponse } from './command/v1/Ident'

export default defineComponent({
  components: {
    Header,
    Logs,
    Navigation,
    Content,
    Stats
  },
  data() {
    return {
      portExists: false
    }
  },
  mounted() {
    console.log('onMounted...')
    ipc.on('port.exists', this.portExistsHandler)
    ipc.on('port.open', this.portOpenHandler)
    ipc.on('port.close', this.portCloseHandler)
    ipc.on('port.data', this.portDataHandler)
  },
  unmounted() {
    ipc.off('port.exists', this.portExistsHandler)
    ipc.off('port.open', this.portOpenHandler)
    ipc.off('port.close', this.portCloseHandler)
    ipc.off('port.data', this.portDataHandler)
  },
  methods: {
    portOpenHandler(event, port) {
      console.log('port.open', port)
      const protocol = new MSPv1()
      const command = protocol.encode(MSP.DIRECTION_TO_MSC, MSP_IDENT, new IdentRequest())
      console.log('command', command)
      ipc.send('port.write', port, command)
    },

    portCloseHandler(event, port) {
      console.log('port.close', port)
    },

    portDataHandler(event, port, buffer) {
      console.log('port.data', port, buffer)
      const decoded = new MSPv1().decode(buffer)
      console.log('port.data - decoded', port, decoded)
      const response = new IdentResponse(new MSPv1(), buffer)
      console.log('port.data - parsed', response)
      ipc.send('port.close-all')
    },

    portExistsHandler(event, port, exists) {
      console.log('port.exists', port, exists)
      this.portExists = exists
      if (exists) {
        console.log('Opening port', port)
        ipc.send('port.open', port)
      }
    },

    test() {
      ipc.send('port.exists', '/dev/ttyACM0')
    },
    cleanup() {
      ipc.send('port.close-all')
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  font-family: arial verdana;
}

.container {
  height: 100vh;
  display: grid;
  grid-template-areas: 
    "header header"
    "logs logs"
    "navigation content"
    "stats stats";
  grid-template-columns: 280px 1fr;
  grid-template-rows: 100px minmax(12px, 120px) 1fr 48px;
}

.header {
  grid-area: header;
  background-color: red;
}

.logs {
  grid-area: logs;
  background-color: green;
}

.navigation {
  grid-area: navigation;
  background-color: blue;
}

.content {
  grid-area: content;
  height: 1fr;
  background-color: white;
}

.stats {
  grid-area: stats;
  background-color: gray;
}
</style>
