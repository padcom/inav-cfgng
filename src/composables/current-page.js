import { computed, getCurrentInstance } from 'vue'

export function useCurrentPage() {
  const page = computed(() => {
    const instance = getCurrentInstance()
    let parent = instance.parent
    while (parent !== null && (!(parent.type.name || '').endsWith('Page'))) parent = parent.parent
    return parent
  })

  return page
}
