<template>
  <div
    draggable="false"
    :class="{ 'drag-item': true, dragged: isBeingDragged }"
    :style="{ left: left+'px', top: top+'px' }"
    v-bind="$attrs"
    @mousedown="beginDrag"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      left: 10,
      top: 10,
      isHovered: false,
      isBeingDragged: false,
      dragBegin: null,
      dragOrigin: { x: 0, y: 0 },
      dragArea: {},
      originalParentCursor: 'default',
    }
  },
  mounted() {
    this.$el.component = this
    window.document.addEventListener('mouseup', this.endDrag)
    window.document.addEventListener('mousemove', this.drag)
  },
  beforeUnmount() {
    window.document.removeEventListener('mouseup', this.endDrag)
    window.document.removeEventListener('mousemove', this.drag)
  },
  methods: {
    beginDrag(e) {
      window.document.body.style.cursor = 'grabbing'
      const rect = this.$el.getBoundingClientRect()
      this.dragRect = rect
      this.dragArea = this.$el.parentNode.getBoundingClientRect()
      this.dragOrigin = { x: e.clientX - rect.x, y: e.clientY - rect.y }
      this.isBeingDragged = true
    },
    drag(e) {
      if (this.isBeingDragged) {
        const left = Math.round((e.clientX - this.dragArea.x - this.dragOrigin.x) / 12) * 12
        const top = Math.round((e.clientY - this.dragArea.y - this.dragOrigin.y) / 18) * 18

        const rect = this.$el.getBoundingClientRect()
        const dx = rect.left - this.dragRect.left
        const dy = rect.top - this.dragRect.top

        if (left + dx < 0) {
          this.left = 0
        } else if (left + dx + rect.width > this.dragArea.width) {
          this.left = this.dragArea.width - rect.width
        } else {
          this.left = left
        }
        
        if (top + dy < 0) {
          this.top = 0
        } else if (top + dy + rect.height > this.dragArea.height) {
          this.top = this.dragArea.height - rect.height
        } else {
          this.top = top
        }

        this.dragRect = this.$el.getBoundingClientRect()
      }
    },
    endDrag(e) {
      window.document.body.style.cursor = 'default'
      this.isBeingDragged = false
      this.$emit('moved', this, this.left, this.right)
    },
  }
})
</script>

<style lang="scss" scoped>
.drag-item {
  display: inline-block;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.dragged {
    background-color: rgba(255, 255, 255, 0.6);
  }
}
</style>
