<template>
  <view class="skeleton-container">
    <!-- 用户头部骨架 -->
    <view class="skeleton-header">
      <view class="skeleton-user">
        <view class="skeleton-avatar"></view>
        <view class="skeleton-user-info">
          <view class="skeleton-text skeleton-text-name"></view>
          <view class="skeleton-text skeleton-text-phone"></view>
        </view>
      </view>
      
      <!-- 会员卡骨架 -->
      <view class="skeleton-card">
        <view class="skeleton-card-header">
          <view class="skeleton-text skeleton-text-title"></view>
          <view class="skeleton-badge"></view>
        </view>
        <view class="skeleton-stats">
          <view class="skeleton-stat" v-for="i in 4" :key="i">
            <view class="skeleton-text skeleton-text-value"></view>
            <view class="skeleton-text skeleton-text-label"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 服务区域骨架 -->
    <view class="skeleton-services">
      <view class="skeleton-text skeleton-section-title"></view>
      <view class="skeleton-service-grid">
        <view class="skeleton-service-item" v-for="i in 7" :key="i">
          <view class="skeleton-icon"></view>
          <view class="skeleton-text skeleton-service-name"></view>
        </view>
      </view>
    </view>
    
    <!-- 合伙人卡片骨架 -->
    <view class="skeleton-partner"></view>
  </view>
</template>

<script>
export default {
  name: 'MineSkeleton'
}
</script>

<style scoped>
.skeleton-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 骨架屏动画 */
@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 用户头部骨架 */
.skeleton-header {
  background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
  padding: 40rpx 30rpx 30rpx;
}

.skeleton-user {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.skeleton-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.skeleton-user-info {
  flex: 1;
}

.skeleton-text {
  height: 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-text-name {
  width: 160rpx;
  height: 36rpx;
  margin-bottom: 12rpx;
}

.skeleton-text-phone {
  width: 200rpx;
  height: 24rpx;
}

/* 会员卡骨架 */
.skeleton-card {
  background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
  border-radius: 20rpx;
  padding: 30rpx;
}

.skeleton-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.skeleton-text-title {
  width: 140rpx;
  height: 32rpx;
}

.skeleton-badge {
  width: 140rpx;
  height: 40rpx;
  border-radius: 20rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.skeleton-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-text-value {
  width: 60rpx;
  height: 32rpx;
  margin-bottom: 8rpx;
}

.skeleton-text-label {
  width: 80rpx;
  height: 24rpx;
}

/* 服务区域骨架 */
.skeleton-services {
  background-color: #fff;
  margin: 30rpx;
  border-radius: 20rpx;
  padding: 30rpx;
}

.skeleton-section-title {
  width: 140rpx;
  height: 30rpx;
  margin-bottom: 30rpx;
}

.skeleton-service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.skeleton-service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-icon {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 12rpx;
}

.skeleton-service-name {
  width: 80rpx;
  height: 24rpx;
}

/* 合伙人卡片骨架 */
.skeleton-partner {
  margin: 30rpx;
  height: 320rpx;
  border-radius: 20rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}
</style>

