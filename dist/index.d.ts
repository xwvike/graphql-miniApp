interface OnHandleErrorFunction {
    (error: object): never;
}
interface RequestInterceptorsFunction {
    (config: object): object;
}
interface RequestInterceptorsErrorFunction {
    (error: object): (object | any);
}
interface ResponseInterceptorsFunction {
    (data: any, resolve: Promise<any>, reject: Promise<any>): (Promise<any> | any);
}
interface ResponseInterceptorsErrorFunction {
    (error: object): (object | void);
}
interface graphqlOption {
    headers?: object;
    graphql?: boolean;
    method?: string;
}
interface requestOption extends graphqlOption {
    uri: string;
    baseURL?: string;
    mutation?: string;
    query?: string;
    variables?: object;
    data?: object;
}
export declare class GraphqlMiniApp {
    interceptors: {
        request: {
            use: (fn: RequestInterceptorsFunction, onError: RequestInterceptorsErrorFunction) => void;
            eject: () => void;
        };
        response: {
            use: (fn: ResponseInterceptorsFunction, onError: ResponseInterceptorsErrorFunction) => void;
            eject: () => void;
        };
    };
    private readonly url;
    private readonly options;
    private readonly errorHandler;
    private requestTask;
    private requestInterceptors;
    private requestInterceptorsError;
    private responseInterceptors;
    private responseInterceptorsError;
    /**
     * 通过new初始化graphql请求全局对象
     */
    constructor(url: string, options: graphqlOption, errorHandler: OnHandleErrorFunction);
    private _addInterceptors;
    /**
     * 取消监听 HTTP Response Header 事件
     */
    offHeadersReceived(fn: any): void;
    /**
     * 监听 HTTP Response Header 事件。会比请求完成事件更早
     */
    onHeadersReceived(fn: any): void;
    /**
     * 调用abort（）取消最近的一次请求
     */
    abort(): void;
    /**
     * 请求方法
     */
    request(options: requestOption): Promise<unknown>;
}
/**
 * 定义graphql请求对象
 */
export declare function gql(chunks: string[]): string;
export {};
