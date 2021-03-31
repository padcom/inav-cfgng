<template>
  <label class="switch" :for="id">
    <input
      type="checkbox"
      v-bind="$attrs" 
      :id="id"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <div class="slider round"></div>
  </label>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false }
  },
  computed: {
    id() {
      return uuid()
    }
  }
})
</script>

<style lang="scss" scoped>
.switch {
  display: inline-block;
  height: 16px;
  position: relative;
  width: 36px;
}

.switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 1px;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: -1px;
  transition: .1s;
}

.slider:before {
  background-color: #fff;
  bottom: 1px;
  content: "";
  height: 14px;
  left: 1px;
  position: absolute;
  transition: .1s;
  width: 14px;
}

input:checked + .slider {
  background-color: #37A8DB;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
