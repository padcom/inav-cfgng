<template>
  <Page>
    <PageHeader>Configuration</PageHeader>
    <Column>
      <Panel class="system-configuration" title="Sysem configuration">
        <p>
          <Dropdown v-model.number="values['gyro_hardware_lpf']" :options="options['gyro_hardware_lpf']" />
          <label>Gyroscope LPF cutoff frequency</label>
        </p>
        <p>
          <Dropdown v-model.number="values['looptime']" :options="[
            { label: '8kHz', value: 125 },
            { label: '4kHz', value: 250 },
            { label: '2kHz', value: 500 },
            { label: '1kHz', value: 1000 },
            { label: '667Hz', value: 1500 },
            { label: '500Hz', value: 2000 },
            { label: '334Hz', value: 3000 },
            { label: '250Hz', value: 4000 },
          ]" />
          <label>Flight Controller Loop Time</label>
        </p>
        <p>
          <Dropdown v-model.number="values['i2c_speed']" :options="options['i2c_speed']" />
          <label>I2C Speed</label>
        </p>
      </Panel>
      <Panel class="sensors" title="Sensors">
        <p>Sensors</p>
      </Panel>
      <Panel class="board-and-sensor-alignment" title="Board and Sensor Alignment">
        <p>Board and Sensor Alignment</p>
      </Panel>
      <Panel class="gps" title="GPS">
        <p>GPS</p>
      </Panel>
      <Panel class="reversible-motors" title="Reversible motors">
        <p>Reversible motors</p>
      </Panel>
      <Panel class="personalization" title="Personalzation">
        <p>Personalzation</p>
      </Panel>
      <Panel class="vtx" title="VTX">
        <p>VTX</p>
      </Panel>
    </Column>
    <Column>
      <Panel class="battery-voltage" title="Battery voltage">
        <p>Battery voltage</p>
      </Panel>
      <Panel class="current-sensor" title="Current Sensor">
        <p>Current Sensor</p>
      </Panel>
      <Panel class="battery-capacity" title="Battery Capacity">
        <p>Battery capacity</p>
      </Panel>
      <Panel class="other-features" title="Other features">
        <p>Other features</p>
      </Panel>
    </Column>
  </Page>

  <Actions>
    <button @click="saveAndReboot" class="action">Save and Reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Column from '../components/common/Column.vue'
import Panel from '../components/common/Panel.vue'
import Actions from '../components/Actions.vue'
import Dropdown from '../components/editors/Dropdown.vue'

import { CommonSettingInfoRequest } from '../command/v2/CommonSettingInfo'

export default defineComponent({
  name: 'ConfigurationPage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Actions,
    Dropdown,
  },
  data() {
    const settings = [
      'gyro_hardware_lpf', 'looptime', 'i2c_speed'
    ]
    return {
      settings,
      values: settings.reduce((acc, setting) => ({...acc, setting: null }), {}),
      options: settings.reduce((acc, setting) => ({...acc, setting: [] }), {})
    }
  },
  async mounted() {
    await this.$scheduler.pause()
    try {
      for (let i = 0; i < this.settings.length; i++) {
        const response = await this.$serial.query(new CommonSettingInfoRequest(this.settings[i]))
        if (response.direction !== '!') {
          console.log(this.settings[i], response.value, response.values)
          this.options[response.name] = response.values.map(value => ({ label: value, value }))
          this.values[response.name] = response.value
        } else {
          console.warn('>>>', this.settings[i], 'unsupported')
        }
      }
    } finally {
      await this.$scheduler.resume()
    }
  }
})
</script>

<style lang="scss" scoped>
// .system-configuration {
// }

// .sensors {
// }

// .board-and-sensor-alignment {
// }

// .gps {
// }

// .reversible-motors {
// }

// .personalization {
// }

// .vtx {
// }

// .battery-voltage {
// }

// .current-sensor {
// }

// .battery-capacity {
// }

// .other-features {
// }
</style>
