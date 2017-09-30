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
            logger.debug("targetEndPoint=" + targetEndPoint);
            res.writeHead(200);
            if (_this.mapping["/"] !== undefined) {
                var functionList_1 = _this.mapping["/"];
                var i_1 = 0;
                var max_i_1 = functionList_1.length;
                var next_1 = function () {
                    i_1++;
                    var nextFunction;
                    if (i_1 >= max_i_1) {
                        nextFunction = function () { return; };
                    }
                    else {
                        nextFunction = functionList_1[i_1];
                    }
                    nextFunction(req, res, next_1);
                };
                functionList_1[i_1](req, res, next_1);
            }
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
