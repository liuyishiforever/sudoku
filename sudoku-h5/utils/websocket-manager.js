/**
 * WebSocket连接管理工具类
 * 提供连接管理、自动重连、心跳检测、消息队列等功能
 */
class WebSocketManager {
  constructor(config = {}) {
    // 配置参数
    this.wsUrl = config.wsUrl || ''
    this.maxReconnectAttempts = config.maxReconnectAttempts || 5
    this.reconnectInterval = config.reconnectInterval || 3000
    this.heartbeatInterval = config.heartbeatInterval || 30000
    this.enableHeartbeat = config.enableHeartbeat !== false
    
    // 状态管理
    this.currentWebSocket = null
    this.isConnecting = false
    this.isConnected = false
    this.reconnectAttempts = 0
    this.heartbeatTimer = null
    this.messageQueue = []
    
    // 事件回调
    this.onOpen = null
    this.onMessage = null
    this.onError = null
    this.onClose = null
    this.onReconnecting = null
    this.onReconnectFailed = null
  }

  /**
   * 初始化WebSocket连接
   */
  connect() {
    if (this.isConnecting || this.isConnected) {
      console.log('WebSocket已连接或正在连接中')
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      this.isConnecting = true
      this._resetWebSocket()

      console.log('尝试连接WebSocket:', this.wsUrl)

      try {
        const ws = new WebSocket(this.wsUrl)

        ws.onopen = () => {
          console.log('WebSocket连接已建立')
          this.isConnecting = false
          this.isConnected = true
          this.reconnectAttempts = 0
          
          // 处理消息队列
          this._processMessageQueue()
          
          // 开始心跳检测
          if (this.enableHeartbeat) {
            console.log(`开始心跳检测，间隔: ${this.heartbeatInterval}ms`)
            this._startHeartbeat()
          }
          
          // 触发连接成功回调
          if (this.onOpen) {
            this.onOpen()
          }
          
          resolve()
        }

        ws.onmessage = (event) => {
          try {
            const messageData = JSON.parse(event.data)
            
            // 处理心跳相关消息，使用简化日志
            if (messageData.event === 'pong') {
              console.log('💓 收到服务端心跳响应')
              return
            }
            
            if (messageData.event === 'server-ping') {
              console.log('💓 收到服务端心跳ping')
              // 触发消息回调处理服务端心跳
              if (this.onMessage) {
                this.onMessage(messageData)
              }
              return
            }
            
            // 处理业务消息
            if (messageData.event && ['start', 'content', 'finish', 'error'].includes(messageData.event)) {
              console.log(`📨 收到业务消息: ${messageData.event}`)
            } else {
              console.log('📨 收到WebSocket消息:', messageData.event || 'unknown')
            }
            
            // 触发消息回调
            if (this.onMessage) {
              this.onMessage(messageData)
            }
          } catch (error) {
            console.error('解析WebSocket消息失败:', error, event.data)
            if (this.onMessage) {
              this.onMessage({ 
                event: 'error', 
                data: '消息解析失败：' + error.message 
              })
            }
          }
        }

        ws.onerror = (error) => {
          console.error('WebSocket错误详情:', {
            error: error,
            url: this.wsUrl,
            readyState: ws.readyState,
            readyStateText: this._getReadyStateText(ws.readyState)
          })
          
          this._handleConnectionError()
          
          if (this.onError) {
            this.onError(error)
          }
          
          reject(error)
        }

        ws.onclose = (event) => {
          console.log('WebSocket连接已关闭:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          })
          
          this._handleConnectionClose(event)
          
          if (this.onClose) {
            this.onClose(event)
          }
        }

        this.currentWebSocket = ws
        
      } catch (error) {
        console.error('创建WebSocket连接失败:', error)
        this.isConnecting = false
        reject(error)
      }
    })
  }

