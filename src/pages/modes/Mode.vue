<template>
  <Column class="mode" full-width>
    <Column class="name">
      {{ mode.name }}
    </Column>
    <Column class="slider">
      <Column full-width v-for="range in mode.ranges" :key="range.id">
        Channel: {{ range.channel }}, {{ range.start}} - {{ range.end }}
      </Column>
    </Column>
  </Column>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import Column from '../../components/common/Column.vue'

export default defineComponent({
  components: {
    Column,
  },
  props: {
    mode: { type: Object, required: true },
  },
})
</script>

<style lang="scss" scoped>
.mode {
  margin-bottom: 8px;
}

.name {
  background-color: lightgray;
  flex-basis: 100px;
}

.slider {
  background-color: gray;
  flex-basis: 80%;
}
</style>
