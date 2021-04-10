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
          <div ref="osd" class="osd-editor" width="360" height="288"
            :style="{
              'background-color': 'red',
              cursor: draggedElement ? 'grabbing' : 'default'
            }"
            @mousemove="drag"
          >
            <img ref="x" class="osd-item" draggable="false"
              :style="{
                left: left+'px',
                top: top+'px',
                cursor: draggedElement ? 'grabbing' : 'default'
              }"
              @mousedown.prevent="beginDrag"
            />
          </div>
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

  <div ref="font" style="display: block">
    <img v-for="char in FONT" :key="char" :src="`./images/font/${char}.png`" :id="`char-${char}`" class="char" />
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

import { useCommonCommands } from '../composables/common-commands'

import { InavOsdLayoutsRequest } from '../command/v2/InavOsdLayouts'
import { waitForSingleEvent } from '../utils'

import { FONT } from '../models/font'

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
  },
  setup() {
    const { work, saveSettingsToEeprom} = useCommonCommands()

    return {
      work,
      saveSettingsToEeprom,
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
    FONT() {
      return FONT
    }
  },
  async mounted() {
    await this.work(async () => {
      const response = await this.$serial.query(new InavOsdLayoutsRequest(this.layout))
      this.items = response.items
    })

    // const canvas = this.$refs.osd

    // convert font elements to transparent
    const t1 = Date.now()
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const chars = this.$refs.font.querySelectorAll('img')

    const makeImageTransparent = img => {
      canvas.width = img.width
      canvas.height = img.height
      context.drawImage(img, 0, 0)
      const imageData = context.getImageData(0, 0, img.width, img.height)  
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0x80 && imageData.data[i + 1] === 0x80 && imageData.data[i + 2] === 0x80) {
          imageData.data[i + 3] = 0
        }
      }
      context.clearRect(0, 0, img.width, img.height)
      context.putImageData(imageData, 0, 0)
    }

    chars.forEach(img => {
      makeImageTransparent(img)
      this.chars[Number.parseInt(img.id.split('-')[1])] = canvas.toDataURL('image/png')
    })

    this.$refs.x.src = this.chars[49]
    console.log(this.chars[3])

    const t2 = Date.now()

    console.log('Processing time:', t2 - t1)
    window.addEventListener('mouseup', this.endDrag)
  },
  beforeUnmount() {
    window.removeEventListener('mouseup', this.endDrag)
  },
  methods: {
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('OSD settings saved.')
      })
    },
    beginDrag(e) {
      this.draggedElement = e.target
      const rect = e.target.getBoundingClientRect()
      this.dragArea = this.$refs.osd.getBoundingClientRect()
      this.dragOrigin = { x: e.clientX - rect.x, y: e.clientY - rect.y }
    },
    endDrag(e) {
      this.draggedElement = null
      this.dragOrigin = { x: 0, y: 0 }
    },
    drag(e) {
      if (!this.draggedElement) return
      const left = Math.round((e.clientX - this.dragArea.x) / 12) * 12 - this.dragOrigin.x
      const top = Math.round((e.clientY - this.dragArea.y) / 18) * 18 - this.dragOrigin.y

      this.left = left
      this.top = top
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

.osd-item {
  position: relative;
  left: 20px;
  top: 20px;
  cursor: -webkit-grab;
}
img {
 filter: chroma(color=#808080);
}
</style>