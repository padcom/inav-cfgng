<template>
  <div class="navigation">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li v-if="isSerialReady"><router-link to="/serial-configuration">Ports</router-link></li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isSerialReady: false
    }
  },
  onSerialReady() {
    this.isSerialReady = true
  },
  onSerialClose() {
    this.isSerialReady = false
  }
})
</script>

<style lang="scss" scoped>
.navigation {
  overflow: auto;
}
</style>
