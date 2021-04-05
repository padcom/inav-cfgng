<template>
  <Page>
    <PageHeader>Receiver</PageHeader>
    <Column>
      <Channel v-for="(channel, index) in channels" :key="index" :index="index" :value="channel" />
    </Column>
    <Column>
      <Panel title="Receiver Mode">
        <DropdownSetting item="receiver_type" label="Receiver type" />
        <Condition item="receiver_type" value="2">
          <Info style="margin-top: 8px;">
            <p>Note: Remember to configure a Serial Port (via Ports tab) for the serial receiver</p>
          </Info>
          <DropdownSetting item="serialrx_provider" label="Serial Receiver Provider" />
          <BoolSetting item="serialrx_inverted" label="Serial Port inverted (comparing to protocol default)" />
          <DropdownSetting item="serialrx_halfduplex" label="Serial receiver half-duplex" />
        </Condition>
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
import Info from '../components/common/Info.vue'
import Actions from '../components/Actions.vue'
import Condition from '../components/Condition.vue'
import Channel from '../components/common/Channel.vue'
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
