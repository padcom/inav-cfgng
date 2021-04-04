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
        <p>
          <Dropdown
            v-model.number="settings['vtx_band'].value"
            :options="settings['vtx_band'].values"
          />
          <label>Band</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['vtx_channel'].value"
            :options="settings['vtx_channel'].values"
          />
          <label>Channel</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['vtx_power'].value"
            :options="settings['vtx_power'].values"
          />
          <label>Power Level</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['vtx_low_power_disarm'].value"
            :options="settings['vtx_low_power_disarm'].values"
          />
          <label>Use low power while the craft is disarmed</label>
        </p>
      </Panel>
    </Column>
    <Column>
      <Panel class="battery-voltage" title="Battery voltage">
        <p>
          <FlagSwitch v-model.number="features" :flag="FEATURE_FLAG.VBAT" />
          <label>Battery voltage monitoring</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['vbat_meter_type'].value"
            :options="settings['vbat_meter_type'].values"
          />
          <label>Voltage Meter Type</label>
        </p>
        <p>
          <Dropdown
            v-model.number="settings['bat_voltage_src'].value"
            :options="settings['bat_voltage_src'].values"
          />
          <label>Voltage source to use for alarms and telemetry</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['bat_cells'].value"
            :min="settings['bat_cells'].min"
            :max="settings['bat_cells'].max"
          />
          <label>Number of cells (0 = auto)</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['vbat_cell_detect_voltage'].value"
            :min="settings['vbat_cell_detect_voltage'].min"
            :max="settings['vbat_cell_detect_voltage'].max"
          />
          <label>Maximum cell voltage for cell count detection</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['vbat_min_cell_voltage'].value"
            :min="settings['vbat_min_cell_voltage'].min"
            :max="settings['vbat_min_cell_voltage'].max"
          />
          <label>Minimum Cell Voltage</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['vbat_max_cell_voltage'].value"
            :min="settings['vbat_max_cell_voltage'].min"
            :max="settings['vbat_max_cell_voltage'].max"
          />
          <label>Maximum Cell Voltage</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['vbat_warning_cell_voltage'].value"
            :min="settings['vbat_warning_cell_voltage'].min"
            :max="settings['vbat_warning_cell_voltage'].max"
          />
          <label>Warning Cell Voltage</label>
        </p>
        <p>
          <input type="number"
            v-model.number="settings['vbat_scale'].value"
            :min="settings['vbat_scale'].min"
            :max="settings['vbat_scale'].max"
          />
          <label>Voltage Scale</label>
        </p>
        <p>
          <input type="string" readonly v-model="voltage" />
          <label>Voltage</label>
        </p>
      </Panel>
      <Panel class="current-sensor" title="Current Sensor">
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
import { ref, defineComponent } from 'vue'

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

import { AnalogRequest } from '../command/v1/Analog'

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
    const voltage = ref(0)

    return {
      settings, loadSettings, saveSettings,
      features, loadFeatures, saveFeatures,
      voltage
    }
  },
  computed: {
    FEATURE_FLAG() {
      return FEATURE_FLAG
    }
  },
  async mounted() {
    this.analogRefreshTask = this.$scheduler.enqueue(50, new AnalogRequest(), response => {
      this.voltage = response.voltage
    })
    await this.loadFeatures()
    await this.loadSettings(
      'gyro_hardware_lpf', 'looptime', 'i2c_speed', 'name',
      'acc_hardware', 'mag_hardware', 'baro_hardware', 'pitot_hardware', 'rangefinder_hardware', 'opflow_hardware',
      'align_board_roll', 'align_board_pitch', 'align_board_yaw', 'align_mag',
      'gps_provider', 'gps_sbas_mode', 'gps_ublox_use_galileo', 'tz_offset', 'tz_automatic_dst',
      '3d_deadband_low', '3d_deadband_high', '3d_neutral',
      'vtx_band', 'vtx_channel', 'vtx_power', 'vtx_low_power_disarm',
      'vbat_meter_type', 'bat_voltage_src', 'bat_cells', 'vbat_cell_detect_voltage',
      'vbat_min_cell_voltage', 'vbat_max_cell_voltage', 'vbat_warning_cell_voltage',
      'vbat_scale',
    )
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.analogRefreshTask)
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
