<template>
  <div class="field">
    <input type="text" class="input"
      v-bind="$attrs"
      :value="settings[item].value"
      @input="update"
    />
    <label class="label">{{ label }}</label>
    <img v-if="settings[item].description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="settings[item].description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useSettings } from '../../composables/settings'

export default defineComponent({
  props: {
    item: { type: String, required: true },
    label: { type: String, default: '' },
  },
  setup() {
    const { settings } = useSettings()
    return { settings }
  },
  methods: {
    update(e) {
      this.settings[item].value = e.target.value
    }
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

.hint {
  cursor: help;
  margin-left: auto;
}
</style>
