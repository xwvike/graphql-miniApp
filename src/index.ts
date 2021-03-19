interface OnHandleErrorFunction {
    (error: object): never
}

interface RequestInterceptorsFunction {
    <T>(config: T): T
}

interface RequestInterceptorsErrorFunction {
    (error: object): (object | any)
}

interface ResponseInterceptorsFunction {
    (data: any, resolve: Promise<any>, reject: Promise<any>): (Promise<any> | any)
}

interface ResponseInterceptorsErrorFunction {
    (error: object): (object | void)
}

export class GraphqlMiniApp {
    public interceptors = {
        request: {
            use: (fn: RequestInterceptorsFunction, onError: RequestInterceptorsErrorFunction) => {
                this._addInterceptors(fn, onError, 'request')
            },
            eject: () => {
                this.requestInterceptors = [];
                this.requestInterceptorsError = [];
            }
        },
        response: {
            use: (fn: ResponseInterceptorsFunction, onError: ResponseInterceptorsErrorFunction) => {
                this._addInterceptors(<RequestInterceptorsFunction>fn, onError, 'response')
            },
            eject: () => {
                this.responseInterceptors = [];
                this.responseInterceptorsError = [];
            }
        }
    }
    private readonly url: string;
    private readonly options: object;
    private readonly errorHandler: OnHandleErrorFunction;
    private requestTask: any;
    private requestInterceptors: RequestInterceptorsFunction[];
    private requestInterceptorsError: RequestInterceptorsErrorFunction[];
    private responseInterceptors: ResponseInterceptorsFunction[];
    private responseInterceptorsError: ResponseInterceptorsErrorFunction[];

    /**
     * 通过new初始化graphql请求全局对象
     */
    constructor(url: string, options: any, errorHandler: any) {
        this.url = url
        this.options = options || {}
        this.errorHandler = errorHandler || undefined
        this.requestTask = null
        this.requestInterceptors = []
        this.requestInterceptorsError = []
        this.responseInterceptors = []
        this.responseInterceptorsError = []
    }

    private _addInterceptors(fn: RequestInterceptorsFunction, onError: RequestInterceptorsErrorFunction, type = '') {
        switch (type) {
            case 'request':
                this.requestInterceptors.push(fn)
                this.requestInterceptorsError.push(onError)
                break
            case 'response':
                this.responseInterceptors.push(fn)
                this.responseInterceptorsError.push(onError)
                break
            default:
                throw '未知拦截器类型'
        }
    }

    /**
     * 取消监听 HTTP Response Header 事件
     */
    offHeadersReceived(fn: any) {
        this.requestTask.offHeadersReceived(fn)
    }

    /**
     * 监听 HTTP Response Header 事件。会比请求完成事件更早
     */
    onHeadersReceived(fn: any) {
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
    async request(uri = '', query = '', variables = {}, options = {
        headers: {},
        baseURL: ''
    }) {
        if (!this.url && options.baseURL === '') {
            throw '缺少graphql请求url'
        }
        options = {
            ...options,
            ...this.options
        }
        return await new Promise(((resolve, reject) => {
            const config = {
                baseURL: undefined,
                headers: undefined
            }
            this.requestInterceptors.forEach(item => {
                Object.assign(config, item(options))
            })
            //@ts-ignore
            this.requestTask = wx.request({
                url: config.baseURL === '' ? this.url+uri : config.baseURL+uri,
                method: 'POST',
                data: JSON.stringify({
                    query,
                    variables
                }),
                header: config.headers,
                success: (res: any) => {
                    if (res.statusCode === 200) {
                        const data = {
                            data: undefined
                        }
                        this.responseInterceptors.forEach(item => {
                            // @ts-ignore
                            Object.assign(data, item(res, resolve, reject))
                        })
                        resolve(data.data)
                    } else {
                        this.responseInterceptorsError.forEach(item => {
                            item(res)
                        })
                        if (this.errorHandler) {
                            this.errorHandler(res)
                        }
                        reject(res)
                    }
                },
                fail: (err: any) => {
                    if (err.errMsg.indexOf('request:fail') >= 0) {
                        this.requestInterceptorsError.forEach(item => {
                            item(err)
                        })
                    } else {
                        this.responseInterceptorsError.forEach(item => {
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
export function gql(chunks: string[]) {
    return chunks[0]
}


