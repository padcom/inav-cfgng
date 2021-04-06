<template>
  <Page>
    <PageHeader>Home page</PageHeader>
    <Column class="full-width">
    </Column>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Column from '../components/common/Column.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Column,
  },
  data() {
    return { }
  }
})
</script>
