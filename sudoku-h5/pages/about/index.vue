<template>
  <view class="about-container">
    <!-- 状态栏占位 (H5环境) -->
    <!-- #ifdef H5 -->
    <view class="status-bar-h5"></view>
    <!-- #endif -->
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- Logo 和标题 -->
      <view class="header-section">
        <view class="logo-wrapper">
          <image class="logo-image" src="/static/images/logo.png" mode="aspectFit" />
        </view>
        <text class="app-name">纯粹数独</text>
        <text class="app-version">v1.0.0</text>
      </view>
      <!-- 应用简介 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="info-circle" size="32" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">应用简介</text>
        </view>
        <view class="section-content">
          <text class="description">
            一个零广告、轻量级的纯粹数独，专注于最本真的数字推理体验。
          </text>
        </view>
      </view>

      <!-- 开发者信息 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="user" size="32" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">开发者信息</text>
        </view>
        <view class="section-content">
          <view class="info-item">
            <view class="info-label">
              <base-icon name="code" size="28" unit="rpx" color="#86868b" />
              <text class="label-text">开发者</text>
            </view>
            <text class="info-value">逸诗</text>
          </view>
          <view class="info-item">
            <view class="info-label">
              <base-icon name="phone" size="28" unit="rpx" color="#86868b" />
              <text class="label-text">联系电话</text>
            </view>
            <text class="info-value" @tap="handleCallPhone">17620460919</text>
          </view>
        </view>
      </view>

      <!-- 微信二维码 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="wechat" size="32" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">微信联系</text>
        </view>
        <view class="section-content">
          <view class="qrcode-wrapper">
            <image class="qrcode-image" src="/static/images/qr.jpg" mode="aspectFit" />
            <text class="qrcode-tip">扫描二维码添加微信</text>
          </view>
        </view>
      </view>

      <!-- 特色功能 -->
      <view class="section">
        <view class="section-header">
          <base-icon name="star" size="32" unit="rpx" color="#0071e3" class="section-icon" />
          <text class="section-title">特色功能</text>
        </view>
        <view class="section-content">
          <view class="feature-list">
            <view class="feature-item">
              <base-icon name="check-circle" size="28" unit="rpx" color="#34c759" />
              <text class="feature-text">零广告，纯净体验</text>
            </view>
            <view class="feature-item">
              <base-icon name="check-circle" size="28" unit="rpx" color="#34c759" />
              <text class="feature-text">轻量级设计，启动迅速</text>
            </view>
            <view class="feature-item">
              <base-icon name="check-circle" size="28" unit="rpx" color="#34c759" />
              <text class="feature-text">四种难度等级</text>
            </view>
            <view class="feature-item">
              <base-icon name="check-circle" size="28" unit="rpx" color="#34c759" />
              <text class="feature-text">智能提示与笔记功能</text>
            </view>
            <view class="feature-item">
              <base-icon name="check-circle" size="28" unit="rpx" color="#34c759" />
              <text class="feature-text">自动保存游戏进度</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 版权信息 -->
      <view class="footer-section">
        <text class="copyright">© 2025 纯粹数独</text>
        <text class="copyright-sub">专注数字推理，享受思维乐趣</text>
      </view>
    </view>
  </view>
</template>

<script>
import BaseIcon from '@/components/base-icon/index.vue'

export default {
  name: 'About',
  components: {
    BaseIcon
  },
  methods: {
    handleBack() {
      uni.navigateBack()
    },

    handleCallPhone() {
      uni.makePhoneCall({
        phoneNumber: '17620460919',
        success: () => {
          console.log('拨打电话成功')
        },
        fail: (err) => {
          console.log('拨打电话失败', err)
          uni.showToast({
            title: '拨打失败',
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background: #fbfbfd;
}

/* H5状态栏占位 */
.status-bar-h5 {
  height: 44px;
  background: #fbfbfd;
  width: 100%;
}

/* 导航栏返回按钮 */
.nav-back {
  padding: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 内容区域 */
.content {
  padding: 32rpx;
}

/* 头部区域 */
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rpx 0;
  margin-bottom: 24rpx;
}

.logo-wrapper {
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 160rpx;
  height: 160rpx;
}

.app-name {
  font-size: 44rpx;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8rpx;
  letter-spacing: -0.5px;
}

.app-version {
  font-size: 24rpx;
  color: #86868b;
  font-weight: 400;
}

/* 区块样式 */
.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-icon {
  margin-right: 12rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: -0.3px;
}

.section-content {
  padding-left: 44rpx;
}

/* 应用简介 */
.description {
  font-size: 28rpx;
  color: #1d1d1f;
  line-height: 1.8;
  font-weight: 400;
}

/* 开发者信息 */
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f5f5f7;
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-item:first-child {
  padding-top: 0;
}

.info-label {
  display: flex;
  align-items: center;
}

.label-text {
  font-size: 28rpx;
  color: #86868b;
  margin-left: 8rpx;
}

.info-value {
  font-size: 28rpx;
  color: #0071e3;
  font-weight: 500;
}

/* 二维码区域 */
.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 0;
}

.qrcode-image {
  width: 320rpx;
  height: 320rpx;
  border-radius: 16rpx;
  margin-bottom: 16rpx;
  background: #f5f5f7;
}

.qrcode-tip {
  font-size: 24rpx;
  color: #86868b;
}

/* 特色功能列表 */
.feature-list {
  display: flex;
  flex-direction: column;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
}

.feature-item:first-child {
  padding-top: 0;
}

.feature-text {
  font-size: 28rpx;
  color: #1d1d1f;
  margin-left: 12rpx;
  font-weight: 400;
}

/* 底部版权 */
.footer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rpx 0 32rpx;
}

.copyright {
  font-size: 24rpx;
  color: #86868b;
  margin-bottom: 8rpx;
}

.copyright-sub {
  font-size: 22rpx;
  color: #d2d2d7;
}
</style>

