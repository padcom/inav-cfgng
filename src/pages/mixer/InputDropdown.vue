<template>
  <Dropdown :options="[
    { value: 0, label: 'Stabilized Roll' },
    { value: 1, label: 'Stabilized Pitch' },
    { value: 2, label: 'Stabilized Yaw' },
    { value: 3, label: 'Stabilized Throttle' },
    { value: 4, label: 'RC Roll' },
    { value: 5, label: 'RC Pitch' },
    { value: 6, label: 'RC Yaw' },
    { value: 7, label: 'RC Throttle' },
    { value: 8, label: 'RC Channel 5' },
    { value: 9, label: 'RC Channel 6' },
    { value: 10, label: 'RC Channel 7' },
    { value: 11, label: 'RC Channel 8' },
    { value: 12, label: 'Gimbal Pitch' },
    { value: 13, label: 'Gimbal Roll' },
    { value: 14, label: 'Flaps' },
    { value: 15, label: 'RC Channel 9' },
    { value: 16, label: 'RC Channel 10' },
    { value: 17, label: 'RC Channel 11' },
    { value: 18, label: 'RC Channel 12' },
    { value: 19, label: 'RC Channel 13' },
    { value: 20, label: 'RC Channel 14' },
    { value: 21, label: 'RC Channel 15' },
    { value: 22, label: 'RC Channel 16' },
    { value: 23, label: 'Stabilized Roll+' },
    { value: 24, label: 'Stabilized Roll-' },
    { value: 25, label: 'Stabilized Pitch+' },
    { value: 26, label: 'Stabilized Pitch-' },
    { value: 27, label: 'Stabilized Yaw+' },
    { value: 28, label: 'Stabilized Yaw-' },
    { value: 29, label: 'MAX' },
    { value: 30, label: 'GVAR 0' },
    { value: 31, label: 'GVAR 1' },
    { value: 32, label: 'GVAR 2' },
    { value: 33, label: 'GVAR 3' },
    { value: 34, label: 'GVAR 4' },
    { value: 35, label: 'GVAR 5' },
    { value: 36, label: 'GVAR 6' },
    { value: 37, label: 'GVAR 7' },
  ]" />
</template>

<script>
import { defineComponent } from 'vue'

import Dropdown from '../../components/editors/Dropdown.vue'

export default defineComponent({
  components: {
    Dropdown
  }  
})
</script>
