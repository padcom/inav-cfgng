<template>
  <Page>
    <PageHeader>Home page</PageHeader>
    <Row>
      <ProgressBar :value="33" />
    </Row>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'

import ProgressBar from '../components/ProgressBar.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Row,
    ProgressBar,
  },
  data() {
    return { }
  }
})
</script>
