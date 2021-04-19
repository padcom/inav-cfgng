<template>
  <Page>
    <PageHeader>Mixers</PageHeader>

    <Row>
      <Column>
        <Panel title="Platform Configuration">
          <DropdownField label="Platform type" v-model.number="platformType" :options="platformTypes" />
          <BoolField v-show="platformType == 1" label="Has flaps" v-model.number="hasFlaps" />
        </Panel>
      </Column>
      <Column>
        <Panel title="Mixer Preset">
          <Row>
            <img :src="`images/mixers/${mixerImage}.svg`" height="150" />
            <Dropdown class="mixer-type" v-model.number="mixerType" :options="mixerTypes" />
          </Row>
          <Row class="panel-actions">
            <button class="action" @click="loadAndApplyMixerTemplate">Load and apply</button>
            <button class="action" @click="loadMixerTemplate">Load mixer</button>
          </Row>
        </Panel>
      </Column>
    </Row>
    <Row>
      <Panel title="Output Mapping">
        <table class="outputs">
          <tr>
            <th>Output</th>
            <td v-for="output in outputs" :key="output.name">
              {{ output.name }}
            </td>
          </tr>
          <tr>
            <th>Function</th>
            <td v-for="output in outputs" :key="output.name">
              {{ output.function }}
            </td>
          </tr>
        </table>
      </Panel>
    </Row>
    <Row>
      <Panel title="Motor Mixer">
        <table class="mixers">
          <thead>
            <tr>
              <th style="width: 70px;">Motor</th>
              <th>Throttle [T]</th>
              <th>Roll [A]</th>
              <th>Pitch [E]</th>
              <th>Yaw [R]</th>
              <th style="width: 70px;" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mixer, index) in motorMixers" :key="mixer.id">
              <td style="text-align: center;">{{ index + 1 }}</td>
              <td>
                <input type="number" v-model.number="mixer.throttle" min="0" max="1" step="0.001" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.roll" min="-2" max="2" step="0.001" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.pitch" min="-2" max="2" step="0.001" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.yaw" min="-2" max="2" step="0.001" />
              </td>
              <td>
                <button @click="deleteMotorMixer(index, mixer)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Row class="panel-actions">
          <button class="action" @click="addMotorMixer">Add new mixer rule</button>
        </Row>
      </Panel>
    </Row>
    <Row>
      <Panel title="Servo mixer">
        <table class="mixers">
          <thead>
            <tr>
              <th style="width: 70px">Servo</th>
              <th>Input</th>
              <th>Weight (%)</th>
              <th>Speed (10µs/s)</th>
              <th>Active</th>
              <th style="width: 70px">Servo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mixer in servoMixers" :key="mixer.id">
              <td style="text-align: center;">
                <input type="number" v-model.number="mixer.target" min="1" max="16" />
              </td>
              <td style="text-align: center;">
                <InputDropdown v-model.number="mixer.input" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.rate" min="-1000" max="1000" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.rate" min="0" max="255" />
              </td>
              <td style="text-align: center;">
                <LogicConditionDropdown v-model.number="mixer.condition" />
              </td>
              <td>
                <button @click="deleteServoMixer(index, mixer)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Row class="panel-actions">
          <button class="action" @click="addServoMixer">Add new mixer rule</button>
        </Row>
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
import BoolField from '../components/editors/BoolField.vue'
import Dropdown from '../components/editors/Dropdown.vue'
import InputDropdown from './mixer/InputDropdown.vue'
import LogicConditionDropdown from '../components/editors/LogicConditionDropdown.vue'

import { useCommonCommands } from '../composables/common-commands'

import { PLATFORM } from '../models/platform'
import { MIXER, MotorMixRule, ServoMixRule } from '../models/mixer'

