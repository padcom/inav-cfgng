<template>
  <Page>
    <PageHeader>Home page</PageHeader>
    <Row>
    </Row>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Row,
  },
  data() {
    return { }
  }
})
</script>
