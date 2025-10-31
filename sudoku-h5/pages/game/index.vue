<template>
  <view class="game-container">
    <!-- 状态栏占位 (H5环境) -->
    <!-- #ifdef H5 -->
    <view class="status-bar-h5"></view>
    <!-- #endif -->
    
    <!-- 顶部信息栏 -->
    <view class="game-header">
      <view class="header-left">
        <view class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </view>
        <view class="difficulty-badge" :style="difficultyStyle">
          <text class="badge-text">{{ difficultyName }}</text>
        </view>
      </view>
      <view class="header-right">
        <game-timer :seconds="elapsedTime" />
      </view>
    </view>

    <!-- 游戏统计 -->
    <view class="game-stats">
      <view class="stat-item">
        <text class="stat-label">错误</text>
        <text class="stat-value">{{ errors }}</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">进度</text>
        <text class="stat-value">{{ progress }}%</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">提示</text>
        <text class="stat-value">{{ hintsUsed }}</text>
      </view>
    </view>

    <!-- 模式指示器 -->
    <view class="mode-indicator">
      <text class="mode-text">当前模式：</text>
      <text class="mode-value" :class="{ active: noteMode }">
        {{ noteMode ? '笔记模式' : '填数模式' }}
      </text>
      <text class="mode-hint">点击下方"笔记"按钮切换</text>
    </view>

    <!-- 数独棋盘 -->
    <view class="board-container">
      <sudoku-board @cell-click="handleCellClick" />
    </view>

    <!-- 数字键盘 -->
    <number-keyboard 
      :board="board"
      @number-click="handleNumberInput"
      @erase-click="handleErase"
    />

    <!-- 功能按钮 -->
    <view class="function-buttons">
      <view class="function-btn" :class="{ disabled: !canUndo }" @click="handleUndo">
        <base-icon name="rotate-left" size="36" unit="rpx" color="#1d1d1f" class="btn-icon" />
        <text class="btn-text">撤销</text>
      </view>
      <view class="function-btn" :class="{ disabled: !canRedo }" @click="handleRedo">
        <base-icon name="rotate-right" size="36" unit="rpx" color="#1d1d1f" class="btn-icon" />
        <text class="btn-text">重做</text>
      </view>
      <view class="function-btn" :class="{ active: noteMode }" @click="handleToggleNote">
        <base-icon name="pencil" size="36" unit="rpx" :color="noteMode ? '#fff' : '#1d1d1f'" class="btn-icon" />
        <text class="btn-text">{{ noteMode ? '笔记' : '填数' }}</text>
      </view>
      <view class="function-btn" @click="handleHint">
        <base-icon name="lightbulb" size="36" unit="rpx" color="#1d1d1f" class="btn-icon" />
        <text class="btn-text">提示</text>
      </view>
      <view class="function-btn" @click="handleRestart">
        <base-icon name="arrow-rotate-right" size="36" unit="rpx" color="#1d1d1f" class="btn-icon" />
        <text class="btn-text">重置</text>
      </view>
    </view>

    <!-- 完成弹窗 -->
    <u-popup 
      :show="isComplete" 
      mode="center" 
      :closeOnClickOverlay="false"
      :round="20"
      :customStyle="{
        width: '600rpx',
        background: '#fff',
        overflow: 'hidden'
      }"
    >
      <view class="complete-modal-content">
        <view class="complete-modal-title">恭喜完成！</view>
        <view class="complete-content">
          <view class="complete-item">
            <text class="complete-label">难度：</text>
            <text class="complete-value">{{ difficultyName }}</text>
          </view>
          <view class="complete-item">
            <text class="complete-label">用时：</text>
            <text class="complete-value">{{ formattedTime }}</text>
          </view>
          <view class="complete-item">
            <text class="complete-label">错误：</text>
            <text class="complete-value">{{ errors }} 次</text>
          </view>
          <view class="complete-item">
            <text class="complete-label">提示：</text>
            <text class="complete-value">{{ hintsUsed }} 次</text>
          </view>
        </view>
        <view class="complete-modal-footer">
          <view class="complete-modal-btn complete-modal-btn-cancel" @click="handleBackHome">
            <text class="complete-modal-btn-text">返回首页</text>
          </view>
          <view class="complete-modal-btn complete-modal-btn-confirm" @click="handleNewGame">
            <text class="complete-modal-btn-text">再来一局</text>
          </view>
        </view>
      </view>
    </u-popup>

    <!-- 暂停遮罩 -->
    <u-popup 
      :show="isPaused" 
      mode="center"
      :overlay="true"
      :closeOnClickOverlay="true"
      :customStyle="{
        background: 'transparent'
      }"
      :overlayStyle="{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(20px)'
      }"
      @click="handleResume"
    >
      <view class="pause-content">
        <base-icon name="pause" size="100" unit="rpx" color="#fff" class="pause-icon" />
        <text class="pause-text">游戏已暂停</text>
        <text class="pause-hint">点击任意处继续</text>
      </view>
    </u-popup>

    <!-- 新手引导提示 -->
    <u-popup 
      :show="showGuide" 
      mode="center"
      :closeOnClickOverlay="true"
      :round="20"
      :customStyle="{
        width: '600rpx',
        background: '#fff',
        overflow: 'hidden'
      }"
      @close="handleCloseGuide"
    >
      <view class="guide-content">
        <view class="guide-header">
          <text class="guide-title">💡 游戏提示</text>
          <text class="guide-close" @click="handleCloseGuide">✕</text>
        </view>
        <view class="guide-body">
          <view class="guide-item">
            <base-icon name="pencil" size="28" unit="rpx" color="#fff" class="guide-icon" />
            <view class="guide-text-content">
              <text class="guide-item-title">笔记模式</text>
              <text class="guide-item-desc">用于标记候选数字，帮助推理</text>
            </view>
          </view>
          <view class="guide-item">
            <base-icon name="pen" size="28" unit="rpx" color="#fff" class="guide-icon" />
            <view class="guide-text-content">
              <text class="guide-item-title">填数模式</text>
              <text class="guide-item-desc">直接填入确定的答案</text>
            </view>
          </view>
          <view class="guide-tip">
            <text class="guide-tip-text">点击下方"笔记"按钮可随时切换模式</text>
          </view>
        </view>
        <view class="guide-footer">
          <view class="guide-btn" @click="handleCloseGuide">
            <text class="guide-btn-text">知道了</text>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SudokuBoard from '@/components/sudoku-board/index.vue'
