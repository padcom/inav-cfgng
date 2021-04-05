import { watchEffect } from 'vue'
import { useSettings } from './composables/settings'

const { settings } = useSettings()

export function install(app) {
  app.directive('if-setting', (el, binding, vnode) => {
    const modifiers = Object.keys(binding.modifiers)
    if (modifiers.length > 0) {
      watchEffect(() => {
        const item = modifiers[0]
        el.style.display = settings.value[item].value != binding.value ? 'none' : ''
      })
    }
  })
}
