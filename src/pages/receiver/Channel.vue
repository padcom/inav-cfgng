<template>
  <Row class="channel">
    <div class="channel-name">
      {{ name[index] }}
    </div>
    <div class="channel-display" :style="{
      'background': `linear-gradient(to right, ${color[index]} ${scaled}%, white 0)`
    }">
      <div class="channel-value">
        {{ value }}
      </div>
    </div>
  </Row>
</template>

<script>
import { defineComponent } from 'vue'

import Row from '../../components/common/Row.vue'

import { CHANNEL_NAME, CHANNEL_COLOR } from '../../models/channel'

export default defineComponent({
  components: {
    Row,
  },
  props: {
    value: { type: Number, default: 1500 },
    index: { type: Number, default: 1 },
  },
  computed: {
    name() {
      return CHANNEL_NAME
    },
    color() {
      return CHANNEL_COLOR
    },
    scaled() {
      return (this.value - 800) * 100 / 1400
    },
  }
})
</script>

<style lang="scss" scoped>
.channel {
  display: flex;
}

.channel-name {
  width: 60px;
  text-align: right;
}

.channel-display {
  font-size: 12px;
  text-align: center;
  height: 15px;
  width: calc(100% - 80px); // .channel-name width + .channel-display margin-left
  margin-top: 2px;
  margin-left: 20px;
  border: var(--input-border);
  border-radius: 3px;
}

.channel-value {
  color: transparent;
  background: inherit;
  -webkit-background-clip: text;
  filter: invert(1) grayscale(1) contrast(90);
}
</style>
