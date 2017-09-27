"use strict";
exports.__esModule = true;
var http = require("http");
var winston = require("winston");
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ colorize: true })
    ]
});
logger.level = 'debug';
function createServer() {
    return new Server;
}
exports.createServer = createServer;
var Server = (function () {
    function Server() {
        var _this = this;
        this.mapping = {};
        this.requestHandler = function (req, res) {
            var targetEndPoint = req.url;
            if (_this.mapping["/"] !== undefined) {
                var functionList = _this.mapping["/"];
                for (var i = 0; i < functionList.length; i++) {
                    var currentMiddleware = functionList[i];
                    currentMiddleware(req, res, next);
                }
            }
            res.writeHead(200);
            res.end("HELLO");
        };
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
        if (this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = [];
        }
        this.mapping[endPoint].push(handler);
    };
    Server.prototype.listen = function (port, callback) {
        this.server.listen(port, callback);
    };
    Server.prototype.logMapping = function () {
        console.log(JSON.stringify(this.mapping, null, 2));
    };
    return Server;
}());
