<template>
  <div class="container">
    <Header class="header" />
    <Logs class="logs" />
    <Navigation class="navigation" />
    <Content class="content">
      <router-view />
    </Content>
    <Stats class="stats" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Header from './components/Header.vue'
import Logs from './components/Logs.vue'
import Navigation from './components/Navigation.vue'
import Content from './components/Content.vue'
import Stats from './components/Stats.vue'

export default defineComponent({
  components: {
    Header,
    Logs,
    Navigation,
    Content,
    Stats
  },
  async created() {
    this.$router.replace({ path: '/' })
  },
  async mounted () {
    const info = await this.$ipc.query('system.properties')
    this.$log.info(`Running OS: <strong>${info.os.type} ${info.os.version}</strong>, Chrome: <strong>${info.versions.chrome}</strong>, Electron: <strong>${info.versions.electron}</strong>`)
  },
  async onSerialClose() {
    this.$router.push('/')
  },
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
  grid-template-rows: 100px minmax(12px, 120px) 1fr 24px;
}

.header {
  grid-area: header;
  background-color: #383A39;
}

.logs {
  grid-area: logs;
}

.navigation {
  grid-area: navigation;
  border-right: solid 4px var(--color-info);
}

.content {
  grid-area: content;
  height: 1fr;
  background-color: #f8f8f8;
  padding: 16px 24px;
}

.stats {
  grid-area: stats;
  padding-top: 2px;
  padding-left: 2px;
  border-top: solid 1px black;
  margin-bottom: 2px;
}
</style>
