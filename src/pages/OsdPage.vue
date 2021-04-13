<template>
  <Page>
    <PageHeader>OSD</PageHeader>
    <Row style="margin-bottom: 16px;">
      <Dropdown v-model="layout" :options="[
        { label: 'Default', value: 0 },
        { label: 'Alternative Layout #1', value: 1 },
        { label: 'Alternative Layout #2', value: 2 },
        { label: 'Alternative Layout #3', value: 3 },
      ]" />
    </Row>
    <Row>
      <Column>
        <Panel v-if="items.length > 0" v-for="group in settingGroups" :key="group.title" :title="group.title">
          <BoolField v-for="item in group.items" :key="item"
            v-model="item.isVisible"
            :label="item.name"
            :description="item.description"
            :highlight="item.highlight"
            @mouseenter="item.highlight = true"
            @mouseleave="item.highlight = false"
            @update:modelValue="saveItem(item)"
          />
        </Panel>
      </Column>
      <Column width="382px" style="align-self: flex-start; position: sticky; top: 92px;">
        <Panel title="Preview">
          <DragContainer ref="osd" class="osd-editor" :style="{
            width: '360px',
            height: `${osdEditorHeight}px`,
          }">
            <DragItem v-for="item in fixedItems" :key="item.index"
              v-model="item.position"
              :fixed="true"
              :class="{ highlight: item.highlight }"
              :gridCellWidth="12"
              :gridCellHeight="18"
              :title="JSON.stringify(item)"
              @mouseenter="item.highlight = true"
              @mouseleave="item.highlight = false"
            >
              <String :value="getItemText(item.index)" />
            </DragItem>
            <DragItem v-for="item in movableItems" :key="item.index"
              v-model="item.position"
              :class="{ highlight: item.highlight }"
              :gridCellWidth="12"
              :gridCellHeight="18"
              :title="JSON.stringify(item)"
              @mouseenter="item.highlight = true"
              @mouseleave="item.highlight = false"
              @update:modelValue="saveItem(item)"
            >
              <String :value="getItemText(item.index)" />
            </DragItem>
          </DragContainer>
        </Panel>
      </Column>
      <Column>
        <Panel title="Settings">
          <DropdownSetting item="osd_video_system" label="Video Format" :autosave="true" />
          <DropdownSetting item="osd_units" label="Units" :autosave="true" />
          <NumericSetting item="osd_main_voltage_decimals" label="Voltage Decimals" :autosave="true" />
          <NumericSetting item="osd_plus_code_digits" label="Plus Code Digits" :autosave="true" />
          <DropdownSetting item="osd_crosshairs_style" label="Crosshair Style" :autosave="true" />
          <DropdownSetting item="osd_left_sidebar_scroll" label="Left Sidebar Scroll" :autosave="true" />
          <DropdownSetting item="osd_right_sidebar_scroll" label="Right Sidebar Scroll" :autosave="true" />
          <DropdownSetting item="osd_crsf_lq_format" label="Crossfire LQ Format" :autosave="true" />
          <BoolSetting item="osd_sidebar_scroll_arrows" label="Sidebar Scroll Arrows" :autosave="true" />
        </Panel>
        <Panel title="Alarms">
          <NumericSetting item="osd_rssi_alarm" label="RSSI (%)" :autosave="true" />
          <NumericSetting item="osd_time_alarm" label="Fly Time (minutes)" :autosave="true" />
          <NumericSetting item="osd_alt_alarm" label="Altitude (meters)" :autosave="true" />
          <NumericSetting item="osd_neg_alt_alarm" label="Negative Altitude (meters)" :autosave="true" />
          <NumericSetting item="osd_dist_alarm" label="Distance (meters)" :autosave="true" />
          <NumericSetting item="osd_gforce_alarm" label="g force" :autosave="true" />
          <NumericSetting item="osd_gforce_axis_alarm_min" label="g force axis min" :autosave="true" />
          <NumericSetting item="osd_gforce_axis_alarm_max" label="g force axis max" :autosave="true" />
          <NumericSetting item="osd_current_alarm" label="Current (A)" :autosave="true" />
          <NumericSetting item="osd_imu_temp_alarm_min" :scale="10" label="Minimum IMU temperature" :autosave="true" />
          <NumericSetting item="osd_imu_temp_alarm_max" :scale="10" label="Maximum IMU temperature" :autosave="true" />
          <NumericSetting item="osd_baro_temp_alarm_min" :scale="10" label="Minimum baro temperature" :autosave="true" />
          <NumericSetting item="osd_baro_temp_alarm_max" :scale="10" label="Maximum baro temperature" :autosave="true" />
          <NumericSetting item="osd_esc_temp_alarm_min" :scale="10" label="Minimum ESC temperature" :autosave="true" />
          <NumericSetting item="osd_esc_temp_alarm_max" :scale="10" label="Maximum ESC temperature" :autosave="true" />
          <NumericSetting item="osd_snr_alarm" label="Crossfire SNR Alarm Level" :autosave="true" />
          <NumericSetting item="osd_link_quality_alarm" label="Crossfire Link Quality Alarm" :autosave="true" />
        </Panel>
      </Column>
    </Row>
  </Page>

  <div v-if="true">
    <img v-for="char in FONT" :key="char" :src="`images/font/${char}.png`" :title="char" />
  </div>

  <Actions>
    <button class="action" @click="manageFont">Font manager</button>
    <button class="action" @click="save">Save</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'
