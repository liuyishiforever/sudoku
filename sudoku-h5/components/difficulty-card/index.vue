<template>
  <view 
    class="difficulty-card"
    :style="cardStyle"
    @tap="handleClick"
  >
    <view class="card-icon" :style="{ color: iconColor }">
      <base-icon :name="icon" size="44" unit="rpx" :color="iconColor" class="icon-text" />
    </view>
    <view class="card-content">
      <text class="card-title">{{ config.name }}</text>
      <text class="card-desc">{{ config.description }}</text>
      <text class="card-info">预填 {{ config.filledCells }} 个数字</text>
    </view>
    <view class="card-arrow">
      <text class="arrow-icon">›</text>
    </view>
  </view>
</template>

<script>
import { getDifficultyConfig } from '@/utils/sudoku-helper'
import BaseIcon from '@/components/base-icon/index.vue'

export default {
  name: 'DifficultyCard',
  components: {
    BaseIcon
  },
  props: {
    difficulty: {
      type: String,
      required: true
    }
  },
  computed: {
    config() {
      return getDifficultyConfig(this.difficulty)
    },
    cardStyle() {
      return {}
    },
    icon() {
      const icons = {
        easy: 'star',
        medium: 'bolt',
        hard: 'fire',
        expert: 'crown'
      }
      return icons[this.difficulty] || 'gamepad'
    },
    iconColor() {
      const colors = {
        easy: '#34c759',
        medium: '#007aff',
        hard: '#ff9500',
        expert: '#ff3b30'
      }
      return colors[this.difficulty] || '#007aff'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.difficulty)
    }
  }
}
</script>

<style scoped>
.difficulty-card {
  width: 100%;
  padding: 32rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  margin-bottom: 16rpx;
  box-sizing: border-box;
  border: 1rpx solid rgba(0, 0, 0, 0.04);
}

.difficulty-card > view {
  margin-right: 24rpx;
}

.difficulty-card > view:last-child {
  margin-right: 0;
}

.difficulty-card:active {
  background: #fafafa;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.08);
  transform: scale(0.995);
}

.card-icon {
  width: 88rpx;
  height: 88rpx;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* .icon-text 样式已由 base-icon 组件处理 */

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content > text {
  margin-bottom: 6rpx;
}

.card-content > text:last-child {
  margin-bottom: 0;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.card-desc {
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.3;
  font-weight: 400;
}

.card-info {
  font-size: 22rpx;
  color: #86868b;
  line-height: 1.3;
  font-weight: 400;
}

.card-arrow {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.arrow-icon {
  font-size: 40rpx;
  font-weight: 400;
  color: #c7c7cc;
  line-height: 1;
}
</style>

