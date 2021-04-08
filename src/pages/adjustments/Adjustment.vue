<template>
  <Row class="adjustment" :class="{ active: adjustment.enabled && adjustment.values[0] <= adjustment.current && adjustment.values[1] >= adjustment.current }">
    <Column class="fixed-width" width="60px">
      <Switch v-model="adjustment.enabled" />
    </Column>
    <Column class="aux-channel fixed-width" width="80px">
      <AuxChannelSelector v-model="adjustment.auxChannelIndex" :numberOfAuxChannels="numberOfAuxChannels" />
      <div class="current-values">
        <p><label>Min</label>{{ adjustment.values[0] }}</p>
        <p><label>Max</label>{{ adjustment.values[1] }}</p>
      </div>
    </Column>
    <Column class="value">
      <ChannelRangeSelector v-model="adjustment.values" :ticker="adjustment.current" :disabled="!adjustment.enabled" />
    </Column>
    <Column class="function fixed-width" width="260px">
      <Dropdown v-model.number="adjustment.fn" :options="functions" />
    </Column>
    <Column class="aux-switch fixed-width" width="70px">
      <AuxChannelSelector v-model.number="adjustment.auxSwitchChannelIndex" :numberOfAuxChannels="numberOfAuxChannels" />
    </Column>
    <Column class="slot fixed-width" width="80px">
      <Dropdown v-model.number="adjustment.slot" :options="[
        { label: 'Slot 0', value: 0 },
        { label: 'Slot 1', value: 1 },
        { label: 'Slot 2', value: 2 },
        { label: 'Slot 3', value: 3 },
      ]" />
    </Column>
  </Row>  
</template>

<script>
import { defineComponent } from 'vue'

import Row from '../../components/common/Row.vue'
import Column from '../../components/common/Column.vue'
import Switch from '../../components/editors/Switch.vue'
import Dropdown from '../../components/editors/Dropdown.vue'
import AuxChannelSelector from '../../components/AuxChannelSelector.vue'
import ChannelRangeSelector from '../../components/ChannelRangeSelector.vue'

export default defineComponent({
  components: {
    Row,
    Column,
    Switch,
    Dropdown,
    AuxChannelSelector,
    ChannelRangeSelector,
  },
  props: {
    adjustment: { type: Object, required: true },
    index: { type: Number, required: true },
    numberOfAuxChannels: { type: Number, default: 4 },
  },
  computed: {
    functions() {
      return [
        { value: 0, label: 'No changes' },
        { value: 1, label: 'RC Rate Adjustment' },
        { value: 2, label: 'RC Expo Adjustment' },
        { value: 3, label: 'Throttle Expo Adjustment' },
        { value: 4, label: 'Pitch & Roll Rate Adjustment' },
        { value: 5, label: 'Yaw Rate Adjustment' },
        { value: 6, label: 'Pitch & Roll P Adjustment' },
        { value: 7, label: 'Pitch & Roll I Adjustment' },
        { value: 8, label: 'Pitch & Roll D/FF Adjustment' },
        { value: 9, label: 'Yaw P Adjustment' },
        { value: 10, label: 'Yaw I Adjustment' },
        { value: 11, label: 'Yaw D/FF Adjustment' },
        { value: 12, label: 'Rate Profile Selection' },
        { value: 13, label: 'Pitch Rate' },
        { value: 14, label: 'Roll Rate' },
        { value: 15, label: 'Pitch P Adjustment' },
        { value: 16, label: 'Pitch I Adjustment' },
        { value: 17, label: 'Pitch D/FF Adjustment' },
        { value: 18, label: 'Roll P Adjustment' },
        { value: 19, label: 'Roll I Adjustment' },
        { value: 20, label: 'Roll D/FF Adjustment' },
        { value: 21, label: 'RC Yaw Expo Adjustment' },
        { value: 22, label: 'Manual RC Expo Adjustment' },
        { value: 23, label: 'Manual RC Yaw Expo Adjustment' },
        { value: 24, label: 'Manual Pitch & Roll Rate Adjustment' },
        { value: 25, label: 'Manual Roll Rate Adjustment' },
        { value: 26, label: 'Manual Pitch Rate Adjustment' },
        { value: 27, label: 'Manual Yaw Rate Adjustment' },
        { value: 28, label: 'Navigation FW Cruise Throttle Adjustment' },
        { value: 29, label: 'Navigation FW Pitch To Throttle Adjustment' },
        { value: 30, label: 'Board Roll Alignment Adjustment' },
        { value: 31, label: 'Board Pitch Alignment Adjustment' },
        { value: 32, label: 'Level P Adjustment' },
        { value: 33, label: 'Level I Adjustment' },
        { value: 34, label: 'Level D Adjustment' },
        { value: 35, label: 'Pos XY P Adjustment' },
        { value: 36, label: 'Pos XY I Adjustment' },
        { value: 37, label: 'Pos XY D Adjustment' },
        { value: 38, label: 'Pos Z P Adjustment' },
        { value: 39, label: 'Pos Z I Adjustment' },
        { value: 40, label: 'Pos Z D Adjustment' },
        { value: 41, label: 'Heading P Adjustment' },
        { value: 42, label: 'Vel XY P Adjustment' },
        { value: 43, label: 'Vel XY I Adjustment' },
        { value: 44, label: 'Vel XY D Adjustment' },
        { value: 45, label: 'Vel Z P Adjustment' },
        { value: 46, label: 'Vel Z I Adjustment' },
        { value: 47, label: 'Vel Z D Adjustment' },
        { value: 48, label: 'FW min thr down pitch angle Adjustment' },
        { value: 49, label: 'VTX power level Adjustment' },
        { value: 50, label: 'Thrust PID Attenuation (TPA) Adjustment' },
        { value: 51, label: 'TPA Breakpoint Adjustment' },
        { value: 52, label: 'Control Smoothness Adjustment' },
      ]
    }
  },
})
</script>

<style lang="scss" scoped>
.adjustment {
  background-color: #DDDDDD;
  border-top: solid 1px #FFF;
  border-bottom: solid 1px #BBB;

  &:nth-of-type(even) {
    background-color: #EEEEEE;
    &.active {
      background-color: #EEF4EE;
    }
  }

  &:nth-of-type(2) {
    border-top: none;
  }

  &.active {
    background-color: #DDE3DD;
  }

  &:nth-last-of-type(1) {
    margin-bottom: 24px;
  }
}

.switch {
  margin-top: 30px;
  margin-left: 16px;
}

.aux-channel {
  margin-top: 10px;
}

.current-values {
  font-size: 12px;
  label {
    display: inline-block;
    width: 30px;
  }
}

.value {
  margin-top: 10px;
  margin-bottom: 48px;
  font-size: 12px;
}

.function {
  margin-left: 32px;
  margin-top: 30px;
}

.aux-switch {
  margin-top: 30px;
}

.slot {
  margin-top: 30px;
}
</style>
