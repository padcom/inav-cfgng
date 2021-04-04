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
    </Column>
    <Column>
      <Panel title="Position Estimator">
        <NumericSetting item="inav_w_z_baro_p" label="Vertical position barometer weight" />
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
