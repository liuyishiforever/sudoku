<template>
  <view class="tips-container fui-wrap">
    <!-- 状态栏占位 -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="status-bar-h5"></view>
    <!-- #endif -->
    
    <!-- 基础技巧 -->
    <view class="section">
        <view class="section-header">
          <base-icon name="star" size="36" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">基础技巧</text>
        </view>
        <view class="section-content">
          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">1</text>
              <text class="tip-title">唯一候选数法</text>
            </view>
            <text class="tip-desc">
              观察某个空格，根据所在行、列、宫格中已有的数字，排除不可能的数字。如果只剩下一个候选数字，那么这个数字就是答案。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">某个空格所在的行已有1-8，那么这个空格只能填9。</text>
            </view>
          </view>

          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">2</text>
              <text class="tip-title">唯一位置法</text>
            </view>
            <text class="tip-desc">
              观察某一行、列或宫格，如果某个数字只能填在唯一的位置，那么就可以确定这个位置的数字。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">某宫格缺少数字5，而根据其他条件，5只能填在一个特定位置。</text>
            </view>
          </view>

          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">3</text>
              <text class="tip-title">善用笔记功能</text>
            </view>
            <text class="tip-desc">
              对于复杂的题目，建议开启笔记模式，在空格中标记所有可能的候选数字。这样可以帮助你更好地进行逻辑推理。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">在某个空格中标记2、5、8，随着游戏进行逐步排除不可能的数字。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 进阶技巧 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="fire" size="36" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">进阶技巧</text>
        </view>
        <view class="section-content">
          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">4</text>
              <text class="tip-title">数对排除法</text>
            </view>
            <text class="tip-desc">
              如果在同一行、列或宫格中，有两个空格只能填相同的两个候选数字，那么这两个数字就被"锁定"在这两个格子中，可以从其他格子的候选数字中排除。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">某行中有两个空格都只能填3或7，那么这一行其他格子就不能填3和7。</text>
            </view>
          </view>

          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">5</text>
              <text class="tip-title">数组排除法</text>
            </view>
            <text class="tip-desc">
              数对排除法的扩展。如果三个空格只能填相同的三个候选数字，这三个数字就被锁定，可以从其他格子中排除。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">某列中三个空格只能填1、4、9，那么这一列其他格子就不能填这三个数字。</text>
            </view>
          </view>

          <view class="tip-card">
            <view class="tip-header">
              <text class="tip-number">6</text>
              <text class="tip-title">指向对排除法</text>
            </view>
            <text class="tip-desc">
              观察某个宫格，如果某个候选数字只能出现在该宫格的某一行或某一列，那么可以从这一行或列的其他宫格中排除该候选数字。
            </text>
            <view class="tip-example">
              <text class="example-label">💡 示例</text>
              <text class="example-text">左上宫格中的6只能在第一行，那么第一行其他宫格就不能填6。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 解题策略 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="chess" size="36" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">解题策略</text>
        </view>
        <view class="section-content">
          <view class="strategy-item">
            <base-icon name="1" size="26" unit="rpx" color="#fff" class="strategy-icon" />
            <view class="strategy-content">
              <text class="strategy-title">从简单开始</text>
              <text class="strategy-text">优先填写候选数字少的空格，从已知数字较多的行、列、宫格入手。</text>
            </view>
          </view>

          <view class="strategy-item">
            <base-icon name="2" size="26" unit="rpx" color="#fff" class="strategy-icon" />
            <view class="strategy-content">
              <text class="strategy-title">交叉验证</text>
              <text class="strategy-text">填入一个数字后，立即检查相关的行、列、宫格是否产生新的确定数字。</text>
            </view>
          </view>

          <view class="strategy-item">
            <base-icon name="3" size="26" unit="rpx" color="#fff" class="strategy-icon" />
            <view class="strategy-content">
              <text class="strategy-title">扫描法</text>
              <text class="strategy-text">系统性地检查每一行、每一列、每个宫格，寻找唯一候选数字或唯一位置。</text>
            </view>
          </view>

          <view class="strategy-item">
            <base-icon name="4" size="26" unit="rpx" color="#fff" class="strategy-icon" />
            <view class="strategy-content">
              <text class="strategy-title">保持耐心</text>
              <text class="strategy-text">遇到困难时不要急躁，仔细检查是否遗漏了某些线索，必要时使用笔记功能。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 常见错误 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="triangle-exclamation" size="36" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">常见错误</text>
        </view>
        <view class="section-content">
          <view class="error-item">
            <base-icon name="xmark" size="26" unit="rpx" color="#fff" class="error-icon" />
            <view class="error-content">
              <text class="error-title">没有充分利用笔记</text>
              <text class="error-text">对于中高难度题目，不使用笔记会大大增加难度，容易遗漏重要信息。</text>
            </view>
          </view>

          <view class="error-item">
            <base-icon name="xmark" size="26" unit="rpx" color="#fff" class="error-icon" />
            <view class="error-content">
              <text class="error-title">猜测而非推理</text>
              <text class="error-text">随意填入数字而不是通过逻辑推理，容易导致错误累积，最终无法完成。</text>
            </view>
          </view>

          <view class="error-item">
            <base-icon name="xmark" size="26" unit="rpx" color="#fff" class="error-icon" />
            <view class="error-content">
              <text class="error-title">忽略检查</text>
              <text class="error-text">填入数字后不检查是否与已有数字冲突，导致出现错误而不自知。</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 底部留白 -->
      <view class="bottom-space"></view>

    <!-- 开始游戏按钮 -->
    <view class="footer-btn" @click="handleStart">
      <text class="footer-btn-text">开始练习</text>
    </view>
  </view>
