<template>
  <view class="footer">
    <view class="logo">
      <image class="logo-img" src="/static/images/icon/logo.png" mode="widthFix"></image>
    </view>
    <view class="footer-item">
      <text class="footer-company">杭州木悠悠农场有限公司</text>
    </view>
    <view class="footer-item">
      <text class="footer-copyright">© 2025 木悠悠农场 版权所有</text>
    </view>
    <view class="footer-item">
      <text class="footer-icp">浙ICP备2025XXXXXX号</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 30rpx 60rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f8faf9 100%);
}

.logo {
  width: 320rpx;
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.logo-img {
  width: 80%;
  max-width: 600rpx;
  height: auto;
}

.footer-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.footer-item:last-child {
  margin-bottom: 0;
}

.footer-company {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  letter-spacing: 1rpx;
}

.footer-copyright {
  font-size: 24rpx;
  color: #666666;
}

.footer-icp {
  font-size: 22rpx;
  color: #999999;
  line-height: 1.6;
}
</style>

