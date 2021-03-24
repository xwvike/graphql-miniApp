interface OnHandleErrorFunction {
    (error: object): never
}

interface RequestInterceptorsFunction {
    (config: object): object
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

interface graphqlOption {
    headers?: object,
    graphql?: boolean,
    method?: string,
}

interface requestOption extends graphqlOption {
    uri: string,
    baseURL?: string,
    mutation?:string,
    query?: string,
    variables?: object,
    data?: object,
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
    private readonly options: graphqlOption;
    private readonly errorHandler: OnHandleErrorFunction;
    private requestTask: any;
    private requestInterceptors: RequestInterceptorsFunction[];
    private requestInterceptorsError: RequestInterceptorsErrorFunction[];
    private responseInterceptors: ResponseInterceptorsFunction[];
    private responseInterceptorsError: ResponseInterceptorsErrorFunction[];

    /**
     * 通过new初始化graphql请求全局对象
     */
    constructor(url: string, options: graphqlOption, errorHandler: OnHandleErrorFunction) {
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
    async request(options: requestOption) {
        if (!this.url && options.baseURL === '') {
            throw '缺少请求url'
        }
        let newOptions = {
            ...this.options,
            ...options,
        }
        return await new Promise(((resolve, reject) => {
            let allData: requestOption = {
                baseURL: "",
                method: 'GET',
                headers: undefined,
                query: "",
                mutation:"",
                uri: "",
                variables: undefined
            }
            if (this.requestInterceptors.length >= 1) {
                this.requestInterceptors.forEach(item => {
                    Object.assign(allData, item(newOptions))
                })
            } else {
                allData = {...allData, ...newOptions}
            }
            let payload = null;
            if (allData.graphql) {
                payload = JSON.stringify({
                    query: allData.query===""?allData.mutation:allData.query,
                    variables: allData.variables
                })
            } else {
                payload = allData.data;
            }
            //@ts-ignore
            this.requestTask = wx.request({
                url: allData.baseURL === '' ? this.url + allData.uri : allData.baseURL + allData.uri,
                method: allData.method,
                data: payload,
                header: allData.headers,
                success: (res: any) => {
                    if (res.statusCode === 200) {
                        this.responseInterceptors.forEach(item => {
                            // @ts-ignore
                            Object.assign(res, item(res, resolve, reject))
                        })
                        resolve(res)
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
                },
                complete: (res:any)=>{
                    //@ts-ignore
                    wx.hideLoading()
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


