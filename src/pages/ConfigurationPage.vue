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
          <FlagSwitch v-model.number="features" :flag="FEATURE_FLAG.GPS" />
          <label>GPS for navigation and telemetry</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['gps_provider'].value"
            :options="settings['gps_provider'].values"
          />
          <label>Protocol</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['gps_sbas_mode'].value"
            :options="settings['gps_sbas_mode'].values"
          />
          <label>Ground Assistance Type</label>
        </p>
        <p>
          <BoolSwitch v-model.number="settings['gps_ublox_use_galileo'].value" />
          <label>Gps use Galileo Satellites</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['tz_offset'].value"
            :min="settings['tz_offset'].min"
            :max="settings['tz_offset'].max"
          />
          <label>Timezone Offset [Mins]</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['tz_automatic_dst'].value"
            :options="settings['tz_automatic_dst'].values"
          />
          <label>Automatic Daylight Savings Time</label>
        </p>
      </Panel>
      <Panel class="reversible-motors" title="Reversible motors">
        <p>
          <input type="number"
            v-model.number="settings['3d_deadband_low'].value"
            :min="settings['3d_deadband_low'].min"
            :max="settings['3d_deadband_low'].max"
          />
          <label>Reversible Motors Deadband Low</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['3d_deadband_high'].value"
            :min="settings['3d_deadband_high'].min"
            :max="settings['3d_deadband_high'].max"
          />
          <label>Reversible Motors Deadband High</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['3d_neutral'].value"
            :min="settings['3d_neutral'].min"
            :max="settings['3d_neutral'].max"
          />
          <label>Reversible Motors Neutral</label>
        </p>
      </Panel>
      <Panel class="personalization" title="Personalzation">
        <p>
          <input type="text" v-model="settings['name'].value" />
          <label>Craft name</label>
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
import FlagSwitch from '../components/editors/FlagSwitch.vue'
import BoolSwitch from '../components/editors/BoolSwitch.vue'

import { useSettings } from '../composables/settings'
import { useFeatures } from '../composables/features'

import { FEATURE_FLAG } from '../models/feature'

export default defineComponent({
  name: 'ConfigurationPage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Actions,
    Dropdown,
    FlagSwitch,
    BoolSwitch,
  },
  setup() {
    const { settings, load: loadSettings, save: saveSettings } = useSettings()
    const { features, load: loadFeatures, save: saveFeatures } = useFeatures()

    return {
      settings, loadSettings, saveSettings,
      features, loadFeatures, saveFeatures,
    }
  },
  computed: {
    FEATURE_FLAG() {
      return FEATURE_FLAG
    }
  },
  async mounted() {
    await this.loadFeatures()
    await this.loadSettings(
      'gyro_hardware_lpf', 'looptime', 'i2c_speed', 'name',
      'acc_hardware', 'mag_hardware', 'baro_hardware', 'pitot_hardware', 'rangefinder_hardware', 'opflow_hardware',
      'align_board_roll', 'align_board_pitch', 'align_board_yaw', 'align_mag',
      'gps_provider', 'gps_sbas_mode', 'gps_ublox_use_galileo', 'tz_offset', 'tz_automatic_dst',
      '3d_deadband_low', '3d_deadband_high', '3d_neutral'
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
