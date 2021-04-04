<template>
  <Page>
    <PageHeader>Advanced tuning</PageHeader>
    <Column>
      <Panel title="Multirotor navigation settings">
        <DropdownSetting item="nav_user_control_mode" label="User Control Mode" />
        <NumericSetting item="nav_auto_speed" label="Max. navigation speed [cm/s]" />
        <NumericSetting item="nav_manual_speed" label="Max. CRUISE speed [cm/s]" />
        <NumericSetting item="nav_auto_climb_rate" label="Max. navigation climb rate [cm/s]" />
        <NumericSetting item="nav_manual_climb_rate" label="Max. ALTHOLD climb rate [cm/s]" />
        <NumericSetting item="nav_mc_bank_angle" label="Multirotor max. banking angle [degrees]" />
        <BoolSetting item="nav_use_midthr_for_althold" label="Use mid. throttle for ALTHOLD" />
        <NumericSetting item="nav_mc_hover_thr" label="Hover throttle" />
      </Panel>
      <Panel title="RTH and Landing settings">
        <DropdownSetting item="nav_rth_alt_mode" label="RTH altitude mode" />
        <NumericSetting item="nav_rth_altitude" label="RTH altitude [cm]" />
        <NumericSetting item="nav_rth_home_altitude" label="RTH Home altitude [cm]" />
        <BoolSetting item="nav_rth_climb_first" label="Climb before RTH" />
        <BoolSetting item="nav_rth_climb_ignore_emerg" label="Climb regardless of position sensors health" />
        <BoolSetting item="nav_rth_tail_first" label="Tail first" />
        <DropdownSetting item="nav_rth_allow_landing" label="Land after RTH" />
        <NumericSetting item="nav_landing_speed" label="Landing vertical speed [cm/s]" />
        <NumericSetting item="nav_land_slowdown_minalt" label="Min. vertical landing speed at altitude [cm]" />
        <NumericSetting item="nav_land_slowdown_maxalt" label="Vertical landing speed slowdown at altitude [cm]" />
        <NumericSetting item="nav_min_rth_distance" label="Min. RTH distance [cm]" />
        <NumericSetting item="nav_rth_abort_threshold" label="RTH abort threshold [cm]" />
        <NumericSetting item="nav_emerg_landing_speed" label="Emergency landing speed [cm/s]" />
      </Panel>
      <Panel title="Fixed Wing Auto Launch Settings">
        <NumericSetting item="nav_fw_launch_idle_thr" label="Idle Throttle [uS]" />
        <NumericSetting item="nav_fw_launch_max_angle" label="Max Throw Angle [°]" />
        <NumericSetting item="nav_fw_launch_velocity" label="Threshold Velocity [cm/s]" />
        <NumericSetting item="nav_fw_launch_accel" label="Threshold Acceleration [cm/s/s]" />
        <NumericSetting item="nav_fw_launch_detect_time" label="Detect Time [ms]" />
        <NumericSetting item="nav_fw_launch_motor_delay" label="Motor Delay [ms]" />
        <NumericSetting item="nav_fw_launch_min_time" label="Minimum Launch Time [ms]" />
        <NumericSetting item="nav_fw_launch_spinup_time" label="Motor Spinup Time [ms]" />
        <NumericSetting item="nav_fw_launch_thr" label="Launch Throttle [uS]" />
        <NumericSetting item="nav_fw_launch_climb_angle" label="Climb Angle [°]" />
        <NumericSetting item="nav_fw_launch_timeout" label="Launch Timeout [ms]" />
        <NumericSetting item="nav_fw_launch_max_altitude" label="Maximum Altitude [cm]" />
        <NumericSetting item="nav_fw_launch_end_time" label="End Transition Time [ms]" />
      </Panel>
    </Column>
    <Column>
      <Panel title="Position Estimator">
        <NumericSetting item="inav_w_z_baro_p" label="Vertical position barometer weight" />
        <NumericSetting item="inav_w_z_gps_p" label="Vertical position GPS weight" />
        <NumericSetting item="inav_w_z_gps_v" label="Vertical speed GPS weight" />
        <NumericSetting item="inav_w_xy_gps_p" label="Horizontal position GPS weight" />
        <NumericSetting item="inav_w_xy_gps_v" label="Horizontal speed GPS weight" />
        <NumericSetting item="gps_min_sats" label="Min. GPS satellites for a valid fix" />
      </Panel>
      <Panel title="Fixed Wing Navigation Settings">
        <NumericSetting item="nav_fw_cruise_thr" label="Cruise throttle" />
        <NumericSetting item="nav_fw_cruise_yaw_rate" label="Cruise Yaw Rate" />
        <BoolSetting item="nav_fw_allow_manual_thr_increase" label="Allow manual throttle increase" />
        <NumericSetting item="nav_fw_min_thr" label="Min. throttle" />
        <NumericSetting item="nav_fw_max_thr" label="Max. throttle" />
        <NumericSetting item="nav_fw_bank_angle" label="Max. bank angle [degrees]" />
        <NumericSetting item="nav_fw_climb_angle" label="Max. climb angle [degrees]" />
        <NumericSetting item="nav_fw_dive_angle" label="Max. dive angle [degrees]" />
        <NumericSetting item="nav_fw_pitch2thr" label="Pitch to throttle ratio" />
        <NumericSetting item="nav_fw_loiter_radius" label="Loiter radius [cm]" />
        <DropdownSetting item="fw_loiter_direction" label="Loiter direction" />
        <NumericSetting item="nav_fw_control_smoothness" label="Control Smoothness" />
      </Panel>
    </Column>
  </Page>

  <Actions>
    <button @click="saveAndReboot" class="action">Save and Reboot</button>
    <button @click="test">Testme</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Column from '../components/common/Column.vue'
