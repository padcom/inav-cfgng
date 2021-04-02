<template>
  <div class="stats">
    <div v-if="status.isPortOpen" class="item">Port: {{ status.serialPortPath }}</div>
    <div v-if="status.isPortReady" class="item">Cycle time: {{ status.cycleTime }}us</div>
    <div v-if="status.isPortReady" class="item">i2c errors: {{ status.i2cError }}</div>
    <div v-if="status.isPortReady" class="item">
      <span v-for="sensor in sensors" :class="{ error: !sensor.status }">
        {{ sensor.sensor }}
        &nbsp;
      </span>
    </div>
    <div v-if="status.isPortReady" class="item">Profile: {{ status.profile }}</div>
    <div v-if="status.isPortReady" class="item">CPU Load: {{ status.cpuLoad }}</div>
    <div v-if="status.isPortReady" class="item">Arming flags: {{ status.armingFlags }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStatus } from '../composables/Status'

export default defineComponent({
  setup() {
    return { status: useStatus() }
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
    }
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
</style>
