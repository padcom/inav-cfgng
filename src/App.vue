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
import semver from 'semver'

import Header from './components/Header'
import Logs from './components/Logs'
import Navigation from './components/Navigation'
import Content from './components/Content'
import Stats from './components/Stats'

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
  async mounted () {
    const info = await this.$ipc.query('system.properties')
    this.$log.info(`Running OS: ${info.os.type} ${info.os.version}, Chrome: ${info.versions.chrome}, Electron: ${info.versions.electron}`)
  },
  async onSerialOpen(port) {
    this.$log.info(`Serial port ${port} successfully opened`)
    this.$serial.resetProtocolToMSPv1()
    await this.readMSPVersionInformation()
    await this.readFcInformation()
    await this.readFirmwareBuildInformation()
    await this.readBoardInformation()
    await this.readDeviceIdInformatin()
  },
  async onSerialClose(port) {
    this.$log.info(`Serial port ${port} successfully closed`)
  },
  methods: {
    async readMSPVersionInformation() {
      const version = await this.$serial.query(new VersionRequest())
      this.$log.info(`MultiWii API version received - ${version.api}`)
      if (semver.gte(version.api, '2.0.0')) {
        this.$log.info('MultiWii protocol >= 2.0.0 - switching to MSPv2')
        this.$serial.upgradeProtocolToMSPv2()
      }
    },
    async readFcInformation() {
      const fcVersion = await this.$serial.query(new FcVersionRequest())
      const fcVariant = await this.$serial.query(new FcVariantRequest())
      this.$log.info(`Flight controller info, identifier: ${fcVariant.variant}, version: ${fcVersion.version}`)
    },
    async readFirmwareBuildInformation() {
      const buildInfo = await this.$serial.query(new BuildInfoRequest())
      this.$log.info(`Running firmware released on: ${buildInfo.date} ${buildInfo.time}`)
    },
    async readBoardInformation() {
      const boardInfo = await this.$serial.query(new BoardInfoRequest())
      this.$log.info(`Board: ${boardInfo.identifier}, version: ${boardInfo.version}`)
    },
    async readDeviceIdInformatin() {
      const uid = await this.$serial.query(new UidRequest())
      this.$log.info(`Unique device ID received - 0x${hex(uid.uid[0], 8, '')}${hex(uid.uid[1], 8, '')}${hex(uid.uid[2], 8, '')}`)
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
