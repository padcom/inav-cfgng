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

    <Mode v-for="mode in modes" :key="mode.name" :mode="mode" :canAddMoreRanges="ranges.length < maxNumberOfModes" :numberOfAuxChannels="numberOfAuxChannels" />
  </Page>

  <Actions>
    <button class="action" @click="loadModes">Reload</button>
    <button class="action" @click="save">Save</button>
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

import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'

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

    return {
      work, sleep
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
    this.refreshChannelsTaskId = this.$scheduler.enqueue(10, new RcRequest(), response => {
      this.numberOfAuxChannels = response.count - 4
      this.modes.forEach(mode => {
        mode.ranges.forEach(range => {
          range.current = response.channels[range.channel + 5]
        })
      })
    })

    this.work(async () => {
      await this.loadModes()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
  methods: {
    async loadModes() {
      const boxes = await this.$serial.query(new BoxNamesRequest())
      const ranges = await this.$serial.query(new ModeRangesRequest())
      this.maxNumberOfModes = ranges.count
      this.modes = boxes.names
        .map((name, index) => ({
          name,
          ranges: ranges.ranges
            .filter(range => range.start > 900 && range.end > 900)
            .filter(range => range.id === index)
            .map(range => ({ id: uuid(), channel: range.auxChannelIndex, values: [ range.start, range.end ], current: null }))
        }))
    },
    async saveModes() {
      this.work(async () => {
        await this.sleep(100)
        this.$router.push('/modes')
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

