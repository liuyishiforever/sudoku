<script>
import config from './config'
import { getToken } from '@/utils/auth'

export default {
  onLaunch: function () {
    this.initConfig()
    // #ifdef H5
    this.setFavicon()
    // #endif
  },
  onShow: function () {
  },
  methods: {
    initConfig() {
      this.globalData.config = config
    },

    checkLogin() {
      if (!getToken()) {
        this.$tab.reLaunch('/pages/login')
      }
    },

    // H5环境下设置 favicon
    setFavicon() {
      try {
        // 设置主 favicon
        let link = document.querySelector("link[rel*='icon']")
        if (!link) {
          link = document.createElement('link')
          link.type = 'image/x-icon'
          link.rel = 'shortcut icon'
          document.getElementsByTagName('head')[0].appendChild(link)
        }
        link.href = '/static/favicon.ico'
        
        // 设置 Apple Touch Icon
        let appleLink = document.querySelector("link[rel='apple-touch-icon']")
        if (!appleLink) {
          appleLink = document.createElement('link')
          appleLink.rel = 'apple-touch-icon'
          appleLink.sizes = '180x180'
          appleLink.href = '/static/apple-touch-icon.png'
          document.getElementsByTagName('head')[0].appendChild(appleLink)
        }
      } catch (e) {
        console.log('设置 favicon 失败:', e)
      }
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import './static/font-awesome.css';

/* 全局样式 - 防止横向溢出 */
page {
  width: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
</style>
