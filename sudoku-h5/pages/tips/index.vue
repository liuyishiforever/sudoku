<template>
  <view class="tips-container">
    <!-- 头部 -->
    <view class="header">
      <view class="back-btn" @click="handleBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">技巧分享</text>
      <view class="placeholder"></view>
    </view>

    <!-- 内容 -->
    <scroll-view class="content" scroll-y>
      <!-- 基础技巧 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-star"></text>
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
          <text class="section-icon fa-solid fa-fire"></text>
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
          <text class="section-icon fa-solid fa-chess"></text>
          <text class="section-title">解题策略</text>
        </view>
        <view class="section-content">
          <view class="strategy-item">
            <text class="strategy-icon fa-solid fa-1"></text>
            <view class="strategy-content">
              <text class="strategy-title">从简单开始</text>
              <text class="strategy-text">优先填写候选数字少的空格，从已知数字较多的行、列、宫格入手。</text>
            </view>
          </view>

          <view class="strategy-item">
            <text class="strategy-icon fa-solid fa-2"></text>
            <view class="strategy-content">
              <text class="strategy-title">交叉验证</text>
              <text class="strategy-text">填入一个数字后，立即检查相关的行、列、宫格是否产生新的确定数字。</text>
            </view>
          </view>

          <view class="strategy-item">
            <text class="strategy-icon fa-solid fa-3"></text>
            <view class="strategy-content">
              <text class="strategy-title">扫描法</text>
              <text class="strategy-text">系统性地检查每一行、每一列、每个宫格，寻找唯一候选数字或唯一位置。</text>
            </view>
          </view>

          <view class="strategy-item">
            <text class="strategy-icon fa-solid fa-4"></text>
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
          <text class="section-icon fa-solid fa-triangle-exclamation"></text>
          <text class="section-title">常见错误</text>
        </view>
        <view class="section-content">
          <view class="error-item">
            <text class="error-icon fa-solid fa-xmark"></text>
            <view class="error-content">
              <text class="error-title">没有充分利用笔记</text>
              <text class="error-text">对于中高难度题目，不使用笔记会大大增加难度，容易遗漏重要信息。</text>
            </view>
          </view>

          <view class="error-item">
            <text class="error-icon fa-solid fa-xmark"></text>
            <view class="error-content">
              <text class="error-title">猜测而非推理</text>
              <text class="error-text">随意填入数字而不是通过逻辑推理，容易导致错误累积，最终无法完成。</text>
            </view>
          </view>

          <view class="error-item">
            <text class="error-icon fa-solid fa-xmark"></text>
            <view class="error-content">
              <text class="error-title">忽略检查</text>
              <text class="error-text">填入数字后不检查是否与已有数字冲突，导致出现错误而不自知。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部留白 -->
      <view class="bottom-space"></view>
    </scroll-view>

    <!-- 开始游戏按钮 -->
    <view class="footer-btn" @click="handleStart">
      <text class="footer-btn-text">开始练习</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Tips',
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
  background: #fafafa;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  max-width: 100%;
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  background: #fff;
  box-shadow: 0 1rpx 0 rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
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

.header-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1;
  letter-spacing: -0.5px;
}

.placeholder {
  width: 64rpx;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 32rpx;
  width: 100%;
  box-sizing: border-box;
}

/* 章节 */
.section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.section-icon {
  font-size: 36rpx;
  line-height: 1;
  color: #0071e3;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1;
  letter-spacing: -0.5px;
}

.section-content {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

/* 技巧卡片 */
.tip-card {
  margin-bottom: 32rpx;
  padding-bottom: 32rpx;
  border-bottom: 1rpx solid #f5f5f7;
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
  margin-bottom: 16rpx;
}

.tip-number {
  width: 48rpx;
  height: 48rpx;
  background: #0071e3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  line-height: 48rpx;
  text-align: center;
  flex-shrink: 0;
}

.tip-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.tip-desc {
  display: block;
  font-size: 26rpx;
  color: #86868b;
  line-height: 1.6;
  margin-bottom: 16rpx;
  font-weight: 400;
}

.tip-example {
  background: #f5f7fa;
  padding: 20rpx;
  border-radius: 12rpx;
}

.example-label {
  display: block;
  font-size: 24rpx;
  font-weight: 600;
  color: #0071e3;
  margin-bottom: 8rpx;
  line-height: 1.4;
}

.example-text {
  display: block;
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 策略条目 */
.strategy-item {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  margin-bottom: 28rpx;
}

.strategy-item:last-child {
  margin-bottom: 0;
}

.strategy-icon {
  width: 52rpx;
  height: 52rpx;
  background: linear-gradient(135deg, #34c759 0%, #30d158 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  line-height: 52rpx;
  text-align: center;
}

.strategy-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
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
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 错误条目 */
.error-item {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  margin-bottom: 28rpx;
}

.error-item:last-child {
  margin-bottom: 0;
}

.error-icon {
  width: 52rpx;
  height: 52rpx;
  background: #ff3b30;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  line-height: 52rpx;
  text-align: center;
}

.error-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
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
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 底部留白 */
.bottom-space {
  height: 140rpx;
}

/* 底部按钮 */
.footer-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 32rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 -1rpx 0 rgba(0, 0, 0, 0.08);
}

.footer-btn-text {
  display: block;
  width: 100%;
  height: 88rpx;
  background: #0071e3;
  border-radius: 12rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 88rpx;
  transition: all 0.2s ease;
  letter-spacing: -0.3px;
}

.footer-btn:active .footer-btn-text {
  background: #0077ed;
}
</style>

