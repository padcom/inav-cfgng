<template>
  <div class="progress-bar" :style="{
    'background': `linear-gradient(to right, ${color} ${scaled}%, ${bgColor} 0)`
  }">
    <div v-if="showValue" class="value">{{ value }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: { type: Number, default: 50 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    showValue: { type: Boolean, default: true },
    color: { type: String, default: 'red' },
    backgroundColor: { type: String, default: 'rgba(0, 0, 0, 0)' },
  },
  computed: {
    scaled() {
      return (this.value - this.min) * 100 / this.max
    },
    bgColor() {
      return this.showValue ? 'white' : this.backgroundColor
    }
  }
})
</script>

<style lang="scss" scoped>
.progress-bar {
  text-align: center;
  height: 15px;
  width: calc(100% - 80px); // .channel-name width + .channel-display margin-left
}

.value {
  font-size: 12px;
  color: transparent;
  background: inherit;
  -webkit-background-clip: text;
  filter: invert(1) grayscale(1) contrast(90);
}
</style>
