<template>
  <!-- 字体图标模式 - Font Icon Mode -->
  <view
      v-if="isFontIcon"
      :style="{
        fontSize: getSize,
        color: color,
        opacity: disabled ? 0.5 : 1
      }"
      class="base-icon base-icon-font"
      :class="[
        disabled ? 'base-icon__not-allowed' : '',
        iconClass
      ]"
      @click="handleClick"
  ></view>

  <!-- 图片图标模式 - Image Icon Mode -->
  <image
      v-else-if="isImageMode"
      :src="url"
      :style="{
        width: getSize,
        height: getSize,
        opacity: disabled ? 0.5 : 1
      }"
      class="base-icon base-icon-image"
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
    // 字体图标名称（如: 'fa-heart', 'fa-user' 或 'heart', 'user'）
    // 支持两种格式：带 'fa-' 前缀或不带前缀，组件会自动处理
    name: {
      type: String,
      default: ''
    },
    // 图片图标 URL（如: '/static/images/icon.png', 'https://example.com/avatar.png'）
    url: {
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
      default: 'rpx'
    },
    // 图标颜色（仅字体图标有效）
    color: {
      type: String,
      default: ''
    },
    // 字体图标类型: 'solid' | 'regular' | 'brands'
    // 对应 Font Awesome 的 fas, far, fab
    type: {
      type: String,
      default: 'solid',
      validator: (value) => ['solid', 'regular', 'brands'].includes(value)
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
    // 判断是否为字体图标模式
    isFontIcon() {
      return !!this.name
    },

    // 判断是否为图片模式
    isImageMode() {
      return !!this.url
    },

    // 获取图标尺寸
    getSize() {
      const size = (uni.$fui && uni.$fui.baseIcon && uni.$fui.baseIcon.size) || 64
      return (this.size || size) + this.unit
    },

    // 获取字体图标的完整类名
    iconClass() {
      if (!this.isFontIcon) return ''

      // 根据 type 确定字体类型
      const fontClass = {
        'solid': 'fas',
        'regular': 'far',
        'brands': 'fab'
      }[this.type] || 'fas'

      // 如果 name 已经包含 fa- 前缀，直接使用；否则添加 fa- 前缀
      const iconName = this.name.startsWith('fa-') ? this.name : `fa-${this.name}`

      return `${fontClass} ${iconName}`
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

/* 基础图标样式 */
.base-icon {
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  transition: opacity 0.3s ease;
  display: inline-block;
}

/* 字体图标特定样式 */
.base-icon-font {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands';
  line-height: 1;
  text-align: center;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 图片图标特定样式 */
.base-icon-image {
  display: block;
}

/* 禁用状态 */
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
