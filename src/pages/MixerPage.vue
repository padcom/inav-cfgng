<template>
  <Page>
    <PageHeader>Mixers</PageHeader>
    <Row>
      <Column>
        <Panel title="Platform Configuration">
          <DropdownField label="Platform type" v-model="platformType" :options="platforms" />
        </Panel>
      </Column>
      <Column>
        <Panel title="Mixer Preset">
        </Panel>
      </Column>
    </Row>
    <Row>
      <Panel title="Output Mapping">
      </Panel>
    </Row>
    <Row>
      <Panel title="Motor Mixer">
      </Panel>
    </Row>
    <Row>
      <Panel title="Servo mixer">
      </Panel>
    </Row>
  </Page>

  <Actions>
    <button class="action" @click="saveAndReboot">Save and reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'
import Column from '../components/common/Column.vue'
import Panel from '../components/common/Panel.vue'
import Actions from '../components/Actions.vue'

import DropdownField from '../components/editors/DropdownField.vue'

import { useCommonCommands } from '../composables/common-commands'

import { PLATFORM } from '../models/platform'

import { InavMixerRequest } from '../command/v2/InavMixer'

export default defineComponent({
  name: 'MixersPage',
  components: {
    Page,
    PageHeader,
    Row,
    Column,
    Panel,
    Actions,
    DropdownField,
  },
  setup() {
    const { saveSettingsToEeprom, work, reboot } = useCommonCommands()

    return {
      saveSettingsToEeprom, work, reboot
    }
  },
  data() {
    return {
      platformType: 0
    }
  },
  computed: {
    platforms() {
      return PLATFORM.map(platform => ({ label: platform.name, value: platform.id }))
    },
  },
  async mounted() {
    await this.load()
  },
  methods: {
    async load() {
      this.work(async () => {
        const response = await this.$serial.query(new InavMixerRequest())
        console.log(response)
        this.platformType = response.platformType
      })
    },
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('Settings saved')
      })
    },
    async saveAndReboot() {
      await this.save()
      await this.reboot()
      this.$router.push('/outputs')
    },
  }
})
</script>
