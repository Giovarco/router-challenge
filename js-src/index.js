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
        this.mapping = {};
        var server = http.createServer(function (req, res) {
            res.writeHead(200);
            res.end('Hello, World!\n');
        });
    }
    Server.prototype.use = function (a1, a2) {
        var handler;
        var endPoint;
        if (typeof a2 === undefined) {
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
