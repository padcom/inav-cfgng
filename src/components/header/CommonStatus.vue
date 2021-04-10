<template>
  <Panel class="common-status">
    <BatteryIndicator :volts="status.volts" :percentage="status.percentage" />
    <div> ala ma kota</div>
  </Panel>
</template>

<script>
import { defineComponent } from 'vue'

import Panel from './Panel.vue'
import BatteryIndicator from './BatteryIndicator.vue'
import { AnalogRequest } from '../../command//v2/Analog'

export default defineComponent({
  components: {
    Panel,
    BatteryIndicator,
  },
  data() {
    return {
      status: {
        volts: 0,
        percentage: 0,
      }
    }
  },
  mounted() {
    this.betteryStatusTaskId = this.$scheduler.enqueue(100, new AnalogRequest(), response => {
      this.status.volts = response.batteryVoltage
      this.status.percentage = response.calculateBatteryPercentage
    })
  }
})
</script>

<style lang="scss" scoped>
.common-status {
  flex-direction: column;
}
</style>
