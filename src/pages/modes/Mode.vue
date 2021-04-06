<template>
  <Column class="mode full-width">
    <Column class="name fixed-width">
      <div class="channel-name">{{ mode.name }}</div>
      <button :disabled="!canAddMoreRanges" @click="addRange">Add Range</button>
    </Column>
    <Column class="ranges">
      <Column class="value full-width" v-for="range in mode.ranges" :key="range.id">
        <Column class="fixed-width" style="width: 70px; margin-right: 16px">
          <select style="width: 100%; margin-bottom: 8px;" v-model="range.channel">
            <option v-for="i in numberOfAuxChannels" :key="i" :value="i - 1">CH{{ i + 4 }}</option>
          </select>
          <div class="current-values">
            <p><label>Min</label>{{ range.values[0] }}</p>
            <p><label>Max</label>{{ range.values[1] }}</p>
          </div>
        </Column>
        <Column>
          <Slider v-model="range.values" :min="900" :max="2100" :step="25" :margin="50" :ticker="range.current" :pips="{
            mode: 'values',
            values: [900, 1000, 1200, 1400, 1500, 1600, 1800, 2000, 2100],
            density: 4,
            stepped: true
          }" />
        </Column>
        <Column class="fixed-width">
          <a class="close-button" @click="deleteRange(range)">x</a>
        </Column>
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
    numberOfAuxChannels: { type: Number, default: 4 },
  },
  methods: {
    addRange() {
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
  margin-bottom: 8px;
}

.name {
  justify-content: center;
  width: 180px;
  min-height: 80px;
  background-color: lightgray;

  .channel-name {
    width: 100%;
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  button {
    margin-top: 10px;
    padding: 3px 7px;
    border: solid 1px gray;
    border-radius: 3px;
    outline: none;
  }
}

.ranges {
  background-color: #F0F0F0;
}

.value {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 12px;
  padding-right: 12px;
}

.current-values {
  label {
    display: inline-block;
    width: 30px;
  }
}

.close-button {
  display: block;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background-color: gray;
  color: white;
  padding: 5px 4px 2px 4px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-left: 16px;
}
</style>

<style lang="scss">
.noUi-value {
  margin-top: 12px;
}
.noUi-connect {
  background-color: var(--color-info);
}
.noUi-handle {
  outline: none;
}
</style>
