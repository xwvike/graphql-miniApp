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
exports.Request = void 0;
var Request = (function () {
    function Request(url, options) {
        var _this = this;
        this.interceptors = {
            request: {
                use: function (fn, onError) {
                    return _this._addInterceptors(fn, onError, 'request');
                },
                eject: function (obj) {
                    if (!obj) {
                        console.error('请传入拦截器对象');
                        return;
                    }
                    var requestInterceptors = _this.requestInterceptors;
                    var requestInterceptorsError = _this.requestInterceptorsError;
                    requestInterceptors.splice(obj.index, 1, function (config) {
                        return config;
                    });
                    requestInterceptorsError.splice(obj.errIndex, 1, function (err) {
                    });
                    _this.requestInterceptors = requestInterceptors;
                    _this.requestInterceptorsError = requestInterceptorsError;
                }
            },
            response: {
                use: function (fn, onError) {
                    return _this._addInterceptors(fn, onError, 'response');
                },
                eject: function (obj) {
                    if (!obj) {
                        console.error('请传入拦截器对象');
                        return;
                    }
                    var responseInterceptors = _this.responseInterceptors;
                    var responseInterceptorsError = _this.responseInterceptorsError;
                    responseInterceptors.splice(obj.index, 1, function (data, resolve, reject) {
                        return data;
                    });
                    responseInterceptorsError.splice(obj.errIndex, 1, function (err) {
                    });
                    _this.responseInterceptors = responseInterceptors;
                    _this.responseInterceptorsError = responseInterceptorsError;
                }
            }
        };
        this.url = url;
        this.options = options || {};
        this.requestTask = null;
        this.requestInterceptors = [];
        this.requestInterceptorsError = [];
        this.responseInterceptors = [];
        this.responseInterceptorsError = [];
        var isShowLoading = false;
        var isShowToast = false;
        var showLoading = wx.showLoading, hideLoading = wx.hideLoading, showToast = wx.showToast, hideToast = wx.hideToast;
        Object.defineProperty(wx, 'showLoading', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                if (isShowToast) {
                    return;
                }
                isShowLoading = true;
                return showLoading.apply(this, param);
            }
        });
        Object.defineProperty(wx, 'hideLoading', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                if (isShowToast) {
                    return;
                }
                isShowLoading = false;
                return hideLoading.apply(this, param);
            }
        });
        Object.defineProperty(wx, 'showToast', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                if (isShowLoading) {
                    wx.hideLoading();
                }
                isShowToast = true;
                return showToast.apply(this, param);
            }
        });
        Object.defineProperty(wx, 'hideToast', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                isShowToast = false;
                return hideToast.apply(this, param);
            }
        });
    }
    Request.prototype._addInterceptors = function (fn, onError, type) {
        if (type === void 0) { type = ''; }
        switch (type) {
            case 'request':
                var requestIndex = this.requestInterceptors.push(fn);
                var requestErrIndex = this.requestInterceptorsError.push(onError);
                return { index: requestIndex - 1, errIndex: requestErrIndex - 1 };
            case 'response':
                var responseIndex = this.responseInterceptors.push(fn);
                var responseErrIndex = this.responseInterceptorsError.push(onError);
                return { index: responseIndex - 1, errIndex: responseErrIndex - 1 };
            default:
                throw '未知拦截器类型';
        }
    };
    Request.prototype.offHeadersReceived = function (fn) {
        this.requestTask.offHeadersReceived(fn);
    };
    Request.prototype.onHeadersReceived = function (fn) {
        this.requestTask.onHeadersReceived(fn);
    };
    Request.prototype.abort = function () {
        this.requestTask.abort();
    };
    Request.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var newOptions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.url && options.baseURL === '') {
                            throw '缺少请求url';
                        }
                        newOptions = __assign(__assign({}, this.options), options);
                        return [4, new Promise((function (resolve, reject) {
                                var allData = {
                                    baseURL: "",
                                    method: 'GET',
                                    headers: undefined,
                                    uri: ""
                                };
                                if (_this.requestInterceptors.length >= 1) {
                                    _this.requestInterceptors.forEach(function (item) {
                                        Object.assign(allData, item(newOptions));
                                    });
                                }
                                else {
                                    allData = __assign(__assign({}, allData), newOptions);
                                }
                                var payload = allData.data;
                                _this.requestTask = wx.request({
                                    url: allData.baseURL === '' ? _this.url + allData.uri : allData.baseURL + allData.uri,
                                    method: allData.method,
                                    data: payload,
                                    header: allData.headers,
                                    success: function (res) {
                                        if (res.statusCode === 200) {
                                            if (_this.responseInterceptors.length >= 1) {
                                                _this.responseInterceptors.forEach(function (item) {
                                                    Object.assign(res, item(res, resolve, reject));
                                                });
                                            }
                                            resolve(res);
                                        }
                                        else {
                                            if (_this.responseInterceptorsError.length >= 1 && _this.responseInterceptorsError[0] !== undefined) {
                                                _this.responseInterceptorsError.forEach(function (item) {
                                                    item(res);
                                                });
                                            }
                                            reject(res);
                                        }
                                    },
                                    fail: function (err) {
                                        if (err.errMsg.indexOf('request:fail') >= 0 && _this.requestInterceptorsError.length >= 1 && _this.requestInterceptorsError[0] !== undefined) {
                                            _this.requestInterceptorsError.forEach(function (item) {
                                                item(err);
                                            });
                                        }
                                        else if (_this.responseInterceptorsError.length >= 1 && _this.responseInterceptorsError[0] !== undefined) {
                                            _this.responseInterceptorsError.forEach(function (item) {
                                                item(err);
                                            });
                                        }
                                        reject(err);
                                    },
                                    complete: function (res) {
                                        wx.hideLoading();
                                    }
                                });
                            }))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=mini.js.map