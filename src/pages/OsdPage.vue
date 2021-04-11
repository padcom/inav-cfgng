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
        <Panel title="General">
        </Panel>
        <Panel title="Temperature">
        </Panel>
        <Panel title="Altitude">
        </Panel>
        <Panel title="G-Force">
        </Panel>
        <Panel title="Timers">
        </Panel>
        <Panel title="Attitude">
        </Panel>
        <Panel title="Current Meter">
        </Panel>
        <Panel title="Maps and Radars">
        </Panel>
        <Panel title="VTX">
        </Panel>
        <Panel title="Crossfire RX Statistics">
        </Panel>
        <Panel title="Global Variables">
        </Panel>
        <Panel title="RC Adjustment Values">
        </Panel>
        <Panel title="PID Controller Outputs">
        </Panel>
      </Column>
      <Column width="382px" style="align-self: flex-start; position: sticky; top: 92px;">
        <Panel title="Preview">
          <DragContainer ref="osd" class="osd-editor" width="360" height="288">
            <DragItem v-for="item in enabledItems" :key="item.index" v-model="item.position" :gridCellWidth="12" :gridCellHeight="18">
              <Rssi v-if="item.index === 0" />
              <img v-else class="osd-item" draggable="false" :src="font[56]" />
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

import Rssi from './osd/Rssi.vue'

import { useCommonCommands } from '../composables/common-commands'
import { useFont } from '../composables/font'

import { InavOsdLayoutsRequest } from '../command/v2/InavOsdLayouts'

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
    Rssi,
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
    }
  },
  computed: {
    enabledItems() {
      return this.items.filter(item => item.isVisible)
    }
  },
  async created() {
    await this.loadFonts()
    await this.load()
  },
  methods: {
    async load() {
      this.items = []
      await this.work(async () => {
        const response = await this.$serial.query(new InavOsdLayoutsRequest(this.layout))
        this.items = response.items.map((item, index) => ({
          ...item,
          index,
          position: { x: item.column, y: item.line },
        }))
      })
    },
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('OSD settings saved.')
      })
    },
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
  background-color: rgba(255, 255, 255, 1);
}

img {
 filter: chroma(color=#808080);
}
</style>