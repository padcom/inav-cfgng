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
                <input type="number" v-model.number="mixer.throttle" min="0" max="1" step="0.001" style="width: 100%;" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.roll" min="-2" max="2" step="0.001" style="width: 100%;" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.pitch" min="-2" max="2" step="0.001" style="width: 100%;" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.yaw" min="-2" max="2" step="0.001" style="width: 100%;" />
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
                <input type="number" v-model.number="mixer.target" style="width: 100%;" />
              </td>
              <td style="text-align: center;">
                <Dropdown v-model.number="mixer.input" :options="[
                  { value: 0, label: 'Stabilized Roll' },
                  { value: 1, label: 'Stabilized Pitch' },
                  { value: 2, label: 'Stabilized Yaw' },
                  { value: 3, label: 'Stabilized Throttle' },
                  { value: 4, label: 'RC Roll' },
                  { value: 5, label: 'RC Pitch' },
                  { value: 6, label: 'RC Yaw' },
                  { value: 7, label: 'RC Throttle' },
                  { value: 8, label: 'RC Channel 5' },
                  { value: 9, label: 'RC Channel 6' },
                  { value: 10, label: 'RC Channel 7' },
                  { value: 11, label: 'RC Channel 8' },
                  { value: 12, label: 'Gimbal Pitch' },
                  { value: 13, label: 'Gimbal Roll' },
                  { value: 14, label: 'Flaps' },
                  { value: 15, label: 'RC Channel 9' },
                  { value: 16, label: 'RC Channel 10' },
                  { value: 17, label: 'RC Channel 11' },
                  { value: 18, label: 'RC Channel 12' },
                  { value: 19, label: 'RC Channel 13' },
                  { value: 20, label: 'RC Channel 14' },
                  { value: 21, label: 'RC Channel 15' },
                  { value: 22, label: 'RC Channel 16' },
                  { value: 23, label: 'Stabilized Roll+' },
                  { value: 24, label: 'Stabilized Roll-' },
                  { value: 25, label: 'Stabilized Pitch+' },
                  { value: 26, label: 'Stabilized Pitch-' },
                  { value: 27, label: 'Stabilized Yaw+' },
                  { value: 28, label: 'Stabilized Yaw-' },
                  { value: 29, label: 'MAX' },
                  { value: 30, label: 'GVAR 0' },
                  { value: 31, label: 'GVAR 1' },
                  { value: 32, label: 'GVAR 2' },
                  { value: 33, label: 'GVAR 3' },
                  { value: 34, label: 'GVAR 4' },
                  { value: 35, label: 'GVAR 5' },
                  { value: 36, label: 'GVAR 6' },
                  { value: 37, label: 'GVAR 7' },
                ]" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.rate" min="-1000" max="1000" style="width: 100%;" />
              </td>
              <td>
                <input type="number" v-model.number="mixer.rate" min="0" max="255" style="width: 100%;" />
              </td>
              <td style="text-align: center;">
                <Dropdown v-model.number="mixer.condition" :options="[
                  { value: -1, label: 'Always' },
                  { value: 0, label: 'Logic condition 0' },
                  { value: 1, label: 'Logic condition 1' },
                  { value: 2, label: 'Logic condition 2' },
                  { value: 3, label: 'Logic condition 3' },
                  { value: 4, label: 'Logic condition 4' },
                  { value: 5, label: 'Logic condition 5' },
                  { value: 6, label: 'Logic condition 6' },
                  { value: 7, label: 'Logic condition 7' },
                  { value: 8, label: 'Logic condition 8' },
                  { value: 9, label: 'Logic condition 9' },
                  { value: 10, label: 'Logic condition 10' },
                  { value: 11, label: 'Logic condition 11' },
                  { value: 12, label: 'Logic condition 12' },
                  { value: 13, label: 'Logic condition 13' },
                  { value: 14, label: 'Logic condition 14' },
                  { value: 15, label: 'Logic condition 15' },
                  { value: 16, label: 'Logic condition 16' },
                  { value: 17, label: 'Logic condition 17' },
                  { value: 18, label: 'Logic condition 18' },
                  { value: 19, label: 'Logic condition 19' },
                  { value: 20, label: 'Logic condition 20' },
                  { value: 21, label: 'Logic condition 21' },
                  { value: 22, label: 'Logic condition 22' },
                  { value: 23, label: 'Logic condition 23' },
                  { value: 24, label: 'Logic condition 24' },
                  { value: 25, label: 'Logic condition 25' },
                  { value: 26, label: 'Logic condition 26' },
                  { value: 27, label: 'Logic condition 27' },
                  { value: 28, label: 'Logic condition 28' },
                  { value: 29, label: 'Logic condition 29' },
                  { value: 30, label: 'Logic condition 30' },
                  { value: 31, label: 'Logic condition 31' },
                ]" />
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
import { v4 as uuid } from 'uuid'
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
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.mixerType = response.appliedMixerPreset
          })
        })
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
    async load() {
      await this.loadOutputMapping()
      await this.loadMainSettings()
      await this.loadMotorMixers()
      await this.loadServoMixers()
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
    async save() {
      await this.saveMainSettings()
      await this.saveMotorMixers()
      await this.saveServoMixers()
      await this.saveSettingsToEeprom()
      this.$log.info('Settings saved')
    },
    async saveAndReboot() {
      await this.work(async () => {
        await this.save()
        await this.reboot()
      })
      this.$router.push('/mixer')
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
      await this.loadMixer()
      await this.saveAndReboot()
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
</style>
