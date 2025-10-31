<template>
  <view class="home-container">
    <!-- 状态栏占位 (H5环境) -->
    <!-- #ifdef H5 -->
    <view class="status-bar"></view>
    <!-- #endif -->
    
    <!-- 主内容 -->
    <view class="content">
      <!-- Logo -->
      <view class="logo-section">
        <image class="logo-image" src="/static/images/logo.png" mode="aspectFit" />
      </view>

      <!-- 标题 -->
      <view class="title-section">
        <text class="title">挑战你的智力</text>
        <text class="subtitle">选择难度开始游戏</text>
      </view>

      <!-- 难度选择卡片 -->
      <view class="difficulty-list">
        <difficulty-card
          v-for="level in difficulties"
          :key="level"
          :difficulty="level"
          @tap="handleDifficultyClick"
        />
      </view>

      <!-- 继续游戏按钮 -->
      <view v-if="hasSavedGame" class="continue-game-btn" @tap="handleContinue">
        <base-icon name="play" size="32" unit="rpx" color="#fff" class="continue-icon" />
        <text class="continue-text">继续上次游戏</text>
      </view>

      <!-- 底部链接 -->
      <view class="footer-links">
        <view class="link-item" @tap="handleRules">
          <base-icon name="book" size="26" unit="rpx" color="#0071e3" class="link-icon" />
          <text class="link-text">游戏规则</text>
        </view>
        <view class="link-item" @tap="handleTips">
          <base-icon name="lightbulb" size="26" unit="rpx" color="#0071e3" class="link-icon" />
          <text class="link-text">技巧分享</text>
        </view>
        <view class="link-item" @tap="handleAbout">
          <base-icon name="info-circle" size="26" unit="rpx" color="#0071e3" class="link-icon" />
          <text class="link-text">关于我们</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DifficultyCard from '@/components/difficulty-card/index.vue'
import BaseIcon from '@/components/base-icon/index.vue'

export default {
  name: 'Home',
  components: {
    DifficultyCard,
    BaseIcon
  },
  data() {
    return {
      difficulties: ['easy', 'medium', 'hard', 'expert']
    }
  },
  computed: {
    ...mapState('sudoku', ['board']),
    hasSavedGame() {
      return !!this.board
    }
  },
  methods: {
    ...mapActions('sudoku', ['startNewGame']),

    handleDifficultyClick(difficulty) {
      uni.showLoading({
        title: '生成数独中...',
        mask: true
      })

      setTimeout(() => {
        this.startNewGame(difficulty)
        uni.hideLoading()
        uni.navigateTo({
          url: '/pages/game/index'
        })
      }, 100)
    },

    handleContinue() {
      uni.navigateTo({
        url: '/pages/game/index'
      })
    },

    handleRules() {
      uni.navigateTo({
        url: '/pages/rules/index'
      })
    },

    handleTips() {
      uni.navigateTo({
        url: '/pages/tips/index'
      })
    },

    handleAbout() {
      uni.navigateTo({
        url: '/pages/about/index'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home-container {
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 100vh;
}

/* 状态栏占位 */
.status-bar {
  height: 44px;
  background: #fbfbfd;
  width: 100%;
}

/* 头部 */
.header {
  padding: 60rpx 32rpx 32rpx;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1rpx solid #f5f5f7;
}

.logo {
  display: flex;
  align-items: center;
}

/* .logo-icon 样式已由 base-icon 组件处理 */

.logo-text {
  font-size: 44rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1;
  letter-spacing: -0.5px;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 48rpx 32rpx 40rpx;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  background: #fbfbfd;
}

/* Logo区域 */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32rpx;
}

.logo-image {
  width: 160rpx;
  height: 160rpx;
}

/* 标题区域 */
.title-section {
  margin-bottom: 56rpx;
  text-align: center;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: 600;
  /* color: #1d1d1f; */
  margin-bottom: 12rpx;
  line-height: 1.1;
  letter-spacing: -1px;
}

.subtitle {
  display: block;
  font-size: 26rpx;
  color: #86868b;
  line-height: 1.4;
  font-weight: 400;
}

/* 难度列表 */
.difficulty-list {
  margin-bottom: 32rpx;
  width: 100%;
  box-sizing: border-box;
}

/* 继续游戏按钮 */
.continue-game-btn {
  width: 100%;
  padding: 28rpx;
  background: #0071e3;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.continue-game-btn > view,
.continue-game-btn > text {
  margin-right: 12rpx;
}

.continue-game-btn > view:last-child,
.continue-game-btn > text:last-child {
  margin-right: 0;
}

.continue-game-btn:active {
  background: #0077ed;
}

/* .continue-icon 样式已由 base-icon 组件处理 */

.continue-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.3px;
}

/* 底部链接 */
.footer-links {
  display: flex;
  justify-content: center;
  padding: 20rpx 0;
  width: 100%;
  box-sizing: border-box;
}

.footer-links > view {
  margin-right: 16rpx;
}

.footer-links > view:last-child {
  margin-right: 0;
}

.link-item {
  display: flex;
  align-items: center;
  padding: 16rpx 28rpx;
  background: transparent;
  border-radius: 48rpx;
  transition: all 0.2s ease;
}

.link-item > view,
.link-item > text {
  margin-right: 10rpx;
}

.link-item > view:last-child,
.link-item > text:last-child {
  margin-right: 0;
}

.link-item:active {
  background: rgba(0, 0, 0, 0.05);
}

/* .link-icon 样式已由 base-icon 组件处理 */

.link-text {
  font-size: 26rpx;
  color: #0071e3;
  line-height: 1;
  font-weight: 400;
}
</style>

