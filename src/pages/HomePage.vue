<template>
  <Page>
    <PageHeader>Home page</PageHeader>
    <Column class="full-width">
    {{ range }}
    </Column>

    <Column class="full-width">
      <Slider v-model="range" :min="900" :max="2100" :step="25" :pips="{
        mode: 'values',
        values: [900, 1000, 1200, 1400, 1500, 1600, 1800, 2000, 2100],
        density: 4,
        stepped: true
      }" />
    </Column>
  </Page>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Column from '../components/common/Column.vue'
import Slider from '../components/common/Slider.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Page,
    PageHeader,
    Column,
    Slider,
  },
  data() {
    return { x: 100, range: [ 1200, 1700 ] }
  }
})
</script>
