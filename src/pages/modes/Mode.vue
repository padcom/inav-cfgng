<template>
  <Row class="mode">
    <Column class="name fixed-width" :class="{ active: mode.active }">
      <div class="channel-name">{{ mode.name }}</div>
      <button :disabled="!canAddMoreRanges" @click="addRange">Add Range</button>
    </Column>
    <Column class="ranges">
      <Row class="value" v-for="range in mode.ranges" :key="range.id">
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
          <ChannelRangeSelector v-model="range.values" :ticker="range.current" />
        </Column>
        <Column class="fixed-width">
          <a class="close-button" @click="deleteRange(range)">x</a>
        </Column>
      </Row>
    </Column>
  </Row>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import Row from '../../components/common/Row.vue'
import Column from '../../components/common/Column.vue'
import Slider from '../../components/common/Slider.vue'
import ChannelRangeSelector from '../../components/ChannelRangeSelector.vue'

export default defineComponent({
  components: {
    Row,
    Column,
    Slider,
    ChannelRangeSelector,
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

  &.active {
    background-color: var(--color-info);
  }

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
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 12px;
  padding-right: 12px;

  border-top: solid 1px white;
  border-bottom: solid 1px lightgray;

  &:first-of-type {
    border-top: none;
  }

  &:last-of-type {
    border-bottom: none;
  }
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
  background-color: #bbb;
  color: white;
  padding: 2px 2px 2px 2px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
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