import { InavMixerRequest } from '../command/v2/InavMixer'
import { InavSetMixerRequest } from '../command/v2/InavSetMixer'
import { InavOutputMappingRequest, OUTPUT_TYPE_FLAG } from '../command/v2/InavOutputMapping'
import { CommonMotorMixerRequest } from '../command/v2/CommonMotorMixer'
import { CommonSetMotorMixerRequest } from '../command/v2/CommonSetMotorMixer'
import { InavServoMixerRequest } from '../command/v2/InavServoMixer'
import { InavSetServoMixerRequest } from '../command/v2/InavSetServoMixer'

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
    BoolField,
    InputDropdown,
    LogicConditionDropdown,
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
      savedPlatformType: 0,
      hasFlaps: 0,
      mixerType: 0,
      numberOfMotors: 0,
      numberOfServos: 0,
      outputMappings: [],
      mrTimerMap: [],
      fwTimerMap: [],
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
    savedPlatform() {
      return PLATFORM[this.savedPlatformType]
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
    },
    timerMap() {
      return this.savedPlatform.isMultirotor ? this.mrTimerMap : this.fwTimerMap
    },
    outputs() {
      const result = []
      const servos = this.servoMixers.map(mixer => mixer.target).uniq().sort()
      const motors = this.motorMixers.map((mixer, index) => index + 1)
      for (let i = 0; i < this.timerMap.length; i++) {
        if ((this.timerMap[i] & OUTPUT_TYPE_FLAG.SERVO) && (servos.length > 0)) {
          result.push({ name: `S${i + 1}`, function: 'Servo ' + servos[0] })
          servos.shift()
        } else if ((this.timerMap[i] & OUTPUT_TYPE_FLAG.MOTOR) && (motors.length > 0)) {
          result.push({ name: `S${i + 1}`, function: 'Motor ' + motors[0] })
          motors.shift()
        } else {
          result.push({ name: `S${i + 1}`, function: '-' })
        }
      }
      return result
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
    async load() {
      await this.loadOutputMapping()
      await this.loadMainSettings()
      await this.loadMotorMixers()
      await this.loadServoMixers()
    },
    async loadMainSettings() {
      await this.work(async () => {
        const response = await this.$serial.query(new InavMixerRequest())
        this.platformType = response.platformType
        this.savedPlatformType = response.platformType
        this.yawMotorDirection = response.yawMotorDirection
        this.yawJumpPreventionLimit = response.yawJumpPreventionLimit
        this.hasFlaps = response.hasFlaps
        this.numberOfMotors = response.numberOfMotors
        this.numberOfServos = response.numberOfServos
        // this is due to synchronization of this.platformType and this.mixerType
        await this.$nextTick()
        await this.$nextTick()
        this.mixerType = response.appliedMixerPreset
      })
    },
    async loadOutputMapping() {
      await this.work(async () => {
        const response = await this.$serial.query(new InavOutputMappingRequest())
        this.outputMappings = response.mappings
        this.mrTimerMap = response.mrTimerMap
        this.fwTimerMap = response.fwTimerMap
      })
    },
    async loadMotorMixers() {
      await this.work(async () => {
        const response = await this.$serial.query(new CommonMotorMixerRequest())
        this.motorMixers = response.mixers
      })
    },
    async loadServoMixers() {
      await this.work(async () => {
        const response = await this.$serial.query(new InavServoMixerRequest())
        this.servoMixers = response.mixers
      })
    },
    async saveAndReboot() {
      await this.work(async () => {
        await this.save()
        await this.reboot()
      })
      this.$router.push('/mixer')
    },
    async save() {
      await this.saveMainSettings()
      await this.saveMotorMixers()
      await this.saveServoMixers()
      await this.saveSettingsToEeprom()
      this.$log.info('Settings saved')
    },
    async saveMainSettings() {
      await this.$serial.query(new InavSetMixerRequest(
        this.yawMotorDirection,
        this.yawJumpPreventionLimit,
        this.savedPlatformType,
        this.hasFlaps,
        this.mixerType
      ), 1000)
    },
    async saveMotorMixers() {
      for (let i = 0; i < 12; i++) {
        const mixer = this.motorMixers.length > i ? this.motorMixers[i] : MotorMixRule.empty()
        await this.$serial.query(new CommonSetMotorMixerRequest(i, mixer))
      }
    },
    async saveServoMixers() {
      for (let i = 0; i < 16; i++) {
        const mixer = this.servoMixers.length > i ? this.servoMixers[i] : ServoMixRule.empty()
        await this.$serial.query(new InavSetServoMixerRequest(i, mixer))
      }
    },
    async loadMixerTemplate() {
      await this.work(async () => {
        const template = MIXER.find(mixer => mixer.id === this.mixerType)
        this.motorMixers = template.motorMixer.map(mixer => mixer.clone())
        this.servoMixers = template.servoMixer.map(mixer => mixer.clone())
        this.savedPlatformType = this.platformType
      })
    },
    async loadAndApplyMixerTemplate() {
      await this.work(async () => {
        await this.loadMixerTemplate()
        await this.saveAndReboot()
      })
      this.$router.push('/mixer')
    },
    addMotorMixer() {
      this.motorMixers.push(new MotorMixRule(1, 0, 0, 0))
    },
    deleteMotorMixer(index, mixer) {
      this.motorMixers = this.motorMixers.filter(entry => mixer !== entry)
    },
    addServoMixer() {
      this.servoMixers.push(new ServoMixRule(1, 1, 1, 1, 0))
    },
    deleteServoMixer(index, mixer) {
      this.servoMixers = this.servoMixers.filter(entry => mixer !== entry)
    },
  }
})
</script>

<style lang="scss" scoped>
.mixer-type {
  height: 20px;
  margin-left: 24px;
}

.panel-actions {
  flex-direction: row;
  justify-content: flex-end;
}

table.outputs {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th {
    text-align: left;
    background-color: gray;
    color: white;
    padding: 6px 12px;
  }
  td {
    text-align: center;
    background-color: #EBE7E7;
  }
  th, td {
    border: solid 1px #F9F9F9;
    font-weight: bold;
  }
}

table.mixers {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 24px;

  tr {
    background-color: #F9F9F9;
  }
  tr:nth-of-type(even) {
    background-color: #EBE7E7;
  }

  th {
    background-color: #828885;
    color: white;
  }
  td, th {
    padding: 10px 12px;
    border-left: solid 1px #F9F9F9;
  }
}

input[type="number"] {
  width: 100%;
}
</style>