  /**
   * 发送消息
   * @param {Object} message - 要发送的消息对象
   * @param {boolean} queueIfDisconnected - 连接断开时是否加入队列
   */
  send(message, queueIfDisconnected = true) {
    if (!this.isConnected || !this.currentWebSocket) {
      console.warn('WebSocket未连接，消息加入队列:', message)
      
      if (queueIfDisconnected) {
        this.messageQueue.push(message)
        // 尝试重新连接
        this.connect().catch(error => {
          console.error('重连失败:', error)
        })
      }
      
      return false
    }

    try {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message)
      
      // 区分不同类型的消息
      if (typeof message === 'object') {
        if (message.event === 'ping') {
          console.log('💓 发送客户端心跳:', messageStr)
        } else if (message.event === 'server-pong') {
          console.log('💓 响应服务端心跳:', messageStr)
        } else {
          console.log('📤 发送业务消息:', messageStr)
        }
      } else {
        console.log('📤 发送业务消息:', messageStr)
      }
      
      this.currentWebSocket.send(messageStr)
      return true
    } catch (error) {
      console.error('发送WebSocket消息失败:', error)
      return false
    }
  }

  /**
   * 关闭WebSocket连接
   * @param {number} code - 关闭代码
   * @param {string} reason - 关闭原因
   */
  close(code = 1000, reason = '正常关闭') {
    this._stopHeartbeat()
    
    if (this.currentWebSocket) {
      this.currentWebSocket.close(code, reason)
      this.currentWebSocket = null
    }
    
    this.isConnected = false
    this.isConnecting = false
    this.reconnectAttempts = 0
    this.messageQueue = []
  }

  /**
   * 手动重连
   */
  reconnect() {
    this.close()
    return this.connect()
  }

  /**
   * 获取连接状态
   */
  getStatus() {
    return {
      isConnected: this.isConnected,
      isConnecting: this.isConnecting,
      reconnectAttempts: this.reconnectAttempts,
      queueLength: this.messageQueue.length,
      readyState: this.currentWebSocket ? this.currentWebSocket.readyState : null
    }
  }

  /**
   * 设置事件监听器
   */
  on(event, callback) {
    switch (event) {
      case 'open':
        this.onOpen = callback
        break
      case 'message':
        this.onMessage = callback
        break
      case 'error':
        this.onError = callback
        break
      case 'close':
        this.onClose = callback
        break
      case 'reconnecting':
        this.onReconnecting = callback
        break
      case 'reconnectFailed':
        this.onReconnectFailed = callback
        break
      default:
        console.warn('未知的事件类型:', event)
    }
  }

  /**
   * 移除事件监听器
   */
  off(event) {
    switch (event) {
      case 'open':
        this.onOpen = null
        break
      case 'message':
        this.onMessage = null
        break
      case 'error':
        this.onError = null
        break
      case 'close':
        this.onClose = null
        break
      case 'reconnecting':
        this.onReconnecting = null
        break
      case 'reconnectFailed':
        this.onReconnectFailed = null
        break
      default:
        console.warn('未知的事件类型:', event)
    }
  }

  // ========== 私有方法 ==========

  /**
   * 处理连接错误
   */
  _handleConnectionError() {
    this.isConnecting = false
    this.isConnected = false
    this._stopHeartbeat()
    this._attemptReconnect()
  }

  /**
   * 处理连接关闭
   */
  _handleConnectionClose(event) {
    this.isConnecting = false
    this.isConnected = false
    this._stopHeartbeat()
    
    // 非正常关闭时尝试重连
    if (!event.wasClean) {
      this._attemptReconnect()
    }
  }

  /**
   * 尝试重连
   */
  _attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`重连失败，已达到最大重连次数: ${this.maxReconnectAttempts}`)
      if (this.onReconnectFailed) {
        this.onReconnectFailed()
      }
      return
    }

    this.reconnectAttempts++
    console.log(`尝试重连 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
    
    if (this.onReconnecting) {
      this.onReconnecting(this.reconnectAttempts)
    }
    
    setTimeout(() => {
      if (!this.isConnected && !this.isConnecting) {
        this.connect().catch(error => {
          console.error('重连失败:', error)
        })
      }
    }, this.reconnectInterval)
  }

  /**
   * 处理消息队列
   */
  _processMessageQueue() {
    if (this.messageQueue.length === 0) return

    console.log(`处理消息队列，共 ${this.messageQueue.length} 条消息`)
    
    const queue = [...this.messageQueue]
    this.messageQueue = []
    
    queue.forEach(message => {
      this.send(message, false) // 不再次加入队列
    })
  }

  /**
   * 开始心跳检测
   */
  _startHeartbeat() {
    this._stopHeartbeat()
    
    console.log(`💓 启动客户端心跳检测，间隔: ${this.heartbeatInterval}ms`)
    
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected && this.currentWebSocket) {
        try {
          const heartbeatData = {
            event: 'ping',
            timestamp: Date.now()
          }
          
          // 简化心跳日志输出
          console.log('💓 发送客户端心跳ping')
          this.currentWebSocket.send(JSON.stringify(heartbeatData))
        } catch (error) {
          console.error('💓 客户端心跳检测失败:', error)
          this._handleConnectionError()
        }
      } else {
        console.warn('💓 心跳检测时连接已断开')
      }
    }, this.heartbeatInterval)
  }

  /**
   * 停止心跳检测
   */
  _stopHeartbeat() {
    if (this.heartbeatTimer) {
      console.log('停止心跳检测')
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /**
   * 重置WebSocket连接
   */
  _resetWebSocket() {
    if (this.currentWebSocket) {
      this.currentWebSocket.close()
      this.currentWebSocket = null
    }
    this.isConnected = false
    this._stopHeartbeat()
  }

  /**
   * 获取WebSocket状态文本
   */
  _getReadyStateText(readyState) {
    const states = {
      0: 'CONNECTING',
      1: 'OPEN',
      2: 'CLOSING',
      3: 'CLOSED'
    }
    return states[readyState] || 'UNKNOWN'
  }
}

export default WebSocketManager