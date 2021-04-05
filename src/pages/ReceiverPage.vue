<template>
  <Page>
    <PageHeader>Receiver</PageHeader>
    <Column>
      <Channel v-for="(channel, index) in channels" :key="index" :index="index" :value="channel" />
    </Column>
    <Column>
    </Column>
  </Page>

  <Actions>
    <button @click="saveAndReboot" class="action">Save and Reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Column from '../components/common/Column.vue'
import Panel from '../components/common/Panel.vue'
import Actions from '../components/Actions.vue'
import Channel from '../components/common/Channel.vue'
import DropdownSetting from '../components/editors/DropdownSetting.vue'
import NumericSetting from '../components/editors/NumericSetting.vue'

import { RcRequest } from '../command/v1/Rc'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Column,
    Panel,
    Actions,
    Channel,
    DropdownSetting,
    NumericSetting,
  },
  data() {
    return {
      channels: []
    }
  },
  computed: {
    CHANNEL_NAME() {
      return CHANNEL_NAME
    },
  },
  mounted() {
    this.refreshChannelsTaskId = this.$scheduler.enqueue(10, new RcRequest(), response => {
      this.channels = response.channels
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshChannelsTaskId)
  },
})
</script>

<style lang="scss" scoped>
</style>