import Panel from '../components/common/Panel.vue'
import Actions from '../components/Actions.vue'
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'
import FeatureSetting from '../components/editors/FeatureSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'

import { useSettings } from '../composables/settings'
import { useFeatures } from '../composables/features'
import { useCommonCommands } from '../composables/common-commands'

import { FEATURE_FLAG } from '../models/feature'

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
  },
  setup() {
    const { saveSettingsToEeprom, reboot, getSettingInfo } = useCommonCommands()
    const { settings, load: loadSettings, save: saveSettings } = useSettings()
    const { features, load: loadFeatures, save: saveFeatures } = useFeatures()

    return {
      saveSettingsToEeprom, reboot, getSettingInfo,
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
      'nav_user_control_mode',
      'inav_w_z_baro_p',
      'nav_auto_speed',
      'nav_manual_speed',
      'nav_auto_climb_rate',
      'nav_manual_climb_rate',
      'nav_mc_bank_angle',
      'nav_use_midthr_for_althold',
      'nav_mc_hover_thr',
      'nav_rth_alt_mode',
      'nav_rth_altitude',
      'nav_rth_home_altitude',
      'nav_rth_climb_first',
      'nav_rth_climb_ignore_emerg',
      'nav_rth_tail_first',
      'nav_rth_allow_landing',
      'nav_landing_speed',
      'nav_land_slowdown_minalt',
      'nav_land_slowdown_maxalt',
      'nav_min_rth_distance',
      'nav_rth_abort_threshold',
      'nav_emerg_landing_speed',
      'nav_fw_launch_idle_thr',
      'nav_fw_launch_max_angle',
      'nav_fw_launch_velocity',
      'nav_fw_launch_accel',
      'nav_fw_launch_detect_time',
      'nav_fw_launch_motor_delay',
      'nav_fw_launch_min_time',
      'nav_fw_launch_spinup_time',
      'nav_fw_launch_thr',
      'nav_fw_launch_climb_angle',
      'nav_fw_launch_timeout',
      'nav_fw_launch_max_altitude',
      'nav_fw_launch_end_time',
      'inav_w_z_baro_p',
      'inav_w_z_gps_p',
      'inav_w_z_gps_v',
      'inav_w_xy_gps_p',
      'inav_w_xy_gps_v',
      'gps_min_sats',
      'nav_fw_cruise_thr',
      'nav_fw_cruise_yaw_rate',
      'nav_fw_allow_manual_thr_increase',
      'nav_fw_min_thr',
      'nav_fw_max_thr',
      'nav_fw_bank_angle',
      'nav_fw_climb_angle',
      'nav_fw_dive_angle',
      'nav_fw_pitch2thr',
      'nav_fw_loiter_radius',
      'fw_loiter_direction',
      'nav_fw_control_smoothness',
    )
  },
  methods: {
    async saveAndReboot() {
      await this.saveFeatures()
      await this.saveSettings(
        'nav_user_control_mode',
        'inav_w_z_baro_p',
        'nav_auto_speed',
        'nav_manual_speed',
        'nav_auto_climb_rate',
        'nav_manual_climb_rate',
        'nav_mc_bank_angle',
        'nav_use_midthr_for_althold',
        'nav_mc_hover_thr',
        'nav_rth_alt_mode',
        'nav_rth_altitude',
        'nav_rth_home_altitude',
        'nav_rth_climb_first',
        'nav_rth_climb_ignore_emerg',
        'nav_rth_tail_first',
        'nav_rth_allow_landing',
        'nav_landing_speed',
        'nav_land_slowdown_minalt',
        'nav_land_slowdown_maxalt',
        'nav_min_rth_distance',
        'nav_rth_abort_threshold',
        'nav_emerg_landing_speed',
        'nav_fw_launch_idle_thr',
        'nav_fw_launch_max_angle',
        'nav_fw_launch_velocity',
        'nav_fw_launch_accel',
        'nav_fw_launch_detect_time',
        'nav_fw_launch_motor_delay',
        'nav_fw_launch_min_time',
        'nav_fw_launch_spinup_time',
        'nav_fw_launch_thr',
        'nav_fw_launch_climb_angle',
        'nav_fw_launch_timeout',
        'nav_fw_launch_max_altitude',
        'nav_fw_launch_end_time',
        'inav_w_z_baro_p',
        'inav_w_z_gps_p',
        'inav_w_z_gps_v',
        'inav_w_xy_gps_p',
        'inav_w_xy_gps_v',
        'gps_min_sats',
        'nav_fw_cruise_thr',
        'nav_fw_cruise_yaw_rate',
        'nav_fw_allow_manual_thr_increase',
        'nav_fw_min_thr',
        'nav_fw_max_thr',
        'nav_fw_bank_angle',
        'nav_fw_climb_angle',
        'nav_fw_dive_angle',
        'nav_fw_pitch2thr',
        'nav_fw_loiter_radius',
        'fw_loiter_direction',
        'nav_fw_control_smoothness',
      )
      await this.saveSettingsToEeprom()
      await this.reboot()
      this.$router.push('/advanced-tuning')
    },
    async test() {
      console.log((await this.getSettingInfo('inav_w_z_baro_p')).toString())
    }
  }
})
</script>
