import { watchEffect } from 'vue'
import { useSettings } from './composables/settings'

const { settings } = useSettings()

export function install(app) {
  app.directive('if-setting', (el, binding, vnode) => {
    const modifiers = Object.keys(binding.modifiers)
    if (modifiers.length > 0) {
      const item = modifiers[0]
      const setting = settings.value[item]
      if (setting) {
        watchEffect(() => {
          el.style.display = setting.value != binding.value ? 'none' : ''
        })
      } else {
        console.warn('Setting', item, 'not found - skipping')
      }
    }
  })
}
