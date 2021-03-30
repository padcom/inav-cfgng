<template>
  <div class="stats">
    <div v-if="isPortReady" class="item">Cycle time: {{ cycleTime }}us</div>
    <div v-if="isPortReady" class="item">i2c errors: {{ i2cError }}</div>
    <div v-if="isPortReady" class="item">Active sensors: {{ activeSensors }}</div>
    <div v-if="isPortReady" class="item">Profile: {{ profile }}</div>
    <div v-if="isPortReady" class="item">CPU Load: {{ cpuLoad }}</div>
    <div v-if="isPortReady" class="item">Arming flags: {{ armingFlags }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { StatusExRequest } from '../command/v1/StatusEx'

export default defineComponent({
  data() {
    return {
      isPortReady: false,
      isStatusUpdating: false,
      cycleTime: null,
      i2cError: null,
      activeSensors: null,
      profile: null,
      cpuLoad: null,
      armingFlags: null
    }
  },
  onSerialReady(port) {
    console.log('SerialPort', port, 'is ready to be used')
    this.isPortReady = true
    this.timer = setInterval(() => { this.updateStats() }, 200)
    this.updateStats()
  },
  onSerialClose() {
    clearInterval(this.timer)
    this.isPortReady = false
    this.cycleTime = null
    this.i2cError = null
    this.activeSensors = null
    this.profile = null
    this.cpuLoad = null
    this.armingFlags = null
  },
  methods: {
    async updateStats() {
      if (this.isStatusUpdating) return
      this.isStatusUpdating = true
      const status = await this.$serial.query(new StatusExRequest())
      this.isStatusUpdating = false

      this.cycleTime = status.cycleTime
      this.i2cError = status.i2cError
      this.activeSensors = status.activeSensors
      this.profile = status.profile
      this.cpuLoad = status.cpuLoad
      this.armingFlags = status.armingFlags
    }
  }
})
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  font-size: 12px;
}
.item {
  padding: 2px 4px;
  margin-right: 2px;
  border: solid 1px gray;
}
</style>
