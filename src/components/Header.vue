<template>
  <div class="header">
    <div class="logo"></div>
    <CommonStatus v-if="isConnected" />
    <SensorStatus v-if="isConnected" />
    <div v-if="!isConnected" class="connection-controls">
      <div class="port-selector">
        <div class="port-properties">
          <Dropdown
            class="serial-ports bigger dark"
            v-model="serialPort"
            :options="serialPorts.map(port => ({ value: port.path, label: port.path }))"
          />
          <Dropdown
            class="baudrate bigger dark"
            v-model="baudrate"
            :options="baudrates.map(baudrate => ({ value: baudrate, label: baudrate }))"
          />
        </div>
        <div class="wireless">
          <label class="text">Wireless mode</label>
          <Switch v-model="wirelessMode" small />
        </div>
      </div>
    </div>
    <div class="connection-manager">
      <button v-if="!isConnected" class="round-button connect" @click="connect" :disabled="serialPort === ''" :title="connectButtonHint">
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

import Dropdown from '../components/editors/Dropdown.vue'
import Switch from '../components/editors/Switch.vue'
import SensorStatus from './header/SensorStatus.vue'
import CommonStatus from './header/CommonStatus.vue'

import { useConnectionManager } from '../composables/connection-manager'

export default defineComponent({
  name: 'Header',
  components: {
    Dropdown,
    Switch,
    SensorStatus,
    CommonStatus,
  },
  setup() {
    return {
      connectionManager: useConnectionManager()
    }
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
    },
    connectButtonHint() {
      return this.serialPort === '' ? 'Select an INAV serial port first' : ''
    }
  },
  async created() {
    const ports = await this.$serial.list()
    this.onSerialPortListUpdated({}, ports)
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
  onSerialPortListUpdated(sender, ports) {
    this.serialPorts = [ '', ...ports ]

    const serialPortStillPresent = this.serialPorts.some(port => port.path === this.serialPort)
    if (!serialPortStillPresent) {
      this.serialPort = ''
    }

    if (!this.serialPort) {
      const inavSerialPort = this.serialPorts.find(port => port.manufacturer === 'INAV')?.path
      if (inavSerialPort) {
        console.log('INAV serial port found - setting', inavSerialPort)
        this.$nextTick(() => { this.serialPort = inavSerialPort })
      }
    }
  },
  methods: {
    connect() {
      if (this.isConnecting) {
        this.connectionManager.disconnect()
      } else {
        this.connectionManager.connect(this.serialPort)
        this.isConnecting = true
      }
    },
    disconnect() {
      this.connectionManager.disconnect()
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

    .text {
      margin-right: 8px;
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
    &:disabled {
      cursor: help;
    }
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
