<template>
  <Page>
    <PageHeader>Home page</PageHeader>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
  }
})
</script>