import NumberKeyboard from '@/components/number-keyboard/index.vue'
import GameTimer from '@/components/game-timer/index.vue'
import BaseIcon from '@/components/base-icon/index.vue'
import { getDifficultyConfig, formatTime } from '@/utils/sudoku-helper'

export default {
  name: 'Game',
  components: {
    SudokuBoard,
    NumberKeyboard,
    GameTimer,
    BaseIcon
  },
  data() {
    return {
      timerInterval: null,
      showGuide: false
    }
  },
  computed: {
    ...mapState('sudoku', [
      'difficulty',
      'board',
      'selectedCell',
      'noteMode',
      'isPlaying',
      'isPaused',
      'isComplete',
      'elapsedTime',
      'errors',
      'hintsUsed'
    ]),
    ...mapGetters('sudoku', ['canUndo', 'canRedo', 'progress']),
    
    difficultyName() {
      return getDifficultyConfig(this.difficulty).name
    },
    
    difficultyStyle() {
      const config = getDifficultyConfig(this.difficulty)
      const [color1, color2] = config.gradient
      return {
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
      }
    },
    
    formattedTime() {
      return formatTime(this.elapsedTime)
    }
  },
  onLoad() {
    // 如果没有游戏，返回首页
    if (!this.board) {
      uni.reLaunch({
        url: '/pages/home/index'
      })
      return
    }
    
    // 启动计时器
    this.startTimer()
    
    // 检查是否首次游戏，显示引导
    const hasSeenGuide = uni.getStorageSync('sudoku_guide_seen')
    if (!hasSeenGuide) {
      setTimeout(() => {
        this.showGuide = true
      }, 500)
    }
  },
  onUnload() {
    this.stopTimer()
  },
  onShow() {
    if (this.isPlaying && !this.isPaused) {
      this.startTimer()
    }
  },
  onHide() {
    this.stopTimer()
    // 暂停游戏
    if (this.isPlaying && !this.isPaused) {
      this.pauseGame()
    }
  },
  methods: {
    ...mapActions('sudoku', [
      'selectCell',
      'inputNumber',
      'clearCell',
      'toggleNoteMode',
      'useHint',
      'undo',
      'redo',
      'pauseGame',
      'resumeGame',
      'restartGame',
      'clearSavedGame'
    ]),
    
    // 启动计时器
    startTimer() {
      this.stopTimer()
      this.timerInterval = setInterval(() => {
        this.$store.commit('sudoku/UPDATE_ELAPSED_TIME')
      }, 1000)
    },
    
    // 停止计时器
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    
    // 点击单元格
    handleCellClick({ row, col }) {
      this.selectCell({ row, col })
    },
    
    // 输入数字
    handleNumberInput(num) {
      this.inputNumber(num)
    },
    
    // 清除
    handleErase() {
      this.clearCell()
    },
    
    // 切换笔记模式
    handleToggleNote() {
      this.toggleNoteMode()
    },
    
    // 提示
    handleHint() {
      uni.showModal({
        title: '提示',
        content: '使用提示将填入一个正确答案，是否继续？',
        success: (res) => {
          if (res.confirm) {
            const hint = this.useHint()
            if (hint) {
              uni.showToast({
                title: '已填入提示',
                icon: 'success'
              })
            } else {
              uni.showToast({
                title: '没有可用提示',
                icon: 'none'
              })
            }
          }
        }
      })
    },
    
    // 撤销
    handleUndo() {
      if (this.canUndo) {
        this.undo()
      }
    },
    
    // 重做
    handleRedo() {
      if (this.canRedo) {
        this.redo()
      }
    },
    
    // 重新开始
    handleRestart() {
      uni.showModal({
        title: '提示',
        content: '确定要重新开始吗？当前进度将被清除。',
        success: (res) => {
          if (res.confirm) {
            this.restartGame()
          }
        }
      })
    },
    
    // 返回
    handleBack() {
      uni.showModal({
        title: '提示',
        content: '游戏进度已自动保存，确定要退出吗？',
        success: (res) => {
          if (res.confirm) {
            uni.navigateBack()
          }
        }
      })
    },
    
    // 继续游戏
    handleResume() {
      this.resumeGame()
      this.startTimer()
    },
    
    // 再来一局
    handleNewGame() {
      console.log("再来一局")
      this.clearSavedGame()
      uni.reLaunch({
        url: '/pages/home/index'
      })
    },
    
    // 返回首页
    handleBackHome() {
      console.log("返回首页")
      this.clearSavedGame()
      uni.reLaunch({
        url: '/pages/home/index'
      })
    },
    
    // 关闭新手引导
    handleCloseGuide() {
      this.showGuide = false
      uni.setStorageSync('sudoku_guide_seen', true)
    },
    
    // 测试完成弹窗
    handleTestComplete() {
      this.$store.commit('sudoku/SET_COMPLETE', true)
    }
  }
}
</script>

