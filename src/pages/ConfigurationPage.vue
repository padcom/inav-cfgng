<template>
  <Page>
    <PageHeader>Configuration</PageHeader>
    <Column>
      <Panel class="system-configuration" title="Sysem configuration">
        <p>
          <Dropdown
            v-model="settings['gyro_hardware_lpf'].value"
            :options="settings['gyro_hardware_lpf'].values"
          />
          <label>Gyroscope LPF cutoff frequency</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['looptime'].value"
            :options="settings['looptime'].values"
          />
          <label>Flight Controller Loop Time</label>
        </p>
        <p>
          <Dropdown
            v-model="settings['i2c_speed'].value"
            :options="settings['i2c_speed'].values"
          />
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
        <p>
          <input type="text" v-model="settings['name'].value" />
        </p>
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

import { useSettings } from '../composables/settings'

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
  setup() {
    return {
      ...useSettings()
    }
  },
  async mounted() {
    await this.load('gyro_hardware_lpf', 'looptime', 'i2c_speed', 'name')
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
