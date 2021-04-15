<template>
  <Page>
    <PageHeader>Mixers</PageHeader>
    <Row>
    </Row>
  </Page>

  <Actions>
    <button class="action" @click="saveAndReboot">Save and reboot</button>
  </Actions>
</template>

<script>
import { defineComponent } from 'vue'

import Page from '../components/common/Page.vue'
import PageHeader from '../components/common/PageHeader.vue'

import Row from '../components/common/Row.vue'
import Actions from '../components/Actions.vue'

import { useCommonCommands } from '../composables/common-commands'

export default defineComponent({
  name: 'MixersPage',
  components: {
    Page,
    PageHeader,
    Row,
    Actions,
  },
  setup() {
    const { saveSettingsToEeprom, work, reboot } = useCommonCommands()

    return {
      saveSettingsToEeprom, work, reboot
    }
  },
  data() {
    return { }
  },
  methods: {
    async save() {
      await this.work(async () => {
        await this.saveSettingsToEeprom()
        this.$log.info('Settings saved')
      })
    },
    async saveAndReboot() {
      await this.save()
      await this.reboot()
      this.$router.push('/outputs')
    },
  }
})
</script>
