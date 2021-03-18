class GraphqlMiniApp {
  interceptors = {
    request: {
      use: (fn, onError) => {
        this._addInterceptors(fn, onError, 'request')
      },
      eject: () => {
        this.requestInterceptors = [];
        this.requestInterceptorsonError = [];
      }
    },
    response: {
      use: (fn, onError) => {
        this._addInterceptors(fn, onError, 'response')
      },
      eject: () => {
        this.responseInterceptors = [];
        this.responseInterceptorsonError = [];
      }
    }
  }

  /**
   * 通过new初始化graphql请求全局对象
   */
  constructor(url, options, errorHandler) {
    this.url = url
    this.options = options || {}
    this.errorHandler = errorHandler || undefined
    this.requestTask = null
    this.requestInterceptors = []
    this.requestInterceptorsonError = []
    this.responseInterceptors = []
    this.responseInterceptorsonError = []
  }

  _addInterceptors(fn, onError, type = '') {
    switch (type) {
      case 'request':
        this.requestInterceptors.push(fn)
        this.requestInterceptorsonError.push(onError)
        break
      case 'response':
        this.responseInterceptors.push(fn)
        this.responseInterceptorsonError.push(onError)
        break
      default:
        throw '未知拦截器类型'
    }
  }

  /**
   * 取消监听 HTTP Response Header 事件
   */
  offHeadersReceived(fn) {
    this.requestTask.offHeadersReceived(fn)
  }

  /**
   * 监听 HTTP Response Header 事件。会比请求完成事件更早
   */
  onHeadersReceived(fn) {
    this.requestTask.onHeadersReceived(fn)
  }

  /**
   * 调用abort（）取消最近的一次请求
   */
  abort() {
    this.requestTask.abort()
  }

  /**
   * 请求方法
   */
  async request(query = '', variables = {}, options = {
    headers: {},
    baseURL: ''
  }) {
    if (typeof options.baseURL !== 'string') {
      throw '请传入正确的url类型'
    }
    if (!this.url && options.baseURL === '') {
      throw '缺少graphql请求url'
    }
    options = {
      ...options,
      ...this.options
    }
    return await new Promise(((resolve, reject) => {
      const config = {}
      this.requestInterceptors.forEach(item => {
        Object.assign(config, item(options))
      })
      this.requestTask = wx.request({
        url: config.baseURL === '' ? this.url : config.baseURL,
        method: 'POST',
        data: JSON.stringify({
          query,
          variables
        }),
        header: config.headers,
        success: res => {
          if (res.statusCode === 200) {
            const data = {}
            this.responseInterceptors.forEach(item => {
              Object.assign(data, item(res, resolve, reject))
            })
            resolve(data.data)
          } else {
            this.responseInterceptorsonError.forEach(item => {
              item(res)
            })
            if (this.errorHandler) {
              this.errorHandler(res)
            }
            reject(res)
          }
        },
        fail: err => {
          if (err.errMsg.indexOf('request:fail') >= 0) {
            this.requestInterceptorsonError.forEach(item => {
              item(err)
            })
          } else {
            this.responseInterceptorsonError.forEach(item => {
              item(err)
            })
          }
          if (this.errorHandler) {
            this.errorHandler(err)
          }
          reject(err)
        }
      })
    }))
  }
}

/**
 * 定义graphql请求对象
 */
function gql(chunks) {
  return chunks[0]
}

module.exports = {
  gql:gql,
  GraphqlMiniApp:GraphqlMiniApp
}

