<template>
  <div class="header">
    <div class="logo"></div>
    <div v-if="!isConnected" class="connection-controls">
      <div class="port-selector">
        <div class="port-properties">
          <Select
            class="serial-ports bigger dark"
            v-model="serialPort"
            :options="serialPorts.map(port => ({ value: port.path, label: port.path }))"
          />
          <Select
            class="baudrate bigger dark"
            v-model="baudrate"
            :options="baudrates.map(baudrate => ({ value: baudrate, label: baudrate }))"
          />
        </div>
        <div class="wireless">
          <label class="text-shadow-dark">Wireless mode</label>
          <Switch v-model="wirelessMode" />
        </div>
      </div>
    </div>
    <div class="connection-manager">
      <button v-if="!isConnected" :disabled="serialPort === '' || isConnecting" class="round-button connect" @click="connect">
        <img src="./header/cf_icon_usb2_white.svg" width="32" height="32" />
      </button>
      <button v-if="isConnected" class="round-button disconnect" @click="disconnect">
        <img src="./header/cf_icon_usb1_white.svg" width="32" height="32" />
      </button>
      <label>{{ state }}</label>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Select from '../components/editors/Select.vue'
import Switch from '../components/editors/Switch.vue'

export default defineComponent({
  components: {
    Select,
    Switch
  },
  data() {
    return {
      isConnecting: false,
      isConnected: false,
      serialPort: '',
      serialPorts: [],
      baudrate: 115200,
      baudrates: [ 115200, 57600, 38400, 28800, 19200, 14400, 9600, 4800, 2400, 1200 ],
      wirelessMode: false,
    }
  },
  computed: {
    state() {
      if (this.isConnected) {
        return 'Disconnect'
      } else if (this.isConnecting) {
        return 'Connecting'
      } else {
        return 'Connect'
      }
    }
  },
  async created() {
    this.serialPorts = [ '', ...(await this.$serial.list()) ]
  },
  onSerialOpen() {
    this.isConnecting = true
  },
  onSerialReady() {
    this.isConnected = true
    this.isConnecting = false
  },
  onSerialClose() {
    this.isConnected = false
    this.isConnecting = false
  },
  methods: {
    connect() {
      this.$serial.open(this.serialPort)
      this.isConnecting = true
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

.logo {
  width: 200px;
  margin-right: auto;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 450px 80px;
  background-image: url(./header/light-wide-2.svg);
  background-position: 16px center;
}

.port-selector {
  height: 100%;
  display: flex;
  flex-direction: column;

  .port-properties {
    display: flex;
    height: 40px;
    padding-top: 16px;
    margin-bottom: 4px;

    select {
      width: 120px;
      margin-right: 4px;
    }
  }

  .wireless {
    color: white;
    text-shadow: var(--label-text-shadow);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
    margin-right: 0px;

    label {
      margin-right: 4px;
    }
  }
}

.connection-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 100%;
  margin-left: 32px;
  margin-right: 48px;

  .round-button {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }

  .connect {
    background-color: var(--color-info);
  }

  .disconnect {
    background-color: var(--color-error);
  }

  label {
    color: white;
    margin-top: 6px;
  }
}
</style>
