interface RequestInterceptorsFunction {
    <T>(config: T): T;
}
interface RequestInterceptorsErrorFunction {
    (error: object): (object | any);
}
interface ResponseInterceptorsFunction {
    <T>(data: T, resolve: Promise<any>, reject: Promise<any>): T;
}
interface ResponseInterceptorsErrorFunction {
    (error: object): (object | void);
}
interface Option {
    headers?: object;
    method?: string;
}
interface requestOption extends Option {
    uri: string;
    baseURL?: string;
    data?: object;
}
export declare class Request {
    interceptors: {
        request: {
            use: (fn: RequestInterceptorsFunction, onError: RequestInterceptorsErrorFunction) => {
                index: number;
                errIndex: number;
            };
            eject: (obj: any) => void;
        };
        response: {
            use: (fn: ResponseInterceptorsFunction, onError: ResponseInterceptorsErrorFunction) => {
                index: number;
                errIndex: number;
            };
            eject: (obj: any) => void;
        };
    };
    private readonly url;
    private readonly options;
    private requestTask;
    private requestInterceptors;
    private requestInterceptorsError;
    private responseInterceptors;
    private responseInterceptorsError;
    constructor(url: string, options: Option);
    private _addInterceptors;
    offHeadersReceived(fn: any): void;
    onHeadersReceived(fn: any): void;
    abort(): void;
    request(options: requestOption): Promise<unknown>;
}
export {};
