<template>
  <view class="game-timer">
    <text class="timer-icon">⏱</text>
    <text class="timer-text">{{ formattedTime }}</text>
  </view>
</template>

<script>
import { formatTime } from '@/utils/sudoku-helper'

export default {
  name: 'GameTimer',
  props: {
    // 已用时间（秒）
    seconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formattedTime() {
      return formatTime(this.seconds)
    }
  }
}
</script>

<style scoped>
.game-timer {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 24rpx;
  background: linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%);
  border-radius: 24rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.08);
}

.timer-icon {
  font-size: 32rpx;
  line-height: 1;
}

.timer-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  font-family: 'Monaco', 'Courier New', monospace;
  line-height: 1;
}
</style>

