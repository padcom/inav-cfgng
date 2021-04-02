<template>
  <table class="serial-ports data">
    <thead>
      <th class="id">Identifier</th>
      <th class="msp">Data</th>
      <th class="telemetry">Telemetry</th>
      <th class="rx">RX</th>
      <th class="sensor">Sensors</th>
      <th class="peripheral">Peripherals</th>
    </thead>
    <tbody>
      <tr v-for="port in ports" :key="port.identifier">
        <td class="id">{{ port.name }}</td>
        <td class="msp">
          <FlagSwitch v-model="port.msp" :flag="PORT_FUNCTION_MASK.MSP" />
          <label class="item-name">MSP</label>
          <BaudrateSelect
            v-model.number="port.mspBaudrate"
            :allowedValues="[ '9600', '19200', '38400', '57600', '115200' ]"
          />
        </td>
        <td class="telemetry">
          <Select
            v-model.number="port.telemetry"
            :options="[
              { value: 0, label: 'Disabled' },
              { value: TELEMETRY.FRSKY, label: 'FrSky' },
              { value: TELEMETRY.HOTT, label: 'HoTT' },
              { value: TELEMETRY.SMARTPORT, label: 'SmartPort' },
              { value: TELEMETRY.LTM, label: 'LTM' },
              { value: TELEMETRY.MAVLINK, label: 'MAVLink' },
              { value: TELEMETRY.IBUS, label: 'IBUS' },
              { value: TELEMETRY.GSM_SMS, label: 'GSM_SMS' },
            ]"
          />
          <BaudrateSelect
            v-model.number="port.telemetryBaudrate"
            :allowedValues="[ 'AUTO', '1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200' ]"
          />
        </td>
        <td class="rx">
          <FlagSwitch v-model="port.rxSerial" :flag="PORT_FUNCTION_MASK.RX_SERIAL" />
          <label class="item-name">Serial RX</label>
        </td>
        <td class="sensor">
          <Select
            v-model.number="port.sensor"
            :options="[
              { value: 0, label: 'Disabled' },
              { value: SENSOR.GPS, label: 'GPS' },
              { value: SENSOR.RANGEFINDER, label: 'Rangefinder' },
              { value: SENSOR.OPFLOW, label: 'Optic flow' },
            ]"
          />
          <BaudrateSelect
            v-model.number="port.sensorBaudrate"
            :allowedValues="[ '9600', '19200', '38400', '57600', '115200' ]"
          />
        </td>
        <td class="peripheral">
          <Select
            v-model.number="port.peripheral"
            :options="[
              { value: 0, label: 'Disabled' },
              { value: PERIPHERAL.BLACKBOX, label: 'Blackbox' },
              { value: PERIPHERAL.RUNCAM_DEVICE_CONTROL, label: 'RunCam device' },
              { value: PERIPHERAL.TBS_SMARTAUDIO, label: 'TBS SmartAudio' },
              { value: PERIPHERAL.IRC_TRAMP, label: 'IRC Tramp' },
              { value: PERIPHERAL.VTX_FFPV, label: 'FuriousFPV VTX' },
              { value: PERIPHERAL.ESC, label: 'ESC output/telemetry' },
              { value: PERIPHERAL.FRSKY_OSD, label: 'FrSky OSD' },
              { value: PERIPHERAL.DJI_FPV, label: 'DJI FPV VTX' },
              { value: PERIPHERAL.SMARTPORT_MASTER, label: 'SmartPort Master' },
            ]"
          />
          <BaudrateSelect
            v-model.number="port.peripheralBaudrate"
            :allowedValues="[ '19200', '38400', '57600', '115200', '230400', '250000' ]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

import FlagSwitch from '../../components/editors/FlagSwitch.vue'
import Select from '../../components/editors/Select.vue'
import BaudrateSelect from '../../components/editors/BaudrateSelect.vue'

import {
  PORT_FUNCTION_MASK,
  TELEMETRY,
  SENSOR,
  PERIPHERAL,
} from '../../models/Serial'

export default defineComponent({
  components: {
    FlagSwitch,
    Select,
    BaudrateSelect
  },
  props: {
    ports: { type: Array, default: () => [] }
  },
  computed: {
    PORT_FUNCTION_MASK() {
      return PORT_FUNCTION_MASK
    },
    TELEMETRY() {
      return TELEMETRY
    },
    SENSOR() {
      return SENSOR
    },
    PERIPHERAL() {
      return PERIPHERAL
    }
  },
})
</script>

<style lang="scss" scoped>
.serial-ports {
  width: 100%;

  td {
    &.id {
      width: 150px;
    }
    &.msp {
      width: 200px;
    }
    &.telemetry {
      width: 300px;
    }
    &.rx {
      width: 150px;
    }
    &.sensor {
      width: 300px;
    }
    &.peripheral {
      width: 300px;
    }
  }

  &:deep(.slider) {
    margin-top: 4px;
    margin-bottom: -4px;
  }

  label.item-name {
    margin: 0 8px;
  }

  select {
    margin-right: 3px;
  }
}
</style>
