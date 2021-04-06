<template>
  <Page>
    <PageHeader>Modes</PageHeader>
    <Warning>
      <p>
        Use ranges to define the switches on your transmitter and corresponding mode assignments.
        A receiver channel that gives a reading between a range min/max will activate the mode.
        Remember to save your settings using the Save button.
      </p>
    </Warning>

    <Mode v-for="mode in modes" :key="mode.name"
      :mode="mode"
      :canAddMoreRanges="ranges.length < maxNumberOfModes"
      :numberOfAuxChannels="numberOfAuxChannels"
    />
  </Page>

  <Actions>
    <button class="action" @click="loadModes">Reload</button>
    <button class="action" @click="saveModes">Save</button>
  </Actions>
</template>

<script>

import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import Column from '../components/common/Column.vue'
import Actions from '../components/Actions.vue'

import Mode from './modes/Mode.vue'

import { BoxNamesRequest } from '../command/v1/BoxNames'
import { ModeRangesRequest } from '../command/v1/ModeRanges'

import { useStatus } from '../composables/status'
import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'
import { BoxIDsRequest } from '../command/v1/BoxIDs'
import { ActiveBoxesRequest } from '../command/v1/ActiveBoxes'
import { ClearModeRangeRequest, SetModeRangeRequest } from '../command/v1/SetModeRange'

export default defineComponent({
  name: 'ModesPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Column,
    Actions,
    Mode,
  },
  setup() {
    const { work, sleep } = useCommonCommands()
    const { modes: activeModes } = useStatus()

    return {
      work, sleep, activeModes
    }
  },
  data() {
    return {
      modes: [],
      maxNumberOfModes: 32,
      numberOfAuxChannels: 8,
    }
  },
  computed: {
    ranges() {
      return this.modes.map(mode => mode.ranges).flat()
    },
  },
  async mounted() {
    this.refreshChannelsTaskId = this.$scheduler.enqueue(25, new RcRequest(), response => {
      this.numberOfAuxChannels = response.count - 4
      this.modes.forEach(mode => {
        mode.ranges.forEach(range => {
          range.current = response.channels[range.channel + 4]
        })
      })
    })

    this.refreshActiveModesTaskId = this.$scheduler.enqueue(25, new ActiveBoxesRequest(), response => {
      this.modes.forEach((mode, index) => {
        mode.active = !!(response.flags[0] & (1 << index))
      })
    })

    this.work(async () => {
      await this.loadModes()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
    this.$scheduler.dequeue(this.refreshActiveModesTaskId)
  },
  methods: {
    async loadModes() {
      this.modes = []

      const boxes = await this.$serial.query(new BoxNamesRequest())
      const ids = await this.$serial.query(new BoxIDsRequest())
      const ranges = await this.$serial.query(new ModeRangesRequest())

      this.maxNumberOfModes = boxes.count

      this.modes = boxes.names.map((name, index) => ({
        name,
        id: ids.ids[index],
        ranges: ranges.ranges
          .filter(range => range.id === ids.ids[index])
          .filter(range => range.start !== range.end)
          .map(range => ({
            channel: range.auxChannelIndex,
            values: [ range.start, range.end ],
            current: null,
            active: null,
          }))
      }))
    },
    async saveModes() {
      this.work(async () => {
        for (let i = 0; i < this.maxNumberOfModes; i++) {
          await this.$serial.query(new ClearModeRangeRequest(i))
          await this.sleep(20)
        }

        let index = 0
        for (let i = 0; i < this.modes.length; i++) {
          const mode = this.modes[i]
          for (let j = 0; j < mode.ranges.length; j++) {
            const range = mode.ranges[j]
            const { channel, values: [ start, end ] } = range
            await this.$serial.send(new SetModeRangeRequest(index++, mode.id, channel, start, end))
            await this.sleep(20)
          }
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.warning {
  margin-bottom: 24px;
}
</style>

