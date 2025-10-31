<template>
  <view class="skeleton-container">
    <!-- 商品网格骨架 -->
    <view class="skeleton-grid">
      <view class="skeleton-item" v-for="i in 4" :key="i">
        <!-- 图片骨架 -->
        <view class="skeleton-image"></view>
        <!-- 信息骨架 -->
        <view class="skeleton-info">
          <view class="skeleton-title skeleton-line"></view>
          <view class="skeleton-title skeleton-line-short"></view>
          <view class="skeleton-price"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TicketSkeleton'
}
</script>

<style scoped>
.skeleton-container {
  background-color: #f5f5f5;
  padding: 20rpx;
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

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.skeleton-item {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.skeleton-image {
  width: 100%;
  height: 340rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
}

.skeleton-info {
  padding: 20rpx;
}

.skeleton-line {
  height: 28rpx;
  border-radius: 14rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-bottom: 12rpx;
}

.skeleton-line-short {
  width: 70%;
}

.skeleton-title {
  width: 100%;
}

.skeleton-price {
  width: 80rpx;
  height: 32rpx;
  border-radius: 8rpx;
  background: linear-gradient(90deg, var(--fui-skeleton-bg-start) 25%, var(--fui-skeleton-bg-middle) 50%, var(--fui-skeleton-bg-end) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading var(--fui-skeleton-animation-duration) ease-in-out infinite;
  margin-top: 8rpx;
}
</style>

