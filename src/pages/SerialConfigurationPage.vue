<template>
  <PageHeader>Ports</PageHeader>

  <Warning>
    <p>
      <strong>Note:</strong> not all combinations are valid.
      When the flight controller firmware detects this the serial port configuration will be reset.
    </p>
    <p>
      <strong>Note:</strong> Do <span style="color: red">NOT</span> disable MSP on the first serial port unless you know what you are doing.
      You may have to reflash and erase your configuration if you do.
    </p>
  </Warning>

  <table class="serial-ports">
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
          <FlagSwitch v-model="port.msp" :flag="PORT_FUNCTION_MASK.MSP" :disabled="port.identifier === 20" />
          MSP
          <BaudrateSelect
            v-model="port.mspBaudrate"
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
            v-model="port.telemetryBaudrate"
            :allowedValues="[ 'AUTO', '1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200' ]"
          />
        </td>
        <td class="rx">
          <FlagSwitch v-model="port.rxSerial" :flag="PORT_FUNCTION_MASK.RX_SERIAL" />
          Serial RX
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
            v-model="port.sensorBaudrate"
            :allowedValues="[ '9600', '19200', '38400', '57600', '115200' ]"
          />
        </td>
        <td class="peripherial">
          <Select
            v-model.number="port.peripherial"
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
            v-model="port.peripherialBaudrate"
            :allowedValues="[ '19200', '38400', '57600', '115200', '230400', '250000' ]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import FlagSwitch from '../components/editors/FlagSwitch.vue'
import Select from '../components/editors/Select.vue'
import BaudrateSelect from '../components/editors/BaudrateSelect.vue'

import { PORT_NAME, PORT_FUNCTION_MASK, TELEMETRY, SENSOR, PERIPHERAL } from '../models/Serial'
import { CommonSerialConfigRequest } from '../command/v2/CommonSerialConfig'

export default defineComponent({
  components: {
    PageHeader,
    Warning,
    FlagSwitch,
    Select,
    BaudrateSelect
  },
  data() {
    return {
      ports: [],
      PORT_FUNCTION_MASK,
      TELEMETRY,
      SENSOR,
      PERIPHERAL,
    }
  },
  async mounted() {
    const config = await this.$serial.query(new CommonSerialConfigRequest())
    this.ports = config.ports.map(port => ({
      ...port,
      name: PORT_NAME[port.identifier],
    }))
  }
})
</script>

<style lang="scss" scoped>

.warning {
  margin-bottom: 24px;
}

.serial-ports {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--default-font-size);

  select {
    margin-right: 3px;
  }

  td, th {
    border: solid 1px lightgray;
    border-top: none;
    padding: 6px 8px;
  }

  th:first-of-type {
    border-top-left-radius: 8px;
    border-left: none;
  }

  th:last-of-type {
    border-top-right-radius: 8px;
    border-right: none;
  }

  th {
    background-color: gray;
    color: white;
    font-weight: normal;
  }

  tr {
    background-color: white;
  }

  tr:nth-child(even) {
    background-color: #f4f4f4;
  }
}

th {
  text-align: left;
}

td {
  text-align: left;

  &.id {
    width: 00px;
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
</style>
