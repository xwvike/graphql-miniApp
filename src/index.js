import md5 from './md5'

export class graphqlMiniApp {
  /**
   * @param url 请求根路径
   * @param [options] 请求参数
   */
  constructor (url, options) {
    //请求根路径
    this.url = url
    //初始化请求参数
    this.options = options ?? {}
    //请求对象
    this.requestTask = {}
    //请求历史记录
    this.requestHistory = {}
    //请求拦截器
    this.requestInterceptors = []
    //请求错误拦截器
    this.requestInterceptorsError = []
    //响应拦截器
    this.responseInterceptors = []
    //响应错误拦截器
    this.responseInterceptorsError = []
  }

  _addInterceptors (fn, onError, type) {
    switch (type) {
      case 'request':
        let requestIndex = this.requestInterceptors.push(fn)
        let requestErrIndex = this.requestInterceptorsError.push(onError)
        return { index: requestIndex - 1, errIndex: requestErrIndex - 1 }
      case 'response':
        let responseIndex = this.responseInterceptors.push(fn)
        let responseErrIndex = this.responseInterceptorsError.push(onError)
        return { index: responseIndex - 1, errIndex: responseErrIndex - 1 }
      default:
        throw '未知拦截器类型'
    }
  }

  interceptors = {
    request: {
      use: (fn, onError) => {
        return this._addInterceptors(fn, onError, 'request')
      },
      eject: (obj) => {
        if (!obj) {
          console.error('请传入拦截器对象')
          return
        }
        let requestInterceptors = this.requestInterceptors
        let requestInterceptorsError = this.requestInterceptorsError
        requestInterceptors.splice(obj.index, 1, config => {
          return config
        })
        requestInterceptorsError.splice(obj.errIndex, 1, err => {
        })
        this.requestInterceptors = requestInterceptors
        this.requestInterceptorsError = requestInterceptorsError
      }
    },
    response: {
      use: (fn, onError) => {
        return this._addInterceptors(fn, onError, 'response')
      },
      eject: (obj) => {
        if (!obj) {
          console.error('请传入拦截器对象')
          return
        }
        let responseInterceptors = this.responseInterceptors
        let responseInterceptorsError = this.responseInterceptorsError
        responseInterceptors.splice(obj.index, 1, (data, resolve, reject) => {
          return data
        })
        responseInterceptorsError.splice(obj.errIndex, 1, (err) => {})
        this.responseInterceptors = responseInterceptors
        this.responseInterceptorsError = responseInterceptorsError
      }
    }
  }

  /**
   * 返回网络请求任务对象
   * @returns {requestTask}
   */
  getRequestTask () {
    return this.requestTask
  }

  /**
   * 请求方法
   * @param options
   * @returns {Promise<unknown>}
   */
  async request (options) {
    if (!this.url && !options.baseURL) {
      throw '缺少请求地址'
    }
    let header = {
      ...this.options.headers,
      ...options.headers
    }
    let requestOptions = {
      ...this.options,
      ...options,
      headers:header
    }

    if (this.requestInterceptors.length >= 1) {
      this.requestInterceptors.forEach(item => {
        Object.assign({}, item(requestOptions))
      })
    }

    const requestId = md5(JSON.stringify(requestOptions));

    let { baseURL, url, method, variables, InMemoryCache,noCache, query, mutation, operationName, headers, timeout, dataType, responseType } = requestOptions;
    let data = {}
    const variablesBool = variables??true
    let type = ((query ?? '') === '' && (mutation ?? '') === '') ? 'error' : (query ?? '') === '' ? 'mutation' : 'query'
    if ((operationName ?? '') === '') {
      operationName = requestOptions[type].trim().split('(')[0].split(' ')[1]
    }
    if (variablesBool) {
      if (type === 'query') {
        data = { query, operationName }
      } else if (type === 'mutation') {
        data = { mutation, operationName }
      }
    } else {
      if (type === 'query') {
        data = { query, operationName, variables }
      } else {
        data = { mutation, operationName, variables }
      }
    }

    return await new Promise((resolve, reject) => {

      if(InMemoryCache&&!noCache){
        let res = this.requestHistory[requestId]
        if(res!==undefined){
          resolve(res)
          return;
        }
      }

      this.requestTask[requestId] = wx.request({
        url: baseURL??true? this.url + url : baseURL + url,
        method: method ?? 'post',
        data: data ?? {},
        header: headers ?? [],
        timeout: timeout ?? 1000 * 60,
        dataType: dataType ?? 'json',
        responseType: responseType ?? 'text',
        success: (res) => {
          if (res.statusCode === 200) {
            if (this.responseInterceptors.length >= 1) {
              this.responseInterceptors.forEach(item => {
                Object.assign(res, item(res, resolve, reject))
              })
            }
            if(InMemoryCache){
              this.requestHistory[requestId] = res;
            }
            resolve(res)
          } else {
            if (this.responseInterceptorsError.length >= 1 && this.responseInterceptorsError[0] !== undefined) {
              this.responseInterceptorsError.forEach(item => {
                item(res)
              })
            }
            reject(res)
          }
        },
        fail: (err) => {
          if (err.errMsg.indexOf('request:fail') >= 0 && this.requestInterceptorsError.length >= 1 && this.requestInterceptorsError[0] !== undefined) {
            this.requestInterceptorsError.forEach(item => {
              item(err)
            })
          } else if (this.responseInterceptorsError.length >= 1 && this.responseInterceptorsError[0] !== undefined) {
            this.responseInterceptorsError.forEach(item => {
              item(err)
            })
          }
          reject(err)
        },
        complete: () => {
          try {
            delete this.requestTask[requestId]
          } catch (e) {}
        }
      })
    })
  }
}

/**
 * 定义graphql请求对象
 */
export function gql(chunks) {
  return chunks[0]
}
