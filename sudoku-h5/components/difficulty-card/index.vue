<template>
  <view 
    class="difficulty-card"
    :style="cardStyle"
    @click="handleClick"
  >
    <view class="card-icon" :style="{ color: iconColor }">
      <text :class="['icon-text', icon]"></text>
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

export default {
  name: 'DifficultyCard',
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
        easy: 'fa-solid fa-star',
        medium: 'fa-solid fa-bolt',
        hard: 'fa-solid fa-fire',
        expert: 'fa-solid fa-crown'
      }
      return icons[this.difficulty] || 'fa-solid fa-gamepad'
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
  gap: 24rpx;
  background: #fff;
  box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  margin-bottom: 16rpx;
  box-sizing: border-box;
  border: 1rpx solid rgba(0, 0, 0, 0.04);
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

.icon-text {
  font-size: 44rpx;
  line-height: 1;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
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

