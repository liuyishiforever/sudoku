<template>
  <image
      :src="name"
      :style="{
        width: getSize,
        height: getSize,
        opacity: disabled ? 0.5 : 1
      }"
      class="base-icon"
      :class="[disabled ? 'base-icon__not-allowed' : '']"
      mode="aspectFit"
      @click="handleClick"
  />
</template>

<script>
export default {
  name: "base-icon",
  emits: ['click'],
  props: {
    // 图片路径
    name: {
      type: String,
      default: ''
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 0
    },
    // 单位，rpx 或 px
    unit: {
      type: String,
      default: ''
    },
    // 是否禁用点击
    disabled: {
      type: Boolean,
      default: false
    },
    // 点击事件参数
    params: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    getSize() {
      const size = (uni.$fui && uni.$fui.baseIcon && uni.$fui.baseIcon.size) || 64
      const unit = (uni.$fui && uni.$fui.baseIcon && uni.$fui.baseIcon.unit) || 'rpx'
      return (this.size || size) + (this.unit || unit)
    }
  },

  methods: {
    handleClick() {
      if (this.disabled) return;
      this.$emit('click', {
        params: this.params
      });
    }
  }
}
</script>

<style scoped lang="scss">

.base-icon {
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  transition: opacity 0.3s ease;
  display: block;
}

.base-icon__not-allowed {
  /* #ifdef H5 */
  cursor: not-allowed !important;
  /* #endif */
}

/* 添加点击效果 */
.base-icon:active {
  opacity: 0.8;
}
</style>
