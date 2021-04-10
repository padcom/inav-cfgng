<template>
  <Panel class="sensor-status">
    <SensorStatusItem name="gyro" label="Gyro" :status="sensors.gyroscope" />
    <SensorStatusItem name="acc" label="Accel" :status="sensors.accelerometer" />
    <SensorStatusItem name="mag" label="Mag" :status="sensors.magnetometer" />
    <SensorStatusItem name="baro" label="Baro" :status="sensors.barometer" />
    <SensorStatusItem name="sat" label="GPS" :status="sensors.gps" />
    <SensorStatusItem name="flow" label="flow" :status="sensors.opflow" />
    <SensorStatusItem name="sonar" label="Sonar" :status="sensors.rangefinder" />
    <SensorStatusItem name="airspeed" label="Speed" :status="sensors.pitot" />
  </Panel>
</template>

<script>
import { defineComponent } from 'vue'

import Panel from './Panel.vue'
import SensorStatusItem from './SensorStatusItem.vue'

import { SensorStatusRequest } from '../../command/v1/SensorStatus'

export default defineComponent({
  components: {
    Panel,
    SensorStatusItem,
  },
  data() {
    return {
      sensors: {
        accelerometer: 0,
        magnetometer: 0,
        barometer: 0,
        gps: 0,
        opflow: 0,
        rangefinder: 0,
        pitot: 0,
      }
    }
  },
  async mounted() {
    this.sensorStatusTaskId = this.$scheduler.enqueue(100, new SensorStatusRequest(), response => {
      this.sensors.gyroscope = response.gyroscope
      this.sensors.accelerometer = response.accelerometer
      this.sensors.barometer = response.barometer
      this.sensors.gps = response.gps
      this.sensors.magnetometer = response.magnetometer
      this.sensors.pitot = response.pitot
      this.sensors.rangefinder = response.rangefinder
      this.sensors.opflow = response.opflow
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.sensorStatusTaskId)
  }
})
</script>
