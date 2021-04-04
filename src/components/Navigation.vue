<template>
  <div class="navigation">
    <ul>
      <li class="navitem">
        <router-link to="/">
          <img class="icon" src="./navigation/cf_icon_welcome_white.svg">
          <div class="title">Welcome</div>
        </router-link>
      </li>

      <div class="divider" />

      <li v-if="isSerialReady" class="navitem">
        <router-link to="/ports">
          <img class="icon" src="./navigation/cf_icon_ports_white.svg">
          <div class="title">Ports</div>
        </router-link>
      </li>

      <div class="divider" />

      <li v-if="isSerialReady" class="navitem">
        <router-link to="/configuration">
          <img class="icon" src="./navigation/cf_icon_config_white.svg">
          <div class="title">Configuration</div>
        </router-link>
      </li>

      <div class="divider" />

      <li v-if="isSerialReady" class="navitem">
        <router-link to="/advanced-tuning">
          <img class="icon" src="./navigation/cf_icon_advanced_white.svg">
          <div class="title">Advanced tuning</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',
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
  background-color: #2E2E2E;
}

.navitem a {
  display: flex;
  color: white;
  opacity: 50%;
  text-decoration: none;
  text-shadow: var(--label-text-shadow-dark);
  font-size: calc(var(--default-font-size) + 2px);
  padding: 8px;
  border-top: solid 1px #444;

  &:hover {
    background-color: gray;
    border-top: solid 1px gray;
    opacity: 1;
  }

  &.router-link-active {
    background-color: var(--color-info);
    border-top: solid 1px var(--color-info);
    opacity: 1;
  }
}

.icon {
  width: 16px;
  height: 16px;
  margin-left: 2px;
}

.title {
  margin-left: 8px;
}

.divider {
  height: 1px;
  border-top: solid 1px #181818;
}
</style>
