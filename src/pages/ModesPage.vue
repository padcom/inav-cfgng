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

export default defineComponent({
  name: 'ModesPage',
  components: {
    Page,
    PageHeader,
    Actions,
  },
  data() {
    return { x: 100 }
  }
})
</script>
