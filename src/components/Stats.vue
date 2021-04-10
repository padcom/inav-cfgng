<template>
  <div class="stats">
    <div v-if="status.isPortOpen" class="item">Port: {{ status.serialPortPath }}</div>
    <div v-if="status.isPortOpen" class="item">Buffer size: {{ bufferSize }}</div>
    <div v-if="status.isPortReady" class="item">Cycle time: {{ status.cycleTime }}us</div>
    <div v-if="status.isPortReady" class="item">i2c errors: {{ status.i2cError }}</div>
    <div v-if="status.isPortReady" class="item">Modes flag: {{ status.modes }}</div>
    <div v-if="status.isPortReady" class="item">Profile: {{ status.profile }}</div>
    <div v-if="status.isPortReady" class="item">CPU Load: {{ status.cpuLoad }}</div>
    <div v-if="status.isPortReady" class="item">Arming flags: {{ status.armingFlags }}</div>
    <div class="configurator-version">{{ version }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { version } from '../../package.json'

import { StatusExRequest } from '../command/v1/StatusEx'

export default defineComponent({
  name: 'Stats',
  data() {
    return {
      queueSize: 0,
      bufferSize: 0,
      status: {
        isPortOpen: false,
        isPortReady: false,
        cycleTime: null,
        i2cError: null,
        activeSensorsFlag: null,
        activeSensors: null,
        modes: null,
        profile: null,
        cpuLoad: null,
        armingFlags: null,
        arming: null,
      }
    }
  },
  computed: {
    sensors() {
      if (!this.status) return ''

      const SENSORS = [
        'Accelerometer',
        'Barometer',
        'Magnetometer',
        'Gps',
        'Range Finder',
        'Optical Flow',
        'Pitot Tube',
        'Temperature Sensor',
      ]

      const sensorNameToFieldName = sensor => {
        sensor = sensor.replace(' ', '')
        sensor = sensor[0].toLowerCase() + sensor.substring(1)
        return sensor
      }

      return SENSORS.map(sensor => ({
        sensor,
        status: this.status.activeSensors[sensorNameToFieldName(sensor)]
      }))
    },
    version() {
      return version
    }
  },
  mounted() {
    this.statusTaskId = this.$scheduler.enqueue(20, new StatusExRequest(), async response => {
      this.status.cycleTime = response.cycleTime
      this.status.i2cError = response.i2cError
      this.status.activeSensorsFlag = response.activeSensorsFlag
      this.status.activeSensors = response.activeSensors
      this.status.modes = response.modes
      this.status.profile = response.profile
      this.status.cpuLoad = response.cpuLoad
      this.status.armingFlags = response.armingFlags
      this.status.arming = response.arming
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.statusTaskId)
  },
  onSerialOpen() {
    this.status.isPortOpen = true
  },
  onSerialReady() {
    this.status.isPortReady = true
  },
  onSerialClose() {
    this.status.isPortOpen = false
    this.status.isPortReady = false
  },
  onSerialBuffer(buffer) {
    this.bufferSize = buffer.byteLength
  }
})
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  font-size: var(--default-font-size);
}
.item {
  padding: 2px 4px;
  margin-right: 2px;
  border: solid 1px gray;
}
.error {
  color: red;
}
.configurator-version {
  align-self: center;
  margin-left: auto;
  margin-right: 8px;
}
</style>
