<template>
  <Page>
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

    <SerialPortsEditor :ports="ports" />
  </Page>

  <Actions>
    <button class="action" @click="saveAndReboot">Save and Reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import Actions from '../components/Actions.vue'

import SerialPortsEditor from './ports/SerialPortsEditor.vue'

import {
  PORT_NAME,
  PORT_FUNCTION_MASK,
  TELEMETRY_MASK,
  SENSOR_MASK,
  PERIPHERAL_MASK
} from '../models/serial-port'

import { useConnectionManager } from '../composables/connection-manager'

import { CommonSerialConfigRequest } from '../command/v2/CommonSerialConfig'
import { CommonSetSerialConfigRequest } from '../command/v2/CommonSetSerialConfig'
import { EepromWriteRequest } from '../command/v1/EepromWrite'

export default defineComponent({
  name: 'PortsPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Actions,
    SerialPortsEditor,
  },
  data() {
    return {
      ports: []
    }
  },
  mounted() {
    this.readPortSettings()
  },
  methods: {
    async readPortSettings() {
      await this.$scheduler.pause()
      try {
        const response = await this.$serial.query(new CommonSerialConfigRequest())
        this.ports = response.ports.map(port => ({
          ...port,
          name: PORT_NAME[port.identifier],
          msp: port.functionMask & PORT_FUNCTION_MASK.MSP,
          rxSerial: port.functionMask & PORT_FUNCTION_MASK.RX_SERIAL,
          sensor: port.functionMask & SENSOR_MASK,
          telemetry: port.functionMask & TELEMETRY_MASK,
          peripheral: port.functionMask & PERIPHERAL_MASK,
        }))
      } finally {
        await this.$scheduler.resume()
      }
    },
    async saveAndReboot() {
      const ports = this.ports.map(port => ({
        identifier: port.identifier,
        functionMask: port.msp | port.telemetry | port.rxSerial | port.sensor | port.peripheral,
        mspBaudrate: port.mspBaudrate,
        sensorBaudrate: port.sensorBaudrate,
        telemetryBaudrate: port.telemetryBaudrate,
        peripheralBaudrate: port.peripheralBaudrate
      }))

      const request = new CommonSetSerialConfigRequest(ports)

      await this.$scheduler.pause()
      try {
        await this.$serial.query(request)
        await this.$serial.query(new EepromWriteRequest())
        await useConnectionManager().reboot()
        this.$router.push('/ports')
      } finally {
        await this.$scheduler.resume()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.warning {
  margin-bottom: 24px;
}
.serial-ports {
  margin-bottom: 24px;
}
</style>
