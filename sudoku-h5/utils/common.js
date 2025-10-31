/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

// 跳转
export function goto(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    toast('无效的跳转地址')
    return
  }
  try {
    uni.navigateTo({
      url: url,
      fail: (err) => {
        uni.switchTab({
          url: url
        })
      }
    })
  } catch (error) {
    uni.switchTab({
      url: url
    })
  }
}

// 返回
export function goBack() {
  uni.navigateBack()
}

/**
 * 获取设备唯一标识
 * @returns {string} 设备ID
 */
export function getDeviceId() {
  // 先尝试从本地存储获取设备ID
  let deviceId = uni.getStorageSync('deviceId')
  
  if (!deviceId) {
    // 如果本地没有，尝试获取系统信息
    try {
      const systemInfo = uni.getSystemInfoSync()
      // 优先使用设备ID，如果没有则使用其他唯一标识组合
      deviceId = systemInfo.deviceId || 
                 systemInfo.uuid || 
                 systemInfo.system + '_' + systemInfo.platform + '_' + systemInfo.model.replace(/\s+/g, '') + '_' + Date.now()
    } catch (error) {
      console.warn('获取系统信息失败，使用时间戳生成设备ID:', error)
      // 如果获取系统信息失败，生成一个基于时间的唯一ID
      deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    }
    
    // 将生成的设备ID保存到本地存储
    uni.setStorageSync('deviceId', deviceId)
  }
  
  return deviceId
}
