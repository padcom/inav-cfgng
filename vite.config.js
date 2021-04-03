import vue from '@vitejs/plugin-vue'
import acornPrivateMethods from 'acorn-private-methods'

export default {
  base: './',
  build: {
    outDir: './dist/app',
    rollupOptions: {
      acornInjectPlugins: [ acornPrivateMethods ]
    }
  },
  plugins: [
    vue()
  ]
}
