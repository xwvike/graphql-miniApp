export declare class GraphqlMiniApp {
    interceptors: {
        request: {
            use: (fn: any, onError: any) => void;
            eject: () => void;
        };
        response: {
            use: (fn: any, onError: any) => void;
            eject: () => void;
        };
    };
    /**
     * 通过new初始化graphql请求全局对象
     */
    constructor(url: any, options: any, errorHandler: any);
    _addInterceptors(fn: any, onError: any, type?: string): void;
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
    request(query?: string, variables?: {}, options?: {
        headers: {};
        baseURL: string;
    }): Promise<unknown>;
}
/**
 * 定义graphql请求对象
 */
export declare function gql(chunks: any): any;
