<template>
  <Page>
    <PageHeader>Configuration</PageHeader>
    <Column>
      <Panel class="system-configuration" title="Sysem configuration">
        <p>
          <Dropdown
            v-model.number="settings['gyro_hardware_lpf'].value"
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
            v-model.number="settings['i2c_speed'].value"
            :options="settings['i2c_speed'].values"
          />
          <label>I2C Speed</label>
        </p>
      </Panel>
      <Panel class="sensors" title="Sensors">
        <p>
          <Dropdown
            v-model.number="settings['acc_hardware'].value"
            :options="settings['acc_hardware'].values"
          />
          <label>Accelerometer</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['mag_hardware'].value"
            :options="settings['mag_hardware'].values"
          />
          <label>Magnetometer</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['baro_hardware'].value"
            :options="settings['baro_hardware'].values"
          />
          <label>Barometer</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['pitot_hardware'].value"
            :options="settings['pitot_hardware'].values"
          />
          <label>Pitot tube</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['rangefinder_hardware'].value"
            :options="settings['rangefinder_hardware'].values"
          />
          <label>Rangefinder</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['opflow_hardware'].value"
            :options="settings['opflow_hardware'].values"
          />
          <label>Optical flow</label>
        </p>
      </Panel>
      <Panel class="board-and-sensor-alignment" title="Board and Sensor Alignment">
        <p>
          <input type="number"
            v-model.number="settings['align_board_roll'].value"
            :min="settings['align_board_roll'].min"
            :max="settings['align_board_roll'].max"
          />
          <label>Roll centi degrees</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['align_board_pitch'].value"
            :min="settings['align_board_pitch'].min"
            :max="settings['align_board_pitch'].max"
          />
          <label>Pitch centi degrees</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['align_board_yaw'].value"
            :min="settings['align_board_yaw'].min"
            :max="settings['align_board_yaw'].max"
          />
          <label>Yaw centi degrees</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['align_mag'].value"
            :options="settings['align_mag'].values"
          />
          <label>Magnetometer alignment</label>
        </p>
      </Panel>
      <Panel class="gps" title="GPS">
        <p>
          <label>GPS for navigation and telemetry</label>
        </p>
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
    await this.load(
      'gyro_hardware_lpf', 'looptime', 'i2c_speed', 'name',
      'acc_hardware', 'mag_hardware', 'baro_hardware', 'pitot_hardware', 'rangefinder_hardware', 'opflow_hardware',
      'align_board_roll', 'align_board_pitch', 'align_board_yaw', 'align_mag',
    )
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
