<template>
  <view class="region-picker-component">
    <view class="region-picker-trigger" @click="openPicker">
      <text class="displayValue" v-if="displayValue">{{ displayValue }}</text>
      <text v-else class="placeholder">{{ placeholder }}</text>
      <fui-icon name="arrowright" :size="32" color="var(--fui-color-label)"></fui-icon>
    </view>
    <fui-picker
      linkage
      :layer="3"
      :options="regionData"
      :show="showPicker"
      @change="handleChange"
      @cancel="handleCancel"
      confirmText="确定"
      cancelText="取消"
      :confirmColor="'var(--fui-color-primary)'"
      :cancelColor="'var(--fui-color-label)'"
    ></fui-picker>
  </view>
</template>

<script>
// 导入省市区数据
import regionData from '@/static/json/pca.json';

export default {
  name: 'RegionPicker',
  props: {
    value: {
      type: [Object, String],
      default: () => ({
        province: '',
        city: '',
        district: '',
        provinceCode: '',
        cityCode: '',
        districtCode: ''
      })
    },
    placeholder: {
      type: String,
      default: '请选择所在地区'
    }
  },
  data() {
    return {
      showPicker: false,
      regionData: regionData
    }
  },
  computed: {
    displayValue() {
      if (!this.value || typeof this.value !== 'object') {
        return '';
      }

      const {province, city, district} = this.value;

      // 处理特殊情况
      let displayCity = city;

      // 如果城市名称包含"市辖区"、"县"等不需要显示的文本，则不显示
      if (city && (city === '市辖区' || city === '县' || city.includes('直辖') || city.includes('自治'))) {
        displayCity = '';
      }

      // 如果省份名称已经包含了城市名称，也不重复显示城市
      if (province && city && province.includes(city)) {
        displayCity = '';
      }

      // 构建显示文本
      let result = province || '';

      if (displayCity && displayCity !== '') {
        result += result ? ` ${displayCity}` : displayCity;
      }

      if (district) {
        result += result ? ` ${district}` : district;
      }

      return result;
    }
  },
  methods: {
    openPicker() {
      this.showPicker = true;
    },

    handleCancel() {
      this.showPicker = false;
    },

    handleChange(e) {
      this.showPicker = false;

      // 获取选中的省市区数据
      const {index, value, text} = e;

      // 构建新的地区对象
      const regionValue = {
        province: text[0] || '',
        city: text[1] || '',
        district: text[2] || '',
        provinceCode: value[0] || '',
        cityCode: value[1] || '',
        districtCode: value[2] || ''
      };

      // 更新v-model绑定的值
      this.$emit('input', regionValue);

      // 同时触发change事件，方便父组件处理
      this.$emit('change', regionValue);
    }
  }
}
</script>

<style lang="scss" scoped>
.region-picker-component {
  width: 100%;

  .region-picker-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 8rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:active {
      opacity: 0.8;
    }

    .placeholder {
      color: var(--fui-color-label);
    }

    .displayValue {
      color: var(--fui-color-title);
    }
  }
}
</style>