<style scoped>
.game-container {
  min-height: 100vh;
  background: #fafafa;
  padding: 20rpx;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  max-width: 100%;
}

/* H5状态栏占位 */
.status-bar-h5 {
  height: 44px;
  background: #fafafa;
  width: 100%;
}

/* 顶部信息栏 */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.back-btn {
  width: 64rpx;
  height: 64rpx;
  background: #fff;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.back-btn:active {
  background: #f5f5f7;
}

.back-icon {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.difficulty-badge {
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.badge-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.3px;
}

.header-right {
  display: flex;
  align-items: center;
}

/* 游戏统计 */
.game-stats {
  display: flex;
  justify-content: space-around;
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.stat-label {
  font-size: 22rpx;
  color: #86868b;
  line-height: 1;
  font-weight: 400;
}

.stat-value {
  font-size: 34rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1;
  letter-spacing: -0.5px;
}

/* 模式指示器 */
.mode-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 16rpx 24rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.mode-text {
  font-size: 24rpx;
  color: #86868b;
  font-weight: 400;
}

.mode-value {
  font-size: 26rpx;
  font-weight: 600;
  color: #1d1d1f;
  padding: 6rpx 16rpx;
  background: #f5f5f7;
  border-radius: 8rpx;
  transition: all 0.2s ease;
}

.mode-value.active {
  background: #0071e3;
  color: #fff;
}

.mode-hint {
  font-size: 22rpx;
  color: #86868b;
  font-weight: 400;
  margin-left: 8rpx;
}

/* 棋盘容器 */
.board-container {
  width: 100%;
  margin-bottom: 20rpx;
}

/* 功能按钮 */
.function-buttons {
  display: flex;
  justify-content: space-between;
  gap: 12rpx;
  margin-bottom: 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.function-btn {
  flex: 1;
  height: 96rpx;
  background: #fff;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.function-btn:active:not(.disabled) {
  background: #f5f5f7;
}

.function-btn.disabled {
  opacity: 0.3;
}

.function-btn.active {
  background: #0071e3;
  box-shadow: 0 2rpx 12rpx rgba(0, 113, 227, 0.3);
}

.function-btn.active .btn-text {
  color: #fff;
}

/* .btn-icon 样式已由 base-icon 组件处理，通过 color 和 size 属性控制 */

.btn-text {
  font-size: 20rpx;
  color: #86868b;
  line-height: 1;
  font-weight: 400;
}

/* 完成弹窗 */
.complete-modal-content {
  width: 100%;
}

.complete-modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f7;
}

.complete-content {
  padding: 32rpx;
}

.complete-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.complete-item:last-child {
  border-bottom: none;
}

.complete-label {
  font-size: 26rpx;
  color: #86868b;
  font-weight: 400;
}

.complete-value {
  font-size: 26rpx;
  font-weight: 500;
  color: #1d1d1f;
}

.complete-modal-footer {
  display: flex;
  padding: 32rpx;
  gap: 20rpx;
  border-top: 1rpx solid #f5f5f7;
}

.complete-modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.complete-modal-btn-cancel {
  background: #f5f5f7;
}

.complete-modal-btn-cancel:active {
  background: #e5e5e7;
}

.complete-modal-btn-confirm {
  background: #ff9500;
}

.complete-modal-btn-confirm:active {
  background: #e68600;
}

.complete-modal-btn-text {
  font-size: 30rpx;
  font-weight: 500;
  line-height: 1;
}

.complete-modal-btn-cancel .complete-modal-btn-text {
  color: #1d1d1f;
}

.complete-modal-btn-confirm .complete-modal-btn-text {
  color: #fff;
}

/* 暂停遮罩 */
.pause-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

/* .pause-icon 样式已由 base-icon 组件处理，通过 color 和 size 属性控制 */

.pause-text {
  font-size: 40rpx;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.5px;
}

.pause-hint {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
  font-weight: 400;
}

/* 新手引导 */
.guide-content {
  width: 100%;
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f5f5f7;
}

.guide-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1;
}

.guide-close {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #86868b;
  line-height: 48rpx;
  text-align: center;
}

.guide-body {
  padding: 32rpx;
}

.guide-item {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  margin-bottom: 28rpx;
}

.guide-item:last-of-type {
  margin-bottom: 0;
}

.guide-icon {
  width: 56rpx;
  height: 56rpx;
  background: #0071e3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #fff;
  flex-shrink: 0;
  line-height: 56rpx;
  text-align: center;
}

.guide-text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.guide-item-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
}

.guide-item-desc {
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.5;
  font-weight: 400;
}

.guide-tip {
  margin-top: 24rpx;
  padding: 20rpx;
  background: #f5f7fa;
  border-radius: 12rpx;
}

.guide-tip-text {
  display: block;
  font-size: 24rpx;
  color: #0071e3;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
}

.guide-footer {
  padding: 32rpx;
  border-top: 1rpx solid #f5f5f7;
}

.guide-btn {
  width: 100%;
  height: 88rpx;
  background: #0071e3;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.guide-btn:active {
  background: #0077ed;
}

.guide-btn-text {
  font-size: 30rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
}

/* 测试按钮 */
.test-button {
  margin: 30rpx auto;
  width: 300rpx;
  height: 80rpx;
  background: #ff3b30;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4rpx 12rpx rgba(255, 59, 48, 0.3);
}

.test-button:active {
  background: #e6342a;
  transform: scale(0.98);
}

.test-btn-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}
</style>

