"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = exports.GraphqlMiniApp = void 0;
// @ts-nocheck
var GraphqlMiniApp = /** @class */ (function () {
    /**
     * 通过new初始化graphql请求全局对象
     */
    function GraphqlMiniApp(url, options, errorHandler) {
        var _this = this;
        this.interceptors = {
            request: {
                use: function (fn, onError) {
                    _this._addInterceptors(fn, onError, 'request');
                },
                eject: function () {
                    _this.requestInterceptors = [];
                    _this.requestInterceptorsonError = [];
                }
            },
            response: {
                use: function (fn, onError) {
                    _this._addInterceptors(fn, onError, 'response');
                },
                eject: function () {
                    _this.responseInterceptors = [];
                    _this.responseInterceptorsonError = [];
                }
            }
        };
        this.url = url;
        this.options = options || {};
        this.errorHandler = errorHandler || undefined;
        this.requestTask = null;
        this.requestInterceptors = [];
        this.requestInterceptorsonError = [];
        this.responseInterceptors = [];
        this.responseInterceptorsonError = [];
    }
    GraphqlMiniApp.prototype._addInterceptors = function (fn, onError, type) {
        if (type === void 0) { type = ''; }
        switch (type) {
            case 'request':
                this.requestInterceptors.push(fn);
                this.requestInterceptorsonError.push(onError);
                break;
            case 'response':
                this.responseInterceptors.push(fn);
                this.responseInterceptorsonError.push(onError);
                break;
            default:
                throw '未知拦截器类型';
        }
    };
    /**
     * 取消监听 HTTP Response Header 事件
     */
    GraphqlMiniApp.prototype.offHeadersReceived = function (fn) {
        this.requestTask.offHeadersReceived(fn);
    };
    /**
     * 监听 HTTP Response Header 事件。会比请求完成事件更早
     */
    GraphqlMiniApp.prototype.onHeadersReceived = function (fn) {
        this.requestTask.onHeadersReceived(fn);
    };
    /**
     * 调用abort（）取消最近的一次请求
     */
    GraphqlMiniApp.prototype.abort = function () {
        this.requestTask.abort();
    };
    /**
     * 请求方法
     */
    GraphqlMiniApp.prototype.request = function (query, variables, options) {
        if (query === void 0) { query = ''; }
        if (variables === void 0) { variables = {}; }
        if (options === void 0) { options = {
            headers: {},
            baseURL: ''
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof options.baseURL !== 'string') {
                            throw '请传入正确的url类型';
                        }
                        if (!this.url && options.baseURL === '') {
                            throw '缺少graphql请求url';
                        }
                        options = __assign(__assign({}, options), this.options);
                        return [4 /*yield*/, new Promise((function (resolve, reject) {
                                var config = {};
                                _this.requestInterceptors.forEach(function (item) {
                                    Object.assign(config, item(options));
                                });
                                _this.requestTask = wx.request({
                                    url: config.baseURL === '' ? _this.url : config.baseURL,
                                    method: 'POST',
                                    data: JSON.stringify({
                                        query: query,
                                        variables: variables
                                    }),
                                    header: config.headers,
                                    success: function (res) {
                                        if (res.statusCode === 200) {
                                            var data_1 = {};
                                            _this.responseInterceptors.forEach(function (item) {
                                                Object.assign(data_1, item(res, resolve, reject));
                                            });
                                            resolve(data_1.data);
                                        }
                                        else {
                                            _this.responseInterceptorsonError.forEach(function (item) {
                                                item(res);
                                            });
                                            if (_this.errorHandler) {
                                                _this.errorHandler(res);
                                            }
                                            reject(res);
                                        }
                                    },
                                    fail: function (err) {
                                        if (err.errMsg.indexOf('request:fail') >= 0) {
                                            _this.requestInterceptorsonError.forEach(function (item) {
                                                item(err);
                                            });
                                        }
                                        else {
                                            _this.responseInterceptorsonError.forEach(function (item) {
                                                item(err);
                                            });
                                        }
                                        if (_this.errorHandler) {
                                            _this.errorHandler(err);
                                        }
                                        reject(err);
                                    }
                                });
                            }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GraphqlMiniApp;
}());
exports.GraphqlMiniApp = GraphqlMiniApp;
/**
 * 定义graphql请求对象
 */
function gql(chunks) {
    return chunks[0];
}
exports.gql = gql;
//# sourceMappingURL=index.js.map