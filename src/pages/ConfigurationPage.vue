<template>
  <Page>
    <PageHeader>Configuration</PageHeader>
    <Column>
      <Panel title="Sysem configuration">
        <DropdownSetting item="gyro_hardware_lpf" label="Gyroscope LPF cutoff frequency" />
        <DropdownSetting item="looptime" label="Flight Controller Loop Time" />
        <DropdownSetting item="i2c_speed" label="I2C Speed" />
      </Panel>
      <Panel title="Sensors">
        <DropdownSetting item="acc_hardware" label="Accelerometer" />
        <DropdownSetting item="mag_hardware" label="Magnetometer" />
        <DropdownSetting item="baro_hardware" label="Barometer" />
        <DropdownSetting item="pitot_hardware" label="Pitot tube" />
        <DropdownSetting item="rangefinder_hardware" label="Rangefinder" />
        <DropdownSetting item="opflow_hardware" label="Optical flow" />
      </Panel>
      <Panel title="Board and Sensor Alignment">
        <NumericSetting item="align_board_roll" label="Roll degrees" :scale="10" />
        <NumericSetting item="align_board_pitch" label="Pitch degrees" :scale="10" />
        <NumericSetting item="align_board_yaw" label="Yaw degrees" :scale="10" />
        <DropdownSetting item="align_mag" label="Magnetometer alignment" />
      </Panel>
      <Panel title="GPS">
        <FeatureSetting :flag="FEATURE_FLAG.GPS" label="GPS for navigation and telemetry" />
        <DropdownSetting item="gps_provider" label="Protocol" />
        <DropdownSetting item="gps_sbas_mode" label="Ground Assistance Type" />
        <BoolSetting item="gps_ublox_use_galileo" label="Gps use Galileo Satellites" />
        <NumericSetting item="tz_offset" label="Timezone Offset [Mins]" />
        <DropdownSetting item="tz_automatic_dst" label="Automatic Daylight Savings Time" />
      </Panel>
      <Panel title="Reversible motors">
        <NumericSetting item="3d_deadband_low" label="Reversible Motors Deadband Low" />
        <NumericSetting item="3d_deadband_high" label="Reversible Motors Deadband High" />
        <NumericSetting item="3d_neutral" label="Reversible Motors Neutral" />
      </Panel>
      <Panel title="Personalzation">
        <StringSetting item="name" label="Craft name" />
      </Panel>
      <Panel title="VTX">
        <DropdownSetting item="vtx_band" label="Band" />
        <DropdownSetting item="vtx_channel" label="Channel" />
        <DropdownSetting item="vtx_power" label="Power Level" />
        <DropdownSetting item="vtx_low_power_disarm" label="Use low power while the craft is disarmed" />
      </Panel>
    </Column>
    <Column>
      <Panel title="Battery voltage">
        <FeatureSetting :flag="FEATURE_FLAG.VBAT" label="Battery voltage monitoring" />
        <DropdownSetting item="vbat_meter_type" label="Voltage Meter Type" />
        <DropdownSetting item="bat_voltage_src" label="Voltage source to use for alarms and telemetry" />
        <NumericSetting item="bat_cells" label="Number of cells (0 = auto)" />
        <NumericSetting item="vbat_cell_detect_voltage" :scale="10" label="Maximum cell voltage for cell count detection" />
        <NumericSetting item="vbat_min_cell_voltage" :scale="10" label="Minimum Cell Voltage" />
        <NumericSetting item="vbat_max_cell_voltage" :scale="10" label="Maximum Cell Voltage" />
        <NumericSetting item="vbat_warning_cell_voltage" :scale="10" label="Warning Cell Voltage (%)" />
        <NumericSetting item="vbat_scale" label="Voltage Scale" />
        <ReadonlySetting :value="voltage" label="Voltage" />
      </Panel>
      <Panel title="Current Sensor">
        <FeatureSetting :flag="FEATURE_FLAG.CURRENT_METER" label="Battery current monitoring" />
        <DropdownSetting item="current_meter_type" label="Current Meter Type" />
        <NumericSetting item="current_meter_scale" label="Scale the output voltage to milliamps [1/10th mV/A]" />
        <NumericSetting item="current_meter_offset" label="Offset in millivolt steps" />
        <ReadonlySetting :value="current" label="Battery Current" />
      </Panel>
      <Panel title="Battery Capacity">
        <DropdownSetting item="battery_capacity_unit" label="Unit" />
        <NumericSetting item="battery_capacity" label="Capacity" />
        <NumericSetting item="battery_capacity_warning" :scale="10" label="Warning Capacity (remaining %)" />
        <NumericSetting item="battery_capacity_critical" :scale="10" label="Critical Capacity (remaining %)" />
      </Panel>
      <Panel title="Other features">
        <FeatureSetting :flag="FEATURE_FLAG.MOTOR_STOP" label="Stop motors on low throttle" />
        <FeatureSetting :flag="FEATURE_FLAG.SOFTSERIAL" label="Enable CPU based serial ports" />
        <FeatureSetting :flag="FEATURE_FLAG.TELEMETRY" label="Telemetry output" />
        <FeatureSetting :flag="FEATURE_FLAG.REVERSIBLE_MOTORS" label="Reversible motors mode (for use with reversible ESCs)" />
        <FeatureSetting :flag="FEATURE_FLAG.RSSI_ADC" label="Analog RSSI input" />
        <FeatureSetting :flag="FEATURE_FLAG.LED_STRIP" label="Multi-color RGB LED strip support" />
        <FeatureSetting :flag="FEATURE_FLAG.DASHBOARD" label="OLED Screen Display" />
        <FeatureSetting :flag="FEATURE_FLAG.BLACKBOX" label="Blackbox flight data recorder" />
        <FeatureSetting :flag="FEATURE_FLAG.PWM_OUTPUT_ENABLE" label="Enable motor and servo output" />
        <FeatureSetting :flag="FEATURE_FLAG.SOFTSPI" label="CPU based SPI" />
        <FeatureSetting :flag="FEATURE_FLAG.PWM_SERVO_DRIVER" label="External PWM servo driver" />
        <FeatureSetting :flag="FEATURE_FLAG.OSD" label="OSD" />
        <FeatureSetting :flag="FEATURE_FLAG.AIRMODE" label="Permanently enable AIRMODE" />
        <FeatureSetting :flag="FEATURE_FLAG.FW_LAUNCH" label="Permanently enable Launch Mode for Fixed Wing" />
        <FeatureSetting :flag="FEATURE_FLAG.TX_PROF_SEL" label="Profile selection with TX stick command" />
        <FeatureSetting :flag="FEATURE_FLAG.THR_VBAT_COMP" label="Throttle voltage compensation" />
        <FeatureSetting :flag="FEATURE_FLAG.BAT_PROFILE_AUTOSWITCH" label="Automatic battery profile selection" />
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
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'
import FeatureSetting from '../components/editors/FeatureSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'
import StringSetting from '../components/editors/StringSetting.vue'
import ReadonlySetting from '../components/editors/ReadonlySetting.vue'

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
    DropdownSetting,
    NumericSetting,
    FeatureSetting,
    BoolSetting,
    StringSetting,
    ReadonlySetting,
  },
  setup() {
    const { settings, load: loadSettings, save: saveSettings } = useSettings()
    const { features, load: loadFeatures, save: saveFeatures } = useFeatures()
    const voltage = ref(0)
    const current = ref(0)

    return {
      settings, loadSettings, saveSettings,
      features, loadFeatures, saveFeatures,
      voltage, current
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
      this.current = response.current
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
      'current_meter_type', 'current_meter_scale', 'current_meter_offset',
      'battery_capacity_unit', 'battery_capacity', 'battery_capacity_warning', 'battery_capacity_critical',
    )
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.analogRefreshTask)
  }
})
</script>
