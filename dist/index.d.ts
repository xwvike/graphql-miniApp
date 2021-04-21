interface OnHandleErrorFunction {
    (error: object): never;
}
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
    private readonly errorHandler;
    private requestTask;
    private requestInterceptors;
    private requestInterceptorsError;
    private responseInterceptors;
    private responseInterceptorsError;
    constructor(url: string, options: graphqlOption, errorHandler: OnHandleErrorFunction);
    private _addInterceptors;
    offHeadersReceived(fn: any): void;
    onHeadersReceived(fn: any): void;
    abort(): void;
    request(options: requestOption): Promise<unknown>;
}
export declare function gql(chunks: string[]): string;
export {};
