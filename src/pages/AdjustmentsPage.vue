<template>
  <Page>
    <PageHeader>Adjustments</PageHeader>
    <Warning>
      <p>
        Configure adjustment switches. See the 'in-flight adjustments' section of the manual for details.
        The changes that adjustment functions make are not saved automatically.
        There are 4 slots.
        Each switch used to concurrently make adjustments requires exclusive use of a slot.
      </p>
      <p class="full-width" style="margin-top: 8px; margin-bottom: 8px;">
        Examples:
      </p>
      <p>
        Use Slot 1 and a 3POS switch on CH5 to select between Pitch/Roll P, I and D and another 3POS switch
        on CH6 to increase or decrease the value when held up or down.
      </p>
      <p>
        Use Slot 2 and a 3POS switch on CH8 to select enable Rate Profile Selection via the same 3POS switch
        on the same channel.
      </p>
    </Warning>
  </Page>

  <Actions>
    <button class="action" @click="loadModes">Reload</button>
    <button class="action" @click="saveModes">Save</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import Column from '../components/common/Column.vue'
import Actions from '../components/Actions.vue'

// import Mode from './modes/Mode.vue'

import { AdjustmentRangesRequest } from '../command/v1/AdjustmentRanges'

import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'
// import { ClearModeRangeRequest, SetModeRangeRequest } from '../command/v1/SetModeRange'

export default defineComponent({
  name: 'AdjustmentPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Column,
    Actions,
  },
  setup() {
    const { work, sleep } = useCommonCommands()

    return {
      work, sleep
    }
  },
  data() {
    return {
      adjustments: [],
      maxNumberOfAdjustments: 8,
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

    this.work(async () => {
      await this.loadAdjustments()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
  methods: {
    async loadAdjustments() {
      this.adjustments = []
      this.adjustments = await this.$serial.query(new AdjustmentRangesRequest())
      this.maxNumberOfAdjustments = this.adjustments.count
    },
    async saveModes() {
      this.work(async () => {
        // TODO: implement saving of adjustments
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
