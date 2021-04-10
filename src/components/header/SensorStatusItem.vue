<template>
  <div class="status-item">
    <img class="sensor-icon" :src="statusImg" />
    <div class="name" :class="{ active: active, error: error }">{{ label }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { SENSOR_STATUS } from '../../models/sensor-status'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    label: { type: String, default: () => this.name },
    status: { type: Number, default: 0 },
  },
  computed: {
    active() {
      return this.status !== SENSOR_STATUS.NONE
    },
    error() {
      return this.status !== SENSOR_STATUS.NONE && this.status !== SENSOR_STATUS.OK
    },
    statusStr() {
      if (this.status === SENSOR_STATUS.NONE) {
        return 'off'
      } else if (this.status === SENSOR_STATUS.OK) {
        return 'on'
      } else {
        return 'error'
      }
    },
    statusImg() {
      return `./images/sensor/sensor_${this.name}_${this.statusStr}.png`
    }
  }
})
</script>

<style lang="scss" scoped>
.status-item {
  border-left: 1px solid #373737;
  border-right: 1px solid #222222;
  border-bottom: 1px solid #1a1a1a;
  padding-left: 3px;
  padding-right: 5px;
  width: 50px;

  &:last-of-type {
    border-right: none;
  }

  .sensor-icon {
    height: 40px;
    margin-top: 5px;
  }

  .name {
    font-size: 12px;
    margin-top: 4px;

    &.active {
      color: #818181;
    }

    &.error {
      color: #d40000;
    }
  }
}
</style>
