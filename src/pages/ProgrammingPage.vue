<template>
  <Page>
    <PageHeader>Programming</PageHeader>

    <Row>
      <GVar v-for="(value, index) in variables" :key="index" :value="value" :index="index" />
    </Row>

    <Row>
      <LogicConditions :conditions="conditions" />
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
import LogicConditions from './programming/LogicConditions.vue'

import { useCommonCommands } from '../composables/common-commands'

import { GvarStatusRequest } from '../command/v2/GvarStatus'
import { LogicConditionsStatusRequest } from '../command/v2/LogicConditionsStatus'
import { LogicConditionsRequest } from '../command/v2/LogicConditions'

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
    LogicConditions,
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
    this.refreshLogicConditionStatusTaskId = this.$scheduler.enqueue(25, new LogicConditionsStatusRequest(), response => {
      for (let i = 0; i < response.count && i < this.conditions.length; i++) {
        this.conditions[i].status = response.status[i]
      }
    })

    this.work(async () => {
      await this.loadLogicConditions()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshGlobalVariablesTaskId)
    this.$scheduler.dequeue(this.refreshLogicConditionStatusTaskId)
  },
  methods: {
    async loadLogicConditions() {
      this.conditions = []

      const response = await this.$serial.query(new LogicConditionsRequest())
      this.conditions = response.conditions.map(condition => ({ ...condition, status: null }))
      console.log('this.conditions', this.conditions)
    },
    async saveLogicConditions() {
      await this.work(async () => {
        // TODO: implement saving of logic conditions
      })
      this.$log.info('Logic conditions have been saved.')
    },
  },
})
</script>

<style lang="scss" scoped>
.logic-conditions {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
