import vue from '@vitejs/plugin-vue'
import acornPrivateMethods from 'acorn-private-methods'

export default {
  build: {
    rollupOptions: {
      acornInjectPlugins: [ acornPrivateMethods ]
    }
  },
  plugins: [
    vue()
  ]
}
