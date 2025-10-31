<template>
  <view class="number-keyboard">
    <view class="keyboard-row">
      <view 
        v-for="num in [1, 2, 3, 4, 5]" 
        :key="num"
        class="keyboard-btn"
        :class="{ disabled: isDisabled(num) }"
        @click="handleNumberClick(num)"
      >
        <text class="btn-text">{{ num }}</text>
        <text v-if="showCount" class="btn-count">{{ getNumberCount(num) }}/9</text>
      </view>
    </view>
    <view class="keyboard-row">
      <view 
        v-for="num in [6, 7, 8, 9]" 
        :key="num"
        class="keyboard-btn"
        :class="{ disabled: isDisabled(num) }"
        @click="handleNumberClick(num)"
      >
        <text class="btn-text">{{ num }}</text>
        <text v-if="showCount" class="btn-count">{{ getNumberCount(num) }}/9</text>
      </view>
      <view 
        class="keyboard-btn erase"
        @click="handleEraseClick"
      >
        <text class="btn-icon">✕</text>
        <text class="btn-label">清除</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'NumberKeyboard',
  props: {
    // 是否显示数字计数
    showCount: {
      type: Boolean,
      default: true
    },
    // 当前棋盘状态（用于计数）
    board: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 计算每个数字在棋盘上的数量
    numberCounts() {
      const counts = {}
      if (!this.board || this.board.length === 0) {
        for (let num = 1; num <= 9; num++) {
          counts[num] = 0
        }
        return counts
      }
      
      for (let num = 1; num <= 9; num++) {
        counts[num] = 0
      }
      
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const value = this.board[i][j]
          if (value >= 1 && value <= 9) {
            counts[value]++
          }
        }
      }
      
      return counts
    }
  },
  methods: {
    handleNumberClick(num) {
      if (this.isDisabled(num)) return
      this.$emit('number-click', num)
    },
    
    handleEraseClick() {
      this.$emit('erase-click')
    },
    
    // 获取指定数字在棋盘上出现的次数
    getNumberCount(num) {
      return this.numberCounts[num] || 0
    },
    
    // 判断数字是否已填满（9个）
    isDisabled(num) {
      return this.getNumberCount(num) >= 9
    }
  }
}
</script>

<style scoped>
.number-keyboard {
  width: 100%;
  padding: 20rpx;
  background-color: #fafafa;
}

.keyboard-row {
  display: flex;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.keyboard-btn {
  flex: 1;
  height: 100rpx;
  background: #fff;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  position: relative;
}

.keyboard-btn:active:not(.disabled) {
  background: #f5f5f7;
}

.keyboard-btn.disabled {
  opacity: 0.3;
  background: #f5f5f7;
}

.keyboard-btn.erase {
  background: #ff3b30;
}

.keyboard-btn.erase:active {
  background: #ff453a;
}

.btn-text {
  font-size: 42rpx;
  font-weight: 500;
  color: #1d1d1f;
  line-height: 1;
  letter-spacing: -0.5px;
}

.btn-count {
  font-size: 20rpx;
  color: #86868b;
  margin-top: 8rpx;
  line-height: 1;
  font-weight: 400;
}

.btn-icon {
  font-size: 42rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
}

.btn-label {
  font-size: 22rpx;
  color: #fff;
  margin-top: 4rpx;
  line-height: 1;
  font-weight: 400;
}
</style>

