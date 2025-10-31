<template>
  <view class="skeleton-container">
    <!-- 通知栏骨架 -->
    <view class="skeleton-notice">
      <view class="skeleton-circle"></view>
      <view class="skeleton-text skeleton-text-short"></view>
    </view>

    <!-- 轮播图骨架 -->
    <view class="skeleton-banner"></view>

    <!-- 内容区域骨架 -->
    <view class="skeleton-content">
      <!-- Logo骨架 -->
      <view class="skeleton-logo"></view>

      <!-- 今日活动骨架 -->
      <view class="skeleton-activity"></view>

      <!-- 2x2宫格骨架 -->
      <view class="skeleton-grid">
        <view class="skeleton-card" v-for="i in 4" :key="i"></view>
      </view>

      <!-- 地图骨架 -->
      <view class="skeleton-map"></view>

      <!-- 联系我们骨架 -->
      <view class="skeleton-contact"></view>

      <!-- 介绍图片骨架 -->
      <view class="skeleton-introduce"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HomeSkeleton'
}
</script>

<style scoped>
/* 骨架屏容器 */
.skeleton-container {
  width: 100%;
  background: linear-gradient(180deg, #f8faf9 0%, #ffffff 100%);
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

.skeleton-notice {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  height: 90rpx;
  box-sizing: border-box;
}

.skeleton-circle {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  flex-shrink: 0;
  margin-right: 16rpx;
}

.skeleton-text {
  height: 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-text-short {
  width: 60%;
}

.skeleton-banner {
  width: 100%;
  height: 360rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-content {
  padding: 40rpx 30rpx 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-logo {
  width: 256rpx;
  height: 80rpx;
  border-radius: 12rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 40rpx;
}

.skeleton-activity {
  width: 100%;
  height: 172rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 40rpx;
}

.skeleton-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-bottom: 40rpx;
  padding: 20rpx;
  background-color: #F9F9F9;
}

.skeleton-card {
  width: 100%;
  height: 196rpx;
  border-radius: 12rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-map {
  width: 100%;
  height: 196rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 40rpx;
}

.skeleton-contact {
  width: 100%;
  height: 196rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 20rpx;
}

/* 介绍图片骨架 */
.skeleton-introduce {
  width: 100%;
  height: 400rpx;
  border-radius: 0;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 40rpx;
}
</style>

