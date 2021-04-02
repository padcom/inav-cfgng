<template>
  <label :class="{ switch: true, small }" :for="id">
    <input
      type="checkbox"
      v-bind="$attrs" 
      :id="id"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <div :class="{ slider: true, round, small }"></div>
  </label>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    round: { type: Boolean, default: true },
    small: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue'
  ],
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

  &.small {
    width: 29px;
  }
}

.switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  top: -1px;
  bottom: 1px;
  left: 0;
  right: 0;
  cursor: pointer;
  position: absolute;
  transition: .1s;

  &:before {
    background-color: #fff;
    bottom: 1px;
    content: "";
    height: 14px;
    left: 1px;
    position: absolute;
    transition: .1s;
    width: 14px;
  }

  &.round {
    border-radius: 34px;
  }

  &.round:before {
    border-radius: 50%;
  }

  &.small {
    top: 1px;
    bottom: 2px;
    width: 24px;

    &:before {
      top: 1px;
      width: 10px;
      height: 11px;
    }
  }
}

input:checked + .slider {
  background-color: var(--color-info);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

input:checked + .slider.small:before {
  transform: translateX(12px);
}
</style>
