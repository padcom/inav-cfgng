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
          />
        </Panel>
      </Column>
      <Column width="382px" style="align-self: flex-start; position: sticky; top: 92px;">
        <Panel title="Preview">
          <DragContainer ref="osd" class="osd-editor" :style="{
            width: '352px',
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
            >
              <String :value="getItemText(item.index)" />
            </DragItem>
          </DragContainer>
        </Panel>
      </Column>
      <Column>
        <Panel title="Settings">
          <DropdownSetting item="osd_video_system" label="Video Format" />
          <DropdownSetting item="osd_units" label="Units" />
          <NumericSetting item="osd_main_voltage_decimals" label="Voltage Decimals" />
          <NumericSetting item="osd_plus_code_digits" label="Plus Code Digits" />
          <DropdownSetting item="osd_crosshairs_style" label="Crosshair Style" />
          <DropdownSetting item="osd_left_sidebar_scroll" label="Left Sidebar Scroll" />
          <DropdownSetting item="osd_right_sidebar_scroll" label="Right Sidebar Scroll" />
          <DropdownSetting item="osd_crsf_lq_format" label="Crossfire LQ Format" />
          <BoolSetting item="osd_sidebar_scroll_arrows" label="Sidebar Scroll Arrows" />
        </Panel>
        <Panel title="Alarms">
        </Panel>
      </Column>
    </Row>
  </Page>

  <div v-if="false">
    <img v-for="char in FONT" :key="char" :src="`images/font/${char}.png`" :title="char" />
  </div>

  <Actions>
    <button class="action" @click="manageFont">Font manager</button>
    <button class="action" @click="load">Reload</button>
    <button class="action" @click="save">Save</button>
  </Actions>
</template>

<script>
// osd_video_system = AUTO
// osd_row_shiftdown = 0
// osd_units = METRIC
// osd_stats_energy_unit = MAH
// osd_rssi_alarm = 30
// osd_time_alarm = 45
// osd_alt_alarm = 300
// osd_dist_alarm = 5000
// osd_neg_alt_alarm = 5
// osd_current_alarm = 5
// osd_gforce_alarm =  5.000
// osd_gforce_axis_alarm_min = -5.000
// osd_gforce_axis_alarm_max =  5.000
// osd_imu_temp_alarm_min = -200
// osd_imu_temp_alarm_max = 600
// osd_esc_temp_alarm_max = 900
// osd_esc_temp_alarm_min = -200
// osd_baro_temp_alarm_min = -200
// osd_baro_temp_alarm_max = 600
// osd_snr_alarm = 4
// osd_link_quality_alarm = 70
// osd_temp_label_align = LEFT
// osd_artificial_horizon_reverse_roll = OFF
// osd_artificial_horizon_max_pitch = 20
// osd_crosshairs_style = DEFAULT
// osd_crsf_lq_format = TYPE1
// osd_horizon_offset = 0
// osd_camera_uptilt = 0
// osd_camera_fov_h = 135
// osd_camera_fov_v = 85
// osd_hud_margin_h = 3
// osd_hud_margin_v = 2
// osd_hud_homing = OFF
// osd_hud_homepoint = OFF
// osd_hud_radar_disp = 0
// osd_hud_radar_range_min = 3
// osd_hud_radar_range_max = 4000
// osd_hud_radar_nearest = 0
// osd_hud_wp_disp = 0
// osd_left_sidebar_scroll = NONE
// osd_right_sidebar_scroll = NONE
// osd_sidebar_scroll_arrows = OFF
// osd_main_voltage_decimals = 1
// osd_coordinate_digits = 9
// osd_estimations_wind_compensation = ON
// osd_failsafe_switch_layout = OFF
// osd_plus_code_digits = 11
// osd_ahi_style = DEFAULT
// osd_force_grid = OFF
// osd_ahi_bordered = OFF
// osd_ahi_width = 132
// osd_ahi_height = 162
// osd_ahi_vertical_offset = -18
// osd_sidebar_horizontal_offset = 0
// osd_left_sidebar_scroll_step = 0
// osd_right_sidebar_scroll_step = 0
// osd_home_position_arm_screen = ON

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
    const { load: loadSettings, save: saveSettings, settings: configuration  } = useSettings()

    return {
      work,
      saveSettingsToEeprom,
      font,
      loadFonts,
      configuration,
      loadSettings,
      saveSettings,
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
    async load() {
      await this.loadSettings(...this.settings)
      this.items = []
      await this.work(async () => {
        const response = await this.$serial.query(new InavOsdLayoutsRequest(this.layout))
        this.items = response.items.map((item, index) => ({
          ...item,
          index,
          name: OSD_ITEM[index]?.name,
          description: OSD_ITEM[index]?.description,
          fixed: !!OSD_ITEM[index]?.position,
          position: !!OSD_ITEM[index]?.position
            ? OSD_ITEM[index].position
            : { x: item.column, y: item.line },
          highlight: false,
        }))
      })
    },
    async save() {
      await this.work(async () => {
        // await this.saveSettings(...this.settings)
        await this.saveSettingsToEeprom()
        this.$log.info('OSD settings saved.')
      })
    },
    getItemText(index) {
      const item = OSD_ITEM[index] || { format: () => `FIXME${index}` }
      return item.format({ analog: this.analog, settings: this.configuration })
    }
  }
})
</script>

<style lang="scss" scoped>
.osd-editor {
  width: 360px;
  background: url(./osd/osd-bg-1.jpg) no-repeat;
  background-size: 100%;
}

.highlight {
  background-color: rgba(255, 255, 255, 0.5);
}

</style>

