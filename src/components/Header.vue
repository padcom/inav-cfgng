<template>
  <div class="header">
    <h1>Header</h1>
    <select class="serial-ports">
      <option v-for="port in serialPorts" :key="port.path" :value="port.path">{{ port.path }}</option>
    </select>
  </div>
</template>

<script>
import ipc from '../ipc'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const serialPorts = ref([])
    ipc.on('port.listed', (e, ports) => { serialPorts.value = ports })
    ipc.send('port.list')

    return {
      serialPorts
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
}

.serial-ports {
  margin-left: auto;  
}
</style>
