<template>
  <div class="status-indicator">
    <Icon v-if="armed" file="images/status/cf_icon_armed_active.svg" />
    <Icon v-else="armed" file="images/status/cf_icon_armed_grey.svg" />
    
    <Icon v-if="failsafe" file="images/status/cf_icon_failsafe_active.svg" />
    <Icon v-else file="images/status/cf_icon_failsafe_grey.svg" />

    <Icon v-if="link" file="images/status/cf_icon_link_active.svg" />
    <Icon v-else file="images/status/cf_icon_link_gray.svg" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Icon from '../../components/common/Icon.vue'

import { BoxNamesRequest } from '../../command/v1/BoxNames'
import { ActiveBoxesRequest } from '../../command/v1/ActiveBoxes'

export default defineComponent({
  components: {
    Icon,
  },
  data() {
    return {
      lastResponseTime: 0,
      modes: [],
      activeBoxes: 0,
    }
  },
  computed: {
    armed() {
      const armModeIndex = this.modes.findIndex(mode => mode === 'ARM')
      return this.activeBoxes & (1 << armModeIndex)
    },
    failsafe() {
      const failsafeModeIndex = this.modes.findIndex(mode => mode === 'FAILSAFE')
      return this.activeBoxes[0] & (1 << failsafeModeIndex)
    },
    link() {
      return Date.now() - this.lastResponseTime < 1000
    }
  },
  async mounted() {
    const mode = await this.$serial.query(new BoxNamesRequest())
    this.modes = mode.names

    this.refreshModesTaskId = this.$scheduler.enqueue(100, new ActiveBoxesRequest(), response => {
      this.activeBoxes = response.flags
      this.lastResponseTime = Date.now()
    })
  },
  beforeUnmount() {
    this.$scheduler.dequeue(this.refreshModesTaskId)
  }
})
</script>

<style lang="scss" scoped>
.status-indicator {
  width: 95px;
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;

  &:deep(b.icon) {
    width: 20px;
    height: 20px;
  }
}
</style>