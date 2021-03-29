import { ref } from 'vue'
import { registry } from '../registry'

const registryRef = ref(registry)

export function useCommandRegistry() {
  return { registry: registryRef }
}
