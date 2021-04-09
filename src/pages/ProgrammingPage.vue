<template>
  <Page>
    <PageHeader>Programming</PageHeader>

  </Page>

  <Actions>
    <button class="action" @click="loadLogicConditions">Reload</button>
    <button class="action" @click="saveLogicConditions">Save</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Warning from '../components/common/Warning.vue'
import Column from '../components/common/Column.vue'
import Actions from '../components/Actions.vue'

// import Adjustment from './adjustments/Adjustment.vue'

import { useCommonCommands } from '../composables/common-commands'

// import { RcRequest } from '../command/v1/Rc'
// import { AdjustmentRangesRequest } from '../command/v1/AdjustmentRanges'
// import { SetAdjustmentRangeRequest } from '../command/v1/SetAdjustmentRange'

export default defineComponent({
  name: 'ProgrammingPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Column,
    Actions,
    // Adjustment,
  },
  setup() {
    const { work, sleep } = useCommonCommands()

    return {
      work, sleep
    }
  },
  data() {
    return {
      conditions: [],
      numberOfAuxChannels: 8,
    }
  },
  async mounted() {
    // this.refreshChannelsTaskId = this.$scheduler.enqueue(25, new RcRequest(), response => {
    //   this.numberOfAuxChannels = response.count - 4
    //   this.adjustments.forEach(adjustment => {
    //     adjustment.current = response.channels[adjustment.auxChannelIndex + 4]
    //   })
    // })

    this.work(async () => {
      await this.loadLogicConditions()
    })
  },
  beforeUnmount() {
    // this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
  methods: {
    async loadLogicConditions() {
      this.conditions = []

      // const response = await this.$serial.query(new AdjustmentRangesRequest())
      // this.adjustments = response.ranges.map(adjustment => ({
      //   ...adjustment,
      //   values: [
      //     adjustment.start,
      //     adjustment.start === adjustment.end ? 950 : adjustment.end,
      //   ],
      //   current: 111,
      //   enabled: adjustment.start !== adjustment.end
      // }))
    },
    async saveLogicConditions() {
      await this.work(async () => {
        // for (let i = 0; i < this.adjustments.length; i++) {
        //   const { enabled, auxChannelIndex, values: [ start, end ], fn, auxSwitchChannelIndex, slot } = this.adjustments[i]

        //   const request = enabled
        //     ? new SetAdjustmentRangeRequest(i, auxChannelIndex, start, end, fn, auxSwitchChannelIndex, slot)
        //     : new SetAdjustmentRangeRequest(i)

        //   await this.$serial.query(request)
        // }
      })
      this.$log.info('Logic conditions have been saved.')
    },
  },
})
</script>

<style lang="scss" scoped>
.warning {
  margin-bottom: 24px;
}
</style>
