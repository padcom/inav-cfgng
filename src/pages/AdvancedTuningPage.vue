<template>
  <Page>
    <PageHeader>Advanced tuning</PageHeader>
    <Column>
      <Panel title="Multirotor navigation settings">
        <DropdownSetting item="nav_user_control_mode" label="User Control Mode" />
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
    )
  },
  methods: {
    async saveAndReboot() {
      await this.saveFeatures()
      await this.saveSettings(
        'nav_user_control_mode',
        'inav_w_z_baro_p',
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