import Column from '../components/common/Column.vue'
import Dropdown from '../components/editors/Dropdown.vue'
import Panel from '../components/common/Panel.vue'
import Actions from '../components/Actions.vue'
import DragContainer from '../components/common/DragContainer.vue'
import DragItem from '../components/common/DragItem.vue'
import String from './osd/String.vue'
import BoolField from '../components/editors/BoolField.vue'

import DropdownSetting from '../components/editors/DropdownSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'
import BoolSetting from '../components/editors/BoolSetting.vue'

import { useCommonCommands } from '../composables/common-commands'
import { useFont } from '../composables/font'
import { useSettings } from '../composables/settings'

import { InavOsdLayoutsRequest } from '../command/v2/InavOsdLayouts'
import { InavOsdSetLayoutItemRequest } from '../command/v2/InavOsdSetLayoutItem'
import { AnalogRequest } from '../command/v2/Analog'

import { FONT } from '../models/font'
import { OSD_GROUP, OSD_ITEM } from '../models/osd'

export default defineComponent({
  name: 'OsdPage',
  components: {
    Page,
    PageHeader,
    Row,
    Column,
    Dropdown,
    Panel,
    Actions,
    DragContainer,
    DragItem,
    String,
    BoolField,
    DropdownSetting,
    NumericSetting,
    BoolSetting,
  },
  setup() {
    const { work, saveSettingsToEeprom} = useCommonCommands()
    const { font, loadFonts } = useFont()
    const { load: loadSettings, settings: configuration  } = useSettings()

    return {
      work,
      saveSettingsToEeprom,
      loadSettings,
      configuration,
      font,
      loadFonts,
    }
  },
  data() {
    return {
      items: [],
      layout: 0,
      chars: {},
      left: 10,
      top: 10,
      draggedElement: null,
      dragOrigin: { x: 0, y: 0 },
      dragArea: {},
      analog: {},
      settings: [],
    }
  },
  computed: {
    osdEditorHeight() {
      if (this.configuration['osd_video_system']?.value === 2) {
        return 234
      } else {
        return 288
      }
    },
    settingGroups() {
      const result = OSD_GROUP.map(group => ({
        ...group,
        items: group.items.map(id => this.items.find(item => item.index === id))
      }))

      return result
    },
    enabledItems() {
      return this.items.filter(item => item.isVisible)
    },
    fixedItems() {
      return this.items.filter(item => item.isVisible && item.fixed)
    },
    movableItems() {
      return this.items.filter(item => item.isVisible && !item.fixed)
    },
    FONT() {
      return FONT
    },
  },
  watch: {
    layout() {
      this.loadOsdItems()  
    }
  },
  async created() {
    await this.loadFonts()
  },
  async mounted() {
    await this.load()
    this.analogRefreshTaskId = this.$scheduler.enqueue(50, new AnalogRequest(), response => {
      this.analog = response
    })
  },
  async beforeUnmount() {
    this.$scheduler.dequeue(this.analogRefreshTaskId)
  },
  methods: {
    async loadOsdItems() {
      this.items = []
      await this.work(async () => {
        const response = await this.$serial.query(new InavOsdLayoutsRequest(this.layout))
        this.items = response.items.map((item, index) => ({
          ...item,
          index,
          name: OSD_ITEM[index]?.name,
          description: OSD_ITEM[index]?.description,
          fixed: !!OSD_ITEM[index]?.position,
          position: !!OSD_ITEM[index]?.position ? OSD_ITEM[index].position : { x: item.column, y: item.line },
          highlight: false,
        }))
      })
    },
    async load() {
      await this.loadOsdItems()
      await this.loadSettings(...this.settings)
    },
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('OSD settings saved.')
      })
    },
    getItemText(index) {
      const item = OSD_ITEM[index] || { format: () => `FIXME${index}` }
      return item.format({ analog: this.analog, settings: this.configuration })
    },
    saveItem(item) {
      this.work(async () => {
        const request = new InavOsdSetLayoutItemRequest(
          this.layout,
          item.index,
          item.isVisible,
          item.position.x,
          item.position.y,
        )
        await this.$serial.query(request)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.osd-editor {
  background: url(./osd/osd-bg-1.jpg) no-repeat;
  background-size: 100%;
}

.highlight {
  background-color: rgba(255, 255, 255, 0.5);
}

</style>
