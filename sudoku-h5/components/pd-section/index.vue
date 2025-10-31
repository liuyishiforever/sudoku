<template>
  <view class="section">
    <view class="left">
      <text class="main-title">{{ mainTitle }}</text>
    </view>
    <view class="right">
      <text class="sub-title">{{ subTitle }}</text>
      <fui-icon name="arrowright" size="32" color="#999"></fui-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    mainTitle: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    navigateToUrl() {
      if (this.url) {
        uni.navigateTo({
          url: this.url
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.left {
  flex: 1;
}

.right {
  display: flex;
  align-items: center;

  .main-title {
    font-size: 36rpx;
    font-weight: bold;
  }

  .sub-title {
    font-size: 24rpx;
    color: #999;
    margin-right: 8rpx;
  }

}


</style>
