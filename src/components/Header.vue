<template>
  <div class="header">
    <h1>Header</h1>
    <select v-if="!isConnected" v-model="path" class="serial-ports">
      <option v-for="port in serialPorts" :key="port.path" :value="port.path">{{ port.path }}</option>
    </select>
    <button v-if="!isConnected" :disabled="path === ''" class="connect" @click="connect">Connect</button>
    <button v-if="isConnected" class="disconnect" @click="disconnect">Disconnect</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isConnected: false,
      path: '',
      serialPorts: []
    }
  },
  async created() {
    this.serialPorts = await this.$serial.list()
  },
  onSerialOpen() {
    this.$nextTick(() => {
      this.isConnected = true
    })
  },
  onSerialClose() {
    this.isConnected = false
  },
  methods: {
    connect() {
      this.$serial.open(this.path)
    },
    disconnect() {
      this.$serial.close()
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
  padding: 8px 4px;
}

.connect {
  padding: 8px 4px;
}

.disconnect {
  margin-left: auto;
}
</style>
