<template>
  <Page>
    <PageHeader>Mixers</PageHeader>
    <Row>
      <Column>
        <Panel title="Platform Configuration">
          <DropdownField label="Platform type" v-model.number="platformType" :options="platformTypes" />
        </Panel>
      </Column>
      <Column>
        <Panel title="Mixer Preset">
          <Row>
            <img :src="`images/mixers/${mixerImage}.svg`" height="150" />
            <Dropdown class="mixer-type" v-model.number="mixerType" :options="mixerTypes" />
          </Row>
          <Row class="mixer-actions">
            <button class="action" @click="loadAndApplyMixerTemplate">Load and apply</button>
            <button class="action" @click="loadMixerTemplate">Load mixer</button>
          </Row>
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
import Dropdown from '../components/editors/Dropdown.vue'

import { useCommonCommands } from '../composables/common-commands'

import { PLATFORM } from '../models/platform'
import { MIXER } from '../models/mixer'

import { InavMixerRequest } from '../command/v2/InavMixer'
import { CommonMotorMixerRequest } from '../command/v2/CommonMotorMixer'
import { InavServoMixerRequest } from '../command/v2/InavServoMixer'

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
    Dropdown,
  },
  setup() {
    const { saveSettingsToEeprom, work, reboot } = useCommonCommands()

    return {
      saveSettingsToEeprom, work, reboot
    }
  },
  data() {
    return {
      platformType: 0,
      mixerType: 0,
      numberOfMotors: 0,
      numberOfServos: 0,
      outputMappings: [],
      motorMixers: [],
      servoMixers: [],
    }
  },
  computed: {
    platforms() {
      return Object.entries(PLATFORM)
        .map(([ id, platform ]) => ({ id, ...platform }))
        .filter(platform => platform.enabled)
    },
    platformTypes() {
      return this.platforms.map(platform => ({ label: platform.name, value: platform.id }))
    },
    platform() {
      return PLATFORM[this.platformType]
    },
    mixers() {
      return MIXER
        .filter(mixer => mixer.platform === this.platformType)
        .filter(mixer => mixer.enabled)
    },
    mixerTypes() {
      return this.mixers.map(mixer => ({ label: mixer.name, value: mixer.id }))
    },
    mixer() {
      return this.mixers.find(mixer => mixer.id === this.mixerType)
    },
    mixerImage() {
      return this.mixer?.image || 'custom'
    }
  },
  watch: {
    platformType: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          this.mixerType = this.mixers[0].id
        })
      },
    },
  },
  async mounted() {
    await this.load()
  },
  methods: {
    async loadMainSettings() {
      await this.work(async () => {
        const response = await this.$serial.query(new InavMixerRequest())
        this.platformType = response.platformType
        this.mixerType = response.appliedMixerPreset
        this.numberOfMotors = response.numberOfMotors
        this.numberOfServos = response.numberOfServos
      })
    },
    async loadMotorMixers() {
      await this.work(async () => {
        const response = await this.$serial.query(new CommonMotorMixerRequest())
        console.log(response)
        this.motorMixers = response.mixers
      })
    },
    async loadServoMixers() {
      await this.work(async () => {
        const response = await this.$serial.query(new InavServoMixerRequest())
        console.log(response)
        this.servoMixers = response.mixers
      })
    },
    async load() {
      await this.loadMainSettings()
      await this.loadMotorMixers()
      await this.loadServoMixers()
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
    async loadMixerTemplate() {
      await this.work(async () => {
        
      })
    },
    async loadAndApplyMixerTemplate() {
      await this.loadMixer()
      await this.saveAndReboot()
    }
  }
})
</script>

<style lang="scss" scoped>
.mixer-type {
  height: 20px;
  // margin-top: 10px;
  margin-left: 24px;
}

.mixer-actions {
  flex-direction: row;
  justify-content: flex-end;
}
</style>
