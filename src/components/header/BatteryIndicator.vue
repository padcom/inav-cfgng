<template>
  <div class="battery-indicator">
    <div class="battery-status">
      <ProgressBar :value="percentage" :min="0" :max="100" :showValue="false" color="#54A027" />
    </div>
    <div class="battery-volts">
      {{ volts }} V
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import ProgressBar from '../ProgressBar.vue'

export default defineComponent({
  components: {
    ProgressBar
  },
  props: {
    volts: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
  }
})
</script>

<style lang="scss" scoped>
.battery-indicator {
  display: flex;
  align-items: center;
  height: 40px;
}

.battery-status {
  height: 29px;
  background: url("./cf_icon_bat_grey.svg") no-repeat;
  background-size: contain;
  margin-left: 8px;
}

.progress-bar {
  height: 10px;
  width: 32px;
  margin-top: 10px;
  margin-left: 6px;
  margin-right: 10px;
}

.battery-volts {
  color: #AAA;
  font-size: 11.5px;
  margin-right: 12px;
  margin-top: 1px;
  margin-left: 1px;
}
</style>
