<template>
  <view class="rules-container">
    <!-- 头部 -->
    <view class="header">
      <view class="back-btn" @click="handleBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="header-title">游戏规则</text>
      <view class="placeholder"></view>
    </view>

    <!-- 内容 -->
    <scroll-view class="content" scroll-y>
      <!-- 基础规则 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-clipboard-list"></text>
          <text class="section-title">基础规则</text>
        </view>
        <view class="section-content">
          <view class="rule-item">
            <text class="rule-title">什么是数独？</text>
            <text class="rule-text">
              数独（Sudoku）是一种源自日本的数字逻辑游戏。游戏目标是在9×9的方格盘面上，根据已知数字，推理出所有剩余空格的数字，并满足每一行、每一列、每一个粗线宫（3×3）内的数字均含1-9，不重复。
            </text>
          </view>

          <view class="rule-item">
            <text class="rule-title">三大规则</text>
            <view class="rule-list">
              <view class="rule-list-item">
                <text class="rule-number">1</text>
                <text class="rule-desc">每一行必须填入1-9，且不能重复</text>
              </view>
              <view class="rule-list-item">
                <text class="rule-number">2</text>
                <text class="rule-desc">每一列必须填入1-9，且不能重复</text>
              </view>
              <view class="rule-list-item">
                <text class="rule-number">3</text>
                <text class="rule-desc">每个3×3宫格必须填入1-9，且不能重复</text>
              </view>
            </view>
          </view>

          <!-- 示意图 -->
          <view class="example-grid">
            <view class="grid-label">示例：有效的数独</view>
            <view class="mini-grid">
              <view v-for="row in exampleGrid" :key="row.id" class="mini-row">
                <view 
                  v-for="cell in row.cells" 
                  :key="cell.id" 
                  class="mini-cell"
                  :class="{ 
                    filled: cell.value !== 0,
                    highlight: cell.highlight 
                  }"
                >
                  <text class="mini-value">{{ cell.value || '' }}</text>
                </view>
              </view>
            </view>
            <view class="grid-desc">
              <text class="highlight-color">■</text> 高亮区域内的数字1-9不重复
            </view>
          </view>
        </view>
      </view>

      <!-- 游戏玩法 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-gamepad"></text>
          <text class="section-title">游戏玩法</text>
        </view>
        <view class="section-content">
          <view class="play-step">
            <view class="step-number">1</view>
            <view class="step-content">
              <text class="step-title">选择单元格</text>
              <text class="step-desc">点击空白单元格进行选择，选中后会高亮显示同行、同列和同宫格的单元格</text>
            </view>
          </view>

          <view class="play-step">
            <view class="step-number">2</view>
            <view class="step-content">
              <text class="step-title">填入数字</text>
              <text class="step-desc">使用底部数字键盘填入1-9的数字。如果填入的数字与已有数字冲突，会用红色标记提示</text>
            </view>
          </view>

          <view class="play-step">
            <view class="step-number">3</view>
            <view class="step-content">
              <text class="step-title">使用笔记模式</text>
              <text class="step-desc">点击"笔记"按钮切换到笔记模式，可以在单元格中记录候选数字，帮助推理</text>
            </view>
          </view>

          <view class="play-step">
            <view class="step-number">4</view>
            <view class="step-content">
              <text class="step-title">使用提示功能</text>
              <text class="step-desc">遇到困难时，可以点击"提示"按钮，系统会自动填入一个正确的数字</text>
            </view>
          </view>

          <view class="play-step">
            <view class="step-number">5</view>
            <view class="step-content">
              <text class="step-title">撤销和重做</text>
              <text class="step-desc">填错了？使用"撤销"按钮返回上一步，也可以使用"重做"按钮恢复</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 解题技巧 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-lightbulb"></text>
          <text class="section-title">解题技巧</text>
        </view>
        <view class="section-content">
          <view class="technique-item">
            <text class="technique-title">1. 唯一候选数法</text>
            <text class="technique-desc">
              观察某个单元格，如果根据行、列、宫格的已知数字，只有一个数字可以填入，那就是答案。
            </text>
          </view>

          <view class="technique-item">
            <text class="technique-title">2. 排除法</text>
            <text class="technique-desc">
              观察某一行、列或宫格，如果某个数字只能填入唯一的位置，那就确定了该位置的数字。
            </text>
          </view>

          <view class="technique-item">
            <text class="technique-title">3. 数对技巧</text>
            <text class="technique-desc">
              如果在同一行、列或宫格中，有两个单元格只能填入相同的两个候选数字，那么这两个数字就被"锁定"在这两个单元格中，可以从其他单元格的候选数字中排除。
            </text>
          </view>

          <view class="technique-item">
            <text class="technique-title">4. 从简单开始</text>
            <text class="technique-desc">
              建议从已知数字较多的行、列或宫格开始分析，这样候选数字更少，更容易找到答案。
            </text>
          </view>

          <view class="technique-item">
            <text class="technique-title">5. 善用笔记</text>
            <text class="technique-desc">
              对于复杂的题目，建议使用笔记功能标记每个单元格的候选数字，便于进行逻辑推理。
            </text>
          </view>
        </view>
      </view>

      <!-- 难度说明 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-bolt"></text>
          <text class="section-title">难度说明</text>
        </view>
        <view class="section-content">
          <view class="difficulty-item">
            <view class="difficulty-badge easy">
              <text class="difficulty-icon fa-solid fa-star"></text>
              <text class="difficulty-name">简单</text>
            </view>
            <text class="difficulty-desc">预填40-45个数字，适合初学者入门练习</text>
          </view>

          <view class="difficulty-item">
            <view class="difficulty-badge medium">
              <text class="difficulty-icon fa-solid fa-bolt"></text>
              <text class="difficulty-name">中等</text>
            </view>
            <text class="difficulty-desc">预填30-35个数字，需要一定的逻辑推理能力</text>
          </view>

          <view class="difficulty-item">
            <view class="difficulty-badge hard">
              <text class="difficulty-icon fa-solid fa-fire"></text>
              <text class="difficulty-name">困难</text>
            </view>
            <text class="difficulty-desc">预填25-30个数字，挑战你的智慧和耐心</text>
          </view>

          <view class="difficulty-item">
            <view class="difficulty-badge expert">
              <text class="difficulty-icon fa-solid fa-crown"></text>
              <text class="difficulty-name">专家</text>
            </view>
            <text class="difficulty-desc">预填20-25个数字，只为高手准备的终极挑战</text>
          </view>
        </view>
      </view>

      <!-- 小贴士 -->
      <view class="section">
        <view class="section-header">
          <text class="section-icon fa-solid fa-sparkles"></text>
          <text class="section-title">小贴士</text>
        </view>
        <view class="section-content">
          <view class="tip-item">
            <text class="tip-icon fa-solid fa-floppy-disk"></text>
            <text class="tip-text">游戏进度会自动保存，可以随时退出继续玩</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon fa-solid fa-clock"></text>
            <text class="tip-text">计时器会记录你的游戏时间，挑战最快完成记录</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon fa-solid fa-bullseye"></text>
            <text class="tip-text">坚持练习可以提高逻辑思维能力和专注力</text>
          </view>
        </view>
      </view>

      <!-- 底部留白 -->
      <view class="bottom-space"></view>
    </scroll-view>

    <!-- 开始游戏按钮 -->
    <view class="footer-btn" @click="handleStart">
      <text class="footer-btn-text">开始游戏</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Rules',
  data() {
    return {
      // 示例网格数据（简化的3×3示例）
      exampleGrid: [
        {
          id: 1,
          cells: [
            { id: 1, value: 5, highlight: true },
            { id: 2, value: 3, highlight: true },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 0, highlight: true },
            { id: 5, value: 7, highlight: true },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 0, highlight: false }
          ]
        },
        {
          id: 2,
          cells: [
            { id: 1, value: 6, highlight: true },
            { id: 2, value: 0, highlight: true },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 1, highlight: true },
            { id: 5, value: 9, highlight: true },
            { id: 6, value: 5, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 0, highlight: false }
          ]
        },
        {
          id: 3,
          cells: [
            { id: 1, value: 0, highlight: true },
            { id: 2, value: 9, highlight: true },
            { id: 3, value: 8, highlight: false },
            { id: 4, value: 0, highlight: true },
            { id: 5, value: 0, highlight: true },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 6, highlight: false },
            { id: 9, value: 0, highlight: false }
          ]
        },
        {
          id: 4,
          cells: [
            { id: 1, value: 8, highlight: false },
            { id: 2, value: 0, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 0, highlight: false },
            { id: 5, value: 6, highlight: false },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 3, highlight: false }
          ]
        },
        {
          id: 5,
          cells: [
            { id: 1, value: 4, highlight: false },
            { id: 2, value: 0, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 8, highlight: false },
            { id: 5, value: 0, highlight: false },
            { id: 6, value: 3, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 1, highlight: false }
          ]
        },
        {
          id: 6,
          cells: [
            { id: 1, value: 7, highlight: false },
            { id: 2, value: 0, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 0, highlight: false },
            { id: 5, value: 2, highlight: false },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 6, highlight: false }
          ]
        },
        {
          id: 7,
          cells: [
            { id: 1, value: 0, highlight: false },
            { id: 2, value: 6, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 0, highlight: false },
            { id: 5, value: 0, highlight: false },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 2, highlight: false },
            { id: 8, value: 8, highlight: false },
            { id: 9, value: 0, highlight: false }
          ]
        },
        {
          id: 8,
          cells: [
            { id: 1, value: 0, highlight: false },
            { id: 2, value: 0, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 4, highlight: false },
            { id: 5, value: 1, highlight: false },
            { id: 6, value: 9, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 0, highlight: false },
            { id: 9, value: 5, highlight: false }
          ]
        },
        {
          id: 9,
          cells: [
            { id: 1, value: 0, highlight: false },
            { id: 2, value: 0, highlight: false },
            { id: 3, value: 0, highlight: false },
            { id: 4, value: 0, highlight: false },
            { id: 5, value: 8, highlight: false },
            { id: 6, value: 0, highlight: false },
            { id: 7, value: 0, highlight: false },
            { id: 8, value: 7, highlight: false },
            { id: 9, value: 9, highlight: false }
          ]
        }
      ]
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
.rules-container {
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

/* 规则条目 */
.rule-item {
  margin-bottom: 32rpx;
}

.rule-item:last-child {
  margin-bottom: 0;
}

.rule-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 12rpx;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.rule-text {
  display: block;
  font-size: 26rpx;
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.rule-list-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.rule-number {
  width: 44rpx;
  height: 44rpx;
  background: #0071e3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  line-height: 44rpx;
  text-align: center;
}

.rule-desc {
  flex: 1;
  font-size: 26rpx;
  color: #86868b;
  line-height: 1.6;
  padding-top: 8rpx;
  font-weight: 400;
}

/* 示例网格 */
.example-grid {
  margin-top: 32rpx;
  padding: 24rpx;
  background: #f5f7fa;
  border-radius: 12rpx;
}

.grid-label {
  font-size: 26rpx;
  font-weight: 600;
  color: #666;
  margin-bottom: 16rpx;
  text-align: center;
}

.mini-grid {
  background: #333;
  border: 3rpx solid #333;
  display: inline-block;
  width: 100%;
}

.mini-row {
  display: flex;
}

.mini-cell {
  flex: 1;
  aspect-ratio: 1;
  background: #fff;
  border: 0.5rpx solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-cell.filled {
  background: #fafafa;
}

.mini-cell.highlight {
  background: #e3f2fd;
}

.mini-value {
  font-size: 22rpx;
  font-weight: 600;
  color: #333;
  line-height: 1;
}

.grid-desc {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.highlight-color {
  color: #2196f3;
  font-size: 20rpx;
}

/* 玩法步骤 */
.play-step {
  display: flex;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.play-step:last-child {
  margin-bottom: 0;
}

.step-number {
  width: 48rpx;
  height: 48rpx;
  background: #34c759;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  line-height: 1;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.step-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.step-desc {
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 技巧条目 */
.technique-item {
  margin-bottom: 28rpx;
}

.technique-item:last-child {
  margin-bottom: 0;
}

.technique-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 10rpx;
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.technique-desc {
  display: block;
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 难度条目 */
.difficulty-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.difficulty-item:last-child {
  margin-bottom: 0;
}

.difficulty-badge {
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.difficulty-badge.easy {
  background: #34c759;
}

.difficulty-badge.medium {
  background: #007aff;
}

.difficulty-badge.hard {
  background: #ff9500;
}

.difficulty-badge.expert {
  background: #ff3b30;
}

.difficulty-icon {
  font-size: 24rpx;
  color: #fff;
  line-height: 1;
}

.difficulty-name {
  font-size: 24rpx;
  font-weight: 500;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.3px;
}

.difficulty-desc {
  flex: 1;
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.6;
  font-weight: 400;
}

/* 小贴士 */
.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 32rpx;
  line-height: 1;
  flex-shrink: 0;
  color: #0071e3;
}

.tip-text {
  flex: 1;
  font-size: 24rpx;
  color: #86868b;
  line-height: 1.6;
  padding-top: 6rpx;
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

