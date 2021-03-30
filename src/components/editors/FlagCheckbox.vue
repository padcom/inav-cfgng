<template>
  <label class="switch" :for="id">
    <input :id="id" type="checkbox" :checked="checked" @input="update" v-bind="$attrs" />
    <div class="slider round"></div>
  </label>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Number, default: 0 },
    flag: { type: Number, default: 0 }
  },
  computed: {
    id() {
      return uuid()
    },
    checked() {
      return (this.modelValue & this.flag) !== 0
    }
  },
  methods: {
    update(e) {
      if (e.target.checked) {
        this.$emit('update:modelValue', this.modelValue | this.flag)
      } else {
        this.$emit('update:modelValue', this.modelValue & (~this.flag))
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.switch {
  display: inline-block;
  height: 16px;
  position: relative;
  width: 36px;
  margin-right: 2px;
}

.switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: -3px;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 3px;
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
