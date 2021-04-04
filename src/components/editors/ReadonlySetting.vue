<template>
  <div class="field">
    <input type="text" class="input"
      v-bind="$attrs"
      @input="update"
      readonly
    />
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: { type: [ String, Number ], default: '' },
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
  // margin: 0px 0;
}

.input {
  width: 150px;
  margin-right: 8px;
}
</style>
