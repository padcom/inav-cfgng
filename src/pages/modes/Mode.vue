<template>
  <Column class="mode full-width">
    <Column class="name">
      {{ mode.name }}
    </Column>
    <Column class="ranges">
      <Column class="value full-width" v-for="range in mode.ranges" :key="range.id">
        <Slider v-model="range.values" :min="900" :max="2100" :step="25" :pips="{
          mode: 'values',
          values: [900, 1000, 1200, 1400, 1500, 1600, 1800, 2000, 2100],
          density: 4,
          stepped: true
        }"/>
      </Column>
    </Column>
  </Column>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import Column from '../../components/common/Column.vue'
import Slider from '../../components/common/Slider.vue'

export default defineComponent({
  components: {
    Column,
    Slider,
  },
  props: {
    mode: { type: Object, required: true },
  },
})
</script>

<style lang="scss" scoped>
.mode {
  margin-bottom: 0;
}

.name {
  background-color: lightgray;
  flex-basis: 100px;
}

.ranges {
  flex-basis: 80%;
  background-color: #F0F0F0;
  margin-bottom: 8px;
}

.value {
  margin-bottom: 52px;
  padding-left: 16px;
  padding-right: 48px;
  font-size: 12px;
}
</style>

<style>
  .noUi-value {
    margin-top: 12px;
  }
  .noUi-connect {
    background-color: var(--color-info);
  }
</style>
