<template>
  <div
    draggable="false"
    :class="{ 'drag-item': true, fixed: !isDraggable, dragged: isBeingDragged }"
    :style="{ left: left+'px', top: top+'px', 'z-index': isDraggable ? 200 : 1 }"
    v-bind="$attrs"
    @mousedown="beginDrag"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Object, default: () => ({ x: 0, y: 0 }) },
    gridCellWidth: { type: Number, default: 1 },
    gridCellHeight: { type: Number, default: 1 },
    fixed: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      left: (this.position?.x || this.modelValue.x) * this.gridCellWidth,
      top: (this.position?.y || this.modelValue.y) * this.gridCellHeight,
      isHovered: false,
      isBeingDragged: false,
      dragBegin: null,
      dragOrigin: { x: 0, y: 0 },
      dragArea: {},
      originalParentCursor: 'default',
    }
  },
  computed: {
    isDraggable() {
      return !this.fixed
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
      if (!this.fixed) {
        window.document.body.style.cursor = 'grabbing'
        this.dragRect = this.$el.getBoundingClientRect()
        this.dragArea = this.$el.parentNode.getBoundingClientRect()
        this.dragOrigin = { x: e.clientX - this.dragRect.x, y: e.clientY - this.dragRect.y }
        this.isBeingDragged = true
      }
    },
    drag(e) {
      if (this.isBeingDragged) {
        const left = Math.round((e.clientX - this.dragArea.x - this.dragOrigin.x) / this.gridCellWidth) * this.gridCellWidth
        const top = Math.round((e.clientY - this.dragArea.y - this.dragOrigin.y) / this.gridCellHeight) * this.gridCellHeight

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
      if (this.isBeingDragged) {
        window.document.body.style.cursor = 'default'
        this.isBeingDragged = false
        this.$emit('update:modelValue', {
          x: this.left / this.gridCellWidth,
          y: this.top / this.gridCellHeight
        })
      }
    },
  }
})
</script>

<style lang="scss" scoped>
.drag-item {
  display: inline-block;
  position: absolute;
  line-height: 0;
  border-radius: 3px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.fixed:hover {
    background-color: transparent;
  }

  &.dragged {
    background-color: rgba(255, 255, 255, 0.6);
  }
}
</style>
