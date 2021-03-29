<template>
  <div class="container">
    <Header class="header" />
    <Logs class="logs" />
    <Navigation class="navigation" />
    <Content class="content" />
    <Stats class="stats" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header'
import Logs from './components/Logs'
import Navigation from './components/Navigation'
import Content from './components/Content'
import Stats from './components/Stats'

import { IdentRequest } from './command/v1/Ident'
import { VersionRequest } from './command/v1/Version'

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
  async onSerialOpen() {
    console.log((await this.$serial.query(new IdentRequest())).toString())
    console.log((await this.$serial.query(new VersionRequest())).toString())
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