</template>

<script>
import BaseIcon from '@/components/base-icon/index.vue'

export default {
  name: 'Tips',
  components: {
    BaseIcon
  },
  data() {
    return {
      statusBarHeight: 0
    }
  },
  onLoad() {
    try {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 0
    } catch (e) {
      console.error('获取系统信息失败:', e)
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack()
    },
    handleStart() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.tips-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fbfbfd 0%, #f5f7fa 100%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  max-width: 100%;
  padding: 32rpx;
  padding-bottom: 0;
}

/* H5状态栏占位 */
.status-bar-h5 {
  height: 44px;
  background: #fbfbfd;
  width: 100%;
}

/* 章节 */
.section {
  margin-bottom: 48rpx;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
  padding-left: 8rpx;
}

/* .section-icon 样式已由 base-icon 组件处理 */

.section-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1d1d1f;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.section-content {
  background: #fff;
  border-radius: 20rpx;
  padding: 36rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06), 0 1rpx 4rpx rgba(0, 0, 0, 0.04);
  border: 1rpx solid rgba(0, 0, 0, 0.04);
}

/* 技巧卡片 */
.tip-card {
  margin-bottom: 36rpx;
  padding-bottom: 36rpx;
  border-bottom: 2rpx solid #f5f5f7;
  transition: all 0.3s ease;
}

.tip-card:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.tip-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.tip-number {
  width: 56rpx;
  height: 56rpx;
  background: linear-gradient(135deg, #0071e3 0%, #0077ed 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 700;
  color: #fff;
  line-height: 56rpx;
  text-align: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(0, 113, 227, 0.25);
}

.tip-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3px;
  flex: 1;
}

.tip-desc {
  display: block;
  font-size: 26rpx;
  color: #6e6e73;
  line-height: 1.7;
  margin-bottom: 20rpx;
  font-weight: 400;
  padding-left: 4rpx;
}

.tip-example {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%);
  padding: 24rpx;
  border-radius: 14rpx;
  position: relative;
  overflow: hidden;
}

.tip-example::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 113, 227, 0.03) 0%, transparent 100%);
  pointer-events: none;
}

.example-label {
  display: block;
  font-size: 24rpx;
  font-weight: 600;
  color: #0071e3;
  margin-bottom: 10rpx;
  line-height: 1.4;
  position: relative;
}

.example-text {
  display: block;
  font-size: 24rpx;
  color: #6e6e73;
  line-height: 1.7;
  font-weight: 400;
  position: relative;
}

/* 策略条目 */
.strategy-item {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  margin-bottom: 32rpx;
  padding: 24rpx;
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.05) 0%, rgba(48, 209, 88, 0.02) 100%);
  border-radius: 16rpx;
  transition: all 0.3s ease;
  border: 1rpx solid rgba(52, 199, 89, 0.1);
}

.strategy-item:last-child {
  margin-bottom: 0;
}

.strategy-item:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.08) 0%, rgba(48, 209, 88, 0.04) 100%);
}

/* .strategy-icon 样式已由 base-icon 组件处理，但需要保持背景和圆形容器 */
.strategy-icon {
  width: 56rpx;
  height: 56rpx;
  background: linear-gradient(135deg, #34c759 0%, #30d158 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(52, 199, 89, 0.3);
}

.strategy-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  padding-top: 4rpx;
}

.strategy-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.strategy-text {
  font-size: 24rpx;
  color: #6e6e73;
  line-height: 1.7;
  font-weight: 400;
}

/* 错误条目 */
.error-item {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  margin-bottom: 32rpx;
  padding: 24rpx;
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.05) 0%, rgba(255, 69, 58, 0.02) 100%);
  border-radius: 16rpx;
  transition: all 0.3s ease;
  border: 1rpx solid rgba(255, 59, 48, 0.1);
}

.error-item:last-child {
  margin-bottom: 0;
}

.error-item:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.08) 0%, rgba(255, 69, 58, 0.04) 100%);
}

/* .error-icon 样式已由 base-icon 组件处理，但需要保持背景和圆形容器 */
.error-icon {
  width: 56rpx;
  height: 56rpx;
  background: linear-gradient(135deg, #ff3b30 0%, #ff453a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(255, 59, 48, 0.3);
}

.error-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  padding-top: 4rpx;
}

.error-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.error-text {
  font-size: 24rpx;
  color: #6e6e73;
  line-height: 1.7;
  font-weight: 400;
}

/* 底部留白 */
.bottom-space {
  height: 160rpx;
  flex-shrink: 0;
}

/* 底部按钮 */
.footer-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.footer-btn-text {
  display: block;
  width: 100%;
  height: 96rpx;
  background: linear-gradient(135deg, #0071e3 0%, #0077ed 100%);
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
  text-align: center;
  line-height: 96rpx;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.3px;
  box-shadow: 0 6rpx 20rpx rgba(0, 113, 227, 0.35);
}

.footer-btn:active .footer-btn-text {
  background: linear-gradient(135deg, #0077ed 0%, #007aff 100%);
  transform: scale(0.98);
  box-shadow: 0 4rpx 16rpx rgba(0, 113, 227, 0.3);
}

/* 响应式优化 */
@media screen and (min-width: 750px) {
  .tips-container {
    padding: 48rpx;
  }
  
  .section-content {
    padding: 48rpx;
  }
}
</style>

