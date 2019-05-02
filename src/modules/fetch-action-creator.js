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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FetchError = (function () {
    function FetchError(message, headers, statusCode) {
        this.headers = headers;
        this.message = message;
        this.statusCode = statusCode;
    }
    return FetchError;
}());
var MIN_ERROR_STATUS_CODE = 400;
var MAX_ERROR_STATUS_CODE = 600;
var createAction = function (action, actionMutator) {
    if (!actionMutator) {
        return action;
    }
    if (typeof actionMutator === 'object') {
        return __assign({}, action, actionMutator);
    }
    return actionMutator(action);
};
var parseResponse = function (response) {
    var includeMeta = function (result) { return [result, response.headers, response.status]; };
    var response2 = response.clone();
    try {
        return response2.json().then(includeMeta)
            .catch(function () {
            return response.text().then(includeMeta);
        })
            .catch(function () {
            return includeMeta('');
        });
    }
    catch (e) {
        return response.text().then(includeMeta)
            .catch(function () {
            return includeMeta('');
        });
    }
};
var fetchActionCreator = function (id, url, init, actions, conditional) {
    if (init === void 0) { init = Object.create(null); }
    if (actions === void 0) { actions = Object.create(null); }
    return function (dispatch, getState) {
        if (typeof conditional === 'function' &&
            !conditional(getState())) {
            return Promise.resolve();
        }
        var abortController = null;
        var signal = null;
        if (typeof AbortController !== 'undefined') {
            abortController = new AbortController();
            signal = abortController.signal;
            signal.addEventListener('abort', function () {
                var abortAction = {
                    type: 'ABORT_' + id
                };
                dispatch(createAction(abortAction, actions !== null &&
                    Object.prototype.hasOwnProperty.call(actions, 'onAbort') ?
                    actions.onAbort :
                    null));
            });
        }
        var requestAction = {
            abortController: abortController,
            type: 'REQUEST_' + id
        };
        dispatch(createAction(requestAction, actions !== null &&
            Object.prototype.hasOwnProperty.call(actions, 'onRequest') ?
            actions.onRequest :
            null));
        var requestInit = typeof init === 'function' ?
            init.length ?
                init(getState()) :
                init() :
            init;
        return fetch(url, __assign({ signal: signal }, requestInit))
            .then(parseResponse)
            .then(function (_a) {
            var _b = __read(_a, 3), body = _b[0], headers = _b[1], statusCode = _b[2];
            if (statusCode >= MIN_ERROR_STATUS_CODE &&
                statusCode < MAX_ERROR_STATUS_CODE) {
                throw new FetchError(body, headers, statusCode);
            }
            var resolveAction = {
                body: body,
                headers: headers,
                statusCode: statusCode,
                type: 'RESOLVE_' + id
            };
            dispatch(createAction(resolveAction, actions !== null &&
                Object.prototype.hasOwnProperty.call(actions, 'onResolve') ?
                actions.onResolve :
                null));
        })
            .catch(function (err) {
            var rejectAction = {
                error: err.message || 'Script error',
                headers: err instanceof FetchError ?
                    err.headers :
                    null,
                statusCode: err instanceof FetchError ?
                    err.statusCode :
                    null,
                type: 'REJECT_' + id
            };
            dispatch(createAction(rejectAction, actions !== null &&
                Object.prototype.hasOwnProperty.call(actions, 'onReject') ?
                actions.onReject :
                null));
        });
    };
};
fetchActionCreator.default = fetchActionCreator;
module.exports = fetchActionCreator;
