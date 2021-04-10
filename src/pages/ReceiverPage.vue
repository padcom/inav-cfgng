<template>
  <Page>
    <PageHeader>Receiver</PageHeader>
    <Column>
      <Panel title="Receiver settings">
        <DropdownField v-model="mappings" label="Channel mapping" :options="[
          { label: 'Default', value: '0,1,3,2' },
          { label: 'Futaba / Hitec', value: '0,1,3,2' },
          { label: 'JR / Spectrum', value: '1,2,3,0' },
        ]" />
        <DropdownSetting v-show="!isCrossfireRx" item="rssi_channel" label="RSSI Channel" :options="rssiChannels" />
      </Panel>
      <Panel title="Channel preview">
        <Channel v-for="(channel, index) in channels" :key="index" :index="index" :value="channel" />
      </Panel>
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
        <NumericSetting item="thr_expo" :scale="100" label="Throttle Expo" />
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
import Channel from './receiver/Channel.vue'
import DropdownField from '../components/editors/DropdownField.vue'
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'

import { useSettings } from '../composables/settings'
import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'
import { RxMapRequest } from '../command/v1/RxMap'
import { SetRxMapRequest } from '../command/v1/SetRxMap'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Info,
    Actions,
    Channel,
    DropdownField,
    DropdownSetting,
    BoolSetting,
    NumericSetting,
  },
  setup() {
    const { settings: sx, load: loadSettings, save: saveSettings } = useSettings()
    const { reboot, saveSettingsToEeprom, work } = useCommonCommands()

    return {
      sx,
      loadSettings,
      saveSettings,
      reboot,
      saveSettingsToEeprom,
      work,
    }
  },
  data() {
    return {
      settings: [],
      channels: [],
      mappings: '0,1,3,2',
    }
  },
  computed: {
    rssiChannels() {
      const result = [{ label: 'Disabled', value: 0 }]
      for (let i = 0; i < this.channels.length; i++) {
        result.push({ label: i + 1, value: i + 1 })
      }

      return result
    },
    isCrossfireRx() {
      return this.sx['receiver_type'].value == 2 && this.sx['serialrx_provider'].value == 9
    }
  },
  async mounted() {
    this.refreshChannelsTaskId = this.$scheduler.enqueue(10, new RcRequest(), response => {
      this.channels = response.channels
    })

    this.work(async () => {
      await this.loadSettings(...this.settings)
      const response = await this.$serial.query(new RxMapRequest())
      this.mappings = response.mappings.join(',')
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
  methods: {
    async saveAndReboot() {
      this.work(async () => {
        const mappings = this.mappings.split(',').map(channel => parseInt(channel))
        await this.$serial.query(new SetRxMapRequest(mappings))
        await this.saveSettings(...this.settings)
        await this.saveSettingsToEeprom()
        await this.reboot()
        this.$router.push('/receiver')
      })
    }
  }
})
</script>
