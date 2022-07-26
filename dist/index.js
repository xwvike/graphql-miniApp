"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gql = gql;
exports.graphqlMiniApp = void 0;

var _md = _interopRequireDefault(require("./md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var graphqlMiniApp = /*#__PURE__*/function () {
  /**
   * @param url 请求根路径
   * @param [options] 请求参数
   */
  function graphqlMiniApp(url, options) {
    var _this = this;

    _classCallCheck(this, graphqlMiniApp);

    _defineProperty(this, "interceptors", {
      request: {
        use: function use(fn, onError) {
          return _this._addInterceptors(fn, onError, 'request');
        },
        eject: function eject(obj) {
          if (!obj) {
            console.error('请传入拦截器对象');
            return;
          }

          var requestInterceptors = _this.requestInterceptors;
          var requestInterceptorsError = _this.requestInterceptorsError;
          requestInterceptors.splice(obj.index, 1, function (config) {
            return config;
          });
          requestInterceptorsError.splice(obj.errIndex, 1, function (err) {});
          _this.requestInterceptors = requestInterceptors;
          _this.requestInterceptorsError = requestInterceptorsError;
        }
      },
      response: {
        use: function use(fn, onError) {
          return _this._addInterceptors(fn, onError, 'response');
        },
        eject: function eject(obj) {
          if (!obj) {
            console.error('请传入拦截器对象');
            return;
          }

          var responseInterceptors = _this.responseInterceptors;
          var responseInterceptorsError = _this.responseInterceptorsError;
          responseInterceptors.splice(obj.index, 1, function (data, resolve, reject) {
            return data;
          });
          responseInterceptorsError.splice(obj.errIndex, 1, function (err) {});
          _this.responseInterceptors = responseInterceptors;
          _this.responseInterceptorsError = responseInterceptorsError;
        }
      }
    });

    //请求根路径
    this.url = url; //初始化请求参数

    this.options = options !== null && options !== void 0 ? options : {}; //请求对象

    this.requestTask = {}; //请求历史记录

    this.requestHistory = {}; //请求拦截器

    this.requestInterceptors = []; //请求错误拦截器

    this.requestInterceptorsError = []; //响应拦截器

    this.responseInterceptors = []; //响应错误拦截器

    this.responseInterceptorsError = [];
  }

  _createClass(graphqlMiniApp, [{
    key: "_addInterceptors",
    value: function _addInterceptors(fn, onError, type) {
      switch (type) {
        case 'request':
          var requestIndex = this.requestInterceptors.push(fn);
          var requestErrIndex = this.requestInterceptorsError.push(onError);
          return {
            index: requestIndex - 1,
            errIndex: requestErrIndex - 1
          };

        case 'response':
          var responseIndex = this.responseInterceptors.push(fn);
          var responseErrIndex = this.responseInterceptorsError.push(onError);
          return {
            index: responseIndex - 1,
            errIndex: responseErrIndex - 1
          };

        default:
          throw '未知拦截器类型';
      }
    }
  }, {
    key: "getRequestTask",
    value:
    /**
     * 返回网络请求任务对象
     * @returns {requestTask}
     */
    function getRequestTask() {
      return this.requestTask;
    }
    /**
     * 请求方法
     * @param options
     * @returns {Promise<unknown>}
     */

  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(options) {
        var _operationName,
            _this2 = this;

        var header, requestOptions, requestId, baseURL, url, method, variables, InMemoryCache, noCache, query, mutation, operationName, headers, timeout, dataType, responseType, data, variablesBool, type;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.url && !options.baseURL)) {
                  _context.next = 2;
                  break;
                }

                throw '缺少请求地址';

              case 2:
                header = _objectSpread(_objectSpread({}, this.options.headers), options.headers);
                requestOptions = _objectSpread(_objectSpread(_objectSpread({}, this.options), options), {}, {
                  headers: header
                });

                if (this.requestInterceptors.length >= 1) {
                  this.requestInterceptors.forEach(function (item) {
                    Object.assign({}, item(requestOptions));
                  });
                }

                requestId = (0, _md["default"])(JSON.stringify(requestOptions));
                baseURL = requestOptions.baseURL, url = requestOptions.url, method = requestOptions.method, variables = requestOptions.variables, InMemoryCache = requestOptions.InMemoryCache, noCache = requestOptions.noCache, query = requestOptions.query, mutation = requestOptions.mutation, operationName = requestOptions.operationName, headers = requestOptions.headers, timeout = requestOptions.timeout, dataType = requestOptions.dataType, responseType = requestOptions.responseType;
                data = {};
                variablesBool = variables !== null && variables !== void 0 ? variables : true;
                type = (query !== null && query !== void 0 ? query : '') === '' && (mutation !== null && mutation !== void 0 ? mutation : '') === '' ? 'error' : (query !== null && query !== void 0 ? query : '') === '' ? 'mutation' : 'query';

                if (((_operationName = operationName) !== null && _operationName !== void 0 ? _operationName : '') === '') {
                  operationName = requestOptions[type].trim().split('(')[0].split(' ')[1];
                }

                if (variablesBool) {
                  if (type === 'query') {
                    data = {
                      query: query,
                      operationName: operationName
                    };
                  } else if (type === 'mutation') {
                    data = {
                      mutation: mutation,
                      operationName: operationName
                    };
                  }
                } else {
                  if (type === 'query') {
                    data = {
                      query: query,
                      operationName: operationName,
                      variables: variables
                    };
                  } else {
                    data = {
                      mutation: mutation,
                      operationName: operationName,
                      variables: variables
                    };
                  }
                }

                _context.next = 14;
                return new Promise(function (resolve, reject) {
                  var _data;

                  if (InMemoryCache && !noCache) {
                    var res = _this2.requestHistory[requestId];

                    if (res !== undefined) {
                      resolve(res);
                      return;
                    }
                  }

                  _this2.requestTask[requestId] = wx.request({
                    url: (baseURL !== null && baseURL !== void 0 ? baseURL : true) ? _this2.url + url : baseURL + url,
                    method: method !== null && method !== void 0 ? method : 'post',
                    data: (_data = data) !== null && _data !== void 0 ? _data : {},
                    header: headers !== null && headers !== void 0 ? headers : [],
                    timeout: timeout !== null && timeout !== void 0 ? timeout : 1000 * 60,
                    dataType: dataType !== null && dataType !== void 0 ? dataType : 'json',
                    responseType: responseType !== null && responseType !== void 0 ? responseType : 'text',
                    success: function success(res) {
                      if (res.statusCode === 200) {
                        if (_this2.responseInterceptors.length >= 1) {
                          _this2.responseInterceptors.forEach(function (item) {
                            Object.assign(res, item(res, resolve, reject));
                          });
                        }

                        if (InMemoryCache) {
                          _this2.requestHistory[requestId] = res;
                        }

                        resolve(res);
                      } else {
                        if (_this2.responseInterceptorsError.length >= 1 && _this2.responseInterceptorsError[0] !== undefined) {
                          _this2.responseInterceptorsError.forEach(function (item) {
                            item(res);
                          });
                        }

                        reject(res);
                      }
                    },
                    fail: function fail(err) {
                      if (err.errMsg.indexOf('request:fail') >= 0 && _this2.requestInterceptorsError.length >= 1 && _this2.requestInterceptorsError[0] !== undefined) {
                        _this2.requestInterceptorsError.forEach(function (item) {
                          item(err);
                        });
                      } else if (_this2.responseInterceptorsError.length >= 1 && _this2.responseInterceptorsError[0] !== undefined) {
                        _this2.responseInterceptorsError.forEach(function (item) {
                          item(err);
                        });
                      }

                      reject(err);
                    },
                    complete: function complete() {
                      try {
                        delete _this2.requestTask[requestId];
                      } catch (e) {}
                    }
                  });
                });

              case 14:
                return _context.abrupt("return", _context.sent);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }]);

  return graphqlMiniApp;
}();
/**
 * 定义graphql请求对象
 */


exports.graphqlMiniApp = graphqlMiniApp;

function gql(chunks) {
  return chunks[0];
}