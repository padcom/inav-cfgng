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
        <NumericSetting item="inav_w_z_baro_p" label="Vertical position barometer weight">
          <Warning>
            This value should be changed very carefully. In most cases there is not need to change that. For advanced users only!
          </Warning>
        </NumericSetting>
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
      <Panel title="Waypoint Navigation Settings">
        <NumericSetting item="nav_wp_radius" label="Waypoint radius [cm]" />
        <NumericSetting item="nav_wp_safe_distance" label="Waypoint safe distance [cm]" />
      </Panel>
      <Panel title="Multirotor braking mode configuration">
        <NumericSetting item="nav_mc_braking_speed_threshold" label="Min. speed threshold [cm/s]" />
        <NumericSetting item="nav_mc_braking_disengage_speed" label="Braking disengage speed [cm/s]" />
        <NumericSetting item="nav_mc_braking_timeout" label="Max. braking duration [ms]" />
        <NumericSetting item="nav_mc_braking_boost_factor" label="Boost factor [%]" />
        <NumericSetting item="nav_mc_braking_boost_timeout" label="Max. braking boost duration [ms]" />
        <NumericSetting item="nav_mc_braking_boost_speed_threshold" label="Boost min. speed threshold [cm/s]" />
        <NumericSetting item="nav_mc_braking_boost_disengage_speed" label="Braking boost disengage speed [cm/s]" />
        <NumericSetting item="nav_mc_braking_bank_angle" label="Max. bank angle [degrees]" />
      </Panel>
    </Column>
  </Page>

  <Actions>
    <button class="action" @click="saveAndReboot">Save and Reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Column from '../components/common/Column.vue'
import Panel from '../components/common/Panel.vue'
import Warning from '../components/common/Warning.vue'
import Actions from '../components/Actions.vue'
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'

import { useSettings } from '../composables/settings'
import { useCommonCommands } from '../composables/common-commands'

import { FEATURE_FLAG } from '../models/feature'

export default defineComponent({
  name: 'AdvancedTuningPage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Warning,
    Actions,
    DropdownSetting,
    NumericSetting,
    BoolSetting,
  },
  setup() {
    const { saveSettingsToEeprom, reboot, getSettingInfo, work } = useCommonCommands()
    const { load: loadSettings, save: saveSettings } = useSettings()

    return {
      saveSettingsToEeprom, reboot, getSettingInfo, work,
      loadSettings, saveSettings,
    }
  },
  data() {
    return { settings: [] }
  },
  computed: {
    FEATURE_FLAG() {
      return FEATURE_FLAG
    }
  },
  async mounted() {
    this.work(async () => {
      await this.loadSettings(...this.settings)
    })
  },
  methods: {
    async saveAndReboot() {
      this.work(async () => {
        await this.saveSettings(...this.settings)
        await this.saveSettingsToEeprom()
        await this.reboot()
        this.$router.push('/advanced-tuning')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.warning {
  margin-bottom: 8px;
}
</style>
