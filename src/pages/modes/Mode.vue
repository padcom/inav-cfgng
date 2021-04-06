<template>
  <Column class="mode full-width">
    <Column class="name">
      <div class="channel-name">{{ mode.name }}</div>
      <button :disabled="!canAddMoreRanges" @click="addRange">Add Range</button>
    </Column>
    <Column class="ranges">
      <Column class="value full-width" v-for="range in mode.ranges" :key="range.id">
        <div style="width: 100px; margin-right: 16px">
          <select style="width: 100%; margin-bottom: 8px;" v-model="range.channel">
            <option v-for="i in 10" :key="i" :value="i - 1">AUX{{ i }}</option>
          </select>
          Min: {{ range.values[0] }}<br/>
          Max: {{ range.values[1] }}
        </div>
        <Slider style="width: calc(100% - 32px - 100px - 30px);" v-model="range.values" :min="900" :max="2100" :step="25" :margin="50" :ticker="range.current" :pips="{
          mode: 'values',
          values: [900, 1000, 1200, 1400, 1500, 1600, 1800, 2000, 2100],
          density: 4,
          stepped: true
        }" />
        <div style="width: 30px; text-align: right;">
          <a @click="deleteRange(range)" style="display: block; text-align: center; cursor: pointer; font-weight: bold; background-color: gray; padding: 3px 4px 2px 4px; border-radius: 50%; width: 20px; height: 20px; color: white; margin-left: 32px">x</a>
        </div>
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
    canAddMoreRanges: { type: Boolean, default: true },
  },
  methods: {
    addRange() {
      console.log('Here..')

      this.mode.ranges.push({
        id: uuid(),
        channel: 0,
        values: [ 1300, 1700 ],
      })
    },
    deleteRange(range) {
      this.mode.ranges = this.mode.ranges.filter(r => r !== range)
    }
  }
})
</script>

<style lang="scss" scoped>
.mode {
  margin-bottom: 0;
}

.name {
  display: flex;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
  flex-basis: 170px;
  width: 100%;
  min-height: 80px;
  max-height: 100%;
  margin-bottom: 8px;

  .channel-name {
    font-size: 14px;
    margin-top: 15px;
    font-weight: bold;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
  button {
    margin-top: 10px;
    padding: 2px 4px;
  }
}

.ranges {
  flex-basis: calc(100% - 170px - 12px);
  background-color: #F0F0F0;
  margin-bottom: 8px;
}

.value {
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 14px;
  padding-left: 16px;
  padding-right: 16px;
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
