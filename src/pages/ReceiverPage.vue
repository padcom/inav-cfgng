<template>
  <Page>
    <PageHeader>Receiver</PageHeader>
    <Column>
      <Channel v-for="(channel, index) in channels" :key="index" :index="index" :value="channel" />
    </Column>
    <Column>
      <Panel title="Receiver Mode">
        <DropdownSetting item="receiver_type" label="Receiver type" />
        <DropdownSetting v-if-setting.receiver_type="2" item="serialrx_provider" label="Serial Receiver Provider">
          <Info style="margin-bottom: 8px;">
            <p>Note: Remember to configure a Serial Port (via Ports tab) for the serial receiver</p>
          </Info>
        </DropdownSetting>
        <BoolSetting v-if-setting.receiver_type="2" item="serialrx_inverted" label="Serial Port inverted (comparing to protocol default)" />
        <DropdownSetting v-if-setting.receiver_type="2" item="serialrx_halfduplex" label="Serial receiver half-duplex" />
      </Panel>
      <Panel title="Curves">
        <NumericSetting item="thr_mid" :scale="100" label="Throttle Mid" />
        <NumericSetting item="thr_expo" label="Throttle Expo" />
        <NumericSetting item="deadband" label="RC Deadband" />
        <NumericSetting item="yaw_deadband" label="Yaw Deadband" />
        <NumericSetting item="rc_expo" :scale="100" label="RC Expo" />
        <NumericSetting item="manual_rc_expo" :scale="100" label="Manual RC Expo" />
        <NumericSetting item="rc_yaw_expo" :scale="100" label="RC Yaw Expo" />
        <NumericSetting item="manual_rc_yaw_expo" :scale="100" label="Manual RC Yaw Expo" />
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
import Info from '../components/common/Info.vue'
import Actions from '../components/Actions.vue'
import Condition from '../components/Condition.vue'
import Channel from './receiver/Channel.vue'
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'

import { useSettings } from '../composables/settings'
import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Info,
    Actions,
    Condition,
    Channel,
    DropdownSetting,
    BoolSetting,
    NumericSetting,
  },
  setup() {
    const { load: loadSettings, save: saveSettings } = useSettings()
    const { reboot, saveSettingsToEeprom } = useCommonCommands()

    return {
      loadSettings,
      saveSettings,
      reboot,
      saveSettingsToEeprom,
    }
  },
  data() {
    return {
      settings: [],
      channels: [],
    }
  },
  async mounted() {
    this.refreshChannelsTaskId = this.$scheduler.enqueue(10, new RcRequest(), response => {
      this.channels = response.channels
    })

    await this.loadSettings(...this.settings)
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
  methods: {
    async saveAndReboot() {
      await this.saveSettings(...this.settings)
      await this.saveSettingsToEeprom()
      await this.reboot()
      this.$router.push('/receiver')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
