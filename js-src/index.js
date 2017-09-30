"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var http = require("http");
function createServer() {
    return new Server;
}
exports.createServer = createServer;
var Server = (function () {
    function Server() {
        var _this = this;
        this.mapping = [];
        this.requestHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var targetEndPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetEndPoint = req.url;
                        return [4, res.writeHead(200)];
                    case 1:
                        _a.sent();
                        return [4, this.handleEndPoint(targetEndPoint, req, res)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.server = http.createServer(this.requestHandler);
    }
    Server.prototype.use = function (a1, a2) {
        var endPoint;
        var handler;
        if (typeof a2 == "undefined") {
            endPoint = "/";
            handler = a1;
        }
        else {
            endPoint = a1;
            handler = a2;
        }
        var middleware = {
            "endPoint": endPoint,
            "handler": handler
        };
        this.mapping.push(middleware);
    };
    Server.prototype.listen = function (port, callback) {
        this.server.listen(port, callback);
    };
    Server.prototype.handleEndPoint = function (endPoint, req, res) {
        var middlewareList = this.mapping;
        if (middlewareList.length > 0) {
            var i_1 = -1;
            var max_i = middlewareList.length;
            var next_1 = function () {
                var noMatch = true;
                do {
                    i_1++;
                    if (middlewareList[i_1] === undefined) {
                        return;
                    }
                    if (middlewareList[i_1].endPoint === "/" ||
                        middlewareList[i_1].endPoint === endPoint) {
                        noMatch = false;
                    }
                } while (noMatch);
                var nextFunction = middlewareList[i_1].handler;
                nextFunction(req, res, next_1);
            };
            next_1();
        }
    };
    return Server;
}());
