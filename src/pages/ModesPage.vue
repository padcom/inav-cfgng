<template>
  <Page>
    <PageHeader>Modes</PageHeader>
  </Page>

  <Actions>
    <button class="action" @click="save">Save</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Actions from '../components/Actions.vue'

import { useCommonCommands } from '../composables/common-commands'

export default defineComponent({
  name: 'ModesPage',
  components: {
    Page,
    PageHeader,
    Actions,
  },
  setup() {
    const { work, sleep } = useCommonCommands()

    return {
      work, sleep
    }
  },
  data() {
    return { x: 100 }
  },
  async mounted() {
    this.work(async () => {
      await this.loadModes()
    })
  },
  methods: {
    async loadModes() {
      await this.sleep(100)
    },
    async saveModes() {
      this.work(async () => {
        await this.sleep(100)
      })
    },
  },
})
</script>
