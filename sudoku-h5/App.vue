<script>
import config from './config'
import { getToken } from '@/utils/auth'

export default {
  onLaunch: function () {
    this.initConfig()
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
    }
  }
}
</script>

<style lang="scss">
/* 引入字体图标 */
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/css/all.css');

/*每个页面公共css */
@import './common/fui-app.css';
@import './components/firstui/fui-theme/fui-theme.css';

/* 全局样式 - 防止横向溢出 */
page {
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
</style>
