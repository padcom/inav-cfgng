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
import semver from 'semver'

import Header from './components/Header.vue'
import Logs from './components/Logs.vue'
import Navigation from './components/Navigation.vue'
import Content from './components/Content.vue'
import Stats from './components/Stats.vue'

import { hex } from './utils'

import { VersionRequest } from './command/v1/Version'
import { FcVersionRequest } from './command/v1/FcVersion'
import { FcVariantRequest } from './command/v1/FcVariant'
import { BuildInfoRequest } from './command/v1/BuildInfo'
import { BoardInfoRequest } from './command/v1/BoardInfo'
import { UidRequest } from './command/v1/Uid'

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
  async onSerialOpen(port) {
    this.$log.info(`Serial port ${port} <span class="success">successfully</span> opened`)
    this.$serial.resetProtocolToMSPv1()
    await this.readMSPVersionInformation()
    await this.readFcInformation()
    await this.readFirmwareBuildInformation()
    await this.readBoardInformation()
    await this.readDeviceIdInformatin()
    this.$serial.emit('ready', port)
  },
  async onSerialClose(port) {
    this.$log.info(`Serial port ${port} <span class="success">successfully</span> closed`)
    this.$router.replace({ path: '/' })
  },
  methods: {
    async readMSPVersionInformation() {
      const version = await this.$serial.query(new VersionRequest())
      this.$log.info(`MultiWii API version <span class="success">received</span> - ${version.api}`)
      if (semver.gte(version.api, '2.0.0')) {
        this.$log.info('MultiWii protocol >= 2.0.0 - switching to MSPv2')
        this.$serial.upgradeProtocolToMSPv2()
      }
    },
    async readFcInformation() {
      const fcVersion = await this.$serial.query(new FcVersionRequest())
      const fcVariant = await this.$serial.query(new FcVariantRequest())
      this.$log.info(`Flight controller info, identifier: <strong>${fcVariant.variant}</strong>, version: <strong>${fcVersion.version}</strong>`)
    },
    async readFirmwareBuildInformation() {
      const buildInfo = await this.$serial.query(new BuildInfoRequest())
      this.$log.info(`Running firmware released on: <strong>${buildInfo.date} ${buildInfo.time}</strong>`)
    },
    async readBoardInformation() {
      const boardInfo = await this.$serial.query(new BoardInfoRequest())
      this.$log.info(`Board: <strong>${boardInfo.identifier}</strong>, version: <strong>${boardInfo.version}</strong>`)
    },
    async readDeviceIdInformatin() {
      const uid = await this.$serial.query(new UidRequest())
      this.$log.info(`Unique device ID <span class="success">received</span> - <strong>0x${hex(uid.uid[0], 8, '')}${hex(uid.uid[1], 8, '')}${hex(uid.uid[2], 8, '')}</strong>`)
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
