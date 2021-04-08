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

    <Adjustment v-for="(adjustment, index) in adjustments"
      :index="index"
      :adjustment="adjustment"
      :numberOfAuxChannels="numberOfAuxChannels"
    />

  </Page>

  <Actions>
    <button class="action" @click="loadAdjustments">Reload</button>
    <button class="action" @click="saveAdjustments">Save</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import Column from '../components/common/Column.vue'
import Actions from '../components/Actions.vue'

import Adjustment from './adjustments/Adjustment.vue'

import { AdjustmentRangesRequest } from '../command/v1/AdjustmentRanges'

import { useCommonCommands } from '../composables/common-commands'

import { RcRequest } from '../command/v1/Rc'
import { SetAdjustmentRangeRequest } from '../command/v1/SetAdjustmentRange'

export default defineComponent({
  name: 'AdjustmentPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Column,
    Actions,
    Adjustment,
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
      numberOfAuxChannels: 8,
    }
  },
  async mounted() {
    this.refreshChannelsTaskId = this.$scheduler.enqueue(25, new RcRequest(), response => {
      this.numberOfAuxChannels = response.count - 4
      this.adjustments.forEach(adjustment => {
        adjustment.current = response.channels[adjustment.auxChannelIndex + 4]
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

      const response = await this.$serial.query(new AdjustmentRangesRequest())
      this.adjustments = response.ranges.map(adjustment => ({
        ...adjustment,
        values: [
          adjustment.start,
          adjustment.start === adjustment.end ? 950 : adjustment.end,
        ],
        current: 111,
        enabled: adjustment.start !== adjustment.end
      }))
    },
    async saveAdjustments() {
      await this.work(async () => {
        for (let i = 0; i < this.adjustments.length; i++) {
          const adjustment = this.adjustments[i]
          const request = new SetAdjustmentRangeRequest(
            i,
            adjustment.auxChannelIndex,
            adjustment.values[0],
            adjustment.values[1],
            adjustment.fn,
            adjustment.auxSwitchChannelIndex,
            adjustment.slot
          )
          await this.$serial.query(request)
        }
      })
      this.$log.info('Adjustments have been saved.')
    },
  },
})
</script>

<style lang="scss" scoped>
.warning {
  margin-bottom: 24px;
}
</style>
