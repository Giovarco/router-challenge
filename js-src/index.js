"use strict";
exports.__esModule = true;
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
        this.mapping = {};
    }
    Server.prototype.use = function (endPoint, handler) {
        if (endPoint === void 0) { endPoint = "/*"; }
        if (this.mapping[endPoint] === undefined) {
            this.mapping[endPoint] = [];
        }
        this.mapping[endPoint].push(handler);
    };
    Server.prototype.logMapping = function () {
        console.log(JSON.stringify(this.mapping, null, 2));
    };
    return Server;
}());
