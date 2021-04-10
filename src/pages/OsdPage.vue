<template>
  <Page>
    <PageHeader>OSD</PageHeader>
    <Row>
      <Column style="background-color: #e75935">
      </Column>
      <Column style="background-color: #49e489">
      </Column>
      <Column style="background-color: #89aef7">
      </Column>
    </Row>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'

export default defineComponent({
  name: 'OsdPage',
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
