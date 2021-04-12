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
          <DragContainer ref="osd" class="osd-editor" width="360" height="288">
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
        <Panel title="Video Format">
        </Panel>
        <Panel title="Settings">
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

import { useCommonCommands } from '../composables/common-commands'
import { useFont } from '../composables/font'

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
  },
  setup() {
    const { work, saveSettingsToEeprom} = useCommonCommands()
    const { font, loadFonts } = useFont()

    return {
      work,
      saveSettingsToEeprom,
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
    }
  },
  computed: {
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
        console.log('this.items', this.items)
      })
    },
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('OSD settings saved.')
      })
    },
    getItemText(index) {
      const item = OSD_ITEM[index] || { format: () => `FIXME${index}` }
      return item.format({ analog: this.analog })
    }
  }
})
</script>

<style lang="scss" scoped>
.osd-editor {
  width: 360px;
  height: 288px;
  // aspect-ratio: calc(4/3);
  background: url(./osd/osd-bg-1.jpg) no-repeat;
  background-size: 100%;
}

.highlight {
  background-color: rgba(255, 255, 255, 0.5);
}

</style>