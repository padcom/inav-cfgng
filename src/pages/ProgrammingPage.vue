<template>
  <Page>
    <PageHeader>Programming</PageHeader>

    <Row>
      <GVar v-for="(value, index) in variables" :key="index" :value="value" :index="index" />
    </Row>
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
import Row from '../components/common/Row.vue'
import Column from '../components/common/Column.vue'
import Actions from '../components/Actions.vue'

import GVar from './programming/GVar.vue'
// import Adjustment from './programming/Adjustment.vue'

import { useCommonCommands } from '../composables/common-commands'

// import { RcRequest } from '../command/v1/Rc'
import { GvarStatusRequest } from '../command/v2/GvarStatus'
import { LogicConditionsRequest } from '../command/v2/LogicConditions'
// import { SetAdjustmentRangeRequest } from '../command/v1/SetAdjustmentRange'

export default defineComponent({
  name: 'ProgrammingPage',
  components: {
    Page,
    PageHeader,
    Warning,
    Row,
    Column,
    Actions,
    GVar,
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
      variables: [],
    }
  },
  async mounted() {
    this.refreshGlobalVariablesTaskId = this.$scheduler.enqueue(25, new GvarStatusRequest(), response => {
      this.variables = response.variables
    })

    console.log('this.refreshGlobalVariablesTaskId', this.refreshGlobalVariablesTaskId)

    this.work(async () => {
      await this.loadLogicConditions()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshGlobalVariablesTaskId)
  },
  methods: {
    async loadLogicConditions() {
      this.conditions = []

      const response = await this.$serial.query(new LogicConditionsRequest())
      console.log('response', response)
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
